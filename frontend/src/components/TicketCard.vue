<template>
  <article class="ticket-card">
    <div class="ticket-row">
      <h3>{{ ticket.title }}</h3>
      <span class="badge" :class="badgeClass">{{ ticket.status }}</span>
    </div>
    <p>{{ ticket.description }}</p>
    <div class="meta-grid">
      <span><strong>Category:</strong> {{ ticket.category }}</span>
      <span><strong>Priority:</strong> {{ ticket.priority }}</span>
      <span><strong>Requester:</strong> {{ ticket.requester }}</span>
      <span><strong>Assigned:</strong> {{ ticket.assignedTo || 'Unassigned' }}</span>
      <span><strong>Created:</strong> {{ createdAtLabel }}</span>
    </div>
    <div class="ticket-actions">
      <button type="button" @click="$emit('assign', ticket)">
        {{ ticket.assignedTo ? 'Reassign to Me' : 'Assign to Me' }}
      </button>
      <button type="button" class="secondary-button" @click="$emit('unassign', ticket)">
        Unassign
      </button>
      <button
        type="button"
        class="secondary-button"
        @click="$emit('toggle-status', ticket)"
      >
        {{ ticket.status === 'Closed' ? 'Reopen Ticket' : 'Close Ticket' }}
      </button>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  ticket: {
    type: Object,
    required: true
  }
});

defineEmits(['assign', 'unassign', 'toggle-status']);

const badgeClass = computed(() => `badge-${props.ticket.status.toLowerCase().replace(/\s+/g, '-')}`);
const createdAtLabel = computed(() =>
  new Date(props.ticket.createdAt).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
);
</script>
