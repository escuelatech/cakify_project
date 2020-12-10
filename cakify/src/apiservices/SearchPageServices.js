
import apiClient from "@/shared/axios";
// import apiMutipartClient from "@/shared/axios";


export default {
    getCakeListForLoggedInBakery,


};



function getCakeListForLoggedInBakery(email){
    return apiClient.get('/api/cakes/find/by/bakery?bakeryemail='+email)
   }