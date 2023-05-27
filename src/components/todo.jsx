import {todo_api,todo_HEADERS} from './api'

// 목록 조회
export const Todos = async () => {
  try{
    const res = await fetch(todo_api, {
      headers: todo_HEADERS
    })
    return await res.json()
  } catch (error) {
    console.log("목록 조회 에러:", error)
  }
}


// 항목 추가
export const add = async (newtodo) => {
  try {
    const res = await fetch(todo_api, {
      method: "POST",
      headers: todo_HEADERS,
      body: JSON.stringify({
        title: newtodo
      })
    })
    const json = await res.json()
    return json
  } catch (error) {
    console.log("항목 추가 에러", error)
  }
}

// 항목 수정
export const edit = async (todoId, updated) => {
  try {
    const res = await fetch(`${todo_api}/${todoId}`, {
      method: "PUT",
      headers: todo_HEADERS,
      body: JSON.stringify(updated) 
    })
    const json = await res.json()
    return json
  } catch (error) {
    console.error("항목 수정 에러:", error)
  }
}

// 항목 삭제
export const del = async (todoId) => {
  try {
    await fetch(`${todo_api}/${todoId}`, {
      method: "DELETE",
      headers: todo_HEADERS
    })
  } catch (error) {
    console.log("항목 삭제 에러",error)
  }
}

// 항목 전부 삭제
export const alldel = async() => {
  try {
    await fetch(todo_api, {
      method: "DELETE",
      headers: todo_HEADERS
    })
  } catch (error) {
    console.timeLog(" 항목 전부 삭제 에러", error)
  }
}