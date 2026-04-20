import { z } from 'zod';

// In-memory store (temporary until Task 4: MongoDB)
let tasks = [];
let currentId = 1;

// Zod Validation Schema (Pro Tip)
const taskSchema = z.object({
    text: z.string().min(1, "Task text cannot be empty").max(255, "Task text is too long"),
    completed: z.boolean().optional()
});

const findTaskIndex = id => tasks.findIndex(task => task.id === id);

// GET /api/tasks
export const getTasks = (req, res) => {
    res.status(200).json(tasks);
};

// GET /api/tasks/:id
export const getTaskById = (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(t => t.id === id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.status(200).json(task);
};

// POST /api/tasks
export const createTask = (req, res) => {
    // Validate input with Zod
    const validation = taskSchema.safeParse(req.body);
    if (!validation.success) {
        return res.status(400).json({ error: validation.error.errors[0].message });
    }

    const newTask = {
        id: currentId++,
        text: validation.data.text.trim(),
        completed: false,
        createdAt: new Date().toISOString()
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
};

// PUT /api/tasks/:id
export const updateTask = (req, res) => {
    const id = parseInt(req.params.id);
    const taskIndex = findTaskIndex(id);
    
    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    const validation = taskSchema.safeParse(req.body);
    if (!validation.success) {
        return res.status(400).json({ error: validation.error.errors[0].message });
    }

    tasks[taskIndex] = {
        ...tasks[taskIndex],
        text: validation.data.text ? validation.data.text.trim() : tasks[taskIndex].text,
        completed: validation.data.completed !== undefined ? validation.data.completed : tasks[taskIndex].completed
    };

    res.status(200).json(tasks[taskIndex]);
};

// DELETE /api/tasks/:id
export const deleteTask = (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = tasks.length;
    
    tasks = tasks.filter(task => task.id !== id);
    
    if (tasks.length === initialLength) {
        return res.status(404).json({ error: 'Task not found' });
    }
    
    res.status(204).end(); // 204 means successful deletion, no content to return
};