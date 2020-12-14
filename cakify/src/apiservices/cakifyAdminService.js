import apiClient from "@/shared/axios";
import apiMutipartClient from "@/shared/axios";

export default {
  addCake,
  uploadImage,
  bakeryregister,
  login,
  getAllCakes,
  getImage,
  getCake,
  getCity,
  getLocation,
  updateCake,
  logout,
  getCakeListForLoggedInBakery,
  getAllOrderDetails
};

function getCakeListForLoggedInBakery(email){
 return apiClient.get('/api/cakes/find/by/bakery?bakeryemail='+email)
}

function getLocation (townId) {
  // console.log(JSON.stringify(townId));

  return apiClient.get("/api/utils/towns/"+townId);
} 

function getCity () {
  return apiClient.get("/api/utils/locations");
}

function getAllCakes () {
  return apiClient.get("/api/cakes/fetchall");
}

function getAllOrderDetails () {
  return apiClient.get("http://localhost:9090/payment/fetchallorderdetails");
}

function getCake (id) {
  return apiClient.get("/api/cakes/find/"+id);
}

function updateCake(params) {
  console.log('from cakifyAdminservice ',JSON.stringify(params))
  return apiClient.post('/api/cakes/update', params);
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
  // console.log(JSON.stringify(params));
  return apiMutipartClient.post("/api/upload2", params);
}

function getImage () {
  return apiMutipartClient.get("/api/upload2");
}


async function login (email, password) {
  console.log(email);
  // this.loggedInBakery=email;
  // console.log('loggedInBakery',this.loggedInBakery)
 
  
  // console.log(password);
  const response = await apiClient.post("/api/bakery/login", { email: email, passWord: password })
    if (response.data.token !== null) {
    localStorage.setItem('token', JSON.stringify(response.data.token));
    localStorage.setItem('email', JSON.stringify(email));
    // this.email=localStorage.getItem('email', JSON.stringify(email));
    // console.log(this.email)
    
  } else {
    return Promise.reject("Wrong credentials");
  }
  console.log(response,"response")
  return response;
}

function logout () {
  localStorage.removeItem('token');
  localStorage.removeItem('email');
 }
 