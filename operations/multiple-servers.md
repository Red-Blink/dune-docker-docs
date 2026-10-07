# Multiple Servers on One IP

Multiple isolated Battlegroups can share one public IPv4 address only when every instance has a non-overlapping port profile and the router/firewall forwards each range correctly.

Use a separate Linux VM with its own Docker daemon for each Battlegroup. The project uses fixed container names: different project folders or Compose project names alone do not isolate two installations on the same Docker daemon.

Each installation needs an appropriate non-overlapping port profile and independent data. Hairpin/NAT behavior must also work for local clients using the public address. Changing only game UDP ports is insufficient because Console and messaging endpoints also need separation.

The project includes `runtime/scripts/multi-server-config.py` to plan, apply, and verify profiles. Start with its read-only plan from the project folder:

```bash
python3 runtime/scripts/multi-server-config.py plan --instances 2
```

Review the full guide before applying a profile; applying configuration does not itself update router rules or restart services.

The optional public-directory probe uses UDP `32000–32015` for direct latency. Its fixed range is not rewritten by the multi-server profile tool; relay fallback remains available where the direct path cannot be routed.

{% hint style="danger" %}
Do not start a second installation by copying only part of an existing profile. A single overlapping game or messaging port can produce intermittent registration and travel failures that resemble a game bug.
{% endhint %}

Follow the complete [multi-server implementation guide](https://github.com/Red-Blink/dune-awakening-selfhost-docker/blob/main/docs/runtime/MULTI-SERVER-SINGLE-PUBLIC-IP.md) before deploying this layout.
