<template>
    <div>

<div>
         
              <header class="major">
                <h4>Search your cake </h4>
               </header>
             <form @submit.prevent="findSesrchedCake">
                <div class="row gtr-uniform box">
                  <div class="col-6 col-12-xsmall">
                 <vue-bootstrap-typeahead
                      class="mb-4"
                      v-model="query"
                      :data="loggedInBakeryCakeList"
                      :serializer="(cake) => cake.CakeType"
                      @hit="selectedCakes = $event"
                      placeholder="Search Your cakes by type"
                    />
                     <vue-bootstrap-typeahead
                      class="mb-4"
                      v-model="query"
                      :data="loggedInBakeryCakeList"
                      :serializer="(cake) => cake.cakeName"
                      @hit="selectedCakes = $event"
                      placeholder="Search Your cakes by name"
                    />
                  </div>
                  <div class="col-6 col-12-xsmall">
                    
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

              <div class="text-justify">
            <!-- Section -->
    
              <section>
                <div class="posts">
                  <article v-for="cake in loggedInBakeryCakeList"
                    :key="cake.cakeId"
                    :value="cake"
                    
                  >
                  
                    <a href="#" class="image">
                      <img
                        height="300"
                        width="150"
                        :src="cake.cakeImage"
                        alt=""
                      />
                    </a>
                   <!-- <h3>{{ cake.bakeryEmail }}</h3>-->
                   <!-- <h3>{{ cake.cakeName }}</h3>
                    <h3>Price: {{ cake.cakePrice }}</h3>
                    <p>{{ cake.description }}</p>-->
                    <button
                      class="primary"
                      @click="
                        $router.push({
                          name: 'EditCake',
                          params: { cakeId: cake.cakeId },
                        })
                      "
                    >
                      View
                    </button>
                 
                 </article>
                </div>
              </section>
           
              <div>
              </div>
            </div>
            </div>


    </div>
</template>

<script>
import cakifyAdminService from "@/apiservices/cakifyAdminService.js";
import VueBootstrapTypeahead from "vue-bootstrap-typeahead";
    export default {
      data(){
          return{
         cake: "",
        
         loggedInBakeryCakeList:[],
         query:"",
        //  queryName:"",
         cakes:"",
         cakeId: "1337",
         bakeryEmail:""
          }
      } ,
      components:{
          VueBootstrapTypeahead
      } ,
      created() {
       this.bakeryEmail = this.$route.params.bakeryEmail;
        },

      mounted() {
      this.displayLoggedInBakeryCakes();
       },


  methods:{
       displayLoggedInBakeryCakes() {
          cakifyAdminService
        .getCakeListForLoggedInBakery(this.bakeryEmail)
        .then((response) => {
          this.loggedInBakeryCakeList = response.data.data;
          console.log("Cakes: ", this.loggedInBakeryCakeList);
        
        })
        .catch((error) => {
          console.log("Error: ", error.response);
        });
    },
    //   getSelectedCake() {
    //   cakifyAdminService
    //     .getCake(this.cakeId)
    //     .then((response) => {
    //       this.cake = response.data.apiResponse;
    //       console.log("Selected Cake: ", this.cake);
    //       this.dialog = true;
    //     })
    //     .catch((error) => {
    //       console.log("Error", error.response);
    //     });
    // },

    findSesrchedCakeByType(){
     cakifyAdminService.getCake(this.cakeId)
        .then((response) => {
          this.cake = response.data.apiResponse;
          console.log("Selected Cake: ", this.cake);
          this.dialog = true;
        })
        .catch((error) => {
          console.log("Error", error.response);
        });

    }

  }
    }
</script>

<style lang="scss" scoped>

</style>