<template>
     <div>
        <v-app-bar 
        color="primary"
        dense 
        flat 
        dark
        >
            <v-toolbar-title>Register</v-toolbar-title>
        </v-app-bar>
        <v-container class="pt-0 pb-0">
            <v-row>
                <v-col cols="12">
                    <div class="text-center mt-10">
                        <img src="~/assets/thank3.png" alt="" width="236px">
                        <h1 class="text-title">Welcome , {{ names }}</h1>
                        <p class="mt-5 pl-8 pr-8"> 
                            welcome to the event, We hope you have a good time here. <br/> <br/> <br/> <br/>
                        </p>
                    </div>
                    <v-btn rounded color="primary" dark class="w-100 my-btn mt-11" @click="workshop">Register Workshop</v-btn>
                    <div class="w-100 text-center my-btn outlined text-primary mt-5" @click="close">Close</div>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {
    data() {
            return {
                names: this.$store.getters.getRegister.firstname
            }
        },
    methods: {
        workshop() {
            this.$router.push('/workshop')
        },
        close() {
            liff.closeWindow();
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
