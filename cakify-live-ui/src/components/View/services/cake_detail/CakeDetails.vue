<template>
<div>
    <br>
   <ul class="actions">
        <li>
            <input type="button" value="Back" class="primary" 
                @click="$router.push({name: 'CakeListByBakery', params: {bakeryEmail: cake.bakeryEmail}})"
            >
        </li>
   </ul>
   <!-- :style="{ backgroundImage: `url(${cake.cakeImage})` }" -->
    <div class="box app-background">
        <div class="row gtr-uniform">
            <div class="col-6 col-12-xsmall cakeDetail">
                <h3><b>Cake Name: </b>{{cake.cakeName}}</h3>
                <h3><b>Cake Price: </b>{{cake.cakePrice}}</h3>
                <h3><b>Description: </b>{{cake.description}}</h3>
                <h3><b>Type of cake: </b>{{cake.cakeType}}</h3>
            </div>
            <!-- <div class="col-6 col-12-xsmall">
                <img :src="cake.cakeImage" alt="" width="120" height="125">
            </div> -->
            
        </div>
        <br>
        <br>
        <form @submit.prevent="buyNow">
            <div class="row gtr-uniform">
                <div class="col-6 col-12-xsmall">
                    <input 
                        type="email"
                        v-model="buyerEmail"
                        placeholder="Email"
                        autocomplete="on"
                        required
                    >
                    <span class="errorNotification" v-if="msg.buyerEmail">{{msg.buyerEmail}}</span>
                </div>
                <div class="col-6 col-12-xsmall">
                    <input 
                        type="text"
                        v-model="buyerName"
                        placeholder="Name"
                        autocomplete="on"
                        required
                    >
                    <!-- <span class="errorNotification">{{validateName}}</span> -->
                </div>
                <div class="col-6 col-12-xsmall">
                    <input 
                        type="tel"
                        v-model.number="phoneNumber"
                        placeholder="Phone Number"
                        autocomplete="on"
                        required
                    >
                    <span class="errorNotification" v-if="msg.phoneNumber">{{msg.phoneNumber}}</span>
                </div>
                <div class="col-6 col-12-xsmall">
                    <select v-model="kilograms" required>
                        <option disabled value="null">How many kgs?</option>
                        <option v-for="kilo in kiloArr" :key="kilo" :value="kilo">{{kilo}}</option>
                    </select>
                     <span class="errorNotification" v-if="msg.kilograms">{{msg.kilograms}}</span>
                </div>
                <div class="col-6 col-12-xsmall">
                    <select id="eggless" name="eggless" v-model="eggless" required>
                        <option disabled value="">Do you want an eggless cake?</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                     <span class="errorNotification" v-if="msg.eggless">{{msg.eggless}}</span>
                </div>
                <div class="col-6 col-12-xsmall">
                    <input 
                        type="text"
                        v-model="address"
                        placeholder="Delivery Address"
                        required
                    >
                     <span class="errorNotification" v-if="msg.address">{{msg.address}}</span>
                </div>
                <div class="col-6 col-12-xsmall">
                   <select 
                        v-model="dateOfDelivery" 
                        name="dateOfDelivery"
                        required
                    >
                    <!-- @change="getDates(date)" -->
                        <option value="null" disabled>Select Date</option>
                        <option v-for="date in dates" :key="date.date" :value="date.date">
                            {{ date.expandedDate }}
                        </option>
                    </select>
                    <span class="errorNotification" v-if="msg.dateOfDelivery">{{msg.dateOfDelivery}}</span>
                 </div>
                <div class="col-6 col-12-xsmall">
                     <select name="deliveryTime" id="deliveryTime" v-model="deliveryTime" required>
                         <option value="null" disabled>Select a delivery time</option>
                         <option v-for="time in times" :key="time" :value="time">{{time}}</option>
                     </select>
                     <span class="errorNotification" v-if="msg.deliveryTime">{{msg.deliveryTime}}</span>
                </div>
                <div class="col-12">
                    <textarea 
                        v-model="messageOnCake"
                        placeholder="Message to be written on cake"
                    ></textarea>
                    
                </div>
                <div class="col-12">
                    <textarea 
                        v-model="messageOnDelivery"
                        placeholder="Message when delivering the cake"
                    ></textarea>
                     
                </div>
                
                <div class="col-12">
                    <ul class="actions">
                        <li>
                            <input type="submit" value="Add To Cart" class="primary">
                        </li>
                         <li>
                            <input type="submit" value="Buy Now">
                        </li>
                    </ul>
                </div>
            </div>
        </form>
    </div>
