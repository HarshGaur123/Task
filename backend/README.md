
# Backend - Task Project

This is the backend part of the Task Project, built using **Node.js**, **Express**, **TypeScript**, and **Prisma**.

## Tech Stack

- Node.js
- Express.js
- TypeScript
- Prisma (with SQLite database)

## Set up Node js with Express in Backend 

cd backend
npm init -y
npm install express

## How to Run Backend

1. Install dependencies:
   ```bash
   npm install
2. Genrate Prisma Client:
   npx prisma generate
3. Start the development server:
   npm run dev

##  Important commands

1. Open Prisma Studio to manage database:
   npx prisma studio
2. Run migrations:
   npx prisma migrate dev --name init

## Features

1. User login endpoint (/api/login)
2. Email and password validation
3. Prisma ORM for database management
4. Error handling with proper status codes

## To run the froentend and backend both at once then :
   ```bash
   npm run start