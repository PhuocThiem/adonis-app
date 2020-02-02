<template>
    <div
      v-if="
        _.get($route, 'meta.public', false) &&
          _.get($route, 'meta.onlyWhenLogOut', false)
      "
    >
      <router-view />
    </div>
    <div v-else>
    <nav class="navbar" clipped-left style="padding: 5px; width: 100%">
      <div class="narvar-item" style="width: 100%; padding: 1px">
        <label><router-link to="/">Home</router-link></label>
        <button
          class="btn warning"
          @click="logOut"
          style="margin: 5px; padding: 0px 10px"
        >
          LogOut
        </button>
      </div>
    </nav>
    <div class="sidenav">
        <div class="avatar">
        <img
          style="height: 200px; width: 200px; border-radius: 50%"
          :src="_.get(profile, 'avatarUrl')"
          alt="Nhi Vo"
        />
        </div>
      <div class="detail">
        <h4><v-icon class="text-warning">mdi-account-check</v-icon> {{ _.get(user, 'username') }}</h4>
        <h4><v-icon class="text-success">mdi-email</v-icon> {{ _.get(user, 'email') }}</h4>
        <h4><v-icon class="text-secondary">mdi-phone-classic</v-icon> {{ _.get(profile, 'phone')}}</h4>
        <h4><v-icon class="text-primary">mdi-map-marker</v-icon> {{ _.get(profile, 'address')}}</h4>
        <br />
        <br />
        <hr />
        <ul>
          <h3>
            <li v-for="(item, index) in menu" :key="index"><router-link :to="item.to">{{ item.name }}</router-link></li>
          </h3>
        </ul>
      </div>
    </div>
    <!-- Page content -->
      <div class="content">
        <div>
        <router-view></router-view>
        </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { get } from 'lodash'

export default {
  data () {
    return {
      menu: [
        {
          name: 'Profile',
          to: 'profile'
        },
        {
          name: 'My Post',
          to: 'mypost'
        },
        {
          name: 'Favorite Post',
          to: 'favoritepost'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      requesting: state => get('users.state.user.requesting')
    }),
    ...mapGetters({
      user: 'user',
      profile: 'profile'
    })
  },
  methods: {
    async logOut () {
      await this.$store.dispatch('logOut')
      this.$router.push('login')
    }
  },
  async created () {
    const userID = await get(this.user, 'id')
    this.$store.dispatch('getProfile', { userID })
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.warning {
  border-color: #ff9800;
  color: orange;
}
.navbar{
  background: linear-gradient(to left, #06beb6  , #145058);
  position: fixed !important;
  box-shadow: 10px 15px 10px 0px rgba(0,0,0,0.75);
  z-index: 1000;
  height: 72px;
}
.narvar-item {
  display: flex;
  justify-content: space-between;
  font-family: Helvetica, Arial, Tahoma, sans-serif;
}
.warning:hover {
  background-image: linear-gradient(to bottom, #a17d3a1a, #9b5221);
}
.sidenav {
  height: 100vh; /* Full-height: remove this if you want "auto" height */
  width: 300px; /* Set the width of the sidebar */
  position: fixed !important;
  z-index: 1; /* Stay on top */
  top: 0; /*Stay at the top */
  left: 0;
  background-image: linear-gradient(to top, #08adcabd, rgba(4, 65, 80, 0.801)); /* Black */
  overflow-y: hidden;
  padding-top: 20px;
  margin-top: 72px;
  box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
}
.avatar {
  margin: 10px auto;
  height: 200px;
  width: 200px;
}
.content {
  margin-left: 300px;
  padding-top: 80px;
  width: calc(100%-400px);
  z-index: 1;
}
.detail {
  width: 370px;
  margin-left: 10px;
  color: white
}
ul {
  margin-top: 20px;
}
li {
  list-style-type: none;
  margin-bottom: 10px;
}
h3 {
  color: white;
  line-height: 20px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
h4 {
  line-height: 20px;
  -webkit-line-clamp: 3;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
hr {
  margin: 10px auto;
  border-top: 1px dashed black;
  height: 1px;
  width: 80%;
}
label {
  font-size: 40px;
  background: -webkit-linear-gradient(rgb(130, 5, 179), rgb(0, 38, 248));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
/* On smaller screens, where height is less than 450px, change the style of the sidebar (less padding and a smaller font size) */
/* @media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }
  .sidenav a {
    font-size: 18px;
  }
} */
</style>
