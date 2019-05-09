<template>
  <div>
    <div class="footer-wrap">
        <div class="duanx-btn foot-btn"><a :href="contact?'sms:'+contact:''"><span class="icon msg"></span>&nbsp;短信咨询</a></div>
        <div class="tel-btn foot-btn"><a class="ts" :href="contact?'tel:'+contact:''"><span class="icon tel"></span>&nbsp;电话咨询</a></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      contact:""
    }
  },
  created(){
    //向服务端发请求，获取初始数据。
    this.$http.get('http://39.107.241.170:3001/api/guohe/phone').then(function(res){
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
    
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.footer-wrap{
  width: 100%;
  height:1.3rem;
  position: fixed;
  left: 0;
  bottom:0;
  display: flex;
  justify-content:space-around;
  align-items:center;
}
.foot-btn{
  width:4.5rem;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  box-sizing: border-box;
  font-size: 14px;
}
[data-dpr="2"] .foot-btn{
    font-size: 28px;
}
[data-dpr="3"] .foot-btn{
    font-size: 42px;
}


.foot-btn a{
  display: block;
  width:4.5rem;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  box-sizing: border-box;
  font-size: 14px;
}
[data-dpr="2"] .foot-btn a{
    font-size: 28px;
}
[data-dpr="3"] .foot-btn a{
    font-size: 42px;
}

.foot-btn a.ts{
color:#fff;
}


.duanx-btn{
  background-color: #fff;
  border:1px solid #d8d8d8;
  color:#666;
}
.tel-btn{
  background-color: #347ee5;
  color:#fff;
}


.icon{
  display: inline-block;
  width:.64rem;
  height: .64rem;
  vertical-align: -6px;
}

.icon.msg{
  background:url("msg.png") no-repeat center center;
  background-size: .64rem .64rem;
}
.icon.tel{
  background:url("tell.png") no-repeat center center;
  background-size: .64rem .64rem;
}





</style>
