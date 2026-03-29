<template>
  <section class="form-wrap">
    <h2>Create New Ticket</h2>
    <form @submit.prevent="submitTicket">
      <input v-model="form.title" placeholder="Ticket title" required />
      <textarea v-model="form.description" placeholder="Describe the issue" required />
      <input v-model="form.requester" placeholder="Requester name" required />
      <select v-model="form.category">
        <option>Software</option>
        <option>Hardware</option>
        <option>Access</option>
        <option>Network</option>
      </select>
      <select v-model="form.priority">
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <button type="submit">Create Ticket</button>
      <p v-if="message" class="success">{{ message }}</p>
    </form>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue';
import axios from 'axios';

const form = reactive({
  title: '',
  description: '',
  requester: '',
  category: 'Software',
  priority: 'Medium'
});

const message = ref('');

const submitTicket = async () => {
  await axios.post('http://localhost:4000/api/tickets', form);
  message.value = 'Ticket created successfully.';
  form.title = '';
  form.description = '';
  form.requester = '';
  form.category = 'Software';
  form.priority = 'Medium';
};
</script>
