<template>
  <div id="home">
    <header id="header">
      <van-swipe @change="onChange" :show-indicators="false" :touchable="true">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <!-- <img :src="image" /> -->
          <div class="swipeLi" :style="{backgroundImage: 'url(' + image + ')' }"></div>
        </van-swipe-item>
        <template #indicator>
          <div class="custom-indicator">
            {{ current + 1 }}/{{currentLength}}
          </div>
        </template>
      </van-swipe>
    </header>
    <div class="home_content">
      <!-- <div v-if="this.commonApi.getRequest().language ==='Mandarin'"> -->
        <div v-if="languageText ==='Mandarin'">
        <div class="tag_price tagCn">
          <div class="pricebox" v-show="isShowSalePrice">
            <span class="saleStatus">售</span>
            <span class="yue">约</span>
            <span>¥{{this.commonApi.formatNumber(parseInt((price * exchangeRate / 7) /10000) )}}万</span>
            <!-- <span>¥{{this.commonApi.formatNumber(Math.round(((price / exchangeRate) * 7 /10000) * 100) / 100)}}万</span> -->
            <span class="priceNow">{{currency.split(',')[2]}}{{this.commonApi.formatNumber(price)}}</span>
            <span class="iconTipBox"> <img src="../assets/Iconmetro.png" alt="" class="iconTip" @click="alertTip" />
              <div class="tipBox">
                <div class="tipNotice" v-show="istip">
                  <div>售价以外币为准</br>
                    人民币仅供参考</div>
                </div>
              </div>
            </span>


          </div>
          <div class="pricebox" v-show="isShowrentingPrice">
            <span class="rentStatus">租</span>
            <span class="yue">约</span>
            <span>¥{{this.commonApi.formatNumber(parseInt(((rentingPrice * exchangeRate / 7)) ))}}/月</span>
            <span class="priceNow">{{currency.split(',')[2]}}{{this.commonApi.formatNumber(rentingPrice)}}/mo</span>
            <span class="iconTipBox"> <img src="../assets/Iconmetro.png" alt="" class="iconTip" @click="alertTipRent" />
              <div class="tipBox">

                <div class="tipNotice" v-show="istiprent">

                  <div>售价以外币为准</br>
                    人民币仅供参考</div>
                </div>
              </div>
            </span>

          </div>
        </div>
        <div class="infobox" v-show="isnoraml">
          <div class="infoli">
            <div class="typeText">
              {{propertyTypeText}}
            </div>
            <div class="typedesign">
              物业类型
            </div>
          </div>
          <div class="infoli">
            <div class="typeText">

              <span v-if ="this.bedrooms === 0">标间</span>
              <span v-else ="this.bedrooms !==0 ">
                {{bedrooms}}室
                <span v-if="this.bathrooms === 0">-卫</span>
                <span v-else="this.bathrooms !== 0">{{bathrooms}}卫</span>
              </span>
              <!-- <span v-if="this.bedrooms === 0">-室<span v-if="this.bathrooms === 0 ">-卫</span></span> -->
            </div>
            <div class="typedesign">
              房型
            </div>
          </div>
          <div class="infoli">
            <div class="typeText">
              <span>{{this.commonApi.formatNumber(floorSize)}} ㎡</span>
            </div>
            <div class="typedesign">
              使用面积
            </div>
          </div>

        </div>
        <div class="infoload">
          <div v-show="isload"><span>{{propertyTypeText}}</span><span>{{this.commonApi.formatNumber(floorSize)}} ㎡</span></div>
          <div v-show="isload1"><span>{{propertyTypeText}}</span><span>{{this.commonApi.formatNumber(landSize)}} sqm</span></div>
          <div v-show="isloadT"><span>{{propertyTypeText}}</span><span>{{this.commonApi.formatNumber(landSize)}} ㎡ /
              {{this.commonApi.formatNumber(landSizeT)}} rai {{this.commonApi.formatNumber(landSizeTT)}} ngan
              {{this.commonApi.formatNumber(landSizeTTT)}} sqw</span></div>
        </div>
      </div>
      <div v-else="this.commonApi.getRequest().language !==='Mandarin'">
        <div class="priceBoxHead">
            <div class="tag_price">
                <div v-show="isShowSalePrice" class="saleStatusother">{{currency.split(',')[2]}}{{this.commonApi.formatNumber(price)}}</div>
                <div v-show="isShowrentingPrice" class="rentStatusother">{{currency.split(',')[2]}}{{this.commonApi.formatNumber(rentingPrice)}}/mo</div></div>
              <div class="tag_size">
                <span v-show="isTrue1" v-if="this.bedrooms === 0">Studio | </span>
                <span v-show="isTrue1" v-else="this.bedrooms == 0">{{bedrooms}} {{beds}} | </span>
                <span v-show="isTrue2">{{bathrooms}} ba |</span>
                <span v-show="isTrue3">{{this.commonApi.formatNumber(floorSize)}} sqm</span>
                <span v-show="isTrue6">{{this.commonApi.formatNumber(landSize)}} sqm /
                  {{this.commonApi.formatNumber(landSizeT)}} rai {{this.commonApi.formatNumber(landSizeTT)}} ngan
                  {{this.commonApi.formatNumber(landSizeTTT)}} sqw</span>
                <span v-show="isTrue4">{{this.commonApi.formatNumber(landSize)}} sqm</span>

              </div>
              <div class="tag_location"><img src="../assets/IconMaterial.png" alt="">
                <div class="text_location">{{community}}, {{address}}</div>
              </div>
              <div color="#fff" text-color="#393E41" class="tag_status"><span class="icon_status" :style="{'background':getBackground}"></span>{{propertyTypeText}}
                {{hourseStatusText}}
              </div>

        </div>
      </div>
      <van-divider />
      <van-row>
        <van-col span="24">

          <div class="title">{{$t("Description")}}</div>
          <van-cell value="" size="" class="description" ref="getheight" :class="{styleHeight:this.isheight}">
            {{description}}
          </van-cell>
          <div class="more_Describe" @click="heightShow" v-if="this.isheight">{{$t("More")}}</div>
        </van-col>
      </van-row>
      <van-divider />
      <van-row>
        <van-col span="24">
          <div class="title">{{$t("Location")}}</div>
          <div v-if="this.commonApi.getRequest().language ==='Mandarin'">
            <!-- <div v-if="languageText ==='Mandarin'"> -->
            <div class="tag_location"><img src="../assets/IconMaterial.png" alt="">
              <div class="text_location">{{community}}, {{address}}</div>
            </div>
          </div>
          <div v-else="this.commonApi.getRequest().language !=='Mandarin'">

          </div>
          <div class="loctionBox" @click="mapClicked">
            <div id="map" style="  height: 100%;width:100%"></div>
          </div>
        </van-col>
      </van-row>
      <van-divider v-show="isAllfasle" />
      <van-row>
        <van-col class="width_List" v-show="isAllfasle">
          <div class="title">{{$t("Listing")}}</div>
          <van-row type="flex" class="numBox" v-show="isShowYear">
            <van-col class="imgDetails"><img src="../assets/calendar.png" alt=""></van-col>
            <van-col class="textDetails">{{$t("YearBuilt:")}}</van-col>
            <van-col class="num">{{builtYear}}</van-col>
          </van-row>
          <van-row type="flex" class="numBox" v-show="isShowPrice">
            <van-col class="imgDetails"><img src="../assets/price.png" alt=""></van-col>
            <van-col class="textDetails">{{$t("Price/sqm:")}}</van-col>
            <van-col class="num">{{currency.split(',')[2]}}{{this.commonApi.formatNumber(price_sqm)}}</van-col>
          </van-row>
          <van-row type="flex" class="numBox" v-show="isShowLand">
            <van-col class="imgDetails"><img src="../assets/landSize.png" alt=""></van-col>
            <van-col class="textDetails">{{$t("LandSize:")}}</van-col>
            <van-col class="num">{{this.commonApi.formatNumber(landSize)}} sqm</van-col>
          </van-row>
          <van-row type="flex" class="numBox" v-show="isShowParking">
            <van-col class="imgDetails"><img src="../assets/parking.png" alt=""></van-col>
            <van-col class="textDetails">{{$t("Parking:")}}</van-col>
            <van-col class="num">{{parking}}</van-col>
          </van-row>
        </van-col>
        <van-col span="24">
          <van-divider />
          <div class="title">{{$t("Explore")}}</div>
           <div v-if="this.commonApi.getRequest().language ==='Mandarin'">
          <!-- <div v-if="languageText ==='Mandarin'"> -->
            <van-swipe :loop="false" width="152" :show-indicators="false">
              <van-swipe-item v-for="(item, index) in otherHouse" :key="index" @click="locationDetail(item)" class="swipeHouse">
                <div class="swipeLiHouse" :style="{backgroundImage: 'url(' + item.photos.split(',')[0] + ')' }"></div>

                <div v-if="item.listingType === 1">
                  <div v-if="item.propertyType === 1 || item.propertyType === 3">
                    <!-- <div class="price_swiper">{{item.currency.split(',')[2]}}{{formatNumber(item.rentingPrice)}}/mo</div> -->
                    <div class="price_swiper" v-if="parseInt(item.sellingPrice * exchangeRate /70000) > 0">约 ¥{{formatNumber(parseInt(item.sellingPrice * exchangeRate /70000))}}万</div>
                    <div class="price_swiper" v-else="parseInt(item.sellingPrice * exchangeRate /70000) > 0">约 ¥{{formatNumber(parseInt(item.sellingPrice * exchangeRate /7))}}</div>
                    <!-- <div class="price_swiper">约 ¥ {{formatNumber(item.sellingPrice)}}/月</div> -->
                    <div class="van-ellipsis loction_swiper">{{item.community}} · {{item.city}}</div>
                    <div class="size_swiper">
                      <span v-if="item.bedrooms === 0">单间</span><span v-else-if="item.bedrooms !== 0">{{item.bedrooms}}室</span>
                      <span v-else="item.bathrooms === 0">-卫</span><span v-else="item.bathrooms !== 0">{{item.bathrooms}}卫</span>
                      <span> | {{formatNumber(item.floorSize)}} ㎡</span>
                    </div>
                  </div>
                  <div v-else-if="item.propertyType === 2 || item.propertyType === 4">
                    <!-- <div class="price_swiper">{{item.currency.split(',')[2]}}{{formatNumber(item.rentingPrice)}}/mo</div> -->
                    <!-- <div class="price_swiper">{{item.currency.split(',')[2]}}{{formatNumber(item.sellingPrice)}}</div> -->
                    <div class="price_swiper" v-if="parseInt(item.sellingPrice * exchangeRate /70000) > 0">约 ¥{{formatNumber(parseInt(item.sellingPrice * exchangeRate /70000))}}万</div>
                    <div class="price_swiper" v-else="parseInt(item.sellingPrice * exchangeRate /70000) > 0">约 ¥{{formatNumber(parseInt(item.sellingPrice * exchangeRate /7))}}</div>
                    <div class="van-ellipsis loction_swiper">{{item.community}} · {{item.city}}</div>
                    <div class="size_swiper">
                      <span v-if="item.bedrooms === 0">-室</span><span v-else-if="item.bedrooms > 1">{{item.bedrooms}}室</span><span
                        v-else="item.bedrooms === 1 & item.bathrooms === 0 ||item.bathrooms===1">单间</span>
                      <span v-if="item.bathrooms === 0">-卫</span><span v-else="item.bathrooms > 0">{{item.bathrooms}}卫</span>
                      <span> | {{formatNumber(item.floorSize)}} ㎡</span>
                    </div>
                  </div>
                  <div v-else-if="item.propertyType === 5 ||  item.propertyType === 6">
                    <!-- <div class="price_swiper">{{item.currency.split(',')[2]}}{{formatNumber(item.rentingPrice)}}/mo</div> -->
                    <!-- <div class="price_swiper">{{item.currency.split(',')[2]}}{{formatNumber(item.sellingPrice)}}</div> -->
                    <div class="price_swiper" v-if="parseInt(item.sellingPrice * exchangeRate /70000) > 0">约 ¥{{formatNumber(parseInt(item.sellingPrice * exchangeRate /70000))}}万</div>
                    <div class="price_swiper" v-else="parseInt(item.sellingPrice * exchangeRate /70000) > 0">约 ¥{{formatNumber(parseInt(item.sellingPrice * exchangeRate /7))}}</div>


                    <div class="van-ellipsis loction_swiper">{{item.community}} · {{item.city}}</div>
                    <div class="size_swiper">
                      <!-- <span >{{item.bedrooms}}{{beds}} | </span> -->

                      <!-- <span >{{item.bathrooms}}ba |</span> -->
                      <span>{{formatNumber(item.floorSize)}} sqm</span>
                      <!-- <span>{{formatNumber(item.landSize)}} sqm</span> -->
                    </div>
                  </div>
                  <div v-else="item.propertyType === 7">
                    <!-- <div class="price_swiper">{{item.currency.split(',')[2]}}{{formatNumber(item.rentingPrice)}}/mo</div> -->
                    <!-- <div class="price_swiper">{{item.currency.split(',')[2]}}{{formatNumber(item.sellingPrice)}}</div> -->
                    <div class="price_swiper" v-if="parseInt(item.sellingPrice * exchangeRate /70000) > 0">约 ¥{{formatNumber(parseInt(item.sellingPrice * exchangeRate /70000))}}万</div>
                    <div class="price_swiper" v-else="parseInt(item.sellingPrice * exchangeRate /70000) > 0">约 ¥{{formatNumber(parseInt(item.sellingPrice * exchangeRate /7))}}</div>
                    <div class="van-ellipsis loction_swiper">{{item.community}} · {{item.city}}</div>
                    <div class="size_swiper">
                      <!-- <span >{{item.bedrooms}}{{beds}} | </span> -->
                      <!-- <span >{{item.bathrooms}}ba |</span> -->
                      <!-- <span >{{formatNumber(item.floorSize)}} sqm</span> -->
                      <span>{{formatNumber(item.landSize)}} sqm</span>
                    </div>
                  </div>
                </div>

                <!-- ------------------------------------------ rent -->
                <div v-else-if="item.listingType === 2">
                  <div v-if="item.propertyType === 1 || item.propertyType === 3">
                    <!-- <div class="price_swiper">{{item.currency.split(',')[2]}}{{formatNumber(item.rentingPrice)}}/mo</div> -->
                    <div class="price_swiper">约 ¥{{formatNumber(parseInt(item.rentingPrice * exchangeRate /7))}}/月</div>
                    <!-- <div class="price_swiper">{{item.currency.split(',')[2]}}{{formatNumber(item.sellingPrice)}}</div> -->
                    <div class="van-ellipsis loction_swiper">{{item.community}} · {{item.city}}</div>
                    <div class="size_swiper">
                      <span v-if="item.bedrooms === 0">-室</span><span v-else="item.bedrooms > 1">{{item.bedrooms}}室</span><span
                        v-else="item.bedrooms === 1 & item.bathrooms === 0 ||item.bathrooms===1">单间</span>
                      <span v-if="item.bathrooms === 0">-卫</span><span v-else="item.bathrooms > 0">{{item.bathrooms}}卫</span>
                      <span> | {{formatNumber(item.floorSize)}} ㎡</span>
                    </div>
                  </div>
                  <div v-else-if="item.propertyType === 2 || item.propertyType === 4">
                    <!-- <div class="price_swiper">{{item.currency.split(',')[2]}}{{formatNumber(item.rentingPrice)}}/mo</div> -->
                    <div class="price_swiper">约 ¥{{formatNumber(parseInt(item.rentingPrice * exchangeRate /7))}}/月</div>
                    <!-- <div class="price_swiper">{{item.currency.split(',')[2]}}{{formatNumber(item.sellingPrice)}}</div> -->
                    <div class="van-ellipsis loction_swiper">{{item.community}} · {{item.city}}</div>
                    <div class="size_swiper">
                      <span v-if="item.bedrooms === 0">-室</span><span v-else-if="item.bedrooms > 1">{{item.bedrooms}}室</span><span
                        v-else="item.bedrooms === 1 & item.bathrooms === 0 ||item.bathrooms===1">单间</span>
                      <span v-if="item.bathrooms === 0">-卫</span><span v-else="item.bathrooms > 0">{{item.bathrooms}}卫</span>
                      <span> | {{formatNumber(item.floorSize)}} ㎡</span>
                    </div>
                  </div>
                  <div v-else-if="item.propertyType === 5 || item.propertyType === 6 ">
                    <!-- <div class="price_swiper">{{item.currency.split(',')[2]}}{{formatNumber(item.rentingPrice)}}/mo</div> -->
                    <div class="price_swiper">约 ¥{{formatNumber(parseInt(item.rentingPrice * exchangeRate /7))}}/月</div>
                    <!-- <div class="price_swiper">{{item.currency.split(',')[2]}}{{formatNumber(item.sellingPrice)}}</div> -->
                    <div class="van-ellipsis loction_swiper">{{item.community}} · {{item.city}}</div>
                    <div class="size_swiper">
                      <!-- <span >{{item.bedrooms}}{{beds}} | </span> -->
                      <!-- <span >{{item.bathrooms}}ba |</span> -->
                      <span>{{formatNumber(item.floorSize)}} ㎡</span>
                      <!-- <span v-show="isTrue14">{{formatNumber(item.landSize)}} sqm</span> -->
                    </div>
                  </div>
                  <div v-else="item.propertyType === 7">
                    <!-- <div class="price_swiper">{{item.currency.split(',')[2]}}{{formatNumber(item.rentingPrice)}}/mo</div> -->
                    <div class="price_swiper">约 ¥{{formatNumber(parseInt(item.rentingPrice * exchangeRate /7))}}/月</div>
                    <!-- <div class="price_swiper">{{item.currency.split(',')[2]}}{{formatNumber(item.sellingPrice)}}</div> -->
                    <div class="van-ellipsis loction_swiper">{{item.community}} · {{item.city}}</div>
                    <div class="size_swiper">
                      <!-- <span >{{item.bedrooms}}{{beds}} | </span> -->
                      <!-- <span >{{item.bathrooms}}ba |</span> -->
                      <!-- <span >{{formatNumber(item.floorSize)}} sqm</span> -->
                      <span>{{formatNumber(item.landSize)}} ㎡</span>
                    </div>
                  </div>
                </div>
                <!-- ---------------------rent & sale----------------- -->
                <div v-else="item.listingType === 3">
                  <div v-if="item.propertyType === 1 || item.propertyType === 3">
                    <!-- <div class="price_swiper">{{item.currency.split(',')[2]}}{{formatNumber(item.rentingPrice)}}/mo</div> -->
                    <!-- <div class="price_swiper">{{item.currency.split(',')[2]}}{{formatNumber(item.sellingPrice)}}</div> -->
                    <div class="price_swiper">约 ¥{{formatNumber(parseInt(item.sellingPrice * exchangeRate /70000))}}万</div>
                    <div class="van-ellipsis loction_swiper">{{item.community}} · {{item.city}}</div>
                    <div class="size_swiper">
                      <span v-if="item.bedrooms === 0">-室</span><span v-else-if="item.bedrooms > 1">{{item.bedrooms}}室</span><span
                        v-else="item.bedrooms === 1 & item.bathrooms === 0 ||item.bathrooms===1">单间</span>
                      <span v-if="item.bathrooms === 0">-卫</span><span v-else="item.bathrooms > 0">{{item.bathrooms}}卫</span>
                      <span> | {{formatNumber(item.floorSize)}} ㎡</span>
                    </div>
                  </div>
                  <div v-else-if="item.propertyType === 2 ||  item.propertyType === 4">
                    <!-- <div class="price_swiper">{{item.currency.split(',')[2]}}{{formatNumber(item.rentingPrice)}}/mo</div> -->
                    <!-- <div class="price_swiper">{{item.currency.split(',')[2]}}{{formatNumber(item.sellingPrice)}}</div> -->
                    <!-- <div class="price_swiper">约 ¥{{formatNumber(parseInt(item.sellingPrice * exchangeRate /70000))}}万</div> -->
                    <div class="price_swiper" v-if="parseInt(item.sellingPrice * exchangeRate /70000) > 0">约 ¥{{formatNumber(parseInt(item.sellingPrice * exchangeRate /70000))}}万</div>
                    <div class="price_swiper" v-else="parseInt(item.sellingPrice * exchangeRate /70000) > 0">约 ¥{{formatNumber(parseInt(item.sellingPrice * exchangeRate /7))}}</div>

                    <div class="van-ellipsis loction_swiper">{{item.community}} · {{item.city}}</div>
                    <div class="size_swiper">
                      <span v-if="item.bedrooms === 0">-室</span><span v-else-if="item.bedrooms > 1">{{item.bedrooms}}室</span><span
                        v-else="item.bedrooms === 1 & item.bathrooms === 0 ||item.bathrooms===1">单间</span>
                      <span v-if="item.bathrooms === 0">-卫</span><span v-else="item.bathrooms > 0">{{item.bathrooms}}卫</span>
                      <span> | {{formatNumber(item.floorSize)}} ㎡</span>
                    </div>
                  </div>
                  <div v-else-if="item.propertyType === 5 ||  item.propertyType === 6">
                    <!-- <div class="price_swiper">{{item.currency.split(',')[2]}}{{formatNumber(item.rentingPrice)}}/mo</div> -->
                    <!-- <div class="price_swiper">{{item.currency.split(',')[2]}}{{formatNumber(item.sellingPrice)}}</div> -->
                    <!-- <div class="price_swiper">约 ¥{{formatNumber(parseInt(item.sellingPrice * exchangeRate /70000))}}万</div> -->
                    <div class="price_swiper" v-if="parseInt(item.sellingPrice * exchangeRate /70000) > 0">约 ¥{{formatNumber(parseInt(item.sellingPrice * exchangeRate /70000))}}万</div>
                    <div class="price_swiper" v-else="parseInt(item.sellingPrice * exchangeRate /70000) > 0">约 ¥{{formatNumber(parseInt(item.sellingPrice * exchangeRate /7))}}</div>

                    <div class="van-ellipsis loction_swiper">{{item.community}} · {{item.city}}</div>
                    <div class="size_swiper">
                      <!-- <span >{{item.bedrooms}}{{beds}} | </span> -->
                      <!-- <span >{{item.bathrooms}}ba |</span> -->
                      <span>{{formatNumber(item.floorSize)}} ㎡</span>
                      <!-- <span>{{formatNumber(item.landSize)}} sqm</span> -->
                    </div>
                  </div>
                  <div v-else="item.propertyType === 7">
                    <!-- <div class="price_swiper">{{item.currency.split(',')[2]}}{{formatNumber(item.rentingPrice)}}/mo</div> -->
                    <!-- <div class="price_swiper">{{item.currency.split(',')[2]}}{{formatNumber(item.sellingPrice)}}</div> -->
                    <!-- <div class="price_swiper">约 ¥{{formatNumber(parseInt(item.sellingPrice * exchangeRate /70000))}}万</div> -->
                    <div class="price_swiper" v-if="parseInt(item.sellingPrice * exchangeRate /70000) > 0">约 ¥{{formatNumber(parseInt(item.sellingPrice * exchangeRate /70000))}}万</div>
                    <div class="price_swiper" v-else="parseInt(item.sellingPrice * exchangeRate /70000) > 0">约 ¥{{formatNumber(parseInt(item.sellingPrice * exchangeRate /7))}}</div>

                    <div class="van-ellipsis loction_swiper">{{item.community}} · {{item.city}}</div>
                    <div class="size_swiper">
                      <!-- <span >{{item.bedrooms}}{{beds}} | </span> -->
                      <!-- <span >{{item.bathrooms}}ba |</span> -->
                      <!-- <span >{{formatNumber(item.floorSize)}} sqm</span> -->
                      <span>{{formatNumber(item.landSize)}} ㎡</span>
                    </div>
                  </div>
                </div>


              </van-swipe-item>
            </van-swipe>
          </div>

          <div v-else="this.commonApi.getRequest().language !=='Mandarin'">
            <!-- <div v-else="languageText !=='Mandarin'"> -->
            <van-swipe :loop="false" width="152" :show-indicators="false">
              <van-swipe-item v-for="(item, index) in otherHouse" :key="index" @click="locationDetail(item)" class="swipeHouse">
                <div class="swipeLiHouse" :style="{backgroundImage: 'url(' + item.photos.split(',')[0] + ')' }"></div>
                <!-- -------------------------buy------------- -->
                <div v-if="item.listingType === 1">
                  <div v-if="item.propertyType === 1 || item.propertyType === 3">
                    <!-- <div class="price_swiper">{{item.currency.split(',')[2]}}{{formatNumber(item.rentingPrice)}}/mo</div> -->
                    <div class="price_swiper">{{item.currency.split(',')[2]}}{{formatNumber(item.sellingPrice)}}</div>
                    <div class="van-ellipsis loction_swiper">{{item.community}} · {{item.city}}</div>
                    <div class="size_swiper">
                      <span v-if="item.bedrooms === 0">-bd | </span>
                      <span v-else-if="item.bedrooms === 1">studio bd | </span>
                      <span v-else="item.bedrooms >1">{{item.bedrooms}} bds | </span>
                      <span v-if="item.bathrooms === 0">{{item.bathrooms}}-ba |</span>
                      <span v-else="item.bathrooms > 0">{{item.bathrooms}}ba |</span>
                      <span>{{formatNumber(item.floorSize)}} sqm</span>
                      <!-- <span v-show="isTrue14">{{formatNumber(item.landSize)}} sqm</span> -->
                    </div>
                  </div>
                  <div v-else-if="item.propertyType === 2 || item.propertyType === 4">
                    <!-- <div class="price_swiper">{{item.currency.split(',')[2]}}{{formatNumber(item.rentingPrice)}}/mo</div> -->
                    <div class="price_swiper">{{item.currency.split(',')[2]}}{{formatNumber(item.sellingPrice)}}</div>
                    <div class="van-ellipsis loction_swiper">{{item.community}} · {{item.city}}</div>
                    <div class="size_swiper">
                      <span v-if="item.bedrooms === 0">-bd | </span>
                      <span v-else-if="item.bedrooms === 1">studio bd | </span>
                      <span v-else="item.bedrooms >1">{{item.bedrooms}} bds | </span>
                      <span v-if="item.bathrooms === 0">{{item.bathrooms}}-ba |</span>
                      <span v-else="item.bathrooms > 0">{{item.bathrooms}}ba |</span>
                      <span>{{formatNumber(item.floorSize)}} sqm</span>
                      <!-- <span >{{formatNumber(item.landSize)}} sqm</span> -->
                    </div>
                  </div>
                  <div v-else-if="item.propertyType === 5 ||  item.propertyType === 6">
                    <!-- <div class="price_swiper">{{item.currency.split(',')[2]}}{{formatNumber(item.rentingPrice)}}/mo</div> -->
                    <div class="price_swiper">{{item.currency.split(',')[2]}}{{formatNumber(item.sellingPrice)}}</div>
                    <div class="van-ellipsis loction_swiper">{{item.community}} · {{item.city}}</div>
                    <div class="size_swiper">
                      <!-- <span >{{item.bedrooms}}{{beds}} | </span> -->

                      <!-- <span >{{item.bathrooms}}ba |</span> -->
                      <span>{{formatNumber(item.floorSize)}} sqm</span>
                      <!-- <span>{{formatNumber(item.landSize)}} sqm</span> -->
                    </div>
                  </div>
                  <div v-else="item.propertyType === 7">
                    <!-- <div class="price_swiper">{{item.currency.split(',')[2]}}{{formatNumber(item.rentingPrice)}}/mo</div> -->
                    <div class="price_swiper">{{item.currency.split(',')[2]}}{{formatNumber(item.sellingPrice)}}</div>
                    <div class="van-ellipsis loction_swiper">{{item.community}} · {{item.city}}</div>
                    <div class="size_swiper">
                      <!-- <span >{{item.bedrooms}}{{beds}} | </span> -->
                      <!-- <span >{{item.bathrooms}}ba |</span> -->
                      <!-- <span >{{formatNumber(item.floorSize)}} sqm</span> -->
                      <span>{{formatNumber(item.landSize)}} sqm</span>
                    </div>
                  </div>
                </div>

                <!-- ------------------------------------------ rent -->
                <div v-else-if="item.listingType === 2">
                  <div v-if="item.propertyType === 1 || item.propertyType === 3">
                    <div class="price_swiper">{{item.currency.split(',')[2]}}{{formatNumber(item.rentingPrice)}}/mo</div>
                    <!-- <div class="price_swiper">{{item.currency.split(',')[2]}}{{formatNumber(item.sellingPrice)}}</div> -->
                    <div class="van-ellipsis loction_swiper">{{item.community}} · {{item.city}}</div>
                    <div class="size_swiper">
                      <!-- <span >{{item.bedrooms}}{{beds}} | </span> -->
                      <span v-if="item.bedrooms === 0">-bd | </span>
                      <span v-else-if="item.bedrooms === 1">studio bd | </span>
                      <span v-else="item.bedrooms >1">{{item.bedrooms}} bds | </span>
                      <span v-if="item.bathrooms === 0">{{item.bathrooms}}-ba |</span>
                      <span v-else="item.bathrooms > 0">{{item.bathrooms}}ba |</span>
                      <span>{{formatNumber(item.floorSize)}} sqm</span>
                      <!-- <span v-show="isTrue14">{{formatNumber(item.landSize)}} sqm</span> -->
                    </div>
                  </div>
                  <div v-else-if="item.propertyType === 2 || item.propertyType === 4">
                    <div class="price_swiper">{{item.currency.split(',')[2]}}{{formatNumber(item.rentingPrice)}}/mo</div>
                    <!-- <div class="price_swiper">{{item.currency.split(',')[2]}}{{formatNumber(item.sellingPrice)}}</div> -->
                    <div class="van-ellipsis loction_swiper">{{item.community}} · {{item.city}}</div>
                    <div class="size_swiper">
                      <!-- <span >{{item.bedrooms}}{{beds}} | </span> -->
                      <!-- <span v-if="item.bedrooms === 0">- | </span> -->
                      <span v-if="item.bedrooms === 0">-bd | </span>
                      <span v-else-if="item.bedrooms === 1">studio bd | </span>
                      <span v-else="item.bedrooms >1">{{item.bedrooms}} bds | </span>
                      <span v-if="item.bathrooms === 0">{{item.bathrooms}}-ba |</span>
                      <span v-else="item.bathrooms > 0">{{item.bathrooms}}ba |</span>
                      <span>{{formatNumber(item.floorSize)}} sqm</span>
                      <!-- <span >{{formatNumber(item.landSize)}} sqm</span> -->
                    </div>
                  </div>
                  <div v-else-if="item.propertyType === 5 || item.propertyType === 6 ">
                    <div class="price_swiper">{{item.currency.split(',')[2]}}{{formatNumber(item.rentingPrice)}}/mo</div>
                    <!-- <div class="price_swiper">{{item.currency.split(',')[2]}}{{formatNumber(item.sellingPrice)}}</div> -->
                    <div class="van-ellipsis loction_swiper">{{item.community}} · {{item.city}}</div>
                    <div class="size_swiper">
                      <!-- <span >{{item.bedrooms}}{{beds}} | </span> -->
                      <!-- <span >{{item.bathrooms}}ba |</span> -->
                      <span>{{formatNumber(item.floorSize)}} sqm</span>
                      <!-- <span v-show="isTrue14">{{formatNumber(item.landSize)}} sqm</span> -->
                    </div>
                  </div>
                  <div v-else="item.propertyType === 7">
                    <div class="price_swiper">{{item.currency.split(',')[2]}}{{formatNumber(item.rentingPrice)}}/mo</div>
                    <!-- <div class="price_swiper">{{item.currency.split(',')[2]}}{{formatNumber(item.sellingPrice)}}</div> -->
                    <div class="van-ellipsis loction_swiper">{{item.community}} · {{item.city}}</div>
                    <div class="size_swiper">
                      <!-- <span >{{item.bedrooms}}{{beds}} | </span> -->
                      <!-- <span >{{item.bathrooms}}ba |</span> -->
                      <!-- <span >{{formatNumber(item.floorSize)}} sqm</span> -->
                      <span>{{formatNumber(item.landSize)}} sqm</span>
                    </div>
                  </div>
                </div>
                <!-- ---------------------rent & sale----------------- -->
                <div v-else="item.listingType === 3">
                  <div v-if="item.propertyType === 1 || item.propertyType === 3">
                    <div class="price_swiper">{{item.currency.split(',')[2]}}{{formatNumber(item.rentingPrice)}}/mo</div>
                    <div class="price_swiper">{{item.currency.split(',')[2]}}{{formatNumber(item.sellingPrice)}}</div>
                    <div class="van-ellipsis loction_swiper">{{item.community}} · {{item.city}}</div>
                    <div class="size_swiper">
                      <!-- <span >{{item.bedrooms}}{{beds}} | </span> -->
                      <span v-if="item.bedrooms === 0">-bd | </span>
                      <span v-else-if="item.bedrooms === 1">studio bd | </span>
                      <span v-else="item.bedrooms >1">{{item.bedrooms}} bds | </span>
                      <span v-if="item.bathrooms === 0">{{item.bathrooms}}-ba |</span>
                      <span v-else="item.bathrooms > 0">{{item.bathrooms}}ba |</span>
                      <span>{{formatNumber(item.floorSize)}} sqm</span>
                      <!-- <span v-show="isTrue14">{{formatNumber(item.landSize)}} sqm</span> -->
                    </div>
                  </div>
                  <div v-else-if="item.propertyType === 2 ||  item.propertyType === 4">
                    <div class="price_swiper">{{item.currency.split(',')[2]}}{{formatNumber(item.rentingPrice)}}/mo</div>
                    <div class="price_swiper">{{item.currency.split(',')[2]}}{{formatNumber(item.sellingPrice)}}</div>
                    <div class="van-ellipsis loction_swiper">{{item.community}} · {{item.city}}</div>
                    <div class="size_swiper">
                      <span v-if="item.bedrooms === 0">-bd | </span>
                      <span v-else-if="item.bedrooms === 1">studio bd | </span>
                      <span v-else="item.bedrooms >1">{{item.bedrooms}} bds | </span>
                      <span v-if="item.bathrooms === 0">{{item.bathrooms}}-ba |</span>
                      <span v-else="item.bathrooms > 0">{{item.bathrooms}}ba |</span>
                      <span>{{formatNumber(item.floorSize)}} sqm</span>
                      <!-- <span >{{formatNumber(item.landSize)}} sqm</span> -->
                    </div>
                  </div>
                  <div v-else-if="item.propertyType === 5 ||  item.propertyType === 6">
                    <!-- <div class="price_swiper">{{item.currency.split(',')[2]}}{{formatNumber(item.rentingPrice)}}/mo</div> -->
                    <div class="price_swiper">{{item.currency.split(',')[2]}}{{formatNumber(item.sellingPrice)}}</div>
                    <div class="van-ellipsis loction_swiper">{{item.community}} · {{item.city}}</div>
                    <div class="size_swiper">
                      <!-- <span >{{item.bedrooms}}{{beds}} | </span> -->
                      <!-- <span >{{item.bathrooms}}ba |</span> -->
                      <span>{{formatNumber(item.floorSize)}} sqm</span>
                      <!-- <span>{{formatNumber(item.landSize)}} sqm</span> -->
                    </div>
                  </div>
                  <div v-else="item.propertyType === 7">
                    <!-- <div class="price_swiper">{{item.currency.split(',')[2]}}{{formatNumber(item.rentingPrice)}}/mo</div> -->
                    <div class="price_swiper">{{item.currency.split(',')[2]}}{{formatNumber(item.sellingPrice)}}</div>
                    <div class="van-ellipsis loction_swiper">{{item.community}} · {{item.city}}</div>
                    <div class="size_swiper">
                      <!-- <span >{{item.bedrooms}}{{beds}} | </span> -->
                      <!-- <span >{{item.bathrooms}}ba |</span> -->
                      <!-- <span >{{formatNumber(item.floorSize)}} sqm</span> -->
                      <span>{{formatNumber(item.landSize)}} sqm</span>
                    </div>
                  </div>
                </div>
              </van-swipe-item>
            </van-swipe>
          </div>

        </van-col>
      </van-row>
      <van-row class="avatorBox">
        <van-col span="8">
        </van-col>
        <van-col span="8" class="imgBox">
          <div class="agentBoxImg">
            <img :src="agentHeader" alt="" class="agent_img">
          </div>
        </van-col>
        <van-col>
        </van-col>
        <van-col span="24">
          <div class="avaRname">{{firstName}} {{lastName}}</div>
        </van-col>
        <van-col span="24" class="avarLine">
          <!-- <div class="avaRname">{{firstName}} {{lastName}}</div> -->
          <div class="line-left"></div>
          <div class="line-radius"></div>
          <div class="line-right"></div>
        </van-col>
        <!-- <div class="avarLine">

        </div> -->
        <van-col class="avarInfo">
          <div>{{$t("Company")}} {{company}}</div>
          <div>{{$t("Language")}} {{language}}</div>
          <div>{{$t("Location1")}} {{serverRegion}}</div>
        </van-col>
        <van-col span="24" class="avarDetail">
          {{memoAgent}}
        </van-col>
      </van-row>


    </div>
    <foot-view :agentHeader="agentHeader" :firstName="firstName" :lastName="lastName" :serverRegion="serverRegion"></foot-view>
    <div class="change">
      <img src="../assets/btn_con.png" alt="" v-on:click='doIt'>
      <div @click="herfProperty" class="text_find" v-show="isChange">{{$t("Find")}}</div>
    </div>
  </div>



