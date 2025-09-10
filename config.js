// Configuración del Dashboard Chakipur
const dashboardConfig = {
    // Configuración de actualización automática
    autoRefresh: {
        enabled: true,
        interval: 300000, // 5 minutos en milisegundos
        endpoints: {
            summary: '/api/summary',
            incidents: '/api/incidents',
            trends: '/api/trends',
            kpis: '/api/kpis'
        }
    },
    
    // Configuración de gráficos
    chartDefaults: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    padding: 20
                }
            }
        },
        elements: {
            point: {
                radius: 4,
                hoverRadius: 6
            },
            line: {
                tension: 0.4
            }
        }
    },
    
    // Configuración de alertas
    alerts: {
        responseTimeThreshold: 3.0, // segundos
        successRateThreshold: 90, // porcentaje
        incidentCountThreshold: 150,
        userSatisfactionThreshold: 4.0
    },
    
    // Configuración de KPIs
    kpiThresholds: {
        'Tiempo por tramo': { warning: 15, critical: 18 },
        'Picos horarios de demanda': { warning: 25, critical: 30 },
        'KM por tramo': { warning: 8, critical: 6 },
        'Paradas por ubicación': { warning: 4, critical: 3 },
        'Tiempo promedio de parada': { warning: 4, critical: 5 },
        '% de tiempo inactivo': { warning: 20, critical: 25 },
        'Tiempo parada vs conducción': { warning: 2.0, critical: 1.5 },
        'Tiempo medio por tramo': { warning: 15, critical: 18 },
        'Velocidad media': { warning: 30, critical: 25 }
    },
    
    // Configuración de localización
    locale: {
        language: 'es-ES',
        currency: 'EUR',
        dateFormat: {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }
    },
    
    // Configuración de exportación
    export: {
        formats: ['pdf', 'excel', 'csv'],
        defaultFormat: 'pdf',
        includeCharts: true,
        includeKPIs: true
    },
    
    // Configuración de notificaciones
    notifications: {
        enabled: true,
        types: {
            critical: { color: '#ef4444', sound: true },
            warning: { color: '#f59e0b', sound: false },
            info: { color: '#3b82f6', sound: false },
            success: { color: '#10b981', sound: false }
        }
    },
    
    // Configuración de tema
    theme: {
        primary: '#f97316',
        secondary: '#3b82f6',
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
        gray: '#6b7280',
        darkMode: false
    }
};

// Función para obtener configuración
function getConfig(path) {
    return path.split('.').reduce((obj, key) => obj && obj[key], dashboardConfig);
}

// Función para actualizar configuración
function updateConfig(path, value) {
    const keys = path.split('.');
    const lastKey = keys.pop();
    const target = keys.reduce((obj, key) => obj[key], dashboardConfig);
    target[lastKey] = value;
}

// Exportar configuración si se usa como módulo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { dashboardConfig, getConfig, updateConfig };
}