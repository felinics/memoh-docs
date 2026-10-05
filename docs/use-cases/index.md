# Use Cases

Ready-to-follow scenarios that combine multiple Memoh features to solve real problems. Each scenario has its own chapter: what the bot owns, which features it uses, and how it comes together.

A good bot **owns a repeatable outcome**, not a loose category of questions. Every example starts with read-only work — check the output first, then grant more.

| Scenario | Owns |
|----------|------|
| [Morning Digest](./morning-briefing.md) | One message that starts your workday with everything you care about |
| [Release Watch](./release-watch.md) | An external change you are waiting for, reported the moment it happens |
| [Group On-Call Assistant](./group-duty-assistant.md) | Answering in a team group and posting the daily recap |
| [A Living Spreadsheet](./data-upkeep.md) | One data file: created, updated on schedule, changes reported first |
| [Screen Work Behind Logins](./gated-web-tasks.md) | Web tasks that need eyes on a screen: checks, forms, authorization |
| [Build and Preview in the Cloud](./code-and-preview.md) | A small project built in its own workspace, running where you can see it |
| [An Assistant That Remembers](./personal-assistant.md) | Your preferences and project state, carried across sessions and platforms |

## From Example to Routine

1. **Start read-only.** Let it read and prepare; review a few outputs before granting writes or execution.
2. **Put constraints in the instructions.** Outcome, sources, constraints, format, checkpoints — spell out all five (see [Quick Start](../guides/quick-start.md)).
3. **Save repeated flows as [Skills](../guides/skills.md).** One sentence should invoke the whole routine.
4. **Add a [Schedule](../guides/schedule.md) only once the flow is stable.** Trial-run with Max Calls first.
5. **Keep writes and external actions behind approval,** even after the routine feels safe.
6. **Fence who can command it with [Access Control](../guides/access.md)** — especially bots that join group chats.
7. **Let [Memory](../guides/memory.md) hold your preferences.** A correction made once should stick.
