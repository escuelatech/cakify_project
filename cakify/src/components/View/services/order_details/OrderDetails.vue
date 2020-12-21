<template>
    <div>
        <h3>List of Orders</h3>
        <div>
            <div class="table-wrapper">
                <table class="alt" >
                    <thead>
                        <tr>
                            <th>OrderId</th>
                            <th>Buyer Email</th>
                            <th>Date of Delivery</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody v-for="order in orderDetails" :key="order.orderId" @click="$router.push({name: 'OrderDetail', params: {orderId: order.orderId}})" class="cursor">
                        <tr>
                            <td>{{order.orderId}}</td>
                            <td>{{order.buyerEmail}}</td>
                            <td>{{order.dateOfDelivery}}</td>
                            <td><i class="fas fa-rupee-sign"></i><b>{{order.totalPrice.toFixed(2)}}</b></td>
                        </tr>
                    </tbody>
                </table>
                
            </div> 
            <!-- <div class="box" v-for="order in orderDetails" :key="order.orderId" @click="$router.push({name: 'OrderDetail', params: {orderId: order.orderId}})">
                <p><b>Order Id: </b>{{order.orderId}}</p>
                <p><b>Date of Delivery: </b>{{order.dateOfDelivery}}</p>
                <p><b>Buyer Email: </b>{{order.buyerEmail}}</p>
                <p><b>Total Price: </b>{{order.totalPrice.toFixed(2)}}</p>
            </div> -->
        </div>

    </div>
</template>

<script>
import cakifyAdminService from "@/apiservices/cakifyAdminService.js";
    export default {
        data(){
            return {
                orderDetails: [],
                bakeryEmail: ''
            }
        },
        mounted(){
            this.getAllCakeOrders();
        },
        methods: {
            getAllCakeOrders(){
                cakifyAdminService.getAllOrderDetails()
                    .then(response => {
                        this.bakeryEmail = response.headers['email'];
                        console.log("BakeryEmail:", this.bakeryEmail)
                        console.log('Cake orders:', response.data);
                        this.orderDetails = response.data.apiResponse;
                    })
            }
        }
    }
</script>

<style lang="scss" scoped>
.cursor {
    cursor: pointer;
}
</style>