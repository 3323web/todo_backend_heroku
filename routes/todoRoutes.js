import express from 'express';
import Todo from '../models/Todo.js';

const router = express.Router();

// 할일 생성
router.post('/todos', async (req, res) => {
  try {
    const { content, completed } = req.body;
    
    const todo = new Todo({
      content,
      completed: completed || false
    });
    
    const savedTodo = await todo.save();
    res.status(201).json({
      success: true,
      data: savedTodo
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// 할일 목록 조회
router.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: todos.length,
      data: todos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// 특정 할일 조회
router.get('/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: '할일을 찾을 수 없습니다.'
      });
    }
    
    res.status(200).json({
      success: true,
      data: todo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// 할일 수정
router.put('/todos/:id', async (req, res) => {
  try {
    const { content, completed } = req.body;
    
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { content, completed },
      { new: true, runValidators: true }
    );
    
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: '할일을 찾을 수 없습니다.'
      });
    }
    
    res.status(200).json({
      success: true,
      data: todo
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// 할일 삭제
router.delete('/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: '할일을 찾을 수 없습니다.'
      });
    }
    
    res.status(200).json({
      success: true,
      message: '할일이 삭제되었습니다.',
      data: todo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;

