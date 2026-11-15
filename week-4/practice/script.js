/* JavaScript 7th Edition — Chapter 10 practice
   Author: Leslie Brockman — Shape matching with pointer events. */
const tans = document.querySelectorAll('.piece');
const board = document.getElementById('puzzleBoard');
const tray = document.getElementById('pieceTray');
const svgNS = 'http://www.w3.org/2000/svg';
// A shared 100-unit viewBox keeps every outline identical to its matching piece.
const shapes = {
   'large-triangle': [[10, 90], [90, 90], [10, 10]],
   'medium-triangle': [[22, 78], [78, 78], [22, 22]],
   'small-triangle': [[30, 70], [70, 70], [30, 30]],
   square: [[30, 30], [70, 30], [70, 70], [30, 70]],
   parallelogram: [[20, 30], [60, 30], [80, 70], [40, 70]]
};
const colors = ['#e77b67', '#69a7d7', '#e6b957', '#8ac19c', '#b48ac8', '#ef9db0', '#5fb9b5'];
const states = new Map();
const targets = [];
let active = null;
let eventX, eventY;

function addPolygon(svg, shape) {
   svg.setAttribute('viewBox', '0 0 100 100');
   const polygon = document.createElementNS(svgNS, 'polygon');
   polygon.setAttribute('points', shapes[shape].map(point => point.join(',')).join(' '));
   svg.appendChild(polygon);
}

tans.forEach((tan, i) => {
   const shape = tan.dataset.shape;
   addPolygon(tan.querySelector('svg'), shape);
   tan.querySelector('svg').style.fill = colors[i];
   states.set(tan, {home: tan.parentElement, target: null});
   const slot = document.createElement('div');
   slot.className = 'target-slot';
   const svg = document.createElementNS(svgNS, 'svg');
   svg.classList.add('target-outline');
   svg.setAttribute('aria-hidden', 'true');
   addPolygon(svg, shape);
   slot.appendChild(svg);
   board.appendChild(slot);
   targets.push({slot, svg, shape, piece: null});
   tan.addEventListener('pointerdown', grabTan);
});

function grabTan(e) {
   const tan = e.currentTarget;
   if (active || states.get(tan).target || (e.pointerType === 'mouse' && e.button !== 0)) return;
   const rect = tan.getBoundingClientRect();
   active = {tan, pointerId: e.pointerId, x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2, size: rect.width};
   eventX = e.clientX;
   eventY = e.clientY;
   // Move only the shape into an overlay; its bilingual label stays in its tray slot.
   document.body.appendChild(tan);
   tan.classList.add('dragging');
   tan.style.width = active.size + 'px';
   tan.style.height = active.size + 'px';
   drawDrag();
   tan.setPointerCapture(e.pointerId);
   tan.addEventListener('pointermove', moveTan);
   tan.addEventListener('pointerup', dropTan);
   tan.addEventListener('pointercancel', dropTan);
}

function drawDrag() {
   active.tan.style.left = active.x + 'px';
   active.tan.style.top = active.y + 'px';
}

function moveTan(e) {
   if (!active || active.pointerId !== e.pointerId) return;
   active.x += e.clientX - eventX;
   active.y += e.clientY - eventY;
   eventX = e.clientX;
   eventY = e.clientY;
   // Fixed viewport coordinates keep pointer movement accurate while the page scrolls.
   const b = board.getBoundingClientRect(), t = tray.getBoundingClientRect();
   const half = active.size / 2;
   const left = Math.min(b.left, t.left) + half;
   const right = Math.max(b.right, t.right) - half;
   const top = Math.min(b.top, t.top) + half;
   const bottom = Math.max(b.bottom, t.bottom) - half;
   active.x = Math.max(left, Math.min(right, active.x));
   active.y = Math.max(top, Math.min(bottom, active.y));
   drawDrag();
}

function dropTan(e) {
   if (!active || active.pointerId !== e.pointerId) return;
   if (e.type === 'pointerup') moveTan(e);
   const {tan, x, y} = active;
   const state = states.get(tan);
   let match = null;
   if (e.type === 'pointerup') {
      match = targets.find(target => {
         if (target.piece || target.shape !== tan.dataset.shape) return false;
         const r = target.svg.getBoundingClientRect();
         // Both SVGs have identical geometry and scale; compare their shared origin.
         return Math.hypot(x - (r.left + r.width / 2), y - (r.top + r.height / 2)) <= r.width * .25;
      });
   }
   tan.removeEventListener('pointermove', moveTan);
   tan.removeEventListener('pointerup', dropTan);
   tan.removeEventListener('pointercancel', dropTan);
   if (tan.hasPointerCapture(e.pointerId)) tan.releasePointerCapture(e.pointerId);
   active = null;
   tan.classList.remove('dragging');
   tan.style.removeProperty('left');
   tan.style.removeProperty('top');
   tan.style.removeProperty('width');
   tan.style.removeProperty('height');
   if (match) {
      match.piece = tan;
      state.target = match;
      tan.dataset.locked = 'true';
      match.slot.appendChild(tan);
   } else {
      state.home.appendChild(tan);
   }
}

function sizePieces() {
   if (active) dropTan({pointerId: active.pointerId, type: 'pointercancel'});
   const width = targets[0].slot.clientWidth;
   // Cap rendering size while allowing narrow mobile columns to shrink proportionally.
   document.documentElement.style.setProperty('--shape-size', Math.min(100, width) + 'px');
}

document.getElementById('resetBtn').addEventListener('click', () => {
   if (active) dropTan({pointerId: active.pointerId, type: 'pointercancel'});
   targets.forEach(target => { target.piece = null; });
   tans.forEach(tan => {
      const state = states.get(tan);
      state.target = null;
      tan.dataset.locked = 'false';
      state.home.appendChild(tan);
   });
});
window.addEventListener('resize', sizePieces);
sizePieces();
