<template>
  <f7-page>
    <f7-navbar>
      <f7-nav-left>
        <f7-link back icon-material="chevron_left"></f7-link>
      </f7-nav-left>
      <f7-nav-title>Register</f7-nav-title>
    </f7-navbar>
    <f7-card class="elevation-12" outline>
      <f7-block-title>Register</f7-block-title>
      <f7-list @submit.prevent="registerMethod" form>
        <f7-list-input @input="name = $event.target.value" autocomplete="nope" clear-button label="Name" type="text" :error-message="errors.name[0]" :error-message-force="errors.name.length > 0" :value="name"></f7-list-input>
        <f7-list-input @input="email = $event.target.value" autocomplete="nope" clear-button label="Email" type="email" :error-message="errors.email[0]" :error-message-force="errors.email.length > 0" :value="email"></f7-list-input>
        <f7-list-input @input="password = $event.target.value" autocomplete="nope" clear-button label="Password" type="password" :error-message="errors.password[0]" :error-message-force="errors.password.length > 0" :value="password"></f7-list-input>
        <f7-list-item>
          <f7-button color="orange" fill type="submit">Register</f7-button>
        </f7-list-item>
      </f7-list>
    </f7-card>
    <f7-block>
      <div align="center">
        Already a member?
        <f7-link href="/auth/login/" reload-current>Log In</f7-link>
      </div>
    </f7-block>
  </f7-page>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      errors: {},
      name: '',
      password: ''
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
    registerMethod() {
      this.$f7.dialog.preloader()
      this.errors = Object.assign({}, this.$store.state.user.errors)

      this.$axios.post('/auth/register', {
        email: this.email,
        name: this.name,
        password: this.password
      })
      .then(response => {
        this.$auth.setUserToken(response.data.data.access_token)
        this.$f7.toast.create({
          closeButton: true,
          closeTimeout: 5000,
          text: 'Logged In.'
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
