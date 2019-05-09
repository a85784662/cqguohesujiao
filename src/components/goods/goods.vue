<template>
  <div class="index-coat">
    <headtop></headtop>
    <navigation pronavigationId="1"></navigation>
    <div class="scroll-cnt">
      <div class="goods-title">
        <p>产品类型</p>
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
      <div class="goods-wrap">
          <div class="goods" :class="{hot:item.hot}" @click="toGoodsdetails(item.id)" v-for="item in initdata">
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
          <div v-if="ismore" class="see-div" @click="seeMore">点击查看更多</div>
          <div v-else class="see-div">没有更多了</div>
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
      pronavigationId:"1",
      initdata:[],
      ismore:true,
      currentPage:1
    }
  },
  created(){
    if(this.$route.query.pronavigationId){
      this.pronavigationId = this.$route.query.pronavigationId;
      this.$http.get('http://39.107.241.170:3001/api/guohe/products?page=1&type='+this.pronavigationId).then(function(res){
        var msg = res.body;
        if(msg.code===0){
          this.initdata = msg.data;
          //判断是否显示查看更多提示
          if(msg.data.length<5){
              this.ismore = false
          }else{
            this.ismore = true
          }
        }else{
          alert(msg.msg)
        }
      },function(err){
        alert(JSON.stringify(err))
      }).finally(function(){

      })
    }else{

      //向服务端发请求，获取初始数据。
      this.$http.get('http://39.107.241.170:3001/api/guohe/products?page=1&type=1').then(function(res){
        var msg = res.body;
        if(msg.code===0){
          this.initdata = msg.data
        }else{
          alert(msg.msg)
        }
      },function(err){
        alert(JSON.stringify(err))
      }).finally(function(){

      })

    }
  },
  mounted(){

  },
  methods:{
    twoNavClick(index){
      

      this.pronavigationId = index;
      this.$http.get('http://39.107.241.170:3001/api/guohe/products?page=1&type='+index).then(function(res){
        var msg = res.body;
        if(msg.code===0){
          this.initdata = msg.data
          //判断是否显示查看更多提示
          if(msg.data.length<5){
              this.ismore = false
          }else{
            this.ismore = true
          }

        }else{
          alert(msg.msg)
        }
      },function(err){
        alert(JSON.stringify(err))
      }).finally(function(){

      })
    },
    toGoodsdetails(ID){
      this.$router.push({path:'/toGoodsdetails',query:{myid:ID}})
    },
    seeMore(){
      //查看更多（分页）
      this.currentPage++
      this.$http.get('http://39.107.241.170:3001/api/guohe/products?page='+this.currentPage+'&type='+this.pronavigationId).then(function(res){
        var msg = res.body;
        if(msg.code===0){
          if(msg.data.length===0){
            this.ismore = false;
          }else{
            for(var i=0;i<msg.data.length;i++){
              this.initdata.push(msg.data[i])
            }
          }
        }else{
          alert(msg.msg)
        }
      },function(err){
        alert(JSON.stringify(err))
      }).finally(function(){

      })



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
  background-color: #fff;
  box-sizing: border-box;
  position: absolute;
  left:0;
  top:4.2rem;
  bottom:1.4rem;
  overflow-y: auto;
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

.see-div{
  height: .8rem;
  line-height: .8rem;
  text-align: center;
  font-size: 14px;
  background-color: #d8d8d8;
  margin-top: .25rem;
}
[data-dpr="2"] .see-div{
    font-size: 28px;
}
[data-dpr="3"] .see-div{
    font-size: 42px;
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