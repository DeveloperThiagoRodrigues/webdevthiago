
window.addEventListener('load', () => {
    setTimeout(() => document.getElementById('loader').classList.add('done'), 2100);
    setTimeout(() => document.getElementById('heroBg').classList.add('loaded'), 2200);
});

// CURSOR
const cur = document.getElementById('cur');
const ring = document.getElementById('cur-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cur.style.left = mx + 'px'; cur.style.top = my + 'px';
});
(function animCur() {
    rx += (mx - rx) * .1; ry += (my - ry) * .1;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(animCur);
})();
document.querySelectorAll('a,button,.menu-card,.exp-card,.gal-item').forEach(el => {
    el.addEventListener('mouseenter', () => { ring.style.width = '56px'; ring.style.height = '56px'; ring.style.borderColor = 'var(--caramel)'; cur.style.width = '4px'; cur.style.height = '4px' });
    el.addEventListener('mouseleave', () => { ring.style.width = '36px'; ring.style.height = '36px'; ring.style.borderColor = 'rgba(212,168,83,.45)'; cur.style.width = '8px'; cur.style.height = '8px' });
});

// NAV SCROLL
window.addEventListener('scroll', () => document.getElementById('nav').classList.toggle('scrolled', scrollY > 60), { passive: true });

// CANVAS PARTICLES
const cv = document.getElementById('cv');
const c = cv.getContext('2d');
const resize = () => { cv.width = innerWidth; cv.height = innerHeight };
resize(); window.addEventListener('resize', resize);
const COLS = ['#C17B3A', '#D4A853', '#F5EFE0', '#9B6030', '#E8C87A'];
class P {
    constructor() { this.reset(true) }
    reset(init = false) {
        this.x = Math.random() * cv.width;
        this.y = init ? Math.random() * cv.height : cv.height + 10;
        this.r = Math.random() * 2 + .4;
        this.vx = (Math.random() - .5) * .28;
        this.vy = -(Math.random() * .55 + .12);
        this.op = Math.random() * .3 + .04;
        this.col = COLS[Math.floor(Math.random() * COLS.length)];
        this.life = 0; this.ml = Math.random() * 450 + 180;
        this.w = Math.random() * Math.PI * 2; this.ws = Math.random() * .016 + .004;
    }
    tick() { this.w += this.ws; this.x += this.vx + Math.sin(this.w) * .22; this.y += this.vy; this.life++; if (this.y < -8 || this.life > this.ml) this.reset() }
    draw() { c.save(); c.globalAlpha = this.op * (1 - this.life / this.ml); c.fillStyle = this.col; c.beginPath(); c.arc(this.x, this.y, this.r, 0, Math.PI * 2); c.fill(); c.restore() }
}
const ps = Array.from({ length: 110 }, () => new P());
(function loop() { c.clearRect(0, 0, cv.width, cv.height); ps.forEach(p => { p.tick(); p.draw() }); requestAnimationFrame(loop) })();

// SCROLL REVEAL
const obs = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('in') }), { threshold: .1 });
document.querySelectorAll('.rv,.rv-left,.rv-right').forEach(el => obs.observe(el));

// COUNT UP
const cObs = new IntersectionObserver(es => {
    es.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target, end = +el.dataset.count, lbl = el.closest('.num-item')?.querySelector('.num-lbl')?.textContent || '';
        const isMil = lbl.includes('Mil');
        const t0 = Date.now();
        (function tick() {
            const p = Math.min((Date.now() - t0) / 2000, 1), v = Math.floor((1 - Math.pow(1 - p, 3)) * end);
            el.textContent = v + (p < 1 ? '' : (isMil ? 'K+' : '+'));
            if (p < 1) requestAnimationFrame(tick);
        })();
        cObs.unobserve(el);
    });
}, { threshold: .5 });
document.querySelectorAll('[data-count]').forEach(el => cObs.observe(el));

// PARALLAX
const fpImg = document.getElementById('parallaxImg');
const heroBg = document.getElementById('heroBg');
window.addEventListener('scroll', () => {
    const sy = scrollY;
    if (heroBg) heroBg.style.transform = `scale(1) translateY(${sy * .22}px)`;
    if (fpImg) {
        const fp = fpImg.closest('.full-photo');
        if (fp) { const r = fp.getBoundingClientRect(); const prog = -r.top / (innerHeight + r.height); fpImg.style.transform = `translateY(${-15 + prog * 25}%)` }
    }
}, { passive: true });

// MENU TABS
document.querySelectorAll('.tab').forEach(t => t.addEventListener('click', function () { document.querySelectorAll('.tab').forEach(x => x.classList.remove('active')); this.classList.add('active') }));