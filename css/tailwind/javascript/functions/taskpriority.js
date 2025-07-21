let tasks = [];
let priorities = [];

function addTask() {
    const taskInput = document.getElementById('task');
    const priorityInput = document.getElementById('priority');
    const taskList = document.getElementById('taskList');

    const taskValue = taskInput.value.trim();
    const priority = Number(priorityInput.value.trim());

    if (taskValue !== '' && priority >= 1 && priority <= 3) {
        tasks.push(taskValue);
        priorities.push(priority);

        const li = document.createElement('li');
        li.textContent = taskValue;

        switch (priority) {
            case 1:
                li.classList.add('priority-high');
                break;    
            case 2:
                li.classList.add('priority-medium');
                break;
            case 3:
                li.classList.add('priority-low');
                break;
        }

        // Complete button       
        const completeButton = document.createElement('button');
        completeButton.textContent = 'Completed';
        completeButton.onclick = function () {
            li.classList.toggle('completed');
        };
        li.appendChild(completeButton);

        // Edit button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit Task';
        editButton.onclick = function () {
            const newTask = prompt('Edit Task:', taskValue);
            if (newTask !== null && newTask.trim() !== '') {
                const taskIndex = tasks.indexOf(taskValue);
                tasks[taskIndex] = newTask;
                li.firstChild.textContent = newTask;
            }
        };
        li.appendChild(editButton);

        // Remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = function () {
            taskList.removeChild(li);
            const taskIndex = tasks.indexOf(taskValue);
            if (taskIndex !== -1) {
                tasks.splice(taskIndex, 1);
                priorities.splice(taskIndex, 1);
            }
        };
        li.appendChild(removeButton);

        taskList.appendChild(li);

        // Clear inputs
        taskInput.value = '';
        priorityInput.value = '';
    } else {
        alert("Please enter a valid task and priority (1-High, 2-Medium, 3-Low).");
    }
}
