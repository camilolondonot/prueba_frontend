# IA Agent Generator

Aplicación web para crear y gestionar agentes de IA con configuración personalizada, entrenamiento y chat simulado.

## 🚀 Instrucciones para correr el proyecto

### Prerrequisitos

- Node.js 18+ instalado
- npm, yarn, pnpm o bun

### Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/camilolondonot/prueba_frontend.git
cd prueba_frontend
```

2. Instalar dependencias:
```bash
npm install
# o
yarn install
# o
pnpm install
```

3. Ejecutar el servidor de desarrollo:
```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

4. Abrir en el navegador:
```
http://localhost:3000
```

### Build para producción

```bash
npm run build
npm start
```

## 🛠️ Decisiones Técnicas

### Framework y Librerías

**Next.js 16 (App Router)**
- Elección: Framework React con App Router para aprovechar Server Components y routing moderno
- Razón: Mejor rendimiento, SEO y experiencia de desarrollo con TypeScript nativo

**Zustand para State Management**
- Elección: Librería ligera de gestión de estado
- Razón: 
  - Más simple que Redux, suficiente para las necesidades del proyecto
  - Middleware de persistencia integrado para guardar agentes en localStorage
  - Menor boilerplate que Context API para estado global

**DaisyUI + Tailwind CSS**
- Elección: Framework de componentes UI basado en Tailwind
- Razón:
  - Componentes pre-estilizados que aceleran el desarrollo
  - Temas integrados (aunque finalmente se fijó dark)
  - Customización fácil con clases de Tailwind
  - Responsive design simplificado

**TypeScript**
- Elección: Tipado estático para JavaScript
- Razón: Mayor seguridad de tipos, mejor autocompletado y detección temprana de errores

### Arquitectura de Componentes

**Estructura Modular**
```
app/
├── components/
│   ├── ui/          # Componentes reutilizables (Button, Modal, etc.)
│   ├── layout/      # Componentes de layout (Header, Footer, AppLayout)
│   ├── Forms/       # Formularios y pasos
│   ├── Modals/      # Modales de la aplicación
│   ├── cards/       # Componentes de tarjetas
│   └── agent/       # Componentes específicos de agentes
├── store/           # Estado global con Zustand
├── types/           # Definiciones de tipos TypeScript
└── data/            # Datos mock y utilidades
```

**Razón**: Separación clara de responsabilidades, fácil mantenimiento y escalabilidad

### Gestión de Estado

**Zustand con Persistencia Selectiva**
- Los agentes se persisten en localStorage
- El estado del formulario NO se persiste (se resetea al cerrar)
- Razón: Evitar confusión al reabrir el modal con datos previos

### Routing

**Ruta dinámica `/[id]`**
- Elección: Ruta simple sin prefijo `/agent`
- Razón: URLs más limpias y directas según requerimientos

### Estructura de Datos del Agente

```typescript
{
  id: string;
  name: string;
  language: string;
  tone: string;
  responseLength: {
    short: number;
    medium: number;
    long: number;
  };
  audioEnabled: boolean;
  rules: string; // Prompts de entrenamiento
}
```

**Razón**: Formato estructurado que separa la configuración de longitud de respuestas en un objeto anidado, facilitando la extensión futura.

## ✨ Características Implementadas

### ✅ Gestión de Agentes

- **Crear Agente**: Formulario de dos pasos con validación
  - Paso 1: Datos básicos (nombre, idioma, tono)
  - Paso 2: Configuración (distribución de respuestas, audio)
- **Editar Agente**: Mismo formulario con datos pre-rellenados
- **Eliminar Agente**: Con modal de confirmación
- **Listar Agentes**: Cards con información y acciones

### ✅ Validaciones

- Nombre mínimo 3 caracteres
- Campos requeridos validados
- Suma de porcentajes de respuestas debe ser exactamente 100%
- Mensajes de error claros y contextuales
- Prevención de valores inválidos en tiempo real

