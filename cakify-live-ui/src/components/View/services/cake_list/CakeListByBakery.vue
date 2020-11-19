<template>
    <div>
        <!-- <h1>Cake</h1>
         <div class="box alt">
            <div class="row gtr-50 gtr-uniform">
                <div class="col-4" v-for="cake in cakeList" :key="cake.cakeId">
                    <span class="image fit">
                        <img :src="cake.cakeImage" alt="" @click="$router.push({name: 'CakeDetails', params: {cakeId: cake.cakeId}})">
                    </span>
                </div>
            </div>
        </div> -->
        <section>
                    <div class="posts">
                        <article v-for="cake in cakeList" :key="cake.cakeId">
                            <a href="#" class="image">
                                <img height="300" width="150"
                                    :src="cake.cakeImage" alt="" />
                            </a>
                            <h3>{{cake.cakeName}}</h3>
                            <p>Price:   <i class="fas fa-rupee-sign"></i>{{cake.cakePrice}}</p>
                            <p>{{cake.description}}</p>
                            <button class="primary" @click="$router.push({name: 'CakeDetails', params: {cakeId: cake.cakeId}})">View</button> 
                        </article>
                    </div>
                </section>
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
@media screen and (min-width: 736px)
{.posts article {
    margin: 0 0 4.5em 4.5em;
    width: calc(33% - 4.5em);
}

}
.image {
	cursor: pointer;
}


</style>