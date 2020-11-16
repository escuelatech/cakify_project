import apiClient from "@/shared/axios";

export default {
  bakeryregister,
  getBakeriesByLocation,
  getLocations,
  getBakeryTowns
};

function bakeryregister (params) {
  console.log(JSON.stringify(params));
  return apiClient.post("api/bakery/register", params);
}

function getBakeriesByLocation(location){
  return apiClient.get('/api/bakery/find/by/location?location='+location)
}

function getLocations(){
  return apiClient.get('/api/utils/locations');
}

function getBakeryTowns(locationId){
    return apiClient.get('/api/utils/towns/'+locationId)
  }