</template>

<script>
  // import commonApi from "./commonApi"
  export default {
    data() {
      return {
        isNotCn: false,
        isCn: false,
        istip: false,
        istiprent: false,
        ishourse: false,
        isload: false,
        isload1: false,
        isloadT: false,
        isChange: false,
        beds: 'bds',
        isTrue1: false,
        isTrue2: false,
        isTrue3: false,
        isTrue4: false,
        isTrue6: false,
        isnoraml: true,
        isHidePriceOther: false,
        isShowPriceOther: false,
        isShowrentingPrice: false,
        isShowSalePrice: false,
        isShowFllorSize: false,
        isShowLandSize: false,
        images: [],
        imageLi: '',
        otherHouse: [],
        otherimages: '',
        price:'',
        bedrooms: '',
        bathrooms: '',
        floorSize: '',
        address: '',
        hourseStatus: '',
        hourseStatusText: '',
        propertyTypeText: '',
        description: '',
        lat: '',
        lgt: '',
        builtYear: '',
        landSize: '',
        parking: '',
        agentHeader: '',
        agentId: '',
        firstName: '',
        lastName: '',
        company: '',
        language: '',
        serverRegion: '',
        memoAgent: '',
        styles: 'change',
        // styles:'collapseClose',
        isTrue: false,
        collapseTrue: false,
        current: 0,
        currentLength: 0,
        isheight: false,
        country: '',
        sellingPrice: '',
        rentingPrice: '',
        isShowPrice: false,
        isAllfasle: false,
        isShowLand: false,
        isShowParking: false,
        isShowYear: false,
        currency: '',
        community: '',
        otherAgentId: '',
        otherhouseId: '',
        rentingPriceOther: '',
        sellingPriceOther: '',
        bedroomsOther: '',
        bathroomsOther: '',
        floorSizeOther: '',
        // isTrue11: false,
        // isTrue12: false,
        // isTrue13: false,
        // isTrue14: false,
        languageText: 'Mandarin',
        exchangeRate: '',
        rmbSellPrice: '',
        rmbRentPrice: '',
        price_sqm: '',
        otherHouseLength: '',
        floorSizeT: '',
        floorSizeTT: '',
        floorSizeTTT: '',
        landSizeTT: '',
        landSizeTTT: '',
        landSizeT: '',
        renTTT: '',
        inChina: false
      };
    },

    mounted() {
      // this.initScript()
      this.height = this.$refs.getheight.offsetHeight;
      if (this.height > 120) {
        this.isheight = true
      } else {
        this.isheight = false
      }
      // this.getMap()
    },

    created() {
      window.initAutocomplete = this.getMap
      window.initbdmap = this.initbdmap
      this.getDataHourseDetail();
      this.getDataAgent();
      this.getUserPosition();
      // this.reportData()
      // this.getAreaData();
      // this.rmbSellPrice = (this.price / this.exchangeRate) * 7;
      // this.rmbRentPrice = (this.rentingPrice / this.exchangeRate) * 7;
      // this.languageConuntry = this.commonApi.getRequest().language;
    },
    computed: {
      getBackground() {
        switch (this.hourseStatus) {
          case 1:
            return '#ff77e0';
          case 2:
            return '#13EDFF';
          default:
            return '#FFBA00';
        }
      },


    },
    methods: {
      reportData(name) {
        this.axios.post('api/h5/v1/houses/chat',{
          houseId: this.commonApi.getRequest().houseId,
          agentId: this.commonApi.getRequest().agentId,
          customerName: name || 'auto',
          customerPhone: '',
          customerEmail: '',
          channel: this.commonApi.getRequest().channel,
          language: this.commonApi.getRequest().language,
        })
      },
      getUserPosition() {
        this.axios.get("api/v1/ipType")
        .then(res=> {
          this.inChina = res.data.data.ipType === 'CN'
          this.initScript()
        })
      },
      initbdmap (){
        console.log(2, '-----2-----')
        var map = new BMapGL.Map("map");
        // 创建地图实例 
        var point = new BMapGL.Point(116.404, 39.915);
        // 创建点坐标 
        map.centerAndZoom(point, 15);
      },
      initScript () {
        const mapSdk = document.getElementById('mapSdk')
        if(mapSdk) return 
        const script = document.createElement('script')
        script.id = 'mapSdk'
        const lang = 'en-ww'
        script.src = this.inChina ? 'https://maps.googleapis.com/maps/api/js?key=AIzaSyALodR-VI9EV_CFDOWHZZQgeUWdMP6lZMg&callback=initAutocomplete&libraries=places&v=weekly&language=' + lang 
          : 'https://api.map.baidu.com/api?v=1.0&type=webgl&ak=x0lB5P2zbI53kTPjIiwvu27cNteglr9Y&callback=initbdmap'
        document.getElementsByTagName("head")[0].appendChild(script)
      },
      alertTip: function() {
        this.istip = !this.istip;
      },
      alertTipRent: function() {
        this.istiprent = !this.istiprent;
      },
      onChange(index) {
        this.current = index;
      },
      heightShow: function() {
        this.isheight = false
        // alert(1)
      },
      formatNumber(num) {
        var decimalPart = '';
        num = num.toString();
        if (num.indexOf('.') != -1) {
          decimalPart = '.' + num.split('.')[1];
          num = parseInt(num.split('.')[0]);
        }
        var array = num.toString().split('');
        var index = -3;
        while (array.length + index > 0) {
          array.splice(index, 0, ',');
          index -= 4;
        }
        return array.join('') + decimalPart;
      },

      getDataHourseDetail: function() {

        this.axios.get("/api/h5/v1/houses/id", {
          params: {
            houseId: this.commonApi.getRequest().houseId,
            agentId: this.commonApi.getRequest().agentId
          },
        }).then(res => {
          console.log(res)
          this.getAreaData();
          this.price = res.data.data.sellingPrice;
          this.sellingPrice = res.data.data.sellingPrice; //售价
          this.address = res.data.data.address;
          this.community = res.data.data.community;
          this.bedrooms = res.data.data.bedrooms;
          this.bathrooms = res.data.data.bathrooms;
          this.floorSize = res.data.data.floorSize;
          this.hourseStatus = res.data.data.listingType;
          this.propertyType = res.data.data.propertyType;
          this.rentingPrice = res.data.data.rentingPrice;
          this.description = res.data.data.memo;
          this.builtYear = res.data.data.yearBuilt;
          this.landSize = res.data.data.landSize;
          this.parking = res.data.data.parking;
          this.agentHeader = res.data.data.agentHeader;
          this.sellingPrice = res.data.data.sellingPrice;
          this.lat = res.data.data.lat;
          this.lgt = res.data.data.lgt;
          this.country = res.data.data.country;
          this.currency = res.data.data.currency;
          this.price_sqm = parseInt(this.sellingPrice / this.floorSize);

          this.imageLi = res.data.data.photos;
          if (this.imageLi.indexOf(",") != -1) {
            this.images = res.data.data.photos.split(',');
          } else {
            this.images.push(this.imageLi)
          }
          this.currentLength = this.images.length;

          if (this.bathrooms == 0 || this.bathrooms == '' || this.bathrooms == undefined) {
            this.bathrooms = '-'
          }
          if (this.floorSize == 0 || this.floorSize == '' || this.floorSize == undefined) {
            this.floorSize = '-'
          }
          if (this.landSize == 0 || this.landSize == '' || this.landSize == undefined) {
            this.landSize = '-'
          }
          if (this.builtYear == 0 || this.builtYear == '' || this.builtYear == undefined) {
            this.builtYear = '-'
          }
          if (this.parking == 0 || this.parking == '' || this.parking == undefined) {
            this.parking = '-'
          }
          if (parseInt(this.landSize / 1600) == 0 || parseInt(this.landSize / 1600) == '' || parseInt(this.landSize /
              1600) == undefined || parseInt(this.landSize / 1600) == NaN) {
            this.landSizeT = '-'
          } else {
            this.landSizeT = parseInt(this.landSize / 1600).toString().split('.')[0];
          }
          if (parseInt(this.landSize / 400) == 0 || parseInt(this.landSize / 400) == '' || parseInt(this.landSize /
              400) == undefined || parseInt(this.landSize / 400) == NaN) {
            this.landSizeTT = '-'
          } else {
            this.landSizeTT = parseInt(this.floorSize / 400).toString().split('.')[0];
          }
          if (parseInt(this.landSize / 4)[1] == 0 || parseInt(this.landSize / 4) == '' || parseInt(this.landSize /
              4) == undefined || parseInt(this.landSize / 4) == NaN) {
            this.landSizeTTT = '-'
          } else {
            this.landSizeTTT = parseInt(this.floorSize / 4).toString().split('.')[0];
          }
          if (this.rentingPrice * this.exchangeRate / 7 > 0) {
            this.renTTT = '-'
          } else {
            this.renTTT = parseInt(this.rentingPrice * this.exchangeRate / 7).toString().split('.')[0];
          }
          console.log(this.renTTT)

          if (this.price_sqm == '' || this.price_sqm == 0 || this.price_sqm == NaN || this.price_sqm < 0 || this.price_sqm == undefined) {
            this.price_sqm = '-'
          }
          // if ('Mandarin' === "Mandarin") {
          if (this.commonApi.getRequest().language === "Mandarin") {
            this.isCn = true;
            this.isNotCn = false;
            if (this.propertyType == 1) {
              this.propertyTypeText = '公寓'
            } else if (this.propertyType == 2) {
              this.propertyTypeText = '独栋公寓'
            } else if (this.propertyType == 3) {
              this.propertyTypeText = '长租别墅'
            } else if (this.propertyType == 4) {
              this.propertyTypeText = '联排别墅'
            } else if (this.propertyType == 5) {
              this.propertyTypeText = '办公室'
            } else if (this.propertyType == 6) {
              this.propertyTypeText = '商铺'
            } else {
              this.propertyTypeText = '土地'
            }
            if (this.hourseStatus == 1) {
              this.isShowSalePrice = true;
              this.hourseStatusText = 'for sale';

              if (this.propertyType == 7) {
                this.isTrue1 = false;
                this.isTrue2 = false;
                this.isTrue3 = false;
                this.isAllfasle = false;
                this.isload1 = true;
                this.isload = false;
                this.isnoraml = false;
                //判断是否是泰国
                if (this.country === "Thailand") {
                  this.isload1 = false;
                  this.isload = false;
                  this.isloadT = true;
                }
              }
              if (this.propertyType == 6 || this.propertyType == 5) {
                this.isTrue1 = false;
                this.isTrue2 = false;
                this.isTrue3 = true;
                this.isAllfasle = false;
                this.isTrue4 = false;
                this.isload = true;
                this.isnoraml = false;
              }

              if (this.propertyType == 1 || this.propertyType == 3) {
                this.isTrue1 = true;
                this.isTrue2 = true;
                this.isTrue3 = true;
                this.isTrue4 = false;
                this.isAllfasle = true;
                this.isShowPrice = true;
                this.isShowLand = false;
                this.isShowParking = true;
                this.isShowYear = true;
                this.ishourse = true;

              }
              if (this.propertyType == 2 || this.propertyType == 4) {
                this.isTrue1 = true;
                this.isTrue2 = true;
                this.isTrue3 = true;
                this.isTrue4 = false;
                this.isAllfasle = true;
                this.isShowPrice = true;
                this.isShowLand = true;
                this.isShowParking = true;
                this.isShowYear = true;
                this.ishourse = true;

              }
            } else if (this.hourseStatus == 2) {
              this.hourseStatusText = 'for rent';
              this.isShowPrice = false;
              this.isShowrentingPrice = true;
              if (this.propertyType == 7) {
                this.isTrue1 = false;
                this.isTrue2 = false;
                this.isTrue3 = false;
                this.isAllfasle = false;
                this.isTrue4 = true;
                this.isload1 = true;
                this.isnoraml = false;
                //判断是否是泰国
                if (this.country === "Thailand") {
                  this.isload1 = false;
                  this.isload = false;
                  this.isloadT = true;
                }
              }
              if (this.propertyType == 6 || this.propertyType == 5) {
                this.isTrue1 = false;
                this.isTrue2 = false;
                this.isTrue3 = true;
                this.isAllfasle = false;
                this.isTrue4 = false;
                this.isload = true;
                this.isnoraml = false;
              }

              if (this.propertyType == 1 || this.propertyType == 3) {
                this.isTrue1 = true;
                this.isTrue2 = true;
                this.isTrue3 = true;
                this.isTrue4 = false;
                this.isAllfasle = true;
                this.isShowPrice = false;
                this.isShowLand = false;
                this.isShowParking = true;
                this.isShowYear = true;
                this.ishourse = true;

              }
              if (this.propertyType == 2 || this.propertyType == 4) {
                this.isTrue1 = true;
                this.isTrue2 = true;
                this.isTrue3 = true;
                this.isTrue4 = false;
                this.isAllfasle = true;
                this.isShowPrice = false;
                this.isShowLand = true;
                this.isShowParking = true;
                this.isShowYear = true;
                this.ishourse = true;

              }

            } else {
              this.hourseStatusText = 'for sale & rent';
              this.isShowPrice = true;
              this.isShowrentingPrice = true;
              this.isShowSalePrice = true;
              if (this.propertyType == 7) {
                his.isTrue1 = false;
                this.isTrue2 = false;
                this.isTrue3 = false;
                this.isAllfasle = false;
                this.isTrue4 = true;
                this.isload = false;
                this.isload = false;
                this.isload1 = true;
                this.isnoraml = false;
                //判断是否是泰国
                if (this.country === "Thailand") {
                  this.isloadT = true;
                  this.isload = false;
                  this.isload1 = false;
                }
              }
              if (this.propertyType == 6 || this.propertyType == 5) {
                this.isTrue1 = false;
                this.isTrue2 = false;
                this.isTrue3 = true;
                this.isAllfasle = false;
                this.isTrue4 = false;
                this.isload = true;
                this.isnoraml = false;
              }

              if (this.propertyType == 1 || this.propertyType == 3) {
                this.isTrue1 = true;
                this.isTrue2 = true;
                this.isTrue3 = true;
                this.isTrue4 = false;
                this.isAllfasle = true;
                this.isShowPrice = false;
                this.isShowLand = false;
                this.isShowParking = true;
                this.isShowYear = true;
                this.ishourse = true;

              }
              if (this.propertyType == 2 || this.propertyType == 4) {
                this.isTrue1 = true;
                this.isTrue2 = true;
                this.isTrue3 = true;
                this.isTrue4 = false;
                this.isAllfasle = true;
                this.isShowPrice = false;
                this.isShowLand = true;
                this.isShowParking = true;
                this.isShowYear = true;
                this.ishourse = true;

              }
            }

          } else {
            this.isCn = false;
            this.isNotCn = true;
            if (this.propertyType == 1) {
              this.propertyTypeText = 'Condo'
            } else if (this.propertyType == 2) {
              this.propertyTypeText = 'House'
            } else if (this.propertyType == 3) {
              this.propertyTypeText = 'Apartment'
            } else if (this.propertyType == 4) {
              this.propertyTypeText = 'Townhouse'
            } else if (this.propertyType == 5) {
              this.propertyTypeText = 'Office'
            } else if (this.propertyType == 6) {
              this.propertyTypeText = 'Commercial'
            } else {
              this.propertyTypeText = 'Land'
            }
            if (this.hourseStatus == 1) {
              this.isShowSalePrice = true;
              this.hourseStatusText = 'for sale';
              if (this.propertyType == 7) {
                this.isTrue1 = false;
                this.isTrue2 = false;
                this.isTrue3 = false;
                this.isAllfasle = false;
                this.isTrue4 = true;
                //判断是否是泰国
                if (this.country === "Thailand") {
                  this.isTrue6 = true;
                  this.isTrue4 = false;
                }
              }
              if (this.propertyType == 6 || this.propertyType == 5) {
                this.isTrue1 = false;
                this.isTrue2 = false;
                this.isTrue3 = true;
                this.isAllfasle = false;
                this.isTrue4 = false;

              }

              if (this.propertyType == 1 || this.propertyType == 3) {
                this.isTrue1 = true;
                this.isTrue2 = true;
                this.isTrue3 = true;
                this.isTrue4 = false;
                this.isAllfasle = true;
                this.isShowPrice = true;
                this.isShowLand = false;
                this.isShowParking = true;
                this.isShowYear = true;


              }
              if (this.propertyType == 2 || this.propertyType == 4) {
                this.isTrue1 = true;
                this.isTrue2 = true;
                this.isTrue3 = true;
                this.isTrue4 = false;
                this.isAllfasle = true;
                this.isShowPrice = true;
                this.isShowLand = true;
                this.isShowParking = true;
                this.isShowYear = true;
              }
            } else if (this.hourseStatus == 2) {
              this.hourseStatusText = 'for rent';
              this.isShowPrice = false;
              this.isShowrentingPrice = true;
              if (this.propertyType == 7) {
                this.isTrue1 = false;
                this.isTrue2 = false;
                this.isTrue3 = false;
                this.isAllfasle = false;
                this.isTrue4 = true;
                //判断是否是泰国
                if (this.country === "Thailand") {
                  this.isTrue6 = true;
                  this.isTrue4 = false;
                }
              }
              if (this.propertyType == 6 || this.propertyType == 5) {
                this.isTrue1 = false;
                this.isTrue2 = false;
                this.isTrue3 = true;
                this.isAllfasle = false;
                this.isTrue4 = false;
              }

              if (this.propertyType == 1 || this.propertyType == 3) {
                this.isTrue1 = true;
                this.isTrue2 = true;
                this.isTrue3 = true;
                this.isTrue4 = false;
                this.isAllfasle = true;
                this.isShowPrice = false;
                this.isShowLand = false;
                this.isShowParking = true;
                this.isShowYear = true;
              }
              if (this.propertyType == 2 || this.propertyType == 4) {
                this.isTrue1 = true;
                this.isTrue2 = true;
                this.isTrue3 = true;
                this.isTrue4 = false;
                this.isAllfasle = true;
                this.isShowPrice = false;
                this.isShowLand = true;
                this.isShowParking = true;
                this.isShowYear = true;
              }

            } else {
              this.hourseStatusText = 'for sale & rent';
              this.isShowPrice = true;
              this.isShowrentingPrice = true;
              this.isShowSalePrice = true;
              if (this.propertyType == 7) {
                this.isTrue1 = false;
                this.isTrue2 = false;
                this.isTrue3 = false;
                this.isAllfasle = false;
                this.isTrue4 = true;
                //判断是否是泰国
                if (this.country === "Thailand") {
                  this.isTrue6 = true;
                  this.isTrue4 = false;
                }
              }
              if (this.propertyType == 6 || this.propertyType == 5) {
                this.isTrue1 = false;
                this.isTrue2 = false;
                this.isTrue3 = true;
                this.isAllfasle = false;
                this.isTrue4 = false;
              }

              if (this.propertyType == 1 || this.propertyType == 3) {
                this.isTrue1 = true;
                this.isTrue2 = true;
                this.isTrue3 = true;
                this.isTrue4 = false;
                this.isAllfasle = true;
                this.isShowPrice = false;
                this.isShowLand = false;
                this.isShowParking = true;
                this.isShowYear = true;
              }
              if (this.propertyType == 2 || this.propertyType == 4) {
                this.isTrue1 = true;
                this.isTrue2 = true;
                this.isTrue3 = true;
                this.isTrue4 = false;
                this.isAllfasle = true;
                this.isShowPrice = false;
                this.isShowLand = true;
                this.isShowParking = true;
                this.isShowYear = true;

              }
            }
          }


          this.getDataAgentDetail();
          this.getAreaData();
        })
      },
      getAreaData: function() {
        this.axios.get("/api/v1/regions/match", {
          params: {
            keyword: this.country,
            pid: 0
          },
        }).then(res => {
          this.exchangeRate = res.data.data.exchangeRate;
        })
      },
      getDataAgentDetail: function() {
        this.axios.get("/api/h5/v1/agents/id", {
          params: {
            agentId: this.commonApi.getRequest().agentId
            // agentId: '1300421010809556992'
          },
        }).then(res => {
          this.firstName = res.data.data.firstName;
          this.lastName = res.data.data.lastName;
          this.company = res.data.data.company;
          this.language = res.data.data.language;
          this.serverRegion = res.data.data.serverRegion;
          this.memoAgent = res.data.data.memo;
          if (this.company == 0 || this.company == '' || this.company == undefined) {
            this.company = '-'
          }
          if (this.language == 0 || this.language == '' || this.language == undefined) {
            this.language = '-'
          }
          if (this.serverRegion == 0 || this.serverRegion == '' || this.serverRegion == undefined) {
            this.serverRegion = '-'
          }
          if (this.memoAgent == 0 || this.memoAgent == '' || this.memoAgent == undefined) {
            this.memoAgent = '-'
          }
        })
      },
      getDataAgent: function() {
        this.axios.post("/api/h5/v1/agents/houses/search", {
          "agentId": this.commonApi.getRequest().agentId,
          "page": "1",
          "pageSize": "20"
        }).then(res => {
          console.log
          this.otherHouse = res.data.data.list;
          console.log(this.otherHouse)
          this.otherHouseLength = res.data.data.list.length;
        })
      },
      locationDetail: function(item) {
        this.addressObj = item;
        this.otherHouseId = this.addressObj.houseId;
        let url = 'index.html?agentId=' + this.commonApi
          .getRequest().agentId + '&houseId=' + this.otherHouseId + '&language=' + this.commonApi.getRequest().language;
        window.location.href = url;
      },
      collapse: function() {
        this.collapseTrue = !this.collapseTrue;
        if (this.collapseTrue === false) {
          this.styles = 'collapseClose'
        } else {
          this.styles = 'collapseOpen'
        }
      },
      doIt: function() {
        this.isChange = !this.isChange;
      },
      herfProperty: function() {
        this.$router.push({
          path: "Propertys",
          query: {
            agentHeader: this.agentHeader,
            currency: this.currency,
            agentId: this.commonApi.getRequest().agentId,
            country: this.country,
            Rate: this.exchangeRate
          }
        });
      },
      validator(val) {
        return /1\d{10}/.test(val);
      },
      // 异步校验函数返回 Promise
      asyncValidator(val) {
        return new Promise((resolve) => {

          setTimeout(() => {
            resolve(/\d{6}/.test(val));
          }, 1000);
        });
      },
      onFailed(errorInfo) {
        console.log('failed', errorInfo);
      },
      getMap() {
        this.getDataHourseDetail();
        var map = new google.maps.Map(document.getElementById("map"), {
          zoom: 15,

        });
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(this.lat, this.lgt),
          map: map
        });
        // map.setCenter(new google.maps.LatLng( 23.117055306224895, 113.2759952545166));
        map.setCenter(new google.maps.LatLng(this.lat, this.lgt));
      },
      // 地图被点击
      mapClicked () {
        this.$router.push({
          path: 'mapView',
          query: {lat: this.lat, lgt: this.lgt}
        })
      }
    }

    // });
  };
