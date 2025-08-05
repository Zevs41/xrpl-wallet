# Клонирование репозитория

```bash
$ git clone https://github.com/Zevs41/xrpl-wallet.git

$ cd xrpl-wallet
```

# Запуск для отладки

```bash
$ npm i

$ linux mv .env.example .env | windows rename .env.example .env

$ npm run migration:run

$ npx prisma generate

$ npm start:dev
```

# Запуск через Docker Compose

```bash
$ docker-compose up -d
```

# API будет доступен на http://localhost:3000

# Minio console на http://localhost:9001
