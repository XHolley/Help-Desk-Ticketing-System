export const users = [
  { id: 1, name: 'Xavier Holley', email: 'agent@example.com', role: 'agent' },
  { id: 2, name: 'Casey Manager', email: 'manager@example.com', role: 'manager' },
  { id: 3, name: 'Jordan User', email: 'employee@example.com', role: 'employee' }
];

export let tickets = [
  {
    id: 1001,
    title: 'Printer not connecting',
    description: 'Office printer drops connection every morning.',
    category: 'Hardware',
    priority: 'High',
    status: 'Open',
    requester: 'Jordan User',
    assignedTo: 'Xavier Holley',
    createdAt: '2026-03-20T09:00:00.000Z'
  },
  {
    id: 1002,
    title: 'Password reset request',
    description: 'User locked out after MFA prompt timeout.',
    category: 'Access',
    priority: 'Medium',
    status: 'In Progress',
    requester: 'Taylor Smith',
    assignedTo: 'Xavier Holley',
    createdAt: '2026-03-21T13:30:00.000Z'
  }
];
