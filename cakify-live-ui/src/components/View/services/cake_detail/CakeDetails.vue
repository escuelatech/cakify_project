<template>
    <v-app>
        <br>
        <div class="text-justify">
            <v-card
                class="mx-auto"
                max-width="500"
            >

                <v-img
                height="250"
                :src="cake.cakeImage"
                ></v-img>

                <v-card-title>{{cake.cakeName}}</v-card-title>

                <v-card-text>
                <div>
                    <b>Price: </b><i class="fas fa-rupee-sign"></i>{{cake.cakePrice}}
                </div>

                <div><b>Description: </b>{{cake.description}}</div>
                 <div><b>Type of Cake: </b>{{cake.cakeType}}</div>
                 <v-divider class="mx-4"></v-divider>
                 <v-form>
                    <v-text-field 
                        type="number" 
                        v-model="cakeWeight" 
                        label="How many kgs?" 
                        required
                    >
                    </v-text-field>
                    <v-radio-group v-if="cake.egglessOption === 'Yes'"
                        v-model="egglessCakeOption"
                        label="Do you want an eggless cake?"
                    >
                        <v-radio
                            :label="option"
                            v-for="option in options"
                            :key="option"
                            :value="option"
                            required
                        >
                        </v-radio>
                    </v-radio-group>
                    <p v-else>We do not offer eggless cakes. </p>
                    <v-text-field 
                        label="Delivery Address"
                        v-model="deliveryAddress"
                        required
                    >
                    </v-text-field>
                    <v-text-field
                        label="Delivery Date"
                        v-model="deliveryDate"
                        required
                    >
                    </v-text-field>
                    <v-text-field
                        label="Delivery Time"
                        v-model="deliveryTime"
                    ></v-text-field>
                    <v-textarea
                        label="Message to be written on the cake"
                        v-model="messageOnCake"
                    ></v-textarea>
                    <v-textarea
                        label="Message when delivering the cake"
                        v-model="messageOnDelivery"
                    ></v-textarea>
                       <v-divider class="mx-4"></v-divider>

                        <v-card-actions>
                        <v-btn
                            color="deep-purple lighten-2"
                            text
                            @click="addToCart"
                        >
                            Add To Cart
                        </v-btn>
                        <v-btn
                            color="deep-purple lighten-2"
                            text
                            @click="buyNow"
                        >
                            Buy Now
                        </v-btn>
                        </v-card-actions>
                 </v-form>
                
                </v-card-text>
            </v-card>
        </div>
    </v-app>
</template>

<script>
import cakifyAdminService from "@/apiservices/cakifyAdminService.js";
    export default {
        data(){
            return {
                cakeId: '',
                cake: '',
                cakeWeight: '',
                egglessCakeOption: '',
                deliveryAddress: '',
                deliveryDate: '',
                deliveryTime: '',
                messageOnCake: '',
                messageOnDelivery: '',
                options: [
                    'Yes', 
                    'No'
                ]
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
                        console.log('Error', JSON.stringify(error))
                    })
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>