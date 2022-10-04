import * as bootstrap from "bootstrap";
import "../scss/styles.scss";

const tasksForm = document.forms.tasks;
const formElements = tasksForm.elements;
const { task, submit } = formElements;
const tasksList = document.getElementById("list");
const errorMessage = document.querySelector(".error-message");
const progressBar = document.querySelector(".progress-bar");
const taskItem = document.querySelector(".task-item");

let doneTasks = 0;

function createNewTask(value) {
  const taskItem = document.createElement("li");
  taskItem.classList.add("task-item");
  taskItem.innerHTML = value;
  tasksList.append(taskItem);

  const removeBtn = document.createElement("button");
  removeBtn.classList.add("remove-btn");
  removeBtn.setAttribute("type", "button");
  removeBtn.innerHTML = "Delete";
  taskItem.append(removeBtn);

  const checkBox = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  checkBox.setAttribute("name", "checkbox");
  checkBox.classList.add("check-task");
  taskItem.prepend(checkBox);
  markProgress();
}

tasksForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (task.value.trim() === "") {
    task.classList.add("error-field");
    errorMessage.innerHTML = "Please, enter your task";
    return;
  }
  createNewTask(task.value);
  task.value = "";
});

task.oninput = () => {
  const isErrorField = task.classList.contains("error-field");
  if (isErrorField) {
    task.classList.remove("error-field");
    errorMessage.innerHTML = "";
  }
};

tasksList.onclick = (event) => {
  const isRemoveButton = event.target.className === "remove-btn";
  if (isRemoveButton) {
    event.target.closest(".task-item").remove();
  }
};

tasksList.addEventListener("change", (event) => {
  const isCheckBox = event.target.className === "check-task";
  const taskItem = event.target.closest(".task-item");

  if (isCheckBox && event.target.checked) {
    event.target.disabled = true;
    taskItem.querySelector(".remove-btn").disabled = true;
    taskItem.style.textDecoration = "line-through";
    doneTasks++;
    markProgress();
  }
});

// progress bar
function markProgress() {
  const totalTasks = [...document.querySelectorAll(".task-item")].length;
  return (progressBar.style = ` width:${(doneTasks / totalTasks) * 100}%`);
}
