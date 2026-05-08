/**
 * Abhishek App Hub - Core Logic
 * Includes: Search, Voice Search, Dark Mode (Accessible), 
 * Category Filters, and LocalStorage Persistence.
 */

// 1. Original App List (Converted to English)
const allApps = [
    {
        name: "Board Games",
        category: "games",
        desc: "Play classic board games with Screen Readers & Accessibility.",
        link: "games/board-games",
        isRecent: true
    },
    {
        name: "Android Accessibility Suite",
        category: "screen readers",
        desc: "Includes TalkBack, Accessibility menu and more.",
        link: "screen-readers/android-accessibility-suite",
        isRecent: true
    },
    {
        name: "Speech Recognition and Synthesis from Google",
        category: "tts",
        desc: "Speech recognition and synthesis for your device.",
        link: "text-to-speech/speech-recognition-and-synthesis-from-google",
        isRecent: false
    }
];

// 2. Display Apps Function (With Original Card Design)
function displayApps(appsToDisplay) {
    const container = document.getElementById('appGrid');
    if (!container) return; // Guard clause if element doesn't exist on download pages
    
    container.innerHTML = '';

    appsToDisplay.forEach(app => {
        const card = `
            <div class="app-card" data-category="${app.category}">
                <h3>${app.name}</h3>
                <p>${app.desc}</p>
                <span class="badge">${app.category}</span>
                <a href="${app.link}" class="btn">Details</a>
            </div>
        `;
        container.innerHTML += card;
    });
}

// 3. Search Function (Name & Category Support)
function filterApps() {
    const searchTerm = document.getElementById('searchBar').value.toLowerCase();
    const filtered = allApps.filter(app => 
        app.name.toLowerCase().includes(searchTerm) || 
        app.category.toLowerCase().includes(searchTerm)
    );
    displayApps(filtered);
}

// 4. Dark Mode Toggle with Accessibility (ARIA) & LocalStorage
function toggleDarkMode() {
    const body = document.body;
    const btn = document.getElementById('darkModeToggle');
    const icon = btn.querySelector('i');
    
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
        icon.classList.replace('fa-moon', 'fa-sun');
        btn.setAttribute('aria-label', 'Dark Mode Active. Switch to Light Mode');
    } else {
        localStorage.setItem('darkMode', 'disabled');
        icon.classList.replace('fa-sun', 'fa-moon');
        btn.setAttribute('aria-label', 'Light Mode Active. Switch to Dark Mode');
    }
}

// 5. Initialize Theme on Load (Ensures Dark Mode stays on all pages)
function initializeTheme() {
    const darkMode = localStorage.getItem('darkMode');
    const btn = document.getElementById('darkModeToggle');
    const icon = btn ? btn.querySelector('i') : null;
    
    if (darkMode === 'enabled') {
        document.body.classList.add('dark-mode');
        if (icon) icon.classList.replace('fa-moon', 'fa-sun');
        if (btn) btn.setAttribute('aria-label', 'Dark Mode Active. Switch to Light Mode');
    } else if (btn) {
        btn.setAttribute('aria-label', 'Light Mode Active. Switch to Dark Mode');
    }
}

// 6. Category Menu Toggle
function toggleMenu() {
    const menu = document.getElementById("categoryMenu");
    if (menu) menu.classList.toggle("show");
}

// 7. Category Filter Logic
function filterByCategory(cat) {
    toggleMenu(); // Close menu after selection
    if (cat === 'all') {
        displayApps(allApps);
    } else {
        const filtered = allApps.filter(app => app.category === cat);
        displayApps(filtered);
    }
}

// 8. Voice Search Logic (Web Speech API)
function startVoiceSearch() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        alert("Your browser does not support Voice Search. Please use Chrome.");
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US'; 
    
    recognition.onstart = () => {
        document.getElementById('voiceSearchBtn').style.color = 'red';
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        const searchBar = document.getElementById('searchBar');
        searchBar.value = transcript;
        filterApps();
        document.getElementById('voiceSearchBtn').style.color = '#333';
    };

    recognition.onerror = () => {
        document.getElementById('voiceSearchBtn').style.color = '#333';
    };

    recognition.onend = () => {
        document.getElementById('voiceSearchBtn').style.color = '#333';
    };

    recognition.start();
}

// 9. Request App Function (Opens Email Client)
function requestApp() {
    const email = "abhishekdey913@gmail.com";
    const subject = encodeURIComponent("App Request - Abhishek App Hub");
    const body = encodeURIComponent("I would like to request the following app: \n\nApp Name: \nDescription: ");
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
}

// 10. Run on Page Load
window.onload = () => {
    initializeTheme();
    displayApps(allApps);
};