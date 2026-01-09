import mount from "./TodoApp";
import "./index.css";

const container = document.getElementById("app");
if (container) {
  mount(container);
}
