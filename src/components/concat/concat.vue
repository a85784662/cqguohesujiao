<template>
  <div class="index-coat">
    <headtop></headtop>
    <navigation pronavigationId="3"></navigation>
    <div class="scroll-cnt">
      <div class="concat-wrap">
        <div class="goods-title">
          <p class="left">联系我们</p>
        </div>
        <div class="concat-item" v-for="item in contact.phones">
            <div class="concat-msg left">
              <p class="lmw-t">手机</p>
              <p>{{item.phoneNumber}}</p>
            </div>
            <div class="concat-tel-btn right">
              <a :href="item.phoneNumber?'tel:'+item.phoneNumber : ''">
                <span class="tel-icon"></span>
                <span class="text-tx">电话</span>
              </a>
            </div>
            <div class="concat-msg-btn right">
              <a :href="item.phoneNumber?'sms:'+item.phoneNumber : ''">
                <span class="msg-icon"></span>
                <span class="text-tx">短信</span>
              </a>
            </div>
        </div>
        
        
      </div>

      <div class="cnt-lx">
        <div class="goods-title">
          <p class="left">联系地址</p>
        </div>
        <div class="concat-item2">
            <div class="concat-add left">
              <p style="padding-top: .27rem">{{contact.address}}</p>
            </div>
            <div class="concat-msg-btn2 right" @click="toMyaddr">
              <span class="map-icon2"></span>
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
      contact:{}
    }
  },
  created(){
    //向服务端发请求，获取初始数据。
    this.$http.get('http://39.107.241.170:3000/api/guohe/contact').then(function(res){
      var msg = res.body;
      if(msg.code===0){
        this.contact =  msg.data
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
    toMyaddr(){
      this.$router.push({path:'/toMyaddr'})
    }
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
  overflow-y: auto;
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
  height: 1.86rem;
  padding: .32rem 0 .19rem;
  border-bottom: 1px dashed #f6f6f6;
  font-size: 14px;
  color:#347ee5;
  box-sizing: border-box;
}
.concat-item2{
  height: 1rem;
  line-height: .6rem;
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
  padding-top:.1rem;
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

.cnt-lx{
  background-color: #fff;
  margin-top: .27rem;
  box-sizing: border-box;
  padding: .27rem;
}

.concat-msg-btn2{
  width: 1.73rem;
  height: .8rem;
  margin-top: .27rem;
  border-left: 1px solid #f6f6f6; 
}

.map-icon2{
  display: block;
  width:.64rem;
  height: .64rem;
  margin: 0 auto;
  background:url("map.png") no-repeat center center;
  background-size: .64rem .64rem;
}

</style>