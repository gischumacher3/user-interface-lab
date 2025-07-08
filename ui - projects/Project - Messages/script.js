const nameInput = document.getElementById('name-input');
const commentInput = document.getElementById('comment-input');
const imageInput = document.getElementById('image-input');
const avatarInput = document.getElementById('avatar-input');
const previewAvatar = document.getElementById('preview-avatar');
const submitButton = document.getElementById('submit-button');
const resetButton = document.getElementById('reset-button');
const commentsList = document.getElementById('comments-list');
const toggleButton = document.getElementById('toggle-dark');
const themeIcon = document.getElementById('theme-icon');

// Valor padrão do avatar
let avatarDataURL = 'assets/user.jpg';

// Alternar modo claro/escuro
toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeIcon.classList.toggle('ph-sun');
  themeIcon.classList.toggle('ph-moon');
});

// Pré-visualização do avatar e salvar base64
avatarInput.addEventListener('change', () => {
  const file = avatarInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      avatarDataURL = reader.result;
      previewAvatar.src = avatarDataURL;
    };
    reader.readAsDataURL(file);
  } else {
    avatarDataURL = 'assets/user.jpg';
    previewAvatar.src = avatarDataURL;
  }
});

// Limpar campos
resetButton.addEventListener('click', () => {
  nameInput.value = '';
  commentInput.value = '';
  imageInput.value = '';
});

// Publicar comentário
submitButton.addEventListener('click', () => {
  const name = nameInput.value.trim();
  const comment = commentInput.value.trim();
  const imageFile = imageInput.files[0];

  // Captura o avatar exibido na prévia no momento do envio
  const currentAvatar = previewAvatar.src || avatarDataURL;

  if (!name || !comment) {
    alert('Por favor, preencha o nome e o comentário.');
    return;
  }

  function addComment(imgDataUrl = '') {
    const commentElement = document.createElement('div');
    commentElement.classList.add('comment');

    commentElement.innerHTML = `
      <img src="${currentAvatar}" class="avatar" alt="avatar" />
      <div class="comment-content">
        <div class="comment-header">
          <span class="comment-author">
            ${name} · <span class="comment-time">${formatDate(new Date())}</span>
          </span>
        </div>
        <div class="comment-text">${comment}</div>
        ${imgDataUrl ? `<img src="${imgDataUrl}" alt="Comentário imagem" class="comment-image" />` : ''}
      </div>
      <button class="delete-btn" title="Excluir">
        <i class="ph ph-trash"></i>
      </button>
    `;

    // Excluir comentário
    commentElement.querySelector('.delete-btn').addEventListener('click', () => {
      commentElement.remove();
    });

    commentsList.appendChild(commentElement);

    // Limpar campos
    nameInput.value = '';
    commentInput.value = '';
    imageInput.value = '';
  }

  if (imageFile) {
    const reader = new FileReader();
    reader.onload = () => {
      addComment(reader.result);
    };
    reader.readAsDataURL(imageFile);
  } else {
    addComment();
  }
});

// Função para formatar data/hora
function formatDate(date) {
  const options = {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  };
  return date.toLocaleDateString('pt-BR', options).replace('.', '');
}
