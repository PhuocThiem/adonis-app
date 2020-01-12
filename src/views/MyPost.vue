<template>
  <div
    class="container fluid"
    style="width: 800px; background-color: light-gray"
  >
    <div class="file">
      <form @submit.prevent="onSubmit" enctype="form-data">
        <div class="fields">
          <label>Upload File</label><br />
          <input type="file" ref="file" @change="onSelect" />
        </div>
        <div class="fields">
          <button>Submit</button>
        </div>
        <div class="fields">
          <h5>{{ message }}</h5>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FileUpload',
  data () {
    return {
      // files: [],
      file: '',
      message: ''
    }
  },
  methods: {
    onSelect () {
      const file = this.$refs.file.files[0]
      this.file = file
      console.log('file', this.file)
    },
    async onSubmit () {
      console.log('file in VueCom', this.file)
      await this.$store.dispatch('uploadAvatar', { file: this.file })
      location.reload()
    }
  }
}
</script>

<style scoped></style>
