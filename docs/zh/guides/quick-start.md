# 快速开始

大约十分钟即可跑通 Memoh:部署服务端、登录、添加模型供应商、创建第一个机器人,并把它接到一个聊天平台。

::: tip 不想自托管?
[Memoh Cloud](https://memoh.ai) 提供与开源版一致的托管服务。登录后可直接跳到 [第 3 步](#第-3-步添加模型供应商)。
:::

## 前置条件

- 一台安装了 **Docker** 与 **Docker Compose** 的 Linux 服务器或工作站。
- 至少一个 LLM 供应商的 API Key(OpenAI、Anthropic、DeepSeek、智谱……),或本地 Ollama。
- 浏览器可以访问服务器的 **8080**(API)与 **8082**(Web UI)端口。

## 第 1 步:部署服务端

一行安装脚本会拉取镜像、生成 `config.toml`,并用 Docker Compose 启动全部组件:

```bash
curl -fsSL https://memoh.sh | sh
```

中国大陆用户可启用镜像加速:

```bash
curl -fsSL https://memoh.sh | USE_CN_MIRROR=true sh
```

::: warning 不要用 `sudo` 运行整个安装脚本
当前用户不在 `docker` 组时,脚本会自行调用 `sudo docker`。
:::

想手动部署?克隆仓库后执行:

```bash
git clone https://github.com/felinics/Memoh.git
cd Memoh
cp conf/app.docker.toml config.toml
# 编辑 config.toml(管理员密码、JWT 密钥等)
docker compose up -d
```

完成后会看到类似输出:

```text
🌐 Web UI:      http://localhost:8082
🔌 API:         http://localhost:8080
🔑 Admin login: admin / <你的密码>
```

生产环境加固、反向代理与升级方式见 [服务端部署](/zh/self-hosted/docker)。

## 第 2 步:登录

打开 `http://<你的服务器>:8082`,使用安装时设置的管理员账号登录(`conf/app.docker.toml` 中的默认值为 `admin` / `admin123`)。登录后请立即在 **设置 → 账户** 中修改密码。

## 第 3 步:添加模型供应商

1. 在侧边栏进入 **供应商**,点击 **添加供应商**。
2. 选择模板(OpenAI、Anthropic、Gemini、DeepSeek、智谱、OpenRouter、Ollama……)并填入 API Key。
3. 进入该供应商,**同步** 或手动添加至少一个对话模型。

更多细节与客户端类型见 [LLM 供应商](/zh/integrations/providers/llm)。

## 第 4 步:创建第一个机器人

1. 进入 **机器人 → 新建机器人**,填写名称与显示名。
2. 在机器人的 **通用** 标签页中选择刚添加的对话模型。
3. 点击机器人的 **聊天** 按钮打个招呼。收到回复即说明链路已打通。

每个机器人都有独立的工作区、记忆与设置,各标签页说明见 [机器人](/zh/guides/bot)。

## 第 5 步:接入聊天平台

1. 打开机器人的 **渠道** 标签页,点击 **添加**。
2. 选择平台(Telegram、Discord、Slack、飞书、钉钉、企业微信、QQ、LINE、Matrix、Misskey……)并填写平台凭据。
3. 在该平台上给机器人发消息。第一条消息会创建会话;输入 `/help` 查看可用的斜杠命令。

各平台的详细配置见 [渠道](/zh/integrations/channels/)。

## 下一步

| 目标 | 阅读 |
|------|------|
| 让机器人跨会话记住用户 | [记忆](/zh/guides/memory) |
| 运行定时或周期任务 | [定时任务](/zh/guides/schedule) |
| 赋予机器人文件、Shell 与浏览器能力 | [Workspace](/zh/guides/container)、[Computers](/zh/guides/computers) |
| 通过 MCP 服务器添加工具 | [MCP](/zh/guides/mcp) |
| 教会机器人可复用的流程 | [Skills](/zh/guides/skills)、[Supermarket](/zh/guides/supermarket) |
| 控制谁可以和机器人对话 | [访问控制](/zh/guides/access) |
| 在 Mac 上用桌面版运行 | [Desktop](/zh/self-hosted/desktop) |