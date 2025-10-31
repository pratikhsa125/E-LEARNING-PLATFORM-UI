function watchVideo(course) {
  let videoUrl = "";

  // Assign different videos for each course
  if (course === "html") {
    videoUrl = "https://www.youtube.com/embed/pQN-pnXPaVg"; // HTML tutorial
  } else if (course === "css") {
    videoUrl = "https://www.youtube.com/embed/1Rs2ND1ryYc"; // CSS tutorial
  } else if (course === "js") {
    videoUrl = "https://www.youtube.com/embed/hdI2bqOjy3c"; // JS tutorial
  }

  // Create popup container
  const popup = document.createElement("div");
  popup.classList.add("video-popup");
  popup.innerHTML = `
    <div class="video-content">
      <span class="close-btn" onclick="closeVideo()">&times;</span>
      <iframe width="800" height="450" src="${videoUrl}" frameborder="0" allowfullscreen></iframe>
    </div>
  `;
  document.body.appendChild(popup);
}

function closeVideo() {
  const popup = document.querySelector(".video-popup");
  if (popup) popup.remove();
}
// --- Progress Tracking ---
function updateProgress(course, amount) {
  // Load current progress or default 0
  let progress = JSON.parse(localStorage.getItem("progress")) || {
    html: 0,
    css: 0,
    js: 0,
  };

  // Increase progress but not above 100%
  progress[course] = Math.min(progress[course] + amount, 100);

  // Save updated progress
  localStorage.setItem("progress", JSON.stringify(progress));

  // Update the UI
  renderProgress();
}

function renderProgress() {
  const progress = JSON.parse(localStorage.getItem("progress")) || {
    html: 0,
    css: 0,
    js: 0,
  };

  document.getElementById("html-progress").style.width = progress.html + "%";
  document.getElementById("css-progress").style.width = progress.css + "%";
  document.getElementById("js-progress").style.width = progress.js + "%";

  document.getElementById("html-text").textContent = progress.html + "%";
  document.getElementById("css-text").textContent = progress.css + "%";
  document.getElementById("js-text").textContent = progress.js + "%";
}

// Run on page load
window.onload = renderProgress;
