<template>
  <div class="container-fluid d-flex flex-column main-container">
    <div class="content">
      <div class="profile">
        <h1>---------------------Profile---------------------</h1>
        <div class="avatar">
          <button
            type="button"
            style="border-radius: 50%"
            data-toggle="modal"
            data-target="#myModal"
          >
            <v-img
              style="height: 200px; width: 200px; border-radius: 50%"
              :src="_.get(profile, 'avatarUrl')"
            >
            </v-img>
          </button>
        </div>
        <hr />
        <form>
          <div class="form-group">
            <label>ID Card Number</label>
            <input
              class="form-control"
              v-model="identifyCardNumber"
              placeholder="Identify Card Number"
            />
            <small id="emailHelp" class="form-text text-muted"
              >We'll never share your email with anyone else.</small
            >
          </div>
          <div class="form-group">
            <label>Phone Number</label>
            <input
              class="form-control"
              placeholder="Phone Number"
              v-model="phone"
            />
          </div>
          <div class="form-group">
            <label>Gender</label>
            <select class="form-control" v-model="selected">
              <option
                v-for="(item, index) in gender"
                :key="index"
                :selected="item"
                >{{ item }}</option
              >
            </select>
          </div>
          <div class="form-group">
            <label>Address</label>
            <input
              class="form-control"
              placeholder="Address"
              v-model="address"
            />
          </div>
          <div class="form-group">
            <label>City</label>
            <input class="form-control" placeholder="City" v-model="city" />
          </div>
          <div class="form-group">
            <label>Country</label>
            <input
              class="form-control"
              placeholder="Country"
              v-model="country"
            />
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
            <b>Update</b>
          </button>
        </form>
      </div>
    </div>
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
      gender: ['MALE', 'FEMALE', 'Undefine'],
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
  mounted () {
    if (!this.profile.userID) {
      this.identifyCardNumber = get(this.profile, 'identifyCardNumber')
      this.phone = get(this.profile, 'phone')
      this.selected = get(this.profile, 'gender')
      this.address = get(this.profile, 'address')
      this.city = get(this.profile, 'city')
      this.country = get(this.profile, 'country')
    }
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
    // initProfile () {
    //   if (!this.profile.userID) {
    //     this.identifyCardNumber = get(this.profile, 'identifyCardNumber')
    //     this.phone = get(this.profile, 'phone')
    //     this.selected = get(this.profile, 'gender')
    //     this.address = get(this.profile, 'address')
    //     this.city = get(this.profile, 'city')
    //     this.country = get(this.profile, 'country')
    //   }
    // }
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
