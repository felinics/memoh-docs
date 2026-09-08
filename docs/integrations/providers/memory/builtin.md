# Built-in Memory Provider

The built-in memory provider is the standard memory backend shipped with Memoh. It works with Memoh's memory pipeline and supports:

- Automatic memory extraction from conversations
- Semantic memory retrieval during chat
- Manual memory creation and editing
- Memory compaction and rebuild workflows

---

## How It Works

The built-in provider runs in **graph** mode. Memory nodes and edges are stored in PostgreSQL as the source of truth, and a Markdown view (the `memory/` bundle plus `MEMORY.md` in the bot workspace) is derived from them for the agent to read and edit.

Semantic retrieval is optional and layered on top:

| Layer | Storage | Requirements | What it adds |
|-------|---------|--------------|--------------|
| **Graph** (always on) | PostgreSQL memory nodes/edges | None beyond the main database | Structured recall, relations between memories, compaction, rebuild |
| **Semantic index** (optional) | `pgvector` database | The `[pgvector]` database from the Compose stack **and** an embedding model selected on the provider | Vector similarity search over memory nodes |

If no embedding model is set, or the `pgvector` database is not configured, the provider still works in graph-only mode; semantic search is simply skipped.

---

## Creating a Built-in Provider

1. Navigate to the **Memory Providers** page.
2. Click **Add Memory Provider**.
3. Fill in the following fields:
   - **Name**: A display name for this provider.
   - **Provider Type**: Select `builtin`.
4. Click **Create**.

---

## Configuring a Built-in Provider

After creating a provider, select it from the list and configure its settings.

| Field | Description |
|-------|-------------|
| **Embedding Model** | Optional. An embedding model from one of your LLM providers. When set (and `pgvector` is available), memory nodes are embedded and semantic search is enabled. Leave empty for graph-only mode. |

### Managing Providers

- **Edit**: Select a provider and update its settings.
- **Delete**: Remove a provider you no longer use.

---

## Infrastructure Requirements

### Graph-only

No additional infrastructure beyond the main PostgreSQL database.

### Semantic index

The default Docker Compose stack already includes a `pgvector` service and the matching section in `config.toml`:

```toml
[pgvector]
enabled = true
host = "pgvector"
port = 5432
user = "memoh"
password = "memoh123"
database = "memoh_vector"
sslmode = "disable"
```

Then pick an **Embedding Model** on the provider. Embeddings are generated through the selected LLM provider (OpenAI, Gemini, Ollama, ...), so that provider must expose an embedding-capable model.

---

## Assigning a Memory Provider to a Bot

1. Navigate to the **Bots** page and open your bot.
2. Go to the **General** tab.
3. Find the **Memory Provider** dropdown.
4. Select the provider you created.
5. Click **Save**.

If no memory provider is selected, the bot will not use that provider configuration in its runtime settings.

---

## Using Memory After Setup

Once a memory provider is assigned to the bot, you can manage actual memories from the bot's **Memory** tab:

- Create memories manually
- Extract memories from conversations
- Search, edit, and delete memories
- Compact or rebuild the memory store

For day-to-day memory operations, continue with [Bot Memory Management](/guides/memory.md).