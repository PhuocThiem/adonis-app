<template>
  <div class="container-fluid d-flex flex-column main-container">
    <div class="d-flex search-bar">
      <div class="form-group search-text">
        <input type="text" class="form-control search" placeholder="Search post...">
      </div>
      <select class="form-control" style="height: 38px" v-model="selected">
        <option value="" selected disabled hidden>Choose here..</option>
        <option v-for="(item, index) in hashtags" :key="index">{{
          item
        }}</option>
      </select>
    </div>
    <div class="flex-fill content-container">
      <div class="row">
        <div
          class="col-lg-3 col-xs-12 col-sm-8 col-md-6 post"
          v-for="(item, index) in Posts"
          :key="index"
        >
          <v-card max-width="344" class="mx-auto" @click="getPostDetail(item)">
            <v-list-item style="padding: 0px 5px">
              <v-list-item-avatar style="margin-right: 10px" class="post-image">
                <v-img :src="_.get(item, 'user.profile.avatarUrl')" @click="getPostDetail(item)"></v-img
              ></v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="headline">{{
                  _.get(item, "user.username")
                }}</v-list-item-title>
                <v-list-item-subtitle>{{
                  _.get(item, "createdAt")
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-img :src="_.get(item, 'media[0].source')" height="194"></v-img>
            <v-list-item>
              <v-list-item-title class="headline">{{
                _.get(item, "title")
              }}</v-list-item-title>
            </v-list-item>
            <v-card-text class="post-summary">
              {{ _.get(item, "description") }}
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
                {{ _.get(item, '__meta__.totalLikeds') }}
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-share-variant</v-icon>
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
import { mapGetters, mapState } from 'vuex'

export default {
  data () {
    return {
      hashtags: ['green', 'travel', 'sun', 'tree', 'mountain', 'tea', 'ice', 'water', 'dog', 'animal', 'leaf', 'house', 'lamp', 'light', 'night', 'winder', 'snow', 'road', 'lake', 'Bali'],
      selected: ''
    }
  },
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
  async created () {
    this.$store.dispatch('getAllPost')
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
.container-fluid {
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
.search-bar {
  height: 40px;
  width: 100%;
  background-color: rgba(255, 254, 254, 0.562);
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.content-container {
  overflow-y: scroll;
  overflow-x: hidden;
  flex-grow: 1;
  margin-top: 10px;
}

.main-container {
  height: calc(100vh - 90px);
  padding-left: 10px;
}

.form-control {
  width: 200px;
  height: 50px;
}
.search {
  width: 300px;
  height: 38px;
}
.search-text {
  margin-top: 16px;
  margin-right: 20px

}
.post:hover {
  box-shadow: 1px 1px 10px 0px rgba(0,0,0,0.75);
  border-radius: 5px;
  cursor: pointer;
}

/* ::-webkit-scrollbar {
display: none;
} */
</style>
