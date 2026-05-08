// Working Music Player with Reliable Audio Sources
class MusicPlayer {
  constructor() {
    this.audio = document.getElementById("audio");
    this.isPlaying = false;
    this.isShuffled = false;
    this.repeatMode = 0;
    this.currentSongIndex = -1;
    this.volume = 0.7;

    // Using reliable, CORS-friendly audio sources
    this.playlist = [
      {
        title: "Sample Beat 1",
        artist: "Demo Track",
        duration: "0:15",
        cover: "https://picsum.photos/400/400?random=1",
        // Using base64 encoded tiny audio or blob URL will be generated
        src: null, // Will be generated
      },
      {
        title: "Sample Beat 2",
        artist: "Demo Track",
        duration: "0:15",
        cover: "https://picsum.photos/400/400?random=2",
        src: null,
      },
      {
        title: "Sample Beat 3",
        artist: "Demo Track",
        duration: "0:15",
        cover: "https://picsum.photos/400/400?random=3",
        src: null,
      },
    ];

    this.initializeElements();
    this.initializeEventListeners();
    this.generateDemoAudio(); // Generate playable audio
    this.renderPlaylist();

    // Set initial volume
    this.audio.volume = this.volume;
    this.volumeSlider.value = this.volume * 100;
  }

  // Generate simple audio tones as demo
  generateDemoAudio() {
    // Create simple audio using Web Audio API
    const audioContext = new (
      window.AudioContext || window.webkitAudioContext
    )();

    this.playlist.forEach((song, index) => {
      const sampleRate = audioContext.sampleRate;
      const duration = 15; // 15 seconds each
      const numSamples = sampleRate * duration;
      const buffer = audioContext.createBuffer(1, numSamples, sampleRate);
      const channelData = buffer.getChannelData(0);

      // Generate different tones for each song
      const frequencies = [261.63, 329.63, 392.0]; // C, E, G notes
      const frequency = frequencies[index] || 440;

      for (let i = 0; i < numSamples; i++) {
        const t = i / sampleRate;
        // Create a more musical tone with envelope
        const envelope = Math.exp(-t * 0.5) * 0.5;
        const vibrato = Math.sin(t * 5) * 0.1;
        channelData[i] =
          Math.sin(2 * Math.PI * frequency * t * (1 + vibrato)) * envelope;
      }

      // Convert buffer to WAV blob
      const wavBlob = this.bufferToWav(buffer);
      const url = URL.createObjectURL(wavBlob);
      this.playlist[index].src = url;
    });

    audioContext.close();
  }

  // Convert AudioBuffer to WAV blob
  bufferToWav(buffer) {
    const numChannels = buffer.numberOfChannels;
    const sampleRate = buffer.sampleRate;
    const format = 1; // PCM
    const bitsPerSample = 16;

    const data = buffer.getChannelData(0);
    const dataLength = data.length * (bitsPerSample / 8);
    const headerLength = 44;
    const totalLength = headerLength + dataLength;

    const arrayBuffer = new ArrayBuffer(totalLength);
    const view = new DataView(arrayBuffer);

    // WAV header
    this.writeString(view, 0, "RIFF");
    view.setUint32(4, totalLength - 8, true);
    this.writeString(view, 8, "WAVE");
    this.writeString(view, 12, "fmt ");
    view.setUint32(16, 16, true);
    view.setUint16(20, format, true);
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, (sampleRate * numChannels * bitsPerSample) / 8, true);
    view.setUint16(32, (numChannels * bitsPerSample) / 8, true);
    view.setUint16(34, bitsPerSample, true);
    this.writeString(view, 36, "data");
    view.setUint32(40, dataLength, true);

    // Write audio data
    let offset = 44;
    for (let i = 0; i < data.length; i++) {
      const sample = Math.max(-1, Math.min(1, data[i]));
      view.setInt16(
        offset,
        sample < 0 ? sample * 0x8000 : sample * 0x7fff,
        true,
      );
      offset += 2;
    }

