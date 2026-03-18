/**
 * Mykyta Bereg - Portfolio
 * Fullscreen background videos that change based on mouse/touch position
 */

const projects = getProjects();
const bgContainer = document.getElementById('backgroundVideos');
const projectNameEl = document.getElementById('projectName');
const projectYearEl = document.getElementById('projectYear');
const projectLink = document.getElementById('projectLink');
const totalVideos = projects.length;

const COLS = 6;
const ROWS = 4;

let currentVideoIndex = -1;
let lastChangeTime = 0;
const changeDelay = 100;
let autoplayActive = false;

function isMobile() {
  return 'ontouchstart' in window || window.innerWidth <= 768;
}

function updateProjectName(name, year) {
  if (!projectNameEl) return;
  projectNameEl.classList.add('fade');
  if (projectYearEl) projectYearEl.classList.add('fade');
  setTimeout(() => {
    projectNameEl.textContent = name;
    if (projectYearEl) projectYearEl.textContent = year;
    projectNameEl.classList.remove('fade');
    if (projectYearEl) projectYearEl.classList.remove('fade');
  }, 150);
}

// ========================================
// Mobile: two-video cross-fade (no lag, no black screens)
// ========================================

if (isMobile()) {
  (function() {
    function makeVid() {
      var v = document.createElement('video');
      v.className = 'bg-video mobile-bg-video';
      v.muted = true;
      v.playsInline = true;
      v.setAttribute('playsinline', '');
      v.setAttribute('webkit-playsinline', '');
      v.preload = 'auto';
      v.style.position = 'absolute';
      v.style.top = '0';
      v.style.left = '0';
      v.style.width = '100%';
      v.style.height = '100%';
      v.style.objectFit = 'cover';
      v.style.transition = 'opacity 0.3s ease';
      return v;
    }

    var vidA = makeVid();
    var vidB = makeVid();
    vidB.style.opacity = '0';
    bgContainer.appendChild(vidA);
    bgContainer.appendChild(vidB);

    var frontVid = vidA;
    var backVid = vidB;
    var switchGen = 0;
    var firstLoad = true;

    function showVideo(index) {
      if (index === currentVideoIndex) return;
      var prevIndex = currentVideoIndex;
      currentVideoIndex = index;
      switchGen++;
      var gen = switchGen;

      var p = projects[index];
      updateProjectName(p.name, p.year);
      if (projectLink) projectLink.dataset.url = './project?id=' + index;

      if (firstLoad) {
        firstLoad = false;
        frontVid.src = p.video;
        frontVid.loop = !autoplayActive;
        frontVid.load();
        frontVid.style.opacity = '1';
        frontVid.play().catch(function() {});
        if (autoplayActive) bindAutoplayEnd();
        return;
      }

      backVid.style.zIndex = '2';
      backVid.style.opacity = '0';
      frontVid.style.zIndex = '1';

      backVid.src = p.video;
      backVid.loop = !autoplayActive;
      backVid.load();

      var revealed = false;
      function reveal() {
        if (revealed || gen !== switchGen) return;
        revealed = true;
        backVid.play().catch(function() {});
        backVid.style.opacity = '1';
        frontVid.style.opacity = '0';
        frontVid.pause();
        var tmp = frontVid;
        frontVid = backVid;
        backVid = tmp;
        if (autoplayActive) bindAutoplayEnd();
      }

      backVid.addEventListener('loadeddata', reveal, { once: true });
      setTimeout(function() { reveal(); }, 1500);
    }

    // Autoplay
    function onVideoEnded() {
      if (!autoplayActive) return;
      var nextIndex = (currentVideoIndex + 1) % totalVideos;
      showVideo(nextIndex);
    }

    function bindAutoplayEnd() {
      if (!autoplayActive) return;
      frontVid.loop = false;
      frontVid.removeEventListener('ended', onVideoEnded);
      frontVid.addEventListener('ended', onVideoEnded);
    }

    function startAutoplay() {
      autoplayActive = true;
      if (currentVideoIndex >= 0) {
        frontVid.loop = false;
        bindAutoplayEnd();
      }
    }

    function pauseAutoplay() {
      autoplayActive = false;
    }

    function resumeAutoplay() {
      autoplayActive = true;
      frontVid.loop = false;
      bindAutoplayEnd();
    }

    // Touch interaction
    var touchActive = false;

    document.addEventListener('touchstart', function(e) {
      touchActive = true;
      pauseAutoplay();
      handleTouch(e.touches[0]);
    }, { passive: true });

    document.addEventListener('touchmove', function(e) {
      if (!touchActive) return;
      var now = Date.now();
      if (now - lastChangeTime < changeDelay) return;
      handleTouch(e.touches[0]);
    }, { passive: true });

    document.addEventListener('touchend', function() {
      touchActive = false;
      resumeAutoplay();
    }, { passive: true });

    function handleTouch(touch) {
      var colWidth = window.innerWidth / COLS;
      var rowHeight = window.innerHeight / ROWS;
      var col = Math.floor(touch.clientX / colWidth);
      var row = Math.floor(touch.clientY / rowHeight);
      var index = row * COLS + col;
      index = Math.max(0, Math.min(index, totalVideos - 1));
      if (index !== currentVideoIndex) {
        showVideo(index);
        lastChangeTime = Date.now();
      }
    }

    // Init
    var startIndex = Math.floor(Math.random() * totalVideos);
    showVideo(startIndex);
    startAutoplay();
  })();

} else {

// ========================================
// Desktop: one video element per project
// ========================================

  (function() {
    var videoWrappers;
    var loadedVideos = new Set();
    var posterCache = {};

    projects.forEach(function(p, i) {
      var wrapper = document.createElement('div');
      wrapper.className = 'bg-video-wrapper';
      wrapper.dataset.index = i;
      var video = document.createElement('video');
      video.className = 'bg-video';
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.preload = 'none';
      video.dataset.src = p.video;
      wrapper.appendChild(video);
      bgContainer.appendChild(wrapper);
    });

    videoWrappers = document.querySelectorAll('.bg-video-wrapper');

    function loadVideo(index) {
      if (loadedVideos.has(index)) return;
      var wrapper = videoWrappers[index];
      if (!wrapper) return;
      var video = wrapper.querySelector('.bg-video');
      if (!video) return;
      var src = video.dataset.src;
      if (!src) return;
      if (!video.querySelector('source')) {
        var source = document.createElement('source');
        source.src = src;
        source.type = 'video/mp4';
        video.appendChild(source);
      }
      video.preload = 'metadata';
      video.load();
      loadedVideos.add(index);

      video.addEventListener('loadeddata', function() {
        try {
          var canvas = document.createElement('canvas');
          canvas.width = video.videoWidth * 0.5;
          canvas.height = video.videoHeight * 0.5;
          canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
          var dataUrl = canvas.toDataURL('image/jpeg', 0.7);
          posterCache[index] = dataUrl;
          wrapper.style.backgroundImage = 'url(' + dataUrl + ')';
          wrapper.style.backgroundSize = 'cover';
          wrapper.style.backgroundPosition = 'center';
        } catch (e) {}
      }, { once: true });
    }

    function preloadNearby(index) {
      loadVideo(index);
      var cols = COLS;
      var row = Math.floor(index / cols);
      var col = index % cols;
      for (var dr = -1; dr <= 1; dr++) {
        for (var dc = -1; dc <= 1; dc++) {
          var ni = (row + dr) * cols + (col + dc);
          if (ni >= 0 && ni < totalVideos) loadVideo(ni);
        }
      }
    }

    function showVideo(index) {
      if (index === currentVideoIndex) return;

      loadVideo(index);
      preloadNearby(index);

      videoWrappers.forEach(function(wrapper, i) {
        wrapper.classList.remove('active');
        var video = wrapper.querySelector('.bg-video');
        if (video && i !== index) video.pause();
      });

      var targetWrapper = videoWrappers[index];
      if (targetWrapper) {
        targetWrapper.classList.add('active');
        var video = targetWrapper.querySelector('.bg-video');
        if (video) {
          video.preload = 'auto';
          video.play().catch(function() {});
          var p = projects[index];
          updateProjectName(p.name, p.year);
          if (projectLink) projectLink.dataset.url = './project?id=' + index;
        }
        currentVideoIndex = index;
      }
    }

    // Mouse tracking
    var startIndex = Math.floor(Math.random() * totalVideos);
    showVideo(startIndex);

    document.addEventListener('mousemove', function(e) {
      var now = Date.now();
      if (now - lastChangeTime < changeDelay) return;
      var colWidth = window.innerWidth / COLS;
      var rowHeight = window.innerHeight / ROWS;
      var col = Math.floor(e.clientX / colWidth);
      var row = Math.floor(e.clientY / rowHeight);
      var index = row * COLS + col;
      index = Math.max(0, Math.min(index, totalVideos - 1));
      if (index !== currentVideoIndex) {
        showVideo(index);
        lastChangeTime = now;
      }
    });

    // Stagger-load all remaining videos
    setTimeout(function() {
      var i = 0;
      function next() {
        if (i >= totalVideos) return;
        loadVideo(i);
        i++;
        setTimeout(next, 200);
      }
      next();
    }, 2000);
  })();
}

// ========================================
// Navigation
// ========================================

function navigateTo(url) {
  window.location.href = url;
}

if (projectLink) {
  projectLink.addEventListener('click', function() {
    var url = projectLink.dataset.url;
    if (url) navigateTo(url);
  });
}
