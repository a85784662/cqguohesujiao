<template>
  <div class="index-coat">
    <div class="scroll-cnt" ref="scrollCnt">
      <div class="goods-descript">
        <div class="goods-photo">
          <img v-if="product.pictures" :src="product.pictures[0]">
        </div>
        <div class="goods-title">{{product.name}}</div>
        <div class="goods-text">{{product.content}}</div>
        <div @click="toReturn" class="return-btn"></div>
      </div>

      <div class="concat-wrap">
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
        
      </div>


      <div class="gs-des-wrap">
          <div class="gs-ms-text">
              <p class="gs-title">{{company.name}}</p>
              <p class="gs-web">{{company.website}}</p>
              <p class="gs-jianjie">
                {{company.description}}
              </p>
          </div>
          <div class="gs-btn-wrap">
            <div @click="toGoods" class="toindex-btn gs-btn"><span class="gs-icon1 cp"></span>产品中心</div>
            <div @click="toIndex" class="togoods-btn gs-btn"><span class="gs-icon1 sy"></span>进入首页</div>
          </div>
      </div>


      <div class="doods-wrap">
        <div class="goods-title">
          <p>产品推荐</p>
        </div>
        <div class="goods-wrap">
            <div class="goods" :class="{hot:item.hot }" @click="toGoodsdetails(item.id)" v-for="item in recommendation">
              <div class="photo left">
                <img :src="item.image">
                <span v-show="item.hot" class="my-hot"></span>
              </div>
              <div class="text-cont left">
                <div class="goods-name">{{item.name}}</div>
                <p class="describe">{{item.feature}}</p>
                <p class="price">{{item.price}}</p>
                <div class="tel-bin">
                  <a :href="item.phone?'tel:'+item.phone:''"><span></span>&nbsp;咨询</a>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
    <footcom></footcom>
  </div>
</template>

<script>

import footcom from '../common/footcom/footcom';

export default {
  name: 'goodsdetails',
  data () {
    return {
      myid:"",
      company:{},
      contact:{},
      product:{},
      recommendation:[]
    }
  },
  created(){
    this.myid = this.$route.query.myid;
    //向服务器获取数据
    this.$http.get('http://39.107.241.170:3001/api/guohe/product?id='+this.myid).then(function(res){
        var msg = res.body;
        if(msg.code===0){
          //this.initdata = msg.data;
          this.company = msg.data.company
          this.contact = msg.data.contact
          this.product = msg.data.product
          this.recommendation = msg.data.recommendation

        }else{
          alert(msg.msg)
        }
      },function(err){
        alert(JSON.stringify(err))
      }).finally(function(){

      })
  },
  mounted(){

  },
  methods:{
    toIndex(){
      this.$router.push({path:'/'})
    },
    toGoods(){
      this.$router.push({path:'/toGoods'})
    },
    toReturn(){
      this.$router.go(-1);
    },
    toGoodsdetails(ID){
      //向服务器获取数据
      this.$http.get('http://39.107.241.170:3001/api/guohe/product?id='+ID).then(function(res){
        var msg = res.body;
        if(msg.code===0){
          //this.initdata = msg.data;
          this.company = msg.data.company
          this.contact = msg.data.contact
          this.product = msg.data.product
          this.recommendation = msg.data.recommendation

          this.$refs.scrollCnt.scrollTop = 0

        }else{
          alert(msg.msg)
        }
      },function(err){
        alert(JSON.stringify(err))
      }).finally(function(){

      })
    },
  },
  components:{
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
  top:0;
  bottom:1.4rem;
  overflow-y: auto;
  
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
  width:1.7rem;
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


.tel-bin a{
  display: block;
  width: 1.9rem;
  height: 1rem;
  font-size: 14px;
  color:#666;
}
[data-dpr="2"] .tel-bin a{
    font-size: 28px;
}
[data-dpr="3"] .tel-bin a{
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



.goods-descript{
  width: 100%;
  min-height:7.9rem;
  overflow:hidden;
  position: relative;
  font-size: 16px;
  background-color: #fff;
  box-sizing: border-box;
  padding: .27rem;
}


[data-dpr="2"] .goods-descript{
    font-size: 32px;
}
[data-dpr="3"] .goods-descript{
    font-size: 48px;
}

.goods-photo{
 width: 5.3rem;
 height: 4rem;
 margin: 0 auto;
}

.goods-photo img{
 width: 5.3rem;
 height: 4rem;
}
.goods-title{
  padding-top: .4rem;
}
.goods-text{
  line-height: 21px;
}

.concat-wrap{
  width: 100%;
  overflow:hidden;
  background-color: #fff;
  box-sizing: border-box;
  padding: .27rem;
}


.concat-item{
  height: 1.86rem;
  padding: .32rem 0 .19rem;
  border-bottom: 1px dashed #f6f6f6;
  font-size: 14px;
  color:#347ee5;
  box-sizing: border-box;
}
.concat-msg{
  width: 5.5rem;
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
  padding-bottom: .27rem;
  padding-top: .1rem;
}

.gs-des-wrap{
  width: 100%;
  overflow:hidden;
  background-color: #fff;
  box-sizing: border-box;
  padding: .27rem;
  margin-top: .27rem;
}
.line-bg{
  width: 100%;
  height: .27rem;
  background-color: #666;
}
.doods-wrap{
  width: 100%;
  overflow: hidden;
  background-color: #fff;
  box-sizing: border-box;
  padding: .27rem;
  margin-top: .27rem;
}
.gs-ms-text{
  width: 100%;
  overflow: hidden;
}
.gs-title{
  color:#666;
  font-size: 18px;
}

[data-dpr="2"] .gs-title{
    font-size: 36px;
}
[data-dpr="3"] .gs-title{
    font-size: 54px;
}

.gs-web{
  color:#666;
  font-size: 12px;
  padding-top: .2rem;
}
.gs-jianjie{
  padding-top: .4rem;
  font-size: 14px;
  color:#999;
  line-height: 21px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
[data-dpr="2"] .gs-title{
    font-size: 28px;
}
[data-dpr="3"] .gs-title{
    font-size: 42px;
}

.gs-btn-wrap{
  width: 100%;
  overflow: hidden;
  margin-top: .27rem;
  display: flex;
  justify-content:space-around;
}
.gs-btn{
  width: 4.4rem;
  height: 1.1rem;
  line-height: 1.1rem;
  text-align: center;
  font-size: 14px;
  color:#347ee5;
  border: 1px solid #e7e7e7;
  border-radius: 4px;
}
[data-dpr="2"] .gs-btn{
    font-size: 28px;
}
[data-dpr="3"] .gs-btn{
    font-size: 42px;
}

.gs-icon1{
  display: inline-block;
  width:.64rem;
  height: .64rem;
  vertical-align: -6px;
  
}
.gs-icon1.cp{
  background:url("icon2_click.png") no-repeat center center;
  background-size: .43rem .43rem;
}
.gs-icon1.sy{
  background:url("icon1_click.png") no-repeat center center;
  background-size: .43rem .43rem;
}

.return-btn{
  width:.64rem;
  height: .64rem;
  background:url("return.png") no-repeat center center;
  background-size: .64rem .64rem;
  position: absolute;
  left:.27rem;
  top:.27rem;
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

</style>