<template>
  <v-app>
    <div class="header">
      <h1 style="float: left;">Personal Blog</h1>
      <button type="button" class="btn btn-secondary" @click="logOut">LogOut</button>
    </div>
    <div class="row">
      <div class="menu">
        <div class="information">
            <img class="image" style="height: 200px; width: 200px ; border-radius: 50%" src="https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.0-9/52809915_376605666506476_5074019963438628864_n.jpg?_nc_cat=108&_nc_ohc=xDGPdZ9Rem0AQloy57MLHyaq0M3dkzOHZgatc4bideB7de3-7YXhfB0wA&_nc_ht=scontent.fsgn2-3.fna&oh=d3f832889bced9aa2fe7b8aa459fbf88&oe=5E81EFE0" alt="Avatar">
          <h4>Username:{{}}</h4>
          <h4>Email:{{}}</h4>
          <h4>Phone:{{}}</h4>
          <h4>Gender:{{}}</h4>
          <h4>Address:{{}}</h4>
          <h4>City:{{}}</h4>
          <h4>Country:{{}}</h4>
        </div>
      </div>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </v-app>
</template>
<script>
import Storage from '../services/storage'
export default {
  methods: {
    async logOut () {
      await Storage.removeItem(Storage.setItem())
      return this.$router.push({ path: '/login' })
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
h1 {
  position: absolute;
  top: 50%;
  left: 7%;
  transform: translate(-50%, -50%);
}
.header {
  height: 10%;
  width: 100%;
  position: relative;
  background-image: linear-gradient(to right, #00537E, #3AA17E);
}
.row {
  height: 90%;
  width: 100%;
  padding: 0;
  margin: 0;
}
.menu {
  width: 20%;
  height: 100%;
  background-image: linear-gradient(#3AA17E, #00537E);
}
.content {
  width: 80%;
  height: 100%;
  float: left;
}
.information {
  margin: 30px auto 0 auto;
  text-align: left;
  max-width: 300px;
}
h4 {
  margin-top: 10px;
  margin-left: 10px;
}
.btn-secondary {
  padding: 10px;
  position: absolute;
  top: 50%;
  right: -1%;
  transform: translate(-50%, -50%);
  background-color: rgba(21, 78, 184, 0.74);
    background-color: #3AA17E;
    background-image: linear-gradient(to bottom, #3AA17E, #21759B);
    box-shadow: 0 1px 0 rgba(120, 200, 230, 0.5) inset;
    border-color: #21759B #21759B #1E6A8D;
    border-width: 1px;
    border-radius: 3px 3px 3px 3px
}
.btn:hover, .btn:focus {
    background-color: rgb(2, 32, 202);
    background-image: linear-gradient(to bottom,3AA17E,#00537E);
    border-color: #1B607F;
    box-shadow: 0 1px 0 rgba(120,200,230,0.6) inset;
    text-shadow: 0 -1px 0 rgba(0,0,0,0.3)
}
.image {
  margin: 10px 50px 10px 50px
}
</style>
