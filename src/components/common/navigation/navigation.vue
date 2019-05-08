<template>
  <div>
    <div class="nav-foot-wrap">
        <div class="nav-item p1" :class="pronavigationId==='0'?'current':''"  @click="toIndex()">
          <p></p>首页
        </div>
        <div class="nav-item p2" :class="pronavigationId==='1'?'current':''" @click="toGoods()">
          <p></p>产品中心
        </div>
        <div class="nav-item p3" :class="pronavigationId==='2'?'current':''" @click="toIntroduce()">
          <p></p>公司介绍
        </div>
        <div class="nav-item p4" :class="pronavigationId==='3'?'current':''" @click="toConcat()">
          <p></p>联系我们
        </div>
        
    </div> 

  </div>
</template>

<script>

export default {
  props:{
    pronavigationId:{
      type:String,
      default:"0"
    }
  },
  data () {
    return {
      loading:false
    }
  },
  created(){
    
      
  },
  mounted(){

  },
  components:{

  },
  methods:{
    toIndex(){
      this.$router.push({path:'/'})
    },
    toGoods(){
      this.$router.push({path:'/toGoods'})
    },
    toIntroduce(){
      this.$router.push({path:'/toIntroduce'})
    },
    toConcat(){
      this.$router.push({path:'/toConcat'})
    }

  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .nav-foot-wrap{
    width: 100%;
    height: 1.7rem;
    background-color: #fff;
    display: flex;
    justify-content:space-around;
  }
  .nav-item{
    width: 4.53rem;
    height: 1.6rem;
    text-align: center;
    box-sizing: border-box;
    padding-top: .2rem;
    
  }

  .nav-item p{
    margin-bottom: .133rem
  }
  .nav-item.p1 p{
    width: 100%;
    height: .826rem;
    background: url('icon1.png') no-repeat center center;
    background-size: .826rem .826rem;
  }
  .nav-item.p2 p{
    width: 100%;
    height: .826rem;
    background: url('icon2.png') no-repeat center center;
    background-size: .826rem .826rem;
  }
  .nav-item.p3 p{
    width: 100%;
    height: .826rem;
    background: url('icon3.png') no-repeat center center;
    background-size: .826rem .826rem;
  }
  .nav-item.p4 p{
    width: 100%;
    height: .826rem;
    background: url('icon4.png') no-repeat center center;
    background-size: .826rem .826rem;
  }

  .nav-item.current{
    color:#347ee5;
  }
  .nav-item.p1.current p{
    background: url('icon1_click.png') no-repeat center center;
    background-size: .826rem .826rem;
  }
  .nav-item.p2.current p{
    background: url('icon2_click.png') no-repeat center center;
    background-size: .826rem .826rem;
  }
  .nav-item.p3.current p{
    background: url('icon3_click.png') no-repeat center center;
    background-size: .826rem .826rem;
  }
  .nav-item.p4.current p{
    background: url('icon4_click.png') no-repeat center center;
    background-size: .826rem .826rem;
  }

</style>
