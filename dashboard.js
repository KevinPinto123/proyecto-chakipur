// Configuración de colores del tema
const colors = {
    primary: '#f97316', // Orange
    secondary: '#3b82f6', // Blue
    success: '#10b981', // Green
    warning: '#f59e0b', // Amber
    danger: '#ef4444', // Red
    gray: '#6b7280'
};

// Datos de mockup
const mockData = {
    summary: {
        responseTime: '2.3s',
        successRate: '94.2%',
        incidentCount: 127,
        userSatisfaction: '4.7/5'
    },
    
    incidentTypes: {
        labels: ['Robos', 'Accidentes', 'Averías', 'Tráfico', 'Otros'],
        data: [45, 32, 28, 15, 7],
        colors: [colors.danger, colors.warning, colors.gray, colors.secondary, colors.primary]
    },
    
    monthlyTrends: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        incidents: [85, 92, 78, 105, 127, 134, 98, 87, 112, 95, 89, 76],
        responseTime: [2.1, 2.3, 1.9, 2.8, 2.3, 2.5, 2.0, 1.8, 2.4, 2.1, 2.0, 1.9]
    },
    
    hourlyData: {
        labels: ['00', '02', '04', '06', '08', '10', '12', '14', '16', '18', '20', '22'],
        data: [5, 3, 2, 8, 15, 12, 18, 22, 25, 28, 20, 12]
    },
    
    dailyData: {
        labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
        data: [18, 22, 20, 25, 28, 15, 12]
    },
    
    kpis: [
        { indicator: 'Tiempo por tramo', current: '15.2 min', target: '12 min', status: 'warning' },
        { indicator: 'Picos horarios de demanda', current: '28 tramos/h', target: '25 tramos/h', status: 'danger' },
        { indicator: 'KM por tramo', current: '8.5 km', target: '10 km', status: 'success' },
        { indicator: 'Paradas por ubicación', current: '4.2 paradas', target: '5 paradas', status: 'success' },
        { indicator: 'Tiempo promedio de parada', current: '3.8 min', target: '3 min', status: 'warning' },
        { indicator: '% de tiempo inactivo', current: '22%', target: '15%', status: 'danger' },
        { indicator: 'Tiempo parada vs conducción', current: '1:2.5', target: '1:3', status: 'warning' },
        { indicator: 'Tiempo medio por tramo', current: '00:15:12', target: '00:12:00', status: 'warning' },
        { indicator: 'Velocidad media', current: '34 km/h', target: '40 km/h', status: 'warning' }
    ]
};

// Función para actualizar la fecha y hora
function updateDateTime() {
    const now = new Date();
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
    };
    document.getElementById('currentDateTime').textContent = now.toLocaleDateString('es-ES', options);
}

// Función para crear gráfico de barras de incidentes por tipo
function createIncidentTypeChart() {
    const ctx = document.getElementById('incidentTypeChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: mockData.incidentTypes.labels,
            datasets: [{
                label: 'Número de Incidentes',
                data: mockData.incidentTypes.data,
                backgroundColor: mockData.incidentTypes.colors,
                borderColor: mockData.incidentTypes.colors,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 10
                    }
                }
            }
        }
    });
}

// Función para crear gráfico de tendencias mensuales
function createTrendsChart() {
    const ctx = document.getElementById('trendsChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: mockData.monthlyTrends.labels,
            datasets: [{
                label: 'Incidentes',
                data: mockData.monthlyTrends.incidents,
                borderColor: colors.primary,
                backgroundColor: colors.primary + '20',
                tension: 0.4,
                yAxisID: 'y'
            }, {
                label: 'Tiempo de Respuesta (s)',
                data: mockData.monthlyTrends.responseTime,
                borderColor: colors.secondary,
                backgroundColor: colors.secondary + '20',
                tension: 0.4,
                yAxisID: 'y1'
            }]
        },
        options: {
            responsive: true,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Mes'
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Número de Incidentes'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Tiempo de Respuesta (s)'
                    },
                    grid: {
                        drawOnChartArea: false,
                    },
                }
            }
        }
    });
}

