# Hooks Reference

> Referencia breve por hook: propósito, parámetros, retorno y ejemplo corto.

## State

### useToggle
- **Propósito:** alternar un booleano.
- **Parámetros:** `initialValue = false`.
- **Retorno:** `[value, { toggle, setTrue, setFalse, setValue }]`.
- **Ejemplo:** `const [open, { toggle }] = useToggle();`

### useBoolean
- **Propósito:** helpers semánticos para booleans.
- **Parámetros:** `initialValue = false`.
- **Retorno:** `{ value, isTrue, isFalse, toggle, setTrue, setFalse }`.
- **Ejemplo:** `const bool = useBoolean();`

### useCounter
- **Propósito:** contador con límites y step.
- **Parámetros:** `initialValue`, `options { min, max, step }`.
- **Retorno:** `{ count, increment, decrement, reset, set }`.
- **Ejemplo:** `const counter = useCounter(0, { min: 0 });`

### usePrevious
- **Propósito:** leer el valor previo.
- **Parámetros:** `value`.
- **Retorno:** valor previo.
- **Ejemplo:** `const prev = usePrevious(value);`

### useIsFirstRender
- **Propósito:** saber si el render actual es el primero.
- **Parámetros:** ninguno.
- **Retorno:** `boolean`.
- **Ejemplo:** `const first = useIsFirstRender();`

### useMounted
- **Propósito:** evitar setState tras unmount.
- **Parámetros:** ninguno.
- **Retorno:** `ref` (`mountedRef.current`).
- **Ejemplo:** `const mountedRef = useMounted();`

### useControlledState
- **Propósito:** soportar modo controlado/no controlado.
- **Parámetros:** `{ value, defaultValue, onChange }`.
- **Retorno:** `{ value, setValue, isControlled }`.
- **Ejemplo:** `const state = useControlledState({ value, onChange });`

## Time

### useDebounce
- **Propósito:** retrasar actualización de valor.
- **Parámetros:** `value`, `delay`.
- **Retorno:** valor debounced.
- **Ejemplo:** `const term = useDebounce(search, 300);`

### useThrottle
- **Propósito:** limitar frecuencia de cambios.
- **Parámetros:** `value`, `delay`.
- **Retorno:** valor throttled.
- **Ejemplo:** `const throttled = useThrottle(scrollY, 200);`

### useTimeout
- **Propósito:** ejecutar callback tras un tiempo.
- **Parámetros:** `callback`, `delay`.
- **Retorno:** `{ start, clear }`.
- **Ejemplo:** `const timeout = useTimeout(cb, 1000);`

### useInterval
- **Propósito:** ejecutar callback en intervalos.
- **Parámetros:** `callback`, `delay`, `enabled`.
- **Retorno:** `void`.
- **Ejemplo:** `useInterval(tick, 1000, playing);`

### useCountdown
- **Propósito:** cuenta regresiva con controles.
- **Parámetros:** `initialSeconds`.
- **Retorno:** `{ secondsLeft, isRunning, start, stop, reset }`.
- **Ejemplo:** `const c = useCountdown(30);`

## DOM & Events

### useOnClickOutside
- **Propósito:** detectar click fuera de un elemento.
- **Parámetros:** `ref`, `handler`, `eventName`.
- **Retorno:** `void`.
- **Ejemplo:** `useOnClickOutside(ref, close);`

### useEventListener
- **Propósito:** suscribir eventos con cleanup.
- **Parámetros:** `eventName`, `handler`, `element`, `options`.
- **Retorno:** `void`.
- **Ejemplo:** `useEventListener('resize', onResize);`

### useKeyPress
- **Propósito:** saber si una tecla está presionada.
- **Parámetros:** `targetKey`.
- **Retorno:** `boolean`.
- **Ejemplo:** `const esc = useKeyPress('Escape');`

### useHover
- **Propósito:** detectar hover sobre un nodo.
- **Parámetros:** ninguno.
- **Retorno:** `[ref, isHovered]`.
- **Ejemplo:** `const [ref, hovered] = useHover();`

### useFocus
- **Propósito:** controlar foco de un input/nodo.
- **Parámetros:** ninguno.
- **Retorno:** `{ ref, isFocused, focus }`.
- **Ejemplo:** `const focus = useFocus();`

