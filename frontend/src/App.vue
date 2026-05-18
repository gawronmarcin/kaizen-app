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
        <h3>{{ ticket.title }}</h3>
        <p class="desc">{{ ticket.description || 'Brak opisu' }}</p>

        <div class="ticket-footer">
          <span class="status">Status: {{ ticket.status }}</span>
          <span v-if="ticket.isDIY" class="diy-badge">DIY</span>
        </div>
      </div>

    </div>
  </main>
</template>

<style scoped>
/* 3. STREFA UBRANIA (CSS) */
/* Tu formatujemy wygląd, żeby nie było brzydkie. */
.divider {
  margin: 40px 0;
  border: none;
  border-top: 2px solid #eee
}
h2 {
  text-align:center;
  color: #2c3e50;
}
.tickets-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.ticket-card {
  background: white;
  border: 1px solid #ddd;
  border-left: 5px solid #42b883;
  padding: 15px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}
.ticket-card h3 {
  margin: 0 0 10px 0;
  color: #333;
}
.desc {
  color: #666;
  margin-bottom: 15px;
}
.ticket-footer {
  display:flex;
  justify-content: space-between;
  font-size:14px;
}
.status {
  font-weight: bold;
  color: #888;
  text-transform:uppercase;
}
.diy-badge {
  background: #ffeb3b;
  color: #555;
  padding: 2px 8px;
  border-radius: 12px;
  font-weight: bold;
}
</style>