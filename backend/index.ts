
// import express, { Request, Response } from 'express';
// import cors from 'cors';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();


// const app = express();
// const PORT = 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Login API
// app.post('/api/login', async (req: Request, res: Response) => {
//     try {
//       const { uid, password } = req.body;
  
//       console.log('Login attempt:', { uid, password });
  
//       if (uid === 'admin' && password === '1234') {
//         return res.status(200).json({ message: 'Login successful', token: 'dummy-jwt-token' });
//       } else {
//         return res.status(401).json({ message: 'Invalid UID or password' });
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       res.status(500).json({ message: 'Server error' });
//     }
//   });
  
// // Start server
// app.listen(PORT, () => {
//   console.log(` Server running on http://localhost:${PORT}`);
// });


import express, { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.post('/api/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check password
    if (user.password !== password) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // If email and password match
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
