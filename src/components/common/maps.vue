<style>
  .warpAddLocationInfo {
  background: #fff;
  padding: 15px 0;
  margin-top: 15px;
  box-shadow: 2px 2px 10px #ddd;
}
.warpAddLocationInfoBg {
  width: 92%;
  margin: 0px auto;
}
.warpAddLocationInfo .ivu-row {
  margin-top: 10px;
  margin-bottom: 25px;
}
.Platform_Location_Addcommunity .ivu-form .ivu-form-item-label {
  font-weight: bold;
  text-align: left;
  display: inline-block;
  float: none;
}
.Platform_Location_Addcommunity .ivu-form-item-label {
  position: relative;
}
.Platform_Location_Addcommunity .ivu-form-item-label .tit1 {
  display: inline-block;
  position: absolute;
  top: -8px;
}
.Platform_Location_Addcommunity .ivu-form-item-label .tit2 {
  color: #999999;
  position: absolute;
  font-weight: lighter;
  display: inline-block;
  top: 12px;
}

.Platform_Location_Addcommunity_map_Modal .ivu-modal-close .ivu-icon-ios-close {
  font-weight: bold;
}
.Platform_Location_Addcommunity_map_Modal .ivu-modal-content {
  border-radius: 0;
}
.Platform_Location_Addcommunity_map_Modal .ivu-modal-header {
  background: #f2f2f2;
}
.Platform_Location_Addcommunity_map_Modal .ivu-btn-text {
  display: none;
}
.Platform_Location_Addcommunity_map_Modal .ivu-modal-footer {
  text-align: center;
  border: 0;
  padding: 10px 18px 25px 18px;
}
.Platform_Location_Addcommunity_map_Modal .ivu-btn-primary {
  height: 40px;
  line-height: 40px;
  padding-left: 50px;
  padding-right: 50px;
}
.Platform_Location_Addcommunity_map_Modal .ivu-modal-header-inner {
  text-align: center;
  font-weight: bold;
  color: #555;
}
</style>
<template>
  <div class="Platform_Location_Addcommunity">


    <div v-model="modal1" class="Platform_Location_Addcommunity_map_Modal" title="Search Location" ok-text='Confirm'
      @on-ok="Map_btnok" :mask-closable="false">

      <div style="width:100%; position: relative;" :style="height">
       <!-- <input id="pac-input" class="controls" type="text" v-model="dist" placeholder="Search" pac-icon/> -->
       <!--  <van-search
           v-model="dist"
           show-action
           placeholder="请输入搜索关键词"
           @search="onSearch"
           @cancel="onCancel"
           id="pac-input"
         /> -->
      <van-search  show-action placeholder="" v-model="dist" class="controls" id="pac-input">
         <template #action>
           <div>Cancel</div>
         </template>
         <Icon type="md-search" class="pac-inputico" />
       </van-search>
        <!-- <div id="map" style="  height: 100%;width:100%"></div> -->
      </div>
    </div>


  </div>
</template>

<script>
  // import VueGoogleMaps from 'vue-googlemaps'
