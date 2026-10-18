# Skills

A **Skill** is a reusable prompt module that teaches a bot a fixed way of working: tone, procedure, tool habits. Skills have no dedicated management screen — a skill is a file in the workspace, and putting it in the right directory is all it takes to load.

::: tip Limits
A session can request at most 5 skills at once; a single skill injects up to 64 KiB, 256 KiB total. These caps are not configurable.
:::

## What one looks like

A skill is a directory containing a `SKILL.md` with a YAML header — at minimum a stable `name` and a short `description`. The body is the instruction text actually injected for the agent:

```yaml
---
name: coder-skill
description: Enables advanced coding workflows and tool usage.
---

# Coder Skill

Write clear code, explain trade-offs, and use the file/command tools when the task calls for them.
```

Use plain ASCII names (`coder-skill`, `research`) without spaces — the name doubles as the directory name.

## Which directory to use

Put skills you write yourself in this directory of the bot's workspace:

```text
/data/skills/user/personal/<skill-name>/SKILL.md
```

Any way of getting the file there works: create it on the bot's **Files** tab, use the **Terminal**, or simply ask the bot — the workspace ships with a `skill-creator` skill, so describe the procedure you want and it writes the files to the right place.

You will see other directories, but **don't put files there by hand**:

| Directory | Owned by |
|-----------|----------|
| `/data/skills/user/personal/` | **You.** All hand-written skills go here |
| `/data/skills/<registry>/<app>/` | [Apps](./supermarket.md). Installed, updated, and removed with the App — don't edit |
| `/data/.memoh/skills/` | Built-in skills from the workspace template (such as `skill-creator`). Refreshed to the template version on every workspace init, so edits get overwritten; to customize, copy it under a new name into your own directory |
| `/data/.skills/`, `/data/.agents/skills/` | Legacy compatibility paths, discovery only — don't add new files |

## Same name, multiple copies

**The skill name is its identity**: however many directories a name appears in, only one copy is effective at a time. A skill in your own directory takes precedence over one in a legacy path. To change how an App's skill behaves, don't edit its files — write your own version under a new name.

## Recommendations

1. Keep them few and sharp, with a clear `name` and `description` — the agent decides whether to load a skill from its description.
2. Only recurring procedures are worth turning into skills; one-off requirements can just be said in chat.
3. Prefer installing from the [Supermarket](./supermarket.md) over copy-pasting duplicates.
