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
    
                <section>
                    <div>
                        <!-- <form> -->
                            <div class="row gtr-uniform">
                                <div class="col-6 col-12-xsmall">
                                    <select 
                                        v-model="selectedBakeryLocation" 
                                        class="col-12 col-12-xsmall" 
                                        @change="onChange(selectedBakeryLocation)"
                                    >
                                        <option value="null" disabled >Select your location</option>
                                        <option v-for="location in locations" :key="location.locationId" :value="location">
                                            {{ location.locationName }}
                                        </option>
                                    </select> 
                                </div>
                                <div class="col-6 col-12-xsmall">
                                    <select 
                                        v-if="selectedBakeryLocation"
                                        v-model="selectedTown" 
                                        class="col-12 col-12-xsmall"
                                        @change="getTownName(selectedTown)"
                                        
                                    >
                                        <option value="null" disabled >Where are you located in {{selectedBakeryLocation.locationName}} ?</option>
                                        <option 
                                            v-for="town in towns" 
                                            :key="town.townId" 
                                            :value="town" 
                                        >
                                            {{ town.townName }}
                                        </option>
                                    </select> 
                                </div>
                            </div>
                        <!-- </form> -->
                    </div>
                </section>
                <div class="box alt" v-show="!showSelectedBakeries">
                    <header class="major">
                         <h2>Below are the bakeries registered with us!</h2>
                    </header>
                   
                    <div class="row gtr-50 gtr-uniform">
                        <div class="col-4" v-for="bakery in bakeries.slice(0,9)" :key="bakery.bakeryId">
                            <span class="image fit">
                                <div class="container text-center ma-2">
                                    <img 
                                        :src="bakery.bakeryLogo" 
                                        alt="" 
                                        @click="snackbar = true"
                                    >
                                    <h4><span>{{bakery.bakeryname}}</span></h4>
                                    <v-snackbar
                                        v-model="snackbar"
                                    >
                                        {{ text }}

                                        <template v-slot:action="{ attrs }">
                                            <v-btn
                                            color="primary"
                                            text
                                            v-bind="attrs"
                                            @click="snackbar = false"
                                            >
                                            <i class="fas fa-times"></i>
                                            </v-btn>
                                        </template>
                                    </v-snackbar>
                                </div>
                               
                                <!--  @click="$router.push({name: 'CakeDetails', params: {cakeId: cake.cakeId}})" -->
                            </span>
                        </div>
                    </div>
                </div>
                 
                 <div class="box alt" v-show="showSelectedBakeries"  v-if="selectedTown" >
                    <header class="major">
                         <h2>Below are the bakeries in {{selectedTown.townName}}, {{selectedBakeryLocation.locationName}}</h2>
                    </header>
                    <div class="row gtr-50 gtr-uniform">
                        <div class="col-4" v-for="bakery in bakeryList" :key="bakery.bakeryId">
                            <span class="image fit">
                                <div class="container">
                                    <img 
                                        :src="bakery.bakeryLogo" 
                                        alt="" 
                                        @click="$router.push({name: 'CakeListByBakery', params: {bakeryEmail: bakery.email}})"
                                    >
                                    <h4><span>{{bakery.bakeryname}}</span></h4>
                                </div>
                            </span>
                        </div>
                    </div>
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
import CakifyAdminService from "@/apiservices/CakifyAdminService.js";
import BakeryService from "@/apiservices/BakeryService.js";
import Header from "@/components/View/common/Header";
import Sidebar from "@/components/View/common/Sidebar";

export default {
    components: { 
        Header,
        Sidebar
    },
    data(){
        return {
            selectedBakeryLocation: null,
            selectedTown: null,
            selectedLocation: null,
            townName:null,
            bakeryEmail: '',
            bakeryList: [],
            cakeList: [],
            locations: [],
            towns: [],
            cakes: [],
            showSelectedBakeries: false,
            bakeries: [],
            snackbar: false,
            text: `Please select your location`,
        }
    },
    mounted(){
        this.displayLocations();
        this.displayAllCakes();
        this.getAllBakeries();
    },
    methods: {
        displayLocations(){
            BakeryService.getBakeryLocations()
                .then(response => {
                    this.locations = response.data.data;
                    console.log('Locations: ', this.locations)
                   
                })
                .catch(error => {
                    console.log('Error in location api: ', error.response)
                })
        },
        displayTowns(){
            BakeryService.getBakeryTowns(this.selectedLocation)
               .then(response => {
                    this.towns = response.data.data;
                    console.log('towns: ', this.towns)
                })
                .catch(error => {
                    console.log('Error in towns api: ', error.response)
                })  
        },
        onChange(value){
            console.log('onchange event', value.locationId);
            this.selectedLocation = value.locationId;   
            this.displayTowns();
        },
        getTownName(value){
            console.log('town name in search page: ', value.townName);
            this.townName = value.townName;
            this.showBakeries();
            this.showSelectedBakeries = true;
            // this.$router.push({name: 'BakeryPage', params: {name: this.townName}});
        },
        displayAllCakes() {
            CakifyAdminService.getAllCakes()
                .then(response => {
                    console.log("all Cakes: ", response.data.apiResponse);
                    this.cakes = response.data.apiResponse;
                })
                .catch(error => {
                    console.log('Error when displaying cakes in a grid: ', error.response);
                })
        },
         showBakeries(){
            BakeryService.getBakeriesByLocation(this.townName)
                .then(response => {
                    this.bakeryList = response.data.data;
                    console.log('Bakery list: ', this.bakeryList)
                })
                .catch(error => {
                    console.log('error in displaying bakeries: ', error.response)
                })
        }, 
        getAllBakeries(){
            BakeryService.getAllBakeries()
                .then(response => {
                    this.bakeries = response.data.data;
                    console.log('Bakery list: ', this.bakeryList)
                })
                .catch(error => {
                    console.log('error in displaying bakeries: ', error.response)
                })
        }, 
    },
    
};
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
// h4 { 
//    position: absolute; 
//    top: 200px; 
//    left: 0; 
//    width: 100%; 
// }
// h4 span { 
//    color: white; 
//    font: bold 24px/45px Helvetica, Sans-Serif; 
//    letter-spacing: -1px;  
//    background: rgb(0, 0, 0); /* fallback color */
//    background: rgba(0, 0, 0, 0.7);
//    padding: 10px; 
// }
h4{
    position: absolute;
    top: 8px;
    left: 16px;
    color: white;
    padding-left: 5px;
    padding-top: 5px;
}
</style>