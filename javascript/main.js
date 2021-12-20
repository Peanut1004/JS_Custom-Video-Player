const player = document.querySelector('.player')
const video = player.querySelector('.player__video')
const progress = player.querySelector('.player__progress')
const progressBar = player.querySelector('.player__progress__filled')

const toggle = player.querySelector('.toggle')
const skipButtons = player.querySelectorAll('[data-skip]')
const volume = player.querySelector('.player__volume input')
const time = player.querySelector('.player__time')

function togglePlay() {
  if(video.paused) {
    video.play();
    toggle.innerHTML = `<i class="fas fa-pause"></i>`;
  }
  else {
    video.pause();
    toggle.innerHTML = `<i class="fas fa-play"></i>`;
  }
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100
	progressBar.style.width = `${percent}%`;

  time.innerHTML = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;
}

progress.addEventListener('click', (e) => {
  const srubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = srubTime;
})

function formatTime(time) {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time - minutes * 60);

  let minuteValue = minutes < 10 ? '0' + minutes : minutes;
  let secondValue = seconds < 10 ? '0' + seconds : seconds;

  let mediaTime = minuteValue + ':' + secondValue;

  return mediaTime;
}

volume.addEventListener('change', function() {
  video.volume = this.value;
})

skipButtons.forEach(button => {
  button.addEventListener('click', function() {
    video.currentTime += +(this.dataset.skip)
  })
})


video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', handleProgress);