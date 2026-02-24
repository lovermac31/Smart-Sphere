# NOTES — Builder

## Safe 33-Agent Project Plan Template (pending IELTS OCR source)
1. **Ingest Source**: Sage delivers cleaned "IELTS OCR" packet (markdown + metadata).
2. **Curriculum Vectorization**: Trigger Supabase Edge function `rag_ingest_curriculum` to embed chunks per layer tag.
3. **Assignment Matrix**:
   - Librarian pod (Sage, Atlas, Iris, Ember, Lumen) handles taxonomy + retrieval scaffolding.
   - Forge Six covers spec, code, test, ops.
   - Control Plane (Watchtower+guards) sets telemetry & policy gates.
4. **Autonomy Checks**: Watchtower + Sage verify governance log entries before launch.
5. **Deployment**: Builder orchestrates GitHub Actions → Vercel/Supabase rollout.
6. **Feedback Loop**: Evaluation pipeline logs to audit table; Sage updates Notion dashboard.
