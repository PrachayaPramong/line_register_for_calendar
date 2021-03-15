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
                    <div class="mt-8 text-primary text-title text-center">
                        Step 2 to 2
                    </div>
                </v-col>
                <v-col cols="12">
                    <v-form>
                        <p class="text-center text-main mb-0 mt-4"> Tell us more a bit </p>
                        <v-text-field
                            v-model="form.phone"
                            dense
                            :rules="phoneRules"
                            @keypress="onlyNumber($event ,10)"
                            label="Phone"
                        ></v-text-field>
                        <v-dialog ref="dialog" v-model="modal" persistent width="290px" class="set-birthday">
                            <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="form.birthday"
                                label="Birthday"
                                prepend-icon="event"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                            </template>
                            <v-date-picker :max="new Date().toISOString().substr(0, 10)" v-model="form.birthday" scrollable>
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                                <v-btn text color="primary" @click="$refs.dialog.save(form.birthday)">OK</v-btn>
                            </v-date-picker>
                        </v-dialog>
                        <p class="text-center text-main mb-0 mt-4"> Work Profile</p>
                        <v-text-field
                            v-model="form.company"
                            dense
                            label="Company"
                        ></v-text-field>
                        <v-text-field
                            v-model="form.position"
                            dense
                            label="Position"
                        ></v-text-field>
                        <v-btn rounded color="primary" dark class="w-100 mt-10 my-btn" @click="register">Register</v-btn>
                        <div class="w-100 text-center my-btn text-primary" @click="back">Back</div>
                    </v-form>
                </v-col>
            </v-row>
        </v-container>
    </div> 
</template>

<script>
const REGEX_PHONE = /^[0]([0-9]{9})*$/
const REGEX_NUMBER = /^[0-9]*$/
export default {
    data() {
        return {
            form:{
                phone: this.$store.getters.getRegister.phone,
                birthday: this.$store.getters.getRegister.birthday,
                company: this.$store.getters.getRegister.company,
                position: this.$store.getters.getRegister.position
            },
            phoneValidated:false,
            modal: false,
            phoneRules: [ value => this.phoneValidator(value)]    
        }
    },
    methods: {
        phoneValidator(value) {
            this.phoneValidated = false
            if(value == '') {
                return 'required'
            }
            if(REGEX_PHONE.test(value) && value.length == 10) {
                this.phoneValidated = true
                return true
            }
            return "Please input phonenumber"
        },
        onlyNumber(event, max){
            if(event.target.value.length == 0){
                if(event.key != 0){
                    return event.preventDefault();
                }
            } else{
                if(!REGEX_NUMBER.test(event.key) || event.target.value.length == max){
                    return event.preventDefault();
                }
            }
        },
        validate(){
            let validated = true
            const errors = []
            const validatorField = [
                'phone',
                'company',
                'position'
            ]
            validatorField.forEach((field) => {
                if(this.form[field] == '') {
                    validated = false
                    errors.push(`${field} can not be null`)
                }
            })
            if(!this.phoneValidated){
                validated = false
                errors.push('Please input phonenumber')
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
        back() {
            this.$router.push('/register')
        },
        register() {
            if(this.validate()){
                this.$store.dispatch('setRegister', this.form)
                this.$axios.patch(`https://register-a5f37-default-rtdb.firebaseio.com/members/${this.$store.getters.getLine.userId}/profile.json`, this.$store.getters.getRegister).then((res) => {
                this.$router.push('/register/done')
                }).catch(e => console.log(e))
            //console.log("Register")
            }
        }
    }
}
</script>


<style lang="scss" scoped>
    .v-form{
        padding: 0 20px;
    }
</style>

