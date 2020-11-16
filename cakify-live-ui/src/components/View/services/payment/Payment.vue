<template>
    <div>
        <h3>Payment</h3>
       
        <div class="box">
            <p>Here is your order details. You will be redirected to our payment portal. Please be ready with your bank details to complete your transaction.</p>
            <p>Want to change something in your order? You can do that <a href="">here</a>.</p>
            <p>Thank You for using Cakify!</p>
            <template v-if="!processing">
            <div class="table-wrapper">
                <table class="alt">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Details</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{{cakeDetails.cakeName}}</td>
                            <td>{{orderDetails.kilograms}} x {{cakeDetails.cakePrice}}</td>
                            <td><i class="fas fa-rupee-sign"></i><b>{{cakeTotalPrice.toFixed(2)}}</b></td>
                        </tr>
                        <tr>
                            <td>How many kgs</td>
                            <td>{{orderDetails.kilograms}}</td>
                            <td></td>
                        </tr>
                        <tr  v-if="orderDetails.eggless == 'yes'">
                            <td>Eggless Option selected</td>
                            <td>{{orderDetails.kilograms}} x 100.00</td>
                            <td><i class="fas fa-rupee-sign"></i><b>{{(orderDetails.kilograms * 100).toFixed(2)}}</b></td>
                        </tr>
                        <tr>
                            <td>Date of delivery</td>
                            <td>{{orderDetails.dateOfDelivery}}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Time of delivery</td>
                            <td>{{orderDetails.deliveryTime}}</td>
                            <td></td>
                        </tr>
                        
                        <tr>
                            <td>Delivery address</td>
                            <td>{{orderDetails.address}}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{{orderDetails.buyerEmail}}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Message on cake</td>
                            <td>{{orderDetails.messageOnCake}}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Message when delivering cake</td>
                            <td>{{orderDetails.messageOnDelivery}}</td>
                            <td></td>
                        </tr>
                        
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="2">Total Amount</td>
                            <td><i class="fas fa-rupee-sign"></i><b>{{totalAmount.toFixed(2)}}</b></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            </template>
            <div v-else class="col-6 col-12-xsmall loading">
                <!-- <Spinner :centered="true" size="80" /> -->
                <img src="@/assets/images/500_F_220806337_SoV972QDGS9kdIydMElimDrcVwL1CNrU.jpg" class="loadingImage" />
            </div>
            <img 
                src="@/assets/images/images-payment.png" 
                alt=""  
                @click="proceedToCheckout" 
                class="payment image" 
            >
        </div>     
    </div>
</template>

<script>
// import Spinner from "@/components/UI/Spinner";

    export default {
        components: {
            // Spinner
        },
        data(){
            return {
                paymentUrl: '',
                cakeDetails: '',
                orderDetails: '',
                totalAmount: null,
                cakeTotalPrice: null,
                processing: false,
            }
        },
        created(){
            this.paymentUrl = this.$route.params.paymentUrl;
            this.cakeDetails = this.$route.params.cakeDetails;
            this.orderDetails = this.$route.params.orderDetails;
        },
        mounted(){
            this.calculateTotalAmount();
            this.calculateTotalCakePrice();
        },
        methods: {
            proceedToCheckout(){
                this.processing = true;
                window.location.href=this.paymentUrl;
            },
            calculateTotalCakePrice(){
                this.cakeTotalPrice = (this.orderDetails.kilograms * this.cakeDetails.cakePrice)
            },
            calculateTotalAmount(){
                if(this.orderDetails.eggless=='yes'){
                    this.totalAmount = (this.cakeDetails.cakePrice * this.orderDetails.kilograms) + (this.orderDetails.kilograms * 100);
                } else {
                    this.totalAmount = (this.cakeDetails.cakePrice * this.orderDetails.kilograms);
                }  
            },
        }
        
    }
</script>

<style lang="scss" scoped>
.payment {
    cursor: pointer;
}
.loading {
  min-height: 170px;
  position: relative;

  .spinner {
    left: 20%;
  }
  .loadingImage {
      animation-name: image;
      animation-duration: 0.2s;
      animation-iteration-count: 5;
  }

  @keyframes image{
      from {opacity: 20%}
      to {opacity: 100%}
  }
}

</style>