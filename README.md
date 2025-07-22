# Capacit.io - Sistema de Gestión de Calidad SaaS

![Capacit.io Logo](public/placeholder-logo.svg)

**Capacit.io** es una plataforma SaaS integral diseñada para la gestión de sistemas de calidad empresarial, cumplimiento normativo ISO y capacitación del personal. Desarrollada con tecnologías modernas para ofrecer una experiencia de usuario excepcional y funcionalidades avanzadas de análisis con IA.

## 🚀 Características Principales

### 📊 Dashboard Inteligente
- Métricas en tiempo real de cumplimiento normativo
- Indicadores clave de rendimiento (KPIs)
- Alertas proactivas y notificaciones
- Análisis de tendencias y predicciones

### 📚 Gestión Documental Avanzada
- Organización inteligente de documentos
- Control de versiones automático
- Flujos de aprobación personalizables
- Búsqueda semántica y filtros avanzados

### 🎓 Sistema de Capacitación
- Gestión completa de programas de entrenamiento
- Evaluaciones automatizadas
- Seguimiento de progreso individual
- Certificaciones y reportes de cumplimiento

### 🔍 Centro de Auditoría
- Planificación y ejecución de auditorías
- Gestión de evidencias digitales
- Seguimiento de hallazgos y acciones correctivas
- Informes detallados y análisis de cumplimiento

### 🤖 Asistente IA Especializado
- Análisis inteligente de datos QMS
- Recomendaciones automatizadas de mejora
- Predicciones de riesgos de cumplimiento
- Optimización de procesos basada en IA

### 📋 Sistema de Tickets
- Gestión integral de incidencias
- Seguimiento de estados y prioridades
- Asignación automática de responsables
- Historial completo de actividades

### 📖 Base de Conocimiento
- Biblioteca completa de artículos técnicos
- FAQ interactivo y categorizado
- Sistema de calificaciones y comentarios
- Búsqueda inteligente de contenido

## 🛠️ Tecnologías Utilizadas

- **Framework**: [Next.js 15](https://nextjs.org/) con App Router
- **UI/UX**: [shadcn/ui](https://ui.shadcn.com/) + [Tailwind CSS](https://tailwindcss.com/)
- **Iconografía**: [Lucide React](https://lucide.dev/)
- **Lenguaje**: TypeScript
- **Gestión de Estado**: React Hooks (useState, useEffect, useRef)
- **Styling**: Tailwind CSS con sistema de diseño consistente

## 🏗️ Arquitectura del Proyecto

```
qms-saas-platform/
├── app/                      # App Router de Next.js
│   ├── assistant/           # Asistente IA
│   ├── audit/               # Centro de Auditoría
│   ├── gestion-documental/  # Gestión Documental
│   ├── history/             # Historial y Cambios
│   ├── knowledge/           # Base de Conocimiento
│   ├── tickets/             # Sistema de Tickets
│   └── training/            # Capacitación
├── components/              # Componentes reutilizables
│   ├── ui/                  # Componentes base de shadcn/ui
│   └── app-sidebar.tsx      # Navegación principal
├── hooks/                   # Hooks personalizados
├── lib/                     # Utilidades y helpers
└── public/                  # Recursos estáticos
```

## 🚦 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- pnpm (recomendado) o npm

### Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/alecmuza09/CPCT-DC.git
   cd CPCT-DC
   ```

2. **Instalar dependencias**
   ```bash
   pnpm install
   # o
   npm install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   pnpm dev
   # o
   npm run dev
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

## 📱 Funcionalidades por Módulo

### 🏠 Dashboard Principal
- Vista general del estado del sistema QMS
- Métricas de cumplimiento por norma ISO
- Actividad reciente y tareas pendientes
- Acciones rápidas más utilizadas

### 📄 Gestión Documental
- Organización jerárquica de documentos
- Estados: Borrador, Revisión, Aprobado, Obsoleto
- Metadatos completos y etiquetado
- Exportación masiva y reportes

### 🎯 Capacitación
- **Cursos**: Gestión completa de programas
- **Evaluaciones**: Sistema automatizado de testing
- **Reportes**: Análisis de efectividad
- **Configuración**: Personalización de parámetros

### 🔍 Auditoría
- **Evidencias**: Gestión digital de pruebas
- **Cumplimiento**: Monitoreo normativo ISO
- **Informes**: Generación automatizada
- **Cláusulas**: Seguimiento detallado

### 🎫 Tickets
- Estados: Abierto, En Progreso, Resuelto, Cerrado
- Prioridades: Baja, Media, Alta, Crítica
- Asignación de responsables
- Comentarios y seguimiento temporal

### 📚 Base de Conocimiento
- Artículos categorizados por tema
- FAQ con respuestas detalladas
- Sistema de valoraciones (1-5 estrellas)
- Búsqueda avanzada y filtros

### 🤖 Asistente IA
- Chat inteligente especializado en QMS
- Análisis predictivo de riesgos
- Recomendaciones de optimización
- Herramientas automatizadas de análisis

## 🎨 Diseño y UX

- **Responsive Design**: Adaptable a todos los dispositivos
- **Modo Oscuro**: Soporte completo para tema oscuro
- **Accesibilidad**: Cumple estándares WCAG
- **Animaciones**: Transiciones suaves y feedback visual
- **Consistencia**: Sistema de diseño unificado

## 🔐 Seguridad y Cumplimiento

- Gestión de permisos por roles
- Auditoría completa de acciones
- Cifrado de datos sensibles
- Cumplimiento con normativas ISO 9001, ISO 14001, ISO 45001

## 📈 Roadmap

- [ ] Integración con APIs externas (ERP, CRM)
- [ ] Módulo de análisis avanzado con BI
- [ ] App móvil nativa
- [ ] Integraciones con servicios de almacenamiento en la nube
- [ ] Workflow engine para procesos complejos

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor:

1. Fork del proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Alec Muza** - [@alecmuza09](https://github.com/alecmuza09)

---

⭐ Si este proyecto te resulta útil, ¡no olvides darle una estrella!

🔗 **Demo en vivo**: [Próximamente]
📧 **Contacto**: [Tu email aquí]
🌐 **Website**: [Tu website aquí] 