const chartDataSets = {
  usuarios: {
    label: 'Crescimento de Usuários',
    data: [500, 900, 1300, 2400, 3700, 5672, 6200, 7100, 8000, 9000, 10500, 12000],
    borderColor: '#0077b6',
    bgColor: 'rgba(0, 119, 182, 0.15)'
  },
  receita: {
    label: 'Faturamento (R$)',
    data: [11000, 12500, 13000, 14000, 15200, 15320, 15800, 16000, 16500, 17000, 17500, 18000],
    borderColor: '#0096c7',
    bgColor: 'rgba(0, 150, 199, 0.15)'
  },
  vendas: {
    label: 'Total de Vendas',
    data: [800, 900, 1100, 1200, 1300, 1245, 1300, 1350, 1400, 1500, 1550, 1600],
    borderColor: '#ff9900',
    bgColor: 'rgba(255, 153, 0, 0.15)'
  },
  clientes: {
    label: 'Clientes Ativos',
    data: [1500, 2000, 2800, 3500, 3700, 3829, 3900, 4000, 4100, 4200, 4300, 4400],
    borderColor: '#00b48a',
    bgColor: 'rgba(0, 180, 138, 0.15)'
  },
  financeiro: {
    label: 'Desempenho Financeiro',
    data: [45000, 47000, 49000, 50000, 52000, 52430, 53000, 54000, 55000, 56000, 57000, 58000],
    borderColor: '#6a4c93',
    bgColor: 'rgba(106, 76, 147, 0.15)'
  },
  movimentacoes: {
    label: 'Operações Realizadas',
    data: [1000, 1100, 1200, 1150, 1120, 1120, 1150, 1170, 1200, 1250, 1300, 1350],
    borderColor: '#f94144',
    bgColor: 'rgba(249, 65, 68, 0.15)'
  }
};

const ctx = document.getElementById('mainChart').getContext('2d');
let currentKey = 'usuarios';

const labels12months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

function isDarkMode() {
  return document.body.classList.contains('dark');
}

function generatePointColors(data) {
  return data.map((value, index) => {
    const prev = index === 0 ? value : data[index - 1];
    return value >= prev ? '#4caf50' : '#e63946'; // verde se subiu, vermelho se caiu
  });
}

function createChartConfig(key) {
  const dataset = chartDataSets[key];
  const pointColors = generatePointColors(dataset.data);

  return {
    type: 'line',
    data: {
      labels: labels12months,
      datasets: [{
        label: dataset.label,
        data: dataset.data,
        borderColor: dataset.borderColor,
        backgroundColor: dataset.bgColor,
        fill: true,
        tension: 0.3,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: pointColors,
        pointBorderWidth: 2,
        pointBorderColor: isDarkMode() ? '#121b26' : '#fff',
        borderWidth: 2,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: { color: isDarkMode() ? '#d1d9e6' : '#023047' },
          grid: { color: isDarkMode() ? '#384659' : '#ddd' }
        },
        x: {
          ticks: { color: isDarkMode() ? '#d1d9e6' : '#023047' },
          grid: { display: false }
        }
      },
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: {
            font: { size: 14 },
            color: isDarkMode() ? '#d1d9e6' : '#0077b6'
          }
        }
      },
      interaction: {
        mode: 'nearest',
        intersect: false
      }
    }
  };
}

let chart = new Chart(ctx, createChartConfig(currentKey));

function updateChart(key) {
  currentKey = key;
  chart.destroy();
  chart = new Chart(ctx, createChartConfig(key));

  document.getElementById('chartLabel').textContent = `${chartDataSets[key].label} nos últimos 12 meses`;
  document.getElementById('chartTitle').textContent = `${chartDataSets[key].label} do ano 2025`;
}

document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    if (card.classList.contains('active')) return;
    document.querySelectorAll('.card').forEach(c => c.classList.remove('active'));
    card.classList.add('active');
    updateChart(card.getAttribute('data-key'));
  });
});

document.getElementById('exportBtn').addEventListener('click', () => {
  const rows = [['Indicador', 'Valor', 'Variação']];
  document.querySelectorAll('.card').forEach(card => {
    const title = card.querySelector('h2').textContent;
    const value = card.querySelector('.value').textContent;
    const change = card.querySelector('.change').textContent;
    rows.push([title, value, change]);
  });
  const csvContent = rows.map(r => r.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'dashboard.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
});

const toggleThemeBtn = document.getElementById('toggleTheme');
toggleThemeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  toggleThemeBtn.textContent = isDarkMode() ? 'Modo Claro' : 'Modo Escuro';
  updateChart(currentKey);
});
