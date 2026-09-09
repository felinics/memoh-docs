# Preferences

Memoh v0.13 includes user-level preferences for the Web UI. These preferences change how the interface looks and how keyboard shortcuts behave for the current browser or desktop app profile. They do not change a bot's personality, model, tools, memory, or access rules.

Open **Settings**, then use **Appearance** for visual preferences and **Keyboard** for shortcuts.

---

## Appearance

The **Appearance** page is split into interface, typography, code highlighting, and diagram settings. Changes apply immediately.

### Interface

| Setting | What It Does |
|---------|--------------|
| **Language** | Sets the Web UI language. v0.13 includes English, Simplified Chinese, and Japanese. If you have not chosen a language yet, Memoh detects English, Chinese, or Japanese from the browser language and falls back to English. |
| **Theme** | Chooses Light, Dark, or System. System follows the operating system or browser color mode. |
| **Color Scheme** | Changes the accent palette used by brand elements, status colors, and interface controls. Available schemes are Memoh, Ocean, Forest, Rose, and Amber. |

Language is for the Memoh interface. A bot's reply language is still configured from the bot settings.

### Typography

Use typography settings when the interface feels too small, too large, or when you prefer a different code font.

| Setting | What It Affects | Range / Default |
|---------|-----------------|-----------------|
| **UI Font Size** | General interface text and controls | `12`-`20` px, default `16` |
| **Code Font Size** | Code editors, Markdown code blocks, and terminal text | `11`-`20` px, default `13` |
| **UI Font Family** | The main interface font | Default: `system-ui, sans-serif` |
| **Code Font Family** | Code, editor, and terminal font stack | Default: `ui-monospace, monospace` |

Font family fields accept normal CSS-style font stacks, such as `Inter, system-ui, sans-serif` or `"JetBrains Mono", ui-monospace, monospace`. The font must be available on your device or browser environment. Clear the field, or enter the default value, to return to Memoh's default stack.

### Code Highlighting

Memoh uses Shiki themes for highlighted code. You can choose separate themes for light mode and dark mode:

| Setting | What It Affects |
|---------|-----------------|
| **Light theme** | Code blocks and editors while the interface is in light mode |
| **Dark theme** | Code blocks and editors while the interface is in dark mode |

The theme picker searches the bundled Shiki theme list and shows a live preview, so you can compare the light and dark choices before leaving the page.

### Diagrams

Mermaid diagrams rendered in chat and Markdown previews use the **Mermaid Theme** preference.

| Theme | Behavior |
|-------|----------|
| **Auto** | Matches the current interface mode. |
| **Default** | Uses Mermaid's default light theme. |
| **Dark** | Uses Mermaid's dark theme. |
| **Forest** | Uses Mermaid's forest theme. |
| **Neutral** | Uses Mermaid's neutral theme. |

Diagrams that already include their own Mermaid initialization directive may keep their authored theme, which is useful for documents that need a specific diagram style.

---

## Keyboard Shortcuts

The **Keyboard** page lists editable shortcuts by scope. Click **Edit** on a row, press the new key combination, then save.

### Default Shortcuts

`Cmd` on macOS is shown as `Ctrl` on Windows and Linux.

| Action | Default | Scope |
|--------|---------|-------|
| Close current workspace tab | `Cmd/Ctrl + W` in the desktop app. In a normal browser, the browser keeps its native close-tab behavior. | Global |
| Save active file | `Cmd/Ctrl + S` | Global |
| Toggle sidebar | `Cmd/Ctrl + B` | Global |
| Open Settings | `Cmd/Ctrl + K` | Global |
| Close media lightbox | `Esc` | Media Lightbox |
| Previous media | `Left Arrow` | Media Lightbox |
| Next media | `Right Arrow` | Media Lightbox |

Global shortcuts are active across the app. Media Lightbox shortcuts are active only while the media preview overlay is open.

### Editing Rules

Memoh checks a shortcut before saving it:

- `Cmd/Ctrl + W`, `Cmd/Ctrl + Q`, `Cmd/Ctrl + T`, and `Cmd/Ctrl + N` are reserved for the browser or operating system.
- Global shortcuts must include `Cmd/Ctrl` or `Alt`, so normal typing does not trigger app commands.
- Two shortcuts in the same scope cannot use the same combination.
- A shortcut may share a combination with a different scope, but Memoh shows a warning because only the active scope can use it.

Use the reset button on a row to restore one shortcut. Use **Reset all** to clear every custom shortcut.

---

## A Few Practical Notes

- Appearance and keyboard preferences are personal UI preferences. Other users and bots are not changed.
- Preferences are stored on the current device/browser profile, so another browser or machine may need its own setup.
- If the interface looks wrong after experimenting with fonts or shortcuts, reset the changed field or shortcut from the same page.
