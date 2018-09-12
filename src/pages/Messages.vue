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
export default {
    props:['id'],
    data () {
      return {
        card_text: 'Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat.'
      }
    }
}
</script>
