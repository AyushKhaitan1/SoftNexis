import { escapeHTML } from './validation.js';

export function renderTaskList(taskListElement, tasks, filter = 'all') {
    taskListElement.innerHTML = '';
    
    let filteredTasks = tasks;
    if (filter === 'active') filteredTasks = tasks.filter(t => !t.completed);
    if (filter === 'completed') filteredTasks = tasks.filter(t => t.completed);

    if (filteredTasks.length === 0) {
        taskListElement.innerHTML = 
            <div class="empty-state">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                <p>No tasks found. You're all caught up!</p>
            </div>;
        return;
    }

    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task ' + (task.completed ? 'completed' : '');
        li.dataset.id = task.id;
        
        li.innerHTML = 
            <label class="task-label">
                <div class="checkbox-wrapper">
                    <input type="checkbox" class="status-toggle"  + (task.completed ? 'checked' : '') + >
                    <span class="custom-checkbox"></span>
                </div>
                <span class="task-text"> + escapeHTML(task.text) + </span>
            </label>
            <button class="delete-btn" aria-label="Delete">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>
        ;
        taskListElement.appendChild(li);
    });
}