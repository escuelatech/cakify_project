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
                    <!-- <span class="image fit">
                        <img src="@/assets/images/rascake.jpg" alt="">
                    </span> -->
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
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, distinctio neque repudiandae amet eum harum mollitia natus impedit rem voluptatum non exercitationem quidem reiciendis quae tempore tempora nihil dolor corporis dolorum, repellat recusandae velit. Eveniet adipisci nisi minus est porro veritatis fugiat tempore fugit nulla natus amet doloremque eligendi voluptates suscipit consequuntur assumenda reprehenderit, aspernatur ullam. Vero facilis odio debitis incidunt assumenda distinctio laboriosam neque animi quidem nulla repellendus magni, quae laudantium consequatur, accusamus harum doloribus corporis quas ducimus asperiores cum, sapiente exercitationem. Et a debitis, facilis, hic porro deserunt explicabo cum odit quasi ea asperiores illum vel, sed pariatur!
                    </p>
                    <button @click="showcakes()">click</button>
                    <div class="box alt">
                        <div class="row gtr-50 gtr-uniform">
                            <div class="col-4" v-for="cake in displayFirstNineCakes" :key="cake.cakeId">
                                <span class="image fit">
                                    <img :src="cake.cakeImage" alt="" @click="$router.push({name: 'CakeDetails', params: {cakeId: cake.cakeId}})">
                                </span>
                            </div>
                        </div>
                    </div>
                     <v-btn tile outlined color="success" class="mr-2">Continue</v-btn>

                </div>
                    <!-- </section> -->
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
import cakifyAdminService from "@/apiservices/cakifyAdminService.js";

export default {
    components: { 
        Header, 
        Sidebar  
    },
    data() {
        return {
            cakes: []
        }
    },
    mounted() {
        this.displayAllCakes();
    },
    methods: {
        displayAllCakes() {
            cakifyAdminService.getAllCakes()
                .then(response => {
                    console.log("all Cakes: ", response.data.apiResponse);
                    this.cakes = response.data.apiResponse;
                })
                .catch(error => {
                    console.log('Error when displaying cakes in a grid: ', error.response);
                })
        },
       
    },
    computed: {
        displayFirstNineCakes() {
            return this.cakes.slice(0, 9);
        }
    }
};
</script>

<style lang="scss" scoped>
.image {
	cursor: pointer;
}
</style>