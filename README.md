# Instagram Follow Checker
## Descripción
Una aplicación que permite revisar usuarios que no siguen de vuelta, usuarios que no sigues de vuelta y seguimiento mutuo de una cuenta de Instagram.

## Tecnologías

 - Vite
 - React.js (JavaScript + SWC)
 - Tailwind CSS

## Tutorial de uso

1. Clonar el repositorio:
```
git clone https://github.com/EdoAbarca/ig-follow-check.git
```
2. Instalar dependencias
```
npm install
```
3. Iniciar aplicación
```
npm run dev
```
4. Ingresar a la aplicación ingresando esta URL en el navegador:
```
localhost:5137
```
5. Descargar información de Meta
    - Ingresar a Instagram desde el navegador
    - Dirigirse a: Más -> Configuración -> Centro de cuentas -> Tu información y tus permisos -> Descargar tu información -> Descargar o transferir información -> Parte de tu información -> Seguidos y seguidores (Del apartado Conexiones) -> Descargar en el dispositivo -> Crear archivo (Cambiar "Intervalo de fechas" a "Desde el principio" y "Formato" a "JSON")
    - Cerrar ventana y esperar hasta recibir notificación por correo
    - Una vez recibido el correo, volver a entrar a "Descargar tu información", para así clickear "Descargar" en la opción que apareció en "Descargas disponibles"
    - Extraer carpeta
6. Cargar información
    - De la carpeta extraída, dirigirse a: connections -> followers_and_following
    - En "Cargar archivo de seguidores:" subir el archivo "followers_1.json"
    - En "Cargar archivo de seguidos:" subir el archivo "following.json"
    - Click en "Analizar"