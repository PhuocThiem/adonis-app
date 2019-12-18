<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar color="blue" dark flat>
                <v-toolbar-title>Register</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <div v-if="!error">
                    <label style="color: red; font-size: 16px">{{ error }}</label>
                  </div>
                  <v-text-field
                    :counter="50"
                    label="Username"
                    :error-messages="usernameErrors"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="username"
                    required
                    @input="$v.username.$touch()"
                    @blur="$v.username.$touch()"
                  ></v-text-field>
                  <v-text-field
                    :counter="50"
                    label="Email"
                    :error-messages="emailErrors"
                    prepend-icon="mdi-email-mark-as-unread "
                    type="text"
                    v-model="email"
                    required
                    @input="$v.email.$touch()"
                    @blur="$v.email.$touch()"
                  ></v-text-field>

                  <v-text-field
                    :counter="50"
                    id="Password"
                    label="Password"
                    :error-messages="passwordErrors"
                    prepend-icon="mdi-account-key"
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
                    prepend-icon="mdi-lock-question "
                    type="password"
                    v-model="confirmPassword"
                    @input="$v.confirmPassword.$touch()"
                    @blur="$v.confirmPassword.$touch()"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="success"
                  @click.prevent="register(username, email, password)"
                  :disabled="
                    !username || !email || !password || !confirmPassword ||
                    usernameErrors.length > 0 ||
                    emailErrors.length > 0 ||
                    passwordErrors.length > 0 ||
                    confirmPasswordErrors.length > 0
                  "
                  >Regiter
                </v-btn>
                <v-btn
                  color="warning"
                  @click.prevent="clear()"
                  :disabled="!username && !email && !password && !confirmPassword"
                  >Clear
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { validationMixin } from 'vuelidate'
import { get } from 'lodash'
import {
  required,
  minLength,
  email,
  maxLength
} from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],

  validations: {
    username: { required, minLength: minLength(6), maxLength: maxLength(50) },
    email: {
      required,
      email,
      minLength: minLength(8),
      maxLength: maxLength(50)
    },
    password: { required, minLength: minLength(8), maxLength: maxLength(50) },
    confirmPassword: { required, minLength: minLength(8), maxLength: maxLength(50) }
  },

  data () {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      error: ''
    }
  },
  computed: {
    ...mapState({
      logInRequesting: state => get('users.state.user.requesting')
    }),
    ...mapGetters({
      user: 'user'
    }),
    usernameErrors () {
      const errors = []
      if (!this.$v.username.$dirty) return errors
      !this.$v.username.required && errors.push('Username is required')
      !this.$v.username.minLength &&
        errors.push('username must be at least 6 characters long')
      !this.$v.username.maxLength &&
        errors.push('username must be at most 50 characters long')
      return errors
    },
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
      !this.$v.confirmPassword.required && errors.push('Confirm password is required')
      !this.$v.confirmPassword.minLength &&
        errors.push('Confirm password must be at least 8 characters long')
      !this.$v.confirmPassword.maxLength &&
        errors.push('Confirm password must be at most 50 characters long')
      if (this.password !== this.confirmPassword) {
        errors.push('Confirm password does not match')
      }
      return errors
    }
  },
  methods: {
    async register (username, email, password) {
      await this.$store.dispatch('register', { username, email, password })
      console.log('user', this.user)
      if (this.user.status === 400) {
        this.error = 'This email already exists'
      } else if (this.user.status === 403) {
        this.error4 = 'Your account is not activated, check your email to activated'
      } else {
        return this.$router.push({ path: '/' })
      }
      return this.error
    },
    clear () {
      this.username = ''
      this.email = ''
      this.password = ''
      this.confirmPassword = ''
    }
  }
}
</script>
