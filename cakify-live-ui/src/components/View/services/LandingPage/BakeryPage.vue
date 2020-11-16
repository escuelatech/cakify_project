<template>
    <div>
        <div>
        <!-- Wrapper -->
        <div id="wrapper">
            <!-- Main -->
            <div id="main">
                <div class="inner">
                    <!-- Header -->
                    <Header />
                    <!-- Header -->
                    
                <section>
                    <div class="posts">
                        <article  v-for="bakery in bakeryList" :key="bakery.bakeryId">
                            <a href="#" class="image">
                                <img height="300" width="150"
                                    :src="bakery.bakeryLogo" alt="" />
                            </a>
                            <h3>{{bakery.bakeryname}}</h3>
                            <p>{{bakery.description}}</p>
                            <button class="primary" @click="$router.push({name: 'CakeListByBakery', params: {bakeryEmail: bakery.email}})">View</button> 
                        </article>
                    </div>
                </section>
                </div>
        </div>
        <!-- Main ends -->
         <!-- Sidebar -->
            <Sidebar />
        <!-- Sidebar -->
    </div>
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
        data(){
            return {
                bakeryList: [],
            }
        },
        props: ['townName'],
       
        created(){
            this.townName = this.$route.params.name;
            console.log('town name in bakery page: ', this.townName)
        },
        mounted(){
            this.showBakeries();
        },
        methods: {
             showBakeries(){
            cakifyAdminService.getBakeriesByLocation(this.townName)
                .then(response => {
                    this.bakeryList = response.data.data;
                    console.log('Bakery list: ', this.bakeryList)
                })
                .catch(error => {
                    console.log('error in displaying bakeries: ', error.response)
                })
        }, 
        }
    }
</script>

<style lang="scss" scoped>

</style>