<template>
  <div>
   <form @submit.prevent="submitRegistration" >
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
          <input type="text" name="city" value placeholder="City/Town " v-model="city" autocomplete="off" required />
          <span class="errNotific" v-if="validation.city">{{validation.city}}</span>
         </div>
          <div class="col-6 col-12-xsmall">
              <label for="location" >Select your location:</label>
                  <select v-model="location" class="boxBorder">
                    <option>Mavoor</option>
                     <option>Mananchira</option>
                      <option>Beach</option>
                      <option>Thali</option>
                  </select>
         </div>
         
         <div class="col-6 col-12-xsmall">
         <label for="location">Upload your bakery image:</label>
         <div class="col-6 col-12-xsmall">
          <input type="file" ref="uploadImage" @change="onImageUpload()" required>   
             </div>
          </div> 
          <div class="col-6 col-12-xsmall">
          <textarea class="boxBorder" name="description" placeholder="Write a short description about your Bakery" rows="6" v-model="description" required></textarea>
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
  </div>
</template>

<script>
import cakifyAdminService from "@/apiservices/cakifyAdminService.js"
// import fileUploadService from "@/apiservices/fileUploadService.js"
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
    validation:[]
     }
  },
 
  methods:{
    // onImageUpload() {
    //             let file = this.$refs.uploadImage.files[0];
    //             this.formData = new FormData();
    //             this.formData.append("file", file);
    //         },
    submitRegistration(){
   cakifyAdminService
        .bakeryregister({
          bakeryname: this.bakeryname,
          ownername: this.ownername,
          password: this.password,
          location: this.location,
          phone: this.phone,
          email: this.email,
          description: this.description,
          city:this.city
        }).then((response) => {
          this.snackbar = true;
          response.data;
          console.log(response.data)
          this.registeredData = response.data.data;
          // fileUploadService.uploadBakeryImage(this.formData,this.registeredData);

        }).catch(error => {
                    console.log('There was an error : ' + JSON.stringify(error))
                });
                this.registeredData="";
            },

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
