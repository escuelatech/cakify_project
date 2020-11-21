const GET_ALL_CAKES = "/api/cakes/fetchall";
const GET_CAKE = "/api/cakes/find/";
const BAKERY_REGISTRATION = "api/bakery/register";
const ADD_CAKE = "/api/cakes/add";
const UPLOAD_IMAGE = "/api/upload2";
const BUY_NOW = "/api/payment/initiate";
const GET_BAKERIES_BY_LOCATION = '/api/bakery/find/by/location?location=';
const GET_CAKELIST_FROM_SELECTED_BAKERY = '/api/cakes/find/by/bakery?bakeryemail=';
const GET_BAKERY_LOCATIONS = '/api/utils/locations';
const GET_BAKERY_TOWNS = '/api/utils/towns/';
const GET_DELIVERY_DATES = '/api/utils/futuredates';
const GET_ALL_BAKERIES = '/api/bakery/getall';
const LOGIN = "/api/user/login";

export default {
    GET_ALL_CAKES,
    GET_CAKE,
    BAKERY_REGISTRATION,
    ADD_CAKE,
    UPLOAD_IMAGE,
    BUY_NOW,
    GET_BAKERIES_BY_LOCATION,
    GET_CAKELIST_FROM_SELECTED_BAKERY,
    GET_BAKERY_LOCATIONS,
    GET_BAKERY_TOWNS,
    GET_DELIVERY_DATES,
    GET_ALL_BAKERIES,
    LOGIN

}