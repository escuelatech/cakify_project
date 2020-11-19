<template>
    <div>

<div>
           
              <header class="major">
                <h4>Search your cake </h4>
                {{ cake.cakeType }}
              </header>
             <form @submit.prevent="">
                <div class="row gtr-uniform box">
                  <div class="col-6 col-12-xsmall">
                   <!-- <vue-bootstrap-typeahead
                      class="mb-4"
                      v-model="query"
                      :data="cakeListOfLoggedInBakery"
                      :serializer="(cake) => cake.cakeName"
                      @hit="selectedCakes = $event"
                      placeholder="Search Your cakes by name"
                    />-->
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
            </div>
    </div>
</template>

<script>
import cakifyAdminService from "@/apiservices/cakifyAdminService.js";
// import VueBootstrapTypeahead from "vue-bootstrap-typeahead";
    export default {
      data(){
          return{
         cake: "",
         cakeListOfLoggedInBakery:"",
         query:"",
         cakes:"",
         cakeId: '',
          }
      } ,
      components:{
        //   VueBootstrapTypeahead
      } ,
      created(){
         this.bakeryEmail = JSON.parse(localStorage.getItem('email'));
         this.cakeId=this.$route.params.cakeId;
      },
      mounted() {
    // this.bakeryEmail = JSON.parse(localStorage.getItem('email'));
     this.displayLoggedInBakeryCakes();
    //  this.cakeId=this.$route.params.cakeId
    //  this.getSelectedCake();
  },
  methods:{
       displayLoggedInBakeryCakes() {
          cakifyAdminService
        .getCakeListForLoggedInBakery(this.bakeryEmail)
        .then((response) => {
          this.cakeListOfLoggedInBakery = response.data.data;
          console.log("Cakes: ", this.cakeListOfLoggedInBakery);
        })
        .catch((error) => {
          console.log("Error: ", error.response);
        });
    },
    //   getSelectedCake() {
    //   cakifyAdminService
    //     .getCake()
    //     .then((response) => {
    //       this.cake = response.data.apiResponse;
    //       console.log("Selected Cake: ", this.cake);
    //       this.dialog = true;
    //     })
    //     .catch((error) => {
    //       console.log("Error", error.response);
    //     });
    // },

  }
    }
</script>

<style lang="scss" scoped>

</style>