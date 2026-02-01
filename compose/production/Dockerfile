# Etapa 1: Construcción de React - Fase de dependencias
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./

# Enable pnpm via corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

RUN pnpm install --prefer-offline

# Etapa 2: Construcción de React - Fase de build
FROM node:22-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Enable pnpm via corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

# Añade flags para producción
RUN pnpm run build -- --mode production

# Etapa 3: Servir con Nginx (se mantiene igual)
FROM nginx:1.27-alpine

# Instalar solo lo esencial y limpiar cache
RUN apk add --no-cache --update curl && \
    rm -rf /var/cache/apk/*

# Configuración de seguridad y optimización
COPY compose/production/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build --chown=nginx:nginx /app/dist /usr/share/nginx/html

# Configurar permisos y usuario no-root
RUN chmod -R 755 /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl --fail http://localhost:80 || exit 1

USER nginx

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]