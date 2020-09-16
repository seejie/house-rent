<template>
  <div class="wrapper">
    <div id="mapPiker"></div>
    <van-search v-model="search"
      show-action 
      :action-text="cancel"
      clearable
      @clear="onClear"
      @search="onSearch"
      @input="onInput" />
    <div id="list" :class="{hide: needHide()}">
      <template v-if="list.length && selected">
        <div class="selected-title">{{selected.name}}</div>
        <div class="confirm-btn" @click="confirmCurr()">{{$t("Submit")}}</div>
      </template>
      <template v-else-if="!selected">
        <div class="item loading" v-if="!list.length && search && !notfound && !selected">{{$t("loading")}}...</div>
        <div class="item notFound" v-if="search && notfound">{{$t("notFound")}}</div>
        <div v-for="(item, index) in list"
          :key="index"
          class="item"
          @click="selectCurr(item)">
          <div class="title">{{item.name}}</div>
          <div class="content">{{item.formatted_address}}</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mapPiker',
  data () {
    return {
      latitude: null,
      longitude: null,
      search: '',
      list: [],
      notfound: false,
      selected: null,
      cancel: this.$t('cancel'),
      inChina: +this.$route.query.inChina
    }
  },
  mounted () {
    this[this.inChina === 1 ? 'initBDMap' : 'initGoogleMap']()
  },
  created () {
    window.initAutocomplete = this.initGoogleMap
    window.initBDMap = this.initBDMap
    this.getUserLocation()
  },
  watch: {
    query (val) {
      if(val) return
      this.list = []
    }
  },
  methods: {
    getUserLocation() {
      navigator.geolocation.getCurrentPosition(position => {
        const {longitude,latitude} = position.coords
        this.longitude = longitude
        this.latitude = latitude
        this.initScript()
      }, () => {
        this.initScript()
      })
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
    initBDMap() {
      try {
        var map = new BMap.Map("mapPiker");
        var ggPoint = new BMap.Point(this.longitude, this.latitude);
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
        this.map = map
      } catch (error) {
        
      }
    },
    initGoogleMap() {
      var map = new google.maps.Map(document.getElementById("mapPiker"), {
        zoom: 15,
      });
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(this.latitude, this.longitude),
        map: map
      });
      map.setOptions({
        zoomControl: false,
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false
      })
      map.setCenter(new google.maps.LatLng(this.latitude, this.longitude));
      this.map = map
    },
    onClear(){
      this.list = []
    },
    onSearch(){
      console.log(2, '-----2-----')
    },
    async onInput(query){
      this.selected = null
      if (!query) {
        this.list = []
        return
      }
      await this[this.inChina === 1 ? 'queryBD' : 'queryGoogle'](query)
    },
    queryGoogle () {
      const map = this.map
      const service = new google.maps.places.PlacesService(map)
      service.textSearch({
        query,
        // fields: ['opening_hours','utc_offset_minutes']
        fields: ['ALL']
      }, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          this.list = results
          this.notfound = false
        } else {
          this.list = []
          this.notfound = true
        }
      });
    },
    queryBD(query) {
      const vm = this
      var options = {
        onSearchComplete: function(results){
          const {Hr} = results
          if (Hr.length) {
            console.log(Hr, '-----Hr-----')
            vm.list = Hr.map(({title, ...rest}) => {
              return {
                name: title,
                ...rest
              }
            })
            vm.notfound = false
          } else {
            vm.list = []
            vm.notfound = true
          }
          if(!vm.search) {
            vm.list = []
          }
        }
      };

      var local = new BMap.LocalSearch(this.map, options);
	    local.search(query);
    },
    selectCurr(item){
      this.selected = item
    },
    confirmCurr() {
      const map = this.map
      const service = new google.maps.places.PlacesService(map)
      service.getDetails({
        placeId: this.selected.place_id,
        fields: ['ALL']
      }, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          this.latitude = this.selected.geometry.location.lat()
          this.longitude = this.selected.geometry.location.lng()

          const addr = results.address_components.map(el => el.short_name).join(',')
          let country = ''
          let province = ''
          let city = ''
          let district = ''
          results.address_components.forEach(el => {
            if (el.types[0] === 'country') country = el.long_name
            else if (el.types[0] === 'administrative_area_level_1') province = el.long_name
            else if (el.types[0] === 'locality') city = el.long_name || 'NA'
            else if (el.types[0] === 'sublocality_level_1') district = el.long_name
          })

          const query = Object.assign({}, 
            JSON.parse(JSON.stringify(this.$route.query)), {
            lat: this.latitude,
            lgt: this.longitude,
            addr,
            country,
            province,
            city,
            district,
            checkCurrency: true
          })
          this.$router.push({
            path: '/Propertys',
            query
          })
        } else {
          console.log(1, '-----1-----')
        }
        this.list = []
      });
    },
    needHide () {
      if (!this.search) return true
      return false
    }
  }
}
</script>

<style lang="less" scoped>
.wrapper{
  width: 100vw;
  height: 100vh;
}
#mapPiker{
  width: 100%;
  height: 100%;
}
.van-search {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
#list{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #FFFFFF;
  border-radius: 20px 20px 0px 0px;
  max-height: 30vh;
  overflow-y: scroll;
  border: 20px solid #fff;
  &.hide{
    border: 0;
  }
  .item{
    color: #393E41;
    padding: 10px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    + .item{
      border-top: 1px solid #F2F2F2;
    }
    .content{
      color: #999;
      font-size: 12px;
    }
  }
}
.selected-title, 
.confirm-btn{
  padding: 10px;
  text-align: center;
}
.selected-title{
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  padding-bottom: 30px;
}
.confirm-btn{
  background-color: #1377FF;
  color: #fff;
  border-radius: 6px;
}
</style>
