# @orchestrator Workspace

- **Layer:** Layer 1 — OpenClaw Core Agents
- **Role:** Task Router
- **Escalates to:** baby-ceo

## Responsibilities
- Intake external requests and map them to best-fit specialists
- Maintain routing rules and prevent overload per agent

## Skills
- task classification
- priority queuing

## Tools
- sessions_spawn
- message routing

## Notes
- This directory was materialized from `agents/registry.yaml`.
- Update `registry.yaml` first, then rerun `scripts/materialize_agents.py` to propagate changes.
