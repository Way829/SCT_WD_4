const form = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const dueInput = document.getElementById("due-input");
const taskList = document.getElementById("task-list");

let tasks = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  const dueTime = dueInput.value;

  if (taskText) {
    const newTask = {
      id: Date.now(),
      text: taskText,
      due: dueTime,
      completed: false
    };
    tasks.push(newTask);
    renderTasks();
    taskInput.value = "";
    dueInput.value = "";
  }
});

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach(task => {
    const li = document.createElement("li");
    li.className = "task-item";
    if (task.completed) li.classList.add("completed");

    const taskText = document.createElement("span");
    taskText.innerHTML = `${task.text} ${task.due ? `<small> (Due: ${new Date(task.due).toLocaleString()})</small>` : ""}`;

    const actions = document.createElement("div");
    actions.className = "task-actions";

    const completeBtn = document.createElement("button");
    completeBtn.textContent = task.completed ? "Undo" : "Done";
    completeBtn.onclick = () => toggleComplete(task.id);

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = () => editTask(task.id);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => deleteTask(task.id);

    actions.appendChild(completeBtn);
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(taskText);
    li.appendChild(actions);
    taskList.appendChild(li);
  });
}

function toggleComplete(id) {
  tasks = tasks.map(task => {
    if (task.id === id) task.completed = !task.completed;
    return task;
  });
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}

function editTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    const newText = prompt("Edit your task", task.text);
    const newDue = prompt("Edit due date/time (YYYY-MM-DDTHH:MM)", task.due || "");

    if (newText !== null) task.text = newText;
    if (newDue !== null) task.due = newDue;

    renderTasks();
  }
      }
