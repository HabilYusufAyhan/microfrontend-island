import { useRef, useEffect, useState } from "react";
import { Palmtree, Sparkles, Zap } from "lucide-react";

function App() {
  const vueRef = useRef(null);
  const reactRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f] p-6 md:p-10 overflow-hidden">
      {/* Mouse follower glow */}
      <div
        className="fixed w-96 h-96 rounded-full pointer-events-none transition-all duration-300 ease-out"
        style={{
          background:
            "radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)",
          left: mousePos.x - 192,
          top: mousePos.y - 192,
        }}
      />

      {/* Animated grid background */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />

      {/* Floating particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-500/40 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Animated background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-cyan-600/20 rounded-full blur-[100px] animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-fuchsia-600/10 rounded-full blur-[100px] animate-blob animation-delay-4000" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <header className="text-center mb-16 space-y-6 flex flex-col items-center">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md mb-6 hover:bg-white/[0.06] transition-all duration-300 cursor-default group">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-sm text-zinc-300 font-medium">
              Microfrontend Architecture
            </span>
            <Zap className="w-4 h-4 text-yellow-400 group-hover:animate-pulse" />
          </div>

          <div className="relative inline-block">
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 via-fuchsia-500 to-cyan-500 rounded-3xl blur-2xl opacity-20 animate-pulse" />
            <h1 className="relative text-5xl md:text-7xl font-black flex items-center justify-center gap-5">
              <div className="relative">
                <Palmtree className="w-14 h-14 md:w-16 md:h-16 text-emerald-400 animate-sway" />
                <Sparkles className="absolute -top-2 -right-2 w-5 h-5 text-yellow-400 animate-sparkle" />
              </div>
              <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                Island Architecture
              </span>
            </h1>
          </div>

          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Vue ve React uygulamaları tek bir shell içinde,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400 font-semibold">
              Module Federation
            </span>{" "}
            ile birleşiyor
          </p>

          <div className="flex justify-center gap-3 pt-2">
            <div className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Vue 3
            </div>
            <div className="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
              React 19
            </div>
            <div className="px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              Vite 7
            </div>
          </div>
        </header>

        {/* Islands Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Vue Island */}
          <div className="group grid">
            {/* Animated border - same grid cell */}
            <div className="col-start-1 row-start-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-border-spin bg-[length:400%_400%] scale-[1.005]" />
            {/* Glow effect - same grid cell */}
            <div className="col-start-1 row-start-1 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 scale-105" />
            <div
              ref={vueRef}
              className="col-start-1 row-start-1 relative bg-[#0d0d12] backdrop-blur-xl rounded-2xl border border-white/[0.08] overflow-hidden transition-all duration-500 group-hover:translate-y-[-4px] group-hover:shadow-2xl group-hover:shadow-emerald-500/20"
            />
          </div>

          {/* React Island */}
          <div className="group grid">
            {/* Animated border - same grid cell */}
            <div className="col-start-1 row-start-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-border-spin bg-[length:400%_400%] scale-[1.005]" />
            {/* Glow effect - same grid cell */}
            <div className="col-start-1 row-start-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 scale-105" />
            <div
              ref={reactRef}
              className="col-start-1 row-start-1 relative bg-[#0d0d12] backdrop-blur-xl rounded-2xl border border-white/[0.08] overflow-hidden transition-all duration-500 group-hover:translate-y-[-4px] group-hover:shadow-2xl group-hover:shadow-cyan-500/20"
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm">
            <span className="text-xs text-zinc-600">Powered by</span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-emerald-400 transition-colors cursor-default">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50" />
                Vue
              </span>
              <span className="text-zinc-700">×</span>
              <span className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-cyan-400 transition-colors cursor-default">
                <span className="w-2 h-2 rounded-full bg-cyan-500 shadow-lg shadow-cyan-500/50" />
                React
              </span>
              <span className="text-zinc-700">×</span>
              <span className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-purple-400 transition-colors cursor-default">
                <span className="w-2 h-2 rounded-full bg-purple-500 shadow-lg shadow-purple-500/50" />
                Vite
              </span>
            </div>
          </div>
          <p className="mt-4 text-xs text-zinc-700">
            Built with ❤️ using Module Federation
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
