# Cómo contribuir

Gracias por ayudar a que una persona peruana encuentre una ruta de investigación real en Canadá.

## Cambiar una oportunidad

1. Abre [`data/opportunities.json`](data/opportunities.json) en GitHub.
2. Pulsa el lápiz y edita solo la entrada necesaria.
3. Incluye una fuente oficial con HTTPS y actualiza `verifiedAt`.
4. Explica qué cambió y crea un pull request.

Para un caso público usa `data/stories.json`. Para una oficina institucional usa `data/contacts.json`.

## Criterios editoriales

- La oportunidad debe ser aplicable a una persona peruana o aclarar expresamente que no lo es.
- Prefiere fuentes del programa, gobierno o institución anfitriona.
- No añadas datos personales, expedientes, teléfonos privados ni correos no publicados por una institución.
- No copies bases de terceros. Enlaza y atribuye la fuente.
- Escribe en español claro y distingue una fecha confirmada de una fecha estimada.

## Verificar

Necesitas Node.js 20 o posterior.

```bash
npm test
npm run validate
npm run build
```
