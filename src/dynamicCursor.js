// Dynamic Cursor Implementation - Simplified
class DynamicCursor {
  constructor() {
    this.cursor = null;
    this.init();
  }

  init() {
    console.log('Initializing dynamic cursor...');
    
    // Remove any existing cursor
    const existing = document.querySelector('.dynamic-cursor');
    if (existing) {
      existing.remove();
    }

    // Create cursor element
    this.cursor = document.createElement('div');
    this.cursor.className = 'dynamic-cursor';
    this.cursor.style.display = 'block';
    this.cursor.style.opacity = '1';
    
    // Add to body
    document.body.appendChild(this.cursor);
    console.log('Cursor element added:', this.cursor);

    // Bind events
    this.bindEvents();
  }

  bindEvents() {
    // Mouse move event - most important for cursor visibility
    document.addEventListener('mousemove', (e) => {
      this.updatePosition(e.clientX, e.clientY);
    });

    // Mouse down event
    document.addEventListener('mousedown', () => {
      this.cursor.classList.add('clicking');
    });

    // Mouse up event
    document.addEventListener('mouseup', () => {
      this.cursor.classList.remove('clicking');
    });

    // Initial position setup
    this.updatePosition(0, 0);
  }

  updatePosition(x, y) {
    if (this.cursor) {
      // Center the cursor on mouse position
      this.cursor.style.left = `${x - 16}px`;
      this.cursor.style.top = `${y - 16}px`;
      this.cursor.style.display = 'block';
      this.cursor.style.opacity = '1';
    }
  }
}

// Initialize immediately when script loads
console.log('Dynamic cursor script loading...');

function initCursor() {
  console.log('Document ready state:', document.readyState);
  if (document.body) {
    console.log('Creating cursor instance...');
    window.dynamicCursor = new DynamicCursor();
  } else {
    console.log('Body not ready, retrying...');
    setTimeout(initCursor, 100);
  }
}

// Try multiple initialization methods
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCursor);
} else {
  initCursor();
}

// Backup initialization
setTimeout(() => {
  if (!document.querySelector('.dynamic-cursor')) {
    console.log('Backup initialization triggered');
    initCursor();
  }
}, 1000);

export default DynamicCursor;