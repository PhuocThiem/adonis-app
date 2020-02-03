<template>
  <div class="container-fluid d-flex flex-column main-container">
    <div class="d-flex action-bar">
      <button v-b-modal.modal-center><router-link class="nav-link" to="postUpload"><v-icon style="margin-bottom: 2px">mdi-plus-circle-outline</v-icon><b>Add new post</b></router-link></button>
    </div>
    <div class="flex-fill post-container" v-if="postedPosts.length > 0">
      <div class="row">
        <div
          class="col-lg-3 col-xs-12 col-sm-8 col-md-6"
          v-for="(item, index) in postedPosts"
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
    <div class="d-flex anounce" v-else>
      <h1>You had not been posted any post yet !</h1>
    </div>
  </div>
</template>

<script>
import { get } from 'lodash'
import { mapState, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapState({
      getUserRequest: state => get('users.state.user.requesting'),
      getPostsRequest: state => get('posts.state.postedPosts.requesting')
    }),
    ...mapGetters({
      user: 'user',
      postedPosts: 'postedPosts'
    })
  },
  async mounted () {
    const userID = await get(this.user, 'id')
    console.log('UserID in Mypost', userID)
    await this.$store.dispatch('getPostedPosts', { userID })
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
.action-bar {
  height: 70px;
  width: calc(100vw - 310px);
  margin-bottom: 5px;
  align-items: center;
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
button {
  border: 1px solid beige;
  border-radius: 5px;
}
button:hover {
  background-color:rgb(223, 223, 223);
  border-radius: 5px;
  cursor: pointer;
}
.anounce {
  height: 500px;
  justify-content: center;
  align-items: center;
  color: darkturquoise;
}
</style>
