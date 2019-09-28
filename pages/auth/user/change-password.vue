<template>
  <f7-page @page:afterin="authCheck()">
    <f7-navbar>
      <f7-nav-left>
        <f7-link back icon-material="chevron_left"></f7-link>
      </f7-nav-left>
      <f7-nav-title>Change Password</f7-nav-title>
    </f7-navbar>
    <f7-card class="elevation-12" outline>
      <f7-block-title>Change Password</f7-block-title>
      <f7-list @submit.prevent="submitMethod" form>
        <f7-list-input @input="old_password = $event.target.value" autocomplete="nope" clear-button label="Old Password" type="password" :error-message="errors.old_password[0]" :error-message-force="errors.old_password.length > 0" :value="old_password"></f7-list-input>
        <f7-list-input @input="new_password = $event.target.value" autocomplete="nope" clear-button label="New Password" type="password" :error-message="errors.new_password[0]" :error-message-force="errors.new_password.length > 0" :value="new_password"></f7-list-input>
        <f7-list-input @input="confirm_password = $event.target.value" autocomplete="nope" clear-button label="Old Password" type="password" :error-message="errors.confirm_password[0]" :error-message-force="errors.confirm_password.length > 0" :value="confirm_password"></f7-list-input>
        <f7-list-item>
          <f7-button color="orange" fill type="submit">Submit</f7-button>
        </f7-list-item>
      </f7-list>
    </f7-card>
  </f7-page>
</template>

<script>
export default {
  data() {
    return {
      confirm_password: '',
      errors: {},
      new_password: '',
      old_password: ''
    }
  },
  created() {
    this.errors = Object.assign({}, this.$store.state.user.errors)
  },
  methods: {
    authCheck() {
      if (! this.$auth.loggedIn) {
        this.$f7router.back()
      }
    },
    submitMethod() {
      this.$f7.dialog.preloader()
      this.errors = Object.assign({}, this.$store.state.user.errors)

      this.$axios.post('/auth/user/change-password', {
        confirm_password: this.confirm_password,
        new_password: this.new_password,
        old_password: this.old_password
      })
      .then(response => {
        this.$f7.dialog.alert(response.data.message, 'Success!', () => {
          this.confirm_password = ''
          this.new_password = ''
          this.old_password = ''
          
          this.$f7router.back()
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
