<template>
    <div>
  <v-app>
    
     <div>
     <header class="major">
        <h2>Search</h2>
      </header>
         <!--<form>
              <div class="row gtr-uniform box">
                  <div class="col-6 col-12-xsmall">
                  <select  class="col-12 col-12-xsmall boxBorder" v-model="searchCakeByType"  @change="onChange(searchCakeByType)">
                     <option value="null" disabled >Search your cake by type</option>
                     <option v-for="cakeType in cakeTypes" :key="cakeType.id" :value="cakeType">{{cakeType.type}}</option>
                  </select>
                  </div>
                <div class="col-6 col-12-xsmall ">
                    <select class="  col-12 col-12-xsmall boxBorder" v-model="searchCakeByName"  @change="getaselectedCakeByName(searchCakeByName)">
                        <option value="null" disabled >Search your cake by name</option>
                        <option v-for="cake in cakeListOfLoggedInBakery" :key="cake.cakeId" :value="cake">{{cake.cakeName}}</option>
                    </select> 
                </div>
              </div>

          </form>-->
        </div>
       
        
        <div>
          <form @submit.prevent="findSesrchedCake">
                <div class="row gtr-uniform box">
                  <div class="col-6 col-12-xsmall">
                  <label>Your cake type </label>
                 <vue-bootstrap-typeahead
                      class="mb-4"
                      v-model="queryByType"
                      :data=" cakeTypes"
                      :serializer="(cakeTypes) => cakeTypes.type"
                      @hit="selectedTypes = $event"
                    
                    />
                     </div>
                    <div class="col-6 col-12-xsmall">
                     <label>Your cake name </label>
                     <vue-bootstrap-typeahead
                      class="mb-4"
                      v-model="queryByName"
                      :data="cakeListOfLoggedInBakery"
                      :serializer="(cakeListOfLoggedInBakery) => cakeListOfLoggedInBakery.cakeName"
                      @hit="selectedCakes = $event"
                     
                    />
                   
                  </div>
                  <div class="col-12">
                    
                    <ul class="actions">
                      <li>
                        <input
                          type="submit"
                          value="FIND"
                          class="primary"
                        />
                      </li>
                
                    </ul>
                  </div>
                
                </div>
              </form>
             
             <!-- <div class="posts">
                  <article v-for="cake in cakeListOfLoggedInBakery"
                    :key="cake.cakeId"
                    :value="cake"  >
                    <a href="#" class="image">
                      <img
                        height="300"
                        width="150"
                        :src="cake.cakeImage"
                        alt=""
                      />
                    </a>-->
                   <!-- <h3>{{ cake.bakeryEmail }}</h3>-->
                   <!-- <h3>{{ cake.cakeName }}</h3>
                    <h3>Price: {{ cake.cakePrice }}</h3>
                    <p>{{ cake.description }}</p>-->
                  <!--  <button
                      class="primary"
                      @click="
                        $router.push({
                          name: 'EditCake',
                          params: { cakeId: cake.cakeId },
                        })
                      "
                    >
                      View
                    </button>-->
                 
               <!--  </article>
                </div>-->
              </div>
            
                <div class="box alt">
                   <header class="major">
                         <h2>Cakes in your account</h2>
                    </header>
                  <div class="row gtr-50 gtr-uniform">
                     <div  class="col-4" v-for="cake in cakeListOfLoggedInBakery" :key="cake.cakeId" :value="cake">
                         <span class="image fit">
                             <div class="container">
                                    <img :src="cake.cakeImage" alt="" >
                                    <h4><span>{{cake.cakeName}}</span></h4>
                               </div>
                             <!--  <h1>{{cake.cakeType}}</h1>-->
                           </span>
                       </div>
                    </div>
      
        </div>



           
  </v-app>
      </div>
    
  </template>

<script>
// import SearchPageServices from "@/apiservices/SearchPageServices.js"
import cakifyAdminService from "@/apiservices/cakifyAdminService.js"
import VueBootstrapTypeahead from "vue-bootstrap-typeahead";
    export default {
        data(){
            return {
            cakeListOfLoggedInBakery:[],
            cakeTypes : [{"id": 1, "type": "Custom"},
            {"id": 2, "type": "Valentines"},
            {"id": 3, "type": "Birthday"},
            {"id": 4, "type": "Anniversary"}],
            // searchCakeByType:"",
            // searchCakeByName:"",
            cake:"",
            bakeryEmail:"",
            cakeListByNameSearch:[],
            queryByName:"",
            queryByType:""
            
            
            }
        },
        components:{
       
         VueBootstrapTypeahead
        },
        mounted(){
            this.bakeryEmail = JSON.parse(localStorage.getItem('email'));
            this.displayCakesOfLoggedInBakery();
        },
        methods:{
            // Displaying logged in bakeries cake list
            displayCakesOfLoggedInBakery(){
                cakifyAdminService.getCakeListForLoggedInBakery(this.bakeryEmail).then((response)=>{
                   this.cakeListOfLoggedInBakery = response.data.data;
                    console.log('Logged in Bakery CakeList', this.cakeListOfLoggedInBakery);
                }).catch((error)=>{console.log(error, 'error.response')})
                
            },
        //     onChange(value){
        //     console.log('onchange event', value.cakeType);
        //     this.selectedCakeByType = value.cakeType;   
        //     this.displayCakeName();
        // },
        //  displayCakeName(){
        //     cakifyAdminService.getCakeName(this.selectedCakeByType)
        //        .then(response => {
        //             this.cakeName = response.data.data;
        //             console.log('towns: ', this.cakeName)
        //         })
        //         .catch(error => {
        //             console.log('Error in towns api: ', error.response)
        //         })  
        // },
            // getaselectedCakeByName(value){
            // console.log('Cake by Name search: ', value.cakeName);
            // this.cakeName = value.cakeName;
            // console.log('Cake by Name search: ', this.cakeName);
            // this.showCakesByNameSerach(this.cakeName );
            // this.showSelectedBakeries = true;
            // this.$router.push({name: 'BakeryPage', params: {name: this.townName}});
        // },
        // showCakesByNameSerach(){
        //   cakifyAdminService. getCakeListForLoggedInBakery(this.cakeName)
        //         .then(response => {
        //           console.log(this.cakeName)
        //             this.cakeListByNameSearch = response.data.data;
        //             console.log('cake list by array: ', this.cakeListByNameSearch)
        //         })
        //         .catch(error => {
        //             console.log('error in displaying bakeries: ', error.response)
        //         })
        // }

        }
    }
</script>

<style lang="scss" scoped>
.image {
	cursor: pointer;
    max-width: 100%;
    height: 100%;
    width: auto;
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
    width:100%;
}
h4{
    position: absolute;
    top: 8px;
    left: 16px;
    color: rgb(250, 242, 242);
    padding-left: 5px;
    padding-top: 5px;
  
 
}




</style>