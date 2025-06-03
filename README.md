# Todo Backend API

REST API для управления задачами (Todo), созданный на Node.js + Koa + TypeScript.

## Установка и запуск

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Сборка проекта
npm run build

# Запуск в продакшене
npm run prod
```

## API Endpoints

### GET /tasks

Получить все задачи

**Response:**

```json
{
    "success": true,
    "data": [
        {
            "id": "1",
            "isCompleted": false,
            "text": "Project daily stand-up",
            "priority": "medium",
            "category": "meeting",
            "dueDate": "2025-06-03T00:00:00.000Z",
            "dueTime": "09:30",
            "isRecurring": true
        }
    ],
    "message": "Tasks retrieved successfully"
}
```

### GET /tasks/:id

Получить задачу по ID

**Response:**

```json
{
    "success": true,
    "data": {
        "id": "1",
        "isCompleted": false,
        "text": "Project daily stand-up",
        "priority": "medium",
        "category": "meeting",
        "dueDate": "2025-06-03T00:00:00.000Z",
        "dueTime": "09:30",
        "isRecurring": true
    },
    "message": "Task retrieved successfully"
}
```

### POST /tasks

Создать новую задачу

**Request Body:**

```json
{
    "text": "New task",
    "priority": "high",
    "category": "meeting",
    "dueDate": "2025-06-05",
    "dueTime": "14:30",
    "isRecurring": false
}
```

**Response:**

```json
{
    "success": true,
    "data": {
        "id": "generated-uuid",
        "isCompleted": false,
        "text": "New task",
        "priority": "high",
        "category": "meeting",
        "dueDate": "2025-06-05T00:00:00.000Z",
        "dueTime": "14:30",
        "isRecurring": false
    },
    "message": "Task created successfully"
}
```

### PUT /tasks/:id

Обновить задачу

**Request Body:**

```json
{
    "text": "Updated task",
    "priority": "low",
    "isCompleted": true
}
```

### DELETE /tasks/:id

Удалить задачу

### PATCH /tasks/:id/toggle

Переключить статус выполнения задачи

### GET /health

Проверка состояния сервера

## Структура данных

### Task

```typescript
interface Task {
    id: string;
    isCompleted: boolean;
    text: string;
    priority: "high" | "medium" | "low" | "none";
    category: "meeting" | "review" | "marketing" | "design" | "other";
    dueDate?: Date;
    dueTime?: string;
    isRecurring: boolean;
}
```

### Priority

-   `high` - Высокий приоритет
-   `medium` - Средний приоритет
-   `low` - Низкий приоритет
-   `none` - Без приоритета

### Category

-   `meeting` - Встречи
-   `review` - Ревью
-   `marketing` - Маркетинг
-   `design` - Дизайн
-   `other` - Другое

## Архитектура

Проект использует архитектуру контроллер-сервис-репозиторий:

-   **Types** (`src/types/`) - Определения типов и интерфейсов
-   **Database** (`src/database/`) - In-memory база данных
-   **Services** (`src/services/`) - Бизнес-логика
-   **Controllers** (`src/controllers/`) - Обработка HTTP-запросов
-   **Routes** (`src/routes/`) - Определение роутов

## CORS

API настроен для работы с любыми доменами в режиме разработки. В продакшене рекомендуется ограничить список разрешенных доменов.

## Пример использования

```bash
# Получить все задачи
curl http://localhost:3000/tasks

# Создать новую задачу
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"text": "New task", "priority": "high", "category": "meeting"}'

# Переключить статус задачи
curl -X PATCH http://localhost:3000/tasks/1/toggle
```
