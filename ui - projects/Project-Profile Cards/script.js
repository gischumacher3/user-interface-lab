// SVGs das empresas
const companyIcons = {
  'Adobe Co.': `<svg viewBox="0 0 32 32" width="17" height="17"><path fill="#fff" d="M0 0h32v32H0z"/><path d="M7.31 6.245l8.679 19.735H8.77L0 6.245zm16.845 0h7.672L24.652 26.018l-8.633-19.773zm-1.713 3.225l-6.963 16.548h13.926z" fill="#e54c21"/></svg>`,
  'Google Inc.': `<svg viewBox="0 0 32 32" width="17" height="17"><circle fill="#fff" cx="16" cy="16" r="16"/><path d="M31.72 16.32c0-1.14-.1-2.22-.27-3.22H16v6.09h8.8c-.38 2.07-1.52 3.81-3.22 5.01v4.14h5.18c3.03-2.8 4.76-6.94 4.76-12.02z" fill="#4285F4"/><path d="M16 32c4.32 0 7.94-1.44 10.59-3.91l-5.18-4.14c-1.44.97-3.28 1.55-5.41 1.55-4.16 0-7.67-2.81-8.94-6.59H2.78v4.25C5.41 29.12 10.31 32 16 32z" fill="#34A853"/><path d="M7.06 19.01c-.33-.97-.52-2-.52-3.01s.19-2.04.52-3.01V8.74H2.78A15.86 15.86 0 0 0 0 16c0 2.57.62 5 1.73 7.26l5.33-4.25z" fill="#FBBC05"/><path d="M16 6.44c2.35 0 4.45.81 6.12 2.38l4.59-4.59C23.93 1.44 20.31 0 16 0 10.31 0 5.41 2.88 2.78 8.74l5.33 4.25c1.27-3.78 4.78-6.59 8.89-6.59z" fill="#EA4335"/></svg>`,
  'Microsoft': `<svg viewBox="0 0 32 32" width="17" height="17"><rect width="32" height="32" rx="16" fill="#fff"/><rect x="4" y="4" width="10" height="10" fill="#f35325"/><rect x="18" y="4" width="10" height="10" fill="#81bc06"/><rect x="4" y="18" width="10" height="10" fill="#05a6f0"/><rect x="18" y="18" width="10" height="10" fill="#ffba08"/></svg>`,
  'Spotify': `<svg viewBox="0 0 32 32" width="17" height="17"><circle fill="#fff" cx="16" cy="16" r="16"/><circle fill="#1ed760" cx="16" cy="16" r="13"/><path d="M22.158 20.694c-.266.436-.83.576-1.267.31-3.474-2.123-7.854-2.6-13.022-1.411-.5.118-.99-.192-1.109-.692-.12-.5.192-.99.692-1.109 5.595-1.343 10.387-.8 14.212 1.559.436.267.576.831.31 1.267zm1.527-3.112c-.335.539-1.04.712-1.58.377-3.976-2.482-10.037-3.203-14.74-1.731-.596.178-1.228-.155-1.406-.751-.178-.597.154-1.228.751-1.406 5.175-1.543 11.834-.753 16.367 2.006.54.334.713 1.038.378 1.58zm1.583-3.194c-4.548-2.768-12.063-3.022-16.417-1.634-.69.213-1.427-.163-1.64-.854-.213-.69.163-1.427.854-1.64 4.853-1.5 12.986-1.204 17.99 1.864.63.383.832 1.205.45 1.836-.383.63-1.205.833-1.837.428z" fill="#fff"/></svg>`,
  'Netflix': `<svg viewBox="0 0 32 32" width="17" height="17"><rect width="32" height="32" rx="16" fill="#fff"/><path d="M8 6h4.666l5.46 15.02V6H24v20h-4.666l-5.46-15.02V26H8V6z" fill="#e50914"/></svg>`,
  'Dribbble': `<svg viewBox="0 0 32 32" width="17" height="17"><circle fill="#fff" cx="16" cy="16" r="16"/><circle fill="#ea4c89" cx="16" cy="16" r="13"/><path d="M25 16.03c0-.29-.01-.57-.04-.86-3.05-.09-6.44.29-9.99 1.11a29.89 29.89 0 0 1 1.8 4.96c4.41-1.62 7.36-4.34 8.23-7.35zm-1.3-3.11c-.7-1.4-1.84-2.54-3.25-3.23.07.11 1.15 2 2.04 4.1a53.48 53.48 0 0 1 2.59-.87c-.39-.7-.91-1.32-1.38-2zm-5.9-3.38c-.41-.07-.84-.11-1.28-.11-2.07 0-3.97.77-5.44 2.05.32.01 2.36.08 4.86.48-.41-.74-.8-1.44-1.11-2.03zm-6.23 3.21c-1.01 1.3-1.62 2.95-1.62 4.76v.06c3.33-.59 5.88-.61 5.88-.61s-.25-.61-.67-1.47c-3.06-.49-3.44-.5-3.59-.74zm10.11-3.74c1.69.52 3.13 1.69 4.01 3.27l-.06.02a55.47 55.47 0 0 0-2.47.83c-.77-1.74-1.58-3.28-1.63-3.37l.15-.75zm-2.77-.59c.19.28.88 1.42 1.67 3.02-2.74-.41-5.21-.49-5.53-.49a9.28 9.28 0 0 1 3.86-2.53zm-9.09 8.46a8.97 8.97 0 0 0 1.68 4.73c.12-.16 2.22-2.97 8.38-4.68-.22-.51-.43-.97-.65-1.4 0 0-2.63.02-5.98.62zm2.84 5.5a8.94 8.94 0 0 0 5.61 2.13c-.29-.96-.74-2.36-1.42-4.09-5.1 1.56-6.75 3.88-6.81 3.97l-.1.14zm7.8 2.12c2.33-.36 4.57-1.19 6.47-2.56-.75-2.3-2.78-5.37-2.78-5.37a46.14 46.14 0 0 0-2.71.9c.75 1.8 1.25 3.29 1.5 4.16zm-2.5.33c-2.15 0-4.15-.76-5.72-2.04 1.22-1.49 3.08-3.13 7.03-4.41.23.54.46 1.05.68 1.6-6.11 1.85-7.97 5.04-7.99 5.08a8.96 8.96 0 0 0 6 2.32c.74 0 1.45-.08 2.15-.23z" fill="#fff"/></svg>`,
};

