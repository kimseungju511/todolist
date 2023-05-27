import React, { useState, useEffect } from 'react' // eslint-disable-line no-unused-vars
import './App.css'
import TodoItem from './Todoitem'
import {Todos, add, edit, del, alldel} from './components/todo'

const App = () => {
  const [loading, setLoading] = useState(true)
  const [todos, setTodos] = useState([])
  const [newTodoTitle, setNewTodoTitle] = useState("")

  const fetchData = async () => {
    const todosData = await Todos()
    setTodos(todosData)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])  

  const Add = async () => {
      const newTodo = await add(newTodoTitle)
      setTodos((prevTodos) => [...prevTodos, newTodo]) 
      setNewTodoTitle("")   
    } 

  const Edit = async (todoId, updatedTodo) => {
    const editedTodo = await edit(todoId, updatedTodo);
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === todoId ? { ...editedTodo } : todo))
    )
  }

  const Check = (todoId) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === todoId ? { ...todo, checked: !todo.checked } : todo
      )
    )
  }

  const Delete = async (todoId) => {
      await del(todoId)
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId)) 
  }

  const DeleteAll = async () => {
      await alldel()
      setTodos([])
  }

  const DeleteSelected = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.checked));
  };

  const Title = (e, todoId) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              title: e.target.value,
              updatedAt: new Date().toISOString()
            }
          : todo
      )
    )
  }

    return (
      <>
        {loading ? (
          <div>로딩중...</div>
        ) : (
          <div>
            <h1>Todo List</h1>
            <input
              type="text"
              value={newTodoTitle}
              onChange={(e) => setNewTodoTitle(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  Add();
                }
              }}
              placeholder="todolist 작성"
            />
            <button onClick={Add}>추가</button>
            <button className="delete" onClick={DeleteAll}>전부 삭제</button>
            <button className="delete" onClick={DeleteSelected}>선택 삭제</button>

            <section>
              <div>
                <h2>미완료</h2>
                <ul>
                  {todos
                    .filter(todo => !todo.done)
                    .map(todo => (
                      <TodoItem
                      key={todo.id}
                      todo={todo}
                      handleTitle={Title}
                      handleDelete={Delete}
                      handleEdit={Edit}
                      handleCheck={Check}
                    />
                    ))}
                </ul>
                </div>

              <div>
                <h2>완료</h2>
                <ul>
                  {todos
                    .filter(todo => todo.done)
                    .map(todo => (
                      <TodoItem
                      key={todo.id}
                      todo={todo}
                      handleTitle={Title}
                      handleDelete={Delete}
                      handleEdit={Edit}
                    />
                    ))}
                </ul>
                </div>
              </section>
        </div>
      )}
    </>
  )
}

export default App