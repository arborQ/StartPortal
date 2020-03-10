<template>
  <div :class="$style.container">
    <v-card v-bind:shaped="true" v-bind:loading="processing">
      <v-card-title>Producenci: {{brands.length}}</v-card-title>
      <v-list shaped>
        <v-subheader>
          <v-text-field
            v-model="search"
            :append-icon="'mdi-playlist-plus'"
            @click:append="navigateToAddView"
            label="Szukaj..."
            solo
            v-on:input="searchByName"
            prepend-inner-icon="search"></v-text-field>
        </v-subheader>
        <v-list-item link v-for="(item, i) in brands" :key="i">
            <v-list-item-content>
                <v-list-item-title v-text="item.name"></v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <router-link :to="`/manufacturers/edit/${item.id}`">
                <v-icon>mdi-file-edit-outline</v-icon>
              </router-link>
            </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import store from '@/store'
import router from '@/router'
import { fetch } from '@/utils/fetch'

@Component
export default class ManufacturersView extends Vue {
  search: string = ''
  processing: boolean = false
  brands: StartApp.Manufacturers.IManufacturer[] = []

  navigateToAddView () {
    router.push({ name: 'manufacturers-add' })
  }

  async searchByName () {
    this.brands = await this.getManufacturers(this.search)
  }

  async created () {
    this.brands = await this.getManufacturers(this.search)
  }

  async getManufacturers (search: string): Promise<StartApp.Manufacturers.IManufacturer[]> {
    this.processing = true
    const { data } = await fetch.get<StartApp.Manufacturers.IManufacturersResponse>(`/api/manufacturers/?search=${search}`)
    this.processing = false

    return data.brands
  }
}
</script>

<style module lang="scss">
.container {
  max-width: 80%;
  margin: 10px auto;

    a::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }
}
</style>
