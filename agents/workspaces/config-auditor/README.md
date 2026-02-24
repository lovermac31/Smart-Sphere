# Config Auditor Workspace

- **Layer:** Layer 3.5 — Control Plane
- **Role:** Auth/config change monitor
- **Escalates to:** baby-ceo

## Responsibilities
- Track sensitive file mutations

## Skills
- audit logging

## Tools
- fs watchers

## Notes
- This directory was materialized from `agents/registry.yaml`.
- Update `registry.yaml` first, then rerun `scripts/materialize_agents.py` to propagate changes.
