<template>
  <div :class="$style.container">
    <v-card v-bind:shaped="true" v-bind:loading="processing">
      <v-card-title>Logowanie</v-card-title>
      <v-card-subtitle>Znasz hasło?</v-card-subtitle>
      <v-form ref="form" v-model="valid" v-on:submit="authorize">
        <v-card-text :class="$style.form">
          <v-text-field v-model="login" :rules="requiredRules" label="Login" required></v-text-field>
          <v-text-field
            type="password"
            v-model="password"
            :rules="requiredRules"
            label="Hasło"
            required
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn
            type="submit"
            :loading="processing"
            :disabled="!valid"
            color="success"
            class="mr-4"
          >Zaloguj</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import store from '@/store'
import router from '@/router'
import { fetch } from '@/utils/fetch'

function validateIsRequired (value: string): string | null {
  if (!value) {
    return 'Value is required'
  }

  return null
}

@Component
export default class LoginView extends Vue {
  valid = false;
  processing = false;
  login = '';
  password = '';
  requiredRules = [validateIsRequired];
  async authorize (e: MouseEvent) {
    e.preventDefault()
    this.processing = true
    try {
      const { login, password } = this
      const { data } = await fetch.post('/api/login', { login, password })
      store.commit('authorize', { token: data.token })
      router.push('/manufacturers')
    } catch {
      this.processing = false
    }
  }
}
</script>

<style module>
.container {
  max-width: 450px;
  margin: 10px auto;
}
</style>
