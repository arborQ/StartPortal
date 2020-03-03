<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <router-link to="/">
        <v-btn text>
          <span class="mr-2">Start Portal</span>
        </v-btn>
      </router-link>
      <v-spacer></v-spacer>

      <router-link to="/login" v-if="!isAuthorized()">
        <v-btn text>
          <span class="mr-2">Login</span>
          <v-icon>mdi-account-key-outline</v-icon>
        </v-btn>
      </router-link>
      <v-btn text v-if="isAuthorized()" @click="logout">
          <span class="mr-2">Logout</span>
          <v-icon>mdi-account-remove-outline</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import store from '@/store'
import router from '@/router'

export default Vue.extend({
  name: 'App',

  components: {
  },

  data: () => ({
    ...mapState({
      isAuthorized: (state: any) => state.isAuthorized
    }),
    logout: () => {
      store.commit('logout')
      router.replace('/login')
    }
  })
})
</script>
