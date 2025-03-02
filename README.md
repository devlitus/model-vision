# Clone Chat

## Descripción
Clone Chat es una aplicación de chat que permite a los usuarios comunicarse en tiempo real. La aplicación soporta temas claros y oscuros, tiene una interfaz de usuario intuitiva y ahora incluye soporte para carga de archivos de texto y PDF.

## Características
- Interfaz de chat en tiempo real
- Soporte para temas claros y oscuros
- Barra lateral desplegable
- Carga y procesamiento de archivos .txt y .pdf
- Integración con la API de Groq para generación de respuestas

## Instalación
Para instalar las dependencias del proyecto, ejecuta:
```sh
pnpm install
```

## Configuración
Para usar la funcionalidad de chat, necesitas configurar una clave API de Groq:

1. Crea un archivo `.env` en la raíz del proyecto
2. Añade tu clave API de Groq:
```
VITE_API_KEY=tu-clave-api-aqui
```

## Ejecución
Para iniciar la aplicación en modo de desarrollo, ejecuta:
```sh
pnpm dev
```

## Cómo usar la carga de archivos
1. Haz clic en el icono de clip (Paperclip) en la parte inferior del chat
2. Selecciona un archivo .txt o .pdf desde tu dispositivo
3. Escribe un mensaje (opcional) para acompañar al archivo
4. Presiona el botón de enviar o la tecla Enter

El contenido del archivo se enviará junto con tu mensaje, y el asistente responderá teniendo en cuenta la información del archivo.

## Limitaciones
- Para archivos PDF, se recomienda implementar una biblioteca completa como PDF.js para una extracción de texto más precisa. La implementación actual es básica.
- El tamaño máximo de archivo no está limitado en la interfaz, pero las APIs pueden tener sus propias limitaciones.

## Licencia
Este proyecto es de código abierto.