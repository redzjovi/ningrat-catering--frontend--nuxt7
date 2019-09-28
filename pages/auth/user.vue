<template>
  <f7-page @page:afterin="authCheck()">
    <f7-navbar>
      <f7-nav-left>
        <f7-link back icon-material="chevron_left"></f7-link>
      </f7-nav-left>
      <f7-nav-title>My Profile</f7-nav-title>
    </f7-navbar>
    <f7-block v-if="loading">
      <f7-row>
        <f7-col width="60">
          <div class="skeleton-effect-blink skeleton-text">{{ name }}</div>
          <div class="skeleton-effect-blink skeleton-text">{{ email ? email.replace('@', '0') : '' }}</div>
        </f7-col>
        <f7-col width="40">
          <div align="center">
            <div class="auth--user--image">
              <f7-skeleton-block class="auth--user--image skeleton-effect-blink"></f7-skeleton-block>
            </div>
            <div>Change Picture</div>
          </div>
        </f7-col>
      </f7-row>
    </f7-block>
    <f7-block v-else>
      <f7-row>
        <f7-col width="60">
          <div>{{ name }}</div>
          <div class="auth--user--email">{{ email }}</div>
        </f7-col>
        <f7-col width="40">
          <div align="center">
            <div class="auth--user--image">
              <img class="auth--user--image" src="https://via.placeholder.com/40" />
            </div>
            <div>Change Picture</div>
          </div>
        </f7-col>
      </f7-row>
    </f7-block>
    <f7-list>
      <f7-list-item link="/auth/user/change-password" no-chevron title="Change Password">
        <f7-icon material="lock" slot="after"></f7-icon>
      </f7-list-item>
      <f7-list-item @click="logoutMethod" no-chevron title="Logout">
        <f7-icon material="exit_to_app" slot="after"></f7-icon>
      </f7-list-item>
    </f7-list>
  </f7-page>
</template>

<script>
export default {
  data() {
    return {
      name: this.$auth.user.name,
      email: this.$auth.user.email,
      loading: false
    }
  },
  created() {
    this.fetchUserMethod()
  },
  methods: {
    authCheck() {
      if (! this.$auth.loggedIn) {
        this.$f7router.back()
      }
    },
    fetchUserMethod() {
      this.loading = true

      this.$auth.fetchUser()
      .catch(e => {
        this.$f7.toast.create({
          closeButton: true,
          closeTimeout: 5000,
          text: e.response.data.message
        }).open()
      })
      .finally(() => {
        this.loading = false
      })
    },
    logoutMethod() {
      this.$f7.dialog.confirm('Are you sure want to logout?', 'Logout Confirmation', () => {
        this.$auth.logout()
        this.$f7.toast.create({
          closeButton: true,
          closeTimeout: 5000,
          text: 'Logged Out.'
        }).open()
        this.$f7router.back()
      })
    }
  }
}
</script>

<style>
.auth--user--email {
  color: grey;
}
.auth--user--image {
  border-radius: 50%;
  height: 40px;
  width: 40px;
}
</style>
