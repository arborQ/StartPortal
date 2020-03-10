<template>
  <v-dialog
        persistent
        v-model="dialog"
        width="500"
      >
      <v-card>
          <v-card-title class="headline">Dodaj nowego producenta</v-card-title>

          <v-card-text>
            <v-input>
              <v-text-field v-model="name" label="Nazwa" solo></v-text-field>
            </v-input>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              color="green"
              text
              @click="cancelAction"
              :loading="processing"
              :disabled="processing"
            >
              Anuluj
            </v-btn>

            <v-btn
              color="green darken-2"
              text
              :loading="processing"
              :disabled="name.length <= 0"
              @click="createAction"
            >
              Dodaj
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import router from '@/router'
import { fetch } from '@/utils/fetch'

@Component
export default class ManufacturersAddView extends Vue {
  public dialog: boolean = true
  public name: string = ''

  cancelAction () {
    router.replace({ name: 'manufacturers' })
  }

  async createAction () {
    const response = await fetch.post<{ id: string }>('/api/manufacturers', { name: this.name })
    router.replace({ name: 'manufacturers-edit', params: { id: response.data.id } })
  }
}
</script>
