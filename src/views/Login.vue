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
                    label="Email"
                    prepend-icon="mdi-email-mark-as-unread "
                    type="text"
                  ></v-text-field>

                  <v-text-field
                    id="Password"
                    label="Password"
                    prepend-icon="mdi-account-key"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions style="margin-top: 0px">
                <v-spacer></v-spacer>
                <v-btn color="primary">Submit
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>
