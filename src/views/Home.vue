<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-3 col-xs-12 col-sm-8 col-md-6" v-for="(item, index) in Posts" :key="index">
        <v-card max-width="344" class="mx-auto">
          <v-list-item>
            <v-list-item-avatar color="grey"></v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="headline">{{
                _.get(item, "title")
              }}</v-list-item-title>
              <v-list-item-subtitle>by Kurt Wagner</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-img
            :src="_.get(item, 'media[0].source')"
            height="194"
          ></v-img>

          <v-card-text>
            { }
          </v-card-text>

          <v-card-actions>
            <v-btn text color="deep-purple accent-4">
              Read
            </v-btn>
            <v-btn text color="deep-purple accent-4">
              Bookmark
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>mdi-heart</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-share-variant</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import { get } from 'lodash'
import { mapGetters, mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      requesting: state => get('users.state.user.requesting')
    }),
    ...mapGetters({
      user: 'user',
      profile: 'profile',
      Posts: 'Posts'
    })
  },
  async mounted () {
    this.$store.dispatch('getAllPost')
  }
}
</script>

<style scoped>
.container {
  margin-top: 72px;
}
</style>
