# Uploader-service

---

## Тестовое задание


Реализовать загрузку файла на Яндекс диск в виде SPA.  
API: https://yandex.com/dev/disk/api/reference/upload.html

- На форме должна быть кнопка загрузки с опцией перезаписи существующего файла. Если после отправки файла возвращается ошибка, что такой файл существует, то должно появляться сообщение с такой опцией и возможностью повторной отправки.
- Имя файла может быть изменено на форме, т.е. отличаться от того что выбрал пользователь на диске.
- Элементы управления должны быть разрешены к использованию если это позволяет текущее состояние (например, нельзя отправить файл если он не был выбран, или указано пустое имя файла и т.п.).
- После выбора файла на странице должна быть информация о файле, обязательно размер. Последний должен динамически формироваться в зависимости от реального размера (т.е. kb, mb и т.п. как в файловой системе) - быть User friendly.
- Должна быть реализована концепция SOLID в части отправки авторизованного запроса - логика применения токена должна быть отделена от логики работы с файлом (выбора и отправки).
- После загрузки должна появляться ссылка на скачивание файла без дополнительных действий или запросов.
- Добавить обработку всех ошибок в соответствии описанию API.