import { useState } from 'react';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

function TodoItem({ todo, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTodo, setEditedTodo] = useState({ ...todo });

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, 'todos', todo.id));
      onDelete(todo.id);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setEditedTodo({ ...todo });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTodo({
      ...editedTodo,
      [name]: value
    });
  };

  const handleUpdate = async () => {
    try {
      const todoRef = doc(db, 'todos', todo.id);
      await updateDoc(todoRef, {
        title: editedTodo.title,
        details: editedTodo.details,
        deadline: editedTodo.deadline
      });
      
      onUpdate(editedTodo);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  // Calculate D-day
  const calculateDDay = (dateString) => {
    const deadlineDate = new Date(dateString);
    const today = new Date();
    
    // Set both dates to midnight for accurate day calculation
    deadlineDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays > 0) {
      return `D-${diffDays}`;
    } else if (diffDays < 0) {
      return `D+${Math.abs(diffDays)}`;
    } else {
      return 'D-Day';
    }
  };

  return (
    <div className="todo-item">
      {isEditing ? (
        <div className="edit-form">
          <input
            type="text"
            name="title"
            value={editedTodo.title}
            onChange={handleInputChange}
            placeholder="제목"
          />
          <textarea
            name="details"
            value={editedTodo.details}
            onChange={handleInputChange}
            placeholder="세부사항"
          />
          <input
            type="date"
            name="deadline"
            value={editedTodo.deadline}
            onChange={handleInputChange}
          />
          <div className="edit-buttons">
            <button onClick={handleUpdate}>저장</button>
            <button onClick={handleEditToggle}>취소</button>
          </div>
        </div>
      ) : (
        <>
          <div className="todo-content">
            <div className="todo-title">{todo.title}</div>
            {todo.details && <div className="todo-details">{todo.details.substring(0, 20)}{todo.details.length > 20 ? '...' : ''}</div>}
          </div>
          <div className="todo-deadline">
            <span className="dday">{calculateDDay(todo.deadline)}</span>
          </div>
          <div className="todo-actions">
            <button onClick={handleEditToggle}>✏️</button>
            <button onClick={handleDelete}>🗑️</button>
          </div>
        </>
      )}
    </div>
  );
}

export default TodoItem; 