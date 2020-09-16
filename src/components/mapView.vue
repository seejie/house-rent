<template>
  <div>
    <div id="mapView"></div>
    <div id="tabBar">
      <span @click="toggle('map')" :class="{active: type !== 'HYBRID'}">map view</span>
      <span @click="toggle('street')" :class="{active: type === 'HYBRID'}">street view</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mapView',
  data () {
    return {
      lat: this.$route.query.lat, 
      lgt: this.$route.query.lgt,
      map: null,
      type: 'ROADMAP',
      inChina: this.$route.query.inChina
    }
  },
  mounted () {
    this[this.inChina ? 'initBDMap' : 'initGoogleMap']()
  },
  methods: {
    initGoogleMap() {
      var map = new google.maps.Map(document.getElementById("mapView"), {
        zoom: 15,
        mapTypeId: google.maps.MapTypeId[this.type]
      });
      map.setOptions({
        zoomControl: false,
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false
      })
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(this.lat, this.lgt),
        map: map
      });
      map.setCenter(new google.maps.LatLng(this.lat, this.lgt));
      this.map = map
    },
    initBDMap() {
      var map = new BMap.Map("mapView");
      var ggPoint = new BMap.Point(this.lgt,this.lat);
      map.centerAndZoom(ggPoint, 15);
      map.enableScrollWheelZoom(true);
      
      setTimeout(() =>{
        new BMap.Convertor().translate([ggPoint], 1, 5, data=>{
          console.log(data, '-----data-----')
        })
      },0)

      if (this.type === 'HYBRID') {
        map.setMapType(BMAP_HYBRID_MAP)
      } else {
        map.setMapType(BMAP_NORMAL_MAP)
      }
    },
    toggle(val) {
      this.type = val !== 'map' ? 'HYBRID' : 'ROADMAP'
      this[this.inChina ? 'initBDMap' : 'initGoogleMap']()
    } 
  }
}
</script>

<style lang="less" scoped>
#mapView{
  width: 100vw;
  height: 100vh;
}
#tabBar{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: #fff;
  span{
    display: inline-block;
    width: calc(50% - 20px);
    text-align: center;
    &.active{
      color:cornflowerblue;
    }
  }
}
</style>
