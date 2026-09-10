# 自托管总览

Memoh 以服务端形态运行，Web UI 和 Desktop 桌面版都是它的客户端。先选好服务端方案，再决定怎样访问它。

| 场景 | 选择 | 原因 |
|------|------|------|
| 什么都不想装，先试试 | [Memoh Cloud](https://memoh.ai) | 托管服务，功能一致，无需运维服务器。 |
| 共享服务器、远程访问、生产长期在线、对接 Telegram/Discord/飞书/微信/邮件等渠道、多用户或多租户 | [Server Deploy](./docker.md) | Docker Compose 栈会持续运行后端、网页端、PostgreSQL（含 pgvector 记忆存储）和 workspace runtime。 |
| 想在自己电脑上用原生 App，或把这台电脑作为 Computer 共享给机器人 | [Desktop 桌面版](./desktop.md) | 连接 Cloud 或自托管服务端的原生客户端；不会在本地运行服务端。 |

## Server Deploy

Server Deploy 适合多人、远程、长期在线或多租户场景。机器人需要持续接入 Telegram、Discord、飞书、微信、公众号、邮件等外部渠道时，也应该用这一形态。

最快的路径见 [快速开始](../guides/quick-start.md)，完整参考见 [Server Deploy](./docker.md)。

## Desktop 桌面版

Desktop 适合想要托盘图标与快捷键的原生体验，或者想让服务端机器人使用你电脑上的文件、Shell 和浏览器的场景。Desktop 始终连接一个服务端（Cloud 或自托管），详见 [Desktop](./desktop.md)。

## 相关页面

- [Workspace backend](./workspace-backends.md) 解释 Docker、containerd、Apple 和本地 workspace 的差异。
- [电脑](../guides/computers.md) 介绍如何把自己的机器共享给机器人。