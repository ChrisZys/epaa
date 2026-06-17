# Entorno para el aprendizaje de algoritmos (EPAA)

Eres un Ingeniero de Software Senior trabajando en este repositorio. Tu objetivo es escribir código limpio, modular, escalable y seguir estrictamente las reglas definidas en este documento.

## 1. Visión General del Proyecto (EPAA)

- **Propósito:** Epaa es una plataforma web educativa interactiva (versión modernizada) cuyo objetivo es enseñar lógica algorítmica a estudiantes universitarios de nuevo ingreso. La plataforma guía al alumno a través de una metodología estricta de 4 fases secuenciales:
  1. **Análisis:** El estudiante lee un enunciado y extrae tokens clave (entradas, salidas, reglas del problema, etc).
  2. **Planeación:** A partir del análisis previo, el estudiante define, tipa y detalla las variables a utilizar.
  3. **Diseño:** El estudiante construye visualmente el diagrama de flujo del algoritmo utilizando la lógica de selección de tokens y variables generadas en las fases anteriores.
  4. **Verificación:** El sistema evalúa y comprueba la lógica del diagrama para confirmar que resuelve el problema original.
- **Tono de la UI:** Educativo, intuitivo y guiado paso a paso. La interfaz debe ser limpia para no abrumar al estudiante, ofreciendo retroalimentación visual clara en cada fase (especialmente durante la construcción del diagrama) y una experiencia fluida.
- **Idioma Principal:** Código, variables, nombres de componentes y commits estrictamente en **Inglés**. Textos de la interfaz (UI), contenido educativo, comentarios explicativos de lógica de negocio y documentación en **Español**.

## 2. Stack Tecnológico Principal

- **Gestor de Paquetes:** Usa exclusivamente `bun`. Prohibido usar `npm` o `yarn` en los scripts de bash, en la instalación de dependencias, o en linting/formatting.
- **Framework:** Next.js (App router, src directory).
- **Lenguaje:** JavaScript puro (sin TypeScript).
- **Tailwind CSS v4:** Utilizamos un enfoque 100% _CSS-first_. **No** intentes buscar, leer ni crear un archivo `tailwind.config.js`. Usa las clases utilitarias directamente y la nueva sintaxis de la versión 4.
- **Componentes UI:** Shadcn UI se usa únicamente como **referencia visual/estética** (espaciado, radios, tipografía). No instalamos ni copiamos sus componentes Radix; todo se construye desde cero con primitivas HTML y Tailwind.
- **Estado Global:** Zustand (Mas detalle en la sección 4.1).
- **Iconos:** Utiliza siempre el paquete oficial `@boxicons/react`. Prohibido usar SVGs inline crudos o cualquier otro tipo de icono (SVG, emoji, texto) a menos que el usuario lo autorice explícitamente. Si el ícono que necesitas no existe en `@boxicons/react`, pregúntame antes de usar una alternativa.
- **Animaciones**: Usa siempre la librería `motion/react` para implementar animaciones. No uses la versión anterior `framer-motion`.

## 3. Nomenclatura (Naming Conventions)

- **Variables booleanas:** Deben empezar siempre con prefijos claros como `is`, `has`, `should` o `can` (ej. `isOpen`, `hasAccess`).
- **Nombres descriptivos:** Cero abreviaturas crípticas. Nombres largos y explícitos. Usa `userProfileList` en lugar de `usrData` o simplemente `data`.
- **Componentes y Funciones:**
  - Para definir un componente usa siempre _function Component()_.
  - **Export function obligatorio:** Todos los componentes deben exportarse con `export function ComponentName()`. Prohibido usar `export default`, `export const` o `export function` anónima para componentes.
  - Las funciones (no componentes) deben ser siempre _arrow functions_.

## 4. Reglas de Arquitectura y Estilo

