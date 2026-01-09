import { createRoot } from "react-dom/client";
import { useState, useEffect } from "react";
import {
  User,
  MapPin,
  Briefcase,
  GraduationCap,
  Github,
  Linkedin,
  Twitter,
  FolderGit2,
  GitCommitHorizontal,
  Package,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import "./index.css";

export default function mount(el: HTMLElement) {
  function Profile() {
    const [activeTab, setActiveTab] = useState<"about" | "skills" | "stats">(
      "about"
    );
    const [animatedSkills, setAnimatedSkills] = useState(false);

    useEffect(() => {
      if (activeTab === "skills") {
        setTimeout(() => {
          setAnimatedSkills(false);
          setTimeout(() => setAnimatedSkills(true), 100);
        }, 0);
      }
    }, [activeTab]);

    const skills = [
      { name: "React", level: 95, color: "from-cyan-400 to-cyan-600" },
      { name: "TypeScript", level: 90, color: "from-blue-400 to-blue-600" },
      { name: "Node.js", level: 85, color: "from-green-400 to-green-600" },
      { name: "GraphQL", level: 75, color: "from-pink-400 to-pink-600" },
    ];

    const tabs = [
      { id: "about" as const, label: "Hakkında", icon: User },
      { id: "skills" as const, label: "Yetenekler", icon: Sparkles },
      { id: "stats" as const, label: "İstatistik", icon: GitCommitHorizontal },
    ];

    return (
      <div className="p-6 font-sans bg-[#0d0d12] relative overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:30px_30px]" />

        <div className="relative">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-xl blur opacity-40 group-hover:opacity-70 transition duration-300" />
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="m-0 text-lg font-bold text-white">
                Developer Profile
              </h3>
              <p className="m-0 text-xs text-zinc-500">
                Profil bilgilerinizi görüntüleyin.
              </p>
            </div>
            <span className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-cyan-500 to-cyan-600 text-white shadow-lg shadow-cyan-500/30">
              React 19
            </span>
          </div>

          {/* Profile Card */}
          <div className="bg-white/[0.02] rounded-2xl border border-white/[0.06] overflow-hidden backdrop-blur-sm">
            {/* Avatar Section */}
            <div className="relative bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-transparent p-8 flex flex-col items-center gap-4">
              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-20 h-20 bg-cyan-500/10 rounded-full blur-2xl" />
              <div className="absolute bottom-4 left-4 w-16 h-16 bg-blue-500/10 rounded-full blur-2xl" />

              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-md opacity-40 group-hover:opacity-70 transition duration-500 animate-pulse" />
                <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-2xl font-black text-white shadow-2xl shadow-cyan-500/40 border-4 border-[#0d0d12] ring-2 ring-white/10">
                  YA
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-2 border-[#0d0d12] flex items-center justify-center">
                  <span className="text-[10px]">✓</span>
                </div>
              </div>

              <div className="text-center">
                <h4 className="m-0 text-xl font-bold text-white flex items-center gap-2 justify-center">
                  Yusuf Ayhan
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                </h4>
                <p className="mt-1 mb-0 text-sm text-zinc-400">
                  Full Stack Developer
                </p>
              </div>

              <div className="flex gap-2">
                {[
                  { Icon: Github, color: "hover:bg-zinc-700 hover:text-white" },
                  {
                    Icon: Linkedin,
                    color: "hover:bg-blue-600 hover:text-white",
                  },
                  { Icon: Twitter, color: "hover:bg-sky-500 hover:text-white" },
                ].map(({ Icon, color }, i) => (
                  <button
                    key={i}
                    className={`w-9 h-9 rounded-xl border border-white/10 bg-white/[0.03] cursor-pointer flex items-center justify-center transition-all duration-300 ${color} hover:scale-110 hover:border-transparent group`}
                  >
                    <Icon className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
                  </button>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/[0.06] bg-white/[0.01]">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-3.5 border-none text-xs font-bold uppercase tracking-wider cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 ${
                    activeTab === tab.id
                      ? "bg-gradient-to-t from-cyan-500/10 to-transparent text-cyan-400 border-b-2 border-b-cyan-400 shadow-[0_2px_20px_-5px_rgba(6,182,212,0.5)]"
                      : "bg-transparent text-zinc-500 border-b-2 border-b-transparent hover:text-zinc-300 hover:bg-white/[0.02]"
                  }`}
                >
                  <tab.icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-5 min-h-[200px]">
              {activeTab === "about" && (
                <div className="flex flex-col gap-3 animate-fadeIn">
                  {[
                    {
                      icon: MapPin,
                      text: "İstanbul, Türkiye",
                      subtext: "GMT+3",
                    },
                    {
                      icon: Briefcase,
                      text: "3+ yıl deneyim",
                      subtext: "Senior",
                    },
                    {
                      icon: GraduationCap,
                      text: "Bilgisayar Mühendisliği",
                      subtext: "BSc",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 p-4 bg-white/[0.02] rounded-xl border border-white/[0.04] hover:bg-white/[0.04] hover:border-cyan-500/20 transition-all duration-300 group cursor-default"
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <item.icon className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div className="flex-1">
                        <span className="text-sm text-zinc-200 font-medium">
                          {item.text}
                        </span>
                        <span className="block text-xs text-zinc-600">
                          {item.subtext}
                        </span>
                      </div>
                      <ExternalLink className="w-4 h-4 text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "skills" && (
                <div className="flex flex-col gap-4 animate-fadeIn">
                  {skills.map((skill, i) => (
                    <div
                      key={skill.name}
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-zinc-200 font-medium">
                          {skill.name}
                        </span>
                        <span className="text-xs text-zinc-400 font-mono bg-white/[0.03] px-2 py-0.5 rounded">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out relative`}
                          style={{
                            width: animatedSkills ? `${skill.level}%` : "0%",
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "stats" && (
                <div className="grid grid-cols-3 gap-3 animate-fadeIn">
                  {[
                    {
                      icon: FolderGit2,
                      value: "42",
                      label: "Proje",
                      trend: "+5",
                    },
                    {
                      icon: GitCommitHorizontal,
                      value: "1.2k",
                      label: "Commit",
                      trend: "+128",
                    },
                    { icon: Package, value: "15", label: "Repo", trend: "+2" },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="relative text-center p-5 bg-white/[0.02] rounded-xl border border-white/[0.04] hover:bg-white/[0.04] hover:border-cyan-500/20 transition-all duration-300 group cursor-default overflow-hidden"
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      <div className="absolute top-2 right-2 text-[10px] text-emerald-400 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                        {stat.trend}
                      </div>
                      <div className="flex justify-center mb-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <stat.icon className="w-5 h-5 text-cyan-400" />
                        </div>
                      </div>
                      <div className="text-2xl font-black text-white mb-1">
                        {stat.value}
                      </div>
                      <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-medium">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  createRoot(el).render(<Profile />);
}
