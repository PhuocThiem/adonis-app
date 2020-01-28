<template>
  <div class="container">
    <button
      type="button"
      class="btn btn-primary"
      data-toggle="modal"
      data-target="#myModal"
    >
      Open modal
    </button>

    <!-- The Modal -->
    <div class="modal fade" id="myModal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <file-upload></file-upload>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import FileUpload from '../components/FileUpload'

export default {
  components: {
    'file-upload': FileUpload
  }
}
</script>
<style scoped>
.modal-content {
  height: 300px;
  width: 100%;
}
.container {
}
</style>
