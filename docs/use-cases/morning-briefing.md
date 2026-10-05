# Morning Digest

**Owns:** one message that starts your workday with everything you care about.

**Uses:** [Scheduled Tasks](../guides/schedule.md) · [Web Search Providers](../integrations/providers/web-search.md) · [Platforms](../integrations/channels/index.md)

<!-- TODO (manual): screenshot of a real digest message as delivered (Telegram or any channel) -->

## Start with

> Every weekday at 8am, summarize releases and notable issues from the repositories I follow over the last 24 hours, add today's weather, and send it to me as one digest. Cite a source for every item; if something is uncertain, say so instead of guessing.

## How it runs

The bot has a `schedule` tool: describe the timing in plain language and it registers the cron entry itself. Cap the first runs with **Max Calls** until the format looks right.

<!-- TODO (manual): screenshot of the registered scheduled task; optional: screen recording of the full setup -->
