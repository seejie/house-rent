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
      type: 'ROADMAP'
    }
  },
  mounted () {
    this.getMap()
    this.getUserPosition()
  },
  methods: {
    getMap() {
      if(!window.google) {
        this.useBdMap()
        return 
      }
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
    getUserPosition() {
      navigator.geolocation.getCurrentPosition(({coords}) => {
        console.log(coords, '-----coords-----')
      });
    },
    useBdMap() {
      console.log(1, '-----1-----')
    },
    toggle(val) {
      this.type = val !== 'map' ? 'HYBRID' : 'ROADMAP'
      this.getMap()
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
