# Desktop

Memoh Desktop 是面向 Memoh Cloud 或自托管 Memoh 服务端的原生客户端。它把同一套 Web UI 打包进 Electron 外壳，提供原生窗口、托盘、菜单与快捷键，并且可以把所在的这台电脑注册为机器人可用的 **Computer**。

Desktop **不会**自己运行本地服务端或数据库。你始终需要把它连到一个 Memoh 服务端：[Memoh Cloud](https://memoh.ai) 或你自己的 [Server Deploy](./docker.md)。

## 何时使用 Desktop

适合以下场景：

- 想要原生 App 窗口与系统托盘，而不是浏览器标签页
- 想用原生菜单与快捷键处理日常的 Memoh 工作流
- 想让服务端的机器人使用这台电脑的文件、Shell 与浏览器，又不想单独跑一个 runtime 进程

如果只是偶尔从浏览器访问，直接用 Web UI 即可。

## 安装

1. 从 [Memoh Desktop 下载页](https://memoh.ai/desktop) 下载对应平台的安装包（macOS DMG、Windows NSIS、Linux AppImage/deb/rpm）。
2. 打开 Memoh。
3. 在连接页填写服务端地址（或选择 Memoh Cloud）。
4. 用你的 Memoh 账号登录。

## 连接服务端

在连接页输入服务端地址后连接：

- 裸域名（如 `memoh.example.com`）默认按 `https://` 处理（只有 localhost 地址默认 `http://`）。
- 缺少 `/api` 后缀时会自动补上，只填域名即可。
- Desktop 会先探测服务端的 `/ping`（5 秒超时），成功后再进入登录页。

切换到另一个服务端会清除本地登录状态，需要重新登录。

## 把这台电脑共享给机器人

Desktop 可以把它所在的机器注册成服务端机器人可用的 **Computer**，不用另跑 runtime 进程：打开 **这台电脑** 开关，起个名字，Desktop 会通过内嵌的 Memoh runtime SDK 在后台维持连接。凭据使用操作系统的安全存储保存。

权限模型、按机器人授权以及机器人在电脑上能做什么，见 [电脑](../guides/computers.md)。

## Desktop 负责什么

- 应用窗口、托盘图标、重新打开与退出行为
- 与 Web UI 共用命令注册表的原生菜单
- 到所选服务端的连接及其缓存的登录状态
- **这台电脑** 对应的可选 Remote Runtime 连接

其它一切（机器人、会话、记忆、工作区、渠道）都在你连接的服务端上。工作区运行时在服务端配置，见 [Workspace Backends](./workspace-backends.md)。