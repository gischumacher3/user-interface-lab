const cities = [
  {
    name: "Sydney",
    desc: "Famosa por sua icônica Ópera, belo porto e estilo de vida descontraído nas praias.",
    img: "./images/sydney-photo.jpg",
    rating: 4.9,
    tags: ["Praias", "Paisagens"],
  },
  {
    name: "Kyoto",
    desc: "Conhecida por seus templos budistas clássicos, jardins, palácios imperiais e casas de madeira tradicionais.",
    img: "./images/kyoto-photo.jpg",
    rating: 4.8,
    tags: ["Passeios", "Restaurantes"],
  },
  {
    name: "Rio De Janeiro",
    desc: "Uma cidade vibrante conhecida pelo Carnaval, pelo Cristo Redentor e por suas praias deslumbrantes.",
    img: "./images/rio-de-janeiro-photo.jpg",
    rating: 4.7,
    tags: ["Praias", "Carnaval"],
  },
  {
    name: "São Paulo",
    desc: "A maior cidade do Brasil, conhecida por suas instituições culturais e rica tradição arquitetônica.",
    img: "./images/sao-paulo-photo.jpg",
    rating: 4.4,
    tags: ["Restaurantes", "Bares"],
  },
  {
    name: "Sorocaba",
    desc: "Uma cidade brasileira agradável com parques, culinária local e um estilo de vida calmo.",
    img: "./images/sorocaba-photo.jpg",
    rating: 4.1,
    tags: ["Passeios", "Cafés"],
  },
  {
    name: "Paris",
    desc: "A cidade das luzes, conhecida por sua arte, gastronomia e pela Torre Eiffel.",
    img: "./images/paris-photo.jpg",
    rating: 4.9,
    tags: ["Restaurantes", "Paisagens"],
  },
  {
    name: "Amsterdam",
    desc: "Uma charmosa cidade repleta de canais, casas históricas, museus e paixão por bicicletas.",
    img: "./images/amsterdam-photo.jpg",
    rating: 4.6,
    tags: ["Passeios", "Museus"],
  },
  {
    name: "Buenos Aires",
    desc: "Uma capital cosmopolita conhecida por sua arquitetura de estilo europeu e rica vida cultural.",
    img: "./images/buenos-aires-photo.jpg",
    rating: 4.5,
    tags: ["Restaurantes", "Bares"],
  },
  {
    name: "New York City",
    desc: "A cidade que nunca dorme, repleta de arranha-céus, shows da Broadway e culinária mundial.",
    img: "./images/new-york-city-photo.jpg",
    rating: 4.8,
    tags: ["Restaurantes", "Passeios"],
  },
  {
    name: "Barcelona",
    desc: "Conhecida por sua arte e arquitetura, vida de rua vibrante e praias mediterrâneas.",
    img: "./images/barcelona-photo.jpg",
    rating: 4.7,
    tags: ["Praias", "Cafés"],
  },
  {
    name: "Lisboa",
    desc: "A capital costeira e acidentada de Portugal, famosa por seus edifícios coloridos e pela música Fado.",
    img: "./images/lisboa-photo.jpg",
    rating: 4.6,
    tags: ["Paisagens", "Restaurantes"],
  },
];

// Pagination settings
const cardsPerPage = 3;
let currentPage = 1;
const totalPages = Math.ceil(cities.length / cardsPerPage);

function createStarIcons(rating) {
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars += `<svg class="star-icon" fill="#fbbf24" viewBox="0 0 20 20"><polygon points="10,2.5 12.7,7.8 18.5,8.3 14,12.1 15.2,17.7 10,14.7 4.8,17.7 6,12.1 1.5,8.3 7.3,7.8"/></svg>`;
    } else if (rating >= i - 0.5) {
      stars += `<svg class="star-icon" viewBox="0 0 20 20"><defs><linearGradient id="half"><stop offset="50%" stop-color="#fbbf24"/><stop offset="50%" stop-color="#ddd"/></linearGradient></defs><polygon fill="url(#half)" points="10,2.5 12.7,7.8 18.5,8.3 14,12.1 15.2,17.7 10,14.7 4.8,17.7 6,12.1 1.5,8.3 7.3,7.8"/></svg>`;
    } else {
      stars += `<svg class="star-icon" fill="#ddd" viewBox="0 0 20 20"><polygon points="10,2.5 12.7,7.8 18.5,8.3 14,12.1 15.2,17.7 10,14.7 4.8,17.7 6,12.1 1.5,8.3 7.3,7.8"/></svg>`;
    }
  }
  return stars;
}

function renderCards() {
  const wrapper = document.getElementById('cards-wrapper');
  wrapper.innerHTML = '';
  const start = (currentPage - 1) * cardsPerPage;
  const end = start + cardsPerPage;
  const pageCities = cities.slice(start, end);

  pageCities.forEach(city => {
    wrapper.innerHTML += `
      <div class="city-card">
        <div class="city-img-box">
          <img class="city-img" src="${city.img}" alt="${city.name}">
        </div>
        <div class="city-title">${city.name}</div>
        <div class="stars-box">${createStarIcons(city.rating)}
          <span style="font-size: 0.97rem; color: #a49ad4; margin-left: 5px;">${city.rating.toFixed(1)}</span>
        </div>
        <div class="city-desc">${city.desc}</div>
        <div class="tags-box">
          ${city.tags.map(tag => `<span class="city-tag">${tag}</span>`).join('')}
        </div>
        <button class="see-more-btn">Ver Mais</button>
      </div>
    `;
  });
}

function renderPagination() {
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = '';

  // Previous button
  const prevBtn = document.createElement('button');
  prevBtn.className = 'page-btn';
  prevBtn.innerHTML = '&#8592;';
  prevBtn.disabled = currentPage === 1;
  prevBtn.onclick = () => { currentPage--; update(); };
  pagination.appendChild(prevBtn);

  // Numbered pages with logic for ellipsis if too many pages
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      Math.abs(i - currentPage) <= 1
    ) {
      const pageBtn = document.createElement('button');
      pageBtn.className = 'page-num' + (i === currentPage ? ' active' : '');
      pageBtn.textContent = i;
      pageBtn.onclick = () => { currentPage = i; update(); };
      pagination.appendChild(pageBtn);
    } else if (
      i === 2 && currentPage > 3 ||
      i === totalPages - 1 && currentPage < totalPages - 2
    ) {
      // Add ellipsis
      const ellipsis = document.createElement('span');
      ellipsis.textContent = '...';
      ellipsis.style.margin = '0 6px';
      pagination.appendChild(ellipsis);
    }
  }

  // Next button
  const nextBtn = document.createElement('button');
  nextBtn.className = 'page-btn';
  nextBtn.innerHTML = '&#8594;';
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.onclick = () => { currentPage++; update(); };
  pagination.appendChild(nextBtn);
}

// Corrija aqui: sempre chame setupArrows no update!
function update() {
  renderCards();
  renderPagination();
  setupArrows(); // <-- Necessário para atualizar eventos e estado das setas laterais
}

// Setup arrow buttons for navigation (fora do update, só eventos e estado)
function setupArrows() {
  const prevArrow = document.getElementById('prevArrow');
  const nextArrow = document.getElementById('nextArrow');
  if (!prevArrow || !nextArrow) return;

  prevArrow.disabled = currentPage === 1;
  nextArrow.disabled = currentPage === totalPages;

  prevArrow.onclick = () => {
    if (currentPage > 1) {
      currentPage--;
      update();
    }
  };
  nextArrow.onclick = () => {
    if (currentPage < totalPages) {
      currentPage++;
      update();
    }
  };
}

// Inicialização
update();