import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import tumblr from 'tumblr.js'
const firebase = require('../firebaseConfig.js')

Vue.use(Vuex)

firebase.likesCollection.orderBy('createdOn', 'desc').onSnapshot(querySnapshot => {
    let likesArray = []

    querySnapshot.forEach(doc => {
        let like = doc.data()
        like.id = doc.id
        likesArray.push(like)
    })
    store.commit('setLikes' , likesArray)
})

firebase.conversationsCollection.orderBy('createdOn' , 'desc').onSnapshot(querySnapshot => {
    let conversationArray = []

    querySnapshot.forEach( doc => {
        let convo = doc.data()
        convo.id = doc.id
        conversationArray.push(convo)
    })

    store.commit('setConversations' , conversationArray)
})

export const store = new Vuex.Store({
    state: {
        appTitle: 'Qwatos',
        user: {},
        error: null,
        loading: false,
        qwatos: [],
        likes: [],
        conversations: []
      },
      mutations: {
        setUser (state, payload) {
          state.user = payload
        },
        setError (state, payload) {
          state.error = payload
        },
        setLoading (state, payload) {
          state.loading = payload
        },
        setQwatos (state , payload){
            state.qwatos = payload
        },
        setLikes (state , payload){
            state.likes = payload
        },
        setConversations (state, payload){
            state.conversations = payload
        }
      },
    actions: {
        userSignUp({commit , dispatch} , payload){
            commit('setLoading', true)
            firebase.auth.createUserWithEmailAndPassword(payload.email , payload.password).then(firebaseUser => {
                commit('setUser', {email: firebaseUser.user.email , id: firebaseUser.user.uid})
                dispatch('createUser' , {email: firebaseUser.user.email , id: firebaseUser.user.uid} )
                commit('setLoading' , false)
                router.push('/home')
                commit('setError' , null)
            }).catch(error => {
                commit('setError', error.message)
                commit('setLoading', false)
            })
        },
        createUser({commit} , payload){
            commit('setLoading' , true)
            firebase.usersCollection.doc(payload.id).set({
                email: payload.email
            })
        },
        userSignIn ({commit , dispatch} , payload){
            commit('setLoading', true)
            firebase.auth.signInWithEmailAndPassword(payload.email , payload.password).then(firebaseUser =>{
                commit('setUser', {email: firebaseUser.user.email , id: firebaseUser.user.uid})
                dispatch('loadQwatos')
                commit('setLoading', false)
                commit('setError', null)
                router.push('/home')
            }).catch(error => {
                commit('setError' , error.message)
                commit('setLoading', false)
            })
        },
        autoSignIn({commit} , payload){
            commit('setUser', {email: payload.email , id: payload.uid})
        },
        userSignOut({commit}){
            firebase.auth.signOut()
            commit('setUser' , null)
            router.push('/')
        },
        loadQwatos({commit}){
            commit('setLoading', true)
            const client = tumblr.createClient({ consumer_key: 'LdyvjSqikz1dpZdt73FzYssRpsyHIr6IwER4KMv8STB9A8eFBD' });
            client.blogPosts('wonderytho.tumblr.com', { type: 'photo', filter: 'raw' }, function (err, data) {                
                
              commit('setQwatos' , data)

            })
            commit('setLoading' , false)
        },
        likeQwatos({commit, state} , payload){
            commit('setLoading' , true)
            firebase.likesCollection.add({
                userId: state.user.id,
                providerId: payload.id,
                qwatoUrl: payload.photos[0].alt_sizes[0].url,
                tags: payload.tags,
                createdOn: new Date()
            })
            commit('setLoading', false)
        },
        startNewConvo({commit , state} , payload){
            commit('setLoading', true)
            firebase.conversationsCollection.add({
                userId: state.user.id,
                providerId: payload.id,
                qwatoUrl: payload.photos[0].alt_sizes[0].url,
                tags: payload.tags,
                active: true,
                createdOn: new Date()
            })
            commit('setLoading', false)
        },
        updateConversationStatus({commit} , payload){
            commit('setLoading', true)
            let activeStatus = payload.active
            if (activeStatus){
                activeStatus = false
            }else {
                activeStatus = true 
            }
            firebase.conversationsCollection.doc(`${payload.id}`).update({
                active: activeStatus
            })
            commit('setLoading', false)
        }
    },
    getters: {
        isAuthenticated (state){
            return state.user  !== null && state.user !== undefined
        },
        userLikedQwatos (state , getters){
            if (getters.isAuthenticated) {
                return state.likes.filter(likes => likes.userId === state.user.id)
            }
            
        },
        userConvo (state , getters) {
            if(getters.isAuthenticated){
                return state.conversations.filter( conversations => conversations.userId === state.user.id)
            }
            
        }
    }
})