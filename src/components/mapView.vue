<template>
  <div>
    <div id="mapView"></div>
    <div id="tabBar">
      <span @click="toggle('map')" :class="{active: type !== 'HYBRID'}">{{$t('mapV')}}</span>
      <span @click="toggle('street')" :class="{active: type === 'HYBRID'}">{{$t('streetV')}}</span>
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
      inChina: +this.$route.query.inChina
    }
  },
  mounted () {
    this[this.inChina === 1 ? 'initBDMap' : 'initGoogleMap']()
  },
  created () {
    window.initAutocomplete = this.initGoogleMap
    window.initBDMap = this.initBDMap
    this.initScript()
  },
  methods: {
    initGoogleMap() {
      try {
        // eslint-disable-next-line
        var map = new google.maps.Map(document.getElementById("mapView"), {
          zoom: 15,
          // eslint-disable-next-line
          mapTypeId: google.maps.MapTypeId[this.type]
        });
        map.setOptions({
          zoomControl: false,
          fullscreenControl: false,
          mapTypeControl: false,
          streetViewControl: false
        })
        // eslint-disable-next-line
        var marker = new google.maps.Marker({
          // eslint-disable-next-line
          position: new google.maps.LatLng(this.lat, this.lgt),
          map: map
        });
        // eslint-disable-next-line
        map.setCenter(new google.maps.LatLng(this.lat, this.lgt));
      } catch (error) {
        
      }
    },
    initBDMap() {
      try {
        // eslint-disable-next-line
        var map = new BMap.Map("mapView");
        // eslint-disable-next-line
        var ggPoint = new BMap.Point(this.lgt,this.lat);
        map.centerAndZoom(ggPoint, 15);
        map.enableScrollWheelZoom(true);
        
        setTimeout(() =>{
          // eslint-disable-next-line
          new BMap.Convertor().translate([ggPoint], 1, 5, data=>{
            console.log(data, '-----data-----')
          })
        },0)

        if (this.type === 'HYBRID') {
          // eslint-disable-next-line
          map.setMapType(BMAP_HYBRID_MAP)
        } else {
          // eslint-disable-next-line
          map.setMapType(BMAP_NORMAL_MAP)
        }
        
        var marker = new BMap.Marker(ggPoint);
        map.addOverlay(marker);

      } catch (error) {
        
      }
    },
    toggle(val) {
      this.type = val !== 'map' ? 'HYBRID' : 'ROADMAP'
      this[this.inChina === 1 ? 'initBDMap' : 'initGoogleMap']()
    },
    initScript () {
      const mapSdk = document.getElementById('mapSdk')
      if(mapSdk) {
        this[this.inChina === 1 ? 'initBDMap' : 'initGoogleMap']()
        return
      } 
      const script = document.createElement('script')
      script.id = 'mapSdk'
      const lang = 'en-ww'
      script.src = this.inChina !== 1 ? 'https://maps.googleapis.com/maps/api/js?key=AIzaSyALodR-VI9EV_CFDOWHZZQgeUWdMP6lZMg&callback=initAutocomplete&libraries=places&v=weekly&language=' + lang 
        : 'https://api.map.baidu.com/api?v=2.0&ak=x0lB5P2zbI53kTPjIiwvu27cNteglr9Y&callback=initBDMap'
      document.getElementsByTagName("head")[0].appendChild(script)
    },
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
  display: flex;
  span{
    flex: 1;
    text-align: center;
    &.active{
      color:cornflowerblue;
    }
  }
}
</style>
