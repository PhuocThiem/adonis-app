<template>
  <div class="container">
    <picture-input
      ref="pictureInput"
      @change="onChanged"
      :width="500"
      :removable="true"
      :height="250"
      accept="image/jpeg, image/png, image/gif"
      buttonClass="ui button primary"
      :customStrings="{
        upload: '<h1>Upload it!</h1>',
        drag: 'Drag and drop your image here'
      }"
    >
    </picture-input>
    <div class="button" v-if="!!image">
    <button type="button" class="btn btn-outline-success" @click.once="UploadImage" :disabled="!image">
      Update
    </button>
    </div>
  </div>
</template>

<script>
import PictureInput from 'vue-picture-input'

export default {
  data () {
    return {
      file: null,
      image: null
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
        return this.image
      } else {
        console.log('Old browser. No support for Filereader API')
      }
    },
    async UploadImage () {
      if (this.image) {
        await this.$store.dispatch('uploadAvatar', { file: this.image })
        location.reload()
      }
    }
  }
}
</script>

<style scoped>
.button {
  margin: 5px auto;
  max-width: 100%;
  display: flex;
  justify-content: center
}
.btn {
  margin: 5px;
}
</style>
