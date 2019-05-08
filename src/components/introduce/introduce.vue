<template>
  <div class="index-coat">
    <headtop></headtop>
    <navigation pronavigationId="2"></navigation>
    <div class="scroll-cnt">
      <div class="coat-cnt">
        <div class="goods-title">
          <p>公司介绍</p>
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
              <p class="lmw-t">手机</p>
              <p>{{item.phoneNumber}}</p>
            </div>
            <div class="concat-tel-btn right">
              <a :href="item.phoneNumber?'tel:'+item.phoneNumber:''">
                <span class="tel-icon"></span>
                <span class="text-tx">电话</span>
              </a>
            </div>
            <div class="concat-msg-btn right">
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
            <div class="concat-msg-btn right">
              <span class="map-icon"></span>
              <span class="text-tx">地图</span>
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
      contact:{}
    }
  },
  created(){
    //向服务端发请求，获取初始数据。
    this.$http.get('http://39.107.241.170:3000/api/guohe/company').then(function(res){
      var msg = res.body;
      if(msg.code===0){
        this.company = msg.data.company
        this.contact = msg.data.contact
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
    toConcat(){
      this.$router.push({path:'/toConcat'})
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