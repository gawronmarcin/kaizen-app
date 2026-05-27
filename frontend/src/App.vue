<template>
<div class="app-layout">
  <nav class="top-nav">
    <div class="logo">System Kaizen</div>
    <div class="links">
      <router-link to="/">Panel Pracownika</router-link>
      <router-link to="manager">Zarządzanie (Menedżet)</router-link>
    </div>
  </nav>
  <main class="content">
    <router-view></router-view>
  </main>
</div>
</template>

<style>
body {
  margin:0;
  font-family: Arial, sans-serif;
  background-color: #f5f7fa;

}
</style>

<style scoped>
.top-nav {
  display:flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background-color: #2c3e50;
  color:white
}
.logo {
  font-weight: bold;
  font-size: 1.2rem;
  letter-spacing: 1px;
}
.links {
  display: flex;
  gap: 20px;
}
.links a {
  color: #a8b8d0;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.2s;
}
.links a:hover {
  color: white;
}
/* Vue Router sam dodaje tę klasę do aktywnego linku! */
.links a.router-link-active {
  color: #42b883;
}
.content {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
}
</style>