// Función para crear gráfico de incidentes por hora
function createHourlyChart() {
    const ctx = document.getElementById('hourlyChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: mockData.hourlyData.labels,
            datasets: [{
                label: 'Incidentes por Hora',
                data: mockData.hourlyData.data,
                borderColor: colors.secondary,
                backgroundColor: colors.secondary + '20',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Función para crear gráfico de incidentes por día
function createDailyChart() {
    const ctx = document.getElementById('dailyChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: mockData.dailyData.labels,
            datasets: [{
                label: 'Incidentes por Día',
                data: mockData.dailyData.data,
                backgroundColor: colors.primary,
                borderColor: colors.primary,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Función para poblar la tabla de KPIs
function populateKPITable() {
    const tbody = document.getElementById('kpiTableBody');
    tbody.innerHTML = '';
    
    mockData.kpis.forEach(kpi => {
        const row = document.createElement('tr');
        row.className = 'bg-white border-b hover:bg-gray-50';
        
        const statusColors = {
            success: 'text-green-600 bg-green-100',
            warning: 'text-yellow-600 bg-yellow-100',
            danger: 'text-red-600 bg-red-100'
        };
        
        const statusIcons = {
            success: 'fas fa-check-circle',
            warning: 'fas fa-exclamation-triangle',
            danger: 'fas fa-times-circle'
        };
        
        row.innerHTML = `
            <td class="px-6 py-4 font-medium text-gray-900">${kpi.indicator}</td>
            <td class="px-6 py-4">${kpi.current}</td>
            <td class="px-6 py-4">${kpi.target}</td>
            <td class="px-6 py-4">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[kpi.status]}">
                    <i class="${statusIcons[kpi.status]} mr-1"></i>
                    ${kpi.status === 'success' ? 'Cumplido' : kpi.status === 'warning' ? 'Atención' : 'Crítico'}
                </span>
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

// Función para actualizar las métricas del resumen
function updateSummaryMetrics(newData = null) {
    const data = newData || mockData.summary;
    
    const elements = {
        responseTime: document.getElementById('responseTime'),
        successRate: document.getElementById('successRate'),
        incidentCount: document.getElementById('incidentCount'),
        userSatisfaction: document.getElementById('userSatisfaction')
    };
    
    Object.keys(elements).forEach(key => {
        if (elements[key]) {
            const newValue = newData ? newData[key] : data[key];
            
            // Animación de cambio de valor
            elements[key].style.transform = 'scale(1.1)';
            elements[key].style.color = colors.primary;
            
            setTimeout(() => {
                elements[key].textContent = newValue;
                elements[key].style.transform = 'scale(1)';
                elements[key].style.color = '';
            }, 200);
        }
    });
}

// Función de inicialización
function initDashboard() {
    // Verificar autenticación
    if (!authSystem.isUserAuthenticated()) {
        window.location.href = 'login.html';
        return;
    }
    
    // Configurar usuario
    setupUserInterface();
    
    // Configurar tema
    setupTheme();
    
    // Inicializar componentes
    updateDateTime();
    updateSummaryMetrics();
    createIncidentTypeChart();
    createTrendsChart();
    createHourlyChart();
    createDailyChart();
    populateKPITable();
    
    // Configurar navegación suave
    setupSmoothScrolling();
    
    // Configurar menú de usuario
    setupUserMenu();
    
    // Actualizar fecha y hora cada minuto
    setInterval(updateDateTime, 60000);
    
    // Auto-refresh de datos cada 5 minutos
    setInterval(updateDashboardData, 300000);
}

// Configurar interfaz de usuario
function setupUserInterface() {
    const user = authSystem.getCurrentUser();
    if (user) {
        document.getElementById('userName').textContent = user.name;
        document.getElementById('userAvatar').src = user.avatar;
    }
}

// Configurar tema
function setupTheme() {
    const savedTheme = localStorage.getItem('chakipur_theme') || 'light';
    applyTheme(savedTheme);
    
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

// Aplicar tema
function applyTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    
    // Actualizar gráficos con colores del tema
    updateChartsTheme(theme);
}

// Alternar tema
function toggleTheme() {
    const isDark = document.documentElement.classList.contains('dark');
    const newTheme = isDark ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('chakipur_theme', newTheme);
}

// Actualizar colores de gráficos según el tema
function updateChartsTheme(theme) {
    const textColor = theme === 'dark' ? '#f9fafb' : '#374151';
    const gridColor = theme === 'dark' ? '#4b5563' : '#e5e7eb';
    
    Chart.defaults.color = textColor;
    Chart.defaults.borderColor = gridColor;
    Chart.defaults.backgroundColor = gridColor;
}

// Configurar navegación suave
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Configurar menú de usuario
function setupUserMenu() {
    const userMenuBtn = document.getElementById('userMenuBtn');
    const userDropdown = document.getElementById('userDropdown');
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (userMenuBtn && userDropdown) {
        userMenuBtn.addEventListener('click', () => {
            userDropdown.classList.toggle('hidden');
        });
        
        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!userMenuBtn.contains(e.target) && !userDropdown.contains(e.target)) {
                userDropdown.classList.add('hidden');
            }
        });
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            authSystem.logout();
        });
    }
}

// Actualizar datos del dashboard
function updateDashboardData() {
    // Simular actualización de datos
    const newData = generateRandomData();
    updateSummaryMetrics(newData);
    
    // Mostrar indicador de actualización
    showUpdateIndicator();
}

// Generar datos aleatorios para simulación
function generateRandomData() {
    return {
        responseTime: (2.0 + Math.random() * 0.8).toFixed(1) + 's',
        successRate: (93 + Math.random() * 3).toFixed(1) + '%',
        incidentCount: Math.floor(120 + Math.random() * 20),
        userSatisfaction: (4.5 + Math.random() * 0.5).toFixed(1) + '/5'
    };
}

// Mostrar indicador de actualización
function showUpdateIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'fixed top-20 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm z-50';
    indicator.innerHTML = '<i class="fas fa-sync-alt mr-1"></i>Datos actualizados';
    
    document.body.appendChild(indicator);
    
    setTimeout(() => {
        indicator.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(indicator);
        }, 300);
    }, 2000);
}

// Inicializar el dashboard cuando se carga la página
document.addEventListener('DOMContentLoaded', initDashboard);