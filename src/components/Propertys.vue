<template>
  <div id="page_proper">
    <van-row class="page_Head">
      <div class="headerBg">
        <img v-if="this.commonApi.getRequest().language === 'Mandarin'" src="../assets/cnbg.png" alt="">
        <img v-if="this.commonApi.getRequest().language === 'English'" src="../assets/enbg.png" alt="">
        <img v-if="this.commonApi.getRequest().language === 'Korean'" src="../assets/kobg.png" alt="">
        <img v-if="this.commonApi.getRequest().language === 'Japanese'" src="../assets/jpbg.png" alt="">
      </div>
      <div class="imgBox_proper"><img :src="this.$route.query.agentHeader" alt="" class="avarImg"></div>
    </van-row>
    <van-row class="page_content">
      <div class="text_title">{{$t("looking")}}</div>
      <van-col class="text_cell" v-for="item in buttonList" :class="{active:item.isActive}" :key="item.text" @click="activeFun(item)">{{item.text}}</van-col>
    </van-row>
    <van-row class="page_Wrapper">
      <div class="text_title">{{$t("property")}}</div>
      <div class="collapseBar">
        <div class="collapse_title" @click="changShow()">
          <van-cell :title="`${titleHouse}`" class="titleHouse" />
          <!-- <van-icon name="arrow-down" :class="{show:this.isShow}" /> -->
          <img src="../assets/Chevron3.png" :class="{show:this.isShow}" alt="">
        </div>
        <div class="collapse_content" :class="{show:this.isShow}">
          <van-radio-group v-model="result">
            <van-cell-group>
              <van-cell v-for="(items,index) in option1" clickable :key="items.value" :title="`${items.text}`" @click="toggle(index)">
                <template #right-icon>
                  <van-radio :name="items" ref="checkredio" shape="square" />
                </template>
              </van-cell>
            </van-cell-group>
          </van-radio-group>
          <div class="slectedBtn">
            <!-- <van-col class="resetBtn">Reset</van-col> -->
            <van-col class="doneBtn">
              <van-button @click="confirmCheckBox">{{$t("Done")}}</van-button>
            </van-col>
          </div>
        </div>
      </div>
      <div class="text_title">{{$t("preferred")}}</div>
      <div class="loctionBar">
        <div class="collapse_inputBox">
          <van-field v-model="addresValue" left-icon="location" color="#999999" @input="searchLoction()" class="fieldInput">
          </van-field>
          <img src="../assets/Chevron3.png" :class="{on:this.isOpen}" @click="changLoction()" alt="">
          <!-- <van-icon name="arrow-down" :class="{on:this.isOpen}" @click="changLoction()"></van-icon> -->
        </div>
        <div class="loction_content" :class="{on:this.isOpen}">
          <van-list :class="{onh:this.isHeight}">
            <div v-for="(items,index) of option3" :key="items.id" @click="checkedFun(items)" ref="menuItem" class="addresContent">
              <div class="communitySerch">
                <div class="communityNmae">{{items.name}},{{items.address}}</div>
                <div class="countrySerch">
                  <van-icon name="location" />
                  {{items.country}}
                </div>
              </div>
            </div>
          </van-list>
          <div class="AddressBox">
            <div class="AddressText">{{$t("target")}}</div>
            <div class="AddressBtn" @click="herfMaps">{{$t("map")}}</div>
          </div>
        </div>
      </div>
      <div class="text_title" v-show="isRoom">{{$t("bedrooms")}}</div>
      <van-row class="roomsBox" v-show="isRoom">
        <van-col span="3" v-for="(item,index) in option2" :class="{on:item.isActive}" :key="item.value" @click="onFun(item)">{{item.text}}</van-col>
      </van-row>
      <div class="text_title" v-show="isSqm">{{$t("Area")}}</div>
      <van-row class="sqmBox" v-show="isSqm">
        <van-field v-model="valueSqm" type="number" />
        <span>sqm</span>
      </van-row>
      <div class="text_title text_budget">{{$t("budget")}}</div>
      <div v-show="isSale" class="currencySale">
        <van-col span="24" class="currency_now">{{this.$route.query.currency.split(',')[2]}}{{this.commonApi.formatNumber(valueSale)}}{{symbol}}</van-col>
        <van-slider v-model="valueSale" bar-height="12" active-color="#1377FF" :step="50000 * this.$route.query.Rate"
          min="0" :max="maxpriceSale * this.$route.query.Rate">
          <template #button>
            <div class="custom-button">
              <span></span>
              <span></span>
              <span></span>
            </div>

          </template>

        </van-slider>

        <van-col span="20" class="currency_mini currency">0k</van-col>
        <van-col span="4" class="currency_max currency">{{this.$route.query.currency.split(',')[2]}}{{this.commonApi.formatNumber(parseInt(maxpriceSale * this.$route.query.Rate/1000))}}M+</van-col>
      </div>
      <div v-show="isRent" class="currencyRent">
        <van-col span="24" class="currency_now">{{this.$route.query.currency.split(',')[2]}}{{this.commonApi.formatNumber(valueRent)}}{{symbol}}</van-col>
        <van-slider v-model="valueRent" bar-height="12" active-color="#1377FF" :step="100 * this.$route.query.Rate"
          @input="" min="0" :max="maxpriceRent * this.$route.query.Rate">
          <template #button>
            <div class="custom-button">
              <span></span>
              <span></span>
              <span></span>
            </div>

          </template>

        </van-slider>

        <van-col span="20" class="currency_mini currency">0</van-col>
        <van-col span="4" class="currency_max currency" v-if="currencyUnit">{{currencyUnit}}</van-col>
        <van-col span="4" class="currency_max currency" v-else>{{this.$route.query.currency.split(',')[2]}}{{this.commonApi.formatNumber(parseInt(maxpriceRent * this.$route.query.Rate/1000))}}M+</van-col>
      </div>
      <div class="text_title form_title">{{$t("information")}}</div>
      <van-form @submit="onSubmit">
        <van-field v-model="usernameModel" class="username styleBorder" name="username" left-icon="" :placeholder="$t('Name')"
          size="100" />
        <van-field v-model="telModel" type="phone" class="tel styleBorder" name="phone" :placeholder="$t('phone')" />
        <van-field v-model="emailModel" class="email styleBorder" name="phone" :placeholder="$t('phone')" placeholder="nicole@example.com (optional )" />
        <van-field v-model="messageModel" class="message styleBorder" rows="1" autosize type="textarea" :placeholder="$t('Bangkok')" />
        <div>
          <van-button round block type="info" native-type="submit" class="submitBtn">
            {{$t("Submit")}}
          </van-button>
        </div>
      </van-form>
    </van-row>
    <div class="tipNocticeQuestion" v-show="isQuestion">
      <img src="../assets/question.png" alt="">
      <div>{{$t("Please")}}</div>
    </div>
    <div class="tipNocticeSucess" v-show="isScuess">
      <img src="../assets/sure.png" alt="">
      <div>{{$t("Thank")}} </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Propertys',
    data() {
      return {
        valueSale:'',
        valueRent:'',
        value:'',
        minpriceRent: 50,
        priceType: 0,
        maxpriceRent: 16000,
        maxpriceSale: 1600000,
        isRoom: false,
        isSqm: false,
        isSale: false,
        isRent: false,
        valueSqm: '',
        isScuess: false,
        isQuestion: false,
        buttonList: [{
            text: this.$t('Buy'),
            isActive: false,
            value: 1
          },
          {
            text: this.$t('Rent'),
            isActive: false,
            value: 2
          },
        ],
        isHeight: false,
        valueCheck: '',
        listingType: '',
        isStatus: false,
        titleHouse: '',
        checked: false,
        isShow: false,
        isOpen: false,
        leadType: '',
        listArr: [],
        propertyType: [],
        bedrooms: '',
        activeNames: ['1'],
        value1: '1',
        // addresValue: '',
        addresValue: this.$route.query.addr || '',
        addresItems: 0,
        villages: [],
        username: '',
        email: '',
        tel: '',
        message: '',
        usernameModel: '',
        telModel: '',
        emailModel: '',
        messageModel: '',
        keyword: '',
        community: '',
        communityId: '',
        country: '',
        countryId: '',
        province: '',
        provinceId: '',
        city: '',
        cityId: '',
        district: '',
        districtId: '',
        result: [{
          text: this.$t('Condo'),
          value: 1,
          checked: true
        }],
        option1: [{
            text: this.$t('Condo'),
            value: 1,
            checked: true
          },
          {
            text: this.$t('House'),
            value: 2,
            checked: false
          },
          {
            text: this.$t('Apartment'),
            value: 3,
            checked: false
          },
          {
            text: this.$t('Townhouse'),
            value: 4,
            checked: false
          },
          {
            text: this.$t('Office'),
            value: 5,
            checked: false
          },
          {
            text: this.$t('Commercial'),
            value: 6,
            checked: false
          },
          {
            text: this.$t('Land'),
            value: 7,
            checked: false
          },
        ],
        option3: [],
        option2: [{
            text: this.$t('Studio'),
            value: '0',
            isActive: false
          },
          {
            text: '1',
            value: '1',
            isActive: false
          },
          {
            text: '2',
            value: '2',
            isActive: false
          },
          {
            text: '3',
            value: '3',
            isActive: false
          },
          {
            text: '4',
            value: '4',
            isActive: false
          },
          {
            text: '5+',
            value: '5',
            isActive: false
          },
        ],
        headerbg: '../assets/cnbg.png',
        exchangeRate: '',
        symbol: 'K',
        value8: '',
        currencyUnit: ''
      }

    },
    created() {
      console.log(this.value, this.value / parseInt(this.$route.query.Rate), parseInt(this.$route.query.Rate))
      if (this.leadType == '1') {
        this.isSale = true;
      } else {
        this.isRent = true;
      }
    },
    methods: {
      onchangeValue: function() {
        if (this.value >= 1000) {
          this.value = this.value / 1000;
          this.symbol = 'M'
        } else {
          this.symbol = 'K'
        }
      },
      activeFun: function(data) {
        this.buttonList.forEach(function(obj) {
          obj.isActive = false;
        });
        data.isActive = !data.isActive;
        this.leadType = data.value;
        if (this.leadType == '1') {
          this.isSale = true;
          this.isRent = false;
          this.valueRent = 0;
        } else {
          this.isRent = true;
          this.isSale = false;
          this.valueSale = 0;
        }

      },
      onFun: function(data) {
        this.option2.forEach(function(obj) {
          obj.isActive = false;
        });
        data.isActive = !data.isActive;
        this.bedrooms = data.value;
        console.log(this.bedrooms)
      },
      onSubmit: function(values) {
        console.log('submit', values);
      },
      changShow: function(value) {
        this.isShow = !this.isShow;
      },
      changLoction: function(value) {
        this.isOpen = !this.isOpen;
      },
      checkedFun: function(items) {
        // this.addressIyem = index;
        this.addressObj = items;
        this.addresValue = this.addressObj.name + this.addressObj.address;
        this.isOpen = !this.isOpen;
        // 动态换算货币单位
        this.changeCurrencyUnit(items)
      },
      changeCurrencyUnit (obj) {
        console.log(obj, '-----obj-----')
        this.currencyUnit = '2323'
      },
      searchLoction: function() {
        if (!this.addresValue) {
          this.isOpen = false;
        } else {
          this.isOpen = true;
          this.getVillageData()
        }
      },
      confirmCheckBox: function() {
        console.log(this.result.value)
        this.titleHouse = this.result.text;
        this.isShow = !this.isShow;
        if (this.result.value === 1 || this.result.value === 2 || this.result.value === 3 || this.result.value === 4) {
          this.isRoom = true;
          this.isSqm = false;
        } else {
          this.isRoom = false;
          this.isSqm = true;
        }
      },

      releaseHourseDetail: function() {
        // this.activeFun();
        if (!this.bedrooms == '') {}
        console.log(this.leadType);
        if (this.leadType == '1') {
          console.log(this.valueSale);
          this.value = this.valueSale;
        } else {
           console.log(this.valueRent);
          this.value = this.valueRent;
        }
        if (!this.addresValue == '' & !this.leadType == '' & !this.result.value == '' || !this.valueSqm == '' & !this
          .username == '' & !this.tel == '' & !this.email == '') {


          const {addr, country,province,city,district,lat,lgt} = this.$route.query
          const addrInfo = {
            addr,
            country,
            province,
            city,
            district,
            lat,
            lgt
          }

          let obj = {
            leadType: this.leadType,
            propertyType: this.result.value,
            bedrooms: this.bedrooms,
            floorSize: this.valueSqm,
            agentId: this.commonApi.getRequest().agentId,
            budget: this.value,
            customerName: this.username,
            customerPhone: this.tel,
            customerEmail: this.email,
            customerMemo: this.message
          }

          if (addrInfo.addr) {
            obj = Object.assign({}, obj, addrInfo)
          } else {
            obj.community= this.addresValue
            obj.communityId= this.addressObj.id
            obj.country= this.addressObj.country
            obj.countryId= this.addressObj.countryId
            obj.province= this.addressObj.province
            obj.provinceId= this.addressObj.provinceId
            obj.city= this.addressObj.city
            obj.cityId= this.addressObj.cityId
            obj.district= this.addressObj.district
            obj.districtId= this.addressObj.districtId
            obj.address= this.addressObj.address
            obj.lat= this.addressObj.lat
            obj.lgt= this.addressObj.lgt
          }

          this.axios.post("/api/h5/v1/leads", obj)
          .then(res => {
            this.isScuess = true;
            let _this = this;
            setTimeout(function() {
              _this.isScuess = false;
              _this.$router.push({
                path: "/"
              });
            }, 2000)
          })
        } else {
          this.isQuestion = true;
          let _this = this;
          setTimeout(function() {
            _this.isQuestion = false
          }, 2000);

        }

      },

      toggle(index) {
        this.$refs.checkredio[index].toggle();
      },
      onSubmit(values) {
        this.username = this.usernameModel;
        this.tel = this.telModel;
        this.email = this.emailModel;
        this.message = this.messageModel;
        this.releaseHourseDetail();
      },
      herfMaps() {
        const query = JSON.parse(JSON.stringify(this.$route.query))
        this.$router.push({
          // path: "/maps"
          path: "/mapPiker",
          query
        });
      },
      getVillageData: function() {
        this.axios.get("/api/h5/v1/communitys/search", {
          params: {
            page: 1,
            pageSize: 20,
            keyword: this.addresValue,
            type: 2,
            filter: 2
          },
        }).then(res => {
          console.log(res)
          this.option3 = res.data.data.list;
          if (this.option3 == '') {
            this.isStatus = true;
            this.isHeight = false
          } else {
            this.isStatus = false;
            this.isHeight = true
          }


        })
      }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .page_Head {
    height: 12.125rem;
    // background-image: url(../assets/kobg.png);
    background-size: 100% 100%;

    .text_first {
      font-size: 1.75rem;
      font-weight: bold;
      line-height: 2.25rem;
      color: rgba(251, 251, 251, 1);
      text-align: center;
      // padding: 0 2.625rem;
      padding-top: 1.6875rem;
      font-family: Raleway;
      font-weight: bold;
      // height: 2.5rem;
    }

    .text_second {
      font-size: 1.25rem;
      font-weight: bold;
      line-height: 1.75rem;
      color: rgba(251, 251, 251, 1);
      text-align: center;
      margin: 0 2.1875rem;
      font-family: Raleway;
      font-weight: bold;
      height: 3rem;
    }

    .imgBox_proper {
      display: -webkit-flex;
      display: flex;
      justify-content: center;

      .avarImg {
        margin-top: 9.9375rem;
        width: 5.375rem;
        height: 5.375rem;
        border-radius: 50%;
        border: 2px solid #E8B08C;
      }
    }

  }

  .page_content {
    padding: 0 1.25rem;
    margin-top: 4.6875rem;

    .text_title {
      font-size: 1.125rem;
      font-family: "SF Pro Text Semibold";
      font-weight: 600;
      line-height: 24px;
      color: rgba(57, 62, 65, 1);
      opacity: 1;

    }

    .text_cell {
      font-family: "SF Pro Text Bold";
    }

    .van-col {
      width: 48%;
      height: 3.75rem;
      background: rgba(255, 255, 255, 1);
      border: 2px solid rgba(232, 232, 232, 1);
      opacity: 1;
      border-radius: 2px;
      font-size: 18px;
      font-weight: bold;
      line-height: 21px;
      color: rgba(191, 191, 191, 1);
      line-height: 54px;
      text-align: center;
      margin-top: 1.25rem;
      // background:rgba(255,255,255,1);
      // border:2px solid rgba(19,119,255,1);
    }

    .van-col.active {
      background: rgba(255, 255, 255, 1);
      border: 2px solid rgba(19, 119, 255, 1);
      opacity: 1;
      border-radius: 2px;
      color: rgba(19, 119, 255, 1);
    }

    .van-col:last-child {
      margin-left: 0.6875rem;
    }
  }

  .page_Wrapper {
    padding: 0 1.25rem;

    .roomsBox {
      margin-top: 1.25rem;
      display: flex;
      justify-content: space-around;

      .van-col {
        width: 13%;
        background: rgba(242, 242, 242, 1);
        opacity: 1;
        border-radius: 2px;
        font-size: 14px;
        font-family: "SF Pro Text Medium";
        font-weight: 500;
        line-height: 2.5rem;
        color: rgba(102, 102, 102, 1);
        opacity: 1;
        margin-left: 0.375rem;
        text-align: center;
        cursor: pointer;
      }

      .van-col:first-child {
        margin-left: 0;
        width: 25%;
      }


      .van-col.on {
        background: rgba(19, 119, 255, 1);
        color: #fff;
      }
    }

    .text_title {
      font-size: 1.125rem;
      font-weight: 600;
      line-height: 24px;
      color: rgba(57, 62, 65, 1);
      opacity: 1;
      margin-top: 2.5rem;

    }

    .form_title {
      margin-top: 4.5rem;
    }

    .collapseBar,
    .loctionBar {
      border: 2px solid rgba(242, 242, 242, 1);
      opacity: 1;
      border-radius: 2px;
      margin-top: 1.25rem;

      .collapse_title,
      .collapse_inputBox {
        height: 3.625rem;
        line-height: 2.75rem;
        background: rgba(242, 242, 242, 1);
        position: relative;

        .van-icon {
          position: absolute;
          right: 1.25rem;
          top: 1.3125rem;
        }
      }

      .collapse_content,
      .collapse__inputBox_content {
        position: relative;
        // height: 21.125rem;
        display: none;

        .van-icon {
          position: absolute;
          right: 20px;
          top: 21px;
        }


        .van-list {
          position: absolute;
          // top: 3.625rem;
          width: 100%;

          .van-cell {
            font-size: 15px;
            font-weight: bold;
            line-height: 18px;
            color: rgba(57, 62, 65, 1);

            .van-cell__title {
              padding-left: 0.25rem;
            }

            .van-cell__value {
              position: absolute;
              right: 20px;
            }
          }

        }

        .slectedBtn {
          height: 3.375rem;
          background: #F2F2F2;

          .resetBtn {
            font-size: 15px;
            font-weight: 400;
            line-height: 18px;
            color: rgba(102, 102, 102, 1);
            line-height: 54px;
            padding-left: 20px;
          }

          .doneBtn {
            .van-button {
              width: 100px;
              height: 38px;
              background: rgba(19, 119, 255, 1);
              opacity: 1;
              border-radius: 4px;
              position: absolute;
              right: 20px;
              margin: 8px 0;
              font-size: 15px;
              font-family: "SF Pro Text Semibold";
              font-weight: 600;
              line-height: 18px;
              color: rgba(255, 255, 255, 1);
            }
          }
        }
      }



      .collapse_content.show,
      .collapse__inputBox_content.show {
        display: block;
      }

    }

    .loctionBar {
      .van-field {
        background: none;
        line-height: 40px;
      }

      .loction_content {
        display: none;
        height: inherit;
        height: 21.25rem;
      }

      .loction_content.on .onh {
        height: 13.75rem;
        overflow: auto;
      }

      .loction_content.on {
        display: block;

        overflow: auto;

        .van-list {
          .van-cell {
            padding: 3.5px 20px;
          }
        }

        .communitySerch {
          font-size: 14px;
          font-weight: 400;
          line-height: 16px;
          color: #666666;
        }

        .countrySerch {
          font-size: 12px;
          font-weight: 400;
          line-height: 14px;
          color: rgba(153, 153, 153, 1);

          i {
            color: rgba(191, 191, 191, 1);
            top: 1px;
          }
        }

        .AddressBox {
          .AddressText {
            font-size: 15px;
            font-weight: 400;
            line-height: 18px;
            color: rgba(57, 62, 65, 1);
            text-align: center;
            margin-top: 2.125rem;
          }

          .AddressBtn {
            width: calc(100% - 104px);
            height: 2.5rem;
            background: #1377ff;
            opacity: 1;
            border-radius: 6px;
            text-align: center;
            line-height: 2.5rem;
            color: #fff;
            margin: 0 auto;
            margin-top: 10px;
            margin-bottom: 20px;
          }
        }

      }

      .van-icon.on {
        transform: rotate(180deg);
      }
    }

    .custom-button {
      padding: 0 2px;
      width: 20px;
      height: 16px;
      background: #fff;
      box-shadow: 0 0 6px rgba(0, 0, 0, .16);
      border-radius: 2px;
      display: flex;
      display: -webkit-flex;
      display: flex;
      justify-content: space-around;
      align-items: center;


      span {
        width: 0px;
        height: 8px;
        border: 1px solid rgba(19, 119, 255, 1);
        opacity: 1;
        margin: 3px 0;
        display: inline-block;
      }

      span:first-child {
        margin-left: 2px;
      }
    }

    .currency_now {
      margin: 0.75rem 0;
      text-align: center;
      font-size: 15px;
      font-family: "SF Pro Text Bold";
      font-weight: bold;
      line-height: 18px;
      color: rgba(19, 119, 255, 1);
    }

    .currency {
      font-size: 15px;
      font-weight: 400;
      line-height: 18px;
      color: rgba(153, 153, 153, 1);
      opacity: 1;
      margin-top: 0.875rem;
      width: inherit
    }

    .currency_mini {
      float: left;
    }

    .currency_max {
      float: right;
    }

    .styleBorder {
      height: 58px;
      border: 1px solid #1377ff;
      opacity: 1;
      border-radius: 2px;
      margin-top: 20px;
      line-height: 34px;
      color: #1377FF;
      font-size: 15px;
      font-weight: 400;
      color: rgba(191, 191, 191, 1);
      opacity: 1;

      input {
        padding-left: 8px;
      }
    }

    .message {
      height: 116px;
      line-height: 24px;
    }



    .van-collapse {
      margin-top: 20px;

      .van-collapse-items__title--expanded {
        height: 58px;
        background: rgba(242, 242, 242, 1) !important;
        opacity: 1;
        line-height: 38px;
        margin-top: 20px;

        i {
          color: #999999;
          font-size: 20px;
          font-weight: 800;
          line-height: 38px;
        }
      }
    }

    .van-form {
      // height: 26.5625rem;

      .styleBorder {
        i {
          font-size: 20px;
        }
      }
    }

    .submitBtn {
      font-size: 15px;
      font-family: "SF Pro Text Bold";
      font-weight: bold;
      line-height: 18px;
      color: rgba(255, 255, 255, 1);
      opacity: 1;
      height: 40px;
      opacity: 1;
      border-radius: 6px;
      margin-top: 40px;
      margin-bottom: 30px;
    }

  }

  .page_Wrapper .text_budget {
    margin-top: 3.125rem;
  }

  .van-slider {
    margin-top: 3.375rem;
    border-radius: inherit;
    z-index: 99;
    display: -webkit-flex;
    display: flex;
  }

  .van-cell--clickable {
    font-size: 15px;
    font-family: "SF Pro Text Bold";
    font-weight: bold;
    line-height: 1.25rem;
    color: rgba(57, 62, 65, 1);
    opacity: 1;
    padding: 10px 20px;
  }

  .titleHouse {
    font-size: 18px;
    font-weight: 600;
    line-height: 21px;
    color: rgba(57, 62, 65, 1);
    line-height: 44px;
    background: none;
  }

  .van-cell::after {
    border-bottom: 0;
  }

  .username:before {
    width: 20px;
    height: 20px;
    content: "";
    background: url(../assets/user.png) no-repeat;
    background-size: 100% 100%;
    display: block;
    margin-right: 1rem;
    margin-top: 8px;
  }

  .tel:before {
    width: 16px;
    height: 24px;
    content: "";
    background: url(../assets/phone.png) no-repeat;
    background-size: 100% 100%;
    display: block;
    margin-right: 1rem;
    margin-top: 6px;
  }

  .email:before {
    width: 20px;
    height: 14px;
    content: "";
    background: url(../assets/email.png) no-repeat;
    background-size: 100% 100%;
    display: block;
    margin-right: 1rem;
    margin-top: 12px;
  }

  .AddressBox {
    height: 86px;
    // display: none;
  }

  .AddressBox.on {
    display: block;
  }

  .fieldInput {
    width: 18.125rem;
    padding: 10px;
  }

  .van-slider:after {
    position: absolute;
    top: -4px;
    left: -1px;
    content: "";
    width: 100%;
    height: 12px;
    background: #fff;
    transform: rotate(-1deg);
    transform-origin: left top;
    z-index: 0;
  }

  .communityNmae {}

  #page_proper .page_Wrapper .van-slider .van-slider__bar .van-slider__button-wrapper {
    z-index: 999;
  }

  .addresContent {
    padding: 10px 20px 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
  }

  .collapse_inputBox,
  .collapse_title {
    img {
      width: 16px;
      position: absolute;
      right: 21px;
      top: 24px;
    }

  }


  .collapse_title img.show,
  .collapse_inputBox img.on {
    width: 16px;
    position: absolute;
    right: 21px;
    top: 24px;
    transform: rotate(180deg);
  }

  .tipNocticeSucess,
  .tipNocticeQuestion {
    width: 17.875rem;
    // height: 112px;
    background: rgba(57, 62, 65, .9);
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
    /* opacity: 0.9; */
    border-radius: 10px;
    /* margin: auto; */
    position: fixed;
    top: 50%;
    left: 50%;
    margin-left: -8.9375rem;
    margin-top: -3.5rem;
    padding: 0 0 1.0625rem;

    img {
      width: 1.625rem;
      margin: 1.0625rem 8.125rem 0;
    }

    div {
      font-size: 14px;
      font-weight: 400;
      line-height: 22px;
      color: rgba(255, 255, 255, 1);
      padding: 0 23px;
      text-align: center;
    }
  }

  .sqmBox {
    margin-top: 1.25rem;
    position: relative;

    .van-field {
      height: 58px;
      background: rgba(242, 242, 242, 1);
      opacity: 1;
      border-radius: 2px;
      line-height: 38px;
    }

    span {
      position: absolute;
      top: 19px;
      right: 21px;
      height: 20px;
      font-size: 18px;
      font-weight: 600;
      line-height: 21px;
      color: rgba(153, 153, 153, 1);
    }
  }

  :-moz-placeholder,
  ::-moz-placeholder,
  :-ms-input-placeholder,
  ::-webkit-input-placeholder {
    text-align: right;
  }

  .headerBg {
    width: 100%;
    height: 12.5625rem;
    position: absolute;
    top: 0;
    z-index: -1;

    img {
      width: inherit;
    }
  }
</style>
