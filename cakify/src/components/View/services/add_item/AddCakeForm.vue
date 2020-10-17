<template>
<div>
    <v-app id="inspire" class="app-background">
        <v-card class="mx-auto card">
            <section id="banner">
                <div class="content text-justify">
                    <v-card-title>Add Cake</v-card-title>
                    <v-card-text>
                        
                        <v-form ref="addCakeForm" 
                            v-model="valid" 
                            @submit.prevent="submit" 
                        >
                            <v-container>
                                <v-col>
                                    <v-text-field 
                                        label="Name of the Cake" 
                                        v-model="cakeName" 
                                        :rules="cakeNameRules"
                                        prepend-icon="fas fa-birthday-cake"
                                        :counter="20"
                                        required
                                    ></v-text-field>
                                </v-col>

                                <v-col>
                                    <v-text-field 
                                        label="Price" 
                                        v-model="price" 
                                        type="number"
                                        :rules="priceRules"
                                        prepend-icon="fas fa-rupee-sign"
                                        required
                                    ></v-text-field>
                                </v-col>

                                <v-col>
                                    <v-textarea 
                                        label="Describe your cake" 
                                        v-model="description" 
                                        prepend-icon="fas fa-pen"
                                        :rules="descriptionRules"
                                        :counter="250"
                                        required
                                    ></v-textarea>
                                </v-col>

                                <v-col>
                                    <v-select
                                        :items="items"
                                        label="Specify type of the cake"
                                        placeholder=" "
                                        v-model="cakeType"
                                        prepend-icon="fas fa-mouse-pointer"
                                        :rules="cakeTypeRules"
                                        required
                                    ></v-select>
                                </v-col>

                                <v-col>
                                    <input 
                                        type="file" 
                                        ref="uploadImage" 
                                        @change="onImageUpload()" 
                                        class="form-control"
                                        required
                                    >         
                                </v-col>
                                
                                <v-col>
                                    <v-radio-group 
                                        v-model="radioGroup"  
                                        label="Do you provide an eggless option for this cake?"
                                        required 
                                    >
                                        <v-divider></v-divider>
                                        <v-radio
                                            :label="option"
                                            v-model="egglessOption"
                                            v-for= "option in options"
                                            :key="option"
                                            prepend-icon="fas fa-check"
                                            required
                                        ></v-radio>
                                    </v-radio-group>
                                </v-col>

                                <v-card-actions>
                                    <v-btn :disabled="!valid" tile outlined @click="submit" color="primary" class="mr-2" >Submit</v-btn>
                                    <v-btn tile outlined color="success" @click="reset" class="mr-2">Reset</v-btn>
                                    <v-btn tile outlined color="warning" class="mr-2" @click="$router.push({name: 'CakifyLoginPage'})">Cancel</v-btn>
                                </v-card-actions>
                                <v-snackbar 
                                    v-model="snackbar"
                                    top
                                    color="success"
                                    text
                                >
                                    {{successMessage}}
                                </v-snackbar>
                            </v-container>
                        </v-form>          
                    </v-card-text>
                </div>
        <!-- </section> -->
            </section>
        </v-card>
    </v-app>
</div>
    
</template>

<script>
import cakifyAdminService from "@/apiservices/cakifyAdminService.js"
import fileUploadService from "@/apiservices/fileUploadService.js";

    export default {
        data: () =>  ({
            snackbar: false,
            successMessage: 'Your cake has been uploaded successfully!',

            radioGroup: false,
            options: [
                'Yes',
                'No'
            ],
            egglessOption: '',
            
            cakeName: '',
            cakeNameRules: [
                value => !!value || 'Enter a name for the cake',
                value => (value && value.length >= 3) || 'Name should have a minimum of 3 characters'
            ],

            price: '',
            priceRules: [
                v => !!v || 'Enter a price'
            ],

            description: '',
            descriptionRules: [
                value => !!value || 'Enter description for the cake',
                value => (value && value.length <= 100) || 'Description should have atleast few characters'
            ],

            cakeType: null,
            items: [
                'Custom',
                'Valentines',
                'Birthday',
                'Anniversary'
            ],
            cakeTypeRules: [
                value => !!value || 'Cake type is required'
            ],

            formData: null,
            cakeImageRules: [
                 value => !!value || 'Cake image is required'
            ],
            valid: ""
        }),
        
        methods: {
            onImageUpload() {
                let file = this.$refs.uploadImage.files[0];
                this.formData = new FormData();
                this.formData.append("file", file);
            },
             submit() {
                //console.log('submit method', this.formData);
                cakifyAdminService.addCake( 
                    {
                    "cakeName": this.cakeName,
                    "cakePrice": this.price,
                    "description": this.description,
                    "cakeImage": this.file,
                    "select": this.select,
                    "egglessOption": this.radioGroup,
                    "cakeType": this.cakeType
                }).then(response => {
                    this.cakeData = response.data.data;
                    fileUploadService.upload(this.formData,this.cakeData);
                    this.snackbar = true;
                }).catch(error => {
                    console.log('There was an error : ' + JSON.stringify(error))
                });
                 
                if(this.$refs.addCakeForm.validate())
                console.log(this.cakeName, this.price, this.description, this.formData, this.select, this.radioGroup)
                this.$refs.addCakeForm.reset()
            }
            ,
            reset() {
                this.$refs.addCakeForm.reset()
            }
            }


            
        }
    
    
</script>

<style lang="scss" scoped>
.app-background {
    background: rgba(0,0,0,0);  
    background-image: url('https://tatyanaseverydayfood.com/wp-content/uploads/2018/07/Summer-Sangria-Cake-4.jpg');
    background-size: cover;
};
.card {
    background-color: white!important;
    opacity: 0.85;
    border-color: transparent!important;
    margin-top: 50px;
    margin-bottom: 50px;
}
</style>