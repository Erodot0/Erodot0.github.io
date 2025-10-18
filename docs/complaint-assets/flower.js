// 🌸 Random Emoji Background Generator
(function generateBackgroundFlowers() {
  const container = document.querySelector('.background-flowers');
  const emojis = ['🌸', '🌷', '🌺', '🌻', '💐', '💮', '🌹'];
  const total = window.innerWidth < 500 ? 40 : 80; // fewer on mobile

  for (let i = 0; i < total; i++) {
    const el = document.createElement('span');
    el.className = 'flower-emoji';
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];

    const size = Math.random() * 1.5 + 0.8; // between 0.8rem - 2.3rem
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const rot = `${Math.random() * 360}deg`;

    el.style.left = `${left}%`;
    el.style.top = `${top}%`;
    el.style.fontSize = `${size}rem`;
    el.style.setProperty('--r', rot);

    container.appendChild(el);
  }
})();
