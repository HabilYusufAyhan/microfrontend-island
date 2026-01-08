import { createApp, ref } from "vue";
import { CheckCircle, Plus, X, Check, ClipboardList } from "lucide-vue-next";
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
    },
    setup() {
      const todos = ref<{ id: number; text: string; completed: boolean }[]>([]);
      const text = ref("");
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

      const completedCount = () =>
        todos.value.filter((t) => t.completed).length;

      return { todos, text, addTodo, toggleTodo, removeTodo, completedCount };
    },
    template: `
      <div class="p-6 font-sans">
        <!-- Header -->
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
            <CheckCircle class="w-5 h-5 text-white" />
          </div>
          <div class="flex-1">
            <h3 class="m-0 text-lg font-semibold text-white">Todo List</h3>
            <p class="m-0 text-xs text-zinc-500">Günlük görevlerinizi yönetin</p>
          </div>
          <span class="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
            Vue 3
          </span>
        </div>

        <!-- Input -->
        <div class="flex gap-2 mb-5">
          <input 
            v-model="text" 
            @keyup.enter="addTodo"
            placeholder="Yeni görev ekle..."
            class="flex-1 px-4 py-3 border border-white/10 rounded-xl bg-white/5 text-white text-sm outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 placeholder-zinc-500"
          />
          <button 
            @click="addTodo"
            class="px-5 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 border-none rounded-xl text-white font-semibold text-sm cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/30 whitespace-nowrap flex items-center gap-2"
          >
            <Plus class="w-4 h-4" /> Ekle
          </button>
        </div>

        <!-- Todo List -->
        <div class="flex flex-col gap-2 max-h-90 overflow-y-auto">
          <div 
            v-for="todo in todos" 
            :key="todo.id"
            class="flex items-center gap-3 p-3.5 bg-white/[0.03] rounded-xl border border-white/5 transition-all hover:bg-white/[0.05]"
          >
            <button 
              @click="toggleTodo(todo.id)"
              :class="[
                'w-[22px] h-[22px] rounded-md cursor-pointer flex items-center justify-center text-xs transition-all',
                todo.completed 
                  ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 border-none text-white' 
                  : 'bg-transparent border-2 border-white/20'
              ]"
            >
              <Check v-if="todo.completed" class="w-3 h-3" />
            </button>
            <span 
              :class="[
                'flex-1 text-sm transition-all',
                todo.completed ? 'text-zinc-500 line-through' : 'text-zinc-200'
              ]"
            >
              {{ todo.text }}
            </span>
            <button 
              @click="removeTodo(todo.id)"
              class="w-7 h-7 rounded-lg border-none bg-red-500/10 text-red-500 cursor-pointer flex items-center justify-center transition-all hover:bg-red-500/20 hover:scale-110"
            >
              <X class="w-4 h-4" />
            </button>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="todos.length === 0" class="text-center py-10 text-zinc-600">
          <ClipboardList class="w-10 h-10 mx-auto mb-2 text-zinc-600" />
          <p class="m-0 text-sm">Henüz görev eklenmedi</p>
        </div>

        <!-- Footer Stats -->
        <div v-else class="flex justify-between items-center mt-4 pt-4 border-t border-white/5">
          <span class="text-xs text-zinc-500">
            {{ completedCount() }}/{{ todos.length }} tamamlandı
          </span>
          <div class="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
            <div 
              class="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transition-all duration-300"
              :style="{ width: (completedCount() / todos.length * 100) + '%' }"
            />
          </div>
        </div>
      </div>
    `,
  };

  createApp(App).mount(el);
}
