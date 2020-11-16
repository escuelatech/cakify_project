<template>
<div>
    <section id="banner">
        <div class="content text-justify">
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
                loved ones feel special with a cake delivery. 
            </p>
            <!-- <p>
                Special occasions are important, and when you can't be with your loved ones it can be difficult. Sending them a cake 
                lets them know you're thinking about them and wish you could be there. The heartfelt gesture is something that will be remembered forever.
            </p> -->
            
        </div>
            <span class="image object">
                    <Slider />
            </span>
    </section>
    <section>
        <div>
            <form>
                <div class="row gtr-uniform">
                    <div class="col-6 col-12-xsmall">
                        <select 
                            v-model="selectedBakeryLocation" 
                            class="col-12 col-12-xsmall" 
                            @change="onChange(selectedBakeryLocation)"
                        >
                            <option value="null" disabled >Select location</option>
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
                            <option value="null" disabled >Select town</option>
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
            </form>
        </div>
    </section>
    <!-- <div v-show="displayBakery">
        <BakeryPage :town="townName" />
    </div> -->
      
</div>
</template>

<script>
// import BakeryPage from "@/components/View/services/LandingPage/BakeryPage.vue"
import cakifyAdminService from "@/apiservices/cakifyAdminService.js";
import Slider from "@/components/View/services/slider/Slider.vue";

export default {
    components: { 
        Slider,
        // BakeryPage
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
        }
    },
    mounted(){
        this.displayLocations();
    },
    methods: {
        displayLocations(){
            cakifyAdminService.getLocations()
                .then(response => {
                    this.locations = response.data.data;
                    console.log('Locations: ', this.locations)
                   
                })
                .catch(error => {
                    console.log('Error in location api: ', error.response)
                })
        },
        displayTowns(){
            cakifyAdminService.getBakeryTowns(this.selectedLocation)
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
            this.$router.push({name: 'BakeryPage', params: {name: this.townName}});

        }
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
</style>