# 邮件

让机器人**收/发**邮件，分两步：**邮服提供方** + 机器人上的 **Email 绑定**。

## 在做什么

1. 先配能连上的 **Email Provider**（如 Mailgun、泛用 SMTP 等）。
2. 再在某个机器人上，把某邮箱**绑定**过去，并设读/写/删权限。

---

## 邮服

侧栏 **Email Provider**。

邮服提供方**按用户隔离**：每人配自己的、只看得见自己的，机器人绑定也只能用机器人所属用户自己的提供方。不同用户可以重名，互不冲突。

<scalar-callout type="tip" title="Gmail OAuth">
Gmail 类提供方的 OAuth 应用凭据（client ID / client secret）不再在界面里填——由部署方在 server 的 `conf/oauth-clients.toml` 里配一次。用户只走 Gmail 登录授权流程。
</scalar-callout>

### 新建

1. **Add Email Provider**
2. 类型如 **Mailgun**（量大）、**泛用 SMTP**（传统邮局）
3. 按表单填 `domain`/`api_key` 或 `host`/`port` 等
4. 创建

---

## 机器人上的绑定

机器人 **Email** tab。

### 添加

1. **Add Binding**
2. 选已建的 **Email Provider**
3. 填要绑的 **Email Address**
4. 勾权限：
   - **Can Read** 收信、处理入站
   - **Can Write** 发信
   - **Can Delete** 管邮箱里删除等（视实现）
5. 创建

### 发件箱

**Outbox** 会记发出的邮件：收信人、主题、状态、时间，便于对账、排错。

---

## 和机器人

- 有权限时可用邮件发报告、回邮、或按新邮件做事。
- 和聊天一样，是另一条渠道，但仍是结构化、可审的。
