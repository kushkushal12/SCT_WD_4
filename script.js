let tasks = [];

function addTask() {
  const taskTitle = document.getElementById('taskTitle').value;
  const dueDate = document.getElementById('dueDate').value;

  if (!taskTitle.trim()) {
    alert('Task title cannot be empty');
    return;
  }

  const task = {
    id: Date.now(),
    title: taskTitle,
    dueDate: dueDate,
    completed: false
  };

  tasks.push(task);
  document.getElementById('taskTitle').value = '';
  document.getElementById('dueDate').value = '';
  renderTasks();
}

function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  if (tasks.length === 0) {
    taskList.innerHTML = '<p>No tasks added yet!</p>';
    return;
  }

  tasks.forEach((task, index) => {
    const taskElement = document.createElement('div');
    taskElement.className = `task ${task.completed ? 'completed' : ''}`;
    taskElement.innerHTML = `
      <div>
        <h3>${task.title}</h3>
        <p>Due: ${task.dueDate || 'No due date set'}</p>
      </div>
      <div class="task-actions">
        <button class="complete" onclick="toggleComplete(${index})">
          ${task.completed ? 'Undo' : 'Complete'}
        </button>
        <button class="edit" onclick="editTask(${index})">Edit</button>
        <button class="delete" onclick="deleteTask(${index})">Delete</button>
      </div>
    `;
    taskList.appendChild(taskElement);
  });
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function editTask(index) {
  const task = tasks[index];
  document.getElementById('taskTitle').value = task.title;
  document.getElementById('dueDate').value = task.dueDate;
  deleteTask(index);
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}
