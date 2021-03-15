<template>
  <div>
    <v-app-bar color="primary" dense flat dark>
      <v-toolbar-title>Workshop</v-toolbar-title>
    </v-app-bar> 
    <v-sheet elevation="6">
      <v-tabs
        grow
        v-model="tab"      
      >
        <v-tab
          v-for="item in agenda"
          :key="item.date"
        >
          {{ item.date }}
        </v-tab>
      </v-tabs>
    </v-sheet>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in agenda"
        :key="item.date"
      >
        <v-container class="pt-0">
          <v-row>
            <v-col cols="12" v-for="session in item.sessions" :key="session.title">
              <v-card class="agenda-card" :class="session.type == 'set' ? 'card-set': ''"> 
                <v-card-text v-if="session.type != 'set'">
                  <p class="time mb-0">Date {{item.date}} {{ session.time }}</p>
                  <v-row>
                    <v-col cols="4" class="text-center pt-2 pb-0 mt-2">
                      <img :src="session.image" alt="" class="agenda-image">
                    </v-col>
                    <v-col cols="8" class="pt-2 pb-0">
                      <v-card-title class="pl-0 pt-0 pb-3 text-primary text-title">{{ session.title }}</v-card-title>
                      <v-card-subtitle class="pl-0 pt-0 pb-0">Content : {{ session.content }}</v-card-subtitle>
                      <p class="mb-0"> By : {{ session.spaker }}</p>
                      <v-btn class="circle mt-2" :class="form.id_workshop == session.id ? 'active' : ''" @click="chooseCheck( session.id )"><v-icon>check</v-icon></v-btn>
                    </v-col>
                  </v-row>                  
                </v-card-text>
              </v-card>
            </v-col>              
          </v-row>
           <v-btn rounded color="primary" dark class="w-100 mt-10 my-btn" @click="submit">Submit</v-btn>
           <div class="w-100 text-center my-btn outlined text-primary mt-5" @click="close">Close</div>
        </v-container>        
      </v-tab-item>
    </v-tabs-items>   
  </div>
</template>

<script>
  export default {
    mounted() {
        liff.init({
            liffId:'1655451651-Qoq2j8jG'
        }).then(() =>{
            if(liff.isLoggedIn()){
                liff.getProfile().then(profile => {
                    console.log(profile)
                    this.profile.userId = profile.userId;
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
            return this.$store.getters.getLine
        }
    },
    data () {
      return {
        tab: null,
        profile: {
                userId: ''
            },
        form: {
                id_workshop: '',
            }
      }
    },
    asyncData({ store }){
      // apis
      return {
        agenda: store.getters.getAgenda
      }
    },
    methods: {
        isDone() {
            this.$axios.get(`https://register-a5f37-default-rtdb.firebaseio.com/members/${this.$store.getters.getLine.userId}/profile.json`).then((res) => {
                if(res.data == null) {
                    this.$router.push('register');
                }
            });
        },
        validate(){
            let validated = true
            const errors = []
            if(!this.id_workshop){
                validated = false
                errors.push('')
            }
            if(!validated) {
                this.dialog = true
                this.$store.dispatch('setDialog', {
                    isShow: true,   
                    title: 'Workshop has been saved.',
                    message: errors.map((error) => error +'<br/>').join('')
                })

            }
            return validated
        },
        chooseCheck(id_workshop) {
            this.form.id_workshop = id_workshop
            //this.profile.userId = profile.userId
            //this.form.profile = profile.userId
            //this.$store.dispatch('setCheck', this.profile)
            //this.$store.dispatch('setCheck', this.form)
        },
        submit() {
          this.$axios.patch(`https://register-a5f37-default-rtdb.firebaseio.com/members/${this.$store.getters.getLine.userId}/profile/workshop/${this.$store.getters.getCheck.id_workshop}.json`, this.$store.getters.getCheck)
          if(this.validate()) {
          }
            //console.log("Register")
        },
        close() {
            liff.closeWindow();
        }
    }
  }
</script>

<style lang="scss" scoped>
  .v-tabs{
    margin-bottom: 15px;
  }
  .v-tab{    
    color: #4D4D4D;
    font-weight: bold;
    background: #EFEFEF;
    &.v-tab--active{
      color: #1A56BE !important;      
    }    
    &+.v-tab{
      border-left: #BDBDBD solid 1px;
    }
  }
  .agenda-card{
    color: #4D4D4D;
    .time{
      color: #1A56BE;
      font-weight: bold;
    }
    .agenda-image{
      width: 120px;
      height: 120px;
      object-fit: cover;
      border-radius: 50%;
    }
    &+.agenda-card{
      margin-top: 15px;
    }
    &.card-set{
      border-left: 3px solid #1A56BE; 
      .v-card__text+.v-card__text{
        padding-top: 0 !important;
      }
    }
    hr{
      width: 100%;
      margin: 15px auto 0;
      height: 1px;
      background: #BDBDBD;
      border: 0;
    }
    .circle{
            width: 30% !important;
            height: 32px !important;
            min-width: auto !important;
            background: #BDBDBD;
            color: #FFF;
            //border-radius: 50%;
            position: relative;
            margin-right: 7px;
            &.active{
                background: rgb(250, 163, 1);
            }
        }
  }
</style>
