<template>
  <div class="container">
    <picture-input
      ref="pictureInput"
      @change="onChanged"
      @remove="onRemoved"
      :width="500"
      :removable="true"
      removeButtonClass="ui red button"
      :height="500"
      accept="image/jpeg, image/png, image/gif"
      buttonClass="ui button primary"
      :customStrings="{
        upload: '<h1>Upload it!</h1>',
        drag: 'Drag and drop your image here'
      }"
    >
    </picture-input>
    <button @click="attemptUpload" v-bind:class="{ disabled: !image }">
  Upload
</button>
  </div>
</template>

<script>
import PictureInput from 'vue-picture-input'

export default {
  data () {
    return {
      file: null
    }
  },
  components: {
    PictureInput
  },
  methods: {
    onChanged () {
      console.log('New picture loaded')
      if (this.$refs.pictureInput.file) {
        this.image = this.$refs.pictureInput.file
      } else {
        console.log('Old browser. No support for Filereader API')
      }
    },
    onRemoved () {
      this.image = ''
    },
    async attemptUpload () {
      if (this.image) {
        await this.$store.dispatch('uploadAvatar', { file: this.image })
      }
    }
  }
}
</script>

<style scoped>
</style>
