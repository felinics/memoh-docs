# Bot Access Control

Memoh access control has two layers:

- **Channel Members** control identities coming from IM channels such as Telegram, Discord, Feishu, Matrix, QQ, and similar platforms.
- **Workspace Members** control registered Memoh users in the web app and workspace.

The old ACL rule model still exists, but it is now the advanced engine behind Channel chat access. Most day-to-day changes should start from the bot's **Access** tab, using **Channel Members** and **Workspace Members**.

---

## The Mental Model

| Layer | Identity | Controls |
|-------|----------|----------|
| **Channel Members** | A channel identity observed from an IM platform | Whether that platform identity can chat with the bot, and whether it can manage the bot from IM commands |
| **Workspace Members** | A registered Memoh user account | Whether that user can use the bot in the web app, read/write files, run workspace commands, or manage bot settings |

These layers can be connected by account binding. A workspace user can bind a channel identity from **Profile -> Connected Accounts** by generating a one-time code and sending `/link <code>` to a Memoh bot in IM. After binding, Memoh can tell that the IM identity belongs to that workspace user.

Binding does not grant access by itself. It only connects identities. Permissions still come from Channel Members, Workspace Members, bot ownership, or system admin status.

---

## Quick Start

### Let Anyone Chat From IM

1. Open the bot's **Access** tab.
2. Go to **Channel Members**.
3. Set **Access Mode** to **Blacklist Mode**.
4. Leave the member list empty, or add only the identities you want to block.

Blacklist Mode means the ACL default effect is `allow`. Everyone can chat unless a matching deny rule exists.

### Allow Only Selected IM Identities

1. Open **Channel Members**.
2. Set **Access Mode** to **Whitelist Mode**.
3. Add the channel identities that should be allowed.
4. Keep **Chat** checked for each allowed identity.

Whitelist Mode means the ACL default effect is `deny`. Only matching allow rules can chat.

### Give A Web User Access

1. Open **Workspace Members**.
2. Add a specific member, or add **Everyone**.
3. Select the permissions that member should have.

Workspace access is for registered Memoh users. It is separate from IM chat access unless the user links their IM identity.

---

## Channel Members

Channel Members is the IM-side access surface.

Each row represents a **channel identity** — one Telegram user, Discord member, or Matrix user — or a **group** (see below). Members are added from the inline picker in the card header; identity and group candidates appear in the same dropdown, grouped by section. A row can have two independent permissions:

| Permission | Meaning |
|------------|---------|
| **Chat** | Controls whether inbound IM messages from that identity can trigger the bot. |
| **Manage** | Controls whether that identity can manage the bot from IM slash commands. Manage does not automatically grant Chat. |

### Chat

The Chat checkbox is backed by ACL rules for `chat.trigger`.

In **Blacklist Mode**:

- the default is `allow`
- adding or unchecking Chat for an identity creates a deny rule
- checking Chat removes that identity-specific deny rule

In **Whitelist Mode**:

- the default is `deny`
- adding or checking Chat for an identity creates an allow rule
- unchecking Chat removes that identity-specific allow rule

### Manage

The Manage checkbox writes a local Channel Access override for that channel identity.

Manage is used by IM commands. It lets a channel identity act as a bot manager for owner-level slash command flows. It is intentionally independent from Chat: a manager can still be denied normal chat messages if Chat is off or the ACL denies them.

### Groups As Members

Besides individual identities, you can add an entire **group chat** as a member row. Group candidates come from conversations the bot has observed on its channels, and rows carry a "Group" badge.

- A group row's **Chat** checkbox means "everyone in this group" — in Whitelist Mode it allows the whole group to trigger the bot, in Blacklist Mode it blocks the whole group.
- **Manage is not available for groups.** Managers are always individual channel identities.
- Rules that combine both — "this person, in this group" — are still possible through the advanced ACL rules.

### Platform Members

If a channel identity is linked to a workspace member of this bot, the row is marked as a platform member.

When the linked workspace member has **Manage** in Workspace Members, the channel identity inherits Manage automatically. The Channel Members row then shows that Manage is inherited. If you toggle Manage in Channel Members, Memoh writes a local override:

- local **on** forces Manage on for this channel identity
- local **off** suppresses inherited Manage for this channel identity
- **Reset to inherited** removes the local override and follows Workspace Members again

Only local-only channel rows can be removed from Channel Members. Platform member rows come from their workspace binding and are managed by permissions or by disconnecting the binding.

---

## Workspace Members

Workspace Members is the web/workspace access surface.

You can grant access to:

- a **specific member**
- **Everyone**

