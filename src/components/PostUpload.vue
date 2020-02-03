<template>
  <div class="container-fluid d-flex flex-column main-container">
    <div class="content">
      <div class="profile">
        <h1>Post Upload</h1>
        <div class="avatar">
          <file-upload></file-upload>
        </div>
        <hr />
        <form>
          <div class="form-group">
            <label>Title</label>
            <input
              class="form-control"
              v-model="title"
              placeholder="Post's title"
            />
          </div>
          <div class="form-group">
            <label>Categories</label>
            <select class="form-control" v-model="selected">
              <option value="" selected disabled hidden>Choose categories</option>
              <option
                v-for="(item, index) in Categories"
                :key="index"
                :selected="item"
                >{{ item }}</option
              >
            </select>
          </div>
          <div class="form-group">
            <label>Description</label>
            <textarea
              class="form-control"
              placeholder="Post's description"
              v-model="description"
            >
            </textarea>
          </div>
          <div class="form-group">
            <label>Linking</label>
            <input
              class="form-control"
              placeholder="Post's link"
              v-model="address"
            />
          </div>
          <div class="form-group">
            <label>Hashtags</label>
            <input class="form-control" placeholder="Post's hashtags" v-model="city" />
          </div>
          <button
            class="button"
            @click.prevent="
              update(
                identifyCardNumber,
                phone,
                selected,
                address,
                city,
                country
              )
            "
          >
            <b>Save</b>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { get } from 'lodash'
import FileUpload from '../components/FileUpload'

export default {
  components: {
    'file-upload': FileUpload
  },
  data () {
    return {
      identifyCardNumber: '',
      phone: '',
      Categories: ['Funny', 'Happy', 'Lovely', 'Sadly', 'Angry'],
      address: '',
      city: '',
      country: '',
      selected: ''
    }
  },
  computed: {
    ...mapState({
      requesting: state => get('users.state.user.requesting')
    }),
    ...mapGetters({
      profile: 'profile'
    })
  },
  methods: {
    async update (identifyCardNumber, phone, selected, address, city, country) {
      await this.$store.dispatch('setProfile', {
        identifyCardNumber,
        phone,
        selected,
        address,
        city,
        country
      })
      location.reload()
    }
  }
}
</script>

<style scoped>
.main-container {
  height: calc(100vh - 90px);
}
.content {
  width: 100%;
  margin: 0 auto;
  overflow-y: auto;
}
.profile {
  margin: 0px auto;
  width: 800px;
  border-radius: 10px;
  color: rgb(0, 0, 0);
  /* -webkit-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75); */
}
form {
  padding: 10px;
}
h1 {
  text-align: center;
}
.button {
  padding: 10px;
  background-color: rgba(49, 146, 161, 0.295);
  width: 780px;
  border-radius: 5px;
  text-align: center;
  margin: 5px auto;
}
.button:hover {
  background-image: linear-gradient(to bottom, #3aa17f1a, #1f7da8);
}
hr {
  margin: 10px auto;
  border-top: 1px dashed black;
  color: #fff;
  background-color: #fff;
  height: 1px;
  width: 100%;
}
.modal-content {
  height: 500px;
  width: 100%;
}
.avatar {
  display: flex;
  justify-content: center;
}
.avatar button:hover {
  box-shadow: 1px 1px 10px 0px rgba(3, 243, 143, 0.75);
}
</style>
