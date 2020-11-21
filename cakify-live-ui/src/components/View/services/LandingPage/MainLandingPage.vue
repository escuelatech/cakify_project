<template>
<div>
    <!-- Wrapper -->
    <div id="wrapper">
        <!-- Main -->
        <div id="main">
            <div class="inner">
                <!-- Header -->
                <Header />
                <!-- Header -->
                <!-- Form -->
                <br>
                <!-- <section id="banner">
                    <div class="content text-justify">
                        <p>
                            A cake makes a great gift, especially for a birthday. It is an honor to receive a birthday cake from someone you love. 
                            A cake delivery is a heartfelt gesture, and ordering a cake online is easy. 
                            Send a cake now to make your loved ones day extra special.
                        </p>
                        <p>
                            With our online cake delivery, you can order a cake and have it delivered to them whether you're near or far.
                        </p>
                        <p>
                            We have many loyal customers who have been ordering from us year after year, and for this we are very grateful. We appreciate that they trust us to help make their
                            loved ones feel special with a cake delivery. Special occasions are important, and when you can't be with your loved ones it can be difficult. Sending them a cake 
                            lets them know you're thinking about them and wish you could be there. The heartfelt gesture is something that will be remembered forever.
                        </p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque tenetur accusantium labore id dolor atque laborum modi ipsa corrupti illum, ad sed non nam. Ut nemo saepe esse. Maxime veniam pariatur excepturi minus asperiores neque a? Nesciunt, impedit labore atque quia consequuntur dicta necessitatibus autem reiciendis iure id totam modi.</p>
                    </div>
                        <span class="image object">
                                <Slider />
                        </span>
                </section> -->
                 <div class="content text-justify">

                    <p>
                        <i><b>A cake makes a great gift, especially for a birthday.</b> It is an honor to receive a birthday cake from someone you love. 
                        A cake delivery is a heartfelt gesture, and ordering a cake online is easy. 
                        Send a cake now to make your loved ones day extra special.</i>
                    </p>
                    <p>
                       <i> With our online cake delivery, you can order a cake and have it delivered to them whether you're near or far.</i>
                    </p>
                </div>
                <div class="posts">
                    <article>
                        <a href="">
                            <Slider :images="secondImages"/>
                        </a>
                    </article>
                    <article>
                        <a href="">
                            <Slider :images="images" />
                        </a>
                    </article>
                </div>
               
                <div class="btn">
                    <button class="button primary" @click="$router.push({name: 'SearchPage'})">Continue to Bakery</button>
                </div>

                <Quotes />

                <!-- Form -->
            </div>
        </div>
        <!-- Main ends -->
         <!-- Sidebar -->
            <Sidebar />
        <!-- Sidebar -->
    </div>
</div>
</template>

<script>
import Header from "@/components/View/common/Header";
import Sidebar from "@/components/View/common/Sidebar";
import Slider from "@/components/View/services/slider/Slider.vue";
import Quotes from "@/components/View/services/quotes/Quotes.vue";

export default {
    components: {
        Header,
        Sidebar,
        Slider,
        Quotes
    },
    data(){
        return {
            images: [
                "https://images.pexels.com/photos/827513/pexels-photo-827513.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                "https://images.pexels.com/photos/461431/pexels-photo-461431.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                "https://images.pexels.com/photos/1120970/pexels-photo-1120970.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                "https://images.pexels.com/photos/3071821/pexels-photo-3071821.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                "https://images.pexels.com/photos/14107/pexels-photo-14107.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                "https://images.pexels.com/photos/4040696/pexels-photo-4040696.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            ],
            secondImages: [
                "https://images.unsplash.com/photo-1546856139-46fb2b57ff21?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
                "https://images.unsplash.com/photo-1600002415506-dd06090d3480?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
                "https://images.unsplash.com/photo-1574085733277-851d9d856a3a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
                "https://images.unsplash.com/photo-1601409751311-cbecfe223af4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
                "https://images.unsplash.com/photo-1563076429-c04cbe68da3a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
                "https://images.pexels.com/photos/45202/brownie-dessert-cake-sweet-45202.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            ],
            
        }
    }
};
</script>

<style>
.btn {
    margin: 0 auto;
    width: 100%;
}
</style>
