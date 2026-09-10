# 电脑（远程 Runtime）

可以把你自己的电脑接进 Memoh 部署，让机器人在上面干活：读写文件、跑命令。Web UI 里这叫**电脑**（电脑）；机器人这边以**使用位置**（Work locations）的形式在它们之间选。

Agent 本体不挪窝。模型调用、聊天、会话、记忆全在 Memoh server 上——接进来的电脑只提供文件系统和命令执行，在 agent 眼里就是又一个 workspace。

连接方向是电脑**主动连 server** 的 WebSocket。电脑不需要公网 IP、不需要开端口，在 NAT 后面也行。

<scalar-callout type="danger" title="想清楚你在共享什么">
接入的电脑暴露的是跑 runtime 的那个系统用户能访问的文件，命令也**以该用户身份**执行。没有目录沙箱：那个用户碰得到的，有权限的机器人就碰得到。只有你明确添加了这台电脑的机器人才能用它，写/执行默认也要审批——但心态上要按"给了个 shell"来对待。
</scalar-callout>

---

## 接入一台电脑

### 命令行方式

1. 打开 Web UI 设置里的 **电脑** 页。
2. 创建一个 runtime key（形如 `mrk_...`；任何登录用户都能建，电脑归创建 key 的用户所有）。
3. 在要接入的电脑上跑页面生成的命令（Node.js 20+）：

```bash
npx --yes @memohai/runtime --server https://your-memoh-server/api --key mrk_xxxx
```

连接强制 `wss://`（TLS）；纯 `http` 只允许 localhost 且要加 `--insecure-localhost`（适用时 UI 会自动带上）。断线自动指数退避重连。

server 地址和 key 也可以用环境变量 `MEMOH_RUNTIME_SERVER` / `MEMOH_RUNTIME_KEY` 给。

### 桌面版方式

Memoh Desktop 内置了这个能力：打开**这台电脑**开关、起个名字，App 进程内直接连——不用另开终端。key 用系统钥匙串加密存储，重启自动恢复连接，并且绑定配置时的 server（桌面版换连别的 server 时它会进错误状态，不会悄悄挂到新 server 上）。

### key 管理

- **吊销** key 会立刻断开对应电脑。
- key 对所有者保持可见，方便日后再复制连接命令——也就是说 server 侧是可读存储的，server 数据库要按敏感数据保护。

---

## 机器人的使用位置

每个机器人有一组**使用位置**（Work locations）：

- **服务器工作区**——机器人在 server 上的常规容器 workspace。恒定存在，删不掉。
- 你加给这个机器人的若干**电脑**。

其中恰好一个是**默认位置**，没特别指定时活都在那干。给机器人加电脑需要 bot 管理权限，且电脑只能挂到**同一个用户**拥有的机器人上。

位置行会显示状态：在线、离线、或 **Update required**（电脑上的 `@memohai/runtime` 客户端比 server 要求的旧——重启 `npx` 会自动拿最新版）。

### 按请求选位置

- 聊天输入框有**电脑选择器**，单条消息的活可以指定到某个位置。
- Agent 每次工具调用也可以指定位置；指定的位置不可用时**明着报错**，绝不静默回落到 server 或别的电脑。
- Agent 可以用 `list_execution_locations` 工具列出当前机器人的位置。

### 按位置的工具审批

每个位置有自己独立的审批策略：**读 / 写 / 执行**各自设 allow / ask / deny。电脑的默认值：读 **allow**、写 **ask**、执行 **ask**——机器人可以随便看，但要改你机器上的文件或跑命令得先问。审批请求钉在发起时的那个位置上。

---

## 限制

- **Browser Use / Computer Use 永远在服务器工作区里跑**，不跟随所选位置。
- **ACP agent 会话**不支持指定电脑。
- 路径：runtime 以系统用户的 home 目录为工作根；工具调用里的 `~` 和 `/data` 会映射到 home，兼容容器 workspace 的路径习惯。

---

## 相关页面

- [Workspace](./container.md)
- [Browser / Computer Use](./browser-computer-use.md)
- [自托管总览](../self-hosted/index.md)
