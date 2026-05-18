<script setup lang="ts">
import { ref, onMounted } from 'vue';

const ticketData=ref({
  title: '',
  description: '',
  isDIY: false
});

const statusMessage = ref('');

const ticketsList = ref<any[]>([]);

const fetchTickets =async () => {
  try {
    const response = await fetch('http://localhost:3000/tickets');
    if (response.ok) {
      ticketsList.value= await response.json();
    }
  } catch (error) {
    console.error("Błąd pobierania listy zgłoszeń:", error);
  }
};

onMounted(() => {
  fetchTickets();
});

const submitForm = async () => {
  try {
    const response = await fetch('http://localhost:3000/tickets', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(ticketData.value)
      });
    if (response.ok) {
      statusMessage.value = 'sukces';
      ticketData.value= { title: '', description: '', isDIY: false };
      fetchTickets();
    }
  } catch(error) {
    statusMessage.value="błąd";
  }

};
</script>

<template>
<main>
    <h1>System Zgłoszeń Kaizen</h1>

    <form @submit.prevent="submitForm">
      <div>
        <label>Tytuł zgłoszenia *</label>
        <input type="text" v-model="ticketData.title" required />
      </div>

      <div>
        <label>Opis (opcjonalnie)</label>
        <textarea rows="4" v-model="ticketData.description"></textarea>
      </div>

      <div>
        <label>
          <input type="checkbox" v-model="ticketData.isDIY"/>
          Chcę to wdrozyć samodzielnie (DIY)
        </label>
      </div>
      <button type="submit">Wyślij zgłoszenie</button>
      <p v-if="statusMessage">{{ statusMessage }}</p>
    </form>

    <hr class="divider" />
    
    <h2> Ostatnie Zgłoszenia </h2>

    <p v-if="ticketsList.length === 0">Brak zgłoszeń w bazie</p>

    <div class="tickets-container" v-else>
      <div v-for="ticket in ticketsList" :key="ticket._id" class="ticket-card">
        // tttttt
      </div>

    </div>
  </main>
</template>

<style scoped>
/* 3. STREFA UBRANIA (CSS) */
/* Tu formatujemy wygląd, żeby nie było brzydkie. */
</style>