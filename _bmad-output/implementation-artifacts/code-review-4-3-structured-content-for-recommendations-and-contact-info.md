# Code Review: 4-3-structured-content-for-recommendations-and-contact-info

**Story:** 4-3-structured-content-for-recommendations-and-contact-info.md  
**Reviewed:** 2026-02-25  
**Reviewer:** Amelia (Dev Agent) — adversarial code review

---

## Git vs Story Discrepancies

| Finding | Severity |
|--------|----------|
| Uncommitted changes are only in `_bmad-output/` (story file, sprint-status). All implementation files from File List appear committed. Story/sprint doc updates not committed. | **MEDIUM** |
| Story File List omits `_bmad-output/implementation-artifacts/sprint-status.yaml` although story status was set to review (sprint tracking). 4-2’s File List included it. | **LOW** |

---

## Issues Found

### HIGH (0)

- None. AC1 and AC2 are satisfied: content in JSON, loaders in lib, pages/sections wired; contact recipient documented for env; no hardcoded recommendation/attestation/contact copy in components.

### MEDIUM (2)

1. **Contact action does not read recipient from env**  
   - **Where:** `lib/actions/contact.ts`  
   - **What:** Comment says "use process.env.CONTACT_EMAIL"; code never reads it. Stub always returns success. When wiring a real provider, recipient must come from env.  
   - **Why it matters:** AC2 and story require contact recipient in env; currently only documented, not used.  
   - **Fix:** When implementing real email sending, use `process.env.CONTACT_EMAIL` (and guard on missing env in non-dev).

2. **Story Dev Agent Record template literal not replaced**  
   - **Where:** `_bmad-output/implementation-artifacts/4-3-structured-content-for-recommendations-and-contact-info.md` — "Agent Model Used"  
   - **What:** Value is literal `{{agent_model_name_version}}`.  
   - **Fix:** Replace with actual agent name/version or "Amelia (Dev Agent)".

### LOW (3)

3. **getAttestations() swallows parse errors**  
   - **Where:** `lib/recommendations.ts` — `getAttestations()`  
   - **What:** On invalid JSON or schema failure it returns `[]`; `getRecommendations()` throws. Invalid content file can produce empty attestations with no error.  
   - **Fix:** Either throw with a safe message (align with getRecommendations) or document that attestations are best-effort.

4. **ContactBlock default copy**  
   - **Where:** `components/sections/ContactBlock.tsx` — `DEFAULT_HEADING`, `DEFAULT_SUBHEADING`, `DEFAULT_SUBMIT_LABEL`  
   - **What:** Fallbacks duplicate strings that exist in `content/contact.json`. Story said "no duplicate copy in components"; these are fallbacks when props omitted.  
   - **Fix (optional):** Consider requiring props from page so all copy is content-driven, or keep as defensive fallbacks and document.

5. **File List missing sprint-status**  
   - **Where:** Story 4-3 → File List  
   - **What:** If sprint-status.yaml was updated for this story, it should be listed (as in 4-2).  
   - **Fix:** Add `_bmad-output/implementation-artifacts/sprint-status.yaml` to File List if it was changed for 4-3.

---

## Validation Summary

| Check | Result |
|-------|--------|
| AC1: Recommendations and contact in content, pages/sections read from loaders | ✅ Implemented |
| AC2: Content-driven presentation; contact recipient in env (documented) | ✅ Documented; env not yet read in action (stub) |
| Tasks [x] actually done | ✅ Verified |
| No hardcoded recommendations/attestations/contact copy in components | ✅ Single source in content/*.json |
| content/README.md updated (recommendations, contact, env note) | ✅ |
| getRecommendations, getAttestations, getContactContent; attestations re-export | ✅ |

---

## Recommendation

**Approve with minor fixes.** No HIGH issues. Fix MEDIUM #2 (template literal) and optionally #1 when wiring email. Address LOW as follow-up if desired.

---

## Fixes Applied (2026-02-25)

| Issue | Fix |
|-------|-----|
| MEDIUM #1 Contact action env | `lib/actions/contact.ts`: read `process.env.CONTACT_EMAIL`; in production, return error if unset so form is not silently stubbed. |
| MEDIUM #2 Template literal | Story file: "Agent Model Used" set to "Amelia (Dev Agent)". |
| LOW #3 getAttestations() | `lib/recommendations.ts`: getAttestations() now throws on invalid JSON/schema (same pattern as getRecommendations). |
| LOW #5 File List | Story File List: added `_bmad-output/implementation-artifacts/sprint-status.yaml`. |
| — | Story status → done; sprint-status.yaml: 4-3 → done. |
