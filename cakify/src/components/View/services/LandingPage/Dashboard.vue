<template>
    <div>
        <h1>Dashboard</h1>
        <div class="box alt">
            <div class="row gtr-50 gtr-uniform">
                <div class="col-4">
                    <span class="image fit">
                        <div class="box icon-container box1" @click="$router.push({name: 'OrderDetails'})">
                            <h3>Your Orders</h3>
                            <div class="icon-container">
                                <i class="fas fa-inbox fa-3x"></i>
                            </div>
                            <h1>10</h1>
                            
                        </div>
                    </span>
                </div>
                
                 <div class="col-4">
                    <span class="image fit">
                         <div class="box icon-container box2">
                            <h3>Payment Received</h3>
                            <div class="icon-container">
                                <i class="fas fa-rupee-sign fa-3x"></i>
                            </div>
                            <h1>10000</h1>
                            
                        </div>
                    </span>
                </div>
                 <div class="col-4">
                    <span class="image fit">
                        <div class="box icon-container box3">
                            <h3>Payment Received</h3>
                            <div class="icon-container">
                                <i class="fas fa-rupee-sign fa-3x"></i>
                            </div>
                            <h1>10000</h1>
                            
                        </div>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import OrderDetailsPage from "@/components/View/services/order_details/OrderDetailsPage.vue";

    export default {
        
    }
</script>

<style lang="scss" scoped>

.icon-container{
    text-align: center;
    color: white;
    cursor: pointer;
}
.box1{
    background-color: DarkCyan;
}
.box2{
    background-color: IndianRed;
}
.box3{
    background-color: DodgerBlue;
}
h3, h1{
    color: white;
}
h3{
    border-bottom: 5px solid white;
}


</style>