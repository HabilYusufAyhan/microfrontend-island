import { createApp, ref, watch, computed } from "vue";
import {
  CheckCircle,
  Plus,
  X,
  Check,
  ClipboardList,
  PartyPopper,
  Sparkles,
  ListTodo,
} from "lucide-vue-next";
import "./index.css";

export default function mount(el: HTMLElement | null) {
  if (!el) return;

  const App = {
    components: {
      CheckCircle,
      Plus,
      X,
      Check,
      ClipboardList,
      PartyPopper,
      Sparkles,
      ListTodo,
    },
    setup() {
      const todos = ref<{ id: number; text: string; completed: boolean }[]>([]);
      const text = ref("");
      const showCelebration = ref(false);
      const inputFocused = ref(false);
      let nextId = 1;

      const addTodo = () => {
        if (text.value.trim()) {
          todos.value.push({
            id: nextId++,
            text: text.value,
            completed: false,
          });
          text.value = "";
        }
      };

      const toggleTodo = (id: number) => {
        const todo = todos.value.find((t) => t.id === id);
        if (todo) todo.completed = !todo.completed;
      };

      const removeTodo = (id: number) => {
        todos.value = todos.value.filter((t) => t.id !== id);
      };

      const completedCount = computed(
        () => todos.value.filter((t) => t.completed).length
      );

      const allCompleted = computed(
        () =>
          todos.value.length > 0 && completedCount.value === todos.value.length
      );

      const progressPercent = computed(() =>
        todos.value.length > 0
          ? (completedCount.value / todos.value.length) * 100
          : 0
      );

      // Watch for all todos completed
      watch(allCompleted, (newVal) => {
        if (newVal) {
          showCelebration.value = true;
          setTimeout(() => {
            showCelebration.value = false;
          }, 3000);
        }
      });

      return {
        todos,
        text,
        addTodo,
        toggleTodo,
        removeTodo,
        completedCount,
        showCelebration,
        allCompleted,
        progressPercent,
        inputFocused,
      };
    },
    template: `
      <div class="p-6 font-sans relative overflow-hidden bg-[#0d0d12]">
        <!-- Subtle grid background -->
        <div class="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:30px_30px]" />
        
        <!-- Celebration Overlay -->
        <transition name="celebration">
          <div v-if="showCelebration" class="absolute inset-0 z-50 flex items-center justify-center bg-[#0d0d12]/95 backdrop-blur-md">
            <div class="text-center celebration-bounce">
              <div class="relative">
                <div class="absolute -inset-8 bg-gradient-to-r from-yellow-400/20 via-emerald-400/20 to-yellow-400/20 rounded-full blur-2xl animate-pulse" />
                <PartyPopper class="relative w-20 h-20 mx-auto text-yellow-400 mb-6 celebration-icon" />
                <div class="confetti-container">
                  <div v-for="i in 12" :key="i" :class="'confetti confetti-' + i"></div>
                </div>
              </div>
              <h3 class="text-3xl font-black text-white mb-2">Tebrikler! 🎉</h3>
              <p class="text-emerald-400 text-sm font-medium">Tüm görevleri tamamladın!</p>
            </div>
          </div>
        </transition>

        <div class="relative">
          <!-- Header -->
          <div class="flex items-center gap-3 mb-6">
            <div class="relative group">
              <div class="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl blur opacity-40 group-hover:opacity-70 transition duration-300" />
              <div class="relative w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                <CheckCircle class="w-5 h-5 text-white" />
              </div>
            </div>
            <div class="flex-1">
              <h3 class="m-0 text-lg font-bold text-white flex items-center gap-2">
                Todo List
                <Sparkles v-if="allCompleted" class="w-4 h-4 text-yellow-400 animate-pulse" />
              </h3>
              <p class="m-0 text-xs text-zinc-500">Günlük görevlerinizi yönetin</p>
            </div>
            <span class="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30">
              Vue 3
            </span>
          </div>

          <!-- Input -->
          <div class="relative mb-6">
            <div :class="['absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur transition-opacity duration-300', inputFocused ? 'opacity-30' : 'opacity-0']" />
            <div class="relative flex gap-2">
              <input 
                v-model="text" 
                @keyup.enter="addTodo"
                @focus="inputFocused = true"
                @blur="inputFocused = false"
                placeholder="Yeni görev ekle..."
                class="flex-1 px-5 py-4 border border-white/[0.08] rounded-xl bg-white/[0.03] text-white text-sm outline-none transition-all focus:border-emerald-500/50 focus:bg-white/[0.05] placeholder-zinc-600"
              />
              <button 
                @click="addTodo"
                class="group px-6 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 border-none rounded-xl text-white font-bold text-sm cursor-pointer transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/40 whitespace-nowrap flex items-center gap-2"
              >
                <Plus class="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                Ekle
              </button>
            </div>
          </div>

          <!-- Todo List -->
          <div class="flex flex-col gap-2.5 max-h-[280px] overflow-y-auto custom-scrollbar pr-1">
            <transition-group name="todo-list">
              <div 
                v-for="(todo, index) in todos" 
                :key="todo.id"
                class="group flex items-center gap-4 p-4 bg-white/[0.02] rounded-xl border border-white/[0.06] transition-all duration-300 hover:bg-white/[0.04] hover:border-emerald-500/20 hover:translate-x-1"
                :style="{ animationDelay: index * 50 + 'ms' }"
              >
                <button 
                  @click="toggleTodo(todo.id)"
                  :class="[
                    'relative w-6 h-6 rounded-lg cursor-pointer flex items-center justify-center transition-all duration-300',
                    todo.completed 
                      ? 'bg-gradient-to-br from-emerald-400 to-emerald-600 border-none text-white shadow-lg shadow-emerald-500/30 scale-110' 
                      : 'bg-transparent border-2 border-white/20 hover:border-emerald-500/50 hover:scale-110'
                  ]"
                >
                  <Check v-if="todo.completed" class="w-3.5 h-3.5" />
                </button>
                <span 
                  :class="[
                    'flex-1 text-sm transition-all duration-300',
                    todo.completed ? 'text-zinc-600 line-through' : 'text-zinc-200'
                  ]"
                >
                  {{ todo.text }}
                </span>
                <button 
                  @click="removeTodo(todo.id)"
                  class="w-8 h-8 rounded-lg border-none bg-red-500/0 text-red-400/50 cursor-pointer flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 hover:bg-red-500/20 hover:text-red-400 hover:scale-110"
                >
                  <X class="w-4 h-4" />
                </button>
              </div>
            </transition-group>
          </div>

          <!-- Empty State -->
          <div v-if="todos.length === 0" class="text-center py-12 text-zinc-600">
            <div class="relative inline-block mb-4">
              <div class="absolute -inset-4 bg-emerald-500/10 rounded-full blur-xl" />
              <ListTodo class="relative w-12 h-12 mx-auto text-zinc-600" />
            </div>
            <p class="m-0 text-sm text-zinc-500">Henüz görev eklenmedi</p>
            <p class="m-0 text-xs text-zinc-700 mt-1">Yukarıdan yeni görev ekleyin</p>
          </div>

          <!-- Footer Stats -->
          <div v-if="todos.length > 0" class="flex justify-between items-center mt-5 pt-5 border-t border-white/[0.04]">
            <div class="flex items-center gap-3">
              <span :class="['text-2xl font-black transition-colors', allCompleted ? 'text-emerald-400' : 'text-white']">
                {{ completedCount }}
              </span>
              <div>
                <span class="text-xs text-zinc-600 block">tamamlandı</span>
                <span class="text-xs text-zinc-700">/ {{ todos.length }} görev</span>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-xs text-zinc-500 font-mono">{{ Math.round(progressPercent) }}%</span>
              <div class="w-32 h-2 bg-white/[0.05] rounded-full overflow-hidden">
                <div 
                  :class="['h-full rounded-full transition-all duration-500 relative', allCompleted ? 'bg-gradient-to-r from-yellow-400 via-emerald-400 to-emerald-500' : 'bg-gradient-to-r from-emerald-500 to-emerald-600']"
                  :style="{ width: progressPercent + '%' }"
                >
                  <div v-if="!allCompleted" class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
  };

  createApp(App).mount(el);
}
