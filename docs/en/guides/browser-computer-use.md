# Browser Use and Computer Use

Memoh can give a bot a visible workspace desktop and a headed browser inside its workspace container. This is different from running a headless Playwright script: the bot can inspect and operate the same graphical browser that you can see in the Web UI display pane.

## Concepts

| Capability | Best for | How it works |
|------------|----------|--------------|
| Headless browser commands | Fast scripted automation inside a workspace | Run Playwright or other browser tooling as normal workspace commands. |
| Browser Use | Web pages, forms, navigation, screenshots, accessibility-tree inspection | Operates the headed workspace Chrome/Chromium instance over CDP. |
| Computer Use | Native dialogs, broken browser state, non-browser GUI | Reads the desktop accessibility tree (AT-SPI) for refs, falls back to coordinates and screenshots when accessibility is unavailable. |

Prefer Browser Use for web pages. Use Computer Use when the task depends on GUI state that CDP cannot reach.

## Workspace display and VNC

Workspace display is the desktop environment inside the bot's workspace container. VNC/RFB is the display and input transport behind that desktop, while WebRTC is used by the Web UI display session.

The main value is not VNC by itself. The important capability is that the workspace can run a headed Chrome/Chromium browser for sites and login flows that do not work well in headless mode.

## Preparing a bot desktop

1. Open the bot detail page.
2. Go to the **Desktop** tab.
3. Prepare or enable the workspace display runtime.
4. Open a display session from the bot settings page or from the chat workspace.

The display runtime installs or uses the workspace desktop, VNC server, browser, and fonts needed for the visible session. Availability depends on the workspace backend and image.

## Agent tools

When workspace desktop is enabled, the agent can use browser and computer tools:

- `browser_observe` inspects the current browser page (snapshot, get_content, screenshot, evaluate, and so on).
- `browser_action` clicks, fills, types, presses, and navigates in the headed browser.
- `browser_remote_session` exposes the browser CDP endpoint for code-driven sessions.
- `computer_observe` returns an accessibility-tree snapshot of the desktop (refs like `e3`) or a saved screenshot path.
- `computer_action` drives the desktop. It prefers a `ref` from the snapshot and falls back to `(x, y)` coordinates when no ref is available or the accessibility action fails.

### Screenshots are not auto-attached

Both `browser_observe` and `computer_observe` save screenshots to a workspace path such as `/data/computer-screenshots/1716200000.jpg` and return that path in the tool result. The image is not pushed into the conversation. Read the path with the workspace file read tool when you actually need the visual; that keeps observation cheap and lets the model decide when an image is worth the token cost.

### Accessibility helper

Computer Use depends on the `a11y-cli` binary installed under `/opt/memoh/toolkit/display/bin/a11y-cli` and the workspace `at-spi2-core` package. The display runtime probe reports `a11y_available` so the Web UI can surface whether the accessibility path is healthy. When AT-SPI is unavailable, `computer_action` still works with raw coordinates and `computer_observe screenshot` remains usable.

These tools are workspace runtime features. They do not automate the Electron desktop app itself.

When a bot has remote [Computers](./computers.md) attached, Browser Use and Computer Use still run in the **Server Workspace** — they do not follow the selected work location.

## Related

- [Bot Workspace Management](./container.md)
- [Workspace Backends](../self-hosted/workspace-backends.md)
