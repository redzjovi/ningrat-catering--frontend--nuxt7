<template>
  <div>
    <!-- <i class="material-icons">signal_wifi_off</i> -->
  </div>
</template>

<script>
import { VueOfflineMixin } from 'vue-offline'

export default {
  mounted() {
    var notification = this.$f7.notification.create({
      icon: '<i class="material-icons">signal_wifi_off</i>',
      title: 'You appear to be offline',
    })
    this.$on('offline', () => {
      notification.open()
    })
    this.$on('online', () => {
      notification.close()
    })
  },
  mixins: [VueOfflineMixin]
}
</script>