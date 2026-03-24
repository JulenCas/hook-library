# Hook Library (React + JavaScript)

Librería **centrada exclusivamente en hooks reutilizables** para React.

## Estructura

```txt
src/
  hooks/
    state/
    time/
    dom/
    browser/
    persistence/
    async/
    form/
    index.js
  demo/
    HookShowcase.jsx
  App.jsx
```

Cada carpeta agrupa hooks por dominio, y `src/hooks/index.js` centraliza exports para uso en proyectos futuros.

## Instalación y uso local

```bash
npm install
npm run dev
```

## Hooks incluidos

### Estado y control
- `useToggle(initialValue)` → `[value, { toggle, setTrue, setFalse, setValue }]`
- `useBoolean(initialValue)` → `{ value, isTrue, isFalse, toggle, setTrue, setFalse }`
- `useCounter(initialValue, { min, max, step })` → `{ count, increment, decrement, reset, set }`
- `usePrevious(value)` → valor anterior
- `useIsFirstRender()` → `boolean`
- `useMounted()` → `ref` con estado de montaje
- `useControlledState({ value, defaultValue, onChange })` → `{ value, setValue, isControlled }`

### Tiempo
- `useDebounce(value, delay)` → valor debounced
- `useThrottle(value, delay)` → valor throttled
- `useTimeout(callback, delay)` → `{ start, clear }`
- `useInterval(callback, delay, enabled)` → ejecuta callback por intervalo
- `useCountdown(initialSeconds)` → `{ secondsLeft, isRunning, start, stop, reset }`

### DOM y eventos
- `useOnClickOutside(ref, handler, eventName)`
- `useEventListener(eventName, handler, element, options)`
- `useKeyPress(targetKey)` → `boolean`
- `useHover()` → `[ref, isHovered]`
- `useFocus()` → `{ ref, isFocused, focus }`
- `useLockBodyScroll(locked)`
- `useScrollPosition()` → `{ x, y }`
- `useIntersectionObserver(ref, options)` → `{ entry, isIntersecting }`
- `useElementSize(ref)` → `{ width, height }`

### Navegador / responsive
- `useWindowSize()` → `{ width, height }`
- `useMediaQuery(query)` → `boolean`
- `useBreakpoint(breakpoints?)` → `{ current, width, isAbove }`
- `usePageTitle(title, options?)`
- `useClipboard(options?)` → `{ copy, copiedText, status }`

### Persistencia
- `useLocalStorage(key, initialValue)` → `[value, setValue, remove]`
- `useSessionStorage(key, initialValue)` → `[value, setValue, remove]`

### Async
- `useAsync(asyncFn, deps, initialData)` → `{ data, error, loading, execute, refetch }`
- `useAsyncFn(asyncFn, initialData)` → `{ data, error, loading, execute }`
- `useFetch(url, options, deps)` → estado async de fetch JSON
- `usePolling(asyncFn, intervalMs, enabled)` → estado async con refetch periódico

### Formularios
- `useForm({ initialValues, validate })` →
  `{ values, errors, touched, handleChange, handleBlur, setValue, reset, validateForm }`
- `useField(form, name)` → binding de campo

## Demo / showcase

`src/demo/HookShowcase.jsx` incluye ejemplos prácticos por categorías para probar todos los hooks en una sola app.

## Decisiones de diseño

- API homogénea y predecible por categoría.
- Cleanup explícito de listeners, timers y observers.
- Guards básicos para entorno sin navegador cuando aplica.
- Sin providers, sin utilidades puras sueltas y sin sistemas globales.
