<template>
  <div class="container-fluid d-flex flex-column main-container">
    <div class="flex-fill post-container">
      <div class="row">
        <div
          class="col-lg-3 col-xs-12 col-sm-8 col-md-6"
          v-for="(item, index) in favoritePosts"
          :key="index"
        >
          <v-card class="mx-auto post" max-width="400" @click="getPostDetail(item)">
            <v-img
              class="white--text align-end"
              height="200px"
              :src="_.get(item, 'media[0].source')"
            >
              <v-card-title>{{ item.title }}</v-card-title>
            </v-img>

            <v-card-subtitle class="pb-0">Number 10</v-card-subtitle>

            <v-card-text class="text--primary post-summary">
              <div>{{ _.get(item, "description") }}</div>
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
    const userID = await get(this.user, 'id')
    console.log('UserID in favo', userID)
    this.$store.dispatch('getFavoritePosts', { userID })
  },
  methods: {
    getPostDetail (post) {
      const postID = get(post, 'id').toString()
      console.log('PostID', postID)
      this.$router.push({ path: '/post-detail', query: { postID } })
    }
  }
}
</script>

<style scoped>
.container {
}
.main-container {
  height: calc(100vh - 90px);
  padding-left: 10px;
}
.post-container {
  overflow-y: auto;
  overflow-x: hidden;
}
.post:hover {
  box-shadow: 1px 1px 10px 0px rgba(0, 0, 0, 0.75);
  border-radius: 5px;
  cursor: pointer;
}
.post-summary {
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 20px;
  -webkit-line-clamp: 3;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  padding: 0 16px;
}
</style>
