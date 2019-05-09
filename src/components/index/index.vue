<template>
  <div class="index-coat">
    <headtop></headtop>
    <navigation pronavigationId="0"></navigation>
    <div class="scroll-cnt">
    <div class="coat-cnt">
      <div class="goods-title">
        <p>产品推荐</p>
      </div>
      <div class="goods-wrap">
          <div class="goods" :class="{hot:item.hot }" @click="toGoodsdetails(item.id)" v-for="item in recommendations">
            <div class="photo left">
              <img :src="item.image">
              <span v-show="item.hot" class="my-hot"></span>
            </div>
            <div class="text-cont left">
              <div class="goods-name">{{item.name}}</div>
              <p class="describe">{{item.feature}}</p>
              <p class="price">{{item.price}}</p>
              <div class="tel-bin">
                <a @click.stop="stopclick" :href="item.phone?'tel:'+item.phone:''"><span></span>&nbsp;咨询</a>
              </div>
            </div>
          </div>

          <div class="more-goods" @click="toGoods()">查看更多产品>></div>
      </div>
    </div>
    <div class="product-center">
      <div class="goods-title">
        <p class="left">产品中心</p>
        <div class="c-more right" @click="toGoods()">更多>></div>
      </div>
      <div class="two-nav-coat">
        <div class="two-nav-item" @click="twoNavClick('1')" :class="pronavigationId==='1'?'current':''">
          全部
        </div>
        <div class="two-nav-item" @click="twoNavClick('2')" :class="pronavigationId==='2'?'current':''">
          气泡袋
        </div>
        <div class="two-nav-item" @click="twoNavClick('3')" :class="pronavigationId==='3'?'current':''">
          塑料膜
        </div>
        <div class="two-nav-item" @click="twoNavClick('4')" :class="pronavigationId==='4'?'current':''">
          塑料袋
        </div>
        <div class="two-nav-item" @click="twoNavClick('5')" :class="pronavigationId==='5'?'current':''">
          其它
        </div>
      </div>
      <div class="goods2-wrap-coat">
        <div class="goods2-wrap">
          <div class="goods2" v-for="item in productions.list">
            <div class="photo2" @click="toGoodsdetails(item.id)">
              <img :src="item.image">
              <span v-show="item.hot" class="my-hot ts"></span>
            </div>
            <div class="goods-name2">{{item.name}}</div>
            <p class="describe2">{{item.feature}}</p>
            <div class="tel-bin2">
              <a :href="item.phone?'tel:'+item.phone:''"><span></span>&nbsp;电话咨询</a>
            </div>
          </div>
          
        </div>
      </div>

    </div>


    <div class="gs-jieshao">
      

      <div class="coat-cnt">
        <div class="goods-title">
          <p class="left">公司介绍</p>
          <div class="c-more right" @click="toIntroduce()">更多>></div>
        </div>
        <div class="introduce-text">
          <p>{{company.name}}</p>
          <div class="introduce-cnt">
            {{company.description}}
          </div>
        </div>
      </div>
      <div class="concat-wrap">
        <div class="goods-title">
          <p class="left">联系方式</p>
          <div class="c-more right" @click="toConcat()">更多>></div>
        </div>
        <div class="concat-item" v-for="item in contact.phones">
            <div class="concat-msg left">
              <p class="lmw-t">{{item.type.name}}</p>
              <p>{{item.phoneNumber}}</p>
            </div>
            <div class="concat-tel-btn right">
              <a :href="item.phoneNumber?'tel:'+item.phoneNumber:''">
                <span class="tel-icon"></span>
                <span class="text-tx">电话</span>
              </a>
            </div>
            <div class="concat-msg-btn right" v-if="item.type.name === '手机'">
              <a :href="item.phoneNumber?'sms:'+item.phoneNumber:''">
                <span class="msg-icon"></span>
                <span class="text-tx">短信</span>
              </a>
            </div>
        </div>

        <div class="concat-item">
            <div class="concat-add left">
              <p class="lmw-t">地址</p>
              <p>{{contact.address}}</p>
            </div>
            <div class="concat-msg-btn right" @click="toMyaddr">
              <span class="map-icon"></span>
              <span class="text-tx">地图</span>
            </div>
        </div>


      </div>
    
    </div>
  </div>
    <footcom></footcom>
  </div>
</template>

<script>

import headtop from '../common/headtop/headtop';
import navigation from '../common/navigation/navigation';
import footcom from '../common/footcom/footcom';

