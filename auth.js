// Sistema de Autenticación para Chakipur Dashboard
class AuthSystem {
    constructor() {
        this.isAuthenticated = false;
        this.currentUser = null;
        this.init();
    }
    
    init() {
        this.setupThemeToggle();
        this.setupLoginForm();
        this.setupGoogleLogin();
        this.checkAuthStatus();
    }
    
    setupThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        const savedTheme = localStorage.getItem('chakipur_theme') || 'light';
        
        this.applyTheme(savedTheme);
        
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                this.applyTheme(newTheme);
                localStorage.setItem('chakipur_theme', newTheme);
            });
        }
    }
    
    applyTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }
    
    setupLoginForm() {
        const loginForm = document.getElementById('loginForm');
        const togglePassword = document.getElementById('togglePassword');
        
        if (togglePassword) {
            togglePassword.addEventListener('click', () => {
                const passwordInput = document.getElementById('password');
                const icon = togglePassword.querySelector('i');
                
                if (passwordInput.type === 'password') {
                    passwordInput.type = 'text';
                    icon.classList.remove('fa-eye');
                    icon.classList.add('fa-eye-slash');
                } else {
                    passwordInput.type = 'password';
                    icon.classList.remove('fa-eye-slash');
                    icon.classList.add('fa-eye');
                }
            });
        }
        
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }
    }
    
    setupGoogleLogin() {
        const googleLoginBtn = document.getElementById('googleLogin');
        if (googleLoginBtn) {
            googleLoginBtn.addEventListener('click', () => {
                this.handleGoogleLogin();
            });
        }
    }
    
    async handleLogin() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Mostrar loading
        this.showLoading();
        
        // Simular autenticación (reemplazar con API real)
        setTimeout(() => {
            if (this.validateCredentials(email, password)) {
                this.loginSuccess({
                    email: email,
                    name: email.split('@')[0],
                    avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=f97316&color=fff`
                });
            } else {
                this.loginError('Credenciales inválidas');
            }
            this.hideLoading();
        }, 1500);
    }
    
    handleGoogleLogin() {
        // Simular login con Google (reemplazar con Google OAuth real)
        this.showLoading();
        
        setTimeout(() => {
            this.loginSuccess({
                email: 'usuario@gmail.com',
                name: 'Usuario Demo',
                avatar: 'https://ui-avatars.com/api/?name=Usuario+Demo&background=4285f4&color=fff',
                provider: 'google'
            });
            this.hideLoading();
        }, 1000);
    }
    
    validateCredentials(email, password) {
        // Validación simple para demo (reemplazar con validación real)
        const validUsers = [
            { email: 'admin@chakipur.com', password: 'admin123' },
            { email: 'demo@chakipur.com', password: 'demo123' },
            { email: 'test@test.com', password: 'test123' }
        ];
        
        return validUsers.some(user => user.email === email && user.password === password);
    }
    
    loginSuccess(user) {
        this.isAuthenticated = true;
        this.currentUser = user;
        
        // Guardar sesión
        localStorage.setItem('chakipur_auth', JSON.stringify({
            isAuthenticated: true,
            user: user,
            timestamp: Date.now()
        }));
        
        // Mostrar mensaje de éxito
        this.showMessage('¡Bienvenido! Redirigiendo al dashboard...', 'success');
        
        // Redireccionar al dashboard
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }
    
    loginError(message) {
        this.showMessage(message, 'error');
    }
    
    logout() {
        this.isAuthenticated = false;
        this.currentUser = null;
        localStorage.removeItem('chakipur_auth');
        window.location.href = 'login.html';
    }
    
    checkAuthStatus() {
        const authData = localStorage.getItem('chakipur_auth');
        
        if (authData) {
            try {
                const parsed = JSON.parse(authData);
                const isExpired = Date.now() - parsed.timestamp > 24 * 60 * 60 * 1000; // 24 horas
                
                if (parsed.isAuthenticated && !isExpired) {
                    this.isAuthenticated = true;
                    this.currentUser = parsed.user;
                    
                    // Si estamos en login.html y ya estamos autenticados, redirigir
                    if (window.location.pathname.includes('login.html')) {
                        window.location.href = 'index.html';
                    }
                } else {
                    // Sesión expirada
                    localStorage.removeItem('chakipur_auth');
                    if (!window.location.pathname.includes('login.html')) {
                        window.location.href = 'login.html';
                    }
                }
            } catch (e) {
                localStorage.removeItem('chakipur_auth');
            }
        } else {
            // No hay sesión, redirigir a login si no estamos ya ahí
            if (!window.location.pathname.includes('login.html')) {
                window.location.href = 'login.html';
            }
        }
    }
    
    showLoading() {
        const submitBtn = document.querySelector('button[type="submit"]');
        const googleBtn = document.getElementById('googleLogin');
        
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Iniciando sesión...';
        }
        
        if (googleBtn) {
            googleBtn.disabled = true;
        }
    }
    
    hideLoading() {
        const submitBtn = document.querySelector('button[type="submit"]');
        const googleBtn = document.getElementById('googleLogin');
        
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = translator.t('login.signin');
        }
        
        if (googleBtn) {
            googleBtn.disabled = false;
        }
    }
    
    showMessage(message, type = 'info') {
        // Crear elemento de mensaje
        const messageDiv = document.createElement('div');
        messageDiv.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 transform transition-all duration-300 ${
            type === 'success' ? 'bg-green-500 text-white' :
            type === 'error' ? 'bg-red-500 text-white' :
            'bg-blue-500 text-white'
        }`;
        messageDiv.innerHTML = `
            <div class="flex items-center space-x-2">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(messageDiv);
        
        // Animar entrada
        setTimeout(() => {
            messageDiv.style.transform = 'translateX(0)';
        }, 100);
        
        // Remover después de 3 segundos
        setTimeout(() => {
            messageDiv.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(messageDiv);
            }, 300);
        }, 3000);
    }
    
    getCurrentUser() {
        return this.currentUser;
    }
    
    isUserAuthenticated() {
        return this.isAuthenticated;
    }
}

// Inicializar sistema de autenticación
const authSystem = new AuthSystem();

// Exportar para uso global
window.authSystem = authSystem;