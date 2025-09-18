document.addEventListener("DOMContentLoaded", () => {
  // your code here
  const form = document.querySelector("form");
  const sortSelect = document.getElementById("sort-select");
  
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const taskDescription =form.querySelector("#new-task-description").value;
    const priority = form.querySelector("#priority").value;
    const dueDate = form.querySelector("#due-date")?.value || "N/A";
    const user = form.querySelector("#task-user")?.value || "N/A";
    valueInput(taskDescription, priority, dueDate, user);
    form.reset();  
  })

  if (sortSelect){
    sortSelect.addEventListener("change", (e) => {
    sortTasks(e.target.value);
  })
};
});

//function to input the list of values and button
function valueInput(task, priority, dueDate, user, isCompleted = false){
  //add new task value
  const li = document.createElement("li");
  li.textContent = `${task} `;

  //add extra info (user and due date)
  const info = document.createElement("span");
  info.textContent = `(Assignee: ${user} , Due: ${dueDate}) `;
  li.appendChild(info);
  
  //checkbox for completed items
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = isCompleted;
  checkbox.style.verticalAlign = "middle";
  checkbox.addEventListener("change", (e) => {
    li.style.textDecoration = e.target.checked ? "line-through" : "none";
  });
  li.appendChild(checkbox);


  //add edit button
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.style.padding = "3px 6px";
  editBtn.style.marginLeft = "4px";
  editBtn.style.verticalAlign = "middle";
  editBtn.addEventListener("click", editTask);
  li.appendChild(editBtn);

  //add delete button
  const btn = document.createElement("button");
  btn.textContent = "X";
  btn.style.padding = "3px 6px";
  btn.style.marginLeft = "4px";
  btn.style.verticalAlign = "middle";
  btn.addEventListener("click", valueDelete);
  li.appendChild(btn);

  //(values) data storing in <li> elements
  li.dataset.priority = priority;
  li.dataset.task = task;  

  applyPriorityAndColor(li, priority); //calls the applying priority colors function below
  document.querySelector("#tasks").appendChild(li); //ensures any task input is appended to the <ul> list
}

//applying priority colors
function applyPriorityAndColor(li, priority) {
  console.log("Priority received:", priority);
  if (priority === "high"){ 
    li.style.color = "red";
  }else if (priority === "medium"){
    li.style.color = "orange";
  }else if (priority === "low"){
    li.style.color = "green";
  } else {
    li.style.color = "black";
  }
}

//sorting in ascending or descending order based on priority
function sortTasks(order){
  const list = document.getElementById("tasks");
  const items = Array.from(list.children);
  const rank = { low: 1, medium: 2, high: 3 };
  if(order==="asc"){
    items.sort((a, b) => rank[a.dataset.priority] - rank[b.dataset.priority]);
  } else{
    items.sort((a, b) => rank[b.dataset.priority] - rank[a.dataset.priority]);
  }
  items.forEach(li => list.appendChild(li));
}

//function that includes the edit button task
function editTask(e) {
  const li = e.target.parentNode;
  const currentTask = li.dataset.task;
  const newTask = prompt("Edit Task Description:", currentTask);
  
  if (newTask && newTask !== currentTask) {
    li.dataset.task = newTask;
    li.firstChild.textContent = `${newTask} `;
  }
  //priority change as the task is being changed (just in case)
  const newPriority = prompt("Edit Priority (high/medium/low):", li.dataset.priority);
  if (newPriority) {
    li.dataset.priority = newPriority;
    applyPriorityAndColor(li, newPriority);
  }
}


//function that deletes the entire value input (value and button)
function valueDelete(e){
  e.target.parentNode.remove();
}
