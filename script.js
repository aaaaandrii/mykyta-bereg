/**
 * Mykyta Bereg - Portfolio
 * Fullscreen background videos that change based on mouse position
 */

const projects = getProjects();

// ========================================
// Generate Background Videos
// ========================================

const bgContainer = document.getElementById('backgroundVideos');
projects.forEach((p, i) => {
  const wrapper = document.createElement('div');
  wrapper.className = 'bg-video-wrapper' + (i === 0 ? ' active' : '');
  wrapper.dataset.index = i;
  const video = document.createElement('video');
  video.className = 'bg-video';
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.preload = 'auto';
  const source = document.createElement('source');
  source.src = p.video;
  source.type = 'video/mp4';
  video.appendChild(source);
  wrapper.appendChild(video);
  bgContainer.appendChild(wrapper);
});

// ========================================
// Background Video Switching - Mouse Position Based
// ========================================

const videoWrappers = document.querySelectorAll('.bg-video-wrapper');
const videos = document.querySelectorAll('.bg-video');
const projectNameEl = document.getElementById('projectName');
const projectYearEl = document.getElementById('projectYear');
const projectLink = document.getElementById('projectLink');
const totalVideos = videoWrappers.length;

const COLS = 6;
const ROWS = 4;

let currentVideoIndex = 0;
let lastChangeTime = 0;
const changeDelay = 100;
let autoplayActive = false;

function updateProjectName(name, year) {
  if (!projectNameEl) return;

  projectNameEl.classList.add('fade');
  if (projectYearEl) projectYearEl.classList.add('fade');

  setTimeout(() => {
    projectNameEl.textContent = name;
    if (projectYearEl) {
      projectYearEl.textContent = year;
    }
    projectNameEl.classList.remove('fade');
    if (projectYearEl) projectYearEl.classList.remove('fade');
  }, 150);
}

function showVideo(index) {
  if (index === currentVideoIndex) return;

  videoWrappers.forEach((wrapper, i) => {
    wrapper.classList.remove('active');
    const video = wrapper.querySelector('.bg-video');
    if (video && i !== index) {
      video.pause();
    }
  });

  const targetWrapper = document.querySelector(`.bg-video-wrapper[data-index="${index}"]`);
  if (targetWrapper) {
    targetWrapper.classList.add('active');
    const video = targetWrapper.querySelector('.bg-video');
    if (video) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }

      const p = projects[index];
      updateProjectName(p.name, p.year);

      if (projectLink) {
        projectLink.dataset.url = `project.html?id=${index}`;
      }
    }
    currentVideoIndex = index;
    if (autoplayActive && typeof bindAutoplayEnd === 'function') bindAutoplayEnd();
  }
}

function initMouseTracking() {
  const firstVideo = videoWrappers[0]?.querySelector('.bg-video');
  if (firstVideo) {
    firstVideo.play().catch(() => {});
    if (projectNameEl) projectNameEl.textContent = projects[0].name;
    if (projectYearEl) projectYearEl.textContent = projects[0].year;
  }

  document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastChangeTime < changeDelay) return;

    const colWidth = window.innerWidth / COLS;
    const rowHeight = window.innerHeight / ROWS;
    const col = Math.floor(e.clientX / colWidth);
    const row = Math.floor(e.clientY / rowHeight);
    let index = row * COLS + col;
    index = Math.max(0, Math.min(index, totalVideos - 1));

    if (index !== currentVideoIndex) {
      showVideo(index);
      lastChangeTime = now;
    }
  });
}

// ========================================
// Touch Interaction - Swipe to change videos
// ========================================

function initTouchTracking() {
  let touchActive = false;

  document.addEventListener('touchstart', (e) => {
    touchActive = true;
    pauseAutoplay();
    handleTouch(e.touches[0]);
  }, { passive: true });

  document.addEventListener('touchmove', (e) => {
    if (!touchActive) return;
    const now = Date.now();
    if (now - lastChangeTime < changeDelay) return;
    handleTouch(e.touches[0]);
  }, { passive: true });

  document.addEventListener('touchend', () => {
    touchActive = false;
    resumeAutoplay();
  }, { passive: true });

  function handleTouch(touch) {
    const colWidth = window.innerWidth / COLS;
    const rowHeight = window.innerHeight / ROWS;
    const col = Math.floor(touch.clientX / colWidth);
    const row = Math.floor(touch.clientY / rowHeight);
    let index = row * COLS + col;
    index = Math.max(0, Math.min(index, totalVideos - 1));

    if (index !== currentVideoIndex) {
      showVideo(index);
      lastChangeTime = Date.now();
    }
  }
}

// ========================================
// Mobile Autoplay - play full video then advance
// ========================================

function isMobile() {
  return 'ontouchstart' in window || window.innerWidth <= 768;
}

function onVideoEnded() {
  if (!autoplayActive) return;
  const nextIndex = (currentVideoIndex + 1) % totalVideos;
  showVideo(nextIndex);
  bindAutoplayEnd();
}

function bindAutoplayEnd() {
  if (!autoplayActive) return;
  const wrapper = document.querySelector(`.bg-video-wrapper[data-index="${currentVideoIndex}"]`);
  if (!wrapper) return;
  const video = wrapper.querySelector('.bg-video');
  if (video) {
    video.loop = false;
    video.removeEventListener('ended', onVideoEnded);
    video.addEventListener('ended', onVideoEnded);
  }
}

function startAutoplay() {
  if (!isMobile()) return;
  autoplayActive = true;
  videoWrappers.forEach(w => {
    const v = w.querySelector('.bg-video');
    if (v) v.loop = false;
  });
  bindAutoplayEnd();
}

function pauseAutoplay() {
  autoplayActive = false;
}

function resumeAutoplay() {
  if (!isMobile()) return;
  autoplayActive = true;
  bindAutoplayEnd();
}

// ========================================
// Initialize
// ========================================

function init() {
  initMouseTracking();
  initTouchTracking();
  startAutoplay();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// ========================================
// Navigation without URL preview
// ========================================

function navigateTo(url) {
  window.location.href = url;
}

if (projectLink) {
  projectLink.addEventListener('click', () => {
    const url = projectLink.dataset.url;
    if (url) {
      navigateTo(url);
    }
  });
}
