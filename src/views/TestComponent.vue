<template>
  <div class="container">
    <button
      type="button"
      class="btn btn-primary"
      data-toggle="modal"
      data-target="#myModal"
    >
      <v-img :src="_.get(profile, 'avatarUrl')">

      </v-img>
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
import { mapGetters, mapState } from 'vuex'
import { get } from 'lodash'

export default {
  components: {
    'file-upload': FileUpload
  },
  computed: {
    ...mapState({
      request: state => get('profiles.state.profile.requesting')
    }),
    ...mapGetters({
      profile: 'profile'
    })
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
