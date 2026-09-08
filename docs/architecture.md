# Arquitectura

## Decisión

El catálogo vive en JSON. La web y la CLI consumen la misma fuente mediante funciones pequeñas en `lib/catalog.mjs`.

## Componentes

- `data/`: oportunidades, historias públicas y contactos institucionales editables.
- `lib/catalog.mjs`: coincidencias, búsqueda y validación.
- `app.js`: presentación en el navegador.
- `bin/canada-research-path.mjs`: salida humana o JSON para scripts y agentes.
- `scripts/build-standalone.mjs`: empaqueta datos y código en un único HTML descargable.

## InVivoLab

InVivoLab es una fuente aliada independiente para descubrir oportunidades STEM. La integración actual abre y atribuye su sitio. No consulta endpoints privados, no usa credenciales y no copia ni redistribuye su base. Una importación automática requeriría permiso y una interfaz oficial acordada con InVivoLab.
