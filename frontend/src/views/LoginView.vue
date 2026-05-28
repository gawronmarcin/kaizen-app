<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const mockLogin = (role: 'EMPLOYEE' | 'MANAGER', name: string) => {
    localStorage.setItem('userRole',role);
    localStorage.setItem('userName',name);

    if (role === 'MANAGER') {
        router.push('/manager');
    } else {
        router.push('/');
    }
};
</script>

<template>
  <div class="login-container">
    <div class="login-box">
      <h2>Wybierz konto testowe</h2>
      <p class="subtitle">Mock prezentacyjny systemu Kaizen</p>
      
      <div class="buttons">
        <button @click="mockLogin('EMPLOYEE', 'Jan Kowalski')" class="btn employee">
          👤 Zaloguj jako Pracownik (Jan)
        </button>
        
        <button @click="mockLogin('MANAGER', 'Anna Nowak')" class="btn manager">
          ⭐ Zaloguj jako Menedżer (Anna)
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}
.login-box {
  background: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  text-align: center;
  width: 100%;
  max-width: 400px;
}
h2 { color: #2c3e50; margin-bottom: 5px; }
.subtitle { color: #666; margin-bottom: 30px; }
.buttons { display: flex; flex-direction: column; gap: 15px; }
.btn {
  padding: 15px;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.1s, opacity 0.2s;
}
.btn:hover { opacity: 0.9; transform: translateY(-2px); }
.employee { background-color: #42b883; color: white; }
.manager { background-color: #34495e; color: white; }
</style>