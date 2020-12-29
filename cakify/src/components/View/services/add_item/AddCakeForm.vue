<template>
  <div>
    <v-snackbar v-model="snackbar" top color="rgba(15, 116, 235)" text>
      {{ successMessage }}
    </v-snackbar>

    <div class="box boxMargin" v-show="moreCakeAddMsg">
      <h2>Do you want to add more cakes?</h2>
      <div class="col-12">
        <ul class="actions">
          <li>
            <!-- <input type="button" value="Yes" class="button small" @click="$router.go()" /> -->
             <input type="button" value="Yes" class="button small" @click="callYes" />
          </li>
          <li>
            <input
              type="button"
              value="No"
              class="button small"
              @click="$router.push({ name: 'DashboardPage' })"
            />
          </li>
        </ul>
      </div>
    </div>
    <form @submit.prevent="submit" ref="addCakeForm" v-show="!moreCakeAddMsg">
      <h3>Add cakes</h3>
      <div class="row gtr-uniform">
        <div class="col-6 col-12-xsmall">
          <input
            type="text"
            name="cakename"
            placeholder="Name of the cake"
            v-model="cakeName"
            autocomplete="off"
            required
          />
          <span class="errNotific" v-if="validation.cakeName">{{
            validation.cakeName
          }}</span>
        </div>
        <div class="col-6 col-12-xsmall">
          <input
            type="text"
            name="cakename"
            placeholder="Price"
            v-model="price"
            autocomplete="off"
            required
            @blur="focusOut()"
          />
          <span class="errNotific" v-if="validation.price">{{ validation.price }}</span>
        </div>
        <div class="col-6 col-12-xsmall">
          <label for="cakeType">Specify type of the cake:</label>
          <select v-model="cakeType" class="boxBorder">
            <option v-for="item in items" :key="item.id">
              {{ item.type }}
            </option>
          </select>
        </div>
        <div class="col-6 col-12-small">
          <div class="box">
            <label for="cakeType">Eggless Option:</label><br />
            <input
              type="radio"
              id="checkYes"
              name="demo-priority"
              v-model="egglessOption"
              value="Yes" @click="displayinput()"
            />
            <label for="checkYes">Yes</label>
            <input
              type="radio"
              id="checkNo"
              name="demo-priority"
              v-model="egglessOption"
              value="No" @click="hideInputBox"
            />
            <label for="checkNo">No</label>
            <input
              type="text"
              name="extra"
              placeholder="Add extra money for egg option"
              v-model="extraForEgg"
              autocomplete="off" v-show="displayInputBox"
              required
            />
          </div>
        </div>
        <div class="col-6 col-12-xsmall">
          <textarea
            class="boxBorder"
            name="description"
            placeholder="Write a  description about your Cake"
            rows="2"
            v-model="description"
            required
          ></textarea>
          <span class="errNotific" v-if="validation.description">{{
            validation.description
          }}</span>
        </div>
        <div class="col-6 col-12-xsmall">
          <input type="file" ref="uploadImage" @change="onImageUpload()" required />
        </div>
        <div class="col-12">
          <ul class="actions">
            <li>
              <input type="submit" value="Submit" class="primary" />
            </li>
            <li>
              <input type="reset" value="Reset" />
            </li>
            <li>
              <input
                type="reset"
                value="Cancel"
                @click="$router.push({ name: 'DashboardPage' })"
              />
            </li>
          </ul>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import cakifyAdminService from "@/apiservices/cakifyAdminService.js";
import fileUploadService from "@/apiservices/fileUploadService.js";

export default {
  data() {
    return {
      currencyValue: 0,
      snackbar: false,
      successMessage: "Your cake has been uploaded successfully!",
      egglessOption: "",
      cakeName: "",
      price: "0.00",
      extraForEgg: "",
      description: "",
      cakeType: null,
      formData: null,
      validation: [],
      displayInputBox:false,
      moreCakeAddMsg: false,
      options: [
        { id: 1, option: "Yes" },
        { id: 2, option: "No" },
      ],
      option: "",
      items: [
        { id: 1, type: "Custom" },
        { id: 2, type: "Valentines" },
        { id: 3, type: "Birthday" },
        { id: 4, type: "Anniversary" },
      ],
    };
  },

  methods: {
    displayinput(){
    
      this.displayInputBox=true;
    },
    hideInputBox(){
     this.displayInputBox=false;
      
    },
    //  adding 2decimal place to the entered integer
    focusOut: function () {
      this.price = Number(this.price)
        .toFixed(2)
        .replace(/(\d)(?=(\d{5})+(?:\.\d+)?$)/g);
    },
    //  selectiong image for upload
    onImageUpload() {
      let file = this.$refs.uploadImage.files[0];
      this.formData = new FormData();
      this.formData.append("file", file);
    },
    submit() {
      cakifyAdminService
        .addCake({
          cakeName: this.cakeName,
          cakePrice: this.price,
          description: this.description,
          cakeImage: this.file,
          egglessOption: this.egglessOption,
          cakeType: this.cakeType,
          extraForEgg: this.extraForEgg,
        })
        .then((response) => {
          this.cakeData = response.data.data;
          // image uplod
          fileUploadService.upload(this.formData, this.cakeData);
          this.cakeType - "";
          this.snackbar = true;
          this.moreCakeAddMsg = true;
        })
        .catch((error) => {
          console.log("There was an error : " + JSON.stringify(error));
        });
      this.cakeImage = "";
    },
    reset() {
      this.$refs.addCakeForm.reset();
    },

    callYes(){
      // this.$router.push({name:'AddCakePage'}).catch((err) => {(err)});
      this.$router.go({name:'/AddCakePage'}).catch((err)=>{(err)});
    },
    //  function call for validation

    check_cakeName(value) {
      if (value == "") {
        this.validation["cakeName"] = "Enter a cakeName";
      } else {
        this.validation["cakeName"] = "";
      }
    },

    check_price(value) {
      if (value == "") {
        this.validation["price"] = "Enter a price";
      } else {
        this.validation["price"] = "";
      }
    },
    check_description(value) {
      if (value == "") {
        this.validation["description"] = "please write a description";
      } else {
        this.validation["description"] = "";
      }
    },
  },
  watch: {
    //  validation
    price(value) {
      this.price = value;
      this.check_price(value);
    },
    description(value) {
      this.description = value;
      this.check_description(value);
    },
    cakeName(value) {
      this.cakeName = value;
      this.check_cakeName(value);
    },
  },
};
</script>

<style lang="scss" scoped>
.boxMargin {
  margin: 3em 0;
}
</style>
