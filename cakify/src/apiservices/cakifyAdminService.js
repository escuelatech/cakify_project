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
  updateCake,
  logout
};
function getAllCakes () {
  return apiClient.get("/api/cakes/fetchall");
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
  console.log(JSON.stringify(params));
  return apiMutipartClient.post("/api/upload2", params);
}

function getImage () {
  return apiMutipartClient.get("/api/upload2");
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

function logout () {
  localStorage.removeItem('token');
  localStorage.removeItem('email');
}