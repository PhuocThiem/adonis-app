<template>
  <v-app>
    <div class="container">
      <div class="header">
        <h2>Reset Password</h2>
      </div>
      <v-stepper
        v-model="countStep"
        vertical
        style="max-width: 800px; margin: 100px auto"
      >
        <v-stepper-step :complete="countStep > 1" step="1">
          Get verify code
        </v-stepper-step>

        <v-stepper-content step="1">
          <v-card color="grey lighten-5" class="mb-12" style="padding: 5px">
            <v-text v-if="message" style="color: red; font-size: 18px"
              >The email is incorrect, Input again!</v-text
            >
            <v-text-field
              :counter="50"
              label="Email"
              :error-messages="emailErrors"
              type="text"
              v-model="email"
              required
              @input="$v.email.$touch()"
              @blur="$v.email.$touch()"
            ></v-text-field>
            <v-btn
              color="primary"
              :disabled="emailErrors.length > 0 || !email"
              class="button"
              @click.prevent="getCode(email)"
              >Send</v-btn
            >
          </v-card>
        </v-stepper-content>

        <v-stepper-step :complete="countStep > 2" step="2"
          >Verify code</v-stepper-step
        >

        <v-stepper-content step="2">
          <v-card color="grey lighten-5" class="mb-12" style="padding :5px">
            <v-text v-if="message" style="color: red; font-size: 18px"
              >The verify code is incorrect!</v-text
            >
            <v-text-field
              :counter="50"
              label="Verify code"
              :error-messages="codeErrors"
              type="text"
              v-model="code"
              required
              @input="$v.code.$touch()"
              @blur="$v.code.$touch()"
            ></v-text-field>
            <small id="emailHelp" class="form-text text-muted"
              >Verify code has been sent to your email.</small
            >
            <v-btn
              class="button"
              :disabled="!code || codeErrors.length > 0"
              color="primary"
              @click.prevent="verifyCode(code)"
              >Verify</v-btn
            >
          </v-card>
        </v-stepper-content>

        <v-stepper-step :complete="countStep > 3" step="3"
          >Set new password</v-stepper-step
        >

        <v-stepper-content step="3">
          <v-card color="grey lighten-5" class="mb-12" style="padding :5px">
            <v-text-field
              :counter="50"
              id="Password"
              label="Password"
              :error-messages="passwordErrors"
              type="password"
              v-model="password"
              @input="$v.password.$touch()"
              @blur="$v.password.$touch()"
            ></v-text-field>
            <v-text-field
              :counter="50"
              id="ConfirmPassword"
              label="Confirm Password"
              :error-messages="confirmPasswordErrors"
              type="password"
              v-model="confirmPassword"
              @input="$v.confirmPassword.$touch()"
              @blur="$v.confirmPassword.$touch()"
            ></v-text-field>
            <v-btn
              color="primary"
              class="button"
              :disabled="
                !password ||
                  !confirmPassword ||
                  passwordErrors.length > 0 ||
                  confirmPasswordErrors.length > 0
              "
              @click.prevent="resetPassword(password)"
              >Submit</v-btn
            >
            <v-btn text>Cancel</v-btn>
          </v-card>
        </v-stepper-content>

        <v-stepper-step step="4">Complete</v-stepper-step>
        <v-stepper-content step="4">
          <v-card color="grey lighten-5" class="mb-12">
            <h3 style="color: green">{{ _.get(confirm, "message") }}</h3>
            <h3 style="color: green">
              <a href="http://localhost:8080/login">Back to Login</a>
            </h3>
          </v-card>
        </v-stepper-content>
      </v-stepper>
    </div>
  </v-app>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import { get } from 'lodash'
import { validationMixin } from 'vuelidate'
import {
  required,
  minLength,
  email,
  maxLength
} from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],

  validations: {
    email: {
      required,
      email,
      minLength: minLength(8),
      maxLength: maxLength(50)
    },
    password: { required, minLength: minLength(8), maxLength: maxLength(50) },
    confirmPassword: {
      required,
      minLength: minLength(8),
      maxLength: maxLength(50)
    },
    code: { required, minLength: minLength(8), maxLength: maxLength(50) }
  },
  data () {
    return {
      email: '',
      code: '',
      password: '',
      confirmPassword: '',
      message: false,
      countStep: 1
    }
  },
  computed: {
    ...mapState({
      logInRequesting: state => get('users.state.user.requesting')
    }),
    ...mapGetters({
      user: 'user',
      confirm: 'confirm'
    }),
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.required && errors.push('E-mail is required')
      !this.$v.email.minLength &&
        errors.push('Email must be at least 8 characters long')
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.maxLength &&
        errors.push('Email must be at most 50 characters long')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Password is required')
      !this.$v.password.minLength &&
        errors.push('Password must be at least 8 characters long')
      !this.$v.password.maxLength &&
        errors.push('Password must be at most 50 characters long')
      return errors
    },
    confirmPasswordErrors () {
      const errors = []
      if (!this.$v.confirmPassword.$dirty) return errors
      !this.$v.confirmPassword.required &&
        errors.push('Confirm password is required')
      !this.$v.confirmPassword.minLength &&
        errors.push('Confirm password must be at least 8 characters long')
      !this.$v.confirmPassword.maxLength &&
        errors.push('Confirm password must be at most 50 characters long')
      if (this.password !== this.confirmPassword) {
        errors.push('Confirm password does not match')
      }
      return errors
    },
    codeErrors () {
      const errors = []
      if (!this.$v.code.$dirty) return errors
      !this.$v.code.required && errors.push('Confirm password is required')
      return errors
    }
  },
  methods: {
    async getCode (email) {
      await this.$store.dispatch('getCode', { email })
      if (this.user.userId) {
        this.countStep = 2
        this.message = false
      } else if (this.user.status === 404) {
        this.message = true
      }
    },
    async verifyCode (code) {
      const userID = await this.user.userId
      await this.$store.dispatch('verifyCode', { userID, code })
      if (this.confirm.isValidCode) {
        this.countStep = 3
        this.message = false
      } else {
        this.message = true
      }
    },
    async resetPassword (password) {
      const userID = await this.user.userId
      await this.$store.dispatch('resetPassword', { userID, password })
      if (this.confirm.message) {
        this.countStep = 4
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
.button:hover {
  background-image: linear-gradient(to bottom, #3aa17f1a, #1f7da8);
}
</style>
