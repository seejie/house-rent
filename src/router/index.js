import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Propertys from '@/components/Propertys'
import maps from '@/components/common/maps.vue'
import invitation from '@/components/invitation'
import Detail from '@/components/Detail'
import zixun from '@/components/zixun'
import mapView from '@/components/mapView'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/Propertys',
      name: 'Propertys',
      component: Propertys
    },
    {
      path: '/maps',
      name: 'maps',
      component: maps
     },
    {
      path: '/invitation',
      name: 'invitation',
      component: invitation
    },
    {
      path: '/Detail',
      name: 'Detail',
      component: Detail
    }, {
      path: '/zixun',
      name: 'zixun',
      component: zixun
    }, {
      path: '/mapView',
      name: 'mapView',
      component: mapView
    }
  ]
})
