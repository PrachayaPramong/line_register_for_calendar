<template>
    <div>
        <v-app-bar color="primary" dense flat dark>
            <v-toolbar-title>Register</v-toolbar-title>
        </v-app-bar>
        <v-container class="pt-0 pb-0">
            <v-row>
                <v-col cols="12">
                    <div class="mt-8 text-primary text-title text-center">
                        Step 1 to 2
                    </div>
                </v-col>
                <v-col cols="12" class="text-center pb-0 profile-img">
                    <img v-if="profile.pictureUrl ==''" src="~/assets/register.png" alt="" width="155">
                    <img v-else :src ="profile.pictureUrl" alt="" width="155">
                </v-col>
                <v-col cols="12" class="text-center">
                    DisplayName: {{ profile.displayName }} <br/>
                    <!--{{ profile.userId }} <br/>
                    {{ profile.getDecodedIDToken }}-->
                </v-col>
                <v-col cols="12">
                    <v-form>
                        <v-text-field
                            v-model="form.firstname"
                            dense
                            label="First name"
                        ></v-text-field>
                        <v-text-field
                            v-model="form.lastname"
                            dense
                            label="Last name"
                        ></v-text-field>
                        <v-text-field
                            v-model="profile.getDecodedIDToken"
                            dense
                            :rules="emailRules"
                            label="Email"
                        ></v-text-field>
                        <div class="gender-group d-flex">
                                <p>Gender</p>
                            <div class="circle" :class="form.gender == 1 ? 'active' : ''" @click="chooseGender(1)"></div>
                                <p>Male</p>
                            <div class="circle" :class="form.gender == 2 ? 'active' : ''" @click="chooseGender(2)"></div>
                                <p>Female</p>
                        </div>
                        <v-btn rounded color="primary" dark class="w-100 mt-10 my-btn" @click="next">Next</v-btn>
                    </v-form>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>
const REGEX_EMAIL = /^(([^<>()[\]{}'^?\\.,!|//#%*-+=&;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
export default {
    mounted() {
        liff.init({
            liffId:'1655451651-KEb2x3x9'
        }).then(() =>{
            if(liff.isLoggedIn()){
                liff.getProfile().then(profile => {
                    //console.log(profile)
                    this.profile.pictureUrl = profile.pictureUrl ;
                    this.profile.displayName = profile.displayName ;
                    this.profile.userId = profile.userId ;
                    this.profile.getDecodedIDToken = liff.getDecodedIDToken().email ;
                    this.form.email = liff.getDecodedIDToken().email;
                    //console.log(liff.getDecodedIDToken().email);
                    this.$store.dispatch('setLine', profile);
                    this.isDone();
                })
            }else{
                liff.login()
            }
        })
    },
    computed: {
        getLine() {
            return this.$store.getters.getLine;
        }
    },
    data() {
        return {
            profile: {
                pictureUrl: '',
                displayName: '',
                userId: '',
                getDecodedIDToken: ''
            },
            form: {
                firstname: this.$store.getters.getRegister.firstname,
                lastname: this.$store.getters.getRegister.lastname,
                email: this.$store.getters.getRegister.email,
                gender: this.$store.getters.getRegister.gender
            },
            emailRules: [ value => this.emailValidator(value)],
            emailValidated: false        
        }
    },
    methods: {
        isDone() {
            this.$axios.get(`https://register-a5f37-default-rtdb.firebaseio.com/members/${this.$store.getters.getLine.userId}/profile.json`).then((res) => {
                if(res.data != null) {
                    this.$router.push('register/done');
                }
            });
        },
        emailValidator(value){
            this.emailValidated = false
            if(value == ''){
                return 'required'
            }
            if(REGEX_EMAIL.test(value)){
                this.emailValidated = true
                return true
            }
            return "Email is Invalid"
        },
        chooseGender(gender) {
            this.form.gender = gender
        },
        validate(){
            let validated = true
            const errors = []
            const validatorField = [
                'firstname',
                'lastname',
                'email',
                'gender'
            ]
            validatorField.forEach((field) => {
                if(this.form[field] == '') {
                    validated = false
                    errors.push(`${field} can not be null`)
                }
            })
            if(!this.emailValidated){
                validated = false
                errors.push('Please input email')
            }
            if(!validated) {
                this.dialog = true
                this.$store.dispatch('setDialog', {
                    isShow: true,   
                    title: 'Form is error',
                    message: errors.map((error) => error +'<br/>').join('')
                })

            }
            return validated
        },
        next(){
            //console.log(this.form.firstname);
            if(this.validate()) {
                this.$store.dispatch('setRegister', this.form)
                this.$router.push('/register/step2')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .v-form{
        padding: 0 20px;
    }
    .profile-img{
        img{
            border-radius: 50%;
        }
    }
    .gender-group{
        p{
            margin-bottom: 0;
            align-self: center;
            margin-right: 20px;
        }
        .circle{
            width:45px;
            height: 45px;
            background: rgb(155, 154, 152);
            color: #FFF;
            border-radius: 50%;
            position: relative;
            margin-right: 7px;
            &.active{
                background: rgb(250, 163, 1);
            }
        }
    }
</style>