</div>
</template>

<script>
import PaymentService from "@/apiservices/PaymentService.js";
import CakifyAdminService from "@/apiservices/CakifyAdminService.js";
import BakeryService from "@/apiservices/BakeryService.js";
import OrderDetailsService from "@/apiservices/OrderDetailsService.js";

    export default {
        data(){
            return {
                kiloArr: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
                msg: [],
                cakeId: '',
                cake: '',
                buyerEmail: '',
                buyerName: '',
                kilograms: null,
                eggless: '',
                address: '',
                dateOfDelivery: null,
                deliveryTime: null,
                messageOnCake: '',
                messageOnDelivery: '',
                phoneNumber: null,
                valid: '',
                paymentUrl: '',
                cakeDetails: '',
                orderDetails: '',
                times: ['10:00am', '10:30am', '11am', '11:30am', '12:00pm', '12:30pm', '1:00pm', '1:30pm', '2:00pm', '2:30pm', '3:00pm', '3:30pm','4:00pm', '4:30pm', '5:00pm'],
                dates: [],
                date: null,
                cakeInfo: [],
                orderId: null
            }
        },
        // computed: {
        //     validateName(){
        //         return (this.buyerName !== "" ? "" : "Enter your name"); 
        //     }, 
        //     validateUserEmail(){
        //         // eslint-disable-next-line no-useless-escape
        //         const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 
        //         const matches = regex.test(this.buyerEmail);
        //         return (matches ? "": "Enter valid email" ); 
        //     }
        // },
        watch: {
            buyerEmail(value) {
                this.buyerEmail = value;
                this.validateBuyerEmail(value);
            },
            buyerName(value) {
                this.buyerName = value;
                this.validateBuyerName(value);
            },
            // phoneNumber(value) {
            //     this.phoneNumber = value;
            //     this.validatePhoneNumber(value);
            // },
            eggless(value) {
                this.eggless = value;
                this.validateEggless(value);
            },
            kilograms(value) {
                this.kilograms = value;
                this.validateKilograms(value);
            },
            address(value) {
                this.address = value;
                this.validateAddress(value);
            },
            dateOfDelivery(value) {
                this.dateOfDelivery = value;
                this.validateDateOfDelivery(value);
            },
            deliveryTime(value) {
                this.deliveryTime = value;
                this.validateDeliveryTime(value);
            },
        },
        created() {
            this.cakeId = this.$route.params.cakeId;
            this.orderId = this.$route.params.orderId;
        },
        mounted() {
            this.getSelectedCake();
            this.allowedDates();
        },
        methods: {
           getSelectedCake() {
                CakifyAdminService.getCake(this.cakeId)
                    .then(response => {
                        this.buyerEmail=response.headers['email'];
                        this.cake = response.data.apiResponse;
                        console.log('Selected Cake: ', this.cake);
                    })
                    .catch(error => {
                        console.log('Error', JSON.stringify(error))
                    })
            }, 
             allowedDates(){
                BakeryService.getDeliveryDates()
                    .then(response => {
                        this.dates = response.data;
                        console.log('Date: ', this.dates)
                    })
                    .catch(error => {
                        console.log('Error in date api: ', error.response)
                    }) 
            },
            // getDates(value){
            //     this.dateOfDelivery = value.date;
            //     console.log(this.dateOfDelivery);
            // },
            addToCart(){
                console.log('add to cart method');
            },
            buyNow() {
                PaymentService.buyNow({
                    cakeId: this.cake.cakeId,
                    buyerEmail: this.buyerEmail,
                    customerName: this.buyerName,
                    kilograms: this.kilograms,
                    eggless: this.eggless,
                    address: this.address,
                    dateOfDelivery: this.dateOfDelivery,
                    deliveryTime: this.deliveryTime,
                    messageOnCake: this.messageOnCake,
                    messageOnDelivery: this.messageOnDelivery,
                    phonenumber: this.phoneNumber
                })
                .then(response => {
                    console.log('Buy now cake response: ', response.data);
                    console.log("error data", JSON.stringify(response.data.errorCode));
                    if(response.data.errorCode !== "Bad Request"){
                         console.log("Good request")
                        
                            this.cakeDetails = response.data.apiResponse.cake;
                            this.orderDetails = response.data.apiResponse.cakeOrder;
                            this.paymentUrl = response.data.apiResponse.paymentOrder.paymentOptions.paymentUrl
                            console.log('payment url ', this.paymentUrl)
                            // localStorage.setItem('orderDetails', JSON.stringify(this.orderDetails));
                            // localStorage.setItem('cakeDetails', JSON.stringify(this.cakeDetails));
                            
                            this.$router.push({name: 'Payment', params: {paymentUrl: this.paymentUrl, cakeDetails: this.cakeDetails, orderDetails: this.orderDetails}})
                    }
                    else {
                        console.log("Bad request");
                    }
                   
                })
                .catch(error => {
                    console.log('Error in buy now: ', JSON.stringify(error.response));
                })

            }, 
            getOrderDetailsByOrderId(){
                OrderDetailsService.getOrderDetailsByOrderId(this.orderId) 
                    .then(response => {
                        this.cake = response.data.apiResponse.cake;
                        this.cakeId = this.cake.cakeId;
                        this.orderDetails = response.data.apiResponse.cakeOrder;
                        console.log("Cake",this.cake);
                        console.log("Order", this.orderDetails);
                    })
            },
            validateBuyerEmail(value){
                 // eslint-disable-next-line no-useless-escape
                 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
                     this.msg['buyerEmail'] = "";
                 } else {
                     this.msg['buyerEmail'] = 'Enter a valid email';
                 }
            },
            // validatePhoneNumber(value){
            //      // eslint-disable-next-line no-useless-escape
            //      var phoneno = /^[2-9]\d{2}-\d{3}-\d{4}$/;
            //      if (phoneno.test(value)) {
            //          this.msg['phoneNumber'] = "";
            //      } else {
            //          this.msg['phoneNumber'] = 'Enter a valid phone number';
            //      }
            // },
             validateEggless(value){
                if (value !== "") {
                     this.msg['eggless'] = "";
                 } else {
                     this.msg['eggless'] = 'Select a valid option';
                 }
            },
             validateKilograms(value){
                 if (value !== null) {
                     this.msg['kilograms'] = "";
                 } else {
                     this.msg['kilograms'] = 'Enter required kgs';
                 }
            },
             validateAddress(value){
                if (value !== "") {
                     this.msg['address'] = "";
                 } else {
                     this.msg['address'] = 'Enter an address';
                 }
            },
            validateBuyerName(value){
                if (value !== "") {
                     this.msg['buyerName'] = "";
                 } else {
                     this.msg['buyerName'] = 'Enter your name';
                 }
            },
             validateDateOfDelivery(value){
                if (value !== "") {
                     this.msg['dateOfDelivery'] = "";
                 } else {
                     this.msg['dateOfDelivery'] = 'Enter a valid date';
                 }
            },
             validateDeliveryTime(value){
                if (value !== ""){
                     this.msg['deliveryTime'] = "";
                 } else {
                     this.msg['deliveryTime'] = 'Enter a valid time';
                 }
            }
        }
    }
</script>

<style lang="scss" scoped>
.app-background {
  /* The image used */
  background: rgba(0,0,0,0);  
  background-image: url("https://images.unsplash.com/photo-1559620192-032c4bc4674e?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8OHx8Y2FrZXxlbnwwfHwwfA%3D%3D&auto=format&fit=crop&w=500&q=60");

  /* Add the blur effect */
//   filter: blur(8px);
//   -webkit-filter: blur(8px);

  /* Full height */
  height: 100%;

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.errorNotification {
  color: red;
}
select {
    color: #7f888f;
}
select option {
    color: black;
}
// .cakeDetail h6 b{
//     color: white;
// }

</style>