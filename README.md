# Как запустить приложение

## Запуск через докер

- Ввести команду в консоль

```bash
docker-compose -f "docker-compose.yaml" up --build
```

- Открыть `http://localhost:3000`

## О приложении

Что есть:
1. Фронт
2. Бэк
3. База данных
4. Тг бот

### Фронт
* Две страницы:
  1. Все игры
  2. Одна выбранная игра
* Поиск по названию игры
* Фильтрация по платформам
* Сортировка по рейтингу
* Сортировка по году выхода
* Дозагрузка игр ("бесконечный скролл")
* Вход в аккаунт (по tg id (выдаётся в тг боте))
* Добавление игр в аккаунт
* Удаление игр из аккаунта

### Бот
* Выдача всех игр
* Выдача одной игры
* Удаление игры (при этом на клиенте появится возможность добавить снова) (пока не реализовано ws соединение)

### База данных
* Две модели:
  1. Game
  2. User

### Бэк
* Регистрация (происходит при активации тг бота)
* Авторизация (происходит при активации тг бота)
* Добавление игры
* Удаление игры
* Выдача игр (не реализовано на фронте)

## Другие команды

Запуск базы данных (использовалась при работе с сервером):
```bash
docker-compose -f "docker-compose.bd.yaml" up --build
```

Запуск сервера и базы данных (использовалась при работе с фронтом):
```bash
docker-compose -f "docker-compose.server.yaml" up --build
```

## Версии Nodejs

- `16.20.1` - Бэк
- `20.14.0` - Фронт