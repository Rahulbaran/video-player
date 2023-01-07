import "../scss/style.scss";

// SELECTORS
const $videoPlayer = document.querySelector(".video-player-container");
const $video = $videoPlayer.querySelector(".video");
const $playBtn = $videoPlayer.querySelector(".play-btn");
const $screenBtn = $videoPlayer.querySelector(".screen-mode-btn");
const $settingsBtn = $videoPlayer.querySelector(".settings-btn");
const $volumeInput = $videoPlayer.querySelector("input[name=volume]");
const $videoLengthInput = $videoPlayer.querySelector(
  "input[name=video-length]"
);

/* FUNCTIONS */
function togglePlay() {
  const playStatus = $video.ended || $video.paused ? "play" : "pause";
  $video[playStatus]();
}

function updateIcon() {
  $playBtn.querySelector("i").className = `ri-${
    !this.paused ? "pause" : "play"
  }-line`;
}

function fullscreenToggle() {
  if (document.fullscreenEnabled) {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      $screenBtn.querySelector("i").className = "ri-fullscreen-line";
    } else {
      $videoPlayer.requestFullscreen();
      $screenBtn.querySelector("i").className = "ri-fullscreen-exit-line";
    }
  } else {
    alert("fullscreen mode is not allowed in your device");
  }
}

function updateVolume() {
  $video.volume = Number($volumeInput.value);
}

function setVideoLength() {
  $videoLengthInput.setAttribute("max", parseInt($video.duration));
}

/* EVENT HANDLERS */
// event handler when either of playbtn, video and space is clicked
$playBtn.addEventListener("click", togglePlay);
$video.addEventListener("click", togglePlay);
window.addEventListener("keydown", e => {
  if (e.code === "Space") togglePlay();
});

// event handler for updating play/pause icon
$video.addEventListener("play", updateIcon);
$video.addEventListener("pause", updateIcon);

// event handler for video when it is doubl e clicked
$video.addEventListener("dblclick", function () {
  if (this.currentTime < this.duration) this.currentTime += 10;
});

// event handlers for fullscreen
$screenBtn.addEventListener("click", fullscreenToggle);
window.addEventListener("fullscreenchange", () => {
  $screenBtn.querySelector("i").className = document.fullscreenElement
    ? "ri-fullscreen-exit-line"
    : "ri-fullscreen-line";
});

// event handlers for volume
window.onload = () => {
  setVideoLength();
  updateVolume();
};
$volumeInput.onchange = updateVolume;

// event handler for video duration
$video.addEventListener("ended", () => {
  $videoLengthInput.value = "0";
});
$video.addEventListener("timeupdate", function () {
  $videoLengthInput.value = String(this.currentTime);
});

$videoLengthInput.addEventListener("change", function () {
  $video.currentTime = Number(this.value);
});
