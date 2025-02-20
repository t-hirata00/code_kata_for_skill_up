// src/server.ts
import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

app.use(express.json()); // JSON リクエストボディを解析するためのミドルウェア

// Todoの型定義
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// Todoデータを格納する配列 (本来はDBなどに格納する)
let todos: Todo[] = [];
let nextId = 1; // 次に追加するTodoのID

// TodoリストをしゅとくするAPI
app.get('/api/todos', (req: Request, res: Response) => {
  res.json(todos);
});

// Todoを追加するAPI
app.post('/api/todos', (req: Request, res: Response) => {
  const { text } = req.body;

  if (typeof text !== 'string' || text.trim() === '') {
    return res.status(400).json({ error: 'text is required and must be a non-empty string' });
  }

  const newTodo: Todo = {
    id: nextId++,
    text: text.trim(),
    completed: false,
  };

  todos.push(newTodo);
  res.status(201).json(newTodo); // 201 Created
});

// Todoを更新するAPI (完了状態を切り替える)
app.put('/api/todos/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  todo.completed = !todo.completed; // completedを反転させる
  res.json(todo);
});

//Todoを削除するAPI
app.delete('/api/todos/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const index = todos.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  todos.splice(index, 1); //配列から削除
  res.status(204).send(); // 204 No Content
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});