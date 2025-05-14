import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const q = query(collection(db, 'todos'), orderBy('deadline', 'asc'));
        const snapshot = await getDocs(q);
        const todoData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setTodos(todoData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching todos:', error);
        setLoading(false);
      }
    };
    
    fetchTodos();
  }, []);

  const addTodo = (newTodo) => {
    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  const updateTodoInList = (updatedTodo) => {
    setTodos(prevTodos => 
      prevTodos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo)
    );
  };

  const deleteTodoFromList = (id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  if (loading) return <div>로딩 중...</div>;

  return (
    <div className="todo-list">
      <div className="todos-container">
        <div className="title-section">
          <h1>To-Do List</h1>
        </div>
        {todos.length === 0 ? (
          <p>할 일이 없습니다.</p>
        ) : (
          todos.map(todo => (
            <TodoItem 
              key={todo.id} 
              todo={todo} 
              onUpdate={updateTodoInList}
              onDelete={deleteTodoFromList}
            />
          ))
        )}
        <div className="add-button" onClick={() => document.getElementById('title-input').focus()}>
          <span>➕</span> 할일 추가
        </div>
      </div>
      
      <div className="todo-form-container">
        <TodoForm onAddTodo={addTodo} />
      </div>
    </div>
  );
}

export default TodoList; 