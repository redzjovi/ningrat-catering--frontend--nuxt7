<template>
  <f7-page @page:afterin="authCheck()">
    <f7-navbar>
      <f7-nav-left>
        <f7-link back icon-material="chevron_left"></f7-link>
      </f7-nav-left>
      <f7-nav-title title="Edit"></f7-nav-title>
    </f7-navbar>
    <f7-list @submit.prevent="saveMethod" form>
      <f7-list-input @input="product.name= $event.target.value" clear-button floating-label label="Name" outline type="text" :error-message="errors.name[0]" :error-message-force="errors.name.length > 0" :value="product.name"></f7-list-input>
      <f7-list-input @input="product.excerpt= $event.target.value" clear-button floating-label label="Excerpt" outline resizable type="textarea" :error-message="errors.excerpt[0]" :error-message-force="errors.excerpt.length > 0" :value="product.excerpt"></f7-list-input>
      <f7-list-input @input="product.description= $event.target.value" clear-button floating-label label="Description" outline resizable type="textarea" :error-message="errors.description[0]" :error-message-force="errors.description.length > 0" :value="product.description"></f7-list-input>
      <f7-list-input @input="product.sell_price= $event.target.value" clear-button floating-label label="Sell Price" outline type="number" :error-message="errors.sell_price[0]" :error-message-force="errors.sell_price.length > 0" :value="product.sell_price"></f7-list-input>
      <f7-list-input @input="product.active = $event.target.value" floating-label label="Active" outline type="select" :value="product.active">
        <option v-for="(activeOption, i) in activeOptions" :key="i" :value="activeOption.value">{{ activeOption.name }}</option>
      </f7-list-input>
      <f7-list-item>
        <f7-button color="orange" fill text="Save" type="submit"></f7-button>
      </f7-list-item>
      <input hidden type="submit" />
    </f7-list>
  </f7-page>
</template>

<script>
export default {
  data() {
    return {
      activeOptions: [
        { name: 'Yes', value: 1 },
        { name: 'No', value: 0 }
      ],
      errors: {},
      product: {
        active: 1,
        description: '',
        excerpt: '',
        name: '',
        sell_price: ''
      }
    }
  },
  created() {
    this.errors = Object.assign({}, this.$store.state.product.errors)
    this.getProductMethod()
  },
  methods: {
    authCheck() {
      if (! this.$auth.loggedIn) {
        this.$f7router.back()
      }
    },
    getProductMethod() {
      this.$f7.dialog.preloader()
      
      this.$axios.get('/product/' + this.$f7route.params.id)
      .then(response => {
        this.product = response.data.data
      })
      .catch(e => {
        this.$f7.toast.create({
          closeButton: true,
          closeTimeout: 5000,
          text: e.response.data.message
        }).open()
      })
      .finally(() => {
        this.$f7.dialog.close()
      })
    },
    saveMethod() {
      this.$f7.dialog.preloader()
      this.errors = Object.assign({}, this.$store.state.product.errors)

      this.$axios.put('/product/' + this.$f7route.params.id, this.product)
      .then(response => {
        this.$f7.toast.create({
          closeButton: true,
          closeTimeout: 5000,
          text: 'Saved.'
        }).open()
        this.$f7router.back()
      })
      .catch(e => {
        this.$f7.toast.create({
          closeButton: true,
          closeTimeout: 5000,
          text: e.response.data.message
        }).open()
        this.errors = Object.assign(this.errors, e.response.data.errors)
      })
      .finally(() => {
        this.$f7.dialog.close()
      })
    }
  }
}
</script>
