<template>
  <div>
    <PanelLeft></PanelLeft>
    <nuxt></nuxt>
  </div>
</template>

<script>
export default {
  components: {
    PanelLeft: () => import('~/components/PanelLeft')
  }
}
</script>
