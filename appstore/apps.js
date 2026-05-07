// আপনার অ্যাপ লিস্ট (আগের মতোই)
const allApps = [
    { name: "Voice Chess Pro", category: "games", desc: "ভয়েস গাইডেড দাবা গেম।", link: "games/chess.html" },
    { name: "Bangla TTS Premium", category: "tts", desc: "সেরা বাংলা ভয়েস ইঞ্জিন।", link: "tts/bangla-tts.html" }
];

// ১. ডার্ক মোড টগল
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const icon = document.querySelector('#darkModeToggle i');
    if(document.body.classList.contains('dark-mode')) {
        icon.classList.replace('fa-moon', 'fa-sun');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
    }
}

// ২. ক্যাটাগরি মেনু টগল
function toggleMenu() {
    document.getElementById("categoryMenu").classList.toggle("show");
}

// ৩. ভয়েস সার্চ লজিক
function startVoiceSearch() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US'; 
    
    recognition.onstart = () => {
        document.getElementById('voiceSearchBtn').style.color = 'red';
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        document.getElementById('searchBar').value = transcript;
        filterApps();
        document.getElementById('voiceSearchBtn').style.color = '#333';
    };

    recognition.start();
}

// ৪. ক্যাটাগরি অনুযায়ী ফিল্টার
function filterByCategory(cat) {
    toggleMenu(); // মেনু বন্ধ করার জন্য
    if(cat === 'all') {
        displayApps(allApps);
    } else {
        const filtered = allApps.filter(app => app.category === cat);
        displayApps(filtered);
    }
}

// ৫. সার্চ এবং ডিসপ্লে ফাংশন (আগের মতোই)
function displayApps(apps) {
    const grid = document.getElementById('appGrid');
    grid.innerHTML = apps.map(app => `
        <div class="app-card">
            <h3>${app.name}</h3>
            <p>${app.desc}</p>
            <a href="${app.link}" class="request-btn" style="display:block; text-align:center; text-decoration:none;">Details</a>
        </div>
    `).join('');
}

function filterApps() {
    const term = document.getElementById('searchBar').value.toLowerCase();
    const filtered = allApps.filter(app => app.name.toLowerCase().includes(term));
    displayApps(filtered);
}

window.onload = () => displayApps(allApps);

function requestApp() {
    alert("This feature is coming soon! You can email: abhishekdey913@gmail.com");
}
