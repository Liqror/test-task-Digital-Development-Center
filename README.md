# Тестовое задание ЦЦР
- [x] скачать docker образ контейнера бэка `docker pull harbor.cifra-k.ru/test_task/frontend-task_master`
- [x] запустить не `docker run --rm -p 8000:8000 -v harbor.cifra-k.ru/test_task/frontend-task_master`, а `docker run --rm -p 8000:8000 harbor.cifra-k.ru/test_task/frontend-task_master`
- [x] работающие запросы api
```http
POST http://localhost:8000/api/auth/login/
Content-Type: application/json
{
	"username": "admin",
	"password": "123"
}

GET http://localhost:8000/api/news/

GET http://localhost:8000/api/position/
Authorization: Token bf7e691a05ed9840d59ebb54efb499967ba235ba

POST http://localhost:8000/api/position/
Content-Type: application/json
Authorization: Token bf7e691a05ed9840d59ebb54efb499967ba235ba

{
	"name":"Точка 1",
	"latitude": 90.0000,
	"longitude": 90.0000
}
```
- [x] фронтенд на Angular (не ниже 19)
- [x] публичная страница со списком новостей
- [x] логин форма для пользователя
- [x] после логина
    - [x] отобразить список новостей,
    - [x] переключение из списка в плиточном виде как на [https://www.pinterest.ru/](https://www.pinterest.ru/)
- [x] меню – новости, карта
- [x] на карте – используя OpenSreetMap:
    - [x] по клику на карте иметь возможность добавлять точку
    - [x] отображать на карте все точки
    - [x] по наведение на точке отображать ее имя
- [x] аккуратный дизайн и адаптивная верстка – переход меню в гамбургер при уменьшение размера браузера
- [ ] покрыть код тестами
- [x] использование сигналов

Запуск через `ng serve --proxy-config proxy.conf.json`
