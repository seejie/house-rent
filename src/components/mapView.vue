<template>
  <div id="mapView"></div>
</template>

<script>
export default {
  name: 'mapView',
  data () {
    return {
      lat: this.$route.query.lat, 
      lgt: this.$route.query.lgt
    }
  },
  mounted () {
    this.getMap()
    this.getUserPosition()
  },
  methods: {
    getMap() {
      if(!google) {
        this.useBdMap()
        return 
      }
      var map = new google.maps.Map(document.getElementById("mapView"), {
        zoom: 15,
      });
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(this.lat, this.lgt),
        map: map
      });
      map.setCenter(new google.maps.LatLng(this.lat, this.lgt));
    },
    getUserPosition() {
      navigator.geolocation.getCurrentPosition(pos => {
        console.log(pos, '-----pos-----')
      }, err => {
        console.error(err)
      });
    },
    useBdMap() {
      console.log(1, '-----1-----')
    }
  }
}
</script>

<style lang="less" scoped>
#mapView{
  width: 100vw;
  height: 100vh;
}
</style>