    return new Blob([arrayBuffer], { type: "audio/wav" });
  }

  writeString(view, offset, string) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

  initializeElements() {
    // Player elements
    this.playBtn = document.getElementById("playBtn");
    this.playIcon = document.getElementById("playIcon");
    this.prevBtn = document.getElementById("prevBtn");
    this.nextBtn = document.getElementById("nextBtn");
    this.shuffleBtn = document.getElementById("shuffleBtn");
    this.repeatBtn = document.getElementById("repeatBtn");
    this.volumeBtn = document.getElementById("volumeBtn");
    this.volumeIcon = document.getElementById("volumeIcon");
    this.volumeSlider = document.getElementById("volumeSlider");
    this.progressBar = document.getElementById("progressBar");
    this.progress = document.getElementById("progress");
    this.progressHandle = document.getElementById("progressHandle");
    this.currentTimeEl = document.getElementById("currentTime");
    this.durationEl = document.getElementById("duration");
    this.songTitle = document.getElementById("songTitle");
    this.songArtist = document.getElementById("songArtist");
    this.albumImg = document.getElementById("albumImg");
    this.favoriteBtn = document.getElementById("favoriteBtn");

    // Upload elements
    this.uploadBtn = document.getElementById("uploadBtn");
    this.addMusicBtn = document.getElementById("addMusicBtn");
    this.fileInput = document.getElementById("fileInput");

    // Panel elements
    this.playlistBtn = document.getElementById("playlistBtn");
    this.eqBtn = document.getElementById("eqBtn");
    this.playlistPanel = document.getElementById("playlistPanel");
    this.eqPanel = document.getElementById("eqPanel");
    this.closePlaylist = document.getElementById("closePlaylist");
    this.closeEq = document.getElementById("closeEq");
    this.playlistSongs = document.getElementById("playlistSongs");

    // Initial volume
    this.audio.volume = this.volume;
    this.volumeSlider.value = this.volume * 100;
  }

  initializeEventListeners() {
    // Play/Pause
    this.playBtn.addEventListener("click", () => {
      this.togglePlay();
    });

    // Previous/Next
    this.prevBtn.addEventListener("click", () => this.prevSong());
    this.nextBtn.addEventListener("click", () => this.nextSong());

    // Shuffle/Repeat
    this.shuffleBtn.addEventListener("click", () => this.toggleShuffle());
    this.repeatBtn.addEventListener("click", () => this.toggleRepeat());

    // Volume
    this.volumeBtn.addEventListener("click", () => this.toggleMute());
    this.volumeSlider.addEventListener("input", (e) =>
      this.setVolume(e.target.value),
    );

    // Progress
    this.progressBar.addEventListener("click", (e) => this.setProgress(e));
    this.progressBar.addEventListener("mousedown", () => {
      this.isDragging = true;
    });
    document.addEventListener("mouseup", () => {
      this.isDragging = false;
    });
    document.addEventListener("mousemove", (e) => {
      if (this.isDragging) {
        this.setProgress(e);
      }
    });

    // Audio events
    this.audio.addEventListener("timeupdate", () => this.updateProgress());
    this.audio.addEventListener("loadedmetadata", () => {
      console.log("Metadata loaded");
      this.updateDuration();
    });
    this.audio.addEventListener("loadeddata", () => {
      console.log("Audio data loaded successfully");
      this.updateDuration();
    });
    this.audio.addEventListener("canplay", () => {
      console.log("Audio can play now");
      this.updateDuration();
    });
    this.audio.addEventListener("ended", () => this.handleSongEnd());
    this.audio.addEventListener("error", (e) => {
      console.error("Audio error:", e);
      const error = this.audio.error;
      let errorMsg = "Error loading audio";
      switch (error.code) {
        case MediaError.MEDIA_ERR_ABORTED:
          errorMsg = "Playback aborted";
          break;
        case MediaError.MEDIA_ERR_NETWORK:
          errorMsg = "Network error";
          break;
        case MediaError.MEDIA_ERR_DECODE:
          errorMsg = "Audio decoding error";
          break;
        case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
          errorMsg = "Audio format not supported";
          break;
      }
      this.showNotification(errorMsg, "error");
    });

    // Panels
    this.playlistBtn.addEventListener("click", () =>
      this.togglePanel("playlist"),
    );
    this.eqBtn.addEventListener("click", () => this.togglePanel("eq"));
    this.closePlaylist.addEventListener("click", () =>
      this.togglePanel("playlist"),
    );
    this.closeEq.addEventListener("click", () => this.togglePanel("eq"));

    // Upload
    this.uploadBtn.addEventListener("click", () => this.fileInput.click());
    this.addMusicBtn.addEventListener("click", () => this.fileInput.click());
    this.fileInput.addEventListener("change", (e) => this.handleFileUpload(e));

    // Equalizer presets
    document.querySelectorAll(".preset-btn").forEach((btn) => {
      btn.addEventListener("click", (e) =>
        this.applyEqPreset(e.target.dataset.preset),
      );
    });

    // Equalizer sliders
    document.querySelectorAll(".eq-input").forEach((slider) => {
      slider.addEventListener("input", () => this.applyEqChanges());
    });

    // Keyboard controls
    document.addEventListener("keydown", (e) => this.handleKeyboard(e));

    // Favorite
    this.favoriteBtn.addEventListener("click", () => this.toggleFavorite());

    // Load first song after a short delay to ensure audio context is ready
    setTimeout(() => {
      if (this.playlist.length > 0) {
        this.loadSong(0);
      }
    }, 500);
  }

  togglePlay() {
    if (this.playlist.length === 0) {
      this.showNotification("Please add songs to playlist first!", "warning");
      return;
    }

    if (this.currentSongIndex === -1 && this.playlist.length > 0) {
      this.loadSong(0);
    }

    if (this.isPlaying) {
      this.pauseSong();
    } else {
      this.playSong();
    }
  }

  playSong() {
    const playPromise = this.audio.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          this.isPlaying = true;
          this.playIcon.classList.remove("fa-play");
          this.playIcon.classList.add("fa-pause");
          this.addPulseAnimation();
          console.log(
            "Now playing:",
            this.playlist[this.currentSongIndex]?.title,
          );
        })
        .catch((err) => {
          console.error("Play failed:", err);
          // Retry playing after user interaction
          this.showNotification("Click play to start", "info");
          this.isPlaying = false;
          this.playIcon.classList.remove("fa-pause");
          this.playIcon.classList.add("fa-play");
        });
    }
  }

  pauseSong() {
    this.audio.pause();
    this.isPlaying = false;
    this.playIcon.classList.remove("fa-pause");
    this.playIcon.classList.add("fa-play");
    this.removePulseAnimation();
  }

  addPulseAnimation() {
    const albumArt = document.querySelector(".album-art");
    if (albumArt) {
      albumArt.style.animation = "pulse 2s infinite";
    }
  }

  removePulseAnimation() {
    const albumArt = document.querySelector(".album-art");
    if (albumArt) {
      albumArt.style.animation = "none";
    }
  }

  loadSong(index) {
    if (index < 0 || index >= this.playlist.length) return;

    const wasPlaying = this.isPlaying;
    if (wasPlaying) {
      this.audio.pause();
    }

    this.currentSongIndex = index;
    const song = this.playlist[index];

    this.songTitle.textContent = song.title || "Unknown Title";
    this.songArtist.textContent = song.artist || "Unknown Artist";
    this.albumImg.src =
      song.cover || "https://picsum.photos/400/400?random=default";

    // Reset progress
    this.progress.style.width = "0%";
    this.progressHandle.style.left = "0%";
    this.currentTimeEl.textContent = "0:00";
    this.durationEl.textContent = "0:00";

    // Load audio source
    if (song.src) {
      console.log("Loading audio source:", song.src.substring(0, 50) + "...");
      this.audio.src = song.src;
      this.audio.load();

      // Wait for audio to be ready before playing
      const playWhenReady = () => {
        this.audio.removeEventListener("canplay", playWhenReady);
        if (wasPlaying) {
          this.playSong();
        }
      };

      this.audio.addEventListener("canplay", playWhenReady, { once: true });
    }

    this.updatePlaylistActiveItem();
  }

  prevSong() {
    if (this.playlist.length === 0) return;

    let newIndex;
    if (this.isShuffled) {
      newIndex = Math.floor(Math.random() * this.playlist.length);
    } else {
      newIndex = this.currentSongIndex - 1;
      if (newIndex < 0) newIndex = this.playlist.length - 1;
    }
    this.loadSong(newIndex);
  }

  nextSong() {
    if (this.playlist.length === 0) return;

    if (this.repeatMode === 2) {
      this.audio.currentTime = 0;
      this.playSong();
      return;
    }

    let newIndex;
    if (this.isShuffled) {
      newIndex = Math.floor(Math.random() * this.playlist.length);
    } else {
      newIndex = this.currentSongIndex + 1;
      if (newIndex >= this.playlist.length) {
        if (this.repeatMode === 1) {
          newIndex = 0;
        } else {
          this.pauseSong();
          this.audio.currentTime = 0;
          this.updateProgress();
          return;
        }
      }
    }
    this.loadSong(newIndex);
  }

  handleSongEnd() {
    if (this.repeatMode === 2) {
      this.audio.currentTime = 0;
      this.playSong();
    } else {
      this.nextSong();
    }
  }

  toggleShuffle() {
    this.isShuffled = !this.isShuffled;
    this.shuffleBtn.classList.toggle("active");
    this.showNotification(
      this.isShuffled ? "Shuffle ON" : "Shuffle OFF",
      "info",
    );
  }

  toggleRepeat() {
    this.repeatMode = (this.repeatMode + 1) % 3;
    this.repeatBtn.classList.remove("active");

    let message = "";
    switch (this.repeatMode) {
      case 0:
        this.repeatBtn.querySelector("i").className = "fas fa-redo";
        message = "Repeat OFF";
        break;
      case 1:
        this.repeatBtn.classList.add("active");
        this.repeatBtn.querySelector("i").className = "fas fa-redo";
        message = "Repeat All";
        break;
      case 2:
        this.repeatBtn.classList.add("active");
        this.repeatBtn.querySelector("i").className = "fas fa-redo-alt";
        message = "Repeat One";
        break;
    }
    this.showNotification(message, "info");
  }

  setVolume(value) {
    this.volume = value / 100;
    this.audio.volume = this.volume;
    this.updateVolumeIcon();
  }

  toggleMute() {
    if (this.audio.volume > 0) {
      this.previousVolume = this.audio.volume;
      this.audio.volume = 0;
      this.volumeSlider.value = 0;
      this.volumeIcon.className = "fas fa-volume-mute";
    } else {
      this.audio.volume = this.previousVolume || this.volume;
      this.volumeSlider.value = (this.previousVolume || this.volume) * 100;
      this.updateVolumeIcon();
    }
  }

  updateVolumeIcon() {
    const volume = this.audio.volume;
    if (volume === 0) {
      this.volumeIcon.className = "fas fa-volume-mute";
    } else if (volume < 0.5) {
      this.volumeIcon.className = "fas fa-volume-down";
    } else {
      this.volumeIcon.className = "fas fa-volume-up";
    }
  }

  setProgress(e) {
    const width = this.progressBar.clientWidth;
    const clickX =
      e.offsetX || e.clientX - this.progressBar.getBoundingClientRect().left;
    const duration = this.audio.duration;

    if (duration && !isNaN(duration)) {
      const newTime = (clickX / width) * duration;
      this.audio.currentTime = Math.max(0, Math.min(newTime, duration));
    }
  }

  updateProgress() {
    const { currentTime, duration } = this.audio;

    if (duration && !isNaN(duration) && isFinite(duration)) {
      const progressPercent = (currentTime / duration) * 100;
      this.progress.style.width = `${progressPercent}%`;
      this.progressHandle.style.left = `${progressPercent}%`;
      this.currentTimeEl.textContent = this.formatTime(currentTime);
    }
  }

  updateDuration() {
    const duration = this.audio.duration;
    if (duration && !isNaN(duration) && isFinite(duration)) {
      this.durationEl.textContent = this.formatTime(duration);

      // Update playlist duration
      if (this.currentSongIndex >= 0) {
        this.playlist[this.currentSongIndex].duration =
          this.formatTime(duration);
        this.renderPlaylist();
      }
    }
  }

  formatTime(seconds) {
    if (!seconds || isNaN(seconds) || !isFinite(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  }

  handleFileUpload(event) {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    let addedCount = 0;

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("audio/")) {
        this.showNotification(`${file.name} is not an audio file`, "warning");
        return;
      }

      const url = URL.createObjectURL(file);
      const song = {
        title: file.name.replace(/\.[^/.]+$/, ""),
        artist: "My Music",
        duration: "0:00",
        cover: `https://picsum.photos/400/400?random=${Date.now()}_${Math.random()}`,
        src: url,
        isUploaded: true,
      };

      this.playlist.push(song);
      addedCount++;
    });

    if (addedCount > 0) {
      this.renderPlaylist();
      this.showNotification(`Added ${addedCount} song(s)`, "success");

      // Auto-play first song if nothing is playing
      if (this.currentSongIndex === -1) {
        this.loadSong(this.playlist.length - addedCount);
      }
    }

    // Reset file input
    this.fileInput.value = "";
  }

  removeSong(index) {
    if (index === this.currentSongIndex) {
      this.pauseSong();
      this.audio.src = "";
      this.audio.removeAttribute("src");
      this.currentSongIndex = -1;
    } else if (this.currentSongIndex > index) {
      this.currentSongIndex--;
    }

    // Clean up blob URL if it's an uploaded file
    const song = this.playlist[index];
    if (song.isUploaded && song.src) {
      URL.revokeObjectURL(song.src);
    }

    this.playlist.splice(index, 1);

    if (this.playlist.length > 0) {
      if (this.currentSongIndex === -1) {
        this.loadSong(0);
      }
      this.renderPlaylist();
    } else {
      this.songTitle.textContent = "No Songs";
      this.songArtist.textContent = "Upload music to start";
      this.albumImg.src = "https://picsum.photos/400/400?random=empty";
      this.progress.style.width = "0%";
      this.progressHandle.style.left = "0%";
      this.currentTimeEl.textContent = "0:00";
      this.durationEl.textContent = "0:00";
      this.renderPlaylist();
    }

    this.showNotification("Song removed", "info");
  }

  togglePanel(panel) {
    if (panel === "playlist") {
      const isOpen = this.playlistPanel.classList.contains("show");
      this.playlistPanel.classList.toggle("show");
      this.eqPanel.classList.remove("show");

      if (!isOpen) {
        this.renderPlaylist();
      }
    } else if (panel === "eq") {
      this.eqPanel.classList.toggle("show");
      this.playlistPanel.classList.remove("show");
    }
  }

  renderPlaylist() {
    this.playlistSongs.innerHTML = "";

    if (this.playlist.length === 0) {
      this.playlistSongs.innerHTML = `
                <div class="empty-playlist">
                    <i class="fas fa-music"></i>
                    <p>No songs in playlist<br>Click "Add Music" to start</p>
                </div>
            `;
      return;
    }

    this.playlist.forEach((song, index) => {
      const div = document.createElement("div");
      div.className = `playlist-item ${index === this.currentSongIndex ? "active" : ""}`;
      div.innerHTML = `
                <div class="playlist-item-img">
                    <img src="${song.cover}" alt="${song.title}" onerror="this.src='https://picsum.photos/400/400?random=fallback'">
                </div>
                <div class="playlist-item-info">
                    <div class="playlist-item-title">${song.title}</div>
                    <div class="playlist-item-artist">${song.artist}</div>
                </div>
                ${
                  index === this.currentSongIndex && this.isPlaying
                    ? `
                <div class="playing-indicator">
                    <div class="playing-bar"></div>
                    <div class="playing-bar"></div>
                    <div class="playing-bar"></div>
                    <div class="playing-bar"></div>
                </div>
                `
                    : ""
                }
                <div class="playlist-item-duration">${song.duration || "0:00"}</div>
                <button class="playlist-item-delete" data-index="${index}" title="Remove song">
                    <i class="fas fa-times"></i>
                </button>
            `;

      // Play song on click (except delete button)
      div.addEventListener("click", (e) => {
        if (!e.target.closest(".playlist-item-delete")) {
          if (index === this.currentSongIndex) {
            this.togglePlay();
          } else {
            this.loadSong(index);
            // Auto-play when selecting from playlist
            setTimeout(() => this.playSong(), 100);
          }
        }
      });

      // Delete button
      const deleteBtn = div.querySelector(".playlist-item-delete");
      deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.removeSong(index);
      });

      this.playlistSongs.appendChild(div);
    });
  }

  updatePlaylistActiveItem() {
    const items = this.playlistSongs.querySelectorAll(".playlist-item");
    items.forEach((item, index) => {
      item.classList.toggle("active", index === this.currentSongIndex);
    });
  }

  applyEqPreset(preset) {
    const presets = {
      normal: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      pop: [2, 3, 1, -1, -1, 0, 2, 3, 3, 2],
      rock: [4, 3, -2, -3, -1, 2, 4, 5, 4, 3],
      jazz: [3, 2, -1, -2, 1, 2, 3, 2, 1, 0],
      classical: [4, 2, 0, -2, -1, 1, 2, 3, 2, 1],
      bass: [8, 6, 4, 2, 0, -1, -2, -2, -1, 0],
    };

    const values = presets[preset] || presets.normal;
    const sliders = document.querySelectorAll(".eq-input");

    sliders.forEach((slider, index) => {
      slider.value = values[index] || 0;
    });

    document.querySelectorAll(".preset-btn").forEach((btn) => {
      btn.classList.remove("active");
    });

    const activeBtn = document.querySelector(`[data-preset="${preset}"]`);
    if (activeBtn) activeBtn.classList.add("active");

    this.showNotification(
      `EQ: ${preset.charAt(0).toUpperCase() + preset.slice(1)}`,
      "info",
    );
  }

  applyEqChanges() {
    // Visual EQ only - actual audio processing requires Web Audio API with filters
    console.log("EQ bands updated");
  }

  toggleFavorite() {
    this.favoriteBtn.classList.toggle("active");
    if (this.favoriteBtn.classList.contains("active")) {
      this.showNotification("Added to favorites ❤️", "success");
    }
  }

  showNotification(message, type = "info") {
    // Remove existing notification
    const existing = document.querySelector(".notification");
    if (existing) {
      existing.remove();
    }

    const icons = {
      success: "fa-check-circle",
      error: "fa-exclamation-circle",
      warning: "fa-exclamation-triangle",
      info: "fa-info-circle",
    };

    const colors = {
      success: "#2ed573",
      error: "#ff4757",
      warning: "#ffa502",
      info: "#70a1ff",
    };

    const notification = document.createElement("div");
    notification.className = "notification";
    notification.innerHTML = `
            <i class="fas ${icons[type] || icons.info}" style="color: ${colors[type] || colors.info}"></i>
            ${message}
        `;
    document.body.appendChild(notification);

    setTimeout(() => notification.classList.add("show"), 100);
    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  handleKeyboard(e) {
    // Don't trigger if user is typing in an input
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

    switch (e.code) {
      case "Space":
        e.preventDefault();
        this.togglePlay();
        break;
      case "ArrowLeft":
        e.preventDefault();
        if (e.ctrlKey || e.metaKey) {
          // Skip backward 10 seconds
          this.audio.currentTime = Math.max(0, this.audio.currentTime - 10);
        } else {
          this.prevSong();
        }
        break;
      case "ArrowRight":
        e.preventDefault();
        if (e.ctrlKey || e.metaKey) {
          // Skip forward 10 seconds
          this.audio.currentTime = Math.min(
            this.audio.duration,
            this.audio.currentTime + 10,
          );
        } else {
          this.nextSong();
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        this.volume = Math.min(1, this.volume + 0.1);
        this.audio.volume = this.volume;
        this.volumeSlider.value = this.volume * 100;
        this.updateVolumeIcon();
        break;
      case "ArrowDown":
        e.preventDefault();
        this.volume = Math.max(0, this.volume - 0.1);
        this.audio.volume = this.volume;
        this.volumeSlider.value = this.volume * 100;
        this.updateVolumeIcon();
        break;
      case "KeyM":
        e.preventDefault();
        this.toggleMute();
        break;
      case "KeyL":
        e.preventDefault();
        this.togglePanel("playlist");
        break;
    }
  }
}

// Initialize the music player when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  // Add pulse animation keyframes
  const style = document.createElement("style");
  style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.02); }
            100% { transform: scale(1); }
        }
        
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.85);
            color: white;
            padding: 12px 20px;
            border-radius: 12px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            transform: translateX(150%);
            transition: transform 0.3s ease;
            z-index: 1000;
            font-size: 14px;
            display: flex;
            align-items: center;
            gap: 8px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }
        
        .notification.show {
            transform: translateX(0);
        }
    `;
  document.head.appendChild(style);

  const player = new MusicPlayer();
  console.log("🎵 WaveSync Music Player Ready!");
  console.log("📁 Click upload button (↑) to add your music files");
  console.log("🎹 Pre-loaded with demo tones for testing");
  console.log("⌨️  Keyboard shortcuts: Space, ←/→, ↑/↓, M, L");
});
