import { usePageTitle } from './hooks';
import { HookShowcase } from './demo/HookShowcase';

function App() {
  usePageTitle('Hook Library Showcase', { preserveOnUnmount: true });

  return (
    <main className="app-shell">
      <header>
        <h1>React Hook Library</h1>
        <p>Showcase centrado únicamente en hooks reutilizables.</p>
      </header>
      <HookShowcase />
    </main>
  );
}

export default App;
