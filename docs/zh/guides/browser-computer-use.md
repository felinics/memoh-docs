# Browser Use 与 Computer Use

Memoh 可以在机器人 workspace 容器里启动一个可见桌面和有头浏览器。这和跑 headless Playwright 脚本不是一条路径：机器人操作的是网页端 Display pane 里也能看到的那套图形浏览器。

## 概念区别

| 能力 | 适合 | 工作方式 |
|------|------|----------|
| Headless browser 命令 | 快速脚本化网页自动化 | 在 workspace 里正常运行 Playwright 或其它浏览器工具。 |
| Browser Use | 网页、表单、导航、截图、可访问性树检查 | 通过 CDP 操作 workspace 里的有头 Chrome/Chromium。 |
| Computer Use | 原生弹窗、浏览器状态坏掉、非浏览器 GUI | 读取桌面无障碍树（AT-SPI）拿到 ref，无法解析时回退到坐标与截图。 |

网页内操作优先用 Browser Use。只有遇到 CDP 够不到的 GUI 状态时，再用 Computer Use。

## Workspace display 与 VNC

Workspace display 是机器人 workspace 容器里的桌面环境。VNC/RFB 是这套桌面的显示和输入传输基础；网页端的 Display 会话使用 WebRTC 承载画面。

重点不是“有 VNC”本身，而是 workspace 能跑有头 Chrome/Chromium。很多登录、验证码、复杂前端状态或只支持真实图形会话的网站，headless 模式不一定可靠。

## 准备机器人桌面

1. 打开机器人详情页。
2. 进入 **Desktop** tab。
3. 准备或启用 workspace display runtime。
4. 从机器人设置页或聊天 workspace 打开 display session。

Display runtime 会安装或使用桌面、VNC server、浏览器和字体等组件。具体可用性取决于 workspace backend 和镜像。

## Agent 工具

workspace desktop 启用后，agent 可以使用浏览器和电脑操作工具：

- `browser_observe` 检查当前浏览器页面（snapshot、get_content、screenshot、evaluate 等）。
- `browser_action` 在有头浏览器里点击、填表、输入、按键、导航。
- `browser_remote_session` 暴露浏览器 CDP endpoint，给代码驱动的会话使用。
- `computer_observe` 返回桌面无障碍树快照（ref 如 `e3`）或者一张落盘截图的路径。
- `computer_action` 操作桌面：优先使用快照里的 `ref`；当 ref 不可用或无障碍调用失败时回退到 `(x, y)` 坐标。

### 截图不再自动注入对话

`browser_observe` 与 `computer_observe` 的截图会落盘到 workspace 路径（如 `/data/computer-screenshots/1716200000.jpg`），工具结果只返回这个路径，不再自动塞到对话里。需要查看图像时显式调用文件读取工具读这个路径，可以让观察成本变低，也把“是否值得花 token 读图”交回模型决定。

### 无障碍辅助二进制

Computer Use 依赖容器内 `/opt/memoh/toolkit/display/bin/a11y-cli` 以及 workspace 的 `at-spi2-core` 包。Display runtime probe 会返回 `a11y_available`，便于 Web UI 显示无障碍路径是否健康。AT-SPI 不可用时，`computer_action` 仍可用坐标驱动，`computer_observe screenshot` 仍然可用。

这些是 workspace runtime 能力，不是用来自动化 Electron 桌面 App 本身的。

机器人挂了远程[电脑](./computers.md)时，Browser Use / Computer Use 也仍然在**服务器工作区**里跑，不跟随所选使用位置。

## 相关页面

- [容器与 Workspace](./container.md)
- [Workspace backend](../self-hosted/workspace-backends.md)
