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
  getAllOrderDetails,
  getOrderDetailsByOrderId
};

function getLocation (townId) {
  return apiClient.get("/utils/towns/"+townId);
} 

function getCity () {
  return apiClient.get("/utils/locations");
}

function getAllCakes () {
  return apiClient.get("/cakes/fetchall");
}

function getAllOrderDetails () {
   return apiClient.get("/bakery/fetchallorderdetails");
}

function getOrderDetailsByOrderId(orderId){
  return apiClient.get("/bakery/findcakeorderbyorderid/"+orderId);
}

function getCakeListForLoggedInBakery(email){
  return apiClient.get('/cakes/find/by/bakery?bakeryemail='+email)
}
 

function getCake (id) {
  return apiClient.get("/cakes/find/"+id);
}

function updateCake(params) {
  console.log('from cakifyAdminservice ',JSON.stringify(params))
  return apiClient.post('/cakes/update', params);
}

function bakeryregister (params) {
  console.log(JSON.stringify(params));
  return apiClient.post("/bakery/register", params);
}


function addCake (params) {
  console.log(JSON.stringify(params));
  return apiClient.post("/cakes/add", params);
}

function uploadImage(params){
  return apiMutipartClient.post("/upload2", params);
}

function getImage () {
  return apiMutipartClient.get("/upload2");
}


async function login (email, password) {
  const response = await apiClient.post("/bakery/login", { email: email, passWord: password })
    if (response.data.token !== null) {
    localStorage.setItem('token', JSON.stringify(response.data.token));
    localStorage.setItem('email', JSON.stringify(email));
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
 