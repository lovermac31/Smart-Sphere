#!/usr/bin/env python3
"""Broadcast a recursive 'hello world' from Orchestrator to every agent workspace."""

from __future__ import annotations

from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
WORKSPACES = ROOT / "agents" / "workspaces"
ORCH_LOG = WORKSPACES / "orchestrator" / "HELLO_WORLD.log"
WATCHTOWER_LOG = WORKSPACES / "watchtower" / "TELEMETRY.log"


def main() -> int:
    if not WORKSPACES.exists():
        raise SystemExit("No workspaces found. Run materialize script first.")

    agent_dirs = sorted(p for p in WORKSPACES.iterdir() if p.is_dir())
    timestamp = datetime.now().isoformat(timespec="seconds")
    messages = []

    for agent_dir in agent_dirs:
        agent_id = agent_dir.name
        if agent_id == "orchestrator":
            continue
        msg = f"{timestamp} | orchestrator -> {agent_id} | hello world"
        messages.append(msg)

    if not messages:
        print("No agents to ping.")
        return 0

    ORCH_LOG.parent.mkdir(parents=True, exist_ok=True)
    WATCHTOWER_LOG.parent.mkdir(parents=True, exist_ok=True)

    with ORCH_LOG.open("a") as fh:
        fh.write("\n".join(messages) + "\n")

    first_msg = messages[0]
    summary = f"{timestamp} | hello_world_broadcast | count={len(messages)} | sample='{first_msg}'"
    with WATCHTOWER_LOG.open("a") as fh:
        fh.write(summary + "\n")

    print(f"Broadcast hello world to {len(messages)} agents. Telemetry recorded to Watchtower.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
