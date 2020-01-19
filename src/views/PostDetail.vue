<template>
  <div class="container p-2">
    <div class="d-flex card">
      <div class="card-title">
      </div>
      <div class="flex-fill card-content">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted () {
  }
}
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}
.card {
  width: 60%;
  height: calc(100vh - 90px);
  margin: 0 auto;
}
.card-title {
  width: 100%;
  height: 10%;
  background-color: lightgreen;
}
.card-content {
  width: 100%;
  background-color: lightpink;
  height: 90%;
}
</style>
