import { loadTasks, saveTasks, loadTheme, saveTheme } from './modules/storage.js';
import { renderTaskList } from './modules/render.js';
import { validateTaskInput } from './modules/validation.js';

document.addEventListener('DOMContentLoaded', () => {
    let tasks = loadTasks();
    let currentFilter = 'all';

    const form = document.getElementById('task-form');
    const input = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const taskCount = document.getElementById('task-count');
    const errorMsg = document.getElementById('error-msg');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const themeToggle = document.getElementById('theme-toggle');

    if (loadTheme()) {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '☀️';
    }

    function updateUI() {
        renderTaskList(taskList, tasks, currentFilter);
        const activeCount = tasks.filter(t => !t.completed).length;
        taskCount.textContent = activeCount + (activeCount === 1 ? ' task' : ' tasks') + ' remaining';
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault(); 
        const text = input.value;
        
        if (validateTaskInput(text)) {
            errorMsg.classList.add('hidden');
            tasks.push({ id: Date.now(), text: text.trim(), completed: false });
            saveTasks(tasks);
            input.value = '';
            updateUI();
        } else {
            errorMsg.classList.remove('hidden');
            setTimeout(() => errorMsg.classList.add('hidden'), 3500);
        }
    });

    taskList.addEventListener('click', (e) => {
        const taskElement = e.target.closest('.task');
        if (!taskElement) return;
        
        const taskId = Number(taskElement.dataset.id);
        const taskIndex = tasks.findIndex(t => t.id === taskId);
        
        if (e.target.closest('.delete-btn')) {
            taskElement.style.transform = 'translateX(30px)';
            taskElement.style.opacity = '0';
            setTimeout(() => {
                tasks.splice(taskIndex, 1);
                saveTasks(tasks);
                updateUI();
            }, 250); 
        }
        
        if (e.target.classList.contains('status-toggle')) {
            tasks[taskIndex].completed = e.target.checked;
            saveTasks(tasks);
            updateUI();
        }
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.dataset.filter;
            updateUI();
        });
    });

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        themeToggle.innerHTML = isDark ? '☀️' : '🌙';
        saveTheme(isDark);
    });

    updateUI();
});