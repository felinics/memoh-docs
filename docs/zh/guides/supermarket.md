# 应用市场（Supermarket）

应用市场是 Memoh 内置的**连接器**和 **Skills** 目录。连接器把第三方服务（GitHub、Notion 这类）绑到 Bot 上；Skills 是 Agent 可按需加载的可复用流程。

Web UI 会在 Settings 下显示应用市场，提供两个 tab：

- **Connectors**
- **Skills**

服务器[配置了 Connect-It](./connectors.md#前提) 时，**Connectors** 排在第一个，也是默认落地的 tab；没配置时这个 tab 不显示，默认落在 **Skills**。

---

## 连接一个服务

**Connectors** tab 列出可以通过 OAuth 或 API Key 连给 Bot 的服务。挑一个点 **Connect**，选目标 Bot，完成授权即可。完整流程——认证方式、连接状态、工具怎么到 Bot 手上——见[连接器](./connectors.md)。

---

## 安装 Skill

1. 在 Web UI 中打开 **应用市场**。
2. 切到 **Skills** tab。
3. 选择一个 Skill 并点击 **Install**，或进入 Skill 详情页点击 **Install to Bot**。
4. 选择目标 Bot。
5. 确认安装。
6. Skill 会出现在该 Bot 的 **Skills** tab 中。

Skill 会安装到 Bot 工作区内的 managed skills 目录（`/data/skills/<skill-name>`）。Skill 详情页展示作者、版本、来源 registry 和链接。加载与使用方式见 [Skills](./skills.md)。

---

## 配置应用市场

默认情况下，Memoh 会从这里读取应用市场内容：

```toml
[supermarket]
base_url = "https://supermarket.memoh.ai"
```

运维方可以把 `supermarket.base_url` 指向其它可信目录。该 endpoint 会用于连接器列表、Skill 列表、Skill 详情和 Skill 下载。Skills tab 中的 **Registry** 筛选可以只看某一个上游 registry 的结果。

---

## 贡献

新的 Skills 可提交到：

- [felinics/supermarket](https://github.com/felinics/supermarket)
