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
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="success"
                  @click.prevent="register(username, email, password)"
                  :disabled="
                    usernameErrors.length > 0 ||
                      emailErrors.length > 0 ||
                      passwordErrors.length > 0
                  "
                  >Regiter
                </v-btn>
                <v-btn
                  color="warning"
                  @click.prevent="clear()"
                  :disabled="!username && !email && !password"
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
    username: { required, minLength: minLength(6), maxLength: maxLength(50) },
    email: {
      required,
      email,
      minLength: minLength(8),
      maxLength: maxLength(50)
    },
    password: { required, minLength: minLength(8), maxLength: maxLength(50) }
  },

  data () {
    return {
      username: '',
      email: '',
      password: '',
      checkDisable: ''
    }
  },
  computed: {
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
    }
  },
  methods: {
    register (username, email, password) {
      this.$store.dispatch('register', { username, email, password })
    },
    clear () {
      this.username = ''
      this.email = ''
      this.password = ''
    }
  }
}
</script>
