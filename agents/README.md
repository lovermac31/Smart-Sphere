# OpenCrawl Agent Registry (Rev. 2026-02-24)

Baby CEO (Axiom) sits on top of a multi-layer hive. This registry stores the canonical view of every specialist, their soul, skills, and tooling expectations. Keep it in sync with `agents/registry.yaml`.

## Layer Map

1. **Layer 0 — Executive Control**: Baby CEO. Strategic intent + escalation gate.
2. **Layer 1 — OpenClaw Core Agents**: Platform-managed specialists (e.g., @orchestrator).
3. **Layer 2 — OpenCrawl Command Layer**: Operators in this workspace (Orchestrator, Chief-of-Staff, Researcher, Builder, Writer).
4. **Layer 2.5 — Librarians**: Notion governance pod (Sage, Atlas, Iris, Ember, Lumen).
5. **Layer 3 — Axiom Forge Six**: Task-only engineering specialists.
6. **Layer 3.5 — Control Plane**: Config/runtime guardians (MD Guardian, Watchtower, etc.).
7. **Layer 4 — Axiom Q4 Council**: Strategic deliberation board (Aegis, Vector, Proof, Spark).

## Workflow

- Edit `agents/registry.yaml` to change any agent metadata.
- Run `scripts/materialize_agents.py` to regenerate each agent workspace.
- Never hand-edit generated SOUL/USER/TOOLS files—your edits will be overwritten on the next materialization unless the registry carries them.

## Future Work

- Automate skill installation + tool policy syncing per agent.
- Wire CI to ensure registry + workspace directories stay in parity.
