<template>
  <div>
    <h3>Edit Cake</h3>
    <form @submit.prevent="submitEditCake">
      <div class="row gtr-uniform">
        <div class="col-6 col-12-xsmall">
          <input
            type="text"
            name="cakename"
            placeholder="Name of the cake"
            v-model="cake.cakeName"
            autocomplete="off"
            required
          />
        </div>
        <div class="col-6 col-12-xsmall">
          <input
            type="text"
            name="cakename"
            placeholder="price"
            v-model="cake.cakePrice"
            autocomplete="off"
            required
            @blur="focusOut()"
            onmouseup="(this).select(); return false;"
          />
        </div>
        <div class="col-6 col-12-xsmall">
          <label for="cakeType">Specify type of the cake:</label>
          <select v-model="cake.cakeType" class="boxBorder">
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
              v-model="cake.egglessOption"
              value="Yes"
            />
            <label for="checkYes">Yes</label>
            <input
              type="radio"
              id="checkNo"
              name="demo-priority"
              v-model="cake.egglessOption"
              value="No"
            />
            <label for="checkNo">No</label>
            <input
              type="text"
              name="extra"
              placeholder="Add extra price for egg option"
              v-model="cake.extraForEgg"
              autocomplete="off"
              
              v-show="displayInputBox"
            />
          </div>
        </div>
        <div class="col-6 col-12-xsmall">
          <textarea
            class="boxBorder"
            name="description"
            placeholder="Write a  description about your Cake"
            rows="2"
            v-model="cake.description"
            required
          ></textarea>
        </div>
        <div class="col-6 col-12-xsmall">
           <div
            class="base-image-input"
            ref="uploadImage"
            :style="{ 'background-image': `url(${imageData})` }"
            @click="chooseImage"
          >
            <span v-if="!imageData" class="placeholder">
              <img height="100%" :src="cake.cakeImage" alt="avatar" />
            </span>
            <input
              class="file-input"
              ref="fileInput"
              type="file"
              @change="onSelectFile()"
            />
          </div>
        </div>
      
      <div class="col-12">
        <ul class="actions">
          <li>
            <input type="submit" value="save" class="primary" />
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

export default {
  data() {
    return {
      cakeId: null,
      cake: "",
      egglessOption: "",
      cakeName: "",
      cakePrice: "",
      description: "",
      cakeImage: "",
      extraForEgg: "",
      cakeType: null,
      formData: null,
      imageData: null,
      displayInputBox: false,
      items: [
        { id: 1, type: "Custom" },
        { id: 2, type: "Valentines" },
        { id: 3, type: "Birthday" },
        { id: 4, type: "Anniversary" },
      ],
      options: ["Yes", "No"],
      valid: "",
    };
  },
  updated(){
       this.extraeggInputfieldShow();
  },

  created() {
       this.cakeId = this.$route.params.cakeId;
     },
  mounted() {
      this.getSelectedCake();
  },
  methods: {
        onSelectFile() {
        const input = this.$refs.fileInput;
        const files = input.files;
        if (files && files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
        this.imageData = e.target.result;
        };
        reader.readAsDataURL(files[0]);
        this.$emit("input", files[0]);
      }
    },

    chooseImage() {
      this.$refs.fileInput.click();
    },

    //  adding 2decimal place to the entered integer
    focusOut: function () {
      this.cake.cakePrice = Number(this.cake.cakePrice)
        .toFixed(2)
        .replace(/(\d)(?=(\d{5})+(?:\.\d+)?$)/g);
    },

    getSelectedCake() {
      cakifyAdminService
        .getCake(this.cakeId)
        .then((response) => {
          this.cake = response.data.apiResponse;
          console.log("Selected Cake: ", this.cake);
        })
        .catch((error) => {
          console.log("Error", error.response);
        });
    },
    submitEditCake() {
      cakifyAdminService
        .updateCake({
          cakeId: this.cake.cakeId,
          cakeName: this.cake.cakeName,
          cakePrice: this.cake.cakePrice,
          description: this.cake.description,
          cakeImage: this.cake.cakeImage,
          cakeType: this.cake.cakeType,
          egglessOption: this.cake.egglessOption,
          bakeryEmail: this.cake.bakeryEmail,
          imageId: this.cake.imageId,
          extraForEgg: this.cake.extraForEgg,
        })
        .then((response) => {
          response.data;
          console.log("Edited Cake: ", response.data);
          this.cake = response.data;
          console("updated cake list", this.cake);
        })
        .catch((error) => {
          console.log("Error in edit cake: ", error.response);
        });
    },

    extraeggInputfieldShow() {
    //  shows extra for egg input field  
    this.cake.egglessOption === 'Yes' ?  this.displayInputBox = true :   this.displayInputBox = false;
      
    },
  },
};
</script>

<style lang="scss" scoped>
// ***for image preview of avatar***>
.base-image-input {
  display: block;
  width: 100px;
  height: 100px;
  cursor: pointer;
  background-size: cover;
  background-position: center center;
}
.placeholder {
  background: #f0f0f0;
  width: 75%;
  height: 75%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  font-size: 18px;
  font-family: Helvetica;
}
.placeholder:hover {
  background: #e0e0e0;
}
.file-input {
  display: none;
}
</style>
