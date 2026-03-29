import {
  TICKET_CATEGORIES,
  TICKET_PRIORITIES,
  TICKET_STATUSES
} from '../constants/ticketOptions.js';

const isNonEmptyString = (value) => typeof value === 'string' && value.trim().length > 0;

const normalizeText = (value) => value.trim();

export const validateTicketPayload = (payload, { partial = false } = {}) => {
  const errors = [];
  const normalized = {};

  // Create requests require the full ticket payload, while updates can send only changed fields.
  const requiredFields = ['title', 'description', 'category', 'priority', 'requester'];

  if (!partial) {
    for (const field of requiredFields) {
      if (!isNonEmptyString(payload[field])) {
        errors.push(`${field} is required`);
      }
    }
  }

  if (payload.title !== undefined) {
    if (!isNonEmptyString(payload.title)) {
      errors.push('title must be a non-empty string');
    } else {
      normalized.title = normalizeText(payload.title);
    }
  }

  if (payload.description !== undefined) {
    if (!isNonEmptyString(payload.description)) {
      errors.push('description must be a non-empty string');
    } else {
      normalized.description = normalizeText(payload.description);
    }
  }

  if (payload.requester !== undefined) {
    if (!isNonEmptyString(payload.requester)) {
      errors.push('requester must be a non-empty string');
    } else {
      normalized.requester = normalizeText(payload.requester);
    }
  }

  if (payload.category !== undefined) {
    if (!TICKET_CATEGORIES.includes(payload.category)) {
      errors.push(`category must be one of: ${TICKET_CATEGORIES.join(', ')}`);
    } else {
      normalized.category = payload.category;
    }
  }

  if (payload.priority !== undefined) {
    if (!TICKET_PRIORITIES.includes(payload.priority)) {
      errors.push(`priority must be one of: ${TICKET_PRIORITIES.join(', ')}`);
    } else {
      normalized.priority = payload.priority;
    }
  }

  if (payload.status !== undefined) {
    if (!TICKET_STATUSES.includes(payload.status)) {
      errors.push(`status must be one of: ${TICKET_STATUSES.join(', ')}`);
    } else {
      normalized.status = payload.status;
    }
  }

  if (payload.assignedTo !== undefined) {
    if (payload.assignedTo !== null && !isNonEmptyString(payload.assignedTo)) {
      errors.push('assignedTo must be a non-empty string or null');
    } else {
      normalized.assignedTo = payload.assignedTo === null ? null : normalizeText(payload.assignedTo);
    }
  }

  return { errors, normalized };
};
