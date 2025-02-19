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
});