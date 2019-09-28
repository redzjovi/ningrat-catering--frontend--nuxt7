<template>
  <f7-page>
    <f7-navbar>
      <f7-nav-left>
        <f7-link back icon-material="chevron_left"></f7-link>
      </f7-nav-left>
      <f7-nav-title>Forgot Password</f7-nav-title>
    </f7-navbar>
    <f7-card class="elevation-12" outline>
      <f7-block-title>Forgot Password</f7-block-title>
      <f7-block-header>Please enter the email address that you used to register. We'll send you an email with instructions to reset your password.</f7-block-header>
      <f7-list @submit.prevent="submitMethod" form>
        <f7-list-input @input="email = $event.target.value" autocomplete="nope" clear-button label="Email" type="email" :error-message="errors.email[0]" :error-message-force="errors.email.length > 0" :value="email"></f7-list-input>
        <f7-list-item>
          <f7-button color="orange" fill type="submit">Save</f7-button>
        </f7-list-item>
      </f7-list>
    </f7-card>
  </f7-page>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      errors: {}
    }
  },
  created() {
    this.errors = Object.assign({}, this.$store.state.user.errors)
  },
  mounted() {
    if (this.$auth.loggedIn) {
      this.$f7router.navigate('/')
    }
  },
  methods: {
    submitMethod() {
      this.$f7.dialog.preloader()
      this.errors = Object.assign({}, this.$store.state.user.errors)

      this.$axios.post('/auth/forgot-password', {
        email: this.email
      })
      .then(response => {
        this.$f7.dialog.alert(response.data.message, '', () => {
          this.email = ''
          this.$f7router.navigate('/auth/login')
        })
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

<style>
.auth--login--button--submit {
  width: 100%;
}
</style>