export default {
  name: 'index',
  data () {
    return {
      pronavigationId:"0",
      company:{},
      contact:{},
      productions:{},
      recommendations:[]

    }
  },
  created(){

  },
  mounted(){
    //向服务端发请求，获取初始数据。
    this.$http.get('http://39.107.241.170:3001/api/guohe/main').then(function(res){
      var msg = res.body;
      if(msg.code===0){
        this.company = msg.data.company
        this.contact = msg.data.contact
        this.productions = msg.data.productions
        this.recommendations = msg.data.recommendations
      }else{
        alert(msg.msg)
      }
    },function(err){
      alert(JSON.stringify(err))
    }).finally(function(){

    })
  },
  methods:{
    toGoods(){
      this.$router.push({path:'/toGoods'})
    },
    toConcat(){
      this.$router.push({path:'/toConcat'})
    },
    toIntroduce(){
      this.$router.push({path:'/toIntroduce'})
    },
    toGoodsdetails(ID){
      this.$router.push({path:'/toGoodsdetails',query:{myid:ID}})
    },
    toMyaddr(){
      this.$router.push({path:'/toMyaddr'})
    },
    twoNavClick(index){
      this.pronavigationId = index
      this.$router.push({path:'/toGoods',query:{pronavigationId:index}})
    },
    stopclick(){}
  },
  components:{
    headtop,
    navigation,
    footcom
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.scroll-cnt{
  width: 100%;
  position: absolute;
  left:0;
  top:4.2rem;
  bottom:1.4rem;
  overflow-x: hidden;
  overflow-y:auto;
}
.coat-cnt{
  width: 100%;
  background-color: #fff;
  box-sizing: border-box;
  padding: .27rem;
}
.goods-title{
  height:.85rem;
  border-bottom: 1px dashed #f2f2f2;
}
.goods-title p{
  height: .4rem;
  line-height: .4rem;
  border-left:2px solid #347ee5;
  font-size: 16px;
  padding-left: .26rem;
}
.c-more{
  color:#666;
  padding-top: .11rem;
}
[data-dpr="2"] .goods-title p{
    font-size: 32px;
}
[data-dpr="3"] .goods-title p{
    font-size: 48px;
}
.two-nav-coat{
  height: 1.28rem;
  overflow: hidden;
  display: flex;
  justify-content:space-around;
}
.two-nav-item{
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  padding:0  .27rem;
  border:1px solid #f1f1f1;
  margin:0 .27rem .27rem 0;
  font-size: 14px;
}
[data-dpr="2"] .two-nav-item{
    font-size: 28px;
}
[data-dpr="3"] .two-nav-item{
    font-size: 42px;
}
.two-nav-item.current{
  background-color: #347ee5;
  color:#fff;
}
.more-goods{
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  color:#347ee5;
  font-size: 14px;
}

[data-dpr="2"] .more-goods{
    font-size: 28px;
}
[data-dpr="3"] .more-goods{
    font-size: 42px;
}

.goods{
  height: 2.42rem;
  overflow: hidden;
  border-bottom: 1px solid #f6f6f6;
  padding: .37rem 0 .29rem;
}
.photo{
  width:2.4rem;
  height: 2.4rem;
  position: relative;
}
.my-hot{
  width: .85rem;
  height: .85rem;
  background: url("hot.png") no-repeat center center;
  background-size: .85rem .85rem;
  position: absolute;
  left: -0.1rem;
  top:-0.4rem;
}

.my-hot.ts{
  left: -0.1rem;
  top:0;
}
.photo img{
  width: 2.4rem;
  height: 2.4rem;
}

.text-cont{
  width:6.6rem;
  position: relative;
  padding-left: .27rem;
}
.goods-name{
  height: 1.4rem;
  font-size: 16px;
  color:#333;
}
[data-dpr="2"] .two-nav-item{
    font-size: 32px;
}
[data-dpr="3"] .two-nav-item{
    font-size: 48px;
}

.describe{
  font-size: 12px;
  color:#347ee5;
  padding-bottom: .27rem;
}
[data-dpr="2"] .describe{
    font-size: 24px;
}
[data-dpr="3"] .describe{
    font-size: 36px;
}
.price{
  color:#999;
}
.tel-bin{
  width: 1.9rem;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  border: 1px solid #f6f6f6;
  border-radius: 4px;
  box-sizing: border-box;
  position: absolute;
  right:0;
  bottom:0;
  font-size: 14px;
  color:#666;
}
[data-dpr="2"] .tel-bin{
    font-size: 28px;
}
[data-dpr="3"] .tel-bin{
    font-size: 42px;
}
.tel-bin span{
  display: inline-block;
  width:.43rem;
  height: .43rem;
  background:url("tell.png") no-repeat center center;
  background-size: .43rem .43rem;
  vertical-align: -4px;
}

.goods.hot .goods-name{
  color:#c00;
}

.product-center{
  width: 100%;
  background-color: #fff;
  box-sizing: border-box;
  padding: .27rem;
  margin-top: .27rem;
}


.goods2-wrap-coat{
  width: 100%;
  height: 6.1rem;
  overflow:hidden;
}
.goods2-wrap::-webkit-scrollbar{width:0;height:0}

.goods2-wrap{
  height: 6.1rem;
  overflow-x:auto;
  overflow-y: hidden;
  display: flex;
}

.goods2{
  width:3.2rem;
  height: 6.1rem;
  -webkit-box-flex: 0;
  margin-right: .27rem;
}
.photo2{
  width: 3.2rem;
  height: 3.2rem;
  overflow: hidden;
  position: relative;
}
.photo2 img{
  width: 3.2rem;
  height: 3.2rem;
}

.describe2{
  font-size: 12px;
  color:#347ee5;
  padding: .27rem 0;
}
[data-dpr="2"] .describe2{
    font-size: 28px;
}
[data-dpr="3"] .describe2{
    font-size: 42px;
}

.tel-bin2{
  width: 3.1rem;
  height: .8rem;
  line-height: .8rem;
  text-align: center;
  color:#fff;
  background-color: #347ee5;
  border-radius: 4px;
  font-size: 14px;
}

[data-dpr="2"] .tel-bin2{
    font-size: 28px;
}
[data-dpr="3"] .tel-bin2{
    font-size: 42px;
}


.tel-bin2 a{
  color:#fff;
  font-size: 14px;
}

[data-dpr="2"] .tel-bin2 a{
    font-size: 28px;
}
[data-dpr="3"] .tel-bin2 a{
    font-size: 42px;
}




.tel-bin2 span{
  display: inline-block;
  width:.43rem;
  height: .43rem;
  background:url("tell2.png") no-repeat center center;
  background-size: .43rem .43rem;
  vertical-align: -4px;
}
.goods-name2{
  font-size: 16px;
  color:#c00;
  padding-top: .26rem;
}


.gs-jieshao{
  width: 100%;
  background-color: #fff;
  box-sizing: border-box;
  padding: .27rem;
  margin-top: .27rem;
}


.coat-cnt{
  background-color: #fff;
  box-sizing: border-box;
  padding: .27rem;
}
.goods-title{
  height:.85rem;
  border-bottom: 1px dashed #f2f2f2;
}
.goods-title p{
  height: .4rem;
  line-height: .4rem;
  border-left:2px solid #347ee5;
  font-size: 16px;
  padding-left: .26rem;
  font-weight: 700;
}
.introduce-text p{
  font-size: 18px;
  color:#333;
}
[data-dpr="2"] .introduce-text p{
    font-size: 36px;
}
[data-dpr="3"] .introduce-text p{
    font-size: 54px;
}

.introduce-cnt{
  font-size: 14px;
  line-height: 21px;
  color:#999;
  margin-top: .27rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
[data-dpr="2"] .introduce-cnt{
    font-size: 36px;
}
[data-dpr="3"] .introduce-cnt{
    font-size: 54px;
}

.concat-wrap{
  background-color: #fff;
  margin-top: .27rem;
  box-sizing: border-box;
  padding: .27rem;
}

.concat-item{
  height: 1.9rem;
  padding: .32rem 0 .19rem;
  border-bottom: 1px dashed #f6f6f6;
  font-size: 14px;
  color:#347ee5;
  box-sizing: border-box;
}
.concat-msg{
  width: 5.2rem;
  overflow: hidden;
}
.concat-add{
  width: 6rem;
  overflow: hidden;
}
.concat-tel-btn{
  width: 1.73rem;
  height: 1.28rem;
  border-left: 1px solid #f6f6f6;
}
.concat-msg-btn{
  width: 1.73rem;
  height: 1.28rem;
  border-left: 1px solid #f6f6f6; 
}
.tel-icon{
  display: block;
  width:.64rem;
  height: .64rem;
  margin: 0 auto;
  background:url("tell.png") no-repeat center center;
  background-size: .64rem .64rem;
}

.msg-icon{
  display: block;
  width:.64rem;
  height: .64rem;
  margin: 0 auto;
  background:url("msg.png") no-repeat center center;
  background-size: .64rem .64rem;
}
.text-tx{
  display: block;
  text-align: center;
  font-size: 12px;
}
.lmw-t{
  padding-top: .1rem;
  padding-bottom: .27rem;
}
.map-icon{
  display: block;
  width:.64rem;
  height: .64rem;
  margin: 0 auto;
  background:url("map.png") no-repeat center center;
  background-size: .64rem .64rem;
}

</style>