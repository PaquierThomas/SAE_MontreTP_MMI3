<script>
import { ref, onMounted, onUnmounted } from 'vue'

const percent = ref(0)

function handlScrol() {
  let scrollTop = window.scrollY
  let scrollBottom = scrollTop + window.innerHeight

  let offsetTop = this.$refs.container.offsetTop
  let elementHeight = this.$refs.container.offsetHeight

  let result = ((scrollBottom - offsetTop) / elementHeight) * 100

  percent.value = Math.round(result)
}

onMounted(() => {
  window.addEventListener('scroll', this.handleScroll)
}),
  onUnmounted(() => {
    window.removeEventListener('scroll', this.handleScroll)
  })
</script>

<template>
  <div ref="container" class="backgroundScroll">
    <div class="backgroundScroll__content">
      <p>Section Scroll : {{ percent }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.backgroundScroll {
  background: $black;
  color: $white;
  height: 2000px;

  &__content {
    left: 0;
    position: sticky;
    top: 0;
    width: 100%;
  }
}
</style>
