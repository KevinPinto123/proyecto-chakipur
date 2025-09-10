# Chakipur Dashboard

Un dashboard web completo para visualizar métricas clave y tendencias de incidentes y desempeño.

## 🚀 Características

### Secciones Principales

1. **Resumen General**
   - Tiempo de respuesta
   - Tasa de éxito
   - Número de incidentes
   - Satisfacción del usuario

2. **Análisis de Incidentes**
   - Gráfico de barras por tipo de incidente
   - Placeholder para mapa de calor de ubicaciones

3. **Análisis de Tendencias**
   - Gráfico de líneas con tendencias mensuales
   - Comparación de incidentes vs tiempo de respuesta

4. **Análisis de Tiempo**
   - Distribución de incidentes por hora
   - Distribución de incidentes por día de la semana

5. **KPIs (Indicadores Clave de Rendimiento)**
   - Tabla completa con 9 KPIs principales
   - Estados visuales (Cumplido, Atención, Crítico)

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **Tailwind CSS**: Framework CSS para diseño responsivo
- **Chart.js**: Librería para gráficos interactivos
- **Font Awesome**: Iconografía
- **JavaScript ES6+**: Lógica de la aplicación

## 🎨 Paleta de Colores

- **Naranja Principal**: `#f97316`
- **Azul Secundario**: `#3b82f6`
- **Verde (Éxito)**: `#10b981`
- **Amarillo (Advertencia)**: `#f59e0b`
- **Rojo (Peligro)**: `#ef4444`
- **Gris**: `#6b7280`

## 📁 Estructura del Proyecto

```
chakipur-dashboard/
├── index.html          # Página principal
├── dashboard.js        # Lógica JavaScript y datos mockup
├── styles.css          # Estilos personalizados
└── README.md          # Documentación
```

## 🚀 Instalación y Uso

1. **Clonar o descargar** los archivos del proyecto
2. **Abrir** `index.html` en un navegador web moderno
3. El dashboard se carga automáticamente con datos de prueba

### Requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Conexión a internet (para CDNs de librerías)

## 📊 Datos de Mockup

El dashboard incluye datos de prueba realistas para todas las secciones:

### KPIs Incluidos
- Tiempo por tramo
- Picos horarios de demanda
- KM por tramo
- Paradas por ubicación
- Tiempo promedio de parada por ubicación
- % de tiempo inactivo
- Tiempo de parada total vs tiempo de conducción
- Tiempo medio por tramo (H/M/S)
- Velocidad media

## 🔧 Personalización

### Modificar Datos
Edita el objeto `mockData` en `dashboard.js` para cambiar los valores mostrados.

### Cambiar Colores
Modifica el objeto `colors` en `dashboard.js` o actualiza las clases de Tailwind CSS.

### Agregar Nuevos Gráficos
1. Añade un canvas en `index.html`
2. Crea la función correspondiente en `dashboard.js`
3. Llama la función en `initDashboard()`

## 📱 Responsividad

El dashboard está optimizado para:
- **Desktop**: Experiencia completa con todos los gráficos
- **Tablet**: Layout adaptado con grillas responsivas
- **Mobile**: Interfaz optimizada para pantallas pequeñas

## 🔮 Funcionalidades Futuras

- [ ] Integración con API real
- [ ] Mapa de calor interactivo con geolocalización
- [ ] Filtros de fecha y rango temporal
- [ ] Exportación de reportes (PDF/Excel)
- [ ] Modo oscuro
- [ ] Notificaciones en tiempo real
- [ ] Dashboard personalizable por usuario

## 🤝 Contribución

Para contribuir al proyecto:

1. Haz fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crea un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

Para soporte técnico o preguntas sobre el proyecto, por favor abre un issue en el repositorio.

---

**Desarrollado con ❤️ para Chakipur**