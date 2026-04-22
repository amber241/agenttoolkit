// Org Chart: loads data.json, renders tiered tree, handles inline AI Employee expansion

const TAG_CLASSES = {
    SCHEDULED: 'scheduled',
    ON_DEMAND: 'on-demand',
    TRIGGER: 'trigger',
};

const TAG_LABELS = {
    SCHEDULED: 'Scheduled',
    ON_DEMAND: 'On Demand',
    TRIGGER: 'Trigger',
};

const STATUS_CLASSES = {
    LIVE: 'live',
    BUILDING: 'building',
    PLANNED: 'planned',
};

const STATUS_LABELS = {
    LIVE: 'Live',
    BUILDING: 'Building',
    PLANNED: 'Planned',
};

let orgData = null;

async function loadData() {
    try {
        const res = await fetch('data.json');
        orgData = await res.json();
        render();
    } catch (err) {
        console.error('Failed to load data.json:', err);
        document.getElementById('orgTree').innerHTML =
            '<p style="text-align:center;color:#a89a8c;">Could not load data.json. If you opened this file directly, run a local server: <code>python3 -m http.server</code> in this folder.</p>';
    }
}

function render() {
    renderHero();
    renderTree();
}

function renderHero() {
    const subtitle = orgData.company.subtitle;
    document.getElementById('subtitle').innerHTML = subtitle
        .replace('any card', '<strong>any card</strong>')
        .replace('AI Employees', '<strong>AI Employees</strong>');
}

function renderTree() {
    const tree = document.getElementById('orgTree');
    tree.innerHTML = '';

    // Group people by tier
    const tiers = {};
    orgData.people.forEach(p => {
        if (!tiers[p.tier]) tiers[p.tier] = [];
        tiers[p.tier].push(p);
    });

    Object.keys(tiers)
        .map(Number)
        .sort((a, b) => a - b)
        .forEach(tierNum => {
            const tierDiv = document.createElement('div');
            tierDiv.className = `tier tier-${tierNum}`;
            tiers[tierNum].forEach(person => {
                tierDiv.appendChild(buildPersonColumn(person));
            });
            tree.appendChild(tierDiv);
        });
}

function buildPersonColumn(person) {
    const column = document.createElement('div');
    column.className = 'person-column';
    column.dataset.personId = person.id;

    const isTopTier = person.tier === 1;
    const card = document.createElement('div');
    card.className = 'person-card' + (isTopTier ? ' top-tier' : '');

    const aiCount = person.aiEmployees.length;

    card.innerHTML = `
        <div class="person-header">
            <div class="avatar">${person.initial}</div>
            <div>
                <div class="person-name">${person.name}</div>
                <div class="person-title">${person.title}</div>
            </div>
        </div>
        <div class="person-footer">
            ${aiCount > 0
                ? `<div class="person-pill ai" data-owner="${person.id}">
                       ${aiCount} AI Employee${aiCount === 1 ? '' : 's'}
                       <span class="pill-arrow">▾</span>
                   </div>`
                : `<div class="person-pill empty">No AI Employees yet</div>`
            }
        </div>
    `;
    column.appendChild(card);

    // Build inline expansion section if AI Employees exist
    if (aiCount > 0) {
        const inline = document.createElement('div');
        inline.className = 'ai-employees-inline';
        inline.hidden = true;

        const label = document.createElement('div');
        label.className = 'inline-label';
        label.textContent = `${person.name}'s AI Employees`;
        inline.appendChild(label);

        const grid = document.createElement('div');
        grid.className = 'ai-employees-grid';
        person.aiEmployees.forEach(empId => {
            const emp = orgData.aiEmployees[empId];
            if (!emp) return;
            grid.appendChild(buildAiCard(emp));
        });
        inline.appendChild(grid);

        column.appendChild(inline);

        const pill = card.querySelector('.person-pill.ai');
        pill.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = !inline.hidden;
            inline.hidden = isOpen;
            card.classList.toggle('active', !isOpen);
            const arrow = pill.querySelector('.pill-arrow');
            if (arrow) arrow.textContent = isOpen ? '▾' : '▴';
        });
    }

    return column;
}

function buildAiCard(emp) {
    const card = document.createElement('div');
    const status = emp.status || 'LIVE';
    const statusClass = STATUS_CLASSES[status] || 'live';
    card.className = `ai-card status-${statusClass}`;

    const tagClass = TAG_CLASSES[emp.tag] || 'scheduled';
    const tagLabel = TAG_LABELS[emp.tag] || emp.tag;
    const statusLabel = STATUS_LABELS[status] || status;

    const statusBadgeHtml = status === 'LIVE'
        ? ''
        : `<span class="status-badge status-${statusClass}">${statusLabel}</span>`;

    card.innerHTML = `
        <div class="ai-card-header">
            <div>
                <div class="ai-card-title">${emp.name}</div>
            </div>
            ${statusBadgeHtml}
        </div>
        <div class="ai-card-role">${emp.role}</div>
        <div class="ai-card-description">${emp.description}</div>
        <div class="ai-card-footer">
            <span class="tag ${tagClass}">${tagLabel}</span>
            <span class="schedule-note">${emp.schedule || ''}</span>
        </div>
    `;

    return card;
}

// Zoom controls
const MIN_ZOOM = 0.4;
const MAX_ZOOM = 2.0;
const ZOOM_STEP = 0.1;
let zoomLevel = 1;

function applyZoom() {
    document.documentElement.style.setProperty('--zoom', zoomLevel);
    document.getElementById('zoomLevel').textContent = `${Math.round(zoomLevel * 100)}%`;
}

function zoomBy(delta) {
    zoomLevel = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, zoomLevel + delta));
    applyZoom();
}

document.getElementById('zoomIn').addEventListener('click', () => zoomBy(ZOOM_STEP));
document.getElementById('zoomOut').addEventListener('click', () => zoomBy(-ZOOM_STEP));
document.getElementById('zoomReset').addEventListener('click', () => {
    zoomLevel = 1;
    applyZoom();
});

// Ctrl/Cmd + scroll to zoom
document.addEventListener('wheel', (e) => {
    if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        zoomBy(-e.deltaY * 0.002);
    }
}, { passive: false });

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
        if (e.key === '=' || e.key === '+') {
            e.preventDefault();
            zoomBy(ZOOM_STEP);
        } else if (e.key === '-') {
            e.preventDefault();
            zoomBy(-ZOOM_STEP);
        } else if (e.key === '0') {
            e.preventDefault();
            zoomLevel = 1;
            applyZoom();
        }
    }
});

loadData();
