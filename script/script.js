// Base API URL
const API_BASE = 'https://phi-lab-server.vercel.app/api/v1/lab';

// DOM Elements
const loginPage = document.getElementById('login-page');
const mainPage = document.getElementById('main-page');
const loginForm = document.getElementById('login-form');
const spinner = document.getElementById('spinner');
const issuesGrid = document.getElementById('issues-grid');
const tabBtns = document.querySelectorAll('.tab-btn');
const issueCountText = document.getElementById('issue-count-text');
const searchInput = document.getElementById('search-input');
const modal = document.getElementById('issue-modal');
const modalBody = document.getElementById('modal-body');
const closeModalBtn = document.querySelector('.close-btn');

// State
let allIssues = [];

// LOGIN LOGIC
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    if (user === 'admin' && pass === 'admin123') {
        loginPage.classList.add('hidden');
        mainPage.classList.remove('hidden');
        fetchAllIssues();
    } else {
        alert('Invalid Credentials! Use admin / admin123');
    }
});

//FETCH DATA
async function fetchAllIssues() {
    showSpinner();
    try {
        const response = await fetch(`${API_BASE}/issues`);
        const data = await response.json();
        allIssues = data.data || data;
        renderIssues(allIssues);
        updateHeaderCount(allIssues.length, 'Issues');
    } catch (error) {
        console.error('Error fetching issues:', error);
    } finally {
        hideSpinner();
    }
}

async function searchIssues(query) {
    showSpinner();
    try {
        const response = await fetch(`${API_BASE}/issues/search?q=${query}`);
        const data = await response.json();
        const searchResults = data.data || data;
        renderIssues(searchResults);
        updateHeaderCount(searchResults.length, 'Search Results');
        tabBtns.forEach(btn => btn.classList.remove('active'));
    } catch (error) {
        console.error('Error searching issues:', error);
    } finally {
        hideSpinner();
    }
}

async function fetchSingleIssue(id) {
    showSpinner();
    try {
        const response = await fetch(`${API_BASE}/issue/${id}`);
        const data = await response.json();
        const issue = data.data || data;
        showModal(issue);
    } catch (error) {
        console.error('Error fetching single issue:', error);
    } finally {
        hideSpinner();
    }
}

// RENDER UI
function renderIssues(issues) {
    issuesGrid.innerHTML = '';
    
    if(issues.length === 0) {
        issuesGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">No issues found.</p>';
        return;
    }

    issues.forEach(issue => {
        const status = issue.status ? issue.status.toLowerCase() : 'open';
        const cardClass = status === 'open' ? 'open-card' : 'closed-card';
        const statusIconPath = status === 'open' ? 'assets/Open-Status.png' : 'assets/Closed- Status .png';
        const priorityClass = `priority-${issue.priority ? issue.priority.toLowerCase() : 'low'}`;
        const formattedDate = issue.createdAt ? new Date(issue.createdAt).toLocaleDateString() : 'N/A';
        let labelsHtml = '';
        if (issue.labels && issue.labels.length > 0) {
            issue.labels.forEach(label => {
                const labelClass = label.toLowerCase().includes('bug') ? 'label-bug' : 
                                   label.toLowerCase().includes('help') ? 'label-help' : 'label-enhancement';
                labelsHtml += `<span class="label-badge ${labelClass}"><i class="fa-solid fa-tag"></i> ${label}</span>`;
            });
        }

        const card = document.createElement('div');
        card.className = `issue-card ${cardClass}`;
        card.innerHTML = `
            <div class="card-header">
                <img src="${statusIconPath}" alt="${status}" style="width: 20px; height: 20px;">
                <span class="priority-badge ${priorityClass}">${issue.priority || 'Low'}</span>
            </div>
            <h4 class="issue-title">${issue.title}</h4>
            <p class="issue-desc">${issue.description}</p>
            <div class="labels">
                ${labelsHtml}
            </div>
            <div class="card-footer">
                <p>#${issue.id || issue._id} by ${issue.author || 'Unknown'}</p>
                <p>${formattedDate}</p>
            </div>
        `;

        card.addEventListener('click', () => fetchSingleIssue(issue.id || issue._id));
        issuesGrid.appendChild(card);
    });
}


function updateHeaderCount(count, text) {
    issueCountText.innerText = `${count} ${text}`;
}
