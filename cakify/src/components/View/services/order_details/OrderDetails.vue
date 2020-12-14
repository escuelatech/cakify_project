<template>
    <div>
        <h1>Order Details</h1>
        <div>
            <div class="table-wrapper">
                <table class="alt" v-for="order in orderDetails" :key="order.orderId">
                    <thead>
                        <tr>
                            <th>Field Name</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Bakery Email</td>
                            <td>{{bakeryEmail}}</td>
                        </tr>
                        <tr>
                            <td>Order Id</td>
                            <td>{{order.orderId}}</td>
                        </tr>
                        <tr>
                            <td>Order Date</td>
                            <td>{{order.orderDate}}</td>
                        </tr>
                        <tr>
                            <td>Eggless Option</td>
                            <td>{{order.eggless}}</td>
                        </tr>
                        <tr>
                            <td>How many kgs</td>
                            <td>{{order.kilograms}}</td>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <td>{{order.address}}</td>
                        </tr>
                        <tr>
                            <td>Date of Delivery</td>
                            <td>{{order.dateOfDelivery}}</td>
                        </tr>
                        <tr>
                            <td>Time of Delivery</td>
                            <td>{{order.deliveryTime }}</td>
                        </tr>
                        <tr>
                            <td>Customer Name</td>
                            <td>{{order.customerName}}</td>
                        </tr>
                        <tr>
                            <td>Customer Email</td>
                            <td>{{order.buyerEmail}}</td>
                        </tr>
                        <tr>
                            <td>Customer Phone Number</td>
                            <td>{{order.phonenumber}}</td>
                        </tr>
                        <tr>
                            <td>Message to be written on the cake</td>
                            <td>{{order.messageOnCake}}</td>
                        </tr>
                        <tr>
                            <td>Message on Delivery</td>
                            <td>{{order.messageOnDelivery}}</td>
                        </tr>
                        <tr>
                            <td>Total Price</td>
                            <td><i class="fas fa-rupee-sign"></i><b>{{order.totalPrice.toFixed(2)}}</b></td>
                        </tr>
                    </tbody>
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
                </table>
                
            </div>
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

</style>