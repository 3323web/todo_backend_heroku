import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  content: {
    type: String,
    trim: true,
    maxlength: [1000, '내용은 1000자 이하여야 합니다.']
  },
  completed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true // createdAt과 updatedAt 자동 생성
});

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;

