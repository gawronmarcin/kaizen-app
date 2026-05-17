<script setup lang="ts">
import { ref } from 'vue';

const ticketData=ref({
  title: '',
  description: '',
  isDIY: false
});

const statusMessage = ref('');

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
  </main>
</template>

<style scoped>
/* 3. STREFA UBRANIA (CSS) */
/* Tu formatujemy wygląd, żeby nie było brzydkie. */
</style>