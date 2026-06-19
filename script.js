const playButton = document.querySelector(".play-button");
const playerPanel = document.querySelector(".player-panel");
const audio = document.querySelector("#dj-track");
const trackTitle = document.querySelector(".track-info strong");
const trackChoices = document.querySelectorAll(".track-choice");

function startSound() {
  audio.play().then(() => {
    playerPanel.classList.add("is-active");
    playButton.textContent = "❚❚";
    playButton.setAttribute("aria-label", "Parar musica");
  });
}

function stopSound() {
  audio.pause();
  playerPanel.classList.remove("is-active");
  playButton.textContent = "▶";
  playButton.setAttribute("aria-label", "Tocar musica");
}

playButton?.addEventListener("click", () => {
  if (!audio) return;

  if (audio.paused) {
    startSound();
  } else {
    stopSound();
  }
});

audio?.addEventListener("ended", stopSound);

trackChoices.forEach((choice) => {
  choice.addEventListener("click", () => {
    if (!audio) return;

    const src = choice.dataset.src;
    const title = choice.dataset.title;
    const wasPlaying = !audio.paused;

    trackChoices.forEach((item) => item.classList.remove("is-selected"));
    choice.classList.add("is-selected");

    audio.src = src;
    if (trackTitle && title) {
      trackTitle.textContent = title;
    }

    if (wasPlaying) {
      startSound();
    } else {
      stopSound();
    }
  });
});