- **Componentes:** Usa siempre componentes funcionales. Separa la lógica de la UI utilizando Custom Hooks.
- **Server vs Client Components:** Por defecto, el `page.jsx` de cada fase es un Server Component que solo importa y monta el componente cliente correspondiente. Dado que las cuatro fases dependen de Zustand e interacción constante (drag-and-drop, clicks, animaciones), el contenido real de cada fase (canvas, tokens, simulación) será casi siempre `'use client'`. Mantén como Server Component únicamente lo que es realmente estático y no depende de hooks: layout raíz, headers, y textos educativos fijos que no cambian con el estado. No marques todo como cliente "por si acaso", pero tampoco fuerces server-render en algo que usa un store.
- **Manejo de Errores:** Utiliza bloques `try/catch` y siempre retorna mensajes de error claros al usuario. Nunca suprimas errores silenciosamente.
- **Estilos:** Utiliza un enfoque _Tailwind-first_. Evita crear archivos CSS o módulos a menos que sea estrictamente necesario para animaciones complejas.

### 4.1 Convenciones de Zustand

- **Un store por fase:** `useAnalysisStore`, `usePlanStore`, `useDesignStore`, `useVerifyStore`. Evita un único store monolítico; si necesitas compartir datos entre fases, expón selectors específicos o un store puente liviano, no fusiones los stores.
- **Persistencia:** Usa el middleware `persist` (localStorage) en cada store de fase para que el estudiante no pierda su progreso al recargar o cerrar el navegador.
- **Acciones:** Nombra las acciones con verbos claros y completos (`addToken`, `removeVariable`, `setBlockPosition`). Prohibidas las abreviaturas (`upd`, `rm`, `setVar`).
- **Selectors:** Al leer del store dentro de un componente, usa selectors específicos (`useDesignStore((state) => state.blocks)`) en lugar de desestructurar el store completo. Esto es crítico en el canvas de Diseño, donde puede haber muchos bloques SVG y un re-render innecesario degrada la experiencia.

### 4.2 Estructura de Carpetas

```
src/
  components/   → UI pura y reutilizable, sin lógica de dominio (botones, inputs, cards)
  modules/      → Lógica específica de cada fase (Analysis, Plan, Design, Verify), incluyendo sus stores, hooks y subcomponentes propios
  views/        → Vistas completas que ensamblan módulos para cada fase (evita el nombre "pages" para no confundir con el Pages Router legacy)
  layouts/      → Layouts compartidos (shell de la app, navegación entre fases)
```

La regla general: si un componente es reutilizable y agnóstico al dominio, va en `components`. Si pertenece a la lógica de una fase específica, va en `modules/<phase>`.

## 5. UI/UX, Estilos y Animaciones (Look & Feel)

- **Estética Visual:** Buscamos un diseño tipo "SaaS High-End" (inspirado en Linear, Vercel y Shadcn UI). Debe ser minimalista, usar mucho espacio en blanco (whitespace), bordes sutiles y un manejo tipográfico impecable.
- **Filosofía Emil Kowalski:** La interfaz debe sentirse fluida, táctil y nativa.
  - **Microanimaciones y Feedback:** Todo elemento interactivo (botones, tarjetas de tokens, variables) debe tener estados visuales claros para `:hover`, `:focus` y `:active` (ej. escalar ligeramente hacia abajo al hacer clic).
  - **Físicas sobre Tiempos:** Para animaciones de transición, prefiere curvas de tipo _spring_ (resorte) en lugar de _ease_ o _linear_. Las animaciones deben ser rápidas, ágiles y nunca bloquear al usuario.
  - **Atención al Detalle:** Usa sombras muy suaves, fondos con sutiles desenfoques (backdrop-blur para un look "Liquid Glass" si aplica), y transiciones fluidas al montar/desmontar componentes del DOM.
- **Tailwind CSS v4 (CSS-first):**
  - Todo el estilizado se hace con clases utilitarias de Tailwind v4.
  - **No busques ni crees** un `tailwind.config.js`.
  - Usa variables CSS nativas en tu archivo de estilos principal para colores de marca y tipografías.
- **Construcción de Componentes:**
  - Usa componentes sin estado (dumb components) para la UI pura.
  - Asegúrate de que las áreas interactuables (botones, áreas de _drag and drop_ en la fase de Diseño) tengan un área de clic generosa y accesible.

