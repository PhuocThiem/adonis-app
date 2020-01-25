<template>
  <div class="container p-2">
    <div class="d-flex card">
      <div class="card-title">
        <h3>{{ _.get(Post, "title") }}</h3>
      </div>
      <div class="flex-fill card-content">
        <!-- <div class="card-image"> -->
        <img :src="_.get(Post, 'media[0].source')" />
        <!-- </div> -->
        <div class="card-description">
          <p>{{ _.get(Post, "description") }}</p>
        </div>
        <div class="card-action">
          <div class="card-item">
            <div class="action-like" v-if="!_.get(Post, '__meta__.isUserLiked')">
              <v-btn
                class="ma-4"
                text
                icon
                @click="likePost"
                ><v-icon medium :class="{
                'text-danger': !!_.get(Post, '__meta__.isUserLiked'),
                }">mdi-thumb-up</v-icon>
                {{ this.totalLike }}</v-btn
              >
            </div>
            <div class="action-like" v-else>
              <v-btn
                class="ma-4"
                text
                icon
                @click="likePost"
                ><v-icon medium :class="{
                'text-secondary': !_.get(Post, '__meta__.isUserLiked'),
                }">mdi-thumb-up</v-icon>
                {{ this.totalLike }}</v-btn
              >
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
      hasliked: false,
      totalLike: 0
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
  async created () {
    const postID = await this.postID
    this.$store.dispatch('getPostByID', { postID })
    this.totalLike = get(this.Post, '__meta__.totalLikeds')
  },
  methods: {
    async likePost () {
      const postID = await this.postID
      const liked = await get(this.Post, '__Meta__.isUserLiked')
      console.log('init liked', this.liked)
      this.totalLike = await get(this.Post, '__meta__.totalLikeds')
      if (liked === 1) {
        this.hasliked = true
        console.log('disLike in function...', this.hasliked)
        const likePost = await this.hasliked
        this.totalLike--
        this.$store.dispatch('likePost', { postID, likePost })
      } else {
        this.hasliked = false
        console.log('Liked in function...', this.hasliked)
        const likePost = await this.hasliked
        this.totalLike++
        this.$store.dispatch('likePost', { postID, likePost })
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
