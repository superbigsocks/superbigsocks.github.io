const canvas = document.getElementById('drawingCanvas');
    const ctx = canvas.getContext('2d');
    const toggleDrawingBtn = document.getElementById('toggleDrawing');
    const clearCanvasBtn = document.getElementById('clearCanvas');
    const colorPicker = document.getElementById('colorPicker');

    let activePointerId = null;
    let drawingEnabled = false;
    let currentColor = '#000000';
    let lastPos = { x: 0, y: 0 };

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    toggleDrawingBtn.addEventListener('click', () => {
      drawingEnabled = !drawingEnabled;
      toggleDrawingBtn.textContent = drawingEnabled ? 'Stop Drawing' : 'Start Drawing';
      canvas.style.pointerEvents = drawingEnabled ? 'auto' : 'none';
      if (!drawingEnabled) activePointerId = null;
    });

    clearCanvasBtn.addEventListener('click', () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    colorPicker.addEventListener('input', (e) => {
      currentColor = e.target.value;
    });

    canvas.addEventListener('pointerdown', (e) => {
      if (!drawingEnabled || activePointerId !== null || e.button !== 0) return;
      activePointerId = e.pointerId;
      lastPos = { x: e.clientX, y: e.clientY };
    });

    canvas.addEventListener('pointermove', (e) => {
      if (e.pointerId !== activePointerId) return;
      ctx.lineWidth = 2;
      ctx.strokeStyle = currentColor;
      ctx.lineCap = 'round';

      ctx.beginPath();
      ctx.moveTo(lastPos.x, lastPos.y);
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();

      lastPos = { x: e.clientX, y: e.clientY };
    });

    const stopDrawing = (e) => {
      if (e.pointerId === activePointerId) activePointerId = null;
    };

    canvas.addEventListener('pointerup', stopDrawing);
    canvas.addEventListener('pointercancel', stopDrawing);
    canvas.addEventListener('pointerleave', stopDrawing);

    window.addEventListener('keydown', (e) => {
      if (e.key.toLowerCase() === 'c') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    });