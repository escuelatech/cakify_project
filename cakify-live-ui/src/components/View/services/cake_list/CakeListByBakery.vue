<template>
    <div>
        <br>
        <ul class="actions">
                <li>
                    <input type="button" value="Back" class="primary" 
                        @click="$router.push({name: 'SearchPage'})"
                    >
                </li>
        </ul>
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
        <!-- <div class="row gtr-uniform box">
            <div class="col-6 col-12-xsmall">
                <vue-bootstrap-typeahead class="mb-4" 
                    v-model="typeOfCake" 
                    :data="cakeList"
                    :serializer="cake => cake.cakeType"
                    @hit="selectedCake=$event"
                    placeholder="Search cake type"
                />
            </div>
        </div> -->
        <br>
        <div>
        <div class="row gtr-uniform">
            <div class="col-6 col-12-xsmall">
                <select 
                    v-model="typeOfCake" 
                    class="col-12 col-12-xsmall" 
                    @change="onChange(typeOfCake)"
                >
                    <option value="null" disabled >Select the type of cake</option>
                    <option v-for="cakeType in type" :key="cakeType" :value="cakeType">
                        {{ cakeType }}
                    </option>
                </select> 
            </div>
        </div>
        </div>
        <br>
        <br>
        <section>
            <!-- <div class="posts">
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
            </div> -->
             <div class="row gtr-50 gtr-uniform">
                <div class="col-4" v-for="cake in cakeList" :key="cake.cakeId">
                    <span class="image fit">
                        <div class="container">
                            <img 
                                :src="cake.cakeImage" 
                                alt="" 
                                :title="cake.description"
                                @click="$router.push({name: 'CakeDetails', params: {cakeId: cake.cakeId}})"
                            >
                            <div class="content">
                                <h4><span>{{cake.cakeName}}</span></h4>
                                <p>Price:   <i class="fas fa-rupee-sign"></i>{{cake.cakePrice}}</p>
                            </div>
                        </div>
                    </span>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import CakifyAdminService from "@/apiservices/CakifyAdminService.js";
    export default {
        data(){
            return{
                bakeryEmail: '',
                cakeList: [],
                typeOfCake: null,
                type: ['Custom', 'Valentines', 'Birthday', 'Anniversary'],
                uniqueCakeType: ''
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
                CakifyAdminService.getCakeListFromSelectedBakery(this.bakeryEmail)
                    .then(response => {
                        this.cakeList = response.data.data;
                        console.log('cake list:' ,this.cakeList)
                    })
                    .catch(error => {
                        console.log('Error in listing cakes by bakery: ', error.response)
                    })
            },
        },
      

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
select {
    height: 50px;
}
.image.fit img {
    width: 100%;
    height: 275px;
}
.container{
    position: relative;
    width: 100%;
    margin: 0 auto; 
}

.container .content {
  position: absolute; 
  bottom: 0; 
  background: rgb(0, 0, 0); 
  background: rgba(0, 0, 0, 0.5); 
  color: white; 
  width: 91.7%; 
  padding: 20px; 
  margin-bottom: 10px;
}

h4{
    color: white;
}


</style>