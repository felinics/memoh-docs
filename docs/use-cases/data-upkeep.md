# A Living Spreadsheet

**Owns:** one data file that the bot creates, updates on schedule, and reports changes to first.

**Uses:** [Workspace](../guides/container.md) · [Files](../guides/files.md) · [Scheduled Tasks](../guides/schedule.md)

<!-- TODO (manual): screenshot of the CSV open on the Files tab -->

## Start with

> Create a competitor pricing sheet (CSV) in your workspace. Check each vendor's site every morning and append any changes to the sheet; message me first if a price drops. Maintain this file only — do not send anything to anyone else.

## How it runs

The workspace is a real filesystem with a terminal (Python, Node.js, and uv preinstalled), so cleaning CSVs, running scripts, and generating reports all happen in place. Browse the output any time under **Files**.

<!-- TODO (manual): screenshot of the price-drop alert message; optional: recording from first sheet to first update -->
