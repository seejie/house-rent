<template>
  <div class="home_footer">
    <div class="foot_content">
      <div class="foot_img"><img :src="agentHeader" alt=""></div>
      <div class="foot_text">
        <div class="foot_name">{{firstName}} {{lastName}}</div>
        <div class="foot_agent">{{serverRegion}}</div>
      </div>
      <div class="foot_button">
        <van-button type="info" @click="showPopup">{{$t("Chat")}}</van-button>
      </div>
    </div>
    <!-- <van-cell is-link @click="showPopup">展示弹出层</van-cell> -->
    <van-popup v-model="show" closeable position="bottom" round :style="{ height: '380px' }" :close-on-click-overlay=false>
      <div class="infoSubmit">
        <div class="text_title form_title">Please leave your contact information
          (mobile or email) for further conversation.</div>
        <van-form validate-first @failed="onFailed">
          <van-field v-model="value1" name="pattern" class="userName" placeholder="Name" left-icon="../assets/name (2)@2x.png" />
          <van-field v-model="value2" name="validator" class="user_tel" placeholder="+66945357465 (optional )" />
          <van-field v-model="value3" name="asyncValidator" class="user_email" placeholder="nicole@example.com (optional )" />
          <div>
            <van-button round block type="info" native-type="submit" @click="submit">
              Submit
            </van-button>
          </div>
        </van-form>
      </div>
    </van-popup>
  </div>
</template>

<script>
  export default {
    name: 'Propertys',
    props: {
      agentHeader: '',
      firstName: '',
      lastName: '',
      serverRegion: ''
    },
    data() {
      return {
        show: false,
        value1: '',
        value2: '',
        value3: '',
        pattern: /\d{6}/
      };
    },
    watch: {
      agentHeader(curInfo, oldInfo) {
        if (curInfo) {
          this.agentHeader = curInfo;
        }
      },
      firstName(curName, oldName) {
        if (curName) {
          this.firstName = curName;
        }
      },
      lastName(curNamel, oldNamel) {
        if (curNamel) {
          this.lastName = curNamel;
        }
      },
      serverRegion(curNamell, oldNamll) {
        if (curNamell) {
          this.serverRegion = curNamell;
        }
      }

    },
    mounted() {
      console.log(this.agentHeader);
    },
    methods: {
      submit () {
        this.reportData(this.value1)
      },
      reportData (name) {
        this.axios.post('api/h5/v1/houses/chat',{
          houseId: this.commonApi.getRequest().houseId,
          agentId: this.commonApi.getRequest().agentId,
          customerName: name || 'auto',
          customerPhone: this.value2,
          customerEmail: this.value3,
          channel: this.commonApi.getRequest().channel,
          language: this.commonApi.getRequest().language,
        })
      },
      // 校验函数返回 true 表示校验通过，false 表示不通过
      showPopup() {
        this.show = true;
        // this.reportData()
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
    },
  }
</script>

<style scoped lang="less">
  .home_footer {
    width: calc(100% - 40px);
    height: 3.75rem;
    background: #ffffff;
    -webkit-box-shadow: 0px -3px 6px rgba(0, 0, 0, 0.06);
    box-shadow: 0px -3px 6px rgba(0, 0, 0, 0.06);
    opacity: 1;
    padding: 0 1.25rem;
    position: fixed;
    bottom: 0;
    z-index: 99;

    .foot_img {
      overflow: hidden;
      margin-top: 1rem;
      width: 2.625rem;
      height: 2.625rem;
      border-radius: 50%;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      margin: 0.5625rem 0;
    }

    img {
      height: inherit;

    }

    .foot_name {
      font-size: 16px;
      font-family: "SF Pro Text Medium";
      font-weight: 500;
      line-height: 19px;
      color: rgba(57, 62, 65, 1)
    }

    .foot_agent {
      font-size: 14px;
      font-family: SF Pro Text;
      font-weight: 400;
      line-height: 20px;
      color: rgba(102, 102, 102, 1);
    }

    .van-button--info {
      // width: 6.25rem;
      height: 2.375rem;
      background: rgba(19, 119, 255, 1);
      opacity: 1;
      border-radius: 4px;
      margin: 0.375rem 0 1.625rem;

      .van-button__content {
        font-size: 15px;
        font-family: SF Pro Text;
        font-weight: 600;
        line-height: 18px;
        color: rgba(255, 255, 255, 1);
      }
    }

    .foot_text {
      margin-top: 0.75rem;
      margin-left: 0.75rem;
    }

  }

  .form_title {
    font-size: 16px;
    font-family: SF Pro Text;
    font-weight: 400;
    line-height: 24px;
    color: rgba(57, 62, 65, 1);
    padding: 2.25rem 1.625rem 0.8125rem;
    text-align: center;
  }

  .van-form {
    padding: 0 20px;

    .van-cell {
      height: 58px;
      border: 1px solid rgba(19, 119, 255, 1);
      opacity: 1;
      border-radius: 2px;
      margin: 10px 0;
      font-size: 15px;
      font-family: SF Pro Text;
      font-weight: 400;
      line-height: 38px;
      color: rgba(191, 191, 191, 1);

    }
  }

  .van-button__content {
    font-size: 15px;
    font-family: SF Pro Text;
    font-weight: bold;
    line-height: 18px;
    color: rgba(255, 255, 255, 1);
  }

  // .foot_contentdiv{
  //   display: inline-block;
  .foot_content {
    display: flex;
    height: inherit;
  }

  .foot_button {
    // margin: 0.6875rem 0;
    margin-left: auto;

    .van-button--info {
      width: 6.25rem;
      margin: 0.6875rem 0;

      .van-button__text {
        font-family: "SF Pro Text Semibold";
      }
    }
  }
</style>
