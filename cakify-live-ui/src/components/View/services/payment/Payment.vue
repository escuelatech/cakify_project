<template>
    <div>
        <h3>Payment</h3>
        <div class="box">
            <p>You will be redirected to our payment portal. Please be ready with your bank details to complete your transaction.</p>
            <p>Thank You for using Cakify!</p>
            <v-card-actions>
            <v-btn
                color="deep-purple lighten-2"
                text
                @click="proceedToCheckout"
            >
                Proceed To Checkout
            </v-btn>
        </v-card-actions>
        </div>
        
         
    </div>
</template>

<script>
    export default {
        data(){
            return {
                paymentUrl: ''
            }
        },
        created(){
            this.paymentUrl = this.$route.params.paymentUrl;
        },
        methods: {
            proceedToCheckout(){
                window.location.href=this.paymentUrl;
            }
        }
        
    }
</script>

<style lang="scss" scoped>

</style>