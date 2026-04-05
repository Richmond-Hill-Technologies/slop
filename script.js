// Mobile menu toggle
const toggle = document.getElementById('menuToggle');
const nav = document.getElementById('navLinks');
if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('active'));
    document.addEventListener('click', (e) => {
        if (!toggle.contains(e.target) && !nav.contains(e.target)) {
            nav.classList.remove('active');
        }
    });
}

// Specialty rotator
// Each item lives on its own headline line, so width changes never reflow adjacent text.
// We still animate the container width so the highlight hugs the active word.
const rotator = document.querySelector('.specialty-rotator');
if (rotator) {
    const track = rotator.querySelector('.specialty-track');
    const items = [...rotator.querySelectorAll('.specialty-item')];
    const count = items.length;
    let current = 0;
    let widths = [];
    let itemH = 0;

    const measure = () => {
        // Temporarily unhide to get accurate measurements
        rotator.style.overflow = 'visible';
        rotator.style.width = 'auto';
        rotator.style.height = 'auto';
        track.style.transform = 'none';

        widths = items.map(el => el.offsetWidth);
        itemH = items[0].offsetHeight;

        rotator.style.overflow = 'hidden';
        track.style.transform = `translateY(${-current * itemH}px)`;

        // Apply width instantly (no transition) then re-enable
        rotator.style.transition = 'none';
        rotator.style.width = widths[current] + 'px';
        rotator.style.height = itemH + 'px';
        requestAnimationFrame(() => { rotator.style.transition = ''; });
    };

    const advance = () => {
        current = (current + 1) % count;
        track.style.transform = `translateY(${-current * itemH}px)`;
        rotator.style.width = widths[current] + 'px';
    };

    (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => {
        measure();
        setInterval(advance, 2500);
    });

    window.addEventListener('resize', measure);
}