### 5.1 Gestión de Colores y Variables (Semántica Estricta)

- **Prohibido usar valores absolutos o hardcodeados** en las clases de Tailwind (ej. `bg-gray-900`, `text-blue-500`, `bg-[#121212]`).
- **Usa exclusivamente tokens semánticos** y variables CSS que ya estén definidas en tu archivo `global.css` (ej. `bg-background`, `text-foreground`, `border-border`, `bg-primary`).
- **Regla de Creación (Pausa Obligatoria):** Si una interfaz o microanimación requiere un color, sombra o token específico que no existe actualmente en el `global.css`, **NO inventes la clase ni uses un valor arbitrario**. Debes detenerte, proponerme la nueva variable semántica y esperar mi autorización expresa antes de agregarla al archivo global y aplicarla.

### 5.2 Accesibilidad

- Las categorías de color **nunca** deben depender únicamente del color para comunicar significado. Cada categoría debe llevar también un ícono o etiqueta de texto distintiva, para que estudiantes con daltonismo puedan distinguirlas igual que el resto.
- Las áreas interactuables deben ser navegables por teclado cuando sea razonable (foco visible, orden lógico de tabulación), sobre todo en el canvas de Diseño.

### 5.3 Morphing de Elementos UI (Botón → Modal / Dropdown / Drawer)

Este patrón es independiente del canvas de Diseñar; aplica a cualquier botón de la app que se transforme en un panel más grande (modal, dropdown, tarjeta expandida, etc.).

**Regla general (aplica a ambos):**

- Usa shared layout transition de Motion: el botón disparador y el contenedor destino comparten el mismo `layoutId`, único por instancia (ej. `layoutId={`modal-${itemId}`}`), nunca un string genérico repetido — si hay varias instancias del mismo patrón en la pantalla, un `layoutId` duplicado causa colisiones y morphs cruzados entre elementos distintos.
- **Ambos elementos** que comparten `layoutId` deben recibir `transition={morphSpring}` para que la animación funcione. Sin el `transition` prop, Motion usa valores por defecto que no producen el efecto deseado.
- Para las configuraciones de animación, usa el archivo `src/lib/animations.js` donde se exportan las configs (`morphSpring`, `contentBlurEnter`, `contentBlurExit`, `fadeIn`).
- El blur se aplica **únicamente** al contenido interno, envuelto en su propio `motion.div` — nunca al contenedor que lleva el `layoutId`. Si desenfocas la forma completa, el borde y el border-radius del morph también se ven borrosos, que no es el efecto buscado.
- Spring de la forma: `{ type: "spring", stiffness: 380, damping: 22 }`. Ajustar damping para controlar bounce (menor = más rebote).
- Precaución de rendimiento: combinar `filter: blur()` con una animación de layout (transform) puede causar parpadeos en algunos navegadores (Safari es el más propenso). Mantén el blur radius en 16px como máximo y prueba en dispositivos reales antes de dar por terminada la animación.
  **Modal (overlay centrado):**

- El `layoutId` crece hasta una caja centrada en pantalla (`position: fixed`, centrado con flex, `max-width`/`max-height` definidos).
- El backdrop (oscurecido + `backdrop-blur`) es independiente del shared layout: anímalo por separado con `AnimatePresence` y un simple fade de opacidad. No forma parte del morph del botón.
  **Dropdown (panel anclado):**

