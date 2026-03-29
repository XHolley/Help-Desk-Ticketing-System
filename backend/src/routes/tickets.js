import { Router } from 'express';
import { tickets } from '../db/mockData.js';

const router = Router();

router.get('/', (req, res) => {
  const { status, priority, search } = req.query;
  let results = [...tickets];

  if (status) {
    results = results.filter((t) => t.status.toLowerCase() === status.toLowerCase());
  }

  if (priority) {
    results = results.filter((t) => t.priority.toLowerCase() === priority.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    results = results.filter((t) =>
      [t.title, t.description, t.requester, t.assignedTo, t.category]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(q))
    );
  }

  res.json(results);
});

router.get('/:id', (req, res) => {
  const ticket = tickets.find((t) => t.id === Number(req.params.id));
  if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
  res.json(ticket);
});

router.post('/', (req, res) => {
  const { title, description, category, priority, requester } = req.body;
  const newTicket = {
    id: Date.now(),
    title,
    description,
    category,
    priority,
    requester,
    status: 'Open',
    assignedTo: null,
    createdAt: new Date().toISOString()
  };
  tickets.unshift(newTicket);
  res.status(201).json(newTicket);
});

router.put('/:id', (req, res) => {
  const index = tickets.findIndex((t) => t.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Ticket not found' });

  tickets[index] = { ...tickets[index], ...req.body };
  res.json(tickets[index]);
});

export default router;
