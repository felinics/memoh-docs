# 文件

每个 Bot 都有自己的 **workspace 文件系统**。服务端部署里通常在容器型 workspace 内；受信任的桌面/本地模式下也可能是本地 workspace 目录。在 **Files** tab 里可以直接管理。

---

## 能做什么

带工具栏、目录树、编辑器的 **FileManager** 常见能力：

### 浏览

- 面包屑上下级
- **Refresh** 看 Bot 刚写的文件
- **New Folder** 建目录

### 文件

- **Upload** 本机文件打进 workspace
- **Rename** / **Delete**（目录可递归删）
- **Download** 从 workspace 拉回本机

---

## 看与改

**FileViewer** 里：

- 文本类（如 `.md`、`.js`、`.py`、`.toml`）用 **Monaco** 打开，高亮、保存回写盘。
- 图（`.png` 等）可预览。

---

## 和 Bot

Bot 自己也能用技能、MCP 等改这些文件；**Files** 是你**肉眼查看、手改** workspace 的入口。
