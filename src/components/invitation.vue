<template>
  <div id="maxBox">
    <head-view></head-view>
    <div class="contentBox">
      <div class="contentImg">
        <div class="contentHeader"><img :src="headerImg" alt=""></div>
        <div class="contentfrom">from</div>
        <div class="agentName">{{firstName}} {{lastName}}</div>
      </div>
      <div class="inputPhone">
        <span @click="alertSelectBox">
          <span v-show="isChecked" style="{margin-left: 0;}">+</span>{{numberCode}}
          <span class="iconPhone">></span></span>

        <input v-model='phone' type="number" placeholder="Mobile Number">

      </div>
      <div class="tip" @click="getPhone">Get 3 months free premium membership</div>
      <div class="notice">By tapping the button above, I accept BeeBoard’s <a>Terms of Use</a> and <a>Privacy Policy</a></div>
    </div>
    <div class="maskeBox" v-show="isShow1">
      <div class="questionBox">
        <div class="questionIcon"><img src="../assets/question.png" alt=""></div>
        <div class="questionText">The mobile number <br /> has already been registered.</div>
      </div>
    </div>
    <div class="maskeBox" v-show="isShow2">
      <div class="questionBox">
        <div class="questionIcon"><img src="../assets/question.png" alt=""></div>
        <div class="questionText">Please fill in the form.</div>
      </div>
    </div>

    <div class="selectNumberBox" v-show="isShow3">
      <!-- <van-area title="Region Code" :area-list="areaList" :columns-num="1" class="selectNumber"/> -->
      <div class="headerListBox">
        <div class="headerList">
          <div>Cancel</div>
          <div :style="{color:'#393E41'}">Region Code</div>
          <div @click="closeSelectBox">Done</div>
        </div>
        <div class="headerListData">
          <ul>
            <li v-for="(item, index) in areaList" :key="index" @click="checkedNow(index,item)" v-bind:class="{on:index==current}">
              <div class="listItem">
                <span>{{item.name}}</span>
                <span class="listCode">+{{item.code}}</span>
                <span class="checkedImg" v-show="index==current"><img src="../assets/checked.png" alt=""></span>
              </div>
            </li>
          </ul>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        current: -1,
        isShow1: false,
        isShow2: false,
        isShow3: false,
        phone: '',
        isChecked: false,
        areaList: [],
        numberObj: '',
        numberName: '',
        numberCode: 'Select',
        time: '',
        headerImg: '',
        firstName: '',
        lastName: '',
        AagentID: ''
      }
    },
    created() {
      this.getAreaList();
      this.getDataAgentInfo();
    },

    methods: {

      checkedNow: function(index, item) {
        this.current = index;
        this.numberObj = item;
        this.numberName = this.numberObj.name;
        this.numberCode = this.numberObj.code;
        console.log(this.numberName, this.numberCode)
      },
      alertSelectBox: function() {
        this.isShow3 = true;
      },
      closeSelectBox: function() {
        this.isShow3 = false;
        this.isChecked = true;
        this.dataId = 1;
      },
      getAreaList: function() {

        this.axios.get("/api/v1/regions", {
          params: {
            pid: 0
          },
        }).then(res => {

          this.areaList = res.data.data;
          console.log(res.data.data)
        })
      },
      getDataAgentInfo: function() {
        this.axios.get("/api/h5/v1/agents/id", {
          params: {
            agentId: window.location.hash.split('=')[1]
            // agentId: '1277422316648796160'
          },
        }).then(res => {
          this.firstName = res.data.data.firstName;
          this.lastName = res.data.data.lastName;
          this.headerImg = res.data.data.header;
          console.log(res.data)

        })
      },
      getPhone: function() {
        if (this.phone !== '' & this.numberCode !== 'Select') {
          this.axios.post("/api/h5/v1/invitations", {
            "phone": this.phone,
            "agentId": window.location.hash.split('=')[1]
            // "agentId": '1298862484266029056'
          }).then(res => {

            if (res.data.result == "1") {
              this.time = res.data.data.time;
              console.log(this.time)
              let _this = this;
              setTimeout(function() {
                _this.$router.push({
                  path: "/Detail",
                  query: {
                    phone: _this.phone,
                    code: _this.numberCode,
                    time: _this.time
                  }
                });
              }, 1000)
            } else {
              let _this = this;
              _this.isShow = true;
              setTimeout(function() {
                _this.isShow = false;
              }, 1000)
            }

          })
        } else {
          let _this = this;
          _this.isShow2 = true;
          setTimeout(function() {
            _this.isShow2 = false;
          }, 1000)
        }

      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .maxBox {
    text-align: center;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
  }

  .selectNumberBox {
    background-color: rgba(57, 62, 65, .67);
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .headerListBox {
    width: 100%;

    position: absolute;
    bottom: 0;
    background: #FFFFFF;
    box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.12);
  }

  .headerList {
    display: flex;
    font-size: 15px;
    font-family: SF UI Text;
    font-weight: 600;
    line-height: 2.75rem;
    color: #1377FF;
    justify-content: space-around;
    height: 2.75rem;
  }

  .headerListData {
    height: 27.25rem;
    overflow-y: auto;
  }

  .headerListBox div ul li {
    font-size: 15px;
    font-family: SF UI Text;
    font-weight: 400;
    line-height: 18px;
    color: #666666;
    height: 45px;
    line-height: 45px;
    background-color: #EFEFEF;
    border: 1px solid #EAEAEA;
  }

  .listItem {
    padding: 0 1.25rem;

  }

  .checkedImg {
    width: 0.8125rem;
    height: 10px;
    display: block;
    float: right;
  }

  .listCode {
    margin-left: 0.5rem;
  }

  .van-picker {
    bottom: 0;
  }

  .contentBox {}

  .contentImg {
    width: 15.25rem;
    margin: 2rem auto;
    position: relative;
    height: 18.1875rem;
    background: url(../assets/contentbg.png);
    background-size: contain;
    display: flex;
    justify-content: center;
    margin-top: 5.75rem;
  }

  .inputPhone {
    width: 19.5rem;
    height: 3rem;
    border: 1px solid rgba(51, 51, 51, 1);
    opacity: 1;
    border-radius: 6px;
    margin: 4px auto;
  }

  .inputPhone span {
    font-size: 15px;
    font-family: SF UI Text Medium;
    font-weight: 500;
    line-height: 18px;
    color: rgba(57, 62, 65, 1);
    display: inline-block;
    line-height: 3rem;
    margin-left: 15px;
  }

  .iconPhone {
    margin-left: 0.25rem !important;
    transform: rotate(90deg);
  }

  .inputPhone input {
    background: none;
    outline: none;
    border: none;
    height: 3rem;
    line-height: 3rem;
    font-size: 15px;
    padding: 0 1.25rem;
    font-family: SF UI Text;
    font-weight: 400;
    width: 11rem;
  }

  .inputPhone input::placeholder {
    font-size: 15px;
    font-family: SF UI Text;
    font-weight: 400;
    line-height: 3rem;
    color: rgba(191, 191, 191, 1);
    padding-left: 0.625rem;
  }

  .tip {
    width: 19.5rem;
    height: 2.5rem;
    background: linear-gradient(180deg, rgba(44, 44, 44, 1) 0%, rgba(83, 105, 118, 1) 100%);
    opacity: 1;
    line-height: 2.5rem;
    text-align: center;
    border-radius: 0.375rem;
    font-size: 14px;
    font-family: SF UI Text Bold;
    font-weight: bold;
    color: rgba(232, 176, 140, 1);
    margin: auto;
    margin-top: 1.75rem
  }

  .notice {
    width: 17.5rem;
    margin: auto;
    margin-top: 15px;
    font-size: 12px;
    font-family: SF UI Text;
    font-weight: 400;
    line-height: 14px;
    color: rgba(57, 62, 65, 1);
    text-align: center;
  }

  .notice a {
    color: #1377FF;
    text-decoration: underline;
  }

  .contentHeader {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    border: 2px solid #FFFFFF;
    position: absolute;
    left: 50%;
    margin-left: -2rem;
    bottom: 2.5625rem;
    overflow: hidden;
  }

  .agentName {
    font-size: 12px;
    font-family: SF Pro Text;
    font-weight: 600;
    line-height: 14px;
    color: rgba(57, 62, 65, 1);
    position: absolute;
    bottom: 0.625rem;
  }

  .contentfrom {
    font-size: 10px;
    font-family: SF Pro Text;
    font-weight: 600;
    line-height: 12px;
    color: rgba(102, 102, 102, 1);
    position: absolute;
    bottom: 1.5625rem;
  }

  .maskeBox {
    background: rgba(57, 62, 65, .7);
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  .questionBox {
    width: 13.75rem;
    height: 6.25rem;
    background: rgba(255, 255, 255, .9);
    box-shadow: 0px 0px 20px rgba(255, 255, 255, 0.16);
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -6.875rem;
    margin-top: -3.125rem;
    border-radius: 0.5rem;
  }

  .questionIcon {
    width: 1.625rem;
    height: 1.625rem;
    margin: auto;
    margin-top: 0.8125rem;
  }

  .questionText {
    font-size: 14px;
    font-family: SF UI Text;
    font-weight: 400;
    line-height: 20px;
    color: rgba(57, 62, 65, 1);
    text-align: center;
    margin-top: 0.5rem;
  }
</style>
