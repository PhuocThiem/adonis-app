<template>
  <div class="container-fluid">
    <div class="dropfile" v-cloak @drop.prevent="addFile" @dragover.prevent>
      <h2>Files to Upload (Drag them over)</h2>
      <ul>
        <li v-for="( file, index) in files" :key="index">
          {{ file.name }} ({{ file.size | kb }} kb)
          <button @click="removeFile(file)" title="Remove">X</button>
        </li>
      </ul>
      <button :disabled="uploadDisabled" @click="upload">Upload</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      files: []
    }
  }
}
</script>

<style scoped>

</style>
