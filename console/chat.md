# Chat History

**Chat** provides searchable history of newly published in-game messages. This feature is in the next Console version; older releases may not show the page.

## Enable Collection

An owner can open **Chat → Collection**, enable **Collect new chat messages**, choose a retention period from **1 to 30 days**, and save. Collection is off by default; its default retention is seven days.

The recorder includes **Map**, **Guild**, and **Proximity** messages. **Private whispers are excluded** and there is no option to collect them. Tell your community when collection is enabled, including that guild messages are included.

Collection begins with new messages. It cannot recover earlier chat. The recorder observes published messages; later filtering can prevent a captured message from reaching players, so history is not proof that every recipient saw it.

## Browse History

Search by message or sender, select a channel, filter by map or guild, and use the row-size and page controls to browse results. New messages refresh on the first page while collection is enabled. Older pages remain stable for reading.

| Status | Meaning |
|---|---|
| Collecting | The recorder is connected. |
| Collection Off | New messages are not collected. Existing history remains until it expires or is cleared. |
| Connecting | The recorder is establishing its connection. |
| Connection Unavailable | RabbitMQ cannot currently be reached; collection retries automatically. |
| Storage Needs Attention | Saving history failed; existing data is preserved. |

## Retention and Removal

History is stored locally and limited to **5,000 messages** and **10 MiB**, with the oldest removed first. Retention and size limits can therefore remove messages before your chosen number of days.

**Collection → Clear History → Delete All History** permanently removes stored history after confirmation. Turning collection off alone does not clear it.
