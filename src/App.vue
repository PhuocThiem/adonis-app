<template>
  <div class="container-fluid">
    <div
      v-if="
        _.get($route, 'meta.public', false) &&
          _.get($route, 'meta.onlyWhenLogOut', false)
      "
    >
      <router-view />
    </div>
    <div v-else>
    <nav class="navbar navbar-dark bg-dark" style="padding: 10px; width: 100%">
      <div class="narvar-item" style="width: 100%; padding: 10px">
        <label style="font-size: 40px; color: white">Personal Blog</label>
        <button
          class="btn warning"
          @click="logOut"
          style="float: right; margin-top: 12px; padding: 5px"
        >
          LogOut
        </button>
      </div>
    </nav>
    <div class="sidenav">
      <div class="detail">
        <img
          style="height: 150px; width: 150px; border-radius: 50%"
          src="https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.0-9/52809915_376605666506476_5074019963438628864_n.jpg?_nc_cat=108&_nc_ohc=xDGPdZ9Rem0AQloy57MLHyaq0M3dkzOHZgatc4bideB7de3-7YXhfB0wA&_nc_ht=scontent.fsgn2-3.fna&oh=d3f832889bced9aa2fe7b8aa459fbf88&oe=5E81EFE0"
          alt="Nhi Vo"
        />
        <h4><v-icon>mdi-account-check</v-icon>{{}}</h4>
        <h4><v-icon>mdi-email</v-icon>{{ _.get(this.user, 'email')}}</h4>
        <h4><v-icon>mdi-phone-classic</v-icon>{{}}</h4>
        <h4><v-icon>mdi-map-marker</v-icon>{{}}</h4>
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
    <div class="main">
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import Storage from './services/storage'
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
    ...mapGetters({
      requesting: state => get('user.state.user.requesting')
    }),
    ...mapState({
      user: 'user'
    })
  },
  methods: {
    async logOut () {
      const token = await Storage.getItem()
      await this.$store.dispatch('logOut', token)
      this.$router.push('login')
    }
  },
  async mounted () {
    console.log('user', this.user)
    // const id = await get('user. id')
    // console.log('id', this.id)
    this.$store.dispatch('getProfile')
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
.warning:hover {
  background-image: linear-gradient(to bottom, #a17d3a1a, #9b5221);
}
.sidenav {
  height: 100%; /* Full-height: remove this if you want "auto" height */
  width: 300px; /* Set the width of the sidebar */
  position: fixed !important; /*Fixed Sidebar (stay in place on scroll)*/
  z-index: 1; /* Stay on top */
  top: 0; /*Stay at the top */
  left: 0;
  background-image: linear-gradient(to bottom, #3aa17f1a, #21759b); /* Black */
  overflow-y: scroll; /* Disable horizontal scroll */
  padding-top: 20px;
  margin-top: 100px;
  -webkit-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
  -moz-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
  box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
}
.main {
  height: 100%;
  width: 100%;
  position: fixed !important;
}
.content {
  margin-left: 300px;
  padding: 15px;
}
.detail {
  width: 200px;
  margin-left: 50px;
  color: white
}
img {
  margin-left: 25px;
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
  text-shadow: 1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue;
}
/* On smaller screens, where height is less than 450px, change the style of the sidebar (less padding and a smaller font size) */
@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }
  .sidenav a {
    font-size: 18px;
  }
}
</style>
