# Statement of Purpose

**Explicación en español. Estructura y frases en inglés.**

---

## Qué es y qué no es

Un SOP para investigación en STEM **no es una historia personal**. Es una
propuesta intelectual corta. El comité no quiere saber que de niño desarmabas
computadoras. Quiere saber qué problema te interesa, si entiendes por qué es
difícil, y si su departamento es el lugar correcto para atacarlo.

La apertura autobiográfica — *"Ever since I was young, I have been fascinated
by technology"* — es la señal más confiable de una postulación débil. Aparece
en miles de SOPs y no dice nada.

---

## Estructura de tres bloques

### 1. El problema, con precisión técnica

Define el problema. Nombra el cuello de botella computacional, el vacío
teórico o la limitación metodológica concreta en la literatura actual.

```text
Serving large language models at low latency remains bounded by memory
bandwidth rather than compute. Current batching strategies improve
throughput but degrade tail latency under heterogeneous request lengths,
and existing schedulers treat prefill and decode as a single resource class.
```

Eso ya te separa del 90%. Nombra un problema real y demuestra que leíste.

### 2. Tu preparación, con evidencia

Cómo tus cursos, tu tesis o tu trabajo te prepararon para atacarlo. Aquí es
donde reencuadras tu experiencia de industria: pipelines de datos escalables,
optimización de hardware, sistemas distribuidos — no KPIs comerciales.

```text
In my undergraduate thesis I implemented a continuous-batching scheduler
that separates prefill and decode queues, evaluated on [dataset] against
[baseline]. It reduced p99 latency by 34% at equal throughput. The
implementation and experiment logs are public at [link]. Building it taught
me where the measurement itself is hard: [specific methodological point].
```

Esa última oración vale más que el número. Demuestra que sabes que medir bien
es parte del problema.

### 3. Alineación institucional, específica

Por qué **ese** departamento y **ese** profesor. Nombra proyectos en curso,
infraestructura de cómputo, institutos afiliados (Vector, Mila, Amii).

```text
Professor [Name]'s work on [specific project] approaches this from
[angle], which is the direction I want to pursue. The group's access to
[compute/infrastructure] and its affiliation with [institute] make
[University] the environment where this work is actually feasible.
```

**Prueba de fuego:** si tu SOP funcionaría sin cambios para otra universidad,
está mal escrito. El bloque 3 debe ser imposible de reciclar.

---

## Errores frecuentes

| Error | Por qué falla |
|---|---|
| Abrir con la infancia | Miles lo hacen. No informa nada. |
| Repetir el CV en prosa | Ya lo tienen. Usa el espacio para pensar. |
| "Su prestigiosa universidad" | Adulación genérica. Nombra un proyecto. |
| Listar cinco intereses de investigación | Sugiere que no tienes ninguno. Uno o dos. |
| No nombrar a ningún profesor | El comité no sabe a quién enviarte. |
| Nombrar cinco profesores | Sugiere que mandaste el mismo texto a todos. Uno o dos. |
| Hablar de lo que quieres *aprender* | Un doctorado no es un curso. Habla de lo que quieres *resolver*. |
| Explicar dificultades personales sin conexión | Salvo que expliquen una brecha en tu expediente, no aportan. |

---

## Extensión y forma

- 800–1200 palabras salvo que pidan otra cosa. Respeta el límite exacto.
- Sin encabezados salvo que los pidan. Fluye.
- Primera persona, voz activa, sin adornos.
- Que lo lea alguien que no trabaje en tu área. Si no entiende el párrafo 1,
  reescríbelo.
- **No** lo traduzcas del español. Escríbelo en inglés desde cero. Las
  estructuras traducidas se notan y suenan infladas.

---

## Procedencia

La estructura de tres bloques proviene de `Canada_Tech_Research_Guide.md`. Los
ejemplos, la tabla de errores y la prueba de fuego son redacción original.
