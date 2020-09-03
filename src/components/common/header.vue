<template>
  <div class="headeBox">
    <div class="logoBox">
      <div><img src="../../assets/logo.png" alt=""></div>
    </div>
    <div class="logoText">BeeBoard</div>
    <div class="openBtn">Open</div>
  </div>
</template>

<script>
</script>

<style>
  .headeBox {
    padding: 0 1.25rem;
    display: flex;
    height: 3.75rem;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    opacity: 1;
    position: fixed;
    top: 0;
    width: calc(100% - 2.5rem);
  }
  .logoBox {
    width: 3rem;
    height: 3rem;
    opacity: 1;
    margin: 0.375rem 0;
  }

  .logoBox>div {
    height: inherit;
    border-radius: 0.625rem;
    overflow: hidden;

  }

  img {
    width: 100%;
  }

  .logoText {
    font-size: 1.375rem;
    font-family: SF UI Text Bold;
    font-weight: bold;
    line-height: 3.75rem;
    color: rgba(19, 119, 255, 1);
    opacity: 1;
    margin-left: 0.375rem;
  }

  .openBtn {
    width: 6.25rem;
    height: 2.375rem;
    background: rgba(19, 119, 255, 1);
    opacity: 1;
    border-radius: 0.25rem;
    font-size: 15px;
    font-family: SF UI Text Semibold;
    font-weight: 600;
    line-height: 2.375rem;
    text-align: center;
    color: rgba(255, 255, 255, 1);
    margin-left: auto;
    margin-top: 0.6875rem;
  }
</style>
