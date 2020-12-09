import apiClient from "@/shared/axios";
import apiMutipartClient from "@/shared/axios";
import apimapping from "@/shared/apimapping.js";

export default {
  addCake,
  login,
  logout,
  getCake,
  getImage,
  getAllCakes,
  getCakeListFromSelectedBakery
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

function getCakeListFromSelectedBakery(email){
  return apiClient.get(apimapping.GET_CAKELIST_FROM_SELECTED_BAKERY+email)
}

async function login (email, password,profileImage) {
  const response = await apiClient.post(apimapping.LOGIN, {email:email, 
    passWord: password,socialLogin:"true",socialProfileImage:profileImage});
  if (response.data.token !== null) {
    console.log(JSON.stringify(response.data));
    localStorage.setItem('token', JSON.stringify(response.data.token));
    localStorage.setItem('email', JSON.stringify(email));
  } else {
    return Promise.reject("Wrong credentials");
  }
  console.log(JSON.stringify(response.data));
  return response;
}

function logout () {
  localStorage.removeItem('token');
  localStorage.removeItem('email');
  localStorage.removeItem('userInfo');
}