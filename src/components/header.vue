<template>
  <!-- Header -->
  <header>
    <nav class="header-nav">
      <div class="container">
        <a href="/" class="header-logo">
          <img src="/image/Logo.svg" alt="TikTak Logo" />
        </a>
        <div class="header-menu" id="mobile-menu-2">
          <ul class="menu-list">
            <li>
              <a href="/" class="menu-link" aria-current="page">Accueil</a>
            </li>
            <li>
              <a href="/add-watch" class="menu-link">Personnaliser</a>
            </li>
            <li>
              <a href="/montres" class="menu-link">Vos montres</a>
            </li>
            <li>
              <a href="/connexion" class="menu-link">Se connecter</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
.header-nav {
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
  border-color: #e5e7eb;
  background-color: #000000;
}

.container {
  display: flex;
  /* Centrage horizontal */
  margin: 0 auto;
  max-width: 1280px;
  /* Centrage vertical */
  align-items: center;
}
.header-logo {
  display: flex;
  align-items: center;

  img {
    margin-right: 0.75rem;
    height: 5rem;
  }
}

.header-menu {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  width: 100%;
  font-size: 1.25rem;
  line-height: 1.75rem;
}

.menu-list {
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-top: 0;
  margin-left: 2rem;
}

.menu-link {
  display: block;
  text-decoration: none;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 0.75rem;
  padding-right: 1rem;
  border-bottom-width: 1px;
  border-color: #f3f4f6;
  color: #f7fafcad;
  font-family: $primary-font-family;
}
.menu-link:hover {
  color: #dd6b20;
}
</style>
