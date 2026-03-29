import { Router } from 'express';
import { tickets } from '../db/mockData.js';
import {
  DEFAULT_ASSIGNEE,
  TICKET_PRIORITIES,
  TICKET_STATUSES
} from '../constants/ticketOptions.js';
import { validateTicketPayload } from '../utils/ticketValidation.js';

const router = Router();

router.get('/', (req, res) => {
  const { status, priority, search } = req.query;
  let results = [...tickets];

  // Reject unsupported filter values early so the UI gets a clear API error.
  if (status && !TICKET_STATUSES.includes(status)) {
    return res.status(400).json({ message: `status must be one of: ${TICKET_STATUSES.join(', ')}` });
  }

  if (priority && !TICKET_PRIORITIES.includes(priority)) {
    return res.status(400).json({ message: `priority must be one of: ${TICKET_PRIORITIES.join(', ')}` });
  }

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
  const { errors, normalized } = validateTicketPayload(req.body);

  if (errors.length) {
    return res.status(400).json({ message: 'Validation failed', errors });
  }

  const newTicket = {
    id: Date.now(),
    ...normalized,
    // New tickets always begin open and unassigned, regardless of client input.
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

  const { errors, normalized } = validateTicketPayload(req.body, { partial: true });

  if (errors.length) {
    return res.status(400).json({ message: 'Validation failed', errors });
  }

  const nextTicket = { ...tickets[index], ...normalized };

  // Closed tickets should still have ownership in the mock workflow for demo consistency.
  if (nextTicket.status === 'Closed' && !nextTicket.assignedTo) {
    nextTicket.assignedTo = DEFAULT_ASSIGNEE;
  }

  tickets[index] = nextTicket;
  res.json(tickets[index]);
});

export default router;
