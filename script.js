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

// Specialty rotator — JS-measured dynamic width (standard approach for variable-width highlights)
const rotator = document.querySelector('.specialty-rotator');
if (rotator) {
    const track = rotator.querySelector('.specialty-track');
    const items = [...rotator.querySelectorAll('.specialty-item')];
    const count = items.length;
    let current = 0;
    let widths = [];

    const measure = () => {
        // Measure natural width of each item (includes padding from CSS)
        // Temporarily remove overflow clip to get accurate reads
        rotator.style.overflow = 'visible';
        rotator.style.height = 'auto';
        widths = items.map(item => item.offsetWidth);
        rotator.style.overflow = 'hidden';

        // Set height to one item's line height
        rotator.style.height = items[0].offsetHeight + 'px';

        // Apply initial width with no transition
        rotator.style.transition = 'none';
        rotator.style.width = widths[0] + 'px';
        // Re-enable transition after paint
        requestAnimationFrame(() => {
            rotator.style.transition = '';
        });
    };

    const advance = () => {
        current = (current + 1) % count;
        track.style.transform = `translateY(calc(-${current} * ${items[0].offsetHeight}px))`;
        rotator.style.width = widths[current] + 'px';
    };

    // Wait for fonts so measurements are accurate
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => {
        measure();
        setInterval(advance, 2500);
    });

    window.addEventListener('resize', measure);
}
