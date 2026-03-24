import { useEffect, useMemo, useRef, useState } from 'react';
import {
  useAsync,
  useAsyncFn,
  useBoolean,
  useBreakpoint,
  useClipboard,
  useControlledState,
  useCountdown,
  useCounter,
  useDebounce,
  useElementSize,
  useEventListener,
  useFetch,
  useField,
  useFocus,
  useForm,
  useHover,
  useIntersectionObserver,
  useInterval,
  useIsFirstRender,
  useKeyPress,
  useLocalStorage,
  useLockBodyScroll,
  useMediaQuery,
  useMounted,
  useOnClickOutside,
  usePolling,
  usePrevious,
  useScrollPosition,
  useSessionStorage,
  useThrottle,
  useTimeout,
  useToggle,
  useWindowSize
} from '../hooks';

function Card({ title, children }) {
  return (
    <section className="card">
      <h3>{title}</h3>
      {children}
    </section>
  );
}

function StateSection() {
  const [isOpen, toggle] = useToggle(false);
  const bool = useBoolean(true);
  const counter = useCounter(3, { min: 0, max: 10 });
  const previousCount = usePrevious(counter.count);
  const isFirstRender = useIsFirstRender();
  const mountedRef = useMounted();
  const [externalValue, setExternalValue] = useState('controlado externamente');
  const controlled = useControlledState({
    value: externalValue,
    onChange: setExternalValue
  });

  return (
    <div className="grid">
      <Card title="useToggle / useBoolean">
        <p>Toggle: {String(isOpen)}</p>
        <button onClick={toggle.toggle}>Alternar</button>
        <p>Boolean: {String(bool.value)}</p>
        <button onClick={bool.setTrue}>True</button>
        <button onClick={bool.setFalse}>False</button>
      </Card>

      <Card title="useCounter / usePrevious">
        <p>Actual: {counter.count}</p>
        <p>Anterior: {previousCount ?? '-'}</p>
        <button onClick={() => counter.increment()}>+1</button>
        <button onClick={() => counter.decrement()}>-1</button>
        <button onClick={counter.reset}>Reset</button>
      </Card>

      <Card title="useIsFirstRender / useMounted / useControlledState">
        <p>¿Primer render?: {String(isFirstRender)}</p>
        <p>¿Montado?: {String(mountedRef.current)}</p>
        <input
          value={controlled.value}
          onChange={(event) => controlled.setValue(event.target.value)}
        />
      </Card>
    </div>
  );
}

function TimeSection() {
  const [input, setInput] = useState('escribe rápido');
  const debounced = useDebounce(input, 600);
  const throttled = useThrottle(input, 600);
  const [ticks, setTicks] = useState(0);
  const [timeoutDone, setTimeoutDone] = useState(false);
  const countdown = useCountdown(15);

  useInterval(() => setTicks((current) => current + 1), 1000, true);
  const timeout = useTimeout(() => setTimeoutDone(true), 3000);

  return (
    <div className="grid">
      <Card title="useDebounce / useThrottle">
        <input value={input} onChange={(event) => setInput(event.target.value)} />
        <p>Debounced: {debounced}</p>
        <p>Throttled: {throttled}</p>
      </Card>

      <Card title="useInterval / useTimeout">
        <p>Ticks por intervalo: {ticks}</p>
        <p>Timeout ejecutado: {String(timeoutDone)}</p>
        <button
          onClick={() => {
            setTimeoutDone(false);
            timeout.start();
          }}
        >
          Reintentar timeout
        </button>
      </Card>

      <Card title="useCountdown">
        <p>Segundos: {countdown.secondsLeft}</p>
        <button onClick={countdown.start}>Start</button>
        <button onClick={countdown.stop}>Stop</button>
        <button onClick={() => countdown.reset(15)}>Reset</button>
      </Card>
    </div>
  );
}

function DomSection() {
  const outsideRef = useRef(null);
  const [outsideClicks, setOutsideClicks] = useState(0);
  const keyPressed = useKeyPress('k');
  const [hoverRef, isHovered] = useHover();
  const focus = useFocus();
  const [lockScroll, setLockScroll] = useState(false);
  const scrollPosition = useScrollPosition();
  const observeRef = useRef(null);
  const { isIntersecting } = useIntersectionObserver(observeRef, { threshold: 0.5 });
  const size = useElementSize(observeRef);
  const [mouseMoves, setMouseMoves] = useState(0);

  useOnClickOutside(outsideRef, () => setOutsideClicks((current) => current + 1));
  useLockBodyScroll(lockScroll);
  useEventListener('mousemove', () => setMouseMoves((current) => current + 1));

  return (
    <div className="grid">
      <Card title="Eventos y foco">
        <div ref={outsideRef} className="box">
          Haz click fuera de este cuadro.
        </div>
        <p>Clicks fuera: {outsideClicks}</p>
        <p>Tecla K presionada: {String(keyPressed)}</p>
        <input ref={focus.ref} placeholder="Prueba focus" />
        <p>Focused: {String(focus.isFocused)}</p>
        <button onClick={focus.focus}>Forzar focus</button>
      </Card>

      <Card title="Hover / Scroll / Body lock">
        <div ref={hoverRef} className="box">Hover area</div>
        <p>Hover activo: {String(isHovered)}</p>
        <p>Scroll Y: {scrollPosition.y}</p>
        <p>Mouse moves: {mouseMoves}</p>
        <button onClick={() => setLockScroll((current) => !current)}>
          {lockScroll ? 'Desbloquear scroll' : 'Bloquear scroll'}
        </button>
      </Card>

      <Card title="Intersection / Element size">
        <div ref={observeRef} className="observer-box">
          Redimensiona la ventana o desplázate
        </div>
        <p>Visible al 50%: {String(isIntersecting)}</p>
        <p>
          Tamaño: {Math.round(size.width)} x {Math.round(size.height)}
        </p>
      </Card>
    </div>
  );
}

