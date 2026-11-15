/* Project: Abhishek Dey Portfolio
   Features: Real-time Clock, Time-based Greeting, Dark Mode Toggle, and Email Copy
*/

// 1. Live Clock & Greeting Logic (Runs only on pages that have the clock elements)
function updateHeader() {
    const greetingEl = document.getElementById('greeting-box');
    const dateEl = document.getElementById('date-box');
    const clockEl = document.getElementById('clock-box');

    if (!greetingEl || !dateEl || !clockEl) return;

    const now = new Date();
    const hours = now.getHours();
    let greeting = "";

    if (hours < 12) {
        greeting = "Good Morning";
    } else if (hours < 17) {
        greeting = "Good Afternoon";
    } else if (hours < 21) {
        greeting = "Good Evening";
    } else {
        greeting = "Good Night";
    }

    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = now.toLocaleDateString('en-US', dateOptions);

    let h = hours % 12;
    h = h ? h : 12;
    const m = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
    const s = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    const formattedTime = `${h}:${m}:${s} ${ampm}`;

    greetingEl.textContent = `${greeting}, Visitor!`;
    dateEl.textContent = formattedDate;
    clockEl.textContent = formattedTime;
}

if (document.getElementById('clock-box')) {
    updateHeader();
    setInterval(updateHeader, 1000);
}

// 2. Dark / Light Mode Toggle with Saved Preference
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

function applySavedTheme() {
    const savedTheme = localStorage.getItem('abhishek-hub-theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (themeIcon) themeIcon.textContent = '☀️';
        if (themeToggleBtn) themeToggleBtn.setAttribute('aria-label', 'Switch to Light Mode');
    }
}

applySavedTheme();

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');

        localStorage.setItem('abhishek-hub-theme', isDark ? 'dark' : 'light');
        if (themeIcon) themeIcon.textContent = isDark ? '☀️' : '🌙';
        themeToggleBtn.setAttribute('aria-label', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    });
}

// 3. Copy Email Button Logic (For Contact Page)
const copyEmailBtn = document.getElementById('copy-email-btn');
const copyStatus = document.getElementById('copy-status');

if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
        const email = 'abhishekdey913@gmail.com';
        navigator.clipboard.writeText(email).then(() => {
            copyStatus.textContent = 'Email address copied to clipboard!';
            copyEmailBtn.textContent = 'Copied!';
            setTimeout(() => {
                copyStatus.textContent = '';
                copyEmailBtn.textContent = 'Copy Email';
            }, 3000);
        }).catch(() => {
            copyStatus.textContent = 'Unable to copy automatically. Please select and copy the email.';
        });
    });
}
