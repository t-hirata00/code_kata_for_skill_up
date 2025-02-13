// ロジック
import { Todo } from './todo';

// DOM の操作
const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const addButton = document.getElementById('add-button') as HTMLButtonElement;
const todoList = document.getElementById('todo-list') as HTMLUListElement;

// Todoのリスト初期状態はから
let todos: Todo[] = [];

// Todoの追加
function addTodo() {
  const text = todoInput.value; // 空白の除去
  if (text === '') {
    return;//空の場合何もしない
  }

  const newTodo: Todo = {
    id: Date.now(),
    text: text,
    completed: false,
  };

  todos.push(newTodo);
  renderTodos();
  todoInput.value = "";
}

// Todoの削除
function deleteTodo(id: number) {
  todos = todos.filter((todo) => todo.id !== id);
  renderTodos();
}

// Todo完了 / 未完了の切り替え
function toggleTodo(id: number) {
  todos = todos.map(todo => {
    if (todo.id === id) {
      return { ...todo, completed: !todo.completed };
    }
    return todo;
  })
  renderTodos();
}

// Todoの描画
function renderTodos() {
  todoList.innerHTML = ''; // 一旦リストをからにする

  todos.forEach(todo => {
    const listItem = document.createElement('li');

  })
}