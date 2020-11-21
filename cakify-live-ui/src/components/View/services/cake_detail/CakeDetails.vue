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
                <h6><b>Cake Name: </b>{{cake.cakeName}}</h6>
                <h6><b>Cake Price: </b>{{cake.cakePrice}}</h6>
                <h6><b>Description: </b>{{cake.description}}</h6>
                <h6><b>Type of cake: </b>{{cake.cakeType}}</h6>
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
                        type="number"
                        v-model="kilograms"
                        placeholder="How many kgs?"
                        required
                    >
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

    export default {
        data(){
            return {
                msg: [],
                cakeId: '',
                cake: '',
                buyerEmail: '',
                kilograms: null,
                eggless: '',
                address: '',
                dateOfDelivery: null,
                deliveryTime: null,
                messageOnCake: '',
                messageOnDelivery: '',
                valid: '',
                paymentUrl: '',
                cakeDetails: '',
                orderDetails: '',
                times: ['10:00am', '10:30am', '11am', '11:30am', '12:00pm', '12:30pm', '1:00pm', '1:30pm', '2:00pm', '2:30pm', '3:00pm', '3:30pm','4:00pm', '4:30pm', '5:00pm'],
                dates: [],
                date: null,
                cakeInfo: []
            }
        },
        watch: {
            buyerEmail(value) {
                this.buyerEmail = value;
                this.validateBuyerEmail(value);
            },
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
        },
        mounted() {
            this.getSelectedCake();
            this.allowedDates();
        },
        methods: {
           getSelectedCake() {
                CakifyAdminService.getCake(this.cakeId)
                    .then(response => {
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
                    kilograms: this.kilograms,
                    eggless: this.eggless,
                    address: this.address,
                    dateOfDelivery: this.dateOfDelivery.date,
                    deliveryTime: this.deliveryTime,
                    messageOnCake: this.messageOnCake,
                    messageOnDelivery: this.messageOnDelivery
                })
                .then(response => {
                    console.log('Buy now cake response: ', response.data);
                    this.cakeDetails = response.data.apiResponse.cake;
                    this.orderDetails = response.data.apiResponse.cakeOrder;
                    this.paymentUrl = response.data.apiResponse.paymentOrder.paymentOptions.paymentUrl
                    console.log('payment url ', this.paymentUrl)
                    // localStorage.setItem('orderDetails', JSON.stringify(this.orderDetails));
                    // localStorage.setItem('cakeDetails', JSON.stringify(this.cakeDetails));
                    this.$router.push({name: 'Payment', params: {paymentUrl: this.paymentUrl, cakeDetails: this.cakeDetails, orderDetails: this.orderDetails}})
                })
                .catch(error => {
                    console.log('Error in buy now: ', error.response);
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