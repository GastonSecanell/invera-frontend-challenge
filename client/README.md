# Invera Frontend – Users Dashboard (Demo - Challenge)

Este proyecto corresponde a un **challenge frontend** implementado en **Next.js + React + TypeScript**, siguiendo el diseño provisto en Figma y consumiendo un backend mock.

Además de cumplir estrictamente con los requerimientos del challenge, se agregó un **Demo mode opcional** para mostrar el potencial completo del sistema desde una perspectiva de producto (UX/UI, escalabilidad y experiencia de usuario).

---

## Modos de ejecución

Al iniciar el proyecto en `http://localhost:3000`, se muestra una pantalla inicial con dos opciones:

### Demo mode
- UI completa con **imágenes simuladas** para usuarios y compañías
- Selector de idioma (ES / EN)
- Datos mockeados pensados para mostrar cómo podría verse el sistema en un entorno real de producto
- Representa el **potencial máximo de la UI**, independientemente de las limitaciones actuales del backend

> Este modo es solo demostrativo y no reemplaza lo pedido en el challenge.

---

### Challenge mode
- Consume **exclusivamente** los datos provistos por el backend
- No incluye imágenes adicionales ni selector de idioma
- Estadísticas, cards, gráfico y tabla funcionan con los datos reales del servidor
- UI alineada estrictamente a lo solicitado en el PDF del challenge

> Este modo representa el **cumplimiento exacto del desafío técnico**.

---

## Estructura del proyecto

```
/server   → Backend mock (API)
/client   → Frontend (Next.js)
```

Ambos servicios se ejecutan en paralelo.

---

## Cómo levantar el proyecto

### 1 - Clonar el repositorio

```bash
git clone https://github.com/GastonSecanell/invera-frontend-challenge
cd invera-frontend-challenge
```

---

### 2 - Levantar el backend (server)

```bash
cd server
npm install
npm run dev
```

El backend quedará corriendo normalmente en:

```
http://localhost:8000
```

---

### 3 - Levantar el frontend (client)

En otra terminal:

```bash
cd client
npm install
npm run dev
```

El frontend estará disponible en:

```
http://localhost:3000
```

---

## Funcionalidades implementadas

### ✔ Vista de usuarios
- Cards de estadísticas
- Gráfico circular de tipos de usuario
- Tabla de usuarios con paginación

### ✔ Tabla
- Paginación server-side
- Búsqueda global
- Filtros por nombre, email, empresa y estado
- Ordenamiento por columnas

### ✔ CRUD
- Crear usuario
- Editar usuario
- Eliminar usuario con confirmación
- Validaciones de formulario (incluyendo formato de email)
- Notificaciones visuales (toasts) al crear, editar y eliminar
- Estados de loading, error y success

### ✔ UX / UI
- Dark / Light mode
- Diseño fiel a Figma
- Responsive
- Spinners de carga en vistas y acciones
- Manejo de estados vacíos y errores de red
- Vista específica cuando no hay conexión con el servidor

---

## Internacionalización (extra)

Se implementó un sistema simple de i18n (ES / EN):

- Textos de UI
- Formularios
- Validaciones
- Labels y mensajes

> El selector de idioma está disponible solo en **Demo mode** para no alterar el comportamiento solicitado en el challenge.

---

## Tests

Se agregaron tests unitarios con:

- Jest
- React Testing Library

Componentes cubiertos:
- StatusBadge
- UserAvatar
- UsersTableRow

Los tests validan el **contrato visual y funcional** de los componentes.

Ejecutar tests:

```bash
npm test
```

---

## Consideraciones finales

- El **Challenge mode** cumple estrictamente con los requerimientos especificados en el PDF del challenge, consumiendo únicamente los datos expuestos por el backend provisto.

- El **Demo mode** es una capa opcional pensada para mostrar el potencial completo de la UI desde una perspectiva de producto, experiencia de usuario y escalabilidad.

- En el diseño original de Figma se muestran **imágenes asociadas a cada usuario y a cada empresa**.  
  Dado que el backend del challenge no expone imágenes ni URLs de assets, en **Demo mode** se agregaron imágenes locales (`/public/img`) únicamente con fines demostrativos.

- Estas imágenes **no representan una solución definitiva**, sino una simulación visual.  
  En un escenario real, dichas imágenes deberían ser provistas por el backend mediante URLs (por ejemplo, desde un CDN o servicio de almacenamiento).

- El frontend queda preparado para ese escenario futuro, manteniendo desacoplada la fuente de datos visuales de la lógica de negocio.

- El código está organizado en **hooks reutilizables** y **componentes desacoplados**, facilitando mantenimiento y escalabilidad.

- Se utilizan **estados derivados claros** para manejar loading, errores de red, estados vacíos y flujos de UX consistentes.

---

## Stack utilizado

- Next.js
- React
- TypeScript
- Tailwind CSS
- Jest
- React Testing Library

---

## Estado del proyecto

✔ Challenge finalizado  
✔ Funcional  
✔ Listo para revisión


## Autor

**Gaston Secanell**  
Frontend / Full Stack Developer  

📧 Email: gastonsecanell@gmail.com  
💼 LinkedIn: https://www.linkedin.com/in/gaston-secanell-126bb4260
