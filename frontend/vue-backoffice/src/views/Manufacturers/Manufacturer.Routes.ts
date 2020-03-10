export default {
  path: '/manufacturers',
  name: 'manufacturers',
  component: () => import(/* webpackChunkName: "Manufacturers" */ './Manufacturers.vue'),
  children: [
    {
      path: 'add',
      name: 'manufacturers-add',
      component: () => import(/* webpackChunkName: "Manufacturers" */ './ManufacturerAdd.vue')
    },
    {
      path: 'edit/:id',
      name: 'manufacturers-edit',
      component: () => import(/* webpackChunkName: "Manufacturers" */ './ManufacturerEdit.vue')
    }
  ]
}
