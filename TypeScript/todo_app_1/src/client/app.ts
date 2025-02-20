// src/client/app.ts

// バックエンドのTodoの型定義を再利用 (DRY原則)
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// APIのエンドポイント
const apiUrl = 'http://localhost:3000/api/todos';

// DOM要素の取得
const todoList = document.getElementById('todoList') as HTMLUListElement;
const newTodoInput = document.getElementById('newTodoInput') as HTMLInputElement;
const addTodoBtn = document.getElementById('addTodoBtn') as HTMLButtonElement;
