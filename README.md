# Proyecto E-commerce - Entrega Final CoderHouse

Este es un proyecto de E-commerce desarrollado con **React.js** para el curso de CoderHouse. La aplicación permite navegar por un catálogo de productos, ver detalles específicos, gestionar un carrito de compras y realizar un proceso de checkout integrado con **Firebase**.

## 🚀 Demo
La aplicación se puede ver desplegada en: [https://ecommerce-ch.yoyodr.dev](https://ecommerce-ch.yoyodr.dev)

## 🛠️ Tecnologías Utilizadas

- **React 19**: Biblioteca principal para la interfaz de usuario.
- **Vite**: Herramienta de construcción y entorno de desarrollo rápido.
- **Firebase 12**: Utilizado para la base de datos (Firestore) y configuración del backend.
- **Tailwind CSS 4**: Framework de utilidades CSS para un diseño moderno y responsive.
- **React Router 7**: Gestión de rutas de la aplicación.
- **React Hot Toast**: Notificaciones interactivas para el usuario.
- **Heroicons & Headless UI**: Componentes de interfaz y accesibilidad.

## ✨ Características Principales

- **Catálogo de Productos**: Listado dinámico de productos obtenidos desde Firebase.
- **Filtrado por Categorías**: Navegación organizada por tipos de productos.
- **Detalle de Producto**: Vista detallada con descripción, precio y stock.
- **Carrito de Compras**:
  - Agregar/eliminar productos.
  - Modificar cantidades mediante un contador dinámico.
  - Cálculo de totales y subtotales en tiempo real.
- **Checkout**: Formulario de finalización de compra con generación de orden en Firebase.

## 📂 Estructura del Proyecto

```text
src/
├── components/        # Componentes globales reutilizables (Counter, CartWidget)
├── context/           # Contexto global (CartContext) para manejo de estado
├── features/          # Módulos principales divididos por dominios:
│   ├── cart/          # Lógica y vistas del carrito
│   ├── checkout/      # Proceso de pago y órdenes
│   ├── detail_product/# Vista de detalle de productos
│   ├── layout/        # Componentes de estructura (NavBar, Footer)
│   └── products/      # Listado y filtros de productos
├── firebase/          # Configuración y conexión con Firebase Firestore
└── assets/            # Recursos estáticos (imágenes, iconos)
```

## 📋 Requisitos Previos

- **Node.js 18** o superior.
- **pnpm**, npm o yarn.

## ⚙️ Configuración e Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/YOYO-DR/proyecto-final-coderhouse.git
   cd proyecto-final-coderhouse
   ```

2. **Instalar dependencias:**
   ```bash
   pnpm install
   ```

3. **Variables de Entorno:**
   Crea un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno:
   ```env
   VITE_FIREBASE_API_KEY=api_key
   VITE_FIREBASE_AUTH_DOMAIN=auth_domain
   VITE_FIREBASE_PROJECT_ID=project_id
   VITE_FIREBASE_STORAGE_BUCKET=storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=sender_id
   VITE_FIREBASE_APP_ID=app_id
   VITE_FIREBASE_MEASUREMENT_ID=measurement_id
   ```

4. **Ejecutar en modo desarrollo:**
   ```bash
   pnpm run dev
   ```

5. **Ejecutar pruebas:**
   ```bash
   pnpm test
   ```

La aplicación estará disponible en `http://localhost:5173`

