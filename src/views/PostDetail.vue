<template>
  <div class="container p-2">
    <div class="d-flex card">
      <div class="card-title">
        <h3>{{ _.get(Post, 'title') }}</h3>
      </div>
      <div class="flex-fill card-content">
        <!-- <div class="card-image"> -->
        <img :src="_.get(Post, 'media[0].source')">
        <!-- </div> -->
        <div class="card-description">
          <p>{{ _.get(Post, 'description') }}</p>
        </div>
        <div class="card-action">
          <div class="card-item">
            <div class="action-like">
              <v-btn class="ma-4" text icon color="blue lighten-2" @click="likePost(hasliked) & ! hasliked"><v-icon medium >mdi-thumb-up</v-icon> {{ _.get(Post, '__meta__.totalLikeds') }}</v-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters, mapState } from 'vuex'
import { get } from 'lodash'

export default {
  data () {
    return {
      hasliked: false
    }
  },
  computed: {
    ...mapState({
      requesting1: state => get('posts.state.post.requesting'),
      requesting2: state => get('posts.state.likePost.requesting')
    }),
    ...mapGetters({
      Post: 'Post',
      PostLiked: 'PostLiked'
    })
  },
  props: {
    postID: String
  },
  async mounted () {
    const postID = await this.postID
    this.$store.dispatch('getPostByID', { postID })
    this.hasliked = await get(this.Post, '__meta__.totalLikeds')
    console.log(this.hasliked)
  },
  methods: {
    async likePost (hasliked) {
      const postID = await this.postID
      console.log('like', hasliked)
      if (hasliked === true) {
        hasliked = false
        this.$store.dispatch('likePost', { postID, hasliked })
      } else {
        hasliked = true
        this.$store.dispatch('likePost', { postID, hasliked })
      }
    }
  }
}
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}
.container {
  overflow-y: auto;
}
.card {
  width: 80%;
  height: calc(100vh - 90px);
  margin: 0 auto;
}
.card-title {
  width: 100%;
  height: 5vh;
  background-color: rgb(238, 237, 237);
  display: flex;
  justify-content: center;
}
.card-content {
  width: 100%;
  height: 95vh;
}
img {
   width: 100%;
   background-size: cover;
   height: calc(60vh);
   background-position: center center;
}
.card-description {
  width: 100%;
  height: 15vh;
}
</style>
