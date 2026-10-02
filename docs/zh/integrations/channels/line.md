# LINE

把 Memoh Bot 接入 LINE 官方账号:用户加该账号为好友,即可与 Bot 1 对 1 聊天。

::: warning 使用限制
- 仅支持私聊。群和多人聊天室的消息会被忽略,把 Bot 拉进 LINE 群没有用。
- 仅输出纯文本,不渲染 Markdown。
- 出站媒体仅限 PNG/JPEG 图片。图片必须公网 HTTPS 可访问,且符合 LINE 体积限制(原图 10 MB、预览图 1 MB);图片之外的附件发不出去。
- 入站的语音、视频、贴图、位置不处理。入站图片必须由 LINE 托管(在 App 里直接发照片就是这种)。
- 无流式输出,回复整条送达;超长回复按 LINE 的 5000 字符上限拆成多条。
- 回复走 LINE **Push API**,计入 LINE 套餐的推送条数配额。
:::

## 前提条件

LINE 用 **webhook** 推消息进来,出站图片也由 LINE 服务器来抓取,所以 Memoh 部署必须有公网 HTTPS 入口,二选一:

- 设 `MEMOH_WEBHOOK_PUBLIC_BASE_URL` 为公网 HTTPS origin(不能带路径、端口、内网地址);
- 或在 server deploy 里启用 Cloudflare Quick Tunnel profile,Memoh 会自动拿到公网地址。

## 步骤

### 1. 在 LINE Developers Console 创建 Messaging API channel

在 LINE Developers Console:

1. 打开 [LINE Developers Console](https://developers.line.biz/console/)。
2. 建(或选)一个 provider,在下面创建 **Messaging API** channel,它会关联一个 LINE 官方账号。
3. 在 **Basic settings** 里复制 **Channel secret**。
4. 在 **Messaging API** tab 里签发并复制 **Channel access token**(长效)。

> 官方文档:[Messaging API - Getting Started](https://developers.line.biz/en/docs/messaging-api/getting-started/)

### 2. 在 Memoh 里添加渠道

在 Memoh:

1. 打开 Bot 的 **平台** 标签页。
2. 点 **Add Channel**,选择 **LINE**。
3. 贴入 **Channel Secret** 和 **Channel Access Token**。
4. 点 **Save**(或 **Save and Enable**)。回调 URL 要保存之后才会生成。

### 3. 注册 webhook

在 Memoh,保存后面板会显示只读的 **WebHook Callback URL**,格式:

```text
https://<公网 base>/channels/line/webhook/<config_id>
```

两种注册方式:

- 点 **Set in LINE**——Memoh 直接通过 Messaging API 把地址写进 LINE channel。有未保存的改动会先报错,保存了再点。
- 或点 **Copy**,到 LINE Developers Console 的 **Messaging API → Webhook URL** 手动粘贴。

最后在 LINE Developers Console 里确认该 channel 的 **Use webhook** 已打开。

Memoh 会用 **Channel Secret** 校验入站 webhook 的签名,事件在 24 小时内去重。

## 凭据

| 字段 | 必填 | 说明 |
|------|------|------|
| **Channel Secret** | 是 | 在 Messaging API channel 的 **Basic settings** 里复制。 |
| **Channel Access Token** | 是 | 在 **Messaging API** tab 里签发的长效 token。 |

## 验证

用 LINE 加该官方账号为好友,在 1 对 1 聊天中给 Bot 发送 `/help`。Bot 回复命令列表,说明渠道已接通。

## 停用与更换凭据

随时可在 Bot 的 **平台** 标签页停用或移除该渠道。更换凭据时,在同一面板更新 **Channel Secret** / **Channel Access Token** 并保存即可。

## 常见问题 {#faq}

### 面板提示拿不到公网 base URL {#no-public-base-url}

没有公网 HTTPS origin 就生成不了 webhook 回调 URL。先按前提条件把 `MEMOH_WEBHOOK_PUBLIC_BASE_URL` 或 Cloudflare Quick Tunnel 配好。
