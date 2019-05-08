<template>
  <div>
    <div class="headtop">
        <p class="name">重庆国和塑胶制造有限公司</p>
        <p class="web-name">guohesujiao.cn</p>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    headtext:{
      type:String,
      default:'办公系统'
    }
  },
  data () {
    return {

    }
  },
  mounted(){

  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.headtop{
  width: 100%;
  height: 2.27rem;
  background-color: #347ee5;
  padding:.53rem .4rem;
  box-sizing: border-box;
}
.name{
  color:#fff;
  font-size: 18px;
}
[data-dpr="2"] .name{
    font-size: 36px;
}
[data-dpr="3"] .name{
    font-size: 54px;
}

.web-name{
  color:#fff;
  font-size: 12px;
  padding-top: .32rem;
}


</style>
