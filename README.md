# El Vigia - Frontend

Frontend moderno para la gestión de jugadores y pagos del Club de Fútbol El Vigia.

## 🎨 Características

- ✅ **React 19** + **TypeScript** - Framework moderno con tipado seguro
- ✅ **Tailwind CSS** - Estilos modernos y responsivos
- ✅ **React Router v7** - Navegación eficiente
- ✅ **TanStack Table** - DataTables potentes y flexibles
- ✅ **Axios** - Cliente HTTP para consumir la API
- ✅ **Formularios CRUD** - Completos con validaciones
- ✅ **Diseño Responsivo** - Mobile-first
- ✅ **Colores del Club** - Amarillo #FFD700 y Verde #1B4D3E
- ✅ **Logo del Club** - Integrado en la navbar

## 📋 Módulos

El frontend incluye páginas CRUD para:

1. **Jugadores** - Gestión de jugadores del club
2. **Conceptos de Cuota** - Tipos de pagos
3. **Cuotas por Concepto** - Cuotas anuales
4. **Cuotas Mensuales** - Cuotas detalladas por mes
5. **Formas de Pago** - Métodos de pago disponibles
6. **Ingresos/Pagos** - Registro de transacciones

## 🚀 Instalación

### Requisitos

- Node.js 18+
- npm o yarn

### Pasos

1. **Instalar dependencias**

```bash
npm install
```

2. **Variables de entorno** (opcional)
   Crea un archivo `.env.local` si necesitas cambiar la URL del API:

```
VITE_API_URL=http://localhost:3000
```

3. **Iniciar en desarrollo**

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 📦 Build para producción

```bash
npm run build
```

Esto generará los archivos optimizados en la carpeta `dist/`

## 🏗️ Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Form.tsx        # Formulario genérico CRUD
│   ├── Table.tsx       # DataTable con TanStack Table
│   ├── Navbar.tsx      # Navegación superior
│   └── Layout.tsx      # Layout principal
├── pages/              # Páginas por módulo
│   ├── JugadoresPage.tsx
│   ├── ConceptosPage.tsx
│   ├── CuotasConceptosPage.tsx
│   ├── CuotasMensualesPage.tsx
│   ├── FormasPagoPage.tsx
│   └── IngresosPage.tsx
├── services/           # Servicios API
│   └── api.ts         # Cliente Axios y endpoints
├── types/             # TypeScript types
│   └── index.ts       # Interfaces compartidas
├── styles/            # Estilos globales
│   └── index.css      # Tailwind + custom styles
├── App.tsx            # Componente raíz
└── main.tsx           # Punto de entrada
```

## 🔌 Integración con API

El frontend se conecta a la API NestJS en `http://localhost:3000`

### Endpoints esperados

```
GET    /jugadores                 - Listar jugadores
POST   /jugadores                 - Crear jugador
PATCH  /jugadores/:id            - Actualizar jugador
DELETE /jugadores/:id            - Eliminar jugador

GET    /conceptos-cuota            - Listar conceptos
POST   /conceptos-cuota            - Crear concepto
PATCH  /conceptos-cuota/:id       - Actualizar
DELETE /conceptos-cuota/:id       - Eliminar

GET    /cuotas-conceptos           - Listar cuotas conceptos
POST   /cuotas-conceptos           - Crear
PATCH  /cuotas-conceptos/:id      - Actualizar
DELETE /cuotas-conceptos/:id      - Eliminar

GET    /cuotas-mensuales           - Listar cuotas mensuales
POST   /cuotas-mensuales           - Crear
PATCH  /cuotas-mensuales/:id      - Actualizar
DELETE /cuotas-mensuales/:id      - Eliminar

GET    /formas-pago                - Listar formas de pago
POST   /formas-pago                - Crear
PATCH  /formas-pago/:id           - Actualizar
DELETE /formas-pago/:id           - Eliminar

GET    /ingresos                   - Listar ingresos
POST   /ingresos                   - Crear ingreso
PATCH  /ingresos/:id              - Actualizar
DELETE /ingresos/:id              - Eliminar
```

## 🎨 Customización de Colores

Los colores del club se definen en `tailwind.config.ts`:

```typescript
colors: {
  vigia: {
    yellow: '#FFD700',      // Amarillo del escudo
    green: '#1B4D3E',       // Verde del escudo
    dark: '#000000',
    light: '#FFFFFF',
  }
}
```

Úsalos en componentes: `className="bg-vigia-yellow text-vigia-green"`

## 📱 Componentes Principales

### FormComponent

Formulario genérico CRUD con validaciones. Uso:

```tsx
<FormComponent
  title="Nuevo Jugador"
  fields={formFields}
  onSubmit={handleSubmit}
  onCancel={() => setShowForm(false)}
/>
```

### DataTable

Tabla con búsqueda, ordenamiento y paginación. Uso:

```tsx
<DataTable
  columns={columns}
  data={data}
  onEdit={handleEdit}
  onDelete={handleDelete}
  onCreate={handleCreate}
/>
```

## 🔧 Desarrollo

### Scripts disponibles

```bash
npm run dev       # Inicia servidor de desarrollo
npm run build     # Build para producción
npm run preview   # Preview del build
npm run lint      # Lint de código
```

## 📚 Dependencias Principales

- **react** - Framework UI
- **react-dom** - Integración con DOM
- **react-router-dom** - Routing
- **axios** - HTTP client
- **@tanstack/react-table** - DataTables
- **tailwindcss** - Estilos
- **typescript** - Tipado
- **vite** - Build tool

## 🐛 Troubleshooting

### Error de conexión con la API

- Asegúrate que el backend está corriendo en `http://localhost:3000`
- Revisa la consola del navegador (F12) para ver los errores
- Verifica que CORS esté habilitado en el backend

### Tabla no muestra datos

- Comprueba que los endpoints responden correctamente
- Revisa que los tipos TypeScript coincidan con la API
- Mira los logs en la consola del navegador

### Formulario no guarda

- Verifica que el método POST/PATCH esté habilitado en la API
- Comprueba que los campos del formulario coincidan con el DTO del backend

## 📝 Licencia

© 2024 Club de Fútbol El Vigia. Todos los derechos reservados.

## 👨‍💻 Desarrollo

Proyecto creado con React + TypeScript + Tailwind CSS

Para preguntas o sugerencias, contacta al equipo de desarrollo.
# vigia
