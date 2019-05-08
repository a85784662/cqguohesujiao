<template>
  <div class="map-coat">
    <div ref="allmap" id="allmap"></div>
    <div class="tyl-return" @click="toReturn"></div>
  </div>
</template>

<script>

export default {
  name: 'myaddr',
  data () {
    return {

    }
  },
  created(){
  },
  mounted(){
    this.map()
  },
  methods:{
    map(){
      let map =new BMap.Map(this.$refs.allmap); // 创建Map实例
      map.centerAndZoom(new BMap.Point(106.369043,29.76226), 16);// 初始化地图,设置中心点坐标和地图级别
      var point = new BMap.Point(106.369043,29.76226);
      var marker = new BMap.Marker(point);// 创建标注
      map.addOverlay(marker); // 将标注添加到地图中
      map.addControl(new BMap.MapTypeControl({//添加地图类型控件
        mapTypes:[
          BMAP_NORMAL_MAP,
          BMAP_HYBRID_MAP
        ]}));
      map.setCurrentCity("重庆");// 设置地图显示的城市 此项是必须设置的
      map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
    },
    toReturn(){
      this.$router.go(-1);
    }
  },
  components:{

  }
  
}
</script>



<style scoped>
#allmap{
  width: 100%;
  position: absolute;
  left: 0;
  top:0;
  bottom:0;
}
.tyl-return{
  width:.64rem;
  height: .64rem;
  background:url("return.png") no-repeat center center;
  background-size: .64rem .64rem;
  position: absolute;
  left:.27rem;
  top:.27rem;
  z-index: 9999;
}

</style>