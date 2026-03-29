<template>
  <article class="ticket-card">
    <div class="ticket-row">
      <h3>{{ ticket.title }}</h3>
      <span class="badge">{{ ticket.status }}</span>
    </div>
    <p>{{ ticket.description }}</p>
    <div class="meta-grid">
      <span><strong>Category:</strong> {{ ticket.category }}</span>
      <span><strong>Priority:</strong> {{ ticket.priority }}</span>
      <span><strong>Requester:</strong> {{ ticket.requester }}</span>
      <span><strong>Assigned:</strong> {{ ticket.assignedTo || 'Unassigned' }}</span>
    </div>
  </article>
</template>

<script setup>
defineProps({
  ticket: {
    type: Object,
    required: true
  }
});
</script>
