import { createRoot } from "react-dom/client";
import { useState } from "react";
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
} from "lucide-react";
import "./index.css";

export default function mount(el: HTMLElement) {
  function Profile() {
    const [activeTab, setActiveTab] = useState<"about" | "skills" | "stats">(
      "about"
    );

    const skills = [
      { name: "React", level: 95, color: "bg-cyan-500" },
      { name: "TypeScript", level: 90, color: "bg-blue-500" },
      { name: "Node.js", level: 85, color: "bg-green-500" },
      { name: "GraphQL", level: 75, color: "bg-pink-500" },
    ];

    const tabs = [
      { id: "about" as const, label: "Hakkında" },
      { id: "skills" as const, label: "Yetenekler" },
      { id: "stats" as const, label: "İstatistik" },
    ];

    return (
      <div className="p-6 font-sans">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="m-0 text-lg font-semibold text-white">
              Developer Profile
            </h3>
            <p className="m-0 text-xs text-zinc-500">
              Profil bilgilerinizi görüntüleyin
            </p>
          </div>
          <span className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-gradient-to-r from-cyan-500 to-cyan-600 text-white">
            React 19
          </span>
        </div>

        {/* Profile Card */}
        <div className="bg-white/[0.03] rounded-2xl border border-white/5 overflow-hidden">
          {/* Avatar Section */}
          <div className="bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 p-6 flex flex-col items-center gap-3">
            <div className="w-[72px] h-[72px] rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-cyan-500/40 border-[3px] border-white/20">
              YA
            </div>
            <div className="text-center">
              <h4 className="m-0 text-lg font-semibold text-white">
                Yusuf Ayhan
              </h4>
              <p className="mt-1 mb-0 text-sm text-zinc-500">
                Full Stack Developer
              </p>
            </div>
            <div className="flex gap-2">
              {[Github, Linkedin, Twitter].map((Icon, i) => (
                <button
                  key={i}
                  className="w-8 h-8 rounded-lg border border-white/10 bg-white/5 cursor-pointer text-sm flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <Icon className="w-4 h-4 text-zinc-400" />
                </button>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-white/5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 border-none text-xs font-semibold uppercase tracking-wider cursor-pointer transition-all ${
                  activeTab === tab.id
                    ? "bg-cyan-500/10 text-cyan-400 border-b-2 border-b-cyan-400"
                    : "bg-transparent text-zinc-500 border-b-2 border-b-transparent hover:text-zinc-400"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-4 min-h-[180px]">
            {activeTab === "about" && (
              <div className="flex flex-col gap-3">
                {[
                  { icon: MapPin, text: "İstanbul, Türkiye" },
                  { icon: Briefcase, text: "3+ yıl deneyim" },
                  { icon: GraduationCap, text: "Bilgisayar Mühendisliği" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 bg-white/[0.02] rounded-xl"
                  >
                    <item.icon className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm text-zinc-400">{item.text}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "skills" && (
              <div className="flex flex-col gap-3">
                {skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-sm text-zinc-200">
                        {skill.name}
                      </span>
                      <span className="text-xs text-zinc-500">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${skill.color} rounded-full transition-all duration-500`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "stats" && (
              <div className="grid grid-cols-3 gap-2">
                {[
                  { icon: FolderGit2, value: "42", label: "Proje" },
                  { icon: GitCommitHorizontal, value: "1.2k", label: "Commit" },
                  { icon: Package, value: "15", label: "Repo" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="text-center p-4 bg-white/[0.02] rounded-xl"
                  >
                    <div className="flex justify-center mb-1">
                      <stat.icon className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div className="text-lg font-bold text-white">
                      {stat.value}
                    </div>
                    <div className="text-[10px] text-zinc-500 uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  createRoot(el).render(<Profile />);
}
