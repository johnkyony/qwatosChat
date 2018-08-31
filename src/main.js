// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import {store} from './store'
import firebase from 'firebase'


Vue.use(Vuetify, { theme: {
  primary: '#ee44aa',
  secondary: '#424242',
  accent: '#82B1FF',
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FFC107'
}})

var config = {
  apiKey: "AIzaSyBJbWXUkV8kaTCV9cQ99evfimBhohGnNTo",
  authDomain: "qwatoschat-d02bb.firebaseapp.com",
  databaseURL: "https://qwatoschat-d02bb.firebaseio.com",
  projectId: "qwatoschat-d02bb",
  storageBucket: "qwatoschat-d02bb.appspot.com",
  messagingSenderId: "831652407216"
};
firebase.initializeApp(config);



Vue.config.productionTip = false

/* eslint-disable no-new */
const unsubscribe = firebase.auth()
.onAuthStateChanged((firebaseUser) => {
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    created () {
      if (firebaseUser) {
        store.dispatch('autoSignIn', firebaseUser)
      }
    }
  })
  unsubscribe()
})
