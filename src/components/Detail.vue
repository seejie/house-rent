<template>
  <div class="detailBox">
    <head-view></head-view>
    <div class="container">
      <div class="container_title">
        3 Months Premium Membership
      </div>
      <div class="container_contact">
        has been availed by +<span>{{this.$route.query.code}} {{this.$route.query.phone}}</span>
      </div>
      <div class="containerCard">
        <div class="container_img">
          <div>BeeBoard Premium</div>
          <div>Valid until <span>{{parseInt(this.$route.query.time) | formatDate}}</span></div>
          <img src="../assets/detailbg.png" alt="">
        </div>
      </div>
      <ul class="container_list">
        <li>
          <div>Unlimited</div>
          <div><img src="../assets/list1.png" alt=""></div>
          <div>Active Listing</div>
        </li>
        <li>
          <div>Unlimited</div>
          <div><img src="../assets/list2.png" alt=""></div>
          <div>Active Lead</div>
        </li>
        <li>
          <div>Unlimited</div>
          <div><img src="../assets/list3.png" alt=""></div>
          <div>Contact Agent</div>
        </li>
      </ul>
      <div class="openAppBox">
        <div class="openAPP">Open in APP</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        time1: '',
      }
    },
    filters: {
      formatDate: function(value) {
        let date = new Date(value);
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let m = date.getMinutes();
        m = m < 10 ? ('0' + m) : m;
        let s = date.getSeconds();
        s = s < 10 ? ('0' + s) : s;
        return y + '/' + MM + '/' + d;
      }
    },
    created: {

    }


  }
</script>

<style>
  .detailBox  {
    text-align: center;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
  }

  .container_title {
    font-size: 20px;
    font-family: SF UI Text;
    font-weight: bold;
    line-height: 24px;
    color: #393E41;
    margin-top: 6.5rem;
  }

  .container_contact {

    font-size: 14px;
    font-family: SF UI Text;
    font-weight: 400;
    line-height: 16px;
    color: #999999;
    margin-top: 0.625rem;
  }

  .containerCard {
    display: flex;
    justify-content: center;
    margin-top: 1.75rem;
    height: 11.125rem;
  }

  .container_img {
    font-size: 14px;
    font-family: SF UI Text;
    font-weight: 400;
    line-height: 16px;
    color: #999999;

    position: relative;
    width: 20.9375rem;
    height: 11.125rem;
    opacity: 1;
    border-radius: 6px;
  }

  .container_img div:first-child {
    position: absolute;
    top: 2.375rem;
    left: 1.75rem;
    font-size: 20px;
    font-family: SF UI Text;
    font-weight: bold;
    line-height: 24px;
    color: #D7CFB7;
  }

  .container_img div:nth-of-type(2) {
    position: absolute;
    top: 4.5rem;
    left: 1.75rem;
    font-size: 12px;
    font-family: SF Pro Text;
    font-weight: 500;
    line-height: 14px;
    color: #D7CFB7;
  }

  img {
    width: 100%;
  }

  .container_list {
    margin-top: 1.75rem;
    display: flex;
    justify-content: space-between;
    padding: 0 1.25rem;
  }

  .container_list li div {
    width: 7rem;
    border-left: 1px solid #F2F2F2;
  }

  .container_list li div:first-child {
    font-size: 17px;
    font-family: SF UI Text;
    font-weight: bold;
    line-height: 20px;
    color: #1377FF;
    border-left: none;
  }

  .container_list li div img {
    width: 32px;
    height: 32px;
    margin: 8px auto;
  }

  .container_list li div:last-child {

    font-size: 14px;
    font-family: SF UI Text;
    font-weight: 500;
    line-height: 16px;
    color: #393E41;
  }

  .openAppBox {
    display: flex;
    justify-content: center;
  }

  .openAPP {
    width: 20.9375rem;
    height: 2.5rem;
    background: #1377FF;
    opacity: 1;
    border-radius: 6px;
    font-size: 15px;
    font-family: SF UI Text;
    font-weight: bold;
    line-height: 18px;
    color: #FFFFFF;
    margin-top: 2.875rem;
    line-height: 2.5rem;
  }
</style>
