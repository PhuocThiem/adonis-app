<template>
  <v-app>
    <div class="container">
      <div class="header">
        <h2>Reset Password</h2>
      </div>
      <div class="progress" style="margin: 30px auto">
        <div
          class="progress-bar"
          role="progressbar"
          style="width: 66%;"
          aria-valuenow="50"
          aria-valuemin="0"
          aria-valuemax="75"
        >
          66%
        </div>
      </div>
      <div v-if="turnOnEmailForm" class="content">
        <form style="max-width: 800px; margin: 20px auto">
          <div class="form-group">
            <label>Email</label>
            <input
              class="form-control"
              v-model="email"
              placeholder="Input your email"
            />
            <small id="emailHelp" class="form-text text-muted"
              >We'll never share your email with anyone else.</small
            >
          </div>
          <button
            class="button"
            @click.prevent="
              getCode(
                email
              )
            "
          >
            <b>Send</b>
          </button>
        </form>
      </div>
      <div v-if="turnOnVerifyForm" class="content">
        <form style="max-width: 800px; margin: 20px auto">
          <div class="form-group">
            <label>Verify Code</label>
            <input
              class="form-control"
              v-model="code"
              placeholder="Input verify code"
            />
            <small id="emailHelp" class="form-text text-muted"
              >Verify code has been sent to your email.</small
            >
          </div>
          <button
            class="button"
            @click.prevent="
              verifyCode(
                code
              )
            "
          >
            <b>Send</b>
          </button>
        </form>
      </div>
      <div v-if="turnOnResetForm" class="content">
        <form style="max-width: 800px; margin: 20px auto">
          <div class="form-group">
            <label>New password</label>
            <input
              class="form-control"
              v-model="password"
              placeholder="Input new password"
            />
          </div>
          <div class="form-group">
            <label>Confirm new password</label>
            <input
              class="form-control"
              v-model="confirmPassword"
              placeholder="Input confirm password"
            />
          </div>
          <button
            class="button"
            @click.prevent="
              resetPassword(
                password
              )
            "
          >
            <b>Send</b>
          </button>
        </form>
      </div>
      <div v-if="isComplete" class="message">
        <h3 style="color: green">{{ _.get(confirm, 'message') }}</h3>
      </div>
    </div>
  </v-app>
</template>
<script>

import { mapState, mapGetters } from 'vuex'
import { get } from 'lodash'

export default {
  data () {
    return {
      email: '',
      code: '',
      password: '',
      confirmPassword: '',
      turnOnEmailForm: true,
      turnOnVerifyForm: false,
      turnOnResetForm: false,
      isComplete: false
    }
  },
  computed: {
    ...mapState({
      logInRequesting: state => get('users.state.user.requesting')
    }),
    ...mapGetters({
      user: 'user',
      confirm: 'confirm'
    })
  },
  methods: {
    async getCode (email) {
      await this.$store.dispatch('getCode', { email })
      if (this.user.userId) {
        this.turnOnEmailForm = false
        this.turnOnVerifyForm = true
      }
    },
    async verifyCode (code) {
      const userID = await this.user.userId
      await this.$store.dispatch('verifyCode', { userID, code })
      if (this.confirm.isValidCode) {
        this.turnOnVerifyForm = false
        this.turnOnResetForm = true
      }
    },
    async resetPassword (password) {
      const userID = await this.user.userId
      await this.$store.dispatch('resetPassword', { userID, password })
      if (this.confirm.message) {
        this.turnOnResetForm = false
        this.isComplete = true
      }
    }
  }
}
</script>
<style scoped>
.container {
  max-width: 1200px;
}
.header {
  text-align: center;
}
.button {
  padding: 10px;
  background-color: rgba(49, 146, 161, 0.295);
  width: 100%;
  border-radius: 5px;
  text-align: center;
  margin: 5px auto;
}
.button:hover{
  background-image: linear-gradient(to bottom, #3aa17f1a, #1f7da8);
}
</style>