### useLockBodyScroll
- **Propósito:** bloquear scroll del body.
- **Parámetros:** `locked`.
- **Retorno:** `void`.
- **Ejemplo:** `useLockBodyScroll(open);`

### useScrollPosition
- **Propósito:** leer `scrollX` y `scrollY`.
- **Parámetros:** ninguno.
- **Retorno:** `{ x, y }`.
- **Ejemplo:** `const pos = useScrollPosition();`

### useIntersectionObserver
- **Propósito:** observar visibilidad de un nodo.
- **Parámetros:** `ref`, `options`.
- **Retorno:** `{ entry, isIntersecting }`.
- **Ejemplo:** `const io = useIntersectionObserver(ref);`

### useElementSize
- **Propósito:** observar ancho/alto de un nodo.
- **Parámetros:** `ref`.
- **Retorno:** `{ width, height }`.
- **Ejemplo:** `const size = useElementSize(ref);`

## Browser / Responsive

### useWindowSize
- **Propósito:** escuchar tamaño de ventana.
- **Parámetros:** ninguno.
- **Retorno:** `{ width, height }`.
- **Ejemplo:** `const size = useWindowSize();`

### useMediaQuery
- **Propósito:** evaluar media query CSS.
- **Parámetros:** `query`.
- **Retorno:** `boolean`.
- **Ejemplo:** `const desktop = useMediaQuery('(min-width:1024px)');`

### useBreakpoint
- **Propósito:** resolver breakpoint actual.
- **Parámetros:** `breakpoints?`.
- **Retorno:** `{ current, width, isAbove }`.
- **Ejemplo:** `const bp = useBreakpoint();`

### usePageTitle
- **Propósito:** actualizar `document.title`.
- **Parámetros:** `title`, `options { preserveOnUnmount }`.
- **Retorno:** `void`.
- **Ejemplo:** `usePageTitle('Dashboard');`

### useClipboard
- **Propósito:** copiar texto al portapapeles.
- **Parámetros:** `options { resetAfter }`.
- **Retorno:** `{ copy, copiedText, status }`.
- **Ejemplo:** `const { copy } = useClipboard();`

## Persistence

### useLocalStorage
- **Propósito:** estado persistido en localStorage.
- **Parámetros:** `key`, `initialValue`.
- **Retorno:** `[value, setValue, remove]`.
- **Ejemplo:** `const [theme, setTheme] = useLocalStorage('theme', 'light');`

### useSessionStorage
- **Propósito:** estado persistido en sessionStorage.
- **Parámetros:** `key`, `initialValue`.
- **Retorno:** `[value, setValue, remove]`.
- **Ejemplo:** `const [token] = useSessionStorage('token', '');`

## Async

### useAsyncFn
- **Propósito:** ejecutar función async bajo demanda.
- **Parámetros:** `asyncFunction`, `initialData`.
- **Retorno:** `{ data, error, loading, execute }`.
- **Ejemplo:** `const req = useAsyncFn(loadUser);`

### useAsync
- **Propósito:** ejecutar async automáticamente con deps.
- **Parámetros:** `asyncFunction`, `deps`, `initialData`.
- **Retorno:** `{ data, error, loading, execute, refetch }`.
- **Ejemplo:** `const state = useAsync(fetchData, [id]);`

### useFetch
- **Propósito:** fetch JSON con estados.
- **Parámetros:** `url`, `options`, `deps`.
- **Retorno:** estado async de request.
- **Ejemplo:** `const users = useFetch('/api/users');`

### usePolling
- **Propósito:** repetir ejecución async por intervalo.
- **Parámetros:** `asyncFunction`, `intervalMs`, `enabled`.
- **Retorno:** estado async + `refetch`.
- **Ejemplo:** `const clock = usePolling(getClock, 3000);`

## Forms

### useForm
- **Propósito:** manejo simple de `values`, `errors`, `touched`.
- **Parámetros:** `{ initialValues, validate }`.
- **Retorno:** API de formulario (`handleChange`, `handleBlur`, `setValue`, `reset`, etc.).
- **Ejemplo:** `const form = useForm({ initialValues, validate });`

### useField
- **Propósito:** binding de un campo individual.
- **Parámetros:** `form`, `name`.
- **Retorno:** `{ name, value, error, touched, onChange, onBlur, setValue }`.
- **Ejemplo:** `const email = useField(form, 'email');`
