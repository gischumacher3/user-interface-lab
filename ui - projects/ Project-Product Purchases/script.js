const baseData = [
  { id: "#1011", date: "2023-06-05T10:01", status: "Paid", user: "Avery Klein", avatar: "https://i.pravatar.cc/40?img=1", orderType: "Modern Frontend Developer", value: 64, estoque: 12, produto: "Curso Frontend Moderno" },
  { id: "#1012", date: "2023-06-05T10:07", status: "Paid", user: "Jordan Price", avatar: "https://i.pravatar.cc/40?img=2", orderType: "UX UI Design Process", value: 98, estoque: 5, produto: "Curso UX/UI Avançado" },
  { id: "#1013", date: "2023-06-05T10:12", status: "Pending", user: "Melissa Nash", avatar: "https://i.pravatar.cc/40?img=3", orderType: "Modern Frontend Developer", value: 64, estoque: 0, produto: "Curso Frontend Moderno" },
  { id: "#1014", date: "2023-06-05T10:19", status: "Paid", user: "Taylor Sims", avatar: "https://i.pravatar.cc/40?img=4", orderType: "UX UI Design Process", value: 98, estoque: 8, produto: "Curso UX/UI Avançado" },
  { id: "#1015", date: "2023-06-05T10:24", status: "Canceled", user: "Casey Blake", avatar: "https://i.pravatar.cc/40?img=5", orderType: "Modern Frontend Developer", value: 64, estoque: 2, produto: "Curso Frontend Moderno" },
  { id: "#1016", date: "2023-06-05T10:31", status: "Pending", user: "Skyler Hart", avatar: "https://i.pravatar.cc/40?img=6", orderType: "UX UI Design Process", value: 98, estoque: 10, produto: "Curso UX/UI Avançado" },
  { id: "#1017", date: "2023-06-05T10:38", status: "Paid", user: "Jamie Cross", avatar: "https://i.pravatar.cc/40?img=7", orderType: "Modern Frontend Developer", value: 64, estoque: 4, produto: "Curso Frontend Moderno" }
];

