import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

function TodoForm({ onAddTodo }) {
  const [todo, setTodo] = useState({
    title: '',
    details: '',
    deadline: new Date().toISOString().split('T')[0]
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTodo({
      ...todo,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!todo.title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }
    
    try {
      // Add document to Firestore
      const docRef = await addDoc(collection(db, 'todos'), {
        title: todo.title,
        details: todo.details,
        deadline: todo.deadline,
        createdAt: new Date()
      });
      
      // Add the new todo to the list with its ID
      onAddTodo({
        id: docRef.id,
        title: todo.title,
        details: todo.details,
        deadline: todo.deadline,
        createdAt: new Date()
      });
      
      // Reset form
      setTodo({
        title: '',
        details: '',
        deadline: new Date().toISOString().split('T')[0]
      });
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="form-section">
        <h3>📝 할일 제목</h3>
        <input
          id="title-input"
          type="text"
          name="title"
          value={todo.title}
          onChange={handleInputChange}
          placeholder="이제 진짜"
          required
        />
      </div>
      
      <div className="form-section">
        <h3>📝 할일 내용</h3>
        <textarea
          name="details"
          value={todo.details}
          onChange={handleInputChange}
          placeholder="자세히..."
        />
      </div>
      
      <div className="form-section">
        <h3>📅 기한</h3>
        <input
          type="date"
          name="deadline"
          value={todo.deadline}
          onChange={handleInputChange}
          required
        />
      </div>
      
      <button type="submit" className="submit-button">추가</button>
    </form>
  );
}

export default TodoForm; 