The bot owner is shown as an implicit owner entry and always has full access. System admins also resolve to full access.

Workspace permissions are:

| Permission | Allows |
|------------|--------|
| **Can chat** | Use the bot from web chat surfaces. |
| **Read files** | Read bot workspace files. |
| **Write files** | Modify bot workspace files. This also implies Read files. |
| **Run commands** | Run workspace execution flows. |
| **Can manage** | Manage bot settings and access. This implies all other workspace permissions. |

Workspace Manage also flows into Channel Members for linked channel identities. If a user with Workspace Manage links a Telegram identity, that Telegram identity inherits Manage on the channel side.

Workspace **Can chat** is not the same as Channel **Chat**. Workspace permissions authorize web app and workspace APIs; Channel Chat authorizes IM inbound messages through the ACL engine.

---

## Linking Channel Identities

Users link IM identities from **Profile -> Connected Accounts**:

1. Click **Connect**.
2. Copy the generated `/link <code>` command.
3. Send it to a Memoh bot in an IM channel.
4. The code binds the sending channel identity to the current Memoh user account.

Important details:

- link codes are one-time and expire after a short period
- `/link <code>` is allowed even when the sender is denied by chat ACL, so users can recover from an unlinked state
- binding is account-level: it connects the workspace user and the channel identity globally
- binding does not grant Chat or Manage by itself

After linking, Workspace Manage can be inherited by the matching Channel Members row.

---

## Access Mode And Advanced ACL Rules

Channel Chat uses the ACL engine. The Access page presents it as **Access Mode** plus optional advanced rules.

| Access Mode | ACL default effect | Matching rules that matter |
|-------------|--------------------|----------------------------|
| **Blacklist Mode** | `allow` | `deny` rules |
| **Whitelist Mode** | `deny` | `allow` rules |

Only rules opposite to the current default effect override the default mode. A rule with the same effect as the default does not change the result.

Advanced rules can target:

- all users
- all users on a platform
- one channel identity
- one channel identity on a platform

Advanced rules can also be scoped to:

- any chat
- private conversations
- group conversations
- threads
- a specific conversation ID
- a specific thread ID

The rule target handles platform filtering. Source scope handles conversation and thread filtering.

Unlike older ACL documentation, current versions do not expose manual rule priority or drag-to-reorder behavior. Think in terms of the current default mode plus matching opposite-effect rules.

---

## Creation Presets

When creating a bot, the ACL preset only initializes Channel Chat behavior. You can change it later from **Channel Members**.

| Preset | Initial behavior |
|--------|------------------|
| `allow_all` | Default effect `allow`; no extra rules |
| `private_only` | Default effect `deny`; allow private conversations |
| `group_only` | Default effect `deny`; allow group conversations |
| `group_and_thread_only` | Default effect `deny`; allow group and thread conversations |
| `deny_all` | Default effect `deny`; no extra allow rules |

Presets do not configure Workspace Members and do not create account bindings.

---

## Examples

### Public IM Bot With A Few Blocks

Use **Blacklist Mode** in Channel Members. Leave Chat on by default and add blocked identities. Use Advanced rules only if you need to block an entire platform or a group/thread context.

### Private IM Bot

Use **Whitelist Mode** in Channel Members. Add the allowed channel identities and keep Chat checked. If the same people should manage the bot from IM, also grant Manage.

### Web Team Bot

Use **Workspace Members**. Add specific users or Everyone, then choose `Can chat`, file permissions, command execution, and Manage according to their web/workspace role.

### Workspace Manager Also Manages From Telegram

Grant the user **Can manage** in Workspace Members. Ask them to link their Telegram account with `/link <code>`. Their Telegram identity will inherit Manage in Channel Members. If you need to disable Telegram-side management for that identity only, turn off Manage in Channel Members to create a local override.

---

## Debugging

When access is surprising, check these in order:

1. **Which layer is involved?** IM messages use Channel Chat ACL. Web app and workspace APIs use Workspace Members.
2. **Is the identity linked?** Connected Accounts determines whether Workspace Manage can inherit into Channel Members.
3. **What is the Channel Access Mode?** Blacklist Mode defaults to allow; Whitelist Mode defaults to deny.
4. **Is Manage inherited or overridden?** The Channel Members info popover shows whether Manage follows Workspace Members or is locally overridden.
5. **What does `/access` show?** In IM, `/access` reports the current identity, write access, and chat ACL context for the sender.

Remember that Manage and Chat are separate. Manage can allow owner-level IM commands, but normal inbound chat still needs Channel Chat to allow the sender.
