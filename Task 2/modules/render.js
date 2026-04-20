import { escapeHTML } from './validation.js';

export function renderTaskList(taskListElement, tasks, filter = 'all') {
    taskListElement.innerHTML = '';
    
    let filteredTasks = tasks;
    if (filter === 'active') filteredTasks = tasks.filter(t => !t.completed);
    if (filter === 'completed') filteredTasks = tasks.filter(t => t.completed);

    if (filteredTasks.length === 0) {
        taskListElement.innerHTML = '<div class="empty-state" style="text-align:center; padding:2rem; color:#64748b;">No tasks found. You are all caught up!</div>';
        return;
    }

    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task ' + (task.completed ? 'completed' : '');
        li.dataset.id = task.id;
        
        li.innerHTML = `
            <label class="task-label" style="display:flex; align-items:center; gap:10px; cursor:pointer;">
                <input type="checkbox" class="status-toggle" ${task.completed ? 'checked' : ''} style="cursor:pointer; width:18px; height:18px;">
                <span class="task-text" style="${task.completed ? 'text-decoration:line-through; color:#94a3b8;' : ''}">${escapeHTML(task.text)}</span>
            </label>
            <button class="delete-btn" aria-label="Delete" style="background:none; border:none; cursor:pointer; font-size:1.2rem;">🗑️</button>
        `;
        taskListElement.appendChild(li);
    });
}