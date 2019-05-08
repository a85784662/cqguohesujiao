import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index/index'
import goods from '@/components/goods/goods'
import introduce from '@/components/introduce/introduce'
import concat from '@/components/concat/concat'
import goodsdetails from '@/components/goodsdetails/goodsdetails'
import myaddr from '@/components/myaddr/myaddr'
 
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/toGoods',
      name: 'goods',
      component: goods
    },
    {
      path: '/toIntroduce',
      name: 'introduce',
      component: introduce
    },
    {
      path: '/toConcat',
      name: 'concat',
      component: concat
    },
    {
      path: '/toGoodsdetails',
      name: 'goodsdetails',
      component: goodsdetails
    },
    {
      path: '/toMyaddr',
      name: 'myaddr',
      component: myaddr
    }
  ]
})
