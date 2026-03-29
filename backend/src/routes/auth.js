import { Router } from 'express';
import { users } from '../db/mockData.js';

const router = Router();

router.post('/login', (req, res) => {
  const { email } = req.body;
  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  return res.json({
    message: 'Login successful',
    token: 'demo-token',
    user
  });
});

router.post('/register', (req, res) => {
  const { name, email } = req.body;
  return res.status(201).json({
    message: 'User registered (demo)',
    user: { id: Date.now(), name, email, role: 'employee' }
  });
});

export default router;
