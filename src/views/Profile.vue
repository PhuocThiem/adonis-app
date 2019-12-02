<template>
  <div class="container-fluid">
    <div class="profile">
      <h1>Profile</h1>
      <form>
        <div class="form-group">
          <label>ID Card Number</label>
          <input class="form-control" placeholder="ID Card Number" v-model="identifyCardNumber"/>
          <small id="emailHelp" class="form-text text-muted"
            >We'll never share your email with anyone else.</small
          >
        </div>
        <div class="form-group">
          <label>Phone Number</label>
          <input class="form-control" placeholder="Phone Number" v-model="phone"/>
        </div>
        <div class="form-group">
          <label>Gender</label>
          <select class="form-control" v-model="selected">
            <option v-for="(item, index) in genders" :key="index" :selected="item">{{ item }}</option>
          </select>
        </div>
        <div class="form-group">
          <label>Address</label>
          <input class="form-control" placeholder="Address" v-model="address"/>
        </div>
        <div class="form-group">
          <label>City</label>
          <input class="form-control" placeholder="City" v-model="city"/>
        </div>
        <div class="form-group">
          <label>Country</label>
          <input class="form-control" placeholder="Country" v-model="country"/>
        </div>
        <button class="button" @click.prevent="update(identifyCardNumber,phone,selected,address,city,country)"><b>Update</b></button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      identifyCardNumber: '',
      phone: '',
      genders: ['MALE', 'FEMALE', 'Undefine'],
      address: '',
      city: '',
      country: '',
      selected: ''
    }
  },
  methods: {
    update (identifyCardNumber, phone, selected, address, city, country) {
      this.$store.dispatch('setProfile', { identifyCardNumber, phone, selected, address, city, country })
    }
  }
}
</script>

<style scoped>
.profile {
  margin: 10px auto;
  width: 800px;
  background-color: rgba(241, 241, 241, 0.308);
  border-radius: 10px;
  color: whitesmoke;
  -webkit-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
  -moz-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
  box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
}
form {
  padding: 10px;
}
h1 {
  text-align: center;
  text-shadow: 1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue;
}
.button {
  padding: 10px;
  background-color: rgba(49, 146, 161, 0.295);
  width: 780px;
  border-radius: 5px;
  text-align: center;
  margin: 5px auto;
}
.button:hover{
  background-image: linear-gradient(to bottom, #3aa17f1a, #1f7da8);
}
.form-control:hover {
  background-image: linear-gradient(to bottom, #04baf1d2, #0157f83f);
}
</style>
