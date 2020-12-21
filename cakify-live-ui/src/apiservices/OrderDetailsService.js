import apiClient from "@/shared/axios";
import apimapping from "@/shared/apimapping.js";

export default {
    getOrderDetailsByOrderId
};


function getOrderDetailsByOrderId(orderId){
    return apiClient.get(apimapping.GET_ORDER_DETAILS_BY_ORDER_ID +orderId);
  }