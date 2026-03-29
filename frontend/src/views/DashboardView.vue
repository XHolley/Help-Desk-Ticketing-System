<template>
  <section>
    <div class="toolbar">
      <input v-model="search" placeholder="Search tickets" />
      <select v-model="status">
        <option value="">All statuses</option>
        <option v-for="ticketStatus in ticketStatuses" :key="ticketStatus">
          {{ ticketStatus }}
        </option>
      </select>
      <select v-model="priority">
        <option value="">All priorities</option>
        <option v-for="ticketPriority in ticketPriorities" :key="ticketPriority">
          {{ ticketPriority }}
        </option>
      </select>
      <button type="button" @click="loadTickets" :disabled="loading">Refresh</button>
    </div>

    <div class="stats">
      <div class="stat-box"><strong>{{ tickets.length }}</strong><span>Total Tickets</span></div>
      <div class="stat-box"><strong>{{ openCount }}</strong><span>Open</span></div>
      <div class="stat-box"><strong>{{ inProgressCount }}</strong><span>In Progress</span></div>
      <div class="stat-box"><strong>{{ closedCount }}</strong><span>Closed</span></div>
    </div>

    <p v-if="feedbackMessage" class="success">{{ feedbackMessage }}</p>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <p v-if="loading" class="info-message">Loading tickets...</p>
    <p v-else-if="!tickets.length" class="info-message">No tickets matched the current filters.</p>

    <TicketCard
      v-for="ticket in tickets"
      :key="ticket.id"
      :ticket="ticket"
      @assign="assignTicket"
      @unassign="unassignTicket"
      @toggle-status="toggleTicketStatus"
    />
  </section>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import TicketCard from '../components/TicketCard.vue';
import { defaultAssignee, ticketPriorities, ticketStatuses } from '../constants/ticketOptions.js';
import api from '../lib/api.js';

const tickets = ref([]);
const search = ref('');
const status = ref('');
const priority = ref('');
const loading = ref(false);
const errorMessage = ref('');
const feedbackMessage = ref('');

// Auto-clear short success messages so the dashboard stays readable during repeated actions.
const setFeedback = (message) => {
  feedbackMessage.value = message;
  setTimeout(() => {
    if (feedbackMessage.value === message) {
      feedbackMessage.value = '';
    }
  }, 2500);
};

const loadTickets = async () => {
  loading.value = true;
  errorMessage.value = '';

  try {
    const { data } = await api.get('/tickets', {
      params: {
        search: search.value,
        status: status.value,
        priority: priority.value
      }
    });
    tickets.value = data;
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'Unable to load tickets.';
  } finally {
    loading.value = false;
  }
};

const openCount = computed(() => tickets.value.filter(t => t.status === 'Open').length);
const inProgressCount = computed(() => tickets.value.filter(t => t.status === 'In Progress').length);
const closedCount = computed(() => tickets.value.filter(t => t.status === 'Closed').length);

// Keep ticket actions in one place so assignment and status changes share the same API/error flow.
const updateTicket = async (ticket, payload, message) => {
  errorMessage.value = '';

  try {
    const { data } = await api.put(`/tickets/${ticket.id}`, payload);
    tickets.value = tickets.value.map((item) => (item.id === ticket.id ? data : item));
    setFeedback(message);
  } catch (error) {
    const details = error.response?.data?.errors?.join(', ');
    errorMessage.value = details || error.response?.data?.message || 'Unable to update ticket.';
  }
};

const assignTicket = (ticket) =>
  updateTicket(ticket, { assignedTo: defaultAssignee, status: 'In Progress' }, 'Ticket assigned.');

const unassignTicket = (ticket) =>
  updateTicket(ticket, { assignedTo: null, status: ticket.status === 'Closed' ? 'Open' : ticket.status }, 'Ticket unassigned.');

const toggleTicketStatus = (ticket) =>
  updateTicket(
    ticket,
    { status: ticket.status === 'Closed' ? 'Open' : 'Closed' },
    ticket.status === 'Closed' ? 'Ticket reopened.' : 'Ticket closed.'
  );

watch([search, status, priority], loadTickets);
onMounted(loadTickets);
</script>
