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
                <v-form ref="cakeDetailsForm" v-model="valid" @submit.prevent="buyNow">    
                    <v-card-text>
                        <v-card-title>{{cake.cakeName}}</v-card-title>
                        <div>
                            <b>Price: </b><i class="fas fa-rupee-sign"></i>{{cake.cakePrice}}
                        </div>
                        <div><b>Description: </b>{{cake.description}}</div>
                        <div><b>Type of Cake: </b>{{cake.cakeType}}</div>
                        <v-divider class="mx-4"></v-divider>
                        
                            <v-text-field 
                                type="number" 
                                v-model="kilograms" 
                                label="How many kgs?" 
                                :rules="cakeWeightRules"
                                required
                            >
                            </v-text-field>
                            <v-text-field 
                                type="email" 
                                v-model="buyerEmail" 
                                label="Email" 
                                :rules="buyerEmailRules"
                                required
                            ></v-text-field>
                            <v-radio-group v-if="cake.egglessOption === 'Yes'"
                                v-model="eggless"
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
                                v-model="address"
                                :rules = "deliveryAddressRules"
                                required
                            >
                            </v-text-field>
                            <v-text-field
                                label="Delivery Date"
                                v-model="dateOfDelivery"
                                :rules="deliveryDateRules"
                                required
                            >
                            </v-text-field>
                            <v-text-field
                                label="Delivery Time"
                                v-model="deliveryTime"
                                :rules="deliveryTimeRules"
                                required
                            ></v-text-field>
                            <v-textarea
                                label="Message to be written on the cake"
                                v-model="messageOnCake"
                                required
                            ></v-textarea>
                            <v-textarea
                                label="Message when delivering the cake"
                                v-model="messageOnDelivery"
                                required
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
                </v-card-text>
                </v-form>
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
                buyerEmail: '',
                buyerEmailRules: [
                    value => !!value || 'Enter email'
                ],
                kilograms: null,
                cakeWeightRules: [
                    value => !!value || 'Please specify the number of kgs'
                ],
                eggless: '',
                address: '',
                deliveryAddressRules: [
                    value => !!value || 'Delivery Address is required'
                ],
                dateOfDelivery: '',
                deliveryDateRules: [
                    value => !!value || 'Delivery date is required'
                ],
                deliveryTime: '',
                deliveryTimeRules: [
                    value => !!value || 'Delivery Time is required'
                ],
                messageOnCake: '',
                messageOnDelivery: '',
                options: [
                    'Yes', 
                    'No'
                ],
                valid: ''
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
            }, 
            addToCart(){
                console.log('add to cart method');
            },
            buyNow() {
                cakifyAdminService.buyNow({
                    cakeId: this.cake.cakeId,
                    // cakeName: this.cake.cakeName,
                    // cakePrice: this.cake.cakePrice,
                    // description: this.cake.description,
                    // cakeType: this.cake.cakeType,
                    // bakeryEmail: this.cake.bakeryEmail,
                    buyerEmail: this.buyerEmail,
                    kilograms: this.kilograms,
                    eggless: this.eggless,
                    address: this.address,
                    dateOfDelivery: this.dateOfDelivery,
                    deliveryTime: this.deliveryTime,
                    messageOnCake: this.messageOnCake,
                    messageOnDelivery: this.messageOnDelivery
                })
                .then(response => {
                    console.log('Buy now cake response: ', response.data);
                    this.paymentUrl = response.data.apiResponse.paymentOrder.paymentOptions.paymentUrl
                    console.log('payment url ', this.paymentUrl)
                    this.$router.push({name: 'Payment', params: {paymentUrl: this.paymentUrl}})
                })
                .catch(error => {
                    console.log('Error in buy now: ', error.response);
                })
                // if(this.$refs.cakeDetailsForm.validate()){
                //     console.log(this.cakeId, this.kilograms,
                //         this.deliveryTime, this.dateOfDelivery, this.address, this.eggless,
                //         this.messageOnCake, this.messageOnDelivery);
                // }

            }
        }
    }
</script>

<style lang="scss" scoped>

</style>