# CV académico (no es tu currículum de software)

**Explicación en español. Plantilla y frases en inglés.**

---

## El problema, si vienes de ingeniería de software

Tu currículum actual está optimizado para un reclutador que escanea 8 segundos
buscando impacto comercial: usuarios, ingresos, latencia, uptime, stack. Un
comité académico busca lo contrario: rigor metodológico, producción científica y
evidencia de que sabes hacer una pregunta y responderla con datos.

Mandar tu currículum de industria a un PI no es un error de formato. Es una
señal de que no sabes en qué juego estás.

| | Currículum de industria | CV académico |
|---|---|---|
| **Objetivo** | Impacto comercial, entrega, escala | Curiosidad científica, rigor, publicaciones |
| **Secciones principales** | Experiencia, stack, métricas de negocio | Publicaciones, investigación, educación, premios |
| **Métricas** | Usuarios, ingresos, latencia, uptime | Complejidad algorítmica, baselines, significancia |
| **Código** | Servicios en producción, microservicios | Repos reproducibles, artefactos de papers |
| **Extensión** | 1–2 páginas, estricto | 2–4+ páginas, sin recorte artificial |
| **Orden** | Experiencia primero | Educación y publicaciones primero |
| **Tono** | Verbos de acción, resultados | Descripción de método y hallazgo |

---

## Traducir lo que ya hiciste

Tu experiencia de software **sí** cuenta. Lo que cambia es el encuadre: no el
valor de negocio, sino la dificultad técnica y el método.

| Como lo escribes hoy | Como lo lee un comité académico |
|---|---|
| "Reduje la latencia de la API en 40%, mejorando la retención" | "Profiled and optimized an inference path, reducing p99 latency from 850 ms to 510 ms (40%) through batched execution and kernel fusion" |
| "Lideré la migración a microservicios" | "Designed and evaluated a service decomposition, measuring throughput and failure isolation against the monolithic baseline" |
| "Construí un dashboard para el equipo de ventas" | "Built an ETL and visualization pipeline over 12M records, with reproducible transforms and documented data lineage" |
| "Trabajé con un equipo ágil de 6 personas" | *Elimínalo.* No aporta nada académico. |
| "Stack: React, Node, AWS" | *Muévelo* a Technical Proficiencies, y agrega lo que importa: PyTorch, CUDA, Docker, LaTeX, SLURM |
| "Aumenté la conversión 12%" | *Elimínalo* salvo que puedas describir el diseño experimental — y si fue un A/B test bien hecho, **descríbelo así**: es evidencia de método |

**La regla:** si la métrica es de negocio, o la reencuadras como resultado
técnico medible, o la sacas. Un comité no sabe si 12% de conversión es difícil.
Sí sabe si bajar p99 de 850 a 510 ms lo es.

---

## Estructura

Orden fijo. No lo inventes.

1. **Header** — nombre, correo institucional, Google Scholar, GitHub, sitio personal
2. **Education** — grado, universidad, fecha, título de tesis, supervisor, promedio **y rango de cohorte**
3. **Publications & Preprints** — revisadas por pares, workshops, preprints; formato IEEE o ACM, con DOI o repo
4. **Research Experience** — puestos, laboratorios, tesis; método, baseline, resultado
5. **Technical Experience** — tu trabajo de software, reencuadrado
6. **Scientific Software / Open Source** — repos públicos, artefactos reproducibles
7. **Honors & Awards** — becas de mérito, hackatones, premios de ingreso, viáticos
8. **Technical Proficiencies** — lenguajes, frameworks, aceleradores, herramientas de cómputo científico
9. **Languages** — con niveles reales (CEFR o resultado de examen)

### Si no tienes publicaciones

Casi nadie las tiene al postular a maestría. No inventes una sección vacía.
Reemplázala por **Research Experience** y **Scientific Software**, y haz que
esas secciones carguen el peso: una tesis de pregrado bien descrita, con
metodología y baseline, vale más que una lista de cursos.

---

## Frases que funcionan en inglés

```text
EDUCATION

B.Sc. in Computer Science, [University], Lima, Peru                    2021–2026
  Cumulative average: 16.2/20 (Quinto Superior — top 20% of cohort)
  Thesis: "[Title]" — Advisor: Prof. [Name]
  Relevant coursework: Machine Learning, Distributed Systems, Numerical Methods


RESEARCH EXPERIENCE

Undergraduate Researcher, [Lab], [University]                     2025–2026
  Investigated [problem]. Implemented [method] in PyTorch and evaluated it
  against [baseline] on [dataset, size]. Achieved [metric], a [X]%
  improvement over the baseline. Code and experiment logs: [repo link].


TECHNICAL EXPERIENCE

Software Engineer, [Company]                                      2024–2026
  Built and profiled [system] serving [scale]. Reduced p99 latency from
  [X] to [Y] through [specific technique]. Designed the benchmarking
  harness used to validate the change.


SCIENTIFIC SOFTWARE

[repo-name] — [one line on what it does]                                 [link]
  [Language]. [N] stars. Reproduces the results in [paper/report];
  includes a Dockerfile and a fixed-seed evaluation script.
```

Nota lo que hacen esas líneas: cada una nombra **un método**, **un baseline** y
**un número**. Ese es el patrón. Si una viñeta no tiene los tres, revísala.

---

## Errores frecuentes

- **Recortar a una página.** Un CV académico no se recorta. Recortarlo sugiere
  que no tienes producción suficiente para llenar dos.
- **Poner "Objective" o "Summary" arriba.** Convención de industria. Fuera.
- **Foto, edad, estado civil, DNI.** No en Canadá.
- **Barras de progreso para habilidades.** "Python ▓▓▓▓░ 80%" no significa nada.
- **Listar cursos sin más.** Solo los directamente relevantes, y en una línea.
- **Omitir el rango de cohorte.** Es el dato que traduce tu promedio vigesimal.
  Ver [equivalencias de notas](grade-equivalencies.md).
- **Repos vacíos en GitHub.** Un enlace a un perfil sin nada activo resta.

---

## Plantilla

Hay una plantilla LaTeX lista en
[`../templates/academic-cv.tex`](../templates/academic-cv.tex). Compila con
`pdflatex` sin paquetes exóticos, para que funcione en Overleaf sin configurar
nada.

---

## Procedencia

La tabla industria–academia y la lista de secciones provienen de
`Canada_Tech_Research_Guide.md`. Las traducciones de viñetas, los errores
frecuentes y la regla de "método, baseline, número" son redacción original.
Nada se verificó contra sitios oficiales: la red estaba bloqueada.
