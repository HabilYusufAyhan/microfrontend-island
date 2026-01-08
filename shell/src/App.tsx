import { useRef, useEffect } from "react";
import { Palmtree } from "lucide-react";

function App() {
  const vueRef = useRef(null);
  const reactRef = useRef(null);

  useEffect(() => {
    if (vueRef.current) {
      import("vueTodo/TodoApp").then((m) => m.default(vueRef.current));
    }
    if (reactRef.current) {
      import("reactProfile/ProfileApp").then((m) =>
        m.default(reactRef.current)
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/50 to-slate-900 p-6 md:p-10">
      {/* Animated background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm text-zinc-400">
              Microfrontend Architecture
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-indigo-200 bg-clip-text text-transparent flex items-center justify-center gap-4">
            <Palmtree className="w-12 h-12 text-emerald-400" />
            Island Architecture
          </h1>
          <p className="text-lg text-zinc-400 max-w-xl mx-auto">
            Vue ve React uygulamaları tek bir shell içinde,{" "}
            <span className="text-purple-400">Module Federation</span> ile
            birleşiyor
          </p>
        </header>

        {/* Islands Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Vue Island */}
          <div className="group grid">
            <div className="col-start-1 row-start-1 bg-gradient-to-r from-emerald-500 to-teal-500 blur-xl opacity-20 group-hover:opacity-40 transition duration-500 rounded-2xl" />
            <div
              ref={vueRef}
              className="col-start-1 row-start-1 relative bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10"
            />
          </div>

          {/* React Island */}
          <div className="group grid">
            <div className="col-start-1 row-start-1 bg-gradient-to-r from-cyan-500 to-blue-500 blur-xl opacity-20 group-hover:opacity-40 transition duration-500 rounded-2xl" />
            <div
              ref={reactRef}
              className="col-start-1 row-start-1 relative bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10"
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center">
          <div className="inline-flex items-center gap-4 text-sm text-zinc-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Vue 3
            </span>
            <span className="w-px h-4 bg-zinc-700" />
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-500" />
              React 19
            </span>
            <span className="w-px h-4 bg-zinc-700" />
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              Vite 7
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
