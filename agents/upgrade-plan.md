# Agent Enhancement Plan (Objective 1)

Goal: Fully enhance every agent with aligned SOUL, USER context, skills, and tool access.

## Phase 1 — Tooling Backbone
- [x] Author canonical registry (`agents/registry.yaml`).
- [ ] Implement `scripts/materialize_agents.py` to:
  - Parse registry entries.
  - Create/refresh per-agent directories under `agents/workspaces/<agentId>/`.
  - Seed `SOUL.md`, `USER.md`, `TOOLS.md`, and `README.md` from templates + agent-specific traits.
  - Link shared `skills/` folders or copy role-specific skills.

## Phase 2 — Persona + Skill Sync
- [ ] Draft template snippets for common persona blocks (executive, operator, librarian, guardian, council).
- [ ] Apply templates via the materializer so each workspace gets the correct SOUL voice + escalation reminders.
- [ ] Audit required skills per agent and ensure matching SKILL.md files or instructions exist.

## Phase 3 — Tool + Policy Alignment
- [ ] Verify `openclaw.json` tool policies per agent (exec security, ask modes, allowAgents).
- [ ] Document which agents can spawn which sub-agents (mirrors registry escalations).
- [ ] Smoke-test a sample (`builder`, `sage`, `watchtower`) to confirm skills + persona load.

## Phase 4 — Continuous Maintenance
- [ ] Add CI check to diff registry vs. materialized workspaces.
- [ ] Schedule periodic audits (weekly) led by Watchtower + Baby CEO.
