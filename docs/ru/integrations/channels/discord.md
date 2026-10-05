# Настройка канала Discord

Подключите своего Bot в Memoh к Discord, чтобы он присоединялся к серверам и общался с участниками сообщества в каналах и личных сообщениях.

## Предварительные условия

- Аккаунт Discord с доступом к [Discord Developer Portal](https://discord.com/developers/applications).
- Сервер Discord, на который вы можете авторизовать Bot.
- Bot в Memoh; каналы настраиваются на его вкладке **Platforms**.

## Шаги

### 1. В Discord Developer Portal создайте приложение и получите токен Bot

1. Откройте [Discord Developer Portal](https://discord.com/developers/applications).
2. Нажмите **New Application** и укажите название.
3. В левой панели перейдите в раздел **Bot**.
4. Нажмите **Reset Token**, чтобы сгенерировать **Bot Token**. Скопируйте его и храните в надёжном месте.

### 2. В Discord Developer Portal включите привилегированные интенты

1. На странице **Bot** прокрутите вниз до раздела **Privileged Gateway Intents**.
2. Включите `Message Content Intent`, `Server Members Intent` и `Presence Intent`.
3. Сохраните изменения.

### 3. В Discord Developer Portal пригласите Bot на сервер

1. Перейдите в **OAuth2** > **URL Generator**.
2. Отметьте scope: `bot`, `applications.commands`.
3. Отметьте права: `Send Messages`, `Read Message History`, `Embed Links`, `Attach Files`.
4. Скопируйте сгенерированный URL и откройте его в браузере.
5. Выберите сервер, на который хотите добавить Bot, и авторизуйте его.

> Официальное руководство: [Discord Developer Portal - Bots](https://discord.com/developers/docs/intro)

### 4. В Memoh добавьте канал Discord

1. Откройте страницу нужного Bot и перейдите на вкладку **Platforms**.
2. Нажмите **Add Channel** и выберите **Discord**.
3. Вставьте **Bot Token**.
4. Нажмите **Save and Enable**.

## Учётные данные

| Поле | Описание |
|-------|-------------|
| **Bot Token** | Генерируется кнопкой **Reset Token** на странице **Bot** приложения. Храните его в надёжном месте. |

## Проверка

Отправьте Bot личное сообщение `/help` или обратитесь к нему через @-упоминание в канале сервера, на который он добавлен. Если Bot ответил списком команд, канал работает.

## Групповые чаты

Серверы Discord поддерживаются. После авторизации Bot на сервере обращайтесь к нему в канале через @-упоминание.

## Отключение и смена учётных данных

Отключить или удалить этот канал можно в любой момент на вкладке **Platforms** нужного Bot. Чтобы сменить токен, обновите поле **Bot Token** и сохраните.
