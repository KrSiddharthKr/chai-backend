## Complete Notes: Backend Project Setup (Git, .env, Express, MongoDB)

### 1. .env and Git Tracking Issue

**Problem:** `.env` got pushed to GitHub even though it was listed in `.gitignore`.

**Why it happened:**
- `.gitignore` only stops Git from tracking **new** files
- If `.env` was committed **before** it was added to `.gitignore`, Git keeps tracking it — the ignore rule doesn't apply retroactively

**Fix steps:**
1. Stop tracking it: `git rm --cached .env`
2. Commit: `git commit -m "Stop tracking .env"`
3. Push: `git push` (removes it going forward, but still exists in old commit history)
4. **Rotate all secrets** inside that `.env` — most important step. Removing the file doesn't undo exposure if it was ever public.
5. Remove `.env` from old Git history using `git-filter-repo`:
   - Install: `pip install git-filter-repo` (needs Python installed first)
   - Run: `git filter-repo --path .env --invert-paths`
6. Force-push cleaned history: `git push origin --force --all`
7. Anyone with an existing local clone must **re-clone fresh** — their old copy still has `.env` in history

---

### 2. node_modules and Git

**Why it should never be committed:**
- Huge, auto-generated from `package.json`
- Recreated anytime via `npm install`
- Should always be in `.gitignore` as `node_modules/`

**Git add ignored-file issue:**
- If a path is in `.gitignore`, `git add` refuses to add it and shows a warning instead of skipping silently
- Fix: exclude that path from the `git add` command

**If node_modules was already committed before being ignored:**
1. Check if tracked: `git ls-files node_modules`
   - Shows file paths → tracked, needs removal
   - Shows nothing → already fine
2. Untrack (keeps folder on disk): `git rm -r --cached node_modules`
3. Commit: `git commit -m "Remove node_modules from tracking"`
4. Push: `git push`

**Note:** `head` command doesn't work on Windows Command Prompt (Linux-only) — use Git Bash or just skip it.

**LF/CRLF warning:** Harmless notice about Windows vs Linux line endings — doesn't block anything.

---

### 3. Express + MongoDB Setup

**connectDB (db/index.js)**
- Async function connecting to MongoDB via `mongoose.connect()`
- try/catch: success logs connection host; failure logs error and exits (`process.exit(1)`)
- Exported as default

**index.js flow**
- `connectDB()` runs first
- `.then()` → runs only if DB connects successfully → server starts here
- `.catch()` → runs if DB connection fails → server never starts

**app.on("error")**
- `app` is an event emitter; can emit `"error"` if something fails while starting (e.g., port in use)
- `app.on("error", callback)` registers a listener for that event

**Why app.on() goes before app.listen()**
- `app.on()` just registers the listener — doesn't run anything yet
- `app.listen()` is the actual moment an error could occur
- Listener must exist **before** the error can happen, or it could be missed
- Same idea as installing a smoke detector before turning on the stove

**export { app }**
- Named export — importing file must use the same name: `import { app } from "./app.js"`
- Different from `export default app`, where the importer can choose any name