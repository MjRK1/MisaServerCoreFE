# MisaCoreFE
# RU 🇷🇺

**MisaCoreFE** — это ядро фронтенд-приложения модульного сервера **MisaServer**. Основное назначение — обеспечение интерфейса для авторизации, управления модулями и интеграции модулей через микрофронтенды.

## 📦 Особенности архитектуры

- **Микрофронтенды через Module Federation (`vite-plugin-federation`):**
    - **Встроенные (самописные) модули** подключаются динамически на уровне фронтенда и загружаются внутри интерфейса Core.
    - **Внешние модули** открываются **в отдельной вкладке** браузера (`target="_blank"`), обычно для сторонних решений или независимых интерфейсов.

- **Общие элементы интерфейса (Host):**
    - Header (меню, переключение модулей, кнопка выхода)
    - Footer (информация, ссылки)

Модули встроены таким образом, чтобы при переходе между ними **Header и Footer оставались на месте**, обеспечивая бесшовный пользовательский опыт.

## ⚙️ Подключение модулей

### Встроенные модули (самописные)

Для подключения нового встроенного модуля необходимо:

1. Добавить зависимость в `vite.config.ts` через `vite-plugin-federation`:

```js
import federation from '@originjs/vite-plugin-federation'

const isProd = process.env.IS_PROD === 'true';
const getRemoteEntry = () => {
  return isProd
    ? `${process.env.MISA_FILES_ENTRY_HOST}/remoteEntry.js`
    : 'http://localhost:8001/files/assets/remoteEntry.js';
};

export default defineConfig({
  plugins: [
    federation({
      name: 'core',
      remotes: {
        misa_files: getRemoteEntry(),
      },
      shared: ['react', 'react-dom', 'react-router-dom']
    })
  ]
})
```

2. В ответе от **MisaServerBE** приходит список модулей в следующем формате:

```json
{
    "name": "MisaFiles",
    "img": "MisaFiles.png",
    "enabled": true,
    "repo": "https://github.com/MisaserverFileServerBE.git",
    "basePath": "MisaFiles",
    "isExternal": false,
    "services": {
      "backend": {
        "host": "file-server",
        "port": 3001
      },
      "frontend": {
        "host": "file-server-fe",
        "port": 3002
      }
    }
  }
```
### **Основные поля сущности модуля:**
- __*name*__ - название модуля
- __*img*__ - путь до иконки модуля
- __*enabled*__ - состояние модуля (вкл/выкл)
- __*repo*__ - ссылка на репозиторий модуля
- __*basePath*__ - урл модуля для маршрутизации (nginx будет пересылать запросы к соответствующему BE модуля)
- __*isExternal*__ - параметр, отвечающий за вид модуля (внешний/самописный)
- __*services*__ - хосты и порты be и fe сервисов, запущенных в докере


##  🚀 Запуск приложения

Запуск осуществляется из [MisaServerBE](https://github.com/MjRK1/MisaServerBECore) через docker compose up.

Настроить запускаемые сервисы можно там же в конфиге docker-compose.yml.

##  🛠️ Локальный запуск

Для локального запуска приложения:
- npm install
- npm start


# ENG 🇺🇸

**MisaCoreFE** is the core of the **MisaServer** modular server frontend application. The main purpose is to provide an interface for authorization, module management, and module integration through micro frontends.

## 📦 Architecture Features

- **Frontends via the Federation Module ('vite-plugin-federation'):**
    - **Built-in (self-written) modules** are connected dynamically at the front-end level and loaded inside the Core interface.
    - **External modules** open **in a separate browser tab** (`target="_blank"`), usually for third-party solutions or independent interfaces.

- **Common interface elements (Host):**
- Header (menu, module switching, exit button)
- Footer (information, links)

The modules are built in such a way that when switching between them **Header and Footer remain in place**, providing a seamless user experience.

## ⚙️ Connecting modules

### Built-in modules (self-written)

To connect a new embedded module, you must:

1. Add dependency to `vite.config.ts` via `vite-plugin-federation`:

```js
import federation from '@originjs/vite-plugin-federation'

const isProd = process.env.IS_PROD === 'true';
const getRemoteEntry = () => {
  return isProd
    ? `${process.env.MISA_FILES_ENTRY_HOST}/remoteEntry.js`
    : 'http://localhost:8001/files/assets/remoteEntry.js';
};

export default defineConfig({
  plugins: [
    federation({
      name: 'core',
      remotes: {
        misa_files: getRemoteEntry(),
      },
      shared: ['react', 'react-dom', 'react-router-dom']
    })
  ]
})
```

2. The response from **MisaServerBE** comes with a list of modules in the following format:

```json
{
    "name": "MisaFiles",
    "img": "MisaFiles.png",
    "enabled": true,
    "repo": "https://github.com/MisaserverFileServerBE.git",
    "basePath": "MisaFiles",
    "isExternal": false,
    "services": {
      "backend": {
        "host": "file-server",
        "port": 3001
      },
      "frontend": {
        "host": "file-server-fe",
        "port": 3002
      }
    }
  }
```
### **The main fields of the module entity:**
- __*name*__ - module name
- __*img*__ - path to the module icon
- __*enabled*__ - module status (on/off)
- __*repo*__ - link to the module repository
- __*basePath*__ - url of the routing module (nginx will forward requests to the corresponding BE of the module)
- __*isExternal*__ - parameter responsible for the appearance of the module (external/self-written)
- __*services*__ - hosts and ports of be and fe services running in docker


## 🚀 Launching the app

It is launched from [MisaServerBE](https://github.com/MjRK1/MisaServerBECore ) via docker compose up.

You can configure the running services in the same place in the docker-compose.yml config.

## 🛠️ Local launch

To launch the application locally:
- npm install
- npm start