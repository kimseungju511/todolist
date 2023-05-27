import React from 'react' // eslint-disable-line no-unused-vars
import FormatDate from './Date'

const TodoItem = (props) => {
  // eslint-disable-next-line react/prop-types
  const { todo, handleTitle, handleDelete, handleEdit} = props

  return (
    <li >
      <input
        // eslint-disable-next-line react/prop-types
        value={todo.title}
        // eslint-disable-next-line react/prop-types
        onChange={(e) => handleTitle(e, todo.id)}
      />
      <div className='date'>
        <span>
          {/* eslint-disable-next-line react/prop-types */}
          생성일: {FormatDate(todo.createdAt)}
        </span>
        <span>
          {/* eslint-disable-next-line react/prop-types */}
          수정일: {FormatDate(todo.updatedAt)}
        </span>
      </div>
      <div className='btngroup'>
        {/* eslint-disable-next-line react/prop-types */}
        <button onClick={() => handleDelete(todo.id)}>삭제</button>
        {/*  eslint-disable-next-line react/prop-types */}
        <button onClick={() => handleEdit(todo.id, { ...todo, done: !todo.done })}>
          {/*  eslint-disable-next-line react/prop-types */}
          {todo.done ? '미완료' : '완료'}
        </button>
      </div>
    </li>
  )
}

export default TodoItem