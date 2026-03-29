<template>
  <div class="app-shell">
    <header class="topbar">
      <div>
        <h1>Help Desk Ticketing System</h1>
        <p>Portfolio project for software, IT support, analyst, and QA roles</p>
      </div>
      <nav>
        <RouterLink to="/">Dashboard</RouterLink>
        <RouterLink to="/new-ticket">New Ticket</RouterLink>
      </nav>
    </header>
    <main>
      <RouterView />
    </main>
  </div>
</template>
