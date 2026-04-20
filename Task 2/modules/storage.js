export const saveTasks = (tasks) => localStorage.setItem('tf_tasks', JSON.stringify(tasks));

export const loadTasks = () => { 
    try { 
        const data = localStorage.getItem('tf_tasks'); 
        return data ? JSON.parse(data) : []; 
    } catch (e) { 
        localStorage.removeItem('tf_tasks'); 
        return []; 
    } 
};

export const saveTheme = (isDark) => localStorage.setItem('tf_theme', isDark ? 'dark' : 'light');
export const loadTheme = () => localStorage.getItem('tf_theme') === 'dark';