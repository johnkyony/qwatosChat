<template>
  <v-card>
        <v-container
          fluid
          grid-list-md
        >
          <v-layout row wrap>
            <v-flex
              v-for="qwato in qwatos"
             
            >
              <v-card>
                <v-img
                  :src="qwato.photos[0].alt_sizes[0].url"
                  height="300px" width="300px"
                >
                  <v-container
                    fill-height
                    fluid
                    pa-2
                  >
                    
                  </v-container>
                </v-img>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn icon @click="likeQwatos(qwato)">
                    <v-icon>favorite</v-icon>
                  </v-btn>
                  <!-- <v-btn icon>
                    <v-icon>bookmark</v-icon>
                  </v-btn> -->
                  <v-btn icon @click="startConvo(qwato)">
                    <v-icon>share</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
</template>

<script>
import {store} from '@/store'
export default {
  computed:{
    qwatos(){
      return  this.$store.state.qwatos.posts
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