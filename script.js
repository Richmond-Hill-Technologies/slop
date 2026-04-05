// Mobile menu toggle
const toggle = document.getElementById('menuToggle');
const nav = document.getElementById('navLinks');
if (toggle && nav) {
    toggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
    document.addEventListener('click', (e) => {
        if (!toggle.contains(e.target) && !nav.contains(e.target)) {
            nav.classList.remove('active');
        }
    });
}

// Specialty rotator
const track = document.querySelector('.specialty-track');
if (track) {
    const items = track.querySelectorAll('.specialty-item');
    const count = items.length;
    let current = 0;

    // Set the rotator height to match one item
    const rotator = track.parentElement;
    const setHeight = () => {
        rotator.style.height = items[0].offsetHeight + 'px';
    };
    setHeight();
    window.addEventListener('resize', setHeight);

    setInterval(() => {
        current = (current + 1) % count;
        track.style.transform = `translateY(-${current * 100 / count * count}%)`;
        // Simpler: each item is 1.15em, shift by index
        track.style.transform = `translateY(calc(-${current} * 1.15em))`;
    }, 2500);
}
