<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  #app {
    /* font-family: Arial; */
    font-family: SF Pro Text;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* text-align: center; */
    /* color: #2c3e50; */
    /* height: 2200px; */
  }

  .van-dialog {
    width: 17.875rem;
    /* height: 7rem; */
    background: rgba(57, 62, 65, .9);
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.375rem;
    color: rgba(255, 255, 255, 1);
    margin: auto;
  }

  .van-dialog__content::before {
    width: 1.625rem;
    height: 1.625rem;
    content: '\2714';
    background: rgba(255, 255, 255, 1);
    border-radius: 50%;
    margin: 1.0625rem 8.125rem 0;
    font-size: 1rem;
    font-weight: 600;
    color: #1377FF;
    display: block;
    line-height: 1.625rem;
    text-align: center;
  }

  .van-dialog__message {
    /* padding: 0 1.3125rem; */
    padding: 10px 22px 16px;
    white-space: inherit;
    line-height: 1.5rem;
  }
  .van-slider__button-wrapper{
    z-index: 999;
  }
  .van-overlay{
    display: none;
  }
</style>
