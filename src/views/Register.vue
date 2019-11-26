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
                <v-toolbar-title>Register</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Username"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="username"
                  ></v-text-field>
                  <v-text-field
                    label="Email"
                    prepend-icon="mdi-email-mark-as-unread "
                    type="text"
                    v-model="email"
                  ></v-text-field>

                  <v-text-field
                    id="Password"
                    label="Password"
                    prepend-icon="mdi-account-key"
                    type="password"
                    v-model="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="register(username, email, password)">Regiter
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
export default {
  data () {
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    register (username, email, password) {
      console.log(username)
      console.log(email)
      console.log(password)
      this.$store.dispatch('register', { username, email, password })
    }
  }
}
</script>
