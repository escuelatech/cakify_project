<template>
  <div>
 <div class ="row" v-show="bakeryRegSuccessMsg">
   <div class= "col">
     <div class= "alert show alertmsg alert-primary" role="alert" backgroundColor: blue>
     <Timercount ref="child"/>
   </div>
   </div>
  </div>

   <form @submit.prevent="submitRegistration();accesTimercount()" v-show="!bakeryRegSuccessMsg">
          <h3>Sign Up Your Bakery with Us</h3>
        <div class="row gtr-uniform">
         <div class="col-6 col-12-xsmall">
         <input type="text" name="bakeryName" value placeholder="Bakery Name" v-model="bakeryname" autocomplete="off" required />
         <span class="errNotific" v-if="validation.bakeryname">{{validation.bakeryname}}</span>
         </div>
          <div class="col-6 col-12-xsmall">
         <input type="text" name="ownerName" value placeholder="Owner's Name" v-model="ownername" autocomplete="off" required />
         <span class="errNotific" v-if="validation.ownername">{{validation.ownername}}</span>
         </div>
         <div class="col-6 col-12-xsmall">
         <input type="password" name="password" value placeholder="Password" v-model="password" autocomplete="off" required />
         <span class="errNotific" v-if="validation.password">{{validation.password}}</span>
         </div>
         <div class="col-6 col-12-xsmall">
          <input type="text" name="phoneNumber" value placeholder="Phone " v-model="phone" autocomplete="off" required />
          <span class="errNotific" v-if="validation.phone">{{validation.phone}}</span>
         </div>
         <div class="col-6 col-12-xsmall">
          <input type="email" name="email" value placeholder="Email " v-model="email" autocomplete="off" required />
          <span class="errNotific" v-if="validation.email">{{validation.email}}</span>
         </div>
     
        <div class="col-6 col-12-xsmall">
              <label for="cities">Select your location:</label>
              <select  v-model="city" @change="onChange(city)">             
                <option v-for="locationInTown in locations" :key="locationInTown.locationId" :value="locationInTown" >
                {{ locationInTown.locationName }} 
                </option>
              </select> 
        </div>
        <div class="col-6 col-12-xsmall">
              <label for="places">Select your City</label>
              <select v-model="location"  @change="getTownName(location)"   >                   
                <option v-for="town in towns" :key="town.townId" :value="town">
                                        {{ town.townName }}                
                  </option>                   
                </select>                 
          </div>      
      
       <div class="col-6 col-12-xsmall">
         <label for="location">Upload your bakery logo:</label>
         <div class="col-6 col-12-xsmall">
          <input type="file" ref="uploadImage" @change="onImageUpload()" required>   
             </div>
          </div> 
          <div class="col-6 col-12-xsmall">
          <textarea class="boxBorder" name="bakeryAddress" placeholder="Bakery Address" rows="3" v-model="address" required></textarea>
          <span class="errNotific" v-if="validation.address">{{validation.address}}</span>
          </div>
          <div class="col-6 col-12-xsmall">
          <textarea class="boxBorder" name="description" placeholder="Write a short description about your Bakery" rows="3" v-model="description" required></textarea>
          <span class="errNotific" v-if="validation.description">{{validation.description}}</span>
          </div>                      
            <div class="col-12">
             <ul class="actions">
            <li>
              <input type="submit" value="Register" class="primary" />
            </li>
            <li>
              <input type="reset" value="Reset" />
            </li>
          </ul>
        </div>
       
        </div>
       
    </form>
     <div v-show="bakeryRegSuccessMsg">
      <Message />
    </div>
     <div class="box" v-show="isError">
      <h3>{{errorMessage}}</h3>
    </div>
  </div>
</template>

