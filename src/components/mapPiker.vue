<template>
  <div class="wrapper">
    <div id="mapPiker"></div>
    <van-search v-model="search"
      show-action placeholder="请输入"
      action-text="取消"
      clearable
      @clear="onClear"
      @search="onSearch"
      @input="onInput" />
    <div id="list" v-if="!!search && list.length">
      <template v-if="list.length && selected">
        <div class="selected-title">{{selected.name}}</div>
        <div class="confirm-btn" @click="confirmCurr()">确认</div>
      </template>
      <template v-else-if="list.length && !selected">
        <div class="item loading" v-if="!list.length && search && !notfound && !selected">加载中...</div>
        <div class="item notFound" v-if="search && notfound">抱歉，未找到！</div>
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
      selected: null
    }
  },
  mounted () {
    this.getMap()
    this.getUserPosition()
  },
  watch: {
    query (val) {
      if(val) return
      this.list = []
    }
  },
  methods: {
    getMap() {
      // if(!window.google) {
      //   this.useBdMap()
      //   return 
      // }
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
    getUserPosition() {
      navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
        this.latitude = latitude
        this.longitude = longitude
        this.getMap()
      });
    },
    useBdMap() {
      console.log('-----baidu-----')
    },
    onClear(){
      this.list = []
    },
    onSearch(){
      console.log(2, '-----2-----')
    },
    onInput(query){
      this.selected = null
      if (!query) {
        this.list = []
        return
      }
      
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
    selectCurr(item){
      this.selected = item
      // this.list = []
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
          console.log(results.address_components, '-----results.address_components-----')
          const addr = results.address_components.map(el => el.short_name).join(',')

          const query = Object.assign({}, 
            JSON.parse(JSON.stringify(this.$route.query)), {
            lat: this.latitude,
            lgt: this.longitude,
            addr
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
