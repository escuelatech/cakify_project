import apiClient from "@/shared/axios";
import apimapping from "@/shared/apimapping.js";

export default {
  bakeryregister,
  getBakeriesByLocation,
  getBakeryLocations,
  getBakeryTowns,
  getDeliveryDates,
  getAllBakeries,
  getCakeListByTypeForRegisteredBakery
};

function bakeryregister (params) {
  console.log(JSON.stringify(params));
  return apiClient.post(apimapping.BAKERY_REGISTRATION, params);
}

function getBakeriesByLocation(location){
  return apiClient.get(apimapping.GET_BAKERIES_BY_LOCATION+location)
}

function getBakeryLocations(){
  return apiClient.get(apimapping.GET_BAKERY_LOCATIONS);
}

function getBakeryTowns(id){
  return apiClient.get(apimapping.GET_BAKERY_TOWNS+id);
}

function getDeliveryDates(){
  return apiClient.get(apimapping.GET_DELIVERY_DATES);
}

function getAllBakeries(){
  return apiClient.get(apimapping.GET_ALL_BAKERIES);
}
function getCakeListByTypeForRegisteredBakery(email,caketype){
  return apiClient.get('/cakes/find/by/type/'+caketype+'?bakeryemail='+email)
 }

