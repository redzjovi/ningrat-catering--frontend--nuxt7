<template>
  <f7-panel cover left>
    <f7-block v-if="$auth.loggedIn">
      <f7-row>
        <f7-col width="40">
          <div align="center">
            <div>
              <img class="panel-left--profile--image" src="https://via.placeholder.com/40" />
            </div>
            <div class="panel-left--profile--edit">
              <f7-link href="/auth/user/" panel-close>
                Edit My Profile
              </f7-link>
            </div>
          </div>
        </f7-col>
        <f7-col width="60">
          <div>
            {{ $auth.user.name }}
          </div>
          <div class="panel-left--profile--email">
            {{ $auth.user.email }}
          </div>
        </f7-col>
      </f7-row>
    </f7-block>
    <f7-block v-else>
      <f7-block-header>
        Welcome
      </f7-block-header>
      <div>
        <f7-link href="/auth/register/" panel-close>
          Register Now
        </f7-link>
      </div>
      <div>
        Already a Member?
        <f7-link href="/auth/login/" panel-close>
          Log In
        </f7-link>
      </div>
    </f7-block>
    <f7-list>
      <f7-list-item link="/" no-chevron panel-close title="Home">
        <f7-icon material="home" slot="media"></f7-icon>
      </f7-list-item>
    </f7-list>
  </f7-panel>
</template>

<style>
.panel-left--profile--email {
  color: grey;
}
.panel-left--profile--edit {
  font-size: 75%;
}
.panel-left--profile--image {
  border-radius: 50%;
  height: 40px;
  width: 40px;
}
</style>
