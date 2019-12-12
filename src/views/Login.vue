<template>
<v-app id="inspire">
    <v-content>
      <v-container
        fluid
        fill-height
      >
        <v-layout
          align-center
          justify-center
        >
          <v-flex
            xs12
            sm8
            md4
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="blue"
                dark
                flat
              >
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <div v-if="!isActived">
                    <label style="color: red; font-size: 16px">Your account has not been actived</label>
                    <v-btn color="red" style="margin-left: 3px" @click.prevent="active(email)">Active now</v-btn>
                  </div>
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
                <a href="http://localhost:8080/register" style="margin-left: 20px" target="_blank">You do not have an account?</a>
                <v-spacer></v-spacer>
                <v-btn color="success" @click.prevent="logIn(email, password)" :disabled="emailErrors.length > 0 || passwordErrors.length >0">Login
                </v-btn>
                <v-btn color="warning" @click.prevent="clear()" :disabled="!email && !password">Clear
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
import { required, minLength, email, maxLength } from 'vuelidate/lib/validators'
import { mapGetters, mapState } from 'vuex'
import { get } from 'lodash'
export default {
  mixins: [validationMixin],

  validations: {
    email: { required, email, minLength: minLength(8), maxLength: maxLength(50) },
    password: { required, minLength: minLength(8), maxLength: maxLength(50) }
  },

  data () {
    return {
      email: '',
      password: '',
      isActived: true
    }
  },
  computed: {
    ...mapState({
      logInRequesting: state => get('users.state.user.requesting')
    }),
    ...mapGetters({
      user: 'user'
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
    }
  },
  methods: {
    async logIn (email, password) {
      await this.$store.dispatch('logIn', { email, password })
      if (this.user.status === 403) {
        this.isActived = false
      }
      return this.$router.push({ path: '/' })
    },
    clear () {
      this.email = ''
      this.password = ''
    },
    async active (email) {
      console.log('vuêmail', email)
      this.$store.dispatch('activeEmail', { email })
    }
  }
}
</script>
