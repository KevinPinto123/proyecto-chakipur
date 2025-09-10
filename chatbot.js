// Sistema de Chatbot para Chakipur Dashboard
class ChatbotSystem {
    constructor() {
        this.isOpen = false;
        this.responses = this.getResponses();
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.loadChatHistory();
    }
    
    setupEventListeners() {
        const toggleBtn = document.getElementById('chatbotToggle');
        const closeBtn = document.getElementById('chatbotClose');
        const sendBtn = document.getElementById('chatbotSend');
        const input = document.getElementById('chatbotInput');
        
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => this.toggleChatbot());
        }
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeChatbot());
        }
        
        if (sendBtn) {
            sendBtn.addEventListener('click', () => this.sendMessage());
        }
        
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });
        }
    }
    
    toggleChatbot() {
        const window = document.getElementById('chatbotWindow');
        if (this.isOpen) {
            this.closeChatbot();
        } else {
            this.openChatbot();
        }
    }
    
    openChatbot() {
        const window = document.getElementById('chatbotWindow');
        const toggle = document.getElementById('chatbotToggle');
        
        if (window) {
            window.classList.remove('hidden');
            window.style.animation = 'slideInUp 0.3s ease-out';
            this.isOpen = true;
            
            // Cambiar icono
            if (toggle) {
                toggle.innerHTML = '<i class="fas fa-times text-xl"></i>';
            }
        }
    }
    
    closeChatbot() {
        const window = document.getElementById('chatbotWindow');
        const toggle = document.getElementById('chatbotToggle');
        
        if (window) {
            window.style.animation = 'slideOutDown 0.3s ease-in';
            setTimeout(() => {
                window.classList.add('hidden');
                this.isOpen = false;
                
                // Restaurar icono
                if (toggle) {
                    toggle.innerHTML = '<i class="fas fa-comments text-xl"></i>';
                }
            }, 300);
        }
    }
    
    sendMessage() {
        const input = document.getElementById('chatbotInput');
        const message = input.value.trim();
        
        if (message) {
            this.addMessage(message, 'user');
            input.value = '';
            
            // Simular typing
            this.showTyping();
            
            setTimeout(() => {
                this.hideTyping();
                const response = this.generateResponse(message);
                this.addMessage(response, 'bot');
            }, 1000 + Math.random() * 1000);
        }
    }
    
    addMessage(text, sender) {
        const messagesContainer = document.getElementById('chatbotMessages');
        const messageDiv = document.createElement('div');
        
        if (sender === 'user') {
            messageDiv.className = 'flex items-start space-x-2 justify-end';
            messageDiv.innerHTML = `
                <div class="bg-orange-500 text-white p-3 rounded-lg max-w-xs">
                    <p class="text-sm">${text}</p>
                </div>
                <div class="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-full">
                    <i class="fas fa-user text-orange-500 text-sm"></i>
                </div>
            `;
        } else {
            messageDiv.className = 'flex items-start space-x-2';
            messageDiv.innerHTML = `
                <div class="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-full">
                    <i class="fas fa-robot text-orange-500 text-sm"></i>
                </div>
                <div class="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg max-w-xs">
                    <p class="text-sm">${text}</p>
                </div>
            `;
        }
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Animación de entrada
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateY(10px)';
        setTimeout(() => {
            messageDiv.style.transition = 'all 0.3s ease';
            messageDiv.style.opacity = '1';
            messageDiv.style.transform = 'translateY(0)';
        }, 100);
    }
    
    showTyping() {
        const messagesContainer = document.getElementById('chatbotMessages');
        const typingDiv = document.createElement('div');
        typingDiv.id = 'typingIndicator';
        typingDiv.className = 'flex items-start space-x-2';
        typingDiv.innerHTML = `
            <div class="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-full">
                <i class="fas fa-robot text-orange-500 text-sm"></i>
            </div>
            <div class="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                <div class="flex space-x-1">
                    <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                    <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                </div>
            </div>
        `;
        
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    hideTyping() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    generateResponse(message) {
        const lowerMessage = message.toLowerCase();
        const currentLang = translator.currentLanguage;
        const responses = this.responses[currentLang];
        
        // Buscar respuesta por palabras clave
        for (const [keywords, response] of Object.entries(responses)) {
            if (keywords.split('|').some(keyword => lowerMessage.includes(keyword))) {
                if (Array.isArray(response)) {
                    return response[Math.floor(Math.random() * response.length)];
                }
                return response;
            }
        }
        
        // Respuesta por defecto
        return responses.default[Math.floor(Math.random() * responses.default.length)];
    }
    
    getResponses() {
        return {
            es: {
                'hola|hi|hello|saludos': [
                    '¡Hola! ¿En qué puedo ayudarte con el dashboard?',
                    '¡Saludos! Estoy aquí para ayudarte a entender los datos.',
                    '¡Hola! ¿Tienes alguna pregunta sobre las métricas?'
                ],
                'kpi|indicador|rendimiento': [
                    'Los KPIs muestran el rendimiento clave del sistema. Puedes ver que algunos están en estado de atención.',
                    'Los indicadores de rendimiento te ayudan a identificar áreas de mejora. ¿Te interesa alguno en particular?',
                    'Los KPIs críticos requieren atención inmediata. Te recomiendo revisar el tiempo de parada.'
                ],
                'incidente|problema|error': [
                    'Los incidentes han disminuido un 6% esta semana. Los robos siguen siendo el tipo más común.',
                    'El análisis muestra que los incidentes son más frecuentes entre las 16:00 y 20:00 horas.',
                    'Te sugiero revisar el mapa de calor para identificar las zonas con más incidentes.'
                ],
                'tendencia|trend|análisis': [
                    'Las tendencias muestran una mejora general en el tiempo de respuesta.',
                    'Los datos indican un patrón estacional en los incidentes. ¿Quieres más detalles?',
                    'La tendencia de satisfacción del usuario va en aumento, ¡excelente trabajo!'
                ],
                'tiempo|hora|horario': [
                    'Los picos de actividad ocurren entre las 18:00 y 20:00 horas.',
                    'Los lunes y viernes muestran mayor actividad de incidentes.',
                    'El tiempo promedio de respuesta ha mejorado en las últimas semanas.'
                ],
                'recomendación|consejo|sugerencia': [
                    'Te recomiendo enfocar recursos en las horas pico (18:00-20:00) para reducir incidentes.',
                    'Considera implementar medidas preventivas en las zonas rojas del mapa de calor.',
                    'El tiempo de parada puede mejorarse optimizando las rutas y horarios.'
                ],
                'ayuda|help|como': [
                    'Puedo ayudarte a interpretar los gráficos, explicar KPIs o dar recomendaciones.',
                    'Usa los botones de información (ℹ️) junto a cada gráfico para más detalles.',
                    '¿Necesitas ayuda con alguna sección específica del dashboard?'
                ],
                'export|exportar|reporte': [
                    'Puedes exportar reportes usando el botón "Exportar" en la barra superior.',
                    'Los reportes incluyen todos los gráficos y KPIs actuales.',
                    'El sistema genera reportes en PDF con los datos más recientes.'
                ],
                'default': [
                    'Interesante pregunta. ¿Podrías ser más específico sobre qué aspecto del dashboard te interesa?',
                    'No estoy seguro de entender. ¿Te refieres a alguna métrica en particular?',
                    'Puedo ayudarte con KPIs, incidentes, tendencias o análisis temporal. ¿Qué te interesa?',
                    'Intenta preguntarme sobre los gráficos, métricas o recomendaciones del dashboard.'
                ]
            },
            qu: {
                'hola|hi|hello|napaykullayki': [
                    '¡Napaykullayki! ¿Imaynatataq yanapasayki dashboard nisqawan?',
                    '¡Allinllachu! Kaypi kani willakunata hamut\'ananpaq yanapasusqayki.',
                    '¡Napaykullayki! ¿Kanchu ima tapukuy yupaykunamanta?'
                ],
                'kpi|rikuchiq|ruway': [
                    'KPI kuna rikuchinku hatun ruwaykunata. Wakin yuyaymanana kasqanku.',
                    'Ruway rikuchiqkuna yanapasunki aswan allin kananpaq. ¿Mayqintaq munasqayki?',
                    'Sasachakuy KPI kuna kunan yuyaymanay munanku. Samaynin pachata qhaway.'
                ],
                'sasachakuy|problema|pantay': [
                    'Sasachakuykuna pisiyarqan 6% kay simanapi. Suwaykuna aswan achka.',
                    'Qhaway rikuchin sasachakuykuna aswan kanku 16:00-20:00 horakunapi.',
                    'Ruphay mapata qhawayta yuyaychani aswan sasachakuy chaykunata riqsinanpaq.'
                ],
                'puriy|tendencia|qhaway': [
                    'Puriykuna rikuchinku kutichiy pacha allin kachkan.',
                    'Willakuykuna rikuchinku mit\'a puriyta sasachakuykunapi. ¿Aswan willayta munasqayki?',
                    'Llamkaqpa kusikuy puriyninqa wicharichkan, ¡allin ruway!'
                ],
                'pacha|hora|horario': [
                    'Hatun ruwaykuna kanku 18:00-20:00 horakunapi.',
                    'Lunis, Viyirnis punchawkuna aswan sasachakuy rikuchinku.',
                    'Kutichiy pacha allin kachkan qhipa simanakuna.'
                ],
                'yuyaychay|consejo|sugerencia': [
                    'Yuyaychani hatun pacha horakunapi (18:00-20:00) yanapakuykunata churay.',
                    'Ruphay mapapi puka chaykunapi hark\'ay ruwaykunata yuyaychani.',
                    'Samay pacha allin kanman ñankunata, horakunata allichaspa.'
                ],
                'yanapay|help|imayna': [
                    'Yanapasayki siq\'ikunata hamut\'ananpaq, KPI willayta utaq yuyaychaykunata qunanpaq.',
                    'Willakuy p\'utunkunata (ℹ️) llamiy sapa siq\'i qayllanpi aswan willaypaq.',
                    '¿Yanapakuy munasqayki ima huch\'uy t\'aqawan dashboard nisqamanta?'
                ],
                'lluqsichiy|exportar|willakuy': [
                    'Willakuykunata lluqsichiyta atinki "Lluqsichiy" p\'utunta llamispa.',
                    'Willakuykuna tukuy siq\'ikunata, KPI kunata churan.',
                    'Sistema PDF willakuykunata ruwan musuq willaykunawan.'
                ],
                'default': [
                    'Sumaq tapukuy. ¿Aswan sut\'ita niyta atiwaqchu ima dashboard k\'uchimanta munasqayki?',
                    'Mana allin hamut\'anichu. ¿Ima yupaymantataq nishanki?',
                    'Yanapasayki KPI, sasachakuy, puriy utaq pacha qhawaywan. ¿Imataq munasqayki?',
                    'Tapukuy siq\'ikunamanta, yupaykunamanta utaq yuyaychaykunamanta dashboard nisqamanta.'
                ]
            },
            en: {
                'hello|hi|hola|greetings': [
                    'Hello! How can I help you with the dashboard?',
                    'Hi there! I\'m here to help you understand the data.',
                    'Greetings! Do you have any questions about the metrics?'
                ],
                'kpi|indicator|performance': [
                    'KPIs show key system performance. You can see some are in warning status.',
                    'Performance indicators help identify improvement areas. Interested in any particular one?',
                    'Critical KPIs need immediate attention. I recommend reviewing downtime.'
                ],
                'incident|problem|error': [
                    'Incidents decreased 6% this week. Theft remains the most common type.',
                    'Analysis shows incidents are more frequent between 4:00-8:00 PM.',
                    'I suggest reviewing the heat map to identify high-incident zones.'
                ],
                'trend|analysis|pattern': [
                    'Trends show general improvement in response time.',
                    'Data indicates seasonal patterns in incidents. Want more details?',
                    'User satisfaction trend is increasing, excellent work!'
                ],
                'time|hour|schedule': [
                    'Activity peaks occur between 6:00-8:00 PM.',
                    'Mondays and Fridays show higher incident activity.',
                    'Average response time has improved in recent weeks.'
                ],
                'recommendation|advice|suggestion': [
                    'I recommend focusing resources during peak hours (6:00-8:00 PM) to reduce incidents.',
                    'Consider implementing preventive measures in red zones of the heat map.',
                    'Downtime can be improved by optimizing routes and schedules.'
                ],
                'help|how|guide': [
                    'I can help interpret charts, explain KPIs, or give recommendations.',
                    'Use the info buttons (ℹ️) next to each chart for more details.',
                    'Need help with any specific dashboard section?'
                ],
                'export|report|download': [
                    'You can export reports using the "Export" button in the top bar.',
                    'Reports include all current charts and KPIs.',
                    'The system generates PDF reports with the latest data.'
                ],
                'default': [
                    'Interesting question. Could you be more specific about which dashboard aspect interests you?',
                    'I\'m not sure I understand. Are you referring to any particular metric?',
                    'I can help with KPIs, incidents, trends, or time analysis. What interests you?',
                    'Try asking me about charts, metrics, or dashboard recommendations.'
                ]
            }
        };
    }
    
    loadChatHistory() {
        // Cargar historial de chat si existe
        const history = localStorage.getItem('chakipur_chat_history');
        if (history) {
            try {
                const messages = JSON.parse(history);
                messages.forEach(msg => {
                    this.addMessage(msg.text, msg.sender);
                });
            } catch (e) {
                console.log('Error loading chat history');
            }
        }
    }
    
    saveChatHistory() {
        // Guardar historial de chat
        const messages = Array.from(document.querySelectorAll('#chatbotMessages > div')).map(div => {
            const isUser = div.classList.contains('justify-end');
            const text = div.querySelector('p').textContent;
            return { text, sender: isUser ? 'user' : 'bot' };
        });
        
        localStorage.setItem('chakipur_chat_history', JSON.stringify(messages.slice(-20))); // Guardar últimos 20 mensajes
    }
}

// Inicializar chatbot
const chatbot = new ChatbotSystem();

// Exportar para uso global
window.chatbot = chatbot;