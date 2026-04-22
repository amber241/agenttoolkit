# Deploy the Org Chart to GitHub Pages

No terminal, no git commands. ~10 minutes, mostly clicking.

## Step 0 — One tiny cleanup first

There's a hidden `.git` folder inside `org-chart/` that got left half-finished. It won't cause problems for GitHub, but you can delete it to keep the folder clean:

- In Finder, open the `org-chart` folder
- Press `Cmd + Shift + .` to show hidden files
- Drag the `.git` folder to the Trash
- Press `Cmd + Shift + .` again to re-hide hidden files

If you'd rather skip this, it's fine — the web upload path ignores it anyway.

## Step 1 — Create a new GitHub repo

1. Go to [github.com/new](https://github.com/new) (log in or sign up if you haven't)
2. **Repository name:** `agent-toolkit-org` (or anything you like — this becomes part of the URL)
3. **Description:** optional, e.g. "The Agent Toolkit org chart"
4. **Public** (required for free GitHub Pages)
5. **Don't** check "Add a README" — we already have one
6. Click **Create repository**

## Step 2 — Upload the files

On the fresh empty repo page, click **"uploading an existing file"** (the link is inside the "Quick setup" block).

Then drag these files from your `org-chart` folder onto the upload area. The five required ones:

- `index.html`
- `styles.css`
- `script.js`
- `data.json`
- `README.md`

The two hidden helpers (nice to have, not required — if they're a pain to drag, skip them):

- `.nojekyll` — tells GitHub Pages not to mess with the files. Without it, Pages will still work, just after a slightly longer first-build delay.
- `.gitignore` — only matters if you later switch to using git locally.

To see the hidden ones in Finder, press `Cmd + Shift + .` — they'll fade into view. You can then drag them onto the upload area alongside the visible files.

Scroll down, leave the commit message as default, click **Commit changes**.

## Step 3 — Turn on GitHub Pages

1. On your repo page, click **Settings** (top right of the repo nav)
2. In the left sidebar, click **Pages**
3. Under **"Build and deployment"**:
   - **Source:** Deploy from a branch
   - **Branch:** `main` · `/ (root)` · click **Save**
4. Wait ~60 seconds. Refresh the Pages settings screen.
5. At the top you'll see: **"Your site is live at https://YOUR-USERNAME.github.io/agent-toolkit-org/"**

That's the live URL. Share it, bookmark it, put it in your link-in-bio — up to you.

## How to update the chart later

When you add a new team member or AI Employee:

1. Edit `data.json` on your Mac (same way as before)
2. Go to your repo on github.com
3. Click into `data.json`, click the pencil icon (top right) to edit in the browser, paste the updated contents
4. Scroll down, click **Commit changes**
5. Live site updates within ~1 minute

Or if you'd prefer a "drag the whole folder and replace everything" workflow later, let me know and I'll write that up.

## If something breaks

- **Page loads but chart is blank / "Could not load data.json"** → `data.json` didn't upload. Re-upload it to the repo root.
- **404 at the Pages URL** → Pages hasn't finished building. Wait 1–2 minutes, hard-refresh.
- **Styling looks wrong** → `styles.css` didn't upload or got renamed.
- **Stuck anywhere** → screenshot the screen you're on and send it to me.
