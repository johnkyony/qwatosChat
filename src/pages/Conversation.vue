<template>
<v-layout row>
    <v-flex xs12 sm6 offset-sm3>
     
       

        <v-list subheader>
          <v-subheader>Recent chat</v-subheader>
          <v-list-tile
            v-for="item in  activeConversation"
            
            avatar
            @click="conversationMessages(item)"
          >
            <v-list-tile-avatar>
              <img :src="item.qwatoUrl">
            </v-list-tile-avatar>

            <v-list-tile-content>
              
              <v-list-tile-title v-for="tag in item.tags" v-html="tag"></v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action @click="updateStatus(item)">
              <v-icon :color="item.active ? 'teal' : 'grey'">chat_bubble</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>

        <v-divider></v-divider>

        <v-list subheader>
          <v-subheader>Previous chats</v-subheader>

          <v-list-tile
            v-for="item in unActiveConversation"
            :key="item.title"
            avatar
            @click="conversationMessages(item)"
          >
            <v-list-tile-avatar>
              <img :src="item.qwatoUrl">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title v-for="tag in item.tags" v-html="tag"></v-list-tile-title>
            </v-list-tile-content>
             <v-list-tile-action @click="updateStatus(item)">
              <v-icon :color="item.active ? 'teal' : 'grey'">chat_bubble</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      
    </v-flex>
  </v-layout>
</template>
<script>
import {store} from '@/store'
  export default {
    computed: {
      activeConversation(){
       return this.$store.getters.userConvo.filter(conversation => conversation.active === true)
      },
      unActiveConversation(){
        return this.$store.getters.userConvo.filter( conversation => conversation.active === false)
      }
    },
    methods: {
      updateStatus(item){
        store.dispatch('updateConversationStatus' , item)
      },
      conversationMessages(item){
        console.log(item.id)
        this.$router.push({path: `/conversation/${item.id}/messages`})
      }
    }
  }
</script>