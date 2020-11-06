<template>
<div>
    <!-- Wrapper -->
    <div id="wrapper">
      <!-- Main -->
        <div id="main">
            <div class="inner">
            <!-- Header -->
            <Header />
            <!-- Header -->
            <!-- Form -->
            <!-- <section> -->
                <div class="text-justify">
                <!-- Section -->
                    <span class="image fit">
                        <img src="@/assets/images/image.jpg" alt="">
                    </span>
                    <p>
                        A cake makes a great gift, especially for a birthday. It is an honor to receive a birthday cake from someone you love. 
                        A cake delivery is a heartfelt gesture, and ordering a cake online is easy. 
                        Send a cake now to make your loved ones day extra special.
                    </p>
                    <p>
                        With our online cake delivery, you can order a cake and have it delivered to them whether you're near or far.
                    </p>
                    <p>
                        We have many loyal customers who have been ordering from us year after year, and for this we are very grateful. We appreciate that they trust us to help make their
                        loved ones feel special with a cake delivery. Special occasions are important, and when you can't be with your loved ones it can be difficult. Sending them a cake 
                        lets them know you're thinking about them and wish you could be there. The heartfelt gesture is something that will be remembered forever.
                    </p>
                    <!-- </section> -->
                    <form>
                        <div>
                           <select v-model="selectedBakeryLocation">
                                <option disabled value="">Select your location</option>
                                <option v-for="location in bakeryList" :key="location" :value="location">
                                    {{ location.location }}
                                </option>
                            </select>
                            <p>{{selectedBakeryLocation}}</p>
                            <div class="box alt">
                                <div class="row gtr-50 gtr-uniform" v-if="selectedBakeryLocation">
                                    <div class="col-4" >
                                        <span class="image fit">
                                            <img :src="selectedBakeryLocation.image" alt="">
                                            <p>{{selectedBakeryLocation.name}}</p>
                                            <p>{{selectedBakeryLocation.location}}</p>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </form>
                </div>
            <!-- Form -->
            </div>
        </div>
      <!-- Main ends -->

      <!-- Sidebar -->
      <Sidebar />
      <!-- Sidebar -->
    </div>
</div>
</template>

<script>
import Header from "@/components/View/common/Header";
import Sidebar from "@/components/View/common/Sidebar";
// import cakifyAdminService from "@/apiservices/cakifyAdminService.js";
import axios from 'axios'

export default {
    components: { 
        Header, 
        Sidebar  
    },
    data(){
        return {
            selectedBakeryLocation: '',
            // locations: ['Calicut', 'Kannur', 'Malappuram', 'Palakkad', 'Kochi'],
            // bakery: [
            //     {bakeryId: 1, bakeryName: 'Paige bakery', location: 'Kochi', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&w=1000&q=80'},
            //     {bakeryId: 2, bakeryName: 'Cakes cupcakes and more', location: 'Palakkad', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&w=1000&q=80'},

            //     ],
            bakeryList: []
        }
    },
    mounted(){
        this.displayBakeries();
    },
    methods: {
        displayBakeries(){
            axios.get('http://localhost:3000/bakeries')
            .then(response => {
                this.bakeryList = response.data
                console.log('bakery list', this.bakeryList)
            })
            .catch(error => {
                console.log('error', error)
            })
        }

        // displayBakeries() {
        //     cakifyAdminService.getBakeries(this.selectedBakeryLocation)
        //         .then(response => {
        //             this.bakeryList = response.data;
        //             console.log(this.bakeryList)
        //         })
        // }
    }
};
</script>

<style lang="scss" scoped>

</style>