- Los subcomponentes se exportan como named exports independientes (estilo shadcn), no como propiedades del componente padre. Ej: `export function DropdownItem()` y se importa con `import { Dropdown, DropdownItem }`. El patrón compuesto (`Dropdown.Item`) no funciona al cruzar la barrera server/client de Next.js porque Turbopack crea un proxy que no reenvía el acceso a propiedades estáticas.
- Dos elementos comparten `layoutId`: un `motion.button` (trigger) y un `motion.div` (panel). El panel se renderiza dentro de `AnimatePresence`.
- El panel se posiciona con `absolute top-0 left-0` (misma posición que el trigger), no con `top-full`. El morph se siente como si el botón se expandiera hacia abajo.
- El trigger usa `buttonVariants` (importado de `Button.jsx`) para mantener consistencia visual con el resto de botones de la app.
- El trigger del botón se blurrea al abrir el dropdown (de nítido a `blur(16px)` + `opacity: 0`). En el panel, el mismo trigger aparece como header con un botón ✕ para cerrar.
- Todo el contenido del panel (header + items) se blurrea como una sola unidad: entra con `blur(16px)` + `opacity: 0` → `blur(0px)` + `opacity: 1`. El blur se aplica a un `motion.div` interno que envuelve header e items, nunca al contenedor que lleva el `layoutId`.
- Config del fade-in del contenido: `{ duration: 0.3, ease: "easeOut", delay: 0.15 }`.
- El panel tiene `overflow-hidden` para que el contenido no se vea durante el morph de cierre.
- No requiere backdrop oscurecido. Para cerrar al hacer click afuera, usa un listener `mousedown` con `contains()`.

## 6. Fase de Verificación: Casos Límite

- La simulación paso a paso debe tener un **límite máximo de pasos** (define un número razonable, ej. 1000) antes de abortar automáticamente, para evitar que un loop infinito en el algoritmo del estudiante cuelgue el navegador.
- Si se alcanza el límite o se detecta un ciclo sin condición de salida, el mensaje de error debe ser **educativo**, no técnico: explica al estudiante qué patrón en su diagrama probablemente causa el problema (ej. "Tu diagrama repite este bloque sin una condición que lo detenga, revisa la condición de tu ciclo"), no solo "Error: max steps exceeded".
- Cualquier estado intermedio inválido (variable usada antes de inicializarse, división por cero, etc.) debe detener la simulación y mostrar el bloque exacto del diagrama donde ocurrió, no solo un mensaje genérico.

## 7. Anti-Patrones (QUÉ NO HACER)

- **No instales dependencias sin permiso explícito:** Nunca ejecutes `bun add`, `bun install` ni ningún comando que modifique `package.json` sin preguntarme primero y recibir mi autorización expresa. Esto incluye cualquier paquete o librería, sin excepción. Primero pregunta, espera mi respuesta, luego instala.
- **No dejes `console.log`:** Limpia tus logs de depuración antes de dar por terminado un archivo.
- **No uses código obsoleto:** Asegúrate de usar las APIs modernas de los frameworks (Ej: no uses `getServerSideProps` si estamos en Next.js App Router).
- **No uses animaciones CSS complejas (keyframes largos):** Utiliza Motion con configuraciones de 'spring' (stiffness y damping) para lograr el "Emil Kowalski feel".
- **No fusiones los stores de Zustand** en uno solo "por simplicidad"; rompe la separación por fase definida en 4.1.

## 8. Calidad de Código y Testing

- **Linting/Formatting:** ESLint + Prettier, instalados y ejecutados con `bun` (`bun run lint`, `bun run format`). Configura reglas consistentes con las convenciones de nomenclatura de la sección 3.
- **Testing:** No se requiere una suite de UI completa por ahora. Sí son obligatorios los tests con **Vitest** para lógica pura y crítica: los stores de Zustand (acciones y selectors) y el motor de simulación de la fase de Verificación.

## 9. Flujo de Trabajo

- **Planeación:** Antes de escribir código, presenta un plan breve. Para componentes grandes o importantes, muestra el plan completo (estructura, props, subcomponentes, comportamiento) y espera veredicto del usuario antes de implementar.
- **Comentarios:** No comentes obviedades (ej. `// suma dos números`). Comenta el **por qué** de una decisión técnica o de negocio, no el **qué**.
- **Prohibido usar JSDoc:** No uses bloques `/** */` para documentar funciones o componentes. El código debe ser auto-documentado con nombres descriptivos.
- **Refactorización:** Si ves código duplicado mientras trabajas en una tarea, extráelo a un helper o custom hook, pero infórmamelo en el log.
- **Commits:** Usa Conventional Commits en inglés (`feat`, `fix`, `refactor`, `docs`, `chore`), con un mensaje corto y descriptivo del cambio.
