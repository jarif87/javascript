class WhiteboardApp {
  constructor() {
    this.mainCanvas = document.getElementById("mainCanvas");
    this.mainCtx = this.mainCanvas.getContext("2d");
    this.tempCanvas = document.getElementById("tempCanvas");
    this.tempCtx = this.tempCanvas.getContext("2d");
    this.selectionCanvas = document.getElementById("selectionCanvas");
    this.selectionCtx = this.selectionCanvas.getContext("2d");
    this.container = document.getElementById("canvasContainer");
    this.textInput = document.getElementById("textInput");
    this.minimapCanvas = document.getElementById("minimapCanvas");
    this.minimapCtx = this.minimapCanvas.getContext("2d");

    this.layers = [];
    this.currentLayerIndex = 0;
    this.currentTool = "pen";
    this.isDrawing = false;
    this.startX = 0;
    this.startY = 0;
    this.brushColor = "#000000";
    this.secondaryColor = "#ffffff";
    this.brushSize = 3;
    this.opacity = 100;
    this.hardness = 100;
    this.spacing = 1;
    this.angle = 0;
    this.fillStyle = "stroke";
    this.lineStyle = "solid";
    this.cornerRadius = 0;
    this.zoomLevel = 1;
    this.panOffset = { x: 0, y: 0 };
    this.isPanning = false;
    this.sprayInterval = null;
    this.sprayDensity = 20;
    this.cloneSource = null;
    this.gradientPoints = [];
    this.stampPattern = null;

    this.init();
  }

  init() {
    this.setupCanvas();
    this.setupLayers();
    this.setupEventListeners();
    this.setupKeyboardShortcuts();
    this.setupExportDropdown();
    this.setupFloatingPanels();
    this.addLayer("Background");
    this.updateAllUI();
    this.startMinimapUpdate();
    this.startPerformanceMonitor();
  }

  setupCanvas() {
    const resize = () => {
      const rect = this.container.getBoundingClientRect();

      [this.mainCanvas, this.tempCanvas, this.selectionCanvas].forEach(
        (canvas) => {
          canvas.width = rect.width * 2;
          canvas.height = rect.height * 2;
          canvas.style.width = rect.width + "px";
          canvas.style.height = rect.height + "px";
        },
      );

      this.layers.forEach((layer) => {
        const oldCanvas = document.createElement("canvas");
        oldCanvas.width = layer.canvas.width;
        oldCanvas.height = layer.canvas.height;
        const oldCtx = oldCanvas.getContext("2d");
        oldCtx.drawImage(layer.canvas, 0, 0);

        layer.canvas.width = rect.width * 2;
        layer.canvas.height = rect.height * 2;
        layer.ctx.drawImage(oldCanvas, 0, 0);
      });

      document.getElementById("canvasSize").textContent =
        `${Math.round(rect.width)} × ${Math.round(rect.height)}`;

      this.renderLayers();
      this.updateMinimap();
    };

    window.addEventListener("resize", resize);
    resize();
  }

  setupLayers() {
    this.layers = [];
    document.getElementById("layersList").innerHTML = "";
  }

  addLayer(name) {
    const layer = {
      name: name || `Layer ${this.layers.length + 1}`,
      visible: true,
      opacity: 100,
      canvas: document.createElement("canvas"),
      ctx: null,
      history: [],
      historyIndex: -1,
      maxHistory: 50,
      blendMode: "normal",
      locked: false,
    };

    layer.canvas.width = this.mainCanvas.width;
    layer.canvas.height = this.mainCanvas.height;
    layer.ctx = layer.canvas.getContext("2d");
    layer.saveState = function () {
      this.historyIndex++;
      this.history = this.history.slice(0, this.historyIndex);
      this.history.push(this.canvas.toDataURL());
      if (this.history.length > this.maxHistory) {
        this.history.shift();
        this.historyIndex--;
      }
    };

    layer.undo = function () {
      if (this.historyIndex > 0) {
        this.historyIndex--;
        this.loadState(this.history[this.historyIndex]);
        return true;
      }
      return false;
    };

    layer.redo = function () {
      if (this.historyIndex < this.history.length - 1) {
        this.historyIndex++;
        this.loadState(this.history[this.historyIndex]);
        return true;
      }
      return false;
    };

    layer.loadState = function (dataUrl) {
      const img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(img, 0, 0);
        app.renderLayers();
      };
    };

    this.layers.push(layer);
    this.currentLayerIndex = this.layers.length - 1;
    layer.saveState();

    this.renderLayersList();
    this.renderLayers();
    this.updateLayerInfo();
  }

  getCurrentLayer() {
    return this.layers[this.currentLayerIndex];
  }

  setupEventListeners() {
    this.mainCanvas.addEventListener("mousedown", (e) =>
      this.handleMouseDown(e),
    );
    this.mainCanvas.addEventListener("mousemove", (e) =>
      this.handleMouseMove(e),
    );
    this.mainCanvas.addEventListener("mouseup", (e) => this.handleMouseUp(e));
    this.mainCanvas.addEventListener("mouseleave", (e) =>
      this.handleMouseUp(e),
    );
    this.mainCanvas.addEventListener("wheel", (e) => this.handleWheel(e));
    this.mainCanvas.addEventListener("dblclick", (e) =>
      this.handleDoubleClick(e),
    );

    this.mainCanvas.addEventListener("touchstart", (e) =>
      this.handleTouchStart(e),
    );
    this.mainCanvas.addEventListener("touchmove", (e) =>
      this.handleTouchMove(e),
    );
    this.mainCanvas.addEventListener("touchend", (e) => this.handleMouseUp(e));

    document.querySelectorAll(".tool-btn[data-tool]").forEach((btn) => {
      btn.addEventListener("click", () => this.setTool(btn.dataset.tool));
    });

    document.getElementById("colorPicker").addEventListener("change", (e) => {
      this.brushColor = e.target.value;
    });

    document.getElementById("brushSize").addEventListener("input", (e) => {
      this.brushSize = parseInt(e.target.value);
      document.getElementById("sizeValue").textContent = this.brushSize + "px";
    });

    document.getElementById("opacity").addEventListener("input", (e) => {
      this.opacity = parseInt(e.target.value);
      document.getElementById("opacityValue").textContent = this.opacity + "%";
    });

    document.getElementById("hardness").addEventListener("input", (e) => {
      this.hardness = parseInt(e.target.value);
      document.getElementById("hardnessValue").textContent =
        this.hardness + "%";
    });

    document.getElementById("spacing").addEventListener("input", (e) => {
      this.spacing = parseInt(e.target.value);
      document.getElementById("spacingValue").textContent = this.spacing;
    });

    document.getElementById("angle").addEventListener("input", (e) => {
      this.angle = parseInt(e.target.value);
      document.getElementById("angleValue").textContent = this.angle + "°";
    });

    document.getElementById("fillStyle").addEventListener("change", (e) => {
      this.fillStyle = e.target.value;
    });

    document.getElementById("lineStyle").addEventListener("change", (e) => {
      this.lineStyle = e.target.value;
    });

    document.querySelectorAll(".color-preset").forEach((btn) => {
      btn.addEventListener("click", () => {
        this.brushColor = btn.dataset.color;
        document.getElementById("colorPicker").value = this.brushColor;
      });
    });

    document.getElementById("randomColorBtn").addEventListener("click", () => {
      this.brushColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
      document.getElementById("colorPicker").value = this.brushColor;
    });

    document
      .getElementById("addLayerBtn")
      .addEventListener("click", () => this.addLayer());
    document
      .getElementById("duplicateLayerBtn")
      .addEventListener("click", () => this.duplicateLayer());
    document
      .getElementById("deleteLayerBtn")
      .addEventListener("click", () =>
        this.deleteLayer(this.currentLayerIndex),
      );
    document
      .getElementById("mergeDownBtn")
      .addEventListener("click", () => this.mergeDown());
    document
      .getElementById("moveLayerUpBtn")
      .addEventListener("click", () => this.moveLayer(-1));
    document
      .getElementById("moveLayerDownBtn")
      .addEventListener("click", () => this.moveLayer(1));

    document
      .getElementById("zoomInBtn")
      .addEventListener("click", () => this.zoomIn());
    document
      .getElementById("zoomOutBtn")
      .addEventListener("click", () => this.zoomOut());
    document
      .getElementById("fitToScreenBtn")
      .addEventListener("click", () => this.fitToScreen());

    document
      .getElementById("exportBtn")
      .addEventListener("click", () => this.toggleExportDropdown());
    document.querySelectorAll(".dropdown-item").forEach((item) => {
      item.addEventListener("click", () =>
        this.exportCanvas(item.dataset.format),
      );
    });

    document
      .getElementById("newFileBtn")
      .addEventListener("click", () => this.newFile());
    document
      .getElementById("openFileBtn")
      .addEventListener("click", () => this.openFile());
    document
      .getElementById("saveProjectBtn")
      .addEventListener("click", () => this.saveProject());

    document.getElementById("closeLayersBtn").addEventListener("click", () => {
      document.getElementById("layersPanel").style.display = "none";
    });
    document.getElementById("closeFiltersBtn").addEventListener("click", () => {
      document.getElementById("filtersPanel").style.display = "none";
    });

    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.addEventListener("click", () => this.applyFilter(btn.dataset.filter));
    });
  }

  setupKeyboardShortcuts() {
    document.addEventListener("keydown", (e) => {
      if (e.target === this.textInput) return;

      const shortcuts = {
        p: "pen",
        e: "eraser",
        l: "line",
        r: "rectangle",
        c: "circle",
        t: "text",
        g: "gradient",
        b: "brush",
        v: "pen",
        m: "rectangle",
        s: "spray",
        i: "eyedropper",
        f: "fill",
        o: "clone",
      };

      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case "z":
            e.preventDefault();
            this.undo();
            break;
          case "y":
            e.preventDefault();
            this.redo();
            break;
          case "s":
            e.preventDefault();
            this.saveProject();
            break;
          case "n":
            e.preventDefault();
            this.newFile();
            break;
          case "o":
            e.preventDefault();
            this.openFile();
            break;
          case "j":
            e.preventDefault();
            this.duplicateLayer();
            break;
          case "e":
            e.preventDefault();
            this.mergeDown();
            break;
        }
      } else {
        if (shortcuts[e.key.toLowerCase()]) {
          this.setTool(shortcuts[e.key.toLowerCase()]);
        }
        switch (e.key) {
          case "[":
            this.changeBrushSize(-1);
            break;
          case "]":
            this.changeBrushSize(1);
            break;
          case "Delete":
            this.deleteLayer(this.currentLayerIndex);
            break;
        }
      }
    });
  }

  setupExportDropdown() {
    document.addEventListener("click", (e) => {
      if (
        !e.target.closest("#exportBtn") &&
        !e.target.closest(".export-dropdown")
      ) {
        document.getElementById("exportDropdown").classList.remove("show");
      }
    });
  }

  setupFloatingPanels() {
    document.querySelectorAll(".floating-panel").forEach((panel) => {
      const header = panel.querySelector(".panel-header");
      let isDragging = false;
      let startX, startY;

      header.addEventListener("mousedown", (e) => {
        isDragging = true;
        startX = e.clientX - panel.offsetLeft;
        startY = e.clientY - panel.offsetTop;
      });

      document.addEventListener("mousemove", (e) => {
        if (isDragging) {
          panel.style.left = e.clientX - startX + "px";
          panel.style.top = e.clientY - startY + "px";
          panel.style.right = "auto";
        }
      });

      document.addEventListener("mouseup", () => {
        isDragging = false;
      });
    });
  }

  setTool(tool) {
    this.currentTool = tool;
    document.querySelectorAll(".tool-btn[data-tool]").forEach((btn) => {
      btn.classList.remove("active");
      if (btn.dataset.tool === tool) btn.classList.add("active");
    });
    document.getElementById("toolStatus").textContent =
      `Tool: ${tool.charAt(0).toUpperCase() + tool.slice(1)}`;
    this.updateCursor();
  }

  updateCursor() {
    const cursors = {
      pen: "crosshair",
      pencil: "crosshair",
      brush: "crosshair",
      spray: "crosshair",
      eraser: "cell",
      line: "crosshair",
      rectangle: "crosshair",
      circle: "crosshair",
      triangle: "crosshair",
      star: "crosshair",
      text: "text",
      eyedropper: "crosshair",
      fill: "crosshair",
      gradient: "crosshair",
      stamp: "crosshair",
      blur: "crosshair",
      clone: "crosshair",
    };
    this.mainCanvas.style.cursor = cursors[this.currentTool] || "crosshair";
  }

  getPosition(e) {
    const rect = this.mainCanvas.getBoundingClientRect();
    const scaleX = this.mainCanvas.width / rect.width;
    const scaleY = this.mainCanvas.height / rect.height;

    let clientX, clientY;
    if (e.touches) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  }

  handleMouseDown(e) {
    if (e.button === 1) {
      this.isPanning = true;
      return;
    }
    if (e.button !== 0) return;

    const pos = this.getPosition(e);
    this.isDrawing = true;
    this.startX = pos.x;
    this.startY = pos.y;

    const layer = this.getCurrentLayer();

    if (this.currentTool === "eyedropper") {
      this.pickColor(pos);
      this.isDrawing = false;
      return;
    }

    if (this.currentTool === "fill") {
      this.floodFill(pos);
      this.isDrawing = false;
      return;
    }

    if (this.currentTool === "spray") {
      this.startSpray(pos);
      return;
    }

    if (this.currentTool === "clone") {
      if (!this.cloneSource) {
        this.cloneSource = { x: pos.x, y: pos.y };
        this.showToast("Clone source set. Click to stamp.");
        this.isDrawing = false;
        return;
      }
    }

    if (
      ["pen", "pencil", "brush", "eraser", "blur"].includes(this.currentTool)
    ) {
      layer.ctx.save();
      layer.ctx.beginPath();
      layer.ctx.moveTo(pos.x, pos.y);
      this.setBrushProperties(layer.ctx);
    } else if (this.currentTool === "gradient") {
      this.gradientPoints = [pos];
    } else if (this.currentTool === "stamp") {
      this.stampAt(pos);
      layer.saveState();
      this.isDrawing = false;
    } else {
      layer.saveState();
      this.snapshot = layer.ctx.getImageData(
        0,
        0,
        layer.canvas.width,
        layer.canvas.height,
      );
    }
  }

  handleMouseMove(e) {
    const pos = this.getPosition(e);

    document.getElementById("cursorPos").textContent =
      `X: ${Math.round(pos.x)}, Y: ${Math.round(pos.y)}`;

    if (this.isPanning) {
      this.panOffset.x += e.movementX;
      this.panOffset.y += e.movementY;
      return;
    }

    if (!this.isDrawing) return;

    const layer = this.getCurrentLayer();

    if (
      ["pen", "pencil", "brush", "eraser", "blur"].includes(this.currentTool)
    ) {
      layer.ctx.lineTo(pos.x, pos.y);
      layer.ctx.stroke();
    } else if (this.currentTool === "spray") {
    } else if (this.currentTool === "gradient") {
      this.gradientPoints[1] = pos;
      this.drawGradientPreview();
    } else if (this.currentTool === "clone") {
      this.cloneStamp(pos);
    } else {
      this.tempCtx.clearRect(
        0,
        0,
        this.tempCanvas.width,
        this.tempCanvas.height,
      );
      this.drawShape(this.tempCtx, this.startX, this.startY, pos.x, pos.y);
    }

    this.renderLayers();
  }

  handleMouseUp(e) {
    if (this.isPanning) {
      this.isPanning = false;
      return;
    }
    if (!this.isDrawing) return;

    const pos = this.getPosition(e);
    const layer = this.getCurrentLayer();

    if (this.currentTool === "spray") {
      this.stopSpray();
    } else if (this.currentTool === "gradient") {
      this.gradientPoints[1] = pos;
      this.applyGradient();
      this.gradientPoints = [];
    } else if (
      ["pen", "pencil", "brush", "eraser", "blur"].includes(this.currentTool)
    ) {
      layer.ctx.closePath();
      layer.ctx.restore();
    } else if (
      ["line", "rectangle", "circle", "triangle", "star"].includes(
        this.currentTool,
      )
    ) {
      if (this.snapshot) {
        layer.ctx.putImageData(this.snapshot, 0, 0);
      }
      this.drawShape(layer.ctx, this.startX, this.startY, pos.x, pos.y);
      this.tempCtx.clearRect(
        0,
        0,
        this.tempCanvas.width,
        this.tempCanvas.height,
      );
    } else if (this.currentTool === "text") {
      this.startTextInput(pos);
    }

    if (this.currentTool !== "text") {
      layer.saveState();
    }

    this.isDrawing = false;
    this.snapshot = null;

    this.renderLayers();
    this.updateAllUI();
  }

  handleWheel(e) {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    this.zoomLevel *= delta;
    this.zoomLevel = Math.min(Math.max(this.zoomLevel, 0.1), 5);
    document.getElementById("zoomLevel").textContent =
      Math.round(this.zoomLevel * 100) + "%";
    this.renderLayers();
  }

  handleDoubleClick(e) {
    const pos = this.getPosition(e);
    this.fitToScreen();
  }

  handleTouchStart(e) {
    e.preventDefault();
    if (e.touches.length === 2) {
      this.isPanning = true;
    } else {
      this.handleMouseDown(e);
    }
  }

  handleTouchMove(e) {
    e.preventDefault();
    if (this.isPanning && e.touches.length === 2) {
    } else {
      this.handleMouseMove(e);
    }
  }

  setBrushProperties(ctx) {
    if (this.currentTool === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth = this.brushSize * 4;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.globalAlpha = 1;
      return;
    }

    ctx.globalCompositeOperation = "source-over";
    ctx.strokeStyle = this.brushColor;
    ctx.lineWidth = this.brushSize * 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.globalAlpha = this.opacity / 100;

    if (this.currentTool === "pencil") {
      ctx.globalAlpha = Math.max(0.3, this.opacity / 100);
    }

    if (this.lineStyle === "dashed") {
      ctx.setLineDash([10, 10]);
    } else if (this.lineStyle === "dotted") {
      ctx.setLineDash([2, 4]);
    } else {
      ctx.setLineDash([]);
    }
  }

  drawShape(ctx, x1, y1, x2, y2) {
    this.setBrushProperties(ctx);

    if (this.fillStyle === "fill" || this.fillStyle === "both") {
      ctx.fillStyle = this.brushColor;
    }

    ctx.beginPath();

    switch (this.currentTool) {
      case "line":
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        break;

      case "rectangle":
        if (this.cornerRadius > 0) {
          this.roundRect(ctx, x1, y1, x2 - x1, y2 - y1, this.cornerRadius * 2);
        } else {
          ctx.rect(x1, y1, x2 - x1, y2 - y1);
        }
        break;

      case "circle":
        const radius = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        ctx.arc(x1, y1, radius, 0, Math.PI * 2);
        break;

      case "triangle":
        const midX = (x1 + x2) / 2;
        ctx.moveTo(midX, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x1, y2);
        ctx.closePath();
        break;

      case "star":
        this.drawStar(ctx, x1, y1, 5, Math.abs(x2 - x1), Math.abs(y2 - y1) / 2);
        break;
    }

    if (this.fillStyle === "fill" || this.fillStyle === "both") {
      ctx.fill();
    }
    if (this.fillStyle === "stroke" || this.fillStyle === "both") {
      ctx.stroke();
    }
  }

  roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
    let rot = (Math.PI / 2) * 3;
    let x = cx;
    let y = cy;
    const step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);

    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }

    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
  }

  startSpray(pos) {
    const layer = this.getCurrentLayer();
    this.sprayInterval = setInterval(() => {
      for (let i = 0; i < this.sprayDensity; i++) {
        const offsetX = (Math.random() - 0.5) * this.brushSize * 4;
        const offsetY = (Math.random() - 0.5) * this.brushSize * 4;
        const distance = Math.sqrt(offsetX * offsetX + offsetY * offsetY);

        if (distance < this.brushSize * 2) {
          layer.ctx.fillStyle = this.brushColor;
          layer.ctx.globalAlpha = (this.opacity / 100) * Math.random();
          layer.ctx.fillRect(pos.x + offsetX, pos.y + offsetY, 1, 1);
        }
      }
      this.renderLayers();
    }, 50);
  }

  stopSpray() {
    if (this.sprayInterval) {
      clearInterval(this.sprayInterval);
      this.sprayInterval = null;
      this.getCurrentLayer().saveState();
    }
  }

  pickColor(pos) {
    const layer = this.getCurrentLayer();
    const pixel = layer.ctx.getImageData(pos.x, pos.y, 1, 1).data;
    this.brushColor = `#${pixel[0].toString(16).padStart(2, "0")}${pixel[1].toString(16).padStart(2, "0")}${pixel[2].toString(16).padStart(2, "0")}`;
    document.getElementById("colorPicker").value = this.brushColor;
    this.showToast(`Color picked: ${this.brushColor}`);
  }

  floodFill(pos) {
    const layer = this.getCurrentLayer();
    const imageData = layer.ctx.getImageData(
      0,
      0,
      layer.canvas.width,
      layer.canvas.height,
    );
    const targetColor = this.getPixelColor(imageData, pos.x, pos.y);
    const fillColor = this.hexToRgb(this.brushColor);

    if (this.colorsMatch(targetColor, fillColor)) return;

    const stack = [[Math.round(pos.x), Math.round(pos.y)]];
    const visited = new Set();

    while (stack.length > 0) {
      const [x, y] = stack.pop();
      const key = `${x},${y}`;

      if (visited.has(key)) continue;
      if (x < 0 || x >= layer.canvas.width || y < 0 || y >= layer.canvas.height)
        continue;

      const currentColor = this.getPixelColor(imageData, x, y);
      if (!this.colorsMatch(currentColor, targetColor)) continue;

      visited.add(key);
      this.setPixelColor(imageData, x, y, fillColor);

      stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
    }

    layer.ctx.putImageData(imageData, 0, 0);
    layer.saveState();
    this.renderLayers();
  }

  getPixelColor(imageData, x, y) {
    const index = (y * imageData.width + x) * 4;
    return {
      r: imageData.data[index],
      g: imageData.data[index + 1],
      b: imageData.data[index + 2],
      a: imageData.data[index + 3],
    };
  }

  setPixelColor(imageData, x, y, color) {
    const index = (y * imageData.width + x) * 4;
    imageData.data[index] = color.r;
    imageData.data[index + 1] = color.g;
    imageData.data[index + 2] = color.b;
    imageData.data[index + 3] = 255;
  }

  colorsMatch(c1, c2) {
    return c1.r === c2.r && c1.g === c2.g && c1.b === c2.b && c1.a === c2.a;
  }

  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

  stampAt(pos) {
    const layer = this.getCurrentLayer();
    const stampSize = this.brushSize * 4;
    layer.ctx.save();
    layer.ctx.translate(pos.x, pos.y);
    layer.ctx.fillStyle = this.brushColor;
    layer.ctx.globalAlpha = this.opacity / 100;
    this.drawStar(layer.ctx, 0, 0, 5, stampSize, stampSize / 2);
    layer.ctx.fill();
    layer.ctx.restore();
  }

  cloneStamp(pos) {
    if (!this.cloneSource) return;
    const layer = this.getCurrentLayer();
    const dx = pos.x - this.cloneSource.x;
    const dy = pos.y - this.cloneSource.y;

    layer.ctx.drawImage(
      layer.canvas,
      this.cloneSource.x - 50,
      this.cloneSource.y - 50,
      100,
      100,
      pos.x - 50 + dx,
      pos.y - 50 + dy,
      100,
      100,
    );
    this.cloneSource = pos;
  }

  drawGradientPreview() {
    if (this.gradientPoints.length < 2) return;
    const [p1, p2] = this.gradientPoints;
    this.tempCtx.clearRect(0, 0, this.tempCanvas.width, this.tempCanvas.height);

    const gradient = this.tempCtx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
    gradient.addColorStop(0, this.brushColor);
    gradient.addColorStop(1, this.secondaryColor);

    this.tempCtx.fillStyle = gradient;
    this.tempCtx.fillRect(0, 0, this.tempCanvas.width, this.tempCanvas.height);
  }

  applyGradient() {
    if (this.gradientPoints.length < 2) return;
    const [p1, p2] = this.gradientPoints;
    const layer = this.getCurrentLayer();

    const gradient = layer.ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
    gradient.addColorStop(0, this.brushColor);
    gradient.addColorStop(1, this.secondaryColor);

    layer.ctx.fillStyle = gradient;
    layer.ctx.fillRect(0, 0, layer.canvas.width, layer.canvas.height);

    this.tempCtx.clearRect(0, 0, this.tempCanvas.width, this.tempCanvas.height);
    layer.saveState();
  }

  startTextInput(pos) {
    const rect = this.mainCanvas.getBoundingClientRect();
    const scaleX = rect.width / this.mainCanvas.width;
    const scaleY = rect.height / this.mainCanvas.height;

    this.textInput.style.display = "block";
    this.textInput.style.left = pos.x * scaleX + "px";
    this.textInput.style.top = pos.y * scaleY + "px";
    this.textInput.style.fontSize = this.brushSize * 3 + "px";
    this.textInput.style.color = this.brushColor;
    this.textInput.focus();
  }

  finishText() {
    if (this.textInput.style.display === "none") return;

    const text = this.textInput.innerText;
    const rect = this.mainCanvas.getBoundingClientRect();
    const scaleX = this.mainCanvas.width / rect.width;
    const scaleY = this.mainCanvas.height / rect.height;

    if (text.trim()) {
      const layer = this.getCurrentLayer();
      const left = parseFloat(this.textInput.style.left);
      const top = parseFloat(this.textInput.style.top);

      layer.ctx.font = `${this.brushSize * 3 * scaleX}px 'Segoe UI', sans-serif`;
      layer.ctx.fillStyle = this.brushColor;
      layer.ctx.globalAlpha = this.opacity / 100;

      const lines = text.split("\n");
      lines.forEach((line, i) => {
        layer.ctx.fillText(
          line,
          left * scaleX,
          top * scaleY + (i + 1) * this.brushSize * 3 * scaleX,
        );
      });

      layer.saveState();
    }

    this.textInput.style.display = "none";
    this.textInput.innerText = "";
    this.renderLayers();
  }

  renderLayers() {
    this.mainCtx.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);

    this.layers.forEach((layer) => {
      if (layer.visible) {
        this.mainCtx.globalAlpha = layer.opacity / 100;
        this.mainCtx.drawImage(layer.canvas, 0, 0);
      }
    });

    this.mainCtx.globalAlpha = 1;
    this.mainCtx.drawImage(this.tempCanvas, 0, 0);

    this.updateMinimap();
  }

  renderLayersList() {
    const list = document.getElementById("layersList");
    list.innerHTML = "";

    this.layers.forEach((layer, index) => {
      const div = document.createElement("div");
      div.className =
        "layer-item" + (index === this.currentLayerIndex ? " active" : "");
      div.innerHTML = `
                <span class="layer-visibility" data-index="${index}">
                    <i class="fas fa-${layer.visible ? "eye" : "eye-slash"}"></i>
                </span>
                <span class="layer-name">${layer.name}</span>
                <input type="number" class="layer-opacity" value="${layer.opacity}" min="0" max="100" data-index="${index}">
            `;

      div.addEventListener("click", (e) => {
        if (e.target.closest(".layer-visibility")) {
          layer.visible = !layer.visible;
          this.renderLayersList();
          this.renderLayers();
        } else if (e.target.classList.contains("layer-opacity")) {
          e.stopPropagation();
        } else {
          this.currentLayerIndex = index;
          this.renderLayersList();
          this.updateLayerInfo();
        }
      });

      div.querySelector(".layer-opacity").addEventListener("change", (e) => {
        layer.opacity = parseInt(e.target.value);
        this.renderLayers();
      });

      list.appendChild(div);
    });
  }

  duplicateLayer() {
    const source = this.getCurrentLayer();
    const newLayer = {
      ...JSON.parse(JSON.stringify(source)),
      name: source.name + " copy",
      canvas: document.createElement("canvas"),
      ctx: null,
      history: [],
      historyIndex: -1,
    };

    newLayer.canvas.width = source.canvas.width;
    newLayer.canvas.height = source.canvas.height;
    newLayer.ctx = newLayer.canvas.getContext("2d");
    newLayer.ctx.drawImage(source.canvas, 0, 0);

    this.layers.splice(this.currentLayerIndex + 1, 0, newLayer);
    this.currentLayerIndex++;
    this.renderLayersList();
  }

  mergeDown() {
    if (this.currentLayerIndex === 0) return;

    const topLayer = this.layers[this.currentLayerIndex];
    const bottomLayer = this.layers[this.currentLayerIndex - 1];

    bottomLayer.ctx.drawImage(topLayer.canvas, 0, 0);
    this.layers.splice(this.currentLayerIndex, 1);
    this.currentLayerIndex--;

    this.renderLayersList();
    this.renderLayers();
  }

  deleteLayer(index) {
    if (this.layers.length <= 1) {
      this.showToast("Cannot delete the last layer");
      return;
    }

    this.layers.splice(index, 1);
    if (this.currentLayerIndex >= this.layers.length) {
      this.currentLayerIndex = this.layers.length - 1;
    }

    this.renderLayersList();
    this.renderLayers();
    this.updateLayerInfo();
  }

  moveLayer(direction) {
    const newIndex = this.currentLayerIndex + direction;
    if (newIndex < 0 || newIndex >= this.layers.length) return;

    [this.layers[this.currentLayerIndex], this.layers[newIndex]] = [
      this.layers[newIndex],
      this.layers[this.currentLayerIndex],
    ];

    this.currentLayerIndex = newIndex;
    this.renderLayersList();
    this.renderLayers();
  }

  undo() {
    const layer = this.getCurrentLayer();
    if (layer.undo()) {
      this.renderLayers();
      this.updateAllUI();
      this.showToast("Undo");
    }
  }

  redo() {
    const layer = this.getCurrentLayer();
    if (layer.redo()) {
      this.renderLayers();
      this.updateAllUI();
      this.showToast("Redo");
    }
  }

  zoomIn() {
    this.zoomLevel = Math.min(5, this.zoomLevel * 1.2);
    document.getElementById("zoomLevel").textContent =
      Math.round(this.zoomLevel * 100) + "%";
    this.renderLayers();
  }

  zoomOut() {
    this.zoomLevel = Math.max(0.1, this.zoomLevel / 1.2);
    document.getElementById("zoomLevel").textContent =
      Math.round(this.zoomLevel * 100) + "%";
    this.renderLayers();
  }

  fitToScreen() {
    this.zoomLevel = 1;
    this.panOffset = { x: 0, y: 0 };
    document.getElementById("zoomLevel").textContent = "100%";
    this.renderLayers();
  }

  toggleExportDropdown() {
    document.getElementById("exportDropdown").classList.toggle("show");
  }

  exportCanvas(format) {
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = this.mainCanvas.width;
    tempCanvas.height = this.mainCanvas.height;
    const tempCtx = tempCanvas.getContext("2d");

    tempCtx.fillStyle = "#ffffff";
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

    this.layers.forEach((layer) => {
      if (layer.visible) {
        tempCtx.drawImage(layer.canvas, 0, 0);
      }
    });

    const link = document.createElement("a");

    switch (format) {
      case "png":
        link.download = `drawing-${Date.now()}.png`;
        link.href = tempCanvas.toDataURL("image/png");
        break;
      case "jpg":
        link.download = `drawing-${Date.now()}.jpg`;
        link.href = tempCanvas.toDataURL("image/jpeg", 0.95);
        break;
      case "svg":
        this.exportSVG();
        return;
      case "pdf":
        this.exportPDF(tempCanvas);
        return;
    }

    link.click();
    document.getElementById("exportDropdown").classList.remove("show");
    this.showToast(`Exported as ${format.toUpperCase()}`);
  }

  exportSVG() {
    const svgContent = `
            <svg xmlns="http://www.w3.org/2000/svg" width="${this.mainCanvas.width}" height="${this.mainCanvas.height}">
                <image href="${this.mainCanvas.toDataURL()}" width="100%" height="100%"/>
            </svg>
        `;

    const blob = new Blob([svgContent], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `drawing-${Date.now()}.svg`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  }

  exportPDF(canvas) {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({
      orientation: canvas.width > canvas.height ? "landscape" : "portrait",
      unit: "px",
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(
      canvas.toDataURL("image/jpeg", 1.0),
      "JPEG",
      0,
      0,
      canvas.width,
      canvas.height,
    );
    pdf.save(`drawing-${Date.now()}.pdf`);
  }

  newFile() {
    if (confirm("Start a new file? All unsaved changes will be lost.")) {
      this.layers = [];
      this.setupLayers();
      this.addLayer("Background");
      this.showToast("New file created");
    }
  }

  openFile() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const layer = this.getCurrentLayer();
          layer.ctx.drawImage(
            img,
            0,
            0,
            this.mainCanvas.width,
            this.mainCanvas.height,
          );
          layer.saveState();
          this.renderLayers();
          this.showToast("Image loaded");
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    };
    input.click();
  }

  saveProject() {
    const projectData = {
      layers: this.layers.map((layer) => ({
        name: layer.name,
        visible: layer.visible,
        opacity: layer.opacity,
        data: layer.canvas.toDataURL(),
      })),
      version: "1.0",
    };

    const blob = new Blob([JSON.stringify(projectData)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `project-${Date.now()}.canvas`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
    this.showToast("Project saved");
  }

  applyFilter(filter) {
    const layer = this.getCurrentLayer();
    const imageData = layer.ctx.getImageData(
      0,
      0,
      layer.canvas.width,
      layer.canvas.height,
    );
    const data = imageData.data;

    switch (filter) {
      case "grayscale":
        for (let i = 0; i < data.length; i += 4) {
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          data[i] = data[i + 1] = data[i + 2] = avg;
        }
        break;

      case "sepia":
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          data[i] = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189);
          data[i + 1] = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168);
          data[i + 2] = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131);
        }
        break;

      case "invert":
        for (let i = 0; i < data.length; i += 4) {
          data[i] = 255 - data[i];
          data[i + 1] = 255 - data[i + 1];
          data[i + 2] = 255 - data[i + 2];
        }
        break;

      case "brightness":
        const brightness = 50;
        for (let i = 0; i < data.length; i += 4) {
          data[i] += brightness;
          data[i + 1] += brightness;
          data[i + 2] += brightness;
        }
        break;

      case "contrast":
        const contrast = 50;
        const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
        for (let i = 0; i < data.length; i += 4) {
          data[i] = factor * (data[i] - 128) + 128;
          data[i + 1] = factor * (data[i + 1] - 128) + 128;
          data[i + 2] = factor * (data[i + 2] - 128) + 128;
        }
        break;
    }

    layer.ctx.putImageData(imageData, 0, 0);
    layer.saveState();
    this.renderLayers();
    this.showToast(`Applied ${filter} filter`);
  }

  updateMinimap() {
    const scale = 0.2;
    this.minimapCanvas.width = 150;
    this.minimapCanvas.height = 100;

    this.minimapCtx.clearRect(
      0,
      0,
      this.minimapCanvas.width,
      this.minimapCanvas.height,
    );
    this.minimapCtx.drawImage(
      this.mainCanvas,
      0,
      0,
      this.minimapCanvas.width,
      this.minimapCanvas.height,
    );
  }

  startMinimapUpdate() {
    setInterval(() => this.updateMinimap(), 1000);
  }

  startPerformanceMonitor() {
    let lastTime = performance.now();
    let frames = 0;

    const updateFPS = () => {
      frames++;
      const currentTime = performance.now();

      if (currentTime - lastTime >= 1000) {
        const fps = Math.round(frames / ((currentTime - lastTime) / 1000));
        document.getElementById("performanceIndicator").innerHTML =
          `<i class="fas fa-circle" style="color: ${fps > 30 ? "#00cc66" : "#ff4444"}; font-size: 8px;"></i> ${fps} FPS`;
        frames = 0;
        lastTime = currentTime;

        if (performance.memory) {
          const memoryMB = Math.round(
            performance.memory.usedJSHeapSize / 1048576,
          );
          document.getElementById("memoryUsage").textContent =
            `Memory: ${memoryMB} MB`;
        }
      }

      requestAnimationFrame(updateFPS);
    };

    requestAnimationFrame(updateFPS);
  }

  updateAllUI() {
    document.getElementById("sizeValue").textContent = this.brushSize + "px";
    document.getElementById("opacityValue").textContent = this.opacity + "%";
    document.getElementById("hardnessValue").textContent = this.hardness + "%";
    document.getElementById("spacingValue").textContent = this.spacing;
    document.getElementById("angleValue").textContent = this.angle + "°";
    this.updateLayerInfo();
  }

  updateLayerInfo() {
    document.getElementById("layerInfo").textContent =
      `Layer ${this.currentLayerIndex + 1} of ${this.layers.length}`;
  }

  changeBrushSize(delta) {
    this.brushSize = Math.min(100, Math.max(1, this.brushSize + delta));
    document.getElementById("brushSize").value = this.brushSize;
    document.getElementById("sizeValue").textContent = this.brushSize + "px";
  }

  showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = "slideUp 0.3s ease-out reverse";
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  }
}

const app = new WhiteboardApp();