function BrowserSection() {
  const windowSize = useWindowSize();
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const breakpoint = useBreakpoint();
  const clipboard = useClipboard();

  return (
    <div className="grid">
      <Card title="Window / Media / Breakpoint">
        <p>
          Ventana: {windowSize.width} x {windowSize.height}
        </p>
        <p>Desktop: {String(isDesktop)}</p>
        <p>Breakpoint activo: {breakpoint.current}</p>
      </Card>

      <Card title="useClipboard">
        <button onClick={() => clipboard.copy('Texto copiado desde hook library')}>
          Copiar texto
        </button>
        <p>Estado: {clipboard.status}</p>
        <p>Último texto: {clipboard.copiedText || '-'}</p>
      </Card>
    </div>
  );
}

function StorageSection() {
  const [name, setName, clearName] = useLocalStorage('demo-name', 'Ada');
  const [sessionToken, setSessionToken, clearSessionToken] = useSessionStorage(
    'demo-token',
    'abc-123'
  );

  return (
    <div className="grid">
      <Card title="useLocalStorage">
        <input value={name} onChange={(event) => setName(event.target.value)} />
        <button onClick={clearName}>Limpiar</button>
      </Card>

      <Card title="useSessionStorage">
        <input
          value={sessionToken}
          onChange={(event) => setSessionToken(event.target.value)}
        />
        <button onClick={clearSessionToken}>Limpiar</button>
      </Card>
    </div>
  );
}

const wait = (ms) => new Promise((resolve) => {
  window.setTimeout(resolve, ms);
});

function AsyncSection() {
  const asyncData = useAsync(async () => {
    await wait(400);
    return { timestamp: Date.now() };
  }, []);

  const asyncFn = useAsyncFn(async (value) => {
    await wait(300);
    if (!value) {
      throw new Error('Debes escribir un valor');
    }

    return `Procesado: ${value}`;
  });

  const [query, setQuery] = useState('react');
  const fetchState = useFetch(
    `https://api.github.com/search/repositories?q=${query}&per_page=1`,
    {},
    [query]
  );

  const polling = usePolling(async () => {
    return { now: new Date().toISOString() };
  }, 5000, true);

  return (
    <div className="grid">
      <Card title="useAsync">
        <p>Loading: {String(asyncData.loading)}</p>
        <p>Timestamp: {asyncData.data?.timestamp ?? '-'}</p>
        <button onClick={asyncData.refetch}>Refetch</button>
      </Card>

      <Card title="useAsyncFn">
        <button onClick={() => asyncFn.execute('demo')}>Ejecutar</button>
        <p>Loading: {String(asyncFn.loading)}</p>
        <p>Data: {asyncFn.data ?? '-'}</p>
        <p>Error: {asyncFn.error?.message ?? '-'}</p>
      </Card>

      <Card title="useFetch / usePolling">
        <input value={query} onChange={(event) => setQuery(event.target.value)} />
        <p>Repo: {fetchState.data?.items?.[0]?.full_name ?? '-'}</p>
        <p>Error fetch: {fetchState.error?.message ?? '-'}</p>
        <p>Polling now: {polling.data?.now ?? '-'}</p>
      </Card>
    </div>
  );
}

function FormSection() {
  const form = useForm({
    initialValues: { email: '', password: '' },
    validate: (values) => {
      const errors = {};

      if (!values.email.includes('@')) {
        errors.email = 'Email inválido';
      }

      if (values.password.length < 6) {
        errors.password = 'Mínimo 6 caracteres';
      }

      return errors;
    }
  });

  const email = useField(form, 'email');
  const password = useField(form, 'password');

  const canSubmit = useMemo(
    () =>
      Object.keys(form.errors).length === 0 &&
      Boolean(form.values.email) &&
      Boolean(form.values.password),
    [form.errors, form.values.email, form.values.password]
  );

  useEffect(() => {
    form.validateForm();
  }, [form.values.email, form.values.password]);

  return (
    <div className="grid">
      <Card title="useForm / useField">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            form.validateForm();
          }}
        >
          <input
            name={email.name}
            value={email.value}
            onChange={email.onChange}
            onBlur={email.onBlur}
            placeholder="Email"
          />
          {email.touched && email.error && <p className="error">{email.error}</p>}

          <input
            name={password.name}
            value={password.value}
            onChange={password.onChange}
            onBlur={password.onBlur}
            type="password"
            placeholder="Password"
          />
          {password.touched && password.error && (
            <p className="error">{password.error}</p>
          )}

          <div className="row">
            <button type="submit" disabled={!canSubmit}>
              Enviar
            </button>
            <button type="button" onClick={() => form.reset()}>
              Reset
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export function HookShowcase() {
  return (
    <div className="showcase">
      <h2>Estado</h2>
      <StateSection />

      <h2>Tiempo</h2>
      <TimeSection />

      <h2>DOM y Eventos</h2>
      <DomSection />

      <h2>Viewport y Browser</h2>
      <BrowserSection />

      <h2>Persistencia</h2>
      <StorageSection />

      <h2>Async</h2>
      <AsyncSection />

      <h2>Formularios</h2>
      <FormSection />
    </div>
  );
}
