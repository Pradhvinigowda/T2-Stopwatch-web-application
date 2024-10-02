let startTime, updatedTime, difference, tInterval, running = false;
let lapCount = 0;

const timeDisplay = document.getElementById('time-display');
const lapList = document.getElementById('lap-list');

document.getElementById('start').addEventListener('click', startStopwatch);
document.getElementById('pause').addEventListener('click', pauseStopwatch);
document.getElementById('reset').addEventListener('click', resetStopwatch);
document.getElementById('lap').addEventListener('click', recordLap);

function startStopwatch() {
    if (!running) {
        startTime = Date.now() - difference;
        tInterval = setInterval(updateTime, 10);
        running = true;
    }
}

function pauseStopwatch() {
    if (running) {
        clearInterval(tInterval);
        difference = Date.now() - startTime;
        running = false;
    }
}

function resetStopwatch() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    timeDisplay.textContent = '00:00:00.00';
    lapList.innerHTML = '';
    lapCount = 0;
}

function recordLap() {
    if (running) {
        lapCount++;
        const lapTime = document.createElement('li');
        lapTime.textContent = `Lap ${lapCount}: ${timeDisplay.textContent}`;
        lapList.appendChild(lapTime);
    }
}

function updateTime() {
    updatedTime = Date.now() - startTime;
    const milliseconds = Math.floor((updatedTime % 1000) / 10);
    const seconds = Math.floor((updatedTime / 1000) % 60);
    const minutes = Math.floor((updatedTime / (1000 * 60)) % 60);
    const hours = Math.floor((updatedTime / (1000 * 60 * 60)) % 24);

    timeDisplay.textContent = 
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
}