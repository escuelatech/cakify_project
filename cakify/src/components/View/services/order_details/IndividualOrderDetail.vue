<template>
<div>
<br>
<ul class="actions">
        <li>
            <input type="button" value="Back" class="primary" 
                @click="$router.push({name: 'OrderDetailsList'})"
            >
        </li>
   </ul>
    <div class="box">
        <h2>Order Details</h2> 
        <div class="col-6 col-12-xsmall image">
            <img :src="cakeDetails.cakeImage" alt="" width="220" height="250">
        </div>
        <div>
            <p><b>Cake Name: </b>{{cakeDetails.cakeName}}</p>
            <p><b>Cake Type: </b>{{cakeDetails.cakeType}}</p>
            <p><b>Cake Price: </b>{{cakeDetails.cakePrice}}</p>
            <!-- <p><b>Eggless Option Available?: </b>{{cakeDetails.egglessOption}}</p> -->
            <p><b>Customer Name: </b>{{orderDetails.customerName}}</p>
            <p><b>Customer Phone: </b>{{orderDetails.phonenumber}}</p>
            <p><b>Customer Email: </b>{{orderDetails.buyerEmail}}</p>
            <p><b>Order Date: </b>{{orderDetails.orderDate}}</p>
            <p><b>Date of Delivery: </b>{{orderDetails.dateOfDelivery}}</p>
            <p><b>Time of Delivery: </b>{{orderDetails.deliveryTime}}</p>
            <p><b>Eggless Option Selected ?: </b>{{orderDetails.eggless}}</p>
            <p><b>How many kgs ?: </b>{{orderDetails.kilograms}}</p>
            <p><b>Delivery Address: </b>{{orderDetails.address}}</p>
            <p><b>Message to be written on Cake: </b>{{orderDetails.messageOnCake}}</p>
            <p><b>Message on Delivery: </b>{{orderDetails.messageOnDelivery}}</p>
        </div>

        <div class="col-12">
            <ul class="actions">
                <li>
                    <input type="submit" value="Confirm Order" class="primary">
                </li>
                    <li>
                    <input type="submit" value="Cancel Order" class='primary'>
                </li>
            </ul>
        </div>
    </div>
</div>
</template>

<script>
import cakifyAdminService from "@/apiservices/cakifyAdminService.js";
    export default {
        data(){
            return {
                orderId: null,
                orderDetails: [],
                cakeDetails: []
            }
        },
         created() {
            this.orderId = this.$route.params.orderId;
        },
        mounted(){
            this.getOrderDetailsByOrderId();
        },
        methods: {
            getOrderDetailsByOrderId(){
                cakifyAdminService.getOrderDetailsByOrderId(this.orderId) 
                    .then(response => {
                        this.cakeDetails = response.data.apiResponse.cake;
                        this.orderDetails = response.data.apiResponse.cakeOrder;
                        console.log("Cake",this.cakeDetails);
                        console.log("Order", this.orderDetails);
                    })
            }
        }

    }
</script>

<style lang="scss" scoped>
.image {
    float: right;
}
</style>