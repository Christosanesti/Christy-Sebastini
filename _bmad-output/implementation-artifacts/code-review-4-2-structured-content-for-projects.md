# Code Review: 4-2-structured-content-for-projects

**Story:** 4-2-structured-content-for-projects.md  
**Reviewed:** 2026-02-25  
**Reviewer:** Amelia (Dev Agent) — adversarial code review

---

## Git vs Story Discrepancies

| Finding | Severity |
|--------|----------|
| Story File List includes `lib/schemas/project.ts`, `content/projects.json`, `content/README.md` as new/updated. These files exist on disk but are **untracked** in git. Only `lib/projects.ts` and `sprint-status.yaml` show as modified. Deliverables are not committed. | **MEDIUM** |

**Summary:** 3 of 5 claimed file deliverables are untracked. For handoff/deploy, they should be `git add` and committed.

---

## Issues Found

### HIGH (0)

- None. All Acceptance Criteria are implemented; tasks marked [x] are done; build passes.

### MEDIUM (1)

1. **Uncommitted story deliverables**  
   - **Where:** repo root / git index  
   - **What:** `lib/schemas/project.ts`, `content/projects.json`, `content/README.md` are created/updated per story but untracked.  
   - **Why it matters:** Version control and deployment expect these files to be in the repo.  
   - **Fix:** Run `git add lib/schemas/project.ts content/projects.json content/README.md` and commit with a message referencing story 4.2.

### LOW (3)

2. **Double read of `projects.json` per detail request**  
   - **Where:** `app/projects/[slug]/page.tsx` — `generateMetadata()` and the page component each call `getProjectBySlug(slug)`, and `getProjectBySlug` calls `getProjects()` each time.  
   - **What:** Two full file reads + two parses per project detail request.  
   - **Fix (optional):** Use React `cache()` around `getProjects()` (or a cached getter) so one request reuses the same in-memory result.

3. **`content/projects.json` is minified**  
   - **Where:** `content/projects.json`  
   - **What:** Single-line JSON; harder for non-developers to edit and for diffs to stay readable.  
   - **Fix (optional):** Pretty-print (e.g. 2-space indent) when editing or via a one-time format.

4. **No slug uniqueness validation**  
   - **Where:** `lib/schemas/project.ts` / `lib/projects.ts`  
   - **What:** Schema validates each object but not that slugs are unique in the array. Duplicate slugs would make `getProjectBySlug()` return the first match only.  
   - **Fix (optional):** Add a refinement or post-parse check that slug list is unique; surface a clear error if duplicates exist.

---

## Validation Summary

| Check | Result |
|-------|--------|
| AC1: Data in content source, list/detail read from it | ✅ Implemented |
| AC2: Updates appear correctly, slugs map to routes | ✅ Implemented |
| Tasks [x] actually done | ✅ Verified |
| Build | ✅ `bun run build` passes |
| No hardcoded project array in code | ✅ Single source in content/projects.json |
| content/README.md projects section | ✅ Present and accurate |

---

## Recommendation

- **Status:** Implementation is correct and complete; only MEDIUM is process (uncommitted files).
- **Before marking done:** Add and commit the three untracked files, then re-run this review or mark story done and sync sprint status.
