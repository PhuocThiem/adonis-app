<template>
  <v-app>
    <div class="header">
      <h1 style="float: left;">Personal Blog</h1>
    </div>
    <div class="row">
      <div class="menu"></div>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </v-app>
</template>
<script>
export default {}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.header {
  height: 10%;
  width: 100%;
  background-image:();
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
  background-image: url("https://images.unsplash.com/photo-1534254910684-68bdc1d69cf7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80");
  float: left;
}
.content {
  width: 80%;
  height: 100%;
  float: left;
}
</style>
