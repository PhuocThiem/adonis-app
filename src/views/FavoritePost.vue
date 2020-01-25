<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-sm-8- col-md-6 col-lg-4 col-xl-3">
        <v-card class="mx-auto" max-width="400" v-for="(item, index) in favoritePosts" :key="index">
          <v-img
            class="white--text align-end"
            height="200px"
            :src="_.get(favoritePosts, 'link')"
          >
            <v-card-title>Top 10 Australian beaches</v-card-title>
          </v-img>

          <v-card-subtitle class="pb-0">Number 10</v-card-subtitle>

          <v-card-text class="text--primary">
            <div>Whitehaven Beach</div>

            <div>Whitsunday Island, Whitsunday Islands</div>
          </v-card-text>

          <v-card-actions>
            <v-btn color="orange" text>
              Share
            </v-btn>

            <v-btn color="orange" text>
              Explore
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>

import { get } from 'lodash'
import { mapState, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapState({
      userRequest: state => get('users.state.user.requesting')
    }),
    ...mapGetters({
      user: 'user',
      favoritePosts: 'favoritePosts'
    })
  },
  async mounted () {
    const userID = await get(this.user, '')
    this.$store.dispatch('getFavoritePosts', { userID })
  }
}
</script>

<style scoped>
.container {
}
* {
  padding: 0;
  margin: 0;
}
</style>
