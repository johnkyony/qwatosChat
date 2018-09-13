<template>
  <v-layout align-space-around justify-space-around column>
    <v-flex xs12 sm6>    
        <v-container
          fluid
          grid-list-md
        >
          <v-layout row wrap>
            <v-flex
              v-for="card in cards"
              v-bind="{ [`xs${card.flex}`]: true }"
              :key="card.title"
            >
              <v-card>
                <v-img
                  :src="card.src"
                  height="200px"
                >
                  <v-container
                    fill-height
                    fluid
                    pa-2
                  >
                    <v-layout fill-height>
                      <v-flex xs12 align-end flexbox>
                        <span class="headline white--text" v-text="card.title"></span>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-img>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn icon @click="likeQwatos(card)">
                    <v-icon>favorite</v-icon>
                  </v-btn>
                  <!-- <v-btn icon>
                    <v-icon>bookmark</v-icon>
                  </v-btn> -->
                  <v-btn icon @click="startConvo(card)">
                    <v-icon>share</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
     
    </v-flex>
  </v-layout>
</template>
<script>
import {store} from '@/store'
export default {
  computed:{
    cards(){
      return  this.$store.state.qwatos.posts.map(qwato => {
        let post = {}
        post.src = qwato.photos[0].alt_sizes[0].url
        post.id = qwato.id
        post.width = qwato.photos[0].alt_sizes[0].width
        post.height = qwato.photos[0].alt_sizes[0].height
        post.tags = qwato.tags
        if (qwato.photos[0].alt_sizes[0].width >= 500){
          post.flex = 12
        } else{
          post.flex = 6
        }
        
        return post
      })
    }
  },
  methods: {
    likeQwatos(qwato){
      store.dispatch('likeQwatos' , qwato)
    },
   startConvo(qwato){
     store.dispatch('startNewConvo' , qwato)
   }
  }
}
</script>