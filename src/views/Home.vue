<template>
  <div class="container-fluid">
    <div class="search-bar">
      <div class="form-control" placeholder="Categories">
      </div>
      <div class="form-control">
      </div>
    </div>
    <div class="row">
      <div
        class="col-lg-3 col-xs-12 col-sm-8 col-md-6"
        v-for="(item, index) in Posts"
        :key="index"
      >
        <v-card max-width="344" class="mx-auto">
          <v-list-item style="padding: 0px 5px">
            <v-list-item-avatar style="margin-right: 10px;">
              <v-img :src="_.get(item, 'user.profile.avatarUrl')"></v-img
            ></v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="headline">{{
                _.get(item, "user.username")
              }}</v-list-item-title>
              <v-list-item-subtitle>{{ _.get(item, 'createdAt') }}</v-list-item-subtitle>
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
.container-fluid {
  padding: 10px;
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
  height: 70px;
  width: 100%;
  background-color: lightgray;
  position: fixed !important;
  z-index: 1;
  padding: 10px 0;
  display: flex;
  justify-content: flex-start;
}
.post-content {
  /* margin-top: 70px; */
  z-index: 0;
  padding-top: 5px;
  max-height: 200px;
  position: absolute;
}
.form-control {
  width: 200px;
  height: 50px;
}
</style>
