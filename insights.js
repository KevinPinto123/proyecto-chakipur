// Sistema de Insights y Recomendaciones para Chakipur Dashboard
class InsightsSystem {
    constructor() {
        this.insights = this.generateInsights();
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupInfoTooltips();
    }
    
    setupEventListeners() {
        const insightsBtn = document.getElementById('insightsBtn');
        const recommendationsBtn = document.getElementById('recommendationsBtn');
        const closeInsights = document.getElementById('closeInsights');
        const refreshBtn = document.getElementById('refreshBtn');
        const exportBtn = document.getElementById('exportBtn');
        const helpBtn = document.getElementById('helpBtn');
        
        if (insightsBtn) {
            insightsBtn.addEventListener('click', () => this.showInsights());
        }
        
        if (recommendationsBtn) {
            recommendationsBtn.addEventListener('click', () => this.showRecommendations());
        }
        
        if (closeInsights) {
            closeInsights.addEventListener('click', () => this.hideInsights());
        }
        
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => this.refreshData());
        }
        
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportReport());
        }
        
        if (helpBtn) {
            helpBtn.addEventListener('click', () => this.showHelp());
        }
    }
    
    setupInfoTooltips() {
        const infoButtons = document.querySelectorAll('.info-btn');
        const tooltip = document.getElementById('infoTooltip');
        
        infoButtons.forEach(btn => {
            btn.addEventListener('mouseenter', (e) => {
                const infoType = e.target.closest('.info-btn').getAttribute('data-info');
                this.showTooltip(e, infoType);
            });
            
            btn.addEventListener('mouseleave', () => {
                this.hideTooltip();
            });
        });
    }
    
    showTooltip(event, infoType) {
        const tooltip = document.getElementById('infoTooltip');
        const content = document.getElementById('tooltipContent');
        const currentLang = translator.currentLanguage;
        
        const tooltipTexts = {
            es: {
                'incidents-type': 'Este gráfico muestra la distribución de incidentes por categoría. Los robos representan el 35% del total.',
                'heatmap': 'Mapa de calor que visualiza las zonas con mayor concentración de incidentes. Las áreas rojas requieren mayor atención.',
                'trends': 'Análisis temporal que muestra la evolución de incidentes y tiempo de respuesta a lo largo del tiempo.',
                'hourly': 'Distribución de incidentes por hora del día. Identifica los momentos de mayor actividad.',
                'daily': 'Frecuencia de incidentes por día de la semana. Útil para planificación de recursos.',
                'kpis': 'Indicadores clave de rendimiento que miden la eficiencia operativa del sistema.'
            },
            qu: {
                'incidents-type': 'Kay siq\'i rikuchin sasachakuykunata laya kaqman hina. Suwaykuna 35% tukuymanta.',
                'heatmap': 'Ruphay mapa rikuchin maypi aswan sasachakuykuna kanku. Puka chaykunapi aswan yuyaymanay.',
                'trends': 'Pacha qhaway rikuchin sasachakuykuna, kutichiy pacha purisqanta.',
                'hourly': 'Sasachakuykuna hora sapa. Rikuchin mayqin pachapi aswan ruway.',
                'daily': 'Sasachakuykuna punchaw sapa simanapi. Allin yanapakuy churaykunapaq.',
                'kpis': 'Hatun rikuchiqkuna tupunki sistema ruway allin kasqanta.'
            },
            en: {
                'incidents-type': 'This chart shows incident distribution by category. Theft represents 35% of the total.',
                'heatmap': 'Heat map visualizing zones with highest incident concentration. Red areas need more attention.',
                'trends': 'Temporal analysis showing evolution of incidents and response time over time.',
                'hourly': 'Incident distribution by hour of day. Identifies peak activity periods.',
                'daily': 'Incident frequency by day of week. Useful for resource planning.',
                'kpis': 'Key performance indicators measuring operational system efficiency.'
            }
        };
        
        const text = tooltipTexts[currentLang][infoType] || tooltipTexts.es[infoType];
        content.textContent = text;
        
        tooltip.classList.remove('hidden');
        tooltip.style.left = event.pageX + 10 + 'px';
        tooltip.style.top = event.pageY - 10 + 'px';
    }
    
    hideTooltip() {
        const tooltip = document.getElementById('infoTooltip');
        tooltip.classList.add('hidden');
    }
    
    showInsights() {
        const modal = document.getElementById('insightsModal');
        const content = document.getElementById('insightsContent');
        
        content.innerHTML = this.generateInsightsHTML();
        modal.classList.remove('hidden');
        
        // Animación de entrada
        setTimeout(() => {
            modal.querySelector('.bg-white').style.transform = 'scale(1)';
            modal.querySelector('.bg-white').style.opacity = '1';
        }, 100);
    }
    
    showRecommendations() {
        const modal = document.getElementById('insightsModal');
        const content = document.getElementById('insightsContent');
        
        content.innerHTML = this.generateRecommendationsHTML();
        modal.classList.remove('hidden');
        
        // Cambiar título
        modal.querySelector('h2').textContent = translator.t('insights.recommendations');
    }
    
    hideInsights() {
        const modal = document.getElementById('insightsModal');
        modal.classList.add('hidden');
    }
    
    generateInsightsHTML() {
        const currentLang = translator.currentLanguage;
        const insights = this.insights[currentLang];
        
        return `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Performance Analysis -->
                <div class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-lg">
                    <div class="flex items-center mb-4">
                        <div class="bg-blue-500 p-2 rounded-lg mr-3">
                            <i class="fas fa-chart-line text-white"></i>
                        </div>
                        <h3 class="text-lg font-semibold text-gray-800 dark:text-white">${translator.t('insights.performance')}</h3>
                    </div>
                    <ul class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                        ${insights.performance.map(item => `<li class="flex items-start"><i class="fas fa-check-circle text-green-500 mr-2 mt-0.5"></i>${item}</li>`).join('')}
                    </ul>
                </div>
                
                <!-- Key Findings -->
                <div class="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-6 rounded-lg">
                    <div class="flex items-center mb-4">
                        <div class="bg-orange-500 p-2 rounded-lg mr-3">
                            <i class="fas fa-lightbulb text-white"></i>
                        </div>
                        <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Hallazgos Clave</h3>
                    </div>
                    <ul class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                        ${insights.findings.map(item => `<li class="flex items-start"><i class="fas fa-star text-orange-500 mr-2 mt-0.5"></i>${item}</li>`).join('')}
                    </ul>
                </div>
                
                <!-- Trends -->
                <div class="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-lg">
                    <div class="flex items-center mb-4">
                        <div class="bg-green-500 p-2 rounded-lg mr-3">
                            <i class="fas fa-trending-up text-white"></i>
                        </div>
                        <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Tendencias</h3>
                    </div>
                    <ul class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                        ${insights.trends.map(item => `<li class="flex items-start"><i class="fas fa-arrow-up text-green-500 mr-2 mt-0.5"></i>${item}</li>`).join('')}
                    </ul>
                </div>
                
                <!-- Alerts -->
                <div class="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 p-6 rounded-lg">
                    <div class="flex items-center mb-4">
                        <div class="bg-red-500 p-2 rounded-lg mr-3">
                            <i class="fas fa-exclamation-triangle text-white"></i>
                        </div>
                        <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Alertas</h3>
                    </div>
                    <ul class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                        ${insights.alerts.map(item => `<li class="flex items-start"><i class="fas fa-warning text-red-500 mr-2 mt-0.5"></i>${item}</li>`).join('')}
                    </ul>
                </div>
            </div>
            
            <!-- Action Buttons -->
            <div class="mt-8 flex flex-wrap gap-4 justify-center">
                <button onclick="insightsSystem.showRecommendations()" class="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors">
                    <i class="fas fa-magic mr-2"></i>Ver Recomendaciones
                </button>
                <button onclick="insightsSystem.exportInsights()" class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                    <i class="fas fa-download mr-2"></i>Exportar Análisis
                </button>
            </div>
        `;
    }
    
    generateRecommendationsHTML() {
        const currentLang = translator.currentLanguage;
        const recommendations = this.insights[currentLang].recommendations;
        
        return `
            <div class="space-y-6">
                ${recommendations.map((rec, index) => `
                    <div class="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 p-6 rounded-lg border-l-4 border-orange-500">
                        <div class="flex items-start space-x-4">
                            <div class="bg-orange-500 text-white p-2 rounded-full flex-shrink-0">
                                <span class="font-bold">${index + 1}</span>
                            </div>
                            <div class="flex-1">
                                <h4 class="font-semibold text-gray-800 dark:text-white mb-2">${rec.title}</h4>
                                <p class="text-gray-600 dark:text-gray-300 mb-3">${rec.description}</p>
                                <div class="flex items-center space-x-4 text-sm">
                                    <span class="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-1 rounded">
                                        <i class="fas fa-clock mr-1"></i>${rec.timeframe}
                                    </span>
                                    <span class="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded">
                                        <i class="fas fa-chart-line mr-1"></i>${rec.impact}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <!-- Next Steps -->
            <div class="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-lg">
                <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                    <i class="fas fa-route mr-2 text-blue-500"></i>${translator.t('insights.nextSteps')}
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="text-center">
                        <div class="bg-blue-500 text-white p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                            <i class="fas fa-calendar-alt"></i>
                        </div>
                        <h4 class="font-medium text-gray-800 dark:text-white">Planificar</h4>
                        <p class="text-sm text-gray-600 dark:text-gray-300">Implementar cambios gradualmente</p>
                    </div>
                    <div class="text-center">
                        <div class="bg-orange-500 text-white p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                            <i class="fas fa-cogs"></i>
                        </div>
                        <h4 class="font-medium text-gray-800 dark:text-white">Ejecutar</h4>
                        <p class="text-sm text-gray-600 dark:text-gray-300">Aplicar recomendaciones prioritarias</p>
                    </div>
                    <div class="text-center">
                        <div class="bg-green-500 text-white p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                            <i class="fas fa-chart-bar"></i>
                        </div>
                        <h4 class="font-medium text-gray-800 dark:text-white">Monitorear</h4>
                        <p class="text-sm text-gray-600 dark:text-gray-300">Seguir el progreso de mejoras</p>
                    </div>
                </div>
            </div>
        `;
    }
    
    generateInsights() {
        return {
            es: {
                performance: [
                    'El tiempo de respuesta promedio ha mejorado 8.7% en las últimas 2 semanas',
                    'La tasa de éxito se mantiene estable en 94.2%, superando el objetivo del 90%',
                    'Los incidentes han disminuido 6% comparado con el período anterior',
                    'La satisfacción del usuario aumentó 0.1 puntos, alcanzando 4.7/5'
                ],
                findings: [
                    'Los robos representan el 35% de todos los incidentes registrados',
                    'El pico de actividad ocurre entre las 18:00 y 20:00 horas',
                    'Los viernes muestran 23% más incidentes que el promedio semanal',
                    'Las zonas norte y centro concentran el 60% de los incidentes'
                ],
                trends: [
                    'Tendencia descendente en incidentes durante los últimos 3 meses',
                    'Mejora constante en tiempo de respuesta desde agosto',
                    'Incremento gradual en satisfacción del usuario',
                    'Reducción del 15% en tiempo de inactividad del sistema'
                ],
                alerts: [
                    'El tiempo de parada supera el objetivo en 47%',
                    'Picos horarios de demanda exceden la capacidad planificada',
                    '22% de tiempo inactivo requiere atención inmediata',
                    'Velocidad media está 15% por debajo del objetivo'
                ],
                recommendations: [
                    {
                        title: 'Optimizar Horarios de Mayor Demanda',
                        description: 'Incrementar recursos durante las horas pico (18:00-20:00) para reducir incidentes y mejorar tiempo de respuesta.',
                        timeframe: '2-4 semanas',
                        impact: 'Alto impacto'
                    },
                    {
                        title: 'Implementar Medidas Preventivas',
                        description: 'Establecer controles adicionales en zonas rojas del mapa de calor para prevenir robos y accidentes.',
                        timeframe: '1-2 meses',
                        impact: 'Medio impacto'
                    },
                    {
                        title: 'Mejorar Eficiencia Operativa',
                        description: 'Optimizar rutas y reducir tiempos de parada para aumentar la velocidad media y reducir inactividad.',
                        timeframe: '3-6 meses',
                        impact: 'Alto impacto'
                    },
                    {
                        title: 'Programa de Capacitación',
                        description: 'Entrenar al personal en mejores prácticas para mantener la tendencia positiva en satisfacción del usuario.',
                        timeframe: '1 mes',
                        impact: 'Medio impacto'
                    }
                ]
            },
            qu: {
                performance: [
                    'Kutichiy pacha allin kachkan 8.7% qhipa 2 simanakuna',
                    'Allin ruway 94.2% sayasqa, 90% munasqamanta aswan',
                    'Sasachakuykuna pisiyarqan 6% ñawpaq pachawan tupasqa',
                    'Llamkaqpa kusikuy wicharirqan 0.1, 4.7/5 chayaspa'
                ],
                findings: [
                    'Suwaykuna 35% tukuy sasachakuykunamanta',
                    'Hatun ruway 18:00-20:00 horakunapi',
                    'Viyirnis punchawkuna 23% aswan sasachakuy sapa simana',
                    'Chinchay, chawpi chaykunapi 60% sasachakuykuna'
                ],
                trends: [
                    'Sasachakuykuna pisiyachkan qhipa 3 killakunapi',
                    'Kutichiy pacha sapa kuti allin kachkan agosto kaqmanta',
                    'Llamkaqpa kusikuy pisi pisi wicharichkan',
                    'Sistema mana ruway pacha 15% pisiyarqan'
                ],
                alerts: [
                    'Samay pacha munasqamanta 47% aswan',
                    'Hora pico mañakuykuna planificasqa capacidadmanta aswan',
                    '22% mana ruway pacha kunan yuyaymanay munan',
                    'Utqaylla puriy munasqamanta 15% aswan pisi'
                ],
                recommendations: [
                    {
                        title: 'Hatun Mañakuy Horakunata Allichay',
                        description: 'Hatun pacha horakunapi (18:00-20:00) yanapakuykunata yapay sasachakuykunata pisiyachinapaq.',
                        timeframe: '2-4 simana',
                        impact: 'Hatun llamkay'
                    },
                    {
                        title: 'Hark\'ay Ruwaykunata Churay',
                        description: 'Ruphay mapapi puka chaykunapi yapaq kontrolkunata churay suway, accidentekunata hark\'anapaq.',
                        timeframe: '1-2 killa',
                        impact: 'Chawpi llamkay'
                    },
                    {
                        title: 'Ruway Allin Kayta Allichay',
                        description: 'Ñankunata allichay, samay pachata pisiyachiy utqaylla puriyta yapananpaq.',
                        timeframe: '3-6 killa',
                        impact: 'Hatun llamkay'
                    },
                    {
                        title: 'Yachachiy Programa',
                        description: 'Runakunata yachachiy allin ruwaykunapi llamkaqpa kusikuy allin kananpaq.',
                        timeframe: '1 killa',
                        impact: 'Chawpi llamkay'
                    }
                ]
            },
            en: {
                performance: [
                    'Average response time improved 8.7% in the last 2 weeks',
                    'Success rate remains stable at 94.2%, exceeding the 90% target',
                    'Incidents decreased 6% compared to previous period',
                    'User satisfaction increased 0.1 points, reaching 4.7/5'
                ],
                findings: [
                    'Theft represents 35% of all recorded incidents',
                    'Peak activity occurs between 6:00-8:00 PM',
                    'Fridays show 23% more incidents than weekly average',
                    'North and central zones concentrate 60% of incidents'
                ],
                trends: [
                    'Downward trend in incidents over the last 3 months',
                    'Consistent improvement in response time since August',
                    'Gradual increase in user satisfaction',
                    '15% reduction in system downtime'
                ],
                alerts: [
                    'Downtime exceeds target by 47%',
                    'Peak hour demand exceeds planned capacity',
                    '22% inactive time requires immediate attention',
                    'Average speed is 15% below target'
                ],
                recommendations: [
                    {
                        title: 'Optimize Peak Demand Hours',
                        description: 'Increase resources during peak hours (6:00-8:00 PM) to reduce incidents and improve response time.',
                        timeframe: '2-4 weeks',
                        impact: 'High impact'
                    },
                    {
                        title: 'Implement Preventive Measures',
                        description: 'Establish additional controls in red zones of heat map to prevent theft and accidents.',
                        timeframe: '1-2 months',
                        impact: 'Medium impact'
                    },
                    {
                        title: 'Improve Operational Efficiency',
                        description: 'Optimize routes and reduce downtime to increase average speed and reduce inactivity.',
                        timeframe: '3-6 months',
                        impact: 'High impact'
                    },
                    {
                        title: 'Training Program',
                        description: 'Train staff in best practices to maintain positive trend in user satisfaction.',
                        timeframe: '1 month',
                        impact: 'Medium impact'
                    }
                ]
            }
        };
    }
    
    refreshData() {
        // Simular actualización de datos
        const btn = document.getElementById('refreshBtn');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Actualizando...';
        btn.disabled = true;
        
        setTimeout(() => {
            // Actualizar métricas con nuevos valores simulados
            this.updateMetrics();
            
            btn.innerHTML = originalText;
            btn.disabled = false;
            
            // Mostrar notificación
            this.showNotification('Datos actualizados correctamente', 'success');
        }, 2000);
    }
    
    updateMetrics() {
        // Simular nuevos valores
        const metrics = {
            responseTime: (2.0 + Math.random() * 0.8).toFixed(1) + 's',
            successRate: (93 + Math.random() * 3).toFixed(1) + '%',
            incidentCount: Math.floor(120 + Math.random() * 20),
            userSatisfaction: (4.5 + Math.random() * 0.5).toFixed(1) + '/5'
        };
        
        Object.keys(metrics).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                element.textContent = metrics[key];
                element.parentElement.parentElement.style.animation = 'pulse 0.5s ease-in-out';
            }
        });
    }
    
    exportReport() {
        const btn = document.getElementById('exportBtn');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Exportando...';
        btn.disabled = true;
        
        setTimeout(() => {
            // Simular exportación
            this.generatePDFReport();
            
            btn.innerHTML = originalText;
            btn.disabled = false;
            
            this.showNotification('Reporte exportado exitosamente', 'success');
        }, 3000);
    }
    
    generatePDFReport() {
        // Simular generación de PDF
        const link = document.createElement('a');
        link.href = 'data:text/plain;charset=utf-8,Chakipur Dashboard Report - ' + new Date().toLocaleDateString();
        link.download = 'chakipur-report-' + new Date().toISOString().split('T')[0] + '.txt';
        link.click();
    }
    
    showHelp() {
        // Abrir chatbot con mensaje de ayuda
        if (window.chatbot) {
            window.chatbot.openChatbot();
            setTimeout(() => {
                window.chatbot.addMessage('¿Necesitas ayuda navegando el dashboard? Puedo explicarte cualquier sección o métrica.', 'bot');
            }, 500);
        }
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 transform transition-all duration-300 ${
            type === 'success' ? 'bg-green-500 text-white' :
            type === 'error' ? 'bg-red-500 text-white' :
            'bg-blue-500 text-white'
        }`;
        notification.innerHTML = `
            <div class="flex items-center space-x-2">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Inicializar sistema de insights
const insightsSystem = new InsightsSystem();

// Exportar para uso global
window.insightsSystem = insightsSystem;