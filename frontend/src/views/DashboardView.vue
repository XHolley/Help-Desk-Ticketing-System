<template>
  <section>
    <div class="toolbar">
      <input v-model="search" placeholder="Search tickets" />
      <select v-model="status">
        <option value="">All statuses</option>
        <option>Open</option>
        <option>In Progress</option>
        <option>Closed</option>
      </select>
      <button @click="loadTickets">Refresh</button>
    </div>

    <div class="stats">
      <div class="stat-box"><strong>{{ tickets.length }}</strong><span>Total Tickets</span></div>
      <div class="stat-box"><strong>{{ openCount }}</strong><span>Open</span></div>
      <div class="stat-box"><strong>{{ inProgressCount }}</strong><span>In Progress</span></div>
    </div>

    <TicketCard v-for="ticket in tickets" :key="ticket.id" :ticket="ticket" />
  </section>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import axios from 'axios';
import TicketCard from '../components/TicketCard.vue';

const tickets = ref([]);
const search = ref('');
const status = ref('');

const loadTickets = async () => {
  const { data } = await axios.get('http://localhost:4000/api/tickets', {
    params: {
      search: search.value,
      status: status.value
    }
  });
  tickets.value = data;
};

const openCount = computed(() => tickets.value.filter(t => t.status === 'Open').length);
const inProgressCount = computed(() => tickets.value.filter(t => t.status === 'In Progress').length);

watch([search, status], loadTickets);
onMounted(loadTickets);
</script>
