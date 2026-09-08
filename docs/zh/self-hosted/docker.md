# Server Deploy

Server Deploy 是 Memoh 的自托管服务端部署形态，适合长期在线、多人、多租户、远程访问，或需要机器人在桌面离线时继续服务外部渠道的场景。

本页说明 Docker Compose 版 Server Deploy。要安装本地原生客户端，请看 [Desktop 桌面版](/zh/self-hosted/desktop)。

默认编排里包含 PostgreSQL、用于记忆向量的 pgvector 库、一次性迁移任务、主服务（显式配置 workspace backend，智能体也在同一进程）、渠道 worker 和网页前端。数据库仅支持 PostgreSQL。

官方 Compose 栈使用 `containerd` workspace backend。server 镜像会启动内置 containerd，并挂好机器人 workspace 需要的 runtime 文件。Docker Engine 和 Apple 后端见 [Workspace backend](/zh/self-hosted/workspace-backends.md)。

## 服务结构

Compose 里有多组服务。有的默认就起，有的通过 `--profile` 打开：

| 服务 | Profile | 说明 |
|------|---------|------|
| **server** | *（核心）* | 主服务，使用配置中的容器运行时后端，智能体同进程 |
| **channel** | *（核心）* | 渠道 worker（`memoh-channel`），持有各平台连接与 webhook，通过内部 RPC 与主服务通信 |
| **web** | *（核心）* | 网页端（Vue 3） |
| **postgres** | *（核心）* | PostgreSQL（主数据） |
| **pgvector** | *（核心）* | 带 `pgvector` 的 PostgreSQL，供可选的记忆向量使用；见 [内置记忆](/zh/integrations/providers/memory/builtin.md) |
| **migrate** | *（核心，一次性）* | 在主服务启动前执行 `memoh-server migrate up` |
| **webhook-tunnel** | `webhook-tunnel` | 可选的 `cloudflared` 快速隧道，把渠道 worker 的 webhook 监听暴露到公网 |
| **connect-it** | `connectors` | 同机部署的 [Connect-It](https://github.com/memohai/connect-it)，支撑 Bot [连接器](/zh/guides/connectors.md)（见下） |


### Connect-It 连接器

**connect-it** 容器跑的是 [Connect-It](https://github.com/memohai/connect-it)，Bot [连接器](/zh/guides/connectors.md)背后的服务——通过 OAuth 或 API Key 把第三方服务（GitHub、Notion 这类）连给 Bot。它共用 Memoh 的 PostgreSQL，数据隔离在单独的 `connect_it` schema 里，迁移自己管。

安装脚本把 Connect-It 全程管起来：

- **全新安装**默认启用（`MEMOH_CONNECT_IT_MODE=embedded`，Compose profile `connectors`），装完连接器功能开箱即用，不用手动进 Connect-It 管理台建 token 再抄回配置。
- **升级**时保持关闭，除非之前已经开过；想开的话带 `MEMOH_CONNECT_IT_MODE=embedded` 重跑一次安装脚本。
- 全套凭据——管理台密码、AES 密钥、cookie secret、服务端之间的 API token——只生成一次，写进 `.env`，升级复用。之后切换模式也不会丢已有连接。

装完后 Connect-It 管理台在 `http://localhost:8421`（账号 `admin`，密码是生成的，安装结束时会打印，也存在 `.env` 里）。

两个要注意的点：

- **OAuth 回调**走 Connect-It 的公开地址，默认 `http://localhost:8421`。如果 Memoh 要从其它机器访问，把 `MEMOH_CONNECT_IT_PUBLIC_BASE_URL` 设成那些机器（以及 OAuth 提供方）能访问到的地址。
- **大陆镜像**：Connect-It 镜像在 ghcr.io 上，memoh.cn 镜像源不覆盖。拉不动 ghcr.io 的话，设 `MEMOH_CONNECT_IT_MODE=disabled` 跳过。

## 先决条件

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose v2](https://docs.docker.com/compose/install/)
- Git

## 一键 Server Deploy（推荐）

官方脚本（本机已装好 Docker 与 Compose）：

```bash
curl -fsSL https://memoh.sh | sh
```

请用普通用户运行安装脚本，不要给整个脚本套 `sudo`。如果 Docker
需要提权，脚本会只对 `docker` 命令使用 `sudo`。如果确实要以 root
运行整个安装脚本，需要显式设置 `MEMOH_ALLOW_ROOT_INSTALL=true`。

脚本会：检查 Docker/Compose；判断首次安装、升级或重装；交互问配置（工作区、数据目录、管理员、JWT、Postgres 密码、workspace backend 提示）；升级时自动复用已有 `config.toml`，保持数据库凭据和已有 PostgreSQL volume 一致；可选择清理重装并删除 Memoh 容器、volume 和 network；从 GitHub 取最新发布并克隆；按 Docker 模板生成 `config.toml`；拒绝升级遗留的 SQLite 安装（仅支持 PostgreSQL，需选择重装）；把 Memoh 镜像钉到发布版本（例如 `v0.13.0` 对应镜像 tag `0.13.0`）；全新安装时带起同机部署的 Connect-It——凭据只生成一次、写进 `.env`，并加上 `connectors` profile（见[上面](#connect-it-连接器)）；默认带 `qdrant` profile 启动，启用 sparse 时再加 `sparse` profile；启动失败时打印数据库、迁移和 server 的近期日志。

**静默安装**（全默认、无提问）：

```bash
curl -fsSL https://memoh.sh | sh -s -- -y
```

静默时默认：工作区 `~/memoh`；数据 `~/memoh/data`；管理员 `admin` / `admin123`；JWT 随机；数据库 PostgreSQL（含 `pgvector` 边车）；Postgres 密码 `memoh123`；webhook 隧道默认关闭，除非设置 `MEMOH_WEBHOOK_TUNNEL_MODE=external`。

如果静默模式发现已有 Memoh 安装，会默认进入**升级**并复用之前的 `config.toml`。如果只发现 Docker 状态、但找不到可复用的 `config.toml`，脚本会退出并要求显式选择重装。

**强制清理重装**（启动前删除 Memoh Docker 数据）：

```bash
curl -fsSL https://memoh.sh | MEMOH_INSTALL_MODE=reinstall sh
```

也可以用参数指定安装模式：

```bash
curl -fsSL https://memoh.sh | sh -s -- --install-mode reinstall
```

**通过 Cloudflare 快速隧道暴露渠道 webhook**（需要公网回调地址的平台）：

```bash
curl -fsSL https://memoh.sh | MEMOH_WEBHOOK_TUNNEL_MODE=external sh
```

**指定版本：**

```bash
curl -fsSL https://memoh.sh | sh -s -- --version v0.13.0
```

或：

```bash
curl -fsSL https://memoh.sh | MEMOH_VERSION=v0.13.0 sh
```

**大陆镜像**（拉镜像慢时）：

```bash
curl -fsSL https://memoh.sh | USE_CN_MIRROR=true sh
```

> 环境变量可组合，例如 `curl -fsSL https://memoh.sh | MEMOH_VERSION=v0.13.0 USE_CN_MIRROR=true sh`。

### 安装脚本参数

`sh -s --` 后面可以传这些参数：

| 参数 | 说明 |
|------|------|
| `-y`、`--yes` | 静默安装，使用默认值。没有 TTY 时脚本也会自动切到静默模式。 |
| `--version <tag>`、`--version=<tag>` | 安装指定 Git tag，例如 `v0.13.0`。 |
| `--install-mode <mode>`、`--install-mode=<mode>` | 选择 `auto`、`fresh`、`upgrade` 或 `reinstall`。 |
| `--database-driver <driver>`、`--database-driver=<driver>` | 兼容保留；仅支持 `postgres`。 |
| `--container-backend <backend>`、`--workspace-backend <backend>` | 写入配置的 workspace backend。一键 Docker Compose 安装只支持 `containerd`；`docker` 或 `apple` 请走手动部署。 |

## 手动安装

```bash
git clone https://github.com/felinics/Memoh.git
cd Memoh
cp conf/app.docker.toml config.toml
```

至少改 `config.toml` 里：

- `admin.password`
- `auth.jwt_secret`（可 `openssl rand -base64 32`）
- `postgres.password`（环境变量 `POSTGRES_PASSWORD` 要一致）

然后启动核心服务：

```bash
POSTGRES_PASSWORD=你的库密码 docker compose up -d
```

需要同机 Connect-It 时加 `--profile connectors`，需要 Cloudflare webhook 边车时加 `--profile webhook-tunnel`。

> macOS 或用户已在 `docker` 组里，一般不必 `sudo`。

> **重要**：`docker-compose.yml` 默认挂 `./config.toml`，先建好文件再 `up`，否则起不来。

手动部署要开[连接器](/zh/guides/connectors.md)的话，自己生成 Connect-It 凭据并加 `connectors` profile：

```bash
MEMOH_CONNECT_IT_BASE_URL="http://connect-it:8421" \
MEMOH_CONNECT_IT_API_TOKEN="cit_$(openssl rand -hex 32)" \
MEMOH_CONNECT_IT_SECRET_KEY="1:$(openssl rand -hex 32)" \
MEMOH_CONNECT_IT_COOKIE_SECRET="$(openssl rand -base64 32)" \
MEMOH_CONNECT_IT_ADMIN_PASSWORD="自己定一个密码" \
POSTGRES_PASSWORD=你的库密码 \
docker compose --profile connectors up -d
```

这些值要跨重启保持一致（比如放进 `.env`）——API token 是 Memoh 出示给 Connect-It 的凭证，密钥用来加密存储的凭据。一键脚本会把这些全部自动处理。

### 大陆镜像源

拉 Docker Hub 困难时，在 `config.toml` 里取消 `registry` 一行的注释：

```toml
[container]
registry = "memoh.cn"
image_pull_policy = "if_not_present" # if_not_present、always 或 never
```

并叠加国内 overlay：

```bash
docker compose -f docker-compose.yml -f docker/docker-compose.cn.yml up -d
```

一键脚本在 `USE_CN_MIRROR=true` 时会处理这套。

## 访问地址

起来之后：

| 服务 | 地址 |
|------|------|
| 网页 | http://localhost:8082 |
| API | http://localhost:8080 |
| Connect-It 管理台*（带 `connectors` profile 时）* | http://localhost:8421 |

默认登录 `admin` / `admin123`（请在 `config.toml` 改掉）。Connect-It 管理台账号是 `admin` 加安装脚本生成的密码（安装结束时打印，存在 `.env` 里）。首次拉镜像、初始化可能要一两分钟。

## 配置总览

`config.toml` 主段落大致如下：

| 段落 | 含义 |
|------|------|
| `[log]` | 等级与格式（`info`/`debug`；`text`/`json`） |
| `[server]` | 监听，默认 `:8080` |
| `[admin]` | 管理员账号 |
| `[auth]` | JWT 与过期时间 |
| `timezone` | 服时区，默认 `UTC` |
| `[database]` | 数据库驱动；仅支持 `postgres` |
| `[container]` | Workspace backend 选择，以及通用 workspace 镜像、拉取策略、数据路径、runtime 路径、CNI 设置 |
| `[containerd]` | socket 与 namespace |
| `[docker]` | Docker Engine host 覆盖；留空时用 Docker 环境变量或默认 socket |
| `[apple]` | Apple backend 的 socktainer socket 和 binary 覆盖 |
| `[postgres]` | PostgreSQL 连接 |
| `[pgvector]` | 可选的 pgvector 库，用于记忆向量（`enabled`、host、port、user、password、database、sslmode） |
| `[internal_rpc]` | 主服务/渠道 worker 拆分部署的 RPC 地址与共享密钥 |
| `[webhook_tunnel]` | webhook 隧道模式（`disabled` 或 `external`）与 `public_base_url` |
| `[registry]` | 供应商定义目录 |
| `[connect_it]` | [连接器](/zh/guides/connectors.md)用的 Connect-It 地址（`base_url`、`api_token`）；两项都空即关闭该功能。Compose 环境里由 `MEMOH_CONNECT_IT_BASE_URL` / `MEMOH_CONNECT_IT_API_TOKEN` 覆盖 |
| `[web]` | 前端 host/port |
| `[agent]` | 工具输出截断上限：`tool_output_max_bytes`（默认 65536）、`tool_output_max_lines`（默认 2000）、`system_files_max_bytes`（默认 32768）。超限时保留头尾，不是盲切。 |
| `[session_runtime]` | 多实例部署的会话状态后端，见上面「多实例部署」 |

## 多实例部署

单实例部署完全不用管这节——会话状态默认在进程内存里，持久账本在数据库里。

要在负载均衡后面跑多个 Memoh server 实例，agent turn 的会话状态必须挪到共享后端。配置 `[session_runtime]` 块：

```toml
[session_runtime]
backend = "redis"   # "memory"（默认，仅限单实例）或 "redis"
cluster = true       # 声明多实例模式；要求 backend = "redis"
# state_ttl = "24h"
# owner_lease_ttl = "30s"

[session_runtime.redis]
url = "redis://redis:6379/0"
# key_prefix = "memoh:session_runtime:"
```

注意：

- `redis` 是指 Redis 协议，Valkey 也能用。自带的 Docker Compose 栈**不包含** Redis/Valkey 服务，得自己加。
- `cluster = true` 配 `memory` backend 会在启动时直接失败，这是有意设计。
- 用 Redis backend 时 server 启动会做健康探测，连不上就拒绝启动。

## 常用命令

> Linux 上若用户不在 `docker` 组，命令前加 `sudo`。

```bash
docker compose up -d           # 起
docker compose down            # 停
docker compose down -v         # 停并删除 Memoh Docker 数据
docker compose logs -f         # 看日志
docker compose ps              # 状态
docker compose pull && docker compose up -d  # 更新镜像再起
```

## 环境变量

| 变量 | 默认 | 说明 |
|------|------|------|
| `POSTGRES_PASSWORD` | `memoh123` | 须与 `config.toml` 里 `postgres.password` 一致 |
| `MEMOH_CONFIG` | `./config.toml` | 配置文件路径 |
| `MEMOH_DATA_DIR` | `~/memoh/data` | 安装脚本写入 `.env` 的数据目录值；目前预留给后续 bind mount 支持。 |
| `MEMOH_VERSION` | 最新发版 | 要装的 git 标签，例如 `v0.13.0`；也会把 Memoh 镜像钉到去掉开头 `v` 的 tag，例如 `0.13.0` |
| `MEMOH_INSTALL_MODE` | `auto` | 安装模式：`auto`、`fresh`、`upgrade` 或 `reinstall` |
| `MEMOH_DATABASE_DRIVER` | `postgres` | 兼容保留；仅支持 `postgres` |
| `MEMOH_CONTAINER_BACKEND` | `containerd` | Workspace backend。一键 Docker Compose 安装只支持 `containerd`；`docker`、`apple` 请走手动部署。 |
| `MEMOH_ALLOW_ROOT_INSTALL` | `false` | 允许以 root 运行安装脚本本身。建议保持未设置，用普通用户运行安装脚本。 |
| `MEMOH_WEBHOOK_TUNNEL_MODE` | `disabled` | 设为 `external` 时加上 `webhook-tunnel` profile（Cloudflare `cloudflared` 边车），给渠道 webhook 一个公网地址。 |
| `USE_CN_MIRROR` | `false` | 是否用大陆镜像 |
| `MEMOH_CONNECT_IT_MODE` | 全新安装 `embedded`；升级保持原状 | `embedded` 跑同机 Connect-It（`connectors` profile）；`disabled` 关闭连接器 |
| `MEMOH_CONNECT_IT_PUBLIC_BASE_URL` | `http://localhost:8421` | 连接器 OAuth 回调和管理台的公开地址；Memoh 要从其它机器访问时必须设 |
| `MEMOH_CONNECT_IT_PORT` | `8421` | Connect-It 容器的宿主机端口 |
| `MEMOH_CONNECT_IT_IMAGE` | 跟随发布钉版 | Connect-It 镜像覆盖 |

其余 `MEMOH_CONNECT_IT_*`（管理台密码、密钥、cookie secret、API token）是安装脚本生成一次、存进 `.env` 的凭据，一般不需要手动设置。
