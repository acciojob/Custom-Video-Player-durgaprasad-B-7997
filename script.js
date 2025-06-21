// Select DOM elements
const video = document.querySelector('video');
const toggleButton = document.querySelector('.player__button.toggle');
const skipButtons = document.querySelectorAll('[data-skip]');
const volumeSlider = document.querySelector('input[name="volume"]');
const playbackRateSlider = document.querySelector('input[name="playbackRate"]');
const progress = document.querySelector('.progress');
const progressFilled = document.querySelector('.progress__filled');
const errorDisplay = document.querySelector('.error-message'); // Optional error message container

// Toggle Play/Pause
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// Update Play/Pause Button Icon
function updateToggleButton() {
  const icon = video.paused ? '►' : '❚❚';
  toggleButton.textContent = icon;
}

// Skip Functionality
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// Volume Control
function handleVolumeChange() {
  video.volume = this.value;
}

// Playback Speed Control
function handlePlaybackRateChange() {
  video.playbackRate = this.value;
}

// Update Progress Bar
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressFilled.style.flexBasis = `${percent}%`;
}

// Scrub (click/drag to seek)
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Error Handling
function handleVideoError() {
  if (errorDisplay) {
    errorDisplay.textContent = '⚠️ Failed to load video. Please try again later.';
    errorDisplay.style.display = 'block';
  } else {
    alert('Error: Unable to load video.');
  }
}

// Event Listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateToggleButton);
video.addEventListener('pause', updateToggleButton);
video.addEventListener('timeupdate', handleProgress);
video.addEventListener('error', handleVideoError);

toggleButton.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

volumeSlider.addEventListener('input', handleVolumeChange);
playbackRateSlider.addEventListener('input', handlePlaybackRateChange);

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
