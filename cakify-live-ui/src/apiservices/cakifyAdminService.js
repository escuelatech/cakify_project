import apiClient from "@/shared/axios";
import apiMutipartClient from "@/shared/axios";
import apimapping from "@/shared/apimapping.js";

export default {
  addCake,
  login,
  getCake,
  getImage,
  getAllCakes,
  buyNow,
  getCakeListFromSelectedBakery,
  logout
};

function getAllCakes () {
  return apiClient.get(apimapping.GET_ALL_CAKES);
}

function getCake (id) {
  return apiClient.get(apimapping.GET_CAKE+id);
}

function addCake (params) {
  console.log(JSON.stringify(params));
  return apiClient.post(apimapping.ADD_CAKE, params);
}

function getImage () {
  return apiMutipartClient.get(apimapping.UPLOAD_IMAGE);
}

function buyNow(params) {
  console.log('buy now: ', JSON.stringify(params));
  return apiClient.post(apimapping.BUY_NOW, params);
}

//not using this api now
// function getBakeries(email) {
//   return apiClient.get('/api/bakery/find?bakeryemail='+email);
// }

function getCakeListFromSelectedBakery(email){
  console.log('from admin service', email)
  return apiClient.get(apimapping.GET_CAKELIST_FROM_SELECTED_BAKERY+email)
}

async function login (email, password) {
  console.log(email);
  console.log(password);
  const response = await apiClient.post(apimapping.LOGIN, { email: email, passWord: password })
  if (response.data.token !== null) {
    localStorage.setItem('token', JSON.stringify(response.data.token));
    localStorage.setItem('email', JSON.stringify(email));
  } else {
    return Promise.reject("Wrong credentials");
  }
  return response;
}

function logout () {
  localStorage.removeItem('token');
  localStorage.removeItem('email');
}