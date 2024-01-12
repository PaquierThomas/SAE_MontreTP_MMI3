<template class="body">
  <Header />
  <div class="flex">
    <div class="left">
      <H1>Élégance intemporelle, précision à chaque tik-tak.</H1>
    </div>
    <div class="right"></div>
  </div>
  <Footer class="footer" />
</template>
<script setup>
import Footer from '../components/footer.vue'
import Header from '../components/header.vue'
</script>

<style lang="scss" scoped>
$color: white;
body {
  height: 100vh;
}
.flex {
  display: flex;
  flex-direction: row;
  height: 100%;
}
.left {
  width: 55%;
  height: 100%;
  background-color: #000000;
  border-top: 2px solid $color;
  border-bottom: 2px solid $color;
  border-right: 2px solid $color;
}
h1 {
  font-size: 150px;
  -webkit-text-stroke: 3px $color;
  line-height: 1.1;
  font-family: $primary-font-family;

  font-weight: 700;
  padding: 80px 0 80px 25px;
  margin-left: 75px;

  text-transform: uppercase;
}
@media screen and (max-width: 1600px) {
  h1 {
    font-size: 100px;
    padding: 50px 0 50px 25px;
    margin-left: 40px;
  }
}

.right {
  background: black;
  width: 45%;
  border-top: 2px solid $color;
  border-bottom: 2px solid $color;
}

.footer {
  margin: 0;
}
</style>
```
