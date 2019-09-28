<template>
  <div>
    <NotificationOffline></NotificationOffline>
    <PanelLeft></PanelLeft>
    <nuxt></nuxt>
  </div>
</template>

<script>
export default {
  components: {
    NotificationOffline: () => import('~/components/NotificationOffline'),
    PanelLeft: () => import('~/components/PanelLeft')
  }
}
</script>
