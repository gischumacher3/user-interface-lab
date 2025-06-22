const uploadBox = document.getElementById('uploadBox');
const fileInput = document.getElementById('fileInput');
const filename = document.getElementById('filename');
const saveBtn = document.getElementById('saveBtn');
const cancelBtn = document.getElementById('cancelBtn');
const popup = document.getElementById('popup');
const fileLimit = 25 * 1024 * 1024; // 25MB

function showPopup(message, isError = false) {
  popup.textContent = message;
  popup.classList.toggle('error', isError);
  popup.style.display = 'block';
  setTimeout(() => {
    popup.style.display = 'none';
    popup.classList.remove('error');
  }, 3000);
}

function updateDropzoneFileList(file) {
  filename.textContent = `${file.name}, ${file.size} bytes`;
}

uploadBox.addEventListener('click', () => fileInput.click());

uploadBox.addEventListener('dragover', (e) => {
  e.preventDefault();
  uploadBox.classList.add('dropzone--over');
});

uploadBox.addEventListener('dragleave', () => {
  uploadBox.classList.remove('dropzone--over');
});

uploadBox.addEventListener('drop', (e) => {
  e.preventDefault();
  uploadBox.classList.remove('dropzone--over');
  if (e.dataTransfer.files.length) {
    const file = e.dataTransfer.files[0];
    if (file.size > fileLimit) {
      showPopup('❌ Arquivo excede 25MB!', true);
      return;
    }
    fileInput.files = e.dataTransfer.files;
    updateDropzoneFileList(file);
  }
});

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  if (!file) return;
  if (file.size > fileLimit) {
    showPopup('❌ Arquivo excede 25MB!', true);
    fileInput.value = '';
    filename.textContent = 'Nenhum arquivo selecionado';
    return;
  }
  updateDropzoneFileList(file);
});

cancelBtn.addEventListener('click', () => {
  fileInput.value = '';
  filename.textContent = 'Nenhum arquivo selecionado';
  showPopup('❌ Upload cancelado.', true);
});

saveBtn.addEventListener('click', () => {
  const file = fileInput.files[0];
  if (file) {
    showPopup('✅ Seu arquivo foi salvo com sucesso!');
  } else {
    showPopup('⚠️ Por favor, selecione um arquivo antes de salvar.', true);
  }
});