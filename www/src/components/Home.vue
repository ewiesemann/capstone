<template>
  <div class = "fullscreen">
    <div class="home container-fluid">
      <div class="main-top-style">

        <!-- Login Modal -->
        <button type="button" class="btn btn1 mt-1 btnwidth2 mr-4" data-toggle="modal" data-target="#loginModal">Login</button>
        <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Login</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form v-on:submit.prevent="ownerLogin">
                  <div class="form-group">
                    <input type="text" name="ownerUsername" v-model="
                          login.username" class="form-control" id="formGroupExampleInput" placeholder="Username" required>
                  </div>
                  <div class="form-group">
                    <input type="text" name="password" v-model="
                              login.password" class="form-control" id="formGroupExampleInput" placeholder="Password">
                  </div>
                  <button type="button" @click="ownerLogin" class="btn btn1" data-dismiss="modal">Login</button>
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <!-- Register Modal -->
        <button type="button" class="btn btn1 mt-1 btnwidth2 ml-4" data-toggle="modal" data-target="#registerModal">Register</button>
        <div class="modal fade" id="registerModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Register</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form v-on:submit.prevent="ownerRegister">
                  <div class="form-group">
                    <input type="text" name="username" v-model="register.username" class="form-control" id="formGroupExampleInput" placeholder="Username"
                      required>
                  </div>
                  <div class="form-group">
                    <input type="text" name="businessName" v-model="register.businessName" class="form-control" id="formGroupExampleInput" placeholder="Business Name"
                      required>
                  </div>
                  <div class="form-group">
                    <input type="text" name="email" v-model="register.email" class="form-control" id="formGroupExampleInput" placeholder="email">
                  </div>
                  <div class="form-group">
                    <input type="text" name="password" v-model="register.password" class="form-control" id="formGroupExampleInput" placeholder="Password">
                  </div>
                  <button type="button" @click="ownerRegister" class="btn btn1" data-dismiss="modal">Register</button>
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <h1 class="Title">OnWheels</h1>
<h1>
<i class="fas fa-map-marker-alt fa-spin spinner"></i>
</h1>
        <img src="../assets/Food Truck.jpg" class="mb-2 trucklogo">
      </div>
      <div class="main-bottom-style">
        <form @submit.prevent="getTrucks">
          <div class="form-group row">
            <div class="col-sm-10 offset-sm-1 text-center">
              <!-- <select class="form-control" name="proximity" v-model="search.distance">
                <option value="" disabled selected hidden>Search by Radius</option>
                <option>0-5 miles</option>
                <option>5-10 miles</option>
                <option>10-15 miles</option>
                <option>15-20 miles</option>
              </select> -->
              <!-- <input class="form-control" type="search" placeholder="Zipcode" id="search-input" v-model="search.zipcode"> -->
              <input class="form-control" type="search" placeholder="Truck Name" id="search-input" v-model="search.truckname">
              <select class="form-control" name="Cuisine" v-model="search.cuisineType">
                <option value="" disabled selected hidden>Cuisine Type</option>
                <option>Asian</option>
                <option>Mexican</option>
                <option>American</option>
                <option>Soul Food</option>
                <option>Italian</option>
                <option>Other</option>
              </select>
            <div class = "foodtruck">
              <button type="submit" class="btn btn1 mt-1 mb-1 btnwidth" @click="goToSearch">Find that truck</button>
              </div>

            </div>
          </div>
        </form>
      </div>
    </div>
    
  </div>
</template>



<script>
  import router from '../router'
  import ownerProfile from './OwnerProfile'
  export default {
    name: 'Home',
    components: {

      ownerProfile
    },
    data() {
      return {
        login: {
          username: '',
          password: ''
        },
        register: {
          username: '',
          businessName: '',
          email: '',
          password: '',
        },
        search: {
          distance: '',
          zipcode: '',
          truckname: '',
          cuisineType: ''
        },
        userGeoLocation: {},
        geocode: {
          street: '',
          city: '',
          state: ''
        },
        windowGeoLoc: {
          lat: 0,
          lng: 0
        }
      }
    },
    mounted(){
      if(!this.$store.state.owner._id){
        this.$store.dispatch('authenticate')
      }
      this.$store.dispatch("getAllTrucks")
    },
    computed: {

    },
    methods: {
      ownerLogin() {
        this.$store.dispatch('login', this.login)
      },
      ownerRegister() {
        this.$store.dispatch('register', this.register)
      },
      getTrucks() {
        this.$store.dispatch('getTrucks', this.search)
      },
      
      convertGeoCode() {
        this.$store.dispatch('convertGeoCode', this.geocode)
        this.geocode = { street: '', city: '', state: '' }
      },
      goToSearch(){
        router.push({name:"Search"})
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .fullscreen{
    height: 100vh;
  }

  .main-top-style {
    background-color: rgb(255, 0, 0);
    color: white;
    height: 70vh;
    /* border-bottom: 2px solid black; */
  }

  .main-bottom-style {
    background-color: rgb(255, 0, 0);
    height: 30vh;
    /* padding: auto; */
    
  }

  .Title {
    font-family: 'Palanquin Dark', sans-serif;
    color: #fff9e0;
    text-shadow: 2px 2px black;
    padding-top: 4px
  }

  .trucklogo{
    border-radius: 10%;  
  }

  .foodtruck{
    margin-top: 3rem;
  }
  .btnwidth{
    padding: 5% 20% 5% 20%;
  }
  .btnwidth2{
    padding: 2% 10% 2% 10%
  }
  .spinner{
    color: #fff9e0;
  }
</style>