<template>
<div>
    <section>
        <div >
            <div v-for="i in [currentIndex]" :key="i">
                    <img :src="currentImg" alt=""/>
            </div>
        </div>
    </section>
</div>
</template>

<script>

export default {
    data(){
        return {
             images: [
                "https://images.unsplash.com/photo-1559620192-032c4bc4674e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
                "https://images.unsplash.com/photo-1562440499-64c9a111f713?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
                "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
                "https://images.unsplash.com/photo-1565661834013-d196ca46e14e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
                "https://images.unsplash.com/photo-1535141192574-5d4897c12636?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                "https://images.unsplash.com/photo-1484300681262-5cca666b0954?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
                "https://images.unsplash.com/photo-1551879403-6adb554966fd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
                "https://images.unsplash.com/photo-1586958210659-1ff4ebe7b33c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
                "https://images.unsplash.com/photo-1594300907312-c6603f83b2c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
            ],
            timer: null,
            currentIndex: 0
        }
    },
    mounted() {
        this.startSlide();
    },
     methods: {
        startSlide() {
            this.timer = setInterval(this.next, 4000);
        },
        next() {
            this.currentIndex += 1;
        },
    },
    computed: {
        currentImg() {
            return this.images[Math.abs(this.currentIndex) % this.images.length];
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
