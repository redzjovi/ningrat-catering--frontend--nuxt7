<template>
  <div>
    <NotificationOffline></NotificationOffline>
    <PanelLeft></PanelLeft>
    <PanelRight></PanelRight>
    <nuxt></nuxt>
  </div>
</template>

<script>
export default {
  components: {
    NotificationOffline: () => import('~/components/NotificationOffline'),
    PanelLeft: () => import('~/components/PanelLeft'),
    PanelRight: () => import('~/components/PanelRight')
  }
}
</script>
