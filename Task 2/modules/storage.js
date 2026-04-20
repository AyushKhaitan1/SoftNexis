export const saveTasks = (tasks) => localStorage.setItem('tf_tasks', JSON.stringify(tasks));
export const loadTasks = () => JSON.parse(localStorage.getItem('tf_tasks')) || [];
export const saveTheme = (isDark) => localStorage.setItem('tf_theme', isDark ? 'dark' : 'light');
export const loadTheme = () => localStorage.getItem('tf_theme') === 'dark';