# Contributing

Contributions are welcome through the [main GitHub repository](https://github.com/Red-Blink/dune-awakening-selfhost-docker).

You can help by reporting reproducible bugs, suggesting useful features, testing
releases, improving documentation, submitting focused pull requests, and
building Community Addons. Include the version and enough context for someone
else to understand or reproduce your report.

For wording in another language, use **Suggest a Translation Fix** from your
Console's language picker. No GitHub account is needed; keep the suggestion
reference for follow-up. See [Languages and Translation Corrections](../console/languages.md).

## Before Opening a Pull Request

- Base the change on the current target branch and keep it narrowly scoped.
- Preserve existing operator data and settings.
- Add tests proportional to the change, especially for database and lifecycle behavior.
- Run the relevant runtime, API, and web test suites.
- Keep secrets, generated runtime files, backups, and machine-specific configuration out of Git.
- Write user-facing labels and results consistently, with clean capitalization and responsive UI behavior.
- Explain what changed, how it was tested, and any migration/restart impact.

For addons, use the addon template and submit catalog changes to the [addons repository](https://github.com/Red-Blink/dune-docker-addons).
