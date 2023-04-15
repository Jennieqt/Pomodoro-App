const workIntervalInput = document.getElementById('work-interval');
const breakIntervalInput = document.getElementById('break-interval');
const startPauseButton = document.getElementById('start-pause');
const resetButton = document.getElementById('reset');
const timerDisplay = document.getElementById('timer');
const audio = document.getElementById('relaxing-audio');

let workInterval = workIntervalInput.value * 60;
let breakInterval = breakIntervalInput.value * 60;
let timeLeft = workInterval;
let isRunning = false;
let isWorkInterval = true;
let timer;

function toggleTimer() {
  if (isRunning) {
    clearInterval(timer);
  } else {
    timer = setInterval(() => {
      timeLeft--;
      updateDisplay();
      if (timeLeft === 0) {
        setNewInterval();
      }
    }, 1000);
  }

  isRunning = !isRunning;

  if (!isRunning) {
    startPauseButton.innerHTML = '<i class="fas fa-pause"></i> Pause';
    audio.play();
  } else {
    startPauseButton.innerHTML = '<i class="fas fa-play"></i> Start';
    audio.pause();
  }
}

function setNewInterval() {
  isWorkInterval = !isWorkInterval;
  timeLeft = isWorkInterval ? workInterval : breakInterval;
  updateDisplay();
}

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function resetTimer() {
  isWorkInterval = true;
  timeLeft = workInterval;
  updateDisplay();
  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
    startPauseButton.innerHTML = '<i class="fas fa-play"></i> Start';
    audio.pause();
  }
}

function setAudioPlaybackRate() {
  const audioDuration = 5 * 60; // Audio duration in seconds (5 minutes in this case)
  const playbackRate = workInterval / audioDuration;
  audio.playbackRate = playbackRate;
}

workIntervalInput.addEventListener('change', () => {
  workInterval = workIntervalInput.value * 60;
  setAudioPlaybackRate();
  if (isWorkInterval) {
    setNewInterval();
  }
});

breakIntervalInput.addEventListener('change', () => {
  breakInterval = breakIntervalInput.value * 60;
  if (!isWorkInterval) {
    setNewInterval();
  }
});
function toggleTimer() {
    if (isRunning) {
      clearInterval(timer);
      startPauseButton.innerHTML = '<i class="fas fa-play"></i> Start';
      audio.pause();
    } else {
      timer = setInterval(() => {
        timeLeft--;
        updateDisplay();
        if (timeLeft === 0) {
          setNewInterval();
        }
      }, 1000);
      startPauseButton.innerHTML = '<i class="fas fa-pause"></i> Pause';
      audio.play();
    }
  
    isRunning = !isRunning;
  }
  

startPauseButton.addEventListener('click', toggleTimer);
resetButton.addEventListener('click', resetTimer);

setNewInterval();
setAudioPlaybackRate();
