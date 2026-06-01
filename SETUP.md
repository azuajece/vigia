# El Vigia Frontend - Configuración

## 🎯 Resumen del Proyecto

Frontend moderno y completo para la gestión de pagos y jugadores del Club de Fútbol El Vigia.

### Stack Tecnológico

- **React 19** - Última versión de React
- **TypeScript** - Tipado seguro
- **Tailwind CSS** - Estilos modernos
- **TanStack Table** - DataTables profesionales
- **React Router v7** - Routing
- **Axios** - HTTP client
- **Vite** - Build tool ultrarrápido

## 📁 Estructura del Proyecto

```
vigia_FE/
├── src/
│   ├── components/           # Componentes reutilizables
│   │   ├── Form.tsx         # Formulario CRUD genérico
│   │   ├── Table.tsx        # DataTable con búsqueda y ordenamiento
│   │   ├── Navbar.tsx       # Barra de navegación superior
│   │   └── Layout.tsx       # Layout principal
│   ├── pages/               # Páginas por módulo
│   │   ├── JugadoresPage.tsx         # CRUD de Jugadores
│   │   ├── ConceptosPage.tsx         # CRUD de Conceptos de Cuota
│   │   ├── CuotasConceptosPage.tsx   # CRUD de Cuotas por Concepto
│   │   ├── CuotasMensualesPage.tsx   # CRUD de Cuotas Mensuales
│   │   ├── FormasPagoPage.tsx        # CRUD de Formas de Pago
│   │   └── IngresosPage.tsx          # CRUD de Ingresos/Pagos
│   ├── services/            # Servicios de API
│   │   └── api.ts          # Cliente Axios con endpoints
│   ├── types/              # Tipos TypeScript
│   │   └── index.ts        # Interfaces compartidas
│   ├── styles/             # Estilos globales
│   │   └── index.css       # Tailwind + custom CSS
│   ├── environments/       # Configuraciones
│   │   └── environment.ts  # Variables de entorno
│   ├── App.tsx             # Componente raíz
│   └── main.tsx            # Punto de entrada
├── public/
│   └── escudo.png          # Logo del club
├── .vscode/
│   ├── settings.json       # Configuración VSCode
│   └── extensions.json     # Extensiones recomendadas
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── vite.config.ts
└── README.md
```

## 🎨 Características Principales

### 1. **Navegación Centrada**

- Barra de navegación superior con logo del club
- Enlaces a los 6 módulos principales
- Diseño responsive con menú móvil

### 2. **Paleta de Colores del Club**

- Amarillo: `#FFD700` - Color principal
- Verde: `#1B4D3E` - Color secundario
- Blanco: `#FFFFFF`
- Negro: `#000000`

### 3. **DataTable Profesional**

- Búsqueda global en tiempo real
- Ordenamiento por columnas
- Paginación
- Filas alternadas
- Hover effects
- Acciones (Editar/Eliminar)

### 4. **Formularios CRUD**

- Validaciones en tiempo real
- Modal elegante
- Múltiples tipos de campos
- Retroalimentación visual
- Manejo de errores

### 5. **6 Módulos Completos**

Cada módulo incluye:

- ✅ Listar (con búsqueda)
- ✅ Crear (formulario modal)
- ✅ Editar (pre-llenado de datos)
- ✅ Eliminar (con confirmación)

## 🚀 Comandos de Desarrollo

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Lint
npm run lint
```

## 🔌 API Integration

Consume la API NestJS del directorio `vigia/` en:

- **Base URL**: `http://localhost:3000`
- **Endpoints**: Todos los módulos CRUD

## 📋 Checklist de Instalación

- [ ] Asegúrate que Node.js 18+ está instalado
- [ ] Navega a la carpeta `vigia_FE/`
- [ ] Ejecuta `npm install`
- [ ] Ejecuta `npm run dev`
- [ ] Abre `http://localhost:5173` en el navegador
- [ ] Asegúrate que el backend está corriendo en `http://localhost:3000`

## 🎯 Próximos Pasos

1. **Backend debe estar ejecutándose**

   ```bash
   cd vigia
   npm run start
   ```

2. **Frontend en desarrollo**

   ```bash
   cd vigia_FE
   npm install
   npm run dev
   ```

3. **Abre en el navegador**
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:3000`

## 🛠️ Personalización

### Cambiar colores del club

Edita `tailwind.config.ts`:

```typescript
colors: {
  vigia: {
    yellow: '#FFD700',    // Cambiar aquí
    green: '#1B4D3E',     // O aquí
  }
}
```

### Cambiar URL del API

Edita `vite.config.ts` o crea `.env.local`:

```
VITE_API_URL=http://localhost:3000
```

### Agregar nuevos módulos

1. Crea página en `src/pages/NuevoPaginaPage.tsx`
2. Agrega ruta en `src/main.tsx`
3. Agrega enlace en `src/components/Navbar.tsx`

## 📚 Librerías Principales

| Librería              | Versión | Propósito    |
| --------------------- | ------- | ------------ |
| react                 | ^19.0.0 | Framework UI |
| react-router-dom      | ^7.0.0  | Routing      |
| @tanstack/react-table | ^8.20.0 | DataTables   |
| axios                 | ^1.7.0  | HTTP client  |
| tailwindcss           | ^3.4.0  | Estilos      |
| typescript            | ^5.6.0  | Tipado       |
| vite                  | ^5.4.0  | Build tool   |

## 🎓 Notas Importantes

- El frontend es **agnóstico** al backend, solo necesita que los endpoints cumplan con el contrato definido
- Todos los componentes son **reutilizables** y pueden adaptarse
- Los estilos usan **Tailwind CSS**, no CSS puro
- El código es **100% TypeScript** para máxima seguridad de tipos

## ✨ Características Adicionales

- ✅ Modal de formularios elegante
- ✅ Alertas de error/éxito
- ✅ Loading spinners
- ✅ Confirmación de eliminación
- ✅ Búsqueda global
- ✅ Validaciones de formulario
- ✅ Diseño responsive
- ✅ Dark/Light ready (preparado para temas)

## 📞 Soporte

Para preguntas sobre el desarrollo o problemas:

1. Revisa la consola del navegador (F12)
2. Comprueba que el backend está corriendo
3. Verifica que los endpoints responden correctamente

---

**Creado con ❤️ para El Vigia FC**
