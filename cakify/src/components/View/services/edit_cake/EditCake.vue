<template>
<v-app>
    <h3>Edit Cake</h3>
    <v-form ref="addCakeForm" 
        v-model="valid" 
        @submit.prevent="submitEditCake" 
    >
        <v-card
            class="mx-auto"
            max-width="600"
        >
        <div class="row gtr-uniform">
         <div class="col-6 col-12-xsmall">
          <input type="text" name="cakename"  placeholder="Name of the cake" v-model="cake.cakeName" autocomplete="off" required />
         </div>
         
            <div class="col-6 col-12-xsmall">
          <input type="text" name="cakename" placeholder="Price" v-model="cake.cakePrice" autocomplete="off" required @blur="focusOut()" />
         
        </div>
        <div class="col-6 col-12-xsmall">
            <label for="cakeType">Specify type of the cake:</label>
                <select v-model="cake.cakeType"  class="boxBorder">
                <option v-for="item in items" :key="item.id">{{item.type}}</option>
                
                </select>
         </div>
          <div class="col-6 col-12-small">
        <label for="cakeType">Eggless Option:</label><br/>
		<input type="radio" id="checkYes" name="demo-priority" v-model="cake.egglessOption" value="Yes">
		<label for="checkYes">Yes</label>
        <input type="radio" id="checkNo" name="demo-priority" v-model="cake.egglessOption" value="No">
		<label for="checkNo">No</label>
        </div>
        <div class="col-6 col-12-xsmall">
          <textarea class="boxBorder" name="description" placeholder="Write a  description about your Cake" rows="2" v-model="cake.description" required></textarea>
         
        </div> 
        <div class="col-6 col-12-xsmall">
         <v-list-item>
        <v-list-item-avatar
                    tile
                    size="150"
                >
                    <img 
                        :src="cake.cakeImage" 
                        alt="" 
                    />
                </v-list-item-avatar>
         </v-list-item>
         </div>

         <div class="col-12">
             <ul class="actions">
            <li>
              <input type="submit" value="Edit and save" class="primary" @click="$router.go(-1)" />
            </li>
          <!--  <li>
              <input type="reset" value="Reset" />
            </li>-->
            <li>
              <input type="reset" value="Cancel" @click="$router.push({name: 'DashboardPage'})"/>
            </li>
          </ul>
        </div>
        </div>



            <v-list-item>
                <v-list-item-avatar
                    tile
                    size="300"
                >
                    <img 
                        :src="cake.cakeImage" 
                        alt="" 
                    />
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-text-field 
                        label="Name of the Cake" 
                        v-model="cake.cakeName" 
                        prepend-icon="fas fa-birthday-cake"
                        :counter="20"
                        required
                    ></v-text-field>
                    <v-text-field 
                        label="Price" 
                        v-model="cake.cakePrice" 
                        type="number"
                        prepend-icon="fas fa-rupee-sign"
                        required
                    ></v-text-field>
                    <v-textarea 
                        label="Describe your cake" 
                        v-model="cake.description" 
                        prepend-icon="fas fa-pen"
                        :counter="500"
                        required
                    ></v-textarea>
                    <v-select
                        :items="items"
                        label="Specify type of the cake"
                        placeholder=" "
                        v-model="cake.cakeType"
                        prepend-icon="fas fa-mouse-pointer"
                        required
                    ></v-select>
                    <v-radio-group 
                        v-model="cake.egglessOption"  
                        label="Do you provide an eggless option for this cake?"
                        required 
                    >
                        <v-divider></v-divider>
                        <v-radio
                            :label="option"
                            name="cake.egglessOption"
                            v-for= "option in options"
                            :key="option"
                            :value="option"
                            prepend-icon="fas fa-check"
                            required
                        ></v-radio>
                    </v-radio-group>

                    <v-card-actions>
                        <v-btn text type="submit" @click="$router.go(-1)">Save</v-btn>
                        <v-btn text>Delete</v-btn>
                        <v-btn text @click="$router.push({name: 'DashboardPage'})">Cancel</v-btn>
                    </v-card-actions>
                </v-list-item-content>
            </v-list-item>
        </v-card>
    </v-form>
  </v-app>

</template>

<script>

import cakifyAdminService from "@/apiservices/cakifyAdminService.js"

export default {
    data() {
          return {
            cakeId: null,
            cake: '',
            egglessOption: '',
            cakeName: '',
            cakePrice: '',
            description: '',
            cakeImage: '',
            cakeType: null,
            formData: null,
            items: [
                'Custom',
                'Valentines',
                'Birthday',
                'Anniversary'
            ],
            options: [
                'Yes',
                'No'
            ],
            valid: ""
          }
      },
      created() {
          this.cakeId = this.$route.params.cakeId;
        },
      mounted() {
            this.getSelectedCake();
        },
      methods: {
            getSelectedCake() {
                cakifyAdminService.getCake(this.cakeId)
                    .then(response => {
                        this.cake = response.data.apiResponse;
                        console.log('Selected Cake: ', this.cake);
                    })
                    .catch(error => {
                        console.log('Error', error.response)
                    })
            },
            submitEditCake(){
                cakifyAdminService.updateCake({
                    cakeId: this.cake.cakeId,
                    cakeName: this.cake.cakeName,
                    cakePrice: this.cake.cakePrice,
                    description: this.cake.description,
                    cakeImage: this.cake.cakeImage,
                    cakeType: this.cake.cakeType,
                    egglessOption: this.cake.egglessOption,
                    bakeryEmail: this.cake.bakeryEmail,
                    imageId: this.cake.imageId
                })
                .then(response => {
                  ( response.data);
                    //  console.log('Edited Cake: ', response.data);
                })
                .catch(error => {
                    console.log('Error in edit cake: ', error.response)
                })
            } 
         }
    
};
</script>

<style lang="scss" scoped>

</style>