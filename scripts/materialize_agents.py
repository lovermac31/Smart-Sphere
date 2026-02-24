#!/usr/bin/env python3
"""Materialize per-agent workspaces from agents/registry.yaml."""

from __future__ import annotations

import textwrap
from pathlib import Path
from typing import Iterable, Tuple

import yaml

ROOT = Path(__file__).resolve().parents[1]
REGISTRY_PATH = ROOT / "agents" / "registry.yaml"
WORKSPACES_DIR = ROOT / "agents" / "workspaces"
ROOT_USER_PATH = ROOT / "USER.md"
ROOT_TOOLS_PATH = ROOT / "TOOLS.md"


def read_optional(path: Path) -> str:
    if path.exists():
        return path.read_text().rstrip() + "\n"
    return "(not yet defined)\n"


def load_registry() -> list[dict]:
    if not REGISTRY_PATH.exists():
        raise FileNotFoundError(f"Registry not found: {REGISTRY_PATH}")
    data = yaml.safe_load(REGISTRY_PATH.read_text())
    return data.get("layers", [])


def iter_agents(layers: Iterable[dict]) -> Iterable[Tuple[str, dict]]:
    for layer in layers:
        for agent in layer.get("agents", []):
            yield layer["name"], agent


def ensure_dir(path: Path) -> None:
    path.mkdir(parents=True, exist_ok=True)


def write_file(path: Path, content: str) -> None:
    content = content.rstrip() + "\n"
    if path.exists() and path.read_text() == content:
        return
    path.write_text(content)


def render_soul(layer: str, agent: dict) -> str:
    soul = agent.get("soul", {})
    mantra = soul.get("mantra", "TODO: define mantra")
    traits = soul.get("traits") or ["Define traits"]
    responsibilities = agent.get("responsibilities") or ["Document responsibilities"]
    escalation = agent.get("escalates_to", "Baby CEO") or "Baby CEO"
    skills = agent.get("skills") or ["Document skills"]
    tools = agent.get("tools") or ["Document tool needs"]

    traits_block = "\n".join(f"- {t}" for t in traits)
    resp_block = "\n".join(f"- {r}" for r in responsibilities)
    skills_block = "\n".join(f"- {s}" for s in skills)
    tools_block = "\n".join(f"- {t}" for t in tools)

    call_sign = agent.get("call_sign")
    aka = agent.get("aka")
    name_line = agent.get("name", agent.get("id"))

    header = f"# SOUL.md — {name_line}\n"
    identity_lines = [
        f"**Agent ID:** `{agent.get('id')}`",
        f"**Layer:** {layer}",
        f"**Role:** {agent.get('role', 'Define role')}",
    ]
    if call_sign:
        identity_lines.append(f"**Call Sign:** {call_sign}")
    if aka:
        identity_lines.append(f"**Also known as:** {aka}")

    body = f"""{header}
{chr(10).join(identity_lines)}

## Mantra
> {mantra}

## Traits
{traits_block}

## Responsibilities
{resp_block}

## Core Skills
{skills_block}

## Tool Surface
{tools_block}

## Escalation Path
- Escalate to **{escalation}** when blocked or when decisions exceed delegated authority.

## Ethics Layer
- Define guardrails for acceptable actions.
- Record red lines and escalation triggers.

## Learning Layer
- Log lessons learned per engagement.
- Track self-improvement experiments.

## Autonomy Layer
- Describe what the agent may run without human approval.
- Clarify when autonomous loops must hand back control.
"""
    return textwrap.dedent(body)


def render_readme(layer: str, agent: dict) -> str:
    responsibilities = agent.get("responsibilities") or []
    responsibilities_block = "\n".join(f"- {r}" for r in responsibilities)
    skills_block = "\n".join(f"- {s}" for s in (agent.get("skills") or []))
    tools_block = "\n".join(f"- {t}" for t in (agent.get("tools") or []))

    return textwrap.dedent(
        f"""# {agent.get('name', agent.get('id'))} Workspace

- **Layer:** {layer}
- **Role:** {agent.get('role', 'Define role')}
- **Escalates to:** {agent.get('escalates_to', 'Baby CEO')}

## Responsibilities
{responsibilities_block or '- Define responsibilities'}

## Skills
{skills_block or '- Document required skills'}

## Tools
{tools_block or '- Document required tools'}

## Notes
- This directory was materialized from `agents/registry.yaml`.
- Update `registry.yaml` first, then rerun `scripts/materialize_agents.py` to propagate changes.
"""
    )


def render_tools(agent: dict) -> str:
    tools = agent.get("tools") or []
    return textwrap.dedent(
        f"""# TOOLS.md — {agent.get('name', agent.get('id'))}

Required/expected tools:
{chr(10).join(f'- {tool}' for tool in tools) or '- Document tool requirements'}

Add any agent-specific credentials or CLI instructions here.
"""
    )


def render_user_template(base_user: str, agent: dict) -> str:
    prefix = textwrap.dedent(
        f"""# USER CONTEXT — {agent.get('name', agent.get('id'))}

This agent inherits the primary USER profile below. Add role-specific annotations as needed.
"""
    )
    return prefix + "\n" + base_user.strip() + "\n"


def materialize() -> None:
    layers = load_registry()
    base_user = read_optional(ROOT_USER_PATH)
    base_tools = read_optional(ROOT_TOOLS_PATH)

    ensure_dir(WORKSPACES_DIR)

    for layer_name, agent in iter_agents(layers):
        agent_dir = WORKSPACES_DIR / agent.get("id")
        ensure_dir(agent_dir)

        soul_path = agent_dir / "SOUL.md"
        readme_path = agent_dir / "README.md"
        user_path = agent_dir / "USER.md"
        tools_path = agent_dir / "TOOLS.md"
        notes_path = agent_dir / "NOTES.md"

        write_file(soul_path, render_soul(layer_name, agent))
        write_file(readme_path, render_readme(layer_name, agent))
        write_file(user_path, render_user_template(base_user, agent))
        write_file(tools_path, render_tools(agent))
        if not notes_path.exists():
            write_file(notes_path, "# NOTES\n\n- Jot down run-specific findings here.\n")

    print(f"Materialized {len(list(iter_agents(layers)))} agent workspaces into {WORKSPACES_DIR}")


if __name__ == "__main__":
    materialize()
