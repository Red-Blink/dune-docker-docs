---
icon: database
---

# Database

The Database page provides schema/table discovery, column inspection, row previews, export, and a guarded raw SQL workspace.

Read-only exploration is the safest use. Destructive SQL requires explicit authorization and can bypass game invariants that the guided Console normally protects.

## Good Practice

1. Prefer a dedicated Console feature when one exists.
2. Take a manual backup before an unfamiliar write.
3. Stop the affected map when the feature or game data requires it.
4. Use a transaction and a narrow `WHERE` clause.
5. Verify the affected row count before committing.
6. Never paste commands from strangers without understanding the exact tables and records affected.

The `dune` schema belongs to the game and may change after Funcom updates. Console-owned history and state use separate structures where practical so game migrations do not own them.
