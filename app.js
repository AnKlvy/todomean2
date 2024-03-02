const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const Task = require('./src/models/Task'); // Подключаем модель задачи
require('dotenv').config();

const app = express();
app.use(express.json());    
app.use(cors());

// Подключение к MongoDB Atlas
async function connectToMongoDB() {
    await mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Соединение с MongoDB установлено'))
    .catch(err => console.error('Ошибка соединения с MongoDB:', err));
}
connectToMongoDB();

// Маршрут для создания задачи
app.post('/api/tasks', async (req, res) => {
    try {
        const { title, description } = req.body;
        const task = new Task({ title, description }); // Не указываем статус
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Ошибка сервера' , error});
    }
});

// Маршрут для получения всех задач
app.get('/api/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка сервера', error });
    }
});

// Маршрут для обновления задачи
app.put('/api/tasks/:id', async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, { title, description, status }, { new: true });
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка сервера', error });
    }
});

// Маршрут для удаления задачи
app.delete('/api/tasks/:id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: 'Задача удалена успешно' });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка сервера', error });
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});

module.exports = app;