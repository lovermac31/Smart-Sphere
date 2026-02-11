# ADR 0001: Vite 7.3.1 Upgrade for M1 Silicon

## Status
Accepted

## Context
Initial build using Vite 6.4.1 resulted in inconsistent Hot Module Replacement (HMR) and timestamp errors on Apple Silicon (M1) within the pnpm monorepo structure.

## Decision
Upgrade to Vite 7.3.1 to stabilize the dev server and improve build performance for the 1,042-module transformation pipeline.

## Consequences
- Deviation from v4.0 baseline version.
- Improved developer experience and HMR stability.
