<template>
  <section class="form-wrap">
    <h2>Create New Ticket</h2>
    <form @submit.prevent="submitTicket">
      <input v-model="form.title" placeholder="Ticket title" required />
      <textarea v-model="form.description" placeholder="Describe the issue" required />
      <input v-model="form.requester" placeholder="Requester name" required />
      <select v-model="form.category">
        <option v-for="category in ticketCategories" :key="category">
          {{ category }}
        </option>
      </select>
      <select v-model="form.priority">
        <option v-for="priority in ticketPriorities" :key="priority">
          {{ priority }}
        </option>
      </select>
      <button type="submit" :disabled="submitting">
        {{ submitting ? 'Creating...' : 'Create Ticket' }}
      </button>
      <p v-if="message" class="success">{{ message }}</p>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </form>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { ticketCategories, ticketPriorities } from '../constants/ticketOptions.js';
import api from '../lib/api.js';

const form = reactive({
  title: '',
  description: '',
  requester: '',
  category: ticketCategories[0],
  priority: ticketPriorities[1]
});

const message = ref('');
const errorMessage = ref('');
const submitting = ref(false);

const resetForm = () => {
  form.title = '';
  form.description = '';
  form.requester = '';
  form.category = ticketCategories[0];
  form.priority = ticketPriorities[1];
};

const submitTicket = async () => {
  submitting.value = true;
  message.value = '';
  errorMessage.value = '';

  try {
    await api.post('/tickets', form);
    message.value = 'Ticket created successfully.';
    resetForm();
  } catch (error) {
    const details = error.response?.data?.errors?.join(', ');
    errorMessage.value = details || error.response?.data?.message || 'Unable to create ticket.';
  } finally {
    submitting.value = false;
  }
};
</script>