<script>
import cakifyAdminService from "@/apiservices/cakifyAdminService.js"
import Message from '@/components/View/common/Message.vue';
import fileUploadService from "@/apiservices/fileUploadService.js"
import Timercount from "@/components/View/common/Timercount.vue";
  export default {
  data(){
    return {
    bakeryname:"",
    ownername:"",
    password:"",
    phone:"",
    email:"",
    city:"",
    location:"",
    description:"",
    address:"",
    validation:[],
    bakeryRegSuccessMsg:false,
    isError:false,
    errorMessage:"",
    locations:"",
    towns:"",
    townName:"",
    locationInTown:"",
    selectedLocation:"",
    locationName:""
        }
  },
 components:{Message,Timercount},
 mounted(){
// loading first selectbox
   this.getCityFrom();
  
 },
  methods:{
// select box getting locations and towns
 getCityFrom(){
            cakifyAdminService.getCity()
                .then(response => {
                    this.locations = response.data.data;
                   
                })
                .catch(error => {
                    console.log('Error in location api: ', error.response)
                })
        },
        displayTowns(){
            cakifyAdminService.getLocation(this.selectedLocation)
               .then(response => {
                    this.towns = response.data.data;
                   })
                .catch(error => {
                    console.log('Error in towns api: ', error.response)
                })  
        },
        onChange(value){
            this.selectedLocation = value.locationId; 
            this.locationName =value.locationName; 
            this.displayTowns();
        },
        getTownName(value){
            this.townName = value.townName;
        },
// calling timer component
      accesTimercount(){
        this.$refs.child.countDownTimer()
       },

    onImageUpload() {
                let file = this.$refs.uploadImage.files[0];
                this.formData = new FormData();
                this.formData.append("file", file);
            },
    // API call for Submitting bakery registration
    submitRegistration(){
   cakifyAdminService
        .bakeryregister({
          bakeryname: this.bakeryname,
          ownername: this.ownername,
          password: this.password,
          location: this.townName,
          phone: this.phone,
          email: this.email,
          description: this.description,
          city:this.locationName
        }).then((response) => {
          this.snackbar = true;
          response.data;
          console.log(response.data)
          this.registeredData = response.data.data;
          //  file uplodfuction 
           fileUploadService.uploadBakeryImage(this.formData,this.email);
          //  
          this.bakeryRegSuccessMsg = true;
          
          this.$store.dispatch('addBakeryRegMessage');
          this.isError = false;
          this.timer =  setTimeout(() => this.$router.push({ name: "CakifyLoginPage"}),10000);

        }).catch(error => {
              this.isError=true;
              this.bakeryRegSuccessMsg = false;
              console.log('There was an error : ' + JSON.stringify(error))
              return(this.errorMessage= JSON.stringify(
              error.response.data.errorMessage))
                });
               
            },
      // form validation call
        check_email(value) {
      
        // eslint-disable-next-line no-useless-escape
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
          this.validation["email"] = "";
        } else {
          this.validation["email"] = "Enter a valid email";
        }
      
    },
    check_bakeryname(value) {
      if (value == "") {
        this.validation["bakeryname"] = "Enter your bakery name";
      } else {
        this.validation["bakeryname"] = "";
      }
    },
     check_ownername(value) {
      if (value == "") {
        this.validation["ownername"] = "Enter bakery owner's name";
      } else {
        this.validation["ownername"] = "";
      }
    },
    check_password(value) {
      if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/.test(value)) {
        this.validation["password"] = "";
      } else {
        this.validation["password"] =
          "Password must be valid (need 6 to 12 characters, one digit, one uppercase).";
      }
    },
     check_city(value) {
      if (value == "") {
        this.validation["city"] = "Enter the city or Town where bakery resides";
      } else {
        this.validation["city"] = "";
      }
    },
     check_phone(value) {
      if (value.length >= "10" && value.length <= "15") {
        this.validation["phone"] = " ";
      } else {
        this.validation["phone"] = "Enter your valid Mobile Number";
      }
    },
     check_description(value) {
       if (value == "") {
        this.validation["description"] = "please fill the description ";
      } else {
        this.validation["description"] = "";
      }
    }
   
     
  },
  
  watch:{
    // form validation
      email(value) {
      this.email = value;
      this.check_email(value);
    },
    bakeryname(value) {
      this.bakeryname = value;
      this.check_bakeryname(value);
    },
    ownername(value) {
      this.ownername = value;
      this.check_ownername(value);
    },
    password(value) {
      this.password = value;
      this.check_password(value);
    },
     city(value) {
      this.city = value;
      this.check_city(value);
    },
      phone(value) {
      this.phone = value;
      this.check_phone(value);
    },
    description(value) {
      this.description = value;
      this.check_description(value);
    },
  },
  
    
  }
</script>

<style lang="scss" scoped>

</style>
