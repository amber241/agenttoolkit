# The Agent Toolkit Org Chart

Interactive org chart showing the human team + the AI Employees each person uses. Modeled after Callan Faulkner's Tub Org Chart.

## How to view it locally

Because `data.json` is loaded via fetch, you need a local server (not just double-clicking the HTML). Easiest option:

```
cd "/Users/amberbush-joseph/Documents/Claude/Projects/Agent Toolkit/org-chart"
python3 -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000) in Chrome.

Stop the server with Ctrl+C when done.

## How to add a new AI Employee

Edit `data.json`. Under `aiEmployees`, add a new entry:

```json
"the-newcomer": {
    "name": "The Newcomer",
    "role": "What it does (short)",
    "description": "2-3 sentence description of what this AI Employee does.",
    "tag": "SCHEDULED",
    "schedule": "Daily 9:00 AM"
}
```

Tags available:
- `SCHEDULED` (runs on a timer)
- `ON_DEMAND` (triggered by you when needed)
- `TRIGGER` (fires when something else happens)

Then add the id into a human's `aiEmployees` array to attach it to their team.

Refresh the page. Done.

## How to deploy to GitHub Pages

1. Create a new GitHub repo named something like `agent-toolkit-org`.
2. Push these four files (`index.html`, `styles.css`, `script.js`, `data.json`) to the `main` branch.
3. In the repo Settings → Pages, set source to `main` branch, root folder.
4. Your chart will be live at `https://<github-username>.github.io/agent-toolkit-org/`.

Updates after that: push to main, GitHub Pages rebuilds within ~1 minute.

## File structure

```
org-chart/
├── index.html      # page skeleton
├── styles.css      # brand-aligned visual design (#6e5645 palette, Instrument Serif, DM Sans)
├── script.js       # renders tree from data.json, handles click-to-expand
├── data.json       # source of truth for humans + AI Employees
└── README.md       # you are here
```

## Current Org

**Top tier:** Amber (CEO) and Sam (COO).
**Second tier:** Tristan (Marketing Director) reports to Amber. Hannah (Operations Director) reports to Sam.

## Current AI Employees

| Name | Role | Reports to | Tag | Schedule |
|---|---|---|---|---|
| Social Media Data Analyst | IG Analyzer | Tristan | Scheduled | Daily 6:00 AM |
| Daily Competitor Brief Writer | Daily Competitive Intelligence | Amber | Scheduled | Daily 7:00 AM |
| Weekly Competitor Brief Writer | Weekly Strategic Intelligence | Amber | Scheduled | Mondays 8:00 AM |
| Reel Script Copywriter | Reel Script Generation | Amber | On Demand | On demand |
| Carousel Post Copywriter | Carousel Copy Generation | Amber | On Demand | On demand |
