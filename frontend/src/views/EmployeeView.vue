<script setup lang="ts">
import { ref } from 'vue'

const ticketData = ref({
  title: '',
  description: '',
  isDIY:false
});

const statusMessage = ref('');

const submitForm = async () => {
  try {
    const currentAuthor = localStorage.getItem('userName') || 'Nieznany pracownik';

    const payload = {
      ...ticketData.value,
      author: currentAuthor
    }

    const response = await fetch('http://localhost:3000/tickets', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload)
      });
    if (response.ok) {
      statusMessage.value = 'sukces';
      ticketData.value= { title: '', description: '', isDIY: false };
    }
  } catch(error) {
    statusMessage.value="błąd";
  }

};

</script>

<template>
  <div class="employee-view">
    <h2>Dodaj nowe zgłoszenie Kaizen</h2>
    <p class="subtitle">Masz pomysł na usprawnienie? Wypełnij formularz poniżej.</p>

    <form @submit.prevent="submitForm" class="ticket-form">
      <div class="form-group">
        <label>Tytuł zgłoszenia *</label>
        <input type="text" v-model="ticketData.title" required placeholder="Napisz krótko, co chcesz poprawić..." />
      </div>

      <div class="form-group">
        <label>Opis (opcjonalnie)</label>
        <textarea rows="4" v-model="ticketData.description" placeholder="Opisz szczegóły swojego pomysłu..."></textarea>
      </div>

      <div class="form-group checkbox-group">
        <label>
          <input type="checkbox" v-model="ticketData.isDIY"/>
          Chcę to wdrożyć samodzielnie (DIY)
        </label>
      </div>

      <button type="submit" class="submit-btn">Wyślij zgłoszenie</button>
      
      <p v-if="statusMessage" class="status-msg" :class="{ 'error': statusMessage.includes('Błąd') }">
        {{ statusMessage }}
      </p>
    </form>
  </div>
</template>

<style scoped>
/* Nowe, schludne ubranie dla formularza */
.employee-view {
  max-width: 600px;
  margin: 0 auto;
}
h2 {
  color: #2c3e50;
  margin-bottom: 5px;
}
.subtitle {
  color: #666;
  margin-bottom: 25px;
}
.ticket-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: #fff;
  padding: 25px;
  border-radius: 8px;
  border: 1px solid #eee;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
label {
  font-weight: bold;
  color: #333;
  font-size: 0.9rem;
}
input[type="text"], textarea {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
}
input[type="text"]:focus, textarea:focus {
  border-color: #42b883;
  outline: none;
}
.checkbox-group label {
  font-weight: normal;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}
.submit-btn {
  background-color: #42b883;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 10px;
}
.submit-btn:hover {
  background-color: #33a06f;
}
.status-msg {
  text-align: center;
  padding: 10px;
  background-color: #e6f7ef;
  color: #2b7a57;
  border-radius: 4px;
  font-weight: bold;
}
.status-msg.error {
  background-color: #ffeaea;
  color: #d63031;
}
</style>