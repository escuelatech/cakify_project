import apiClient from "@/shared/axios";
import apiMutipartClient from "@/shared/axios";

export default {
  addCake,
  uploadImage,
  bakeryregister,
  login,
  getCake,
  getImage,
  getAllCakes,
  buyNow,
  getBakeriesByLocation,
  getCakeListFromSelectedBakery,
  getLocations,
  getBakeryTowns,
  getDates,
  getAllBakeries
};

function getAllCakes () {
  return apiClient.get("/api/cakes/fetchall");
}

function getCake (id) {
  return apiClient.get("/api/cakes/find/"+id);
}

function bakeryregister (params) {
  console.log(JSON.stringify(params));
  return apiClient.post("api/bakery/register", params);
}


function addCake (params) {
  console.log(JSON.stringify(params));
  return apiClient.post("/api/cakes/add", params);
}

function uploadImage(params){
  console.log(JSON.stringify(params));
  return apiMutipartClient.post("/api/upload2", params);
}

function getImage () {
  return apiMutipartClient.get("/api/upload2");
}

function buyNow(params) {
  console.log('buy now: ', JSON.stringify(params));
  return apiClient.post("/api/payment/initiate", params);
}

//not using this api now
// function getBakeries(email) {
//   return apiClient.get('/api/bakery/find?bakeryemail='+email);
// }

function getBakeriesByLocation(location){
  return apiClient.get('/api/bakery/find/by/location?location='+location)
}

function getCakeListFromSelectedBakery(email){
  console.log('from admin service', email)
  return apiClient.get('/api/cakes/find/by/bakery?bakeryemail='+email)
}

function getLocations(){
  return apiClient.get('/api/utils/locations');
}

function getBakeryTowns(id){
  return apiClient.get('/api/utils/towns/'+id);
}

function getDates(){
  return apiClient.get('/api/utils/futuredates');
}

function getAllBakeries(){
  return apiClient.get('/api/bakery/getall');
}

async function login (email, password) {
  console.log(email);
  console.log(password);
  const response = await apiClient.post("/api/user/login", { email: email, passWord: password })
  if (response.data.token !== null) {
    localStorage.setItem('token', JSON.stringify(response.data.token));
    localStorage.setItem('email', JSON.stringify(email));
  } else {
    return Promise.reject("Wrong credentials");
  }
  return response;
}

// function logout () {
//   localStorage.removeItem('token');
//   localStorage.removeItem('email');
// }