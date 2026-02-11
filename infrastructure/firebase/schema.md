# Smart-Sphere Firestore Schema (Pattern A)

## Tenant Root: /tenants/{tenantId}
- **students** (collection)
    - **{studentId}** (document: StudentProfile)
        - **assessments** (sub-collection)
            - **{assessmentId}** (document: Five-Domain Result)
        - **interventions** (sub-collection)
            - **{interventionId}** (document: Tier Escalation Log)
