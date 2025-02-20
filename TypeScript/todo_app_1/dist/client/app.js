"use strict";
// src/client/app.ts
// APIのエンドポイント
const apiUrl = 'http://localhost:3000/api/todos';
// DOM要素の取得
const todoList = document.getElementById('todoList');
const newTodoInput = document.getElementById('newTodoInput');
const addTodoBtn = document.getElementById('addTodoBtn');
