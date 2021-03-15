
export const state = () => ({
    dialog:{
        isShow: false,
        title: '',
        message: ''
    },
    line: {
        pictureUrl: '',
        displayName: '',
        userId: ''
        //email: ''
    },
    register: {
        firstname: '',
        lastname: '',
        email:'',
        gender: '',
        phone:'',
        birthday: new Date().toISOString().substr(0, 10),
        company:'',
        position:''
    },
    check: {
        id_workshop:''
    },
    data: {  
        agenda: [
          {
            date: "21 March 2020",
            sessions: [
              {
                title: "Amazon Jump",
                spaker: "Passive Selling Online Team Amazon",
                image: "https://leonyxstore.com/wp-content/uploads/2019/08/amazon_logo_500500._V323939215_.png",
                duringTime: "100 min",
                content: "Passive Selling Online",
                time: "Time : 09: 30 - 02: 30 PM",
                id:3016
              },
              {
                title: "Amzon Go",
                spaker: "Passive Selling Online Team Amazon",
                image: "https://leonyxstore.com/wp-content/uploads/2019/08/amazon_logo_500500._V323939215_.png",
                duringTime: "100 min",
                content: "Passive Selling Online",
                time: "Time : 09: 30 - 03: 30 PM",
                id:3017
              }
            ]
          },
          {
            date: "22 March 2020",
            sessions: [
              {
                title: "Facebook Ads",
                spaker: "Passive Selling Online Team ads",
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png",
                duringTime: "100 min",
                content: "Passive Selling Online",
                time: "Time : 09: 30 - 01: 30 PM",
                id:3018
              },
              {
                title: "Line Bot",
                spaker: "Passive Selling Online Team Line Developer",
                image: "https://miro.medium.com/max/3648/1*Z40RUlwMP9bQGorLNxxfIg.png",
                duringTime: "100 min",
                content: "Passive Selling Online",
                time: "Time : 10: 30 - 04: 30 PM",
                id:3019
              }
            ]
          },
          {
            date: "23 March 2020",
            sessions: [
              {
                title: "Shopee",
                spaker: "Passive Selling Online Team",
                image: "https://cdn-images-1.medium.com/max/1200/1*bc-9JmEtRiKTwVqHRTGqbQ.png",
                duringTime: "100 min",
                content: "Passive Selling Online",
                time: "Time : 10: 30 - 04: 30 PM",
                id:3020
              },
              {
                title: "Line Designer",
                spaker: "Passive Selling Online Team",
                image: "https://t.kfs.io/upload_images/104088/PPT_Cover_large_large.png",
                duringTime: "100 min",
                content: "Passive Selling Online",
                time: "Time : 01: 30 - 04: 30 PM",
                id:3021
              }
            ]
          }
        ],
    }
})
export const getters = {
    getRegister(state){
        return state.register
    },
    getDialog(state){
        return state.dialog
    },
    getLine(state){
        return state.line
    },
    getWorkshop(state){
        return state.data.workshop 
    },
    getAgenda(state){
      return state.data.agenda
    },
    getCheck(state){
      return state.check 
    },
    getTime(actions){
      return  actions
    }
}

export const mutations = {
    SET_REGISTER(state, data){
        state.register = {
            ...state.register,
            ...data
        }
    },
    SET_DIALOG(state, data){
        state.dialog = {
            ...state.dialog,
            ...data
        }
    },
    SET_LINE(state, data){
        state.line = {
            ...state.line,
            ...data
        }
    },
    SET_CHECK(state, data){
      state.check = {
          ...state.check,
          ...data
      }
  }
}

export const actions = {
    setRegister({ commit}, data){
        commit('SET_REGISTER', data)
    },
    setDialog({ commit}, data){
        commit('SET_DIALOG', data)
    },
    setLine({ commit}, data){
        commit('SET_LINE', data)
    },
    setCheck({ commit}, data){
        commit('SET_CHECK', data)
    },
    setTime ({ commit }) {
      commit('SETTIME', (new time()).getTime())
    }
}