const profiles = [
  {
    name: "Alex Turner",
    role: "Creative Director",
    company: "Adobe Co.",
    cover: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 5.0,
    price: 150,
    duration: 24
  },
  {
    name: "Maria Silva",
    role: "UX Designer",
    company: "Google Inc.",
    cover: "https://images.unsplash.com/photo-1465101162946-4377e57745c3?auto=format&fit=crop&w=600&q=80",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4.8,
    price: 120,
    duration: 18
  },
  {
    name: "Rafael Costa",
    role: "Fullstack Dev",
    company: "Microsoft",
    cover: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
    avatar: "https://randomuser.me/api/portraits/men/41.jpg",
    rating: 4.9,
    price: 200,
    duration: 36
  },
  {
    name: "Jéssica Alves",
    role: "Product Manager",
    company: "Spotify",
    cover: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
    avatar: "https://randomuser.me/api/portraits/women/16.jpg",
    rating: 5.0,
    price: 180,
    duration: 30
  },
  {
    name: "Carlos Eduardo",
    role: "Data Scientist",
    company: "Netflix",
    cover: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=600&q=80",
    avatar: "https://randomuser.me/api/portraits/men/56.jpg",
    rating: 4.7,
    price: 220,
    duration: 12
  },
  {
    name: "Ana Ribeiro",
    role: "Illustrator",
    company: "Dribbble",
    cover: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80",
    avatar: "https://randomuser.me/api/portraits/women/25.jpg",
    rating: 4.95,
    price: 95,
    duration: 6
  }
];

function createProfileCard(profile) {
  return `
    <div class="profile-card">
      <img class="profile-cover" src="${profile.cover}" alt="Capa de ${profile.name}">
      <div class="profile-company">
        ${companyIcons[profile.company] || ''}
        ${profile.company}
      </div>
      <img class="profile-avatar" src="${profile.avatar}" alt="Avatar de ${profile.name}">
      <div class="profile-content">
        <div class="profile-name">${profile.name}</div>
        <div class="profile-role">${profile.role}</div>
        <div class="profile-details">
          <div class="profile-detail">
            <span class="icon">⭐</span>
            <span>${profile.rating}</span>
            <small>Rating</small>
          </div>
          <div class="profile-detail">
            <span class="icon">💼</span>
            <span>$${profile.price}</span>
            <small>hours</small>
          </div>
          <div class="profile-detail">
            <span class="icon">⏰</span>
            <span>${profile.duration}</span>
            <small>Month</small>
          </div>
        </div>
        <div class="profile-actions">
          <button class="get-in-touch-btn">Get In Touch</button>
        </div>
      </div>
    </div>
  `;
}

// Render cards só quando o DOM já existe
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById('profiles-container').innerHTML = profiles.map(createProfileCard).join('');

  // TEMA (toggle dark/light)
  const themeSwitch = document.getElementById('theme-toggle-checkbox');
  const body = document.body;

  function applyTheme(theme) {
    if (theme === 'dark') {
      body.classList.add('dark-mode');
      themeSwitch.checked = true;
    } else {
      body.classList.remove('dark-mode');
      themeSwitch.checked = false;
    }
  }
  function getSystemPref() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function setTheme(theme, store = true) {
    applyTheme(theme);
    if (store) localStorage.setItem('theme', theme);
  }
  themeSwitch.onchange = () => setTheme(themeSwitch.checked ? 'dark' : 'light');
  function initTheme() {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') {
      applyTheme(saved);
    } else {
      applyTheme(getSystemPref());
    }
  }
  initTheme();
  // Atualiza se o sistema mudar
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) applyTheme(e.matches ? 'dark' : 'light');
  });
});