</script>

<style scoped lang="less">
  @width: 100%;
  @height: 100%;

  #home {
    // height: 132.75rem;
  }

  #header {
    .van-swipe {
      height: 16.25rem;

      img {
        width: @width;
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

  }

  .home_content {
    padding: 1.5625rem 1.25rem;

    .tag_price {
      font-size: 22px;
      font-family: "SF Pro Text Bold";
      font-weight: bold;
      line-height: 26px;
      display: inline-block;
      color: #393E41;
      div{
        width: inherit;
        display: inline-block;
      }
    }

    .tag_size {
      font-size: 0.875rem;
      font-weight: 400;
      line-height: 1rem;
      display: inline-block;
      color: #393E41;
      // margin-left: 0.625rem;
    }

    .van-cell:after {
      border: none;
    }

    .tag_location {
      font-size: 14px;
      font-weight: 400;
      line-height: 1.25rem;
      padding: 0.25rem 0;
      display: flex;
      display: -webkit-flex;
      display: flex;
      font-family: "SF Pro Text Semibold";

      img {
        width: 0.5625rem;
        height: 0.75rem;
        margin: 0.25rem 0.375rem;
        margin-left: 0;
      }
    }

    .van-icon-location {
      // margin-top: -1rem;
      margin-left: 0.125rem;
      margin-right: 0.375rem;
    }

    .tag_status {
      font-size: 0.875rem;
      font-weight: 400;
      line-height: 1rem;
      margin-top: 0.25rem;
      color: #393E41;

      .icon_status {
        width: 0.5625rem;
        height: 0.5625rem;
        background: rgba(255, 119, 224, 1);
        border-radius: 50%;
        margin-right: 0.375rem;
        margin-top: 0.125rem;
        display: inline-block;
      }
    }

    .title {
      font-size: 1.125rem;
      font-family: "SF Pro Text Semibold";
      font-weight: 600;
      line-height: 21px;
      color: rgba(57, 62, 65, 1);
      opacity: 1;
      height: 1.3125rem;
    }

    .collapseClose {
      font-size: 0.9375rem;
      line-height: 20px;
      color: #393E41;
      height: 6.25rem;
      overflow: hidden;
    }

    .collapseOpen {
      font-size: 0.9375rem;
      line-height: 1.25rem;
      color: #393E41;
      height: inherit;
      overflow: hidden;
    }

    .more_Describe {
      font-size: 0.9375rem;
      font-family: "SF Pro Text Semibold";
      font-weight: 600;
      line-height: 1.25rem;
      color: rgba(19, 119, 255, 1);
      margin: 3px 0px;
    }

    .loctionBox {
      height: 11.25rem;
      opacity: 1;
      background: #CCC;
      margin-top: 0.9375rem;
    }

    .van-divider {
      margin: 1.5625rem 0;
    }

    .width_List {
      width: 100%;
    }

    .num {
      font-size: 0.9375rem;
      font-weight: 400;
      // line-height: 1.125rem;
      color: rgba(102, 102, 102, 1);
      margin-left: 27px;
      line-height: 1.25rem;
      height: 1.25rem;
    }

    .numBox {
      margin-top: 0.9375rem;
    }

    .van-swipe {
      margin-top: 0.9375rem;

      img {
        width: 100%;
        height: 6.875rem;
        display: block;
      }

      .van-swipe-item {
        border-radius: 0.375rem;
        overflow: hidden;
      }

      .price_swiper {
        margin-top: 0.625rem;
        font-size: 0.9375rem;
        font-family: "SF Pro Text Bold";
        font-weight: bold;
        line-height: 1.125rem;
        color: rgba(57, 62, 65, 1);
        opacity: 1;
      }

      .size_swiper {
        font-size: 0.75rem;
        font-weight: 400;
        line-height: 0.875rem;
        color: rgba(57, 62, 65, 1);
        margin-top: 0.4375rem;
      }

      .loction_swiper {
        font-size: 0.75rem;
        font-weight: 400;
        line-height: 0.75rem;
        color: rgba(57, 62, 65, 1);
        margin-top: 0.4375rem;
      }

      .van-swipe__indicators {
        display: none !important;
      }
    }

    .avatorBox {
      opacity: 1;
      border-radius: 0.25rem;
      // background: linear-gradient(206deg, rgba(250, 241, 232, 1) 0%, rgba(227, 208, 194, 1) 100%);
      background: url(../assets/infoBg.png);
      margin: 1.6875rem 0 3.75rem;

      .imgBox {
        display: flex;
        display: -webkit-flex;
        display: flex;
        justify-content: center;

        .agentBoxImg{
          overflow: hidden;
              margin-top: 1rem;
              width: 5.5rem;
              height: 5.5rem;
              border-radius: 50%;
              border: 2px solid #E8B08C;
              display: flex;
              justify-content: center;
              img{
                height: inherit;
              }
        }
      }



      .avaRname {
        text-align: center;
        font-size: 1.125rem;
        font-weight: 500;
        line-height: 1.3125rem;
        color: rgba(102, 102, 102, 1);
        opacity: 1;
      }

      .avarLine {
        text-align: center;

        .line-left {
          width: 6.375rem;
          height: 0px;
          border: 1px solid rgba(232, 176, 140, 1);
          display: inline-block;
        }

        .line-radius {
          width: 0.375rem;
          height: 0.375rem;
          background: rgba(232, 176, 140, 1);
          border-radius: 50%;
          opacity: 1;
          display: inline-block;
          position: relative;
          top: 2px;
          margin: 0 1rem;
        }

        .line-right {
          width: 102px;
          height: 0px;
          border: 1px solid rgba(232, 176, 140, 1);
          display: inline-block;
        }
      }

      .avarInfo {
        font-size: 15px;
        font-weight: 400;
        line-height: 20px;
        color: rgba(57, 62, 65, 1);
        margin-left: 15px;
        margin-top: 12px;
      }

      .avarDetail {
        font-size: 15px;
        font-weight: 400;
        line-height: 20px;
        color: rgba(57, 62, 65, 1);
        opacity: 1;
        padding: 20px 16px;
      }
    }

  }

  .change {
    z-index: 2;
    position: fixed;
    align-items: center;
    display: flex;
    display: -webkit-flex;
    display: flex;
    height: 44px;
    background: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, .16);
    border-radius: 22px 0 0 22px;
    right: 0;
    top: 24.125rem;
    transition: right .5s;
    padding-right: 0.5rem;

    img {
      width: 1.875rem;
      height: 1.875rem;
      margin: 0.4375rem;
      // position: absolute;
      top: 0;
      left: 0;
      display: inline-block;
    }

    .text_find {
      // position: absolute;
      top: 0;
      right: 0;
      font-size: 15px;
      font-family: "SF Pro Text Medium";
      font-weight: 500;
      line-height: 15px;
      color: rgba(19, 119, 255, 1);
      height: 44px;
      line-height: 44px;
      color: #1377ff;
      display: inline-block;
      // display: none;
    }
  }



  // .changes {
  //   position: fixed;
  //   align-items: center;
  //   display: flex;
  //   height: 44px;
  //   background: #fff;
  //   box-shadow: 0 0 10px rgba(0, 0, 0, .16);
  //   border-radius: 22px 0 0 22px;
  //   right: 0;
  //   top: 24.125rem;
  //   // width: 12.5rem;
  //   transition: right .5s;
  //  padding-right: 0.5rem;

  //   img {
  //     margin: 0.4375rem 0.5rem;
  //     // position: absolute;
  //     left: 0;
  //     top: 0;
  //     width: 1.875rem;
  //     height: 1.875rem;
  //     display: inline-block;
  //   }

  //   .text_find{
  //     // position: absolute;
  //     top: 0;
  //     right: 1.1875rem;
  //     font-size: 15px;
  //     font-family: "SF Pro Text Medium";
  //     font-weight: 500;
  //     line-height: 15px;
  //     color: rgba(19, 119, 255, 1);
  //      display: inline-block;
  //      height: 44px;
  //      line-height: 44px;
  //      color: #1377ff;
  //   }
  // }





  .vue-map-container {
    height: 11.25rem;
  }

  .van-tag {

    width: 100%;
  }

  .description {
    padding: 0;
    margin-top: 0.9375rem;
    height: inherit;

    .van-cell__value {
      font-size: 15px;
      font-weight: 600;
      line-height: 20px;
      color: #393E41 !important;
    }

  }

  .custom-indicator {
    position: absolute;
    right: 20px;
    bottom: 12px;
    padding: 1px 5px;
    /* font-size: 12px; */
    /* background: rgba(0, 0, 0, 0.1); */
    font-size: 12px;

    font-weight: bold;
    line-height: 12px;
    color: rgba(255, 255, 255, 1);
  }

  .description.styleHeight {
    height: 120px;
  }

  .textDetails {
    width: 5rem;
    margin-left: 0.6875rem;
    line-height: 1.25rem;
    height: 1.25rem;
    font-family: "SF Pro Text Medium";
  }

  .imgDetails {
    img {
      float: left;
      width: 16px;
    }

  }

  .imgDetails img:first-child {
    margin-top: 0.125rem;
  }

  .imgDetails img:nth-of-type(2) {
    margin-top: 0.0625rem;
  }

  .imgDetails img:nth-of-type(2) {
    width: 1.125rem;
    margin-top: 0.0625rem;
  }

  .text_location {
    width: calc(100% - 15px);
    word-wrap: break-word;
    word-break: normal;
    color: #393E41;
  }

  .swipeLi {
    height: inherit;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center center;
  }

  .swipeLiHouse {
    height: 6.875rem;
    border-radius: 0.375rem;
    margin-right: 0.625rem;
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center center;
  }

  .swipeHouse:last-child .swipeLiHouse {
    margin-right: 0;
  }

  .pricebox {
    // display: flex;
  }

  .saleStatus {
    display: inline-block;
    float: left;
    margin: 6px 0;
    width: 20px;
    height: 20px;
    background: rgba(255, 119, 224, 1);
    opacity: 1;
    border-radius: 2px;
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 1.25rem;
    text-align: center;
    color: rgba(255, 255, 255, 1);
    margin-top: 2px;
  }

  .rentStatus {
    display: inline-block;
    float: left;
    margin: 6px 0;
    width: 20px;
    height: 20px;
    background: #1ADDED;
    opacity: 1;
    border-radius: 2px;
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 1.25rem;
    text-align: center;
    color: rgba(255, 255, 255, 1);
    margin-top: 2px;
  }

  .yue {
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 500;
    line-height: 17px;
    color: rgba(153, 153, 153, 1);
    opacity: 1;
    margin-left: 6px;
    margin-top: 6px;
  }

  .priceNow {
    font-size: 14px;
    font-family: SF UI Text;
    font-weight: bold;
    line-height: 26px;
    color: rgba(153, 153, 153, 1);
    margin-left: 14px;
  }

  .iconTip {
    width: 14px;
    height: 14px;
    margin: -2px 0px;
  }

  .tagCn {
    width: 100% !important;
  }

  .infobox {
    display: flex;
    display: -webkit-flex;
    display: flex;
    justify-content: space-between;
    margin-top: 1.75rem;
  }

  .infoli {
    width: 33.3%;
    border-left: 1px solid rgba(242, 242, 242, 1);
    padding-left: 1.25rem;
    // border:1px solid rgba(242,242,242,1);
  }

  .infoli:first-child {
    border-left: none;
    padding-left: 0;
  }

  .typeText {

    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 500;
    line-height: 20px;
    color: #393E41;
  }

  .typedesign {

    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 17px;
    color: #999999;
  }

  .infoload {
    font-size: 14px;
    font-family: SF UI Text;
    font-weight: 400;
    line-height: 16px;
    color: #393E41;
    margin-top: 0.3125rem;

    span {
      padding: 0 10px;
    }

    span:first-child {
      border-right: 1px solid #393E41;
      padding-left: 0;
    }
  }

  .tipNotice {
    width: 9.25rem;
    height: 3.75rem;
    background: rgba(57, 62, 65, .9);
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
    position: absolute;
    z-index: 9;
    left: -5.5rem;
    border-radius: 0.125rem;
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 20px;
    color: rgba(255, 255, 255, 1);

    div {
      padding: 0.625rem 1.875rem;
    }
  }

  .tipNotice::before {
    content: '';
    position: absolute;
    left: 6.0625rem;
    top: -1.0625rem;
    width: 0;
    height: 0;
    border: 9px solid;
    border-color: transparent transparent rgba(57, 62, 65, 1);
    opacity: 0.9;
  }

  .iconTipBox {
    position: relative;
  }

  .tipBox {
    position: absolute;
    top: 34px;
    left: -11px;
  }
  .saleStatusother{
    padding-right: 0.5rem;
  }
  .rentStatusother {
     padding-right: 0.5rem;
  }
  .priceBoxHead{
    width: 100%;
    overflow: hidden;
  }
</style>
