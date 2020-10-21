<template>
<v-app>
    <h3>Edit Cake</h3>
    <v-form ref="addCakeForm" 
        v-model="valid" 
        @submit.prevent="submitEditCake" 
    >
        <v-card
            class="mx-auto"
            max-width="700"
        >
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
                        <v-btn text @click="$router.push({name: 'LandingPage'})">Cancel</v-btn>
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
                    console.log('Edited Cake: ', response.data);
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