function formatDateDisplay(isoString) {
  const date = new Date(isoString);
  return date.toLocaleString("en-US", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
}

function statusClass(status) {
  switch (status.toLowerCase()) {
    case "paid": return "filled";
    case "pending": return "pending";
    case "canceled": return "cancelled";
    default: return "";
  }
}

function renderTable(data) {
  const tbody = document.querySelector("#team-table tbody");
  tbody.innerHTML = "";

  data.forEach(item => {
    const trMain = document.createElement("tr");
    trMain.dataset.id = item.id.replace("#", "");
    trMain.dataset.date = item.date;
    trMain.dataset.status = item.status;
    trMain.dataset.value = item.value;

    trMain.innerHTML = `
      <td contenteditable="true">${item.id}</td>
      <td contenteditable="true">${formatDateDisplay(item.date)}</td>
      <td contenteditable="true"><span class="status status--${statusClass(item.status)}">${item.status}</span></td>
      <td contenteditable="true"><div class="avatar_wrapper"><img src="${item.avatar}" class="avatar" alt="Avatar">${item.user}</div></td>
      <td contenteditable="true">${item.orderType}</td>
      <td contenteditable="true">$${item.value.toFixed(2)}</td>
      <td><button class="expand-btn">➕</button></td>
    `;
    tbody.appendChild(trMain);

    const trExpand = document.createElement("tr");
    trExpand.classList.add("expandable-row");
    trExpand.style.display = "none";
    trExpand.innerHTML = `
      <td colspan="7">
        <div><strong>Estoque:</strong> ${item.estoque} unidades</div>
        <div><strong>Produto Vinculado:</strong> ${item.produto}</div>
      </td>
    `;
    tbody.appendChild(trExpand);
  });

  updateSummary(data);
  updateFooter(data.length);
  setupEventListeners();
}

function setupResizableColumns(tableSelector) {
  const table = document.querySelector(tableSelector);
  const cols = table.querySelectorAll("th");

  cols.forEach(col => {
    col.classList.add("resizable");
    const resizer = document.createElement("div");
    resizer.classList.add("resizer");
    col.appendChild(resizer);
    let startX, startWidth;

    resizer.addEventListener("mousedown", function (e) {
      startX = e.clientX;
      startWidth = parseInt(document.defaultView.getComputedStyle(col).width, 10);
      document.documentElement.addEventListener("mousemove", doDrag);
      document.documentElement.addEventListener("mouseup", stopDrag);
    });

    function doDrag(e) {
      col.style.width = (startWidth + e.clientX - startX) + "px";
    }

    function stopDrag() {
      document.documentElement.removeEventListener("mousemove", doDrag);
      document.documentElement.removeEventListener("mouseup", stopDrag);
    }
  });
}

function enableDragAndDropHeaders() {
  const thElements = document.querySelectorAll("#team-table thead tr:first-child th");
  let draggedTh = null;

  thElements.forEach(th => {
    th.draggable = true;

    th.addEventListener("dragstart", (e) => {
      draggedTh = th;
      e.dataTransfer.effectAllowed = "move";
    });

    th.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    th.addEventListener("drop", (e) => {
      e.preventDefault();
      if (draggedTh && draggedTh !== th) {
        const parent = th.parentNode;
        const draggedIndex = Array.from(parent.children).indexOf(draggedTh);
        const targetIndex = Array.from(parent.children).indexOf(th);

        if (draggedIndex < targetIndex) {
          parent.insertBefore(draggedTh, th.nextSibling);
        } else {
          parent.insertBefore(draggedTh, th);
        }

        const rows = document.querySelectorAll("#team-table tbody tr");
        rows.forEach(row => {
          if (!row.classList.contains("expandable-row")) {
            const cells = row.children;
            const draggedCell = cells[draggedIndex];
            const targetCell = cells[targetIndex];

            if (draggedIndex < targetIndex) {
              row.insertBefore(draggedCell, targetCell.nextSibling);
            } else {
              row.insertBefore(draggedCell, targetCell);
            }
          }
        });
      }
    });
  });
}

function setupEventListeners() {
  document.querySelectorAll(".expand-btn").forEach(btn => {
    btn.onclick = () => {
      const tr = btn.closest("tr");
      const next = tr.nextElementSibling;
      next.style.display = next.style.display === "none" || next.style.display === "" ? "table-row" : "none";
      btn.textContent = next.style.display === "table-row" ? "➖" : "➕";
    };
  });

  document.querySelectorAll(".filters input").forEach(input => {
    input.oninput = applyFilters;
  });

  document.getElementById("date-from").onchange = applyFilters;
  document.getElementById("date-to").onchange = applyFilters;

  document.getElementById("clear-date-filter").onclick = () => {
    document.getElementById("date-from").value = "";
    document.getElementById("date-to").value = "";
    applyFilters();
  };

  document.querySelector(".dark-mode-toggle").onclick = () => {
    document.body.classList.toggle("dark-mode");
  };

  // Inline edit (save changes on blur)
  document.querySelector("#team-table tbody").addEventListener("focusout", e => {
    if (e.target.isContentEditable) {
      // Could add validation here
    }
  });
}

function applyFilters() {
  const filters = Array.from(document.querySelectorAll(".filters input")).map(input => input.value.toLowerCase());
  const dateFrom = document.getElementById("date-from").value;
  const dateTo = document.getElementById("date-to").value;
  let filtered = baseData.filter(item => {
    // Text filters
    if (filters[0] && !item.id.toLowerCase().includes(filters[0])) return false;
    if (filters[2] && !item.status.toLowerCase().includes(filters[2])) return false;
    if (filters[3] && !item.user.toLowerCase().includes(filters[3])) return false;
    if (filters[4] && !item.orderType.toLowerCase().includes(filters[4])) return false;
    if (filters[5] && !item.value.toString().toLowerCase().includes(filters[5])) return false;

    // Date filter
    if (dateFrom && new Date(item.date) < new Date(dateFrom)) return false;
    if (dateTo && new Date(item.date) > new Date(dateTo)) return false;

    return true;
  });

  renderTable(filtered);
}

function updateSummary(data) {
  const totalOrders = data.length;
  const totalPaid = data.filter(d => d.status.toLowerCase() === "paid").length;
  const totalPending = data.filter(d => d.status.toLowerCase() === "pending").length;
  const totalCancelled = data.filter(d => d.status.toLowerCase() === "canceled").length;

  document.getElementById("total-orders").textContent = totalOrders;
  document.getElementById("total-paid").textContent = totalPaid;
  document.getElementById("total-pending").textContent = totalPending;
  document.getElementById("total-cancelled").textContent = totalCancelled;

  const chart = document.querySelector(".summary-chart");
  const total = totalPaid + totalPending + totalCancelled || 1;

  chart.innerHTML = `
    <div class="bar paid" style="width:${(totalPaid / total) * 100}%"></div>
    <div class="bar pending" style="width:${(totalPending / total) * 100}%"></div>
    <div class="bar cancelled" style="width:${(totalCancelled / total) * 100}%"></div>
  `;
}

function updateFooter(rowsCount) {
  const footer = document.querySelector("footer");
  footer.textContent = `${rowsCount} Row${rowsCount !== 1 ? "s" : ""} Results`;
}

function setupAutoRefresh(interval = 20000) {
  setInterval(() => {
    // Simular atualização dos dados (pode fazer fetch se quiser)
    console.log("Refreshing data...");
    applyFilters();
  }, interval);
}

// Modal Add User
const addUserBtn = document.querySelector('.add-user-btn');
const modal = document.getElementById('add-user-modal');
const closeModalBtn = modal.querySelector('.close-modal');
const addUserForm = document.getElementById('add-user-form');

addUserBtn.addEventListener('click', () => {
  modal.style.display = 'flex';
});

closeModalBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', e => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

addUserForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Capturar valores do formulário
  const formData = new FormData(addUserForm);
  const newUser = {
    id: formData.get('id'),
    date: formData.get('date'),
    status: formData.get('status'),
    user: formData.get('user'),
    avatar: formData.get('avatar'),
    orderType: formData.get('orderType'),
    value: parseFloat(formData.get('value')),
    estoque: parseInt(formData.get('estoque')),
    produto: formData.get('produto'),
  };

  // Adicionar novo usuário na base
  baseData.push(newUser);

  // Atualizar a tabela com os dados atuais
  applyFilters();

  // Resetar formulário e fechar modal
  addUserForm.reset();
  modal.style.display = 'none';
});

// Iniciar aplicação
renderTable(baseData);
setupResizableColumns("#team-table");
enableDragAndDropHeaders();
setupAutoRefresh(20000);
