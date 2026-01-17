# Plan: Arquitectura de Sidebar para Slotify

## Resumen

Reemplazar el Navbar superior actual por un **Sidebar completo** que contenga toda la navegación, branding y perfil de usuario con logout. El sidebar será consistente en todas las páginas privadas e incluirá soporte responsive para móvil.

## Decisiones de Arquitectura

1. **Crear nuevo componente `Sidebar`** en lugar de usar `FeaturesNavbar` (mejor semántica)
2. **Sidebar en `private/layout.tsx`** - se renderiza una sola vez para todas las rutas privadas
3. **Clerk integrado en el sidebar** - perfil de usuario y logout directamente en el sidebar
4. **Mobile**: Sidebar como drawer con hamburger menu

## Estructura de Archivos a Crear/Modificar

```
components/
├── Sidebar/
│   ├── Sidebar.tsx              # Componente principal (server)
│   ├── SidebarNav.tsx           # Sección de navegación
│   ├── SidebarNavItem.tsx       # Item individual (client - usePathname)
│   ├── SidebarUserSection.tsx   # Perfil + logout (client - Clerk hooks)
│   ├── SidebarMobile.tsx        # Drawer para móvil (client - estado)
│   └── index.ts                 # Barrel export

lib/
└── constants/
    └── navigation.ts            # Configuración de items del menú

app/private/
├── layout.tsx                   # MODIFICAR - usar Sidebar
├── calendar/page.tsx            # CREAR - placeholder
├── clients/page.tsx             # CREAR - placeholder
└── services/page.tsx            # CREAR - placeholder
```

## Pasos de Implementación

### Fase 1: Configuración Base

1. **Crear `lib/constants/navigation.ts`**
   - Definir items del menú principal (Dashboard, Calendario, Clientes, Servicios)
   - Definir items del menú sistema (Configuración, Ayuda & Soporte)
   - Usar iconos de Lucide React

### Fase 2: Componentes del Sidebar

2. **Crear `SidebarNavItem.tsx`** (client component)
   - Detectar ruta activa con `usePathname()`
   - Estilo activo: borde izquierdo púrpura + fondo tinted + texto púrpura
   - Icono + label

3. **Crear `SidebarNav.tsx`**
   - Recibe array de items + título de sección opcional
   - Renderiza SidebarNavItem para cada item

4. **Crear `SidebarUserSection.tsx`** (client component)
   - Usar `useUser()` y `useClerk()` de Clerk
   - Mostrar avatar, nombre, email
   - Botón de logout con `signOut()`

5. **Crear `SidebarMobile.tsx`** (client component)
   - Header móvil con hamburger menu (visible solo en móvil)
   - Drawer/overlay con el contenido del sidebar
   - Estado para abrir/cerrar

6. **Crear `Sidebar.tsx`** (componente principal)
   - Componer: Logo + SidebarNav (menú principal) + SidebarNav (sistema) + SidebarUserSection
   - Oculto en móvil (`hidden md:flex`)

7. **Crear `index.ts`** barrel export

### Fase 3: Integración en Layout

8. **Modificar `app/private/layout.tsx`**
   ```tsx
   <div className="flex h-screen bg-base">
     <SidebarMobile />           {/* Header móvil + drawer */}
     <Sidebar />                 {/* Desktop sidebar */}
     <main className="flex-1 overflow-auto pt-16 md:pt-0">
       {children}
     </main>
   </div>
   ```

### Fase 4: Páginas Placeholder

9. **Crear páginas placeholder**
   - `app/private/calendar/page.tsx`
   - `app/private/clients/page.tsx`
   - `app/private/services/page.tsx`

### Fase 5: Cleanup

10. **Limpiar código obsoleto**
    - El componente `Navbar` se puede mantener para páginas públicas
    - `FeaturesNavbar` se puede eliminar o dejar para uso futuro

## Archivos Críticos

| Archivo | Acción |
|---------|--------|
| `app/private/layout.tsx` | Modificar |
| `components/Navbar/Navbar.tsx` | Referencia (Clerk patterns) |
| `app/globals.css` | Referencia (theme variables) |
| `lib/utils.ts` | Usar cn() utility |

## Diseño Visual (basado en tu imagen)

- **Fondo sidebar**: `bg-surface` (#0F1A2E)
- **Item activo**: borde izquierdo `border-primary`, fondo con tint púrpura, texto `text-primary`
- **Item inactivo**: `text-text-secondary`, hover con fondo sutil
- **Secciones**: títulos en mayúsculas, texto muted, pequeño
- **Usuario**: avatar circular, nombre, email truncado
- **Ancho desktop**: 256px (w-64)
- **Mobile**: drawer desde la izquierda con overlay oscuro

## Notas Técnicas

- `SidebarNavItem` y `SidebarUserSection` deben ser client components (hooks)
- El sidebar principal puede ser server component
- Usar `cn()` de `lib/utils` para merge de clases condicionales
- Iconos de `lucide-react` (ya instalado en el proyecto)
