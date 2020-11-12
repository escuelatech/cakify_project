<template>
    <div>
        <h1>Cake</h1>
         <div class="box alt">
            <div class="row gtr-50 gtr-uniform">
                <div class="col-4" v-for="cake in cakeList" :key="cake.cakeId">
                    <span class="image fit">
                        <img :src="cake.cakeImage" alt="" @click="$router.push({name: 'CakeDetails', params: {cakeId: cake.cakeId}})">
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import cakifyAdminService from "@/apiservices/cakifyAdminService.js";
    export default {
        data(){
            return{
                bakeryEmail: '',
                cakeList: []
            }
        },
        created(){
            this.bakeryEmail = this.$route.params.bakeryEmail;
        },
        mounted(){
            this.displayCakesByBakery();
        },
        methods: {
            displayCakesByBakery(){
                cakifyAdminService.getCakeListFromSelectedBakery(this.bakeryEmail)
                    .then(response => {
                        this.cakeList = response.data.data;
                        console.log('cake list:' ,this.cakeList)
                    })
                    .catch(error => {
                        console.log('Error in listing cakes by bakery: ', error.response)
                    })
            },
        }

    }
</script>

<style lang="scss" scoped>
.image {
	cursor: pointer;
}
</style>