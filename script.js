/* Project: Abhishek Dey Portfolio - Dynamic Header Logic
   Features: Real-time Clock, Date Display, and Time-based Greetings
*/

function updateHeader() {
    const now = new Date(); // Get current system time and date

    // 1. Logic for Greeting Message (Time-based)
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

    // 2. Logic for Date Display (Full Format: Wednesday, May 6, 2026)
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = now.toLocaleDateString('en-US', dateOptions);

    // 3. Logic for Real-time Clock (12-hour format with AM/PM)
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let ampm = h >= 12 ? 'PM' : 'AM';

    h = h % 12;
    h = h ? h : 12; // The hour '0' should be '12'
    m = m < 10 ? '0' + m : m; // Add leading zero to minutes
    s = s < 10 ? '0' + s : s; // Add leading zero to seconds

    const formattedTime = h + ":" + m + ":" + s + " " + ampm;

    // Push the results to the HTML elements
    // Note: We need to create these IDs in your HTML file
    document.getElementById('greeting-box').innerHTML = greeting + ", Abhishek!";
    document.getElementById('date-box').innerHTML = formattedDate;
    document.getElementById('clock-box').innerHTML = formattedTime;
}

// Update the clock every 1 second (1000 milliseconds)
setInterval(updateHeader, 1000);

// Run the function immediately when the page loads
updateHeader();
