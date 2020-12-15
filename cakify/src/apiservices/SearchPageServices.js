
import apiClient from "@/shared/axios";
// import apiMutipartClient from "@/shared/axios";


export default {
    getCakeListForLoggedInBakery,
    getCakeListByTypeForLoggedInBakery

};

// list all the cakes by type for the logged in bakery
function getCakeListByTypeForLoggedInBakery(email,caketype){
    return apiClient.get('/cakes/find/by/type/'+caketype+'?bakeryemail='+email)
   }
// List  all the cakes for the logged in bakery
function getCakeListForLoggedInBakery(email){
    return apiClient.get('/cakes/find/by/bakery?bakeryemail='+email)
   }