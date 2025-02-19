interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

class TodoApp {
  private todos: Todo[] = [];
  private nextId: number = 1;

  private todoInput: HTMLInputElement;
  private addButton: HTMLButtonElement;
  private todoList: HTMLUListElement;

  constructor() {
    this.todoInput = document.getElementById('todoInput') as HTMLInputElement;
    this.addButton = document.getElementById('addButton') as HTMLButtonElement;
    this.todoList = document.getElementById('todoList') as HTMLUListElement;

    this.addButton.addEventListener('click', () => this.addTodo());
    this.todoInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.addTodo()
      }
    });
    this.render();
  }

  addTodo() {
    const text = this.todoInput.value.trim();
    if (text !== '') {
      const newTodo: Todo = {
        id: this.nextId++,
        text,
        completed: false,
      };
      this.todos.push(newTodo);
      this.todoInput.value = '';
      this.render();
    }
  }

  toggleComplete(id: number) {
    this.todos = this.todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    this.render();
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    this.render();
  }

  render() {
    this.todoList.innerHTML = '';
    this.todos.forEach((todo) => {
      const listItem = document.createElement('li');
      listItem.textContent = todo.text;

      //完了/未完了
      const completeButton = document.createElement('input');
      completeButton.type = 'checkbox';
      completeButton.checked = todo.completed;
      completeButton.addEventListener('change', () => this.toggleComplete(todo.id));

      //削除ボタン
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.className = "deleteButton"
      deleteButton.addEventListener('click', () => this.deleteTodo(todo.id));

      if (todo.completed) {
        listItem.classList.add('completed');
      }

      listItem.appendChild(completeButton);
      listItem.appendChild(deleteButton);
      this.todoList.appendChild(listItem);
    });
  }
}

new TodoApp();