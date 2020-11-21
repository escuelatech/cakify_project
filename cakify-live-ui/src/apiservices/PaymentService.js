import apiClient from "@/shared/axios";
import apimapping from "@/shared/apimapping.js";

export default {
  buyNow,
};


function buyNow(params) {
  console.log('buy now: ', JSON.stringify(params));
  return apiClient.post(apimapping.BUY_NOW, params);
}