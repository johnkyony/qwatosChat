<template>
  <v-card>
        <v-container
          fluid
          grid-list-md
        >
          <v-layout row wrap>
            <v-flex
              v-for="qwato in qwatos" >
             
           
              <v-card>
                <v-img
                  :src="qwato.qwatoUrl"
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
                  <!-- <v-btn icon >
                    <v-icon>favorite</v-icon>
                  </v-btn> -->
                  <!-- <v-btn icon>
                    <v-icon>bookmark</v-icon>
                  </v-btn> -->
                  <v-btn icon>
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
      return  this.$store.getters.userLikedQwatos
    }
  }
}
</script>