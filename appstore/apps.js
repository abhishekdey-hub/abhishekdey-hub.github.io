const allApps = [
    {
        name: "Voice Chess Pro",
        category: "games",
        desc: "সম্পূর্ণ ভয়েস গাইডেড দাবা গেম।",
        link: "games/chess.html",
        isRecent: true
    },
    {
        name: "Bangla TTS Premium",
        category: "tts",
        desc: "সেরা মানের বাংলা টেক্সট টু স্পিচ ইঞ্জিন।",
        link: "tts/bangla-tts.html",
        isRecent: true
    },
    {
        name: "Smart Screen Reader",
        category: "screen-reader",
        desc: "দ্রুত এবং নির্ভুল স্ক্রিন রিডার অ্যাপ।",
        link: "screen-readers/smart-reader.html",
        isRecent: false
    }
];

// পেজ লোড হলে অ্যাপগুলো দেখানোর ফাংশন
function displayApps(appsToDisplay) {
    const container = document.getElementById('appGrid');
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

// সার্চ ফাংশন
function filterApps() {
    const searchTerm = document.getElementById('searchBar').value.toLowerCase();
    const filtered = allApps.filter(app => 
        app.name.toLowerCase().includes(searchTerm) || 
        app.category.toLowerCase().includes(searchTerm)
    );
    displayApps(filtered);
}

// শুরুতে সব অ্যাপ দেখানো
window.onload = () => displayApps(allApps);
