<template>
<div>
    <div v-for="i in [currentIndex]" :key="i" class="quote">
        <blockquote>{{currentQuote}}</blockquote>
    </div>
</div>
</template>

<script>
    export default {
        data(){
            return {
                quotes: [
                    "Cake is a form of sweet food made from flour, sugar, and other ingredients, that is usually baked. In their oldest forms, cakes were modifications of bread, but cakes now cover a wide range of preparations that can be simple or elaborate, and that share features with other desserts such as pastries, meringues, custards, and pies.",
                    "The most commonly used cake ingredients include flour, sugar, eggs, butter or oil or margarine, a liquid, and leavening agents, such as baking soda or baking powder. Common additional ingredients and flavourings include dried, candied, or fresh fruit, nuts, cocoa, and extracts such as vanilla, with numerous substitutions for the primary ingredients. Cakes can also be filled with fruit preserves, nuts or dessert sauces (like pastry cream), iced with buttercream or other icings, and decorated with marzipan, piped borders, or candied fruit.",
                    "The term 'cake' has a long history. The word itself is of Viking origin, from the Old Norse word 'kaka'.",
                    "The history of cake dates back to ancient times. The first cakes were very different from what we eat today. They were more bread-like and sweetened with honey. Nuts and dried fruits were often added. According to the food historians, the ancient Egyptians were the first culture to show evidence of advanced baking skills. The Oxford English Dictionary traces the English word cake back to the 13th century. It is a derivation of 'kaka', an Old Norse word. Medieval European bakers often made fruitcakes and gingerbread. These foods could last for many months.",
                    "According to the food historians, the precursors of modern cakes (round ones with icing) were first baked in Europe sometime in the mid-17th century. This is due to primarily to advances in technology (more reliable ovens, manufacture/availability of food molds) and ingredient availability (refined sugar). At that time cake hoops--round molds for shaping cakes that were placed on flat baking trays--were popular. They could be made of metal, wood or paper. Some were adjustable. Cake pans were sometimes used. The first icing were usually a boiled composition of the finest available sugar, egg whites and [sometimes] flavorings. This icing was poured on the cake. The cake was then returned to the oven for a while. When removed the icing cooled quickly to form a hard, glossy [ice-like] covering. Many cakes made at this time still contained dried fruits (raisins, currants, citrons)."

                ],
                timer: null,
                currentIndex: 0
            }
        },
        mounted: function() {
            this.startSlide();
        },

        methods: {
            startSlide: function() {
            this.timer = setInterval(this.next, 4000);
            },

            next: function() {
            this.currentIndex += 1;
            },
        },

        computed: {
            currentQuote: function() {
            return this.quotes[Math.abs(this.currentIndex) % this.quotes.length];
            }
        }
    }
</script>

<style lang="scss" scoped>
.quote{
    width: 60%;
    margin: 0px auto;
    text-align: justify;
}
</style>