<script setup lang="ts"> 

import {ref, onMounted} from 'vue';

const ticketsList = ref<any[]>([]);
const fetchTickets = async () => {
try {
  const response = await fetch('http://localhost:3000/tickets');
  if (response.ok) {
    ticketsList.value = await response.json();
  }
} catch (error) {
  console.error("Błąd pobierania listy zgłoszeń:",error)
}
  
};

onMounted(() => {
  fetchTickets();
});

const updateTicketStatus = async (id: string, currentStatus: string) => {
  const nextStatus = currentStatus === 'draft' ? 'w realizacji' : 'wdrożone';

  try {
    const response = await fetch(`http://localhost:3000/tickets/${id}/status`, {
      method: 'PATCH',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({status: nextStatus})
    });

  if  (response.ok) {
    fetchTickets();
  }
  } catch( error ) {
    console.error("błąd: ",error);
  }

};


const deleteTicket = async (id: string) => {
  if (!confirm('Na pewno chcesz usunąć to zgłoszenie?')) return;

  try {
    const response =await fetch(`http://localhost:3000/tickets/${id}`, {
      method: 'DELETE'
    });
    if (response.ok) {
      fetchTickets();
    }
  } catch(error) {
    console.error("błąd usuwania",error);
  }
}

</script>

<template>
<div class="manager-dashboard">
  <div class="dashboard-header">
    <h2>Panel Zarządzania Zgłoszeniami</h2>
    <p class="subtitle">Przeglądaj, aktualizuj i usuwaj pomysły pracowników</p>
  </div>

  <div v-if="ticketsList.length === 0" class="empty-state">
    Brak zgłoszeń w bazie.
  </div>

  <div class="tickets-grid" v-else>
    <div v-for="ticket in ticketsList" :key="ticket._id" class="ticket-card">
      <div clas="card-header">
        <h3>{{  ticket.title }}</h3>
        <span v-if="ticket.isDIY" class="diy-BADGE">IY</span>
      </div>
      <div class="author-info">Zgłoszone przez: <strong>{{ ticket.author || 'Anonim' }}</strong></div>
      <p class="desc">{{ ticket.description || 'Brak opisu' }}</p>
      <div class="card-footer">
        <span class="status">Status: {{  ticket.status }}</span>

        <div class="actions">
          <button @click="updateTicketStatus(ticket._id, ticket.status)" class="btn-update">
            Zmień status
          </button>
          <button @click="deleteTicket(ticket._id)" class="btn-delete">
            Usuń
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

</template>

<style scoped>
.manager-dashboard {
  width: 100%;
}
.dashboard-header {
  margin-bottom: 30px;
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
}
h2 {
  color: #2c3e50;
  margin: 0 0 5px 0;
}
.subtitle {
  color: #666;
  margin: 0;
}
.empty-state {
  text-align: center;
  padding: 40px;
  background: #f9f9f9;
  border-radius: 8px;
  color: #888;
}

/* Układ siatki dla kafelków */
.tickets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.ticket-card {
  background: white;
  border: 1px solid #ddd;
  border-top: 4px solid #3498db; /* Niebieski akcent dla panelu menedżera */
  padding: 20px;
  border-radius: 6px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 10px;
}
.card-header h3 {
  margin: 0;
  font-size: 1.1rem;
  color: #333;
}
.diy-badge {
  background: #ffeb3b;
  color: #555;
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: bold;
  white-space: nowrap;
}
.desc {
  color: #666;
  font-size: 0.95rem;
  flex-grow: 1; /* Wypycha stopkę na sam dół kafelka */
  margin: 0 0 20px 0;
}
.card-footer {
  border-top: 1px solid #eee;
  padding-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.status {
  font-weight: bold;
  color: #555;
  text-transform: uppercase;
  font-size: 0.85rem;
}
.actions {
  display: flex;
  gap: 10px;
}
button {
  flex: 1;
  padding: 8px;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.2s;
}
button:hover {
  opacity: 0.8;
}
.btn-update {
  background-color: #34495e;
  color: white;
}
.btn-delete {
  background-color: #ff4757;
  color: white;
}

.author-info {
  font-size: 0.85rem;
  color: #7f8c8d;
  margin-bottom: 10px;
 }
</style>