export default {
  data () {
    return {
      dist: '',
      lat: '',
      lng: '',
      // addr: '',
      map: '',
      // mapProp: {},
      // chicago: '',
      marker: '',
      searchBox: '',
      infowindow: Object,
      height: {
        height: '',
      },
      modal1: false,
      liData: [
        {
          Id: 1,
          Name: '孙小胖1',
          Check: false
        }, {
          Id: 1,
          Name: '孙小胖1',
          Check: false
        }, {
          Id: 1,
          Name: '孙小胖1',
          Check: false
        },
        {
          Id: 1,
          Name: '孙小胖1',
          Check: false
        },
        {
          Id: 2,
          Name: '孙小胖2',
          Check: false
        }
      ],
      selectName: '',
      All: 'All',

      formItem: {
        input: '',
        select: '',
        radio: 'male',
        checkbox: [],
        switch: true,
        date: '',
        time: '',
        slider: [20, 50],
        textarea: ''
      }
    }
  },
  created () {
    // this.$emit('ChildSetNavigationText4', 'Add community'),
    this.getWindowHeight();
  },
  methods: {
     onSearch(val) {
          // Toast(val);
        },
        onCancel() {
          // Toast('取消');
        },
    getWindowHeight() {
      this.height.height = window.innerHeight +'px';
    },
    Map_btnok () {
      this.$Message.info('Clicked ok')
      // importValue
      console.log('地址', this.dist, '经度1', this.lng, '维度', this.lat)
    },

    initAutocomplete () {
      const map = new google.maps.Map(document.getElementById('map'), {
        center: {
          lat: 31.291038,
          lng: 121.425096
        },
        zoom: 15,
        disableDefaultUI: true,
        panControl: true,
        zoomControl: true
      }) // Create the search box and link it to the UI element.

      const input = document.getElementById('pac-input')
      const searchBox = new google.maps.places.SearchBox(input)
      map.controls[google.maps.ControlPosition.TOP_LEFT].push(input) // Bias the SearchBox results towards current map's viewport.

      map.addListener('bounds_changed', () => {
        searchBox.setBounds(map.getBounds())
      })
      let markers = [] // Listen for the event fired when the user selects a prediction and retrieve
      // more details for that place.

      searchBox.addListener('places_changed', () => {
        const places = searchBox.getPlaces()

        if (places.length == 0) {
          return
        } // Clear out the old markers.

        markers.forEach(marker => {
          marker.setMap(null)
        })
        markers = [] // For each place, get the icon, name and location.

        const bounds = new google.maps.LatLngBounds()
        places.forEach(place => {
          if (!place.geometry) {
            console.log('Returned place contains no geometry')
            return
          }

          // const icon = {
          //   url: place.icon,
          //   size: new google.maps.Size(71, 71),
          //   origin: new google.maps.Point(0, 0),
          //   anchor: new google.maps.Point(17, 34),
          //   scaledSize: new google.maps.Size(25, 25)
          // } // Create a marker for each place.

          markers.push(
            new google.maps.Marker({
              map,
              // icon,
              title: place.name,
              position: place.geometry.location
            })
          )
          console.log('经纬度', markers[0].position)
          if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport)
          } else {
            bounds.extend(place.geometry.location)
          }
        })
        this.lng = markers[0].position.lng()
        this.lat = markers[0].position.lat()
        console.log('经度1', markers[0].position.lng(), '维度', markers[0].position.lat())
        console.log(markers)
        map.fitBounds(bounds)
      })
    }
  },
  components: {
  },
  mounted () {
    console.log('load initAutocomplete')
    this.initAutocomplete()
  }
}
</script>

<style type="text/css">
  /* Always set the map height explicitly to define the size of the div
       * element that contains the map. */
  #map {
    height: 100%;
  }

  /* Optional: Makes the sample page fill the window. */
  html,
  body {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  #description {
    font-family: Roboto;
    font-size: 15px;
    font-weight: 300;
  }

  #infowindow-content .title {
    font-weight: bold;
  }

  #infowindow-content {
    display: none;
  }

  #map #infowindow-content {
    display: inline;
  }

  .pac-card {
    margin: 10px 10px 0 0;
    border-radius: 2px 0 0 2px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    outline: none;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
    background-color: #fff;
    font-family: Roboto;
  }

  #pac-container {
    padding-bottom: 12px;
    margin-right: 12px;
  }

 /* .pac-controls {
    display: inline-block;
    padding: 5px 11px;
  }

  .pac-controls label {
    font-family: Roboto;
    font-size: 13px;
    font-weight: 300;
  } */

  #pac-input {
   display: inline-block;
    width: 100%;
    height: 32px;
    line-height: 1.5;
    padding: 4px 7px;
    font-size: 14px;
    border: 1px solid #dcdee2;
    border-radius: 4px;
    color: #515a6e;
    background: #fff;
    background-image: none;
    position: relative;
    cursor: text;
    transition: border 0.2s ease-in-out, background 0.2s ease-in-out,
      box-shadow 0.2s ease-in-out;
    width: 280px;
    position: absolute !important;
    left: 10px !important;
    top: 10px !important;
    z-index: 99998 !important;
    padding-right: 30px;
  }

  .pac-inputico {
    position: absolute;
    left: 265px;
    top: 17px;
    font-size: 18px;
    z-index: 99998;
    color: #999;
  }

  #pac-input:focus {
    border-color: #4d90fe;
  }

  #title {
    color: #fff;
    background-color: #4d90fe;
    font-size: 25px;
    font-weight: 500;
    padding: 6px 12px;
  }

  #target {
    width: 345px;
  }

  .pac-container {
    z-index: 99999;
  }

  .pac-item {
    text-indent: 5px;
    line-height: 40px;
    border-top: 1px solid #f3f3f3;
  }

  .pac-icon {
    display: none;
  }
</style>