### ✅ Entrenamiento de Agentes

- Área de texto para prompts/instrucciones
- Persistencia en localStorage por agente
- Sincronización con el store de Zustand
- Mensajes de éxito/error al guardar

### ✅ Chat Simulado

- Interfaz de chat con mensajes del usuario y asistente
- Respuestas simuladas con delay de 1-2 segundos
- Respuestas basadas en distribución configurada (short/medium/long)
- Respuestas predefinidas en JSON
- Botón para reiniciar conversación
- Indicador de "escribiendo" mientras se genera respuesta

### ✅ UI/UX

- Diseño responsive (mobile-first)
- Tema dark fijo
- Fondo con patrón de puntos
- Componentes modulares y reutilizables
- Modales dinámicos (confirmación, resultado)
- Indicador de progreso de agentes en header (0-6 agentes)
- Distribución de respuestas visible en cards y página de detalle

### ✅ Optimizaciones Mobile

- Layout optimizado para pantallas pequeñas
- Botones full-width en mobile
- Inputs numéricos alineados correctamente
- Sliders más grandes para mejor usabilidad táctil
- Espaciado adecuado entre elementos

## 📋 Características No Implementadas (Priorización)

### Dejadas fuera por tiempo/alcance:

1. **Autenticación de usuarios**
   - Razón: No era requerimiento explícito, se enfocó en funcionalidad core

2. **Backend/API real**
   - Razón: Se usó localStorage y datos mock para demostrar funcionalidad frontend

3. **Integración con IA real**
   - Razón: Se implementó chat simulado con respuestas predefinidas para demostrar UX

4. **Exportar/Importar agentes**
   - Razón: Funcionalidad adicional que no estaba en scope inicial

5. **Historial de conversaciones persistente**
   - Razón: El chat es simulado y se resetea al recargar

6. **Búsqueda y filtrado de agentes**
   - Razón: Con pocos agentes (máx 6) no es crítico

7. **Validación de formulario en tiempo real más avanzada**
   - Razón: Validación básica implementada, mejoras avanzadas no prioritarias

8. **Tests unitarios e integración**
   - Razón: Enfoque en funcionalidad y UX, tests quedaron fuera del scope

## ⏱️ Tiempo Aproximado de Dedicación

**Tiempo total estimado: ~12-15 horas**

Desglose aproximado:
- Setup inicial y configuración: 1-2 horas
- Estructura de componentes y layout: 2-3 horas
- Implementación de formularios y validaciones: 2-3 horas
- Gestión de estado con Zustand: 1-2 horas
- Implementación de modales y flujos: 1-2 horas
- Chat simulado y respuestas: 1-2 horas
- Optimizaciones mobile y UX: 2-3 horas
- Ajustes finales y refactorización: 1-2 horas

## 📦 Dependencias Principales

- **next**: 16.1.1 - Framework React
- **react**: 19.2.3 - Librería UI
- **zustand**: 5.0.9 - Gestión de estado
- **daisyui**: 5.5.14 - Componentes UI
- **tailwindcss**: 4.1.18 - Framework CSS
- **typescript**: 5 - Tipado estático
- **lucide-react**: 0.562.0 - Iconos
- **react-icons**: 5.5.0 - Más iconos

## 🎨 Características de Diseño

- **Fuentes**: Montserrat (principal) y Figtree (títulos)
- **Colores personalizados**: Definidos en `globals.css`
- **Tema**: Dark mode fijo
- **Fondo**: Patrón de puntos adaptativo
- **Componentes**: DaisyUI con customización

## 📝 Notas Adicionales

- Los datos se persisten en localStorage del navegador
- El chat utiliza respuestas simuladas desde `app/data/mockResponses.ts`
- Máximo de 6 agentes permitidos (configurable en `Header.tsx`)
- La estructura de datos sigue el formato especificado en los requerimientos

## 🔗 Repositorio

https://github.com/camilolondonot/prueba_frontend.git
