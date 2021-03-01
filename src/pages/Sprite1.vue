<template>
  <div class="page">
    <div class="road">
      <div class="character"></div>
      <div class="shadow"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sprite1'
}
</script>

<style lang="scss">
.page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: radial-gradient(#9bdfff, #009be4);
}
.road {
  position: relative;
  width: 80%;
  height: 160px;
  background: #525252;
  transform-origin: bottom;
  transform-style: preserve-3d;
  transform: perspective(60vw) rotateX(30deg);
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 100%;
    height: 10px;
    background: linear-gradient(90deg, #fff 0%, #fff 70%, #525252 70%, #525252 100%);
    background-size: 120px;
    animation: animateRoad 0.4s linear infinite;
  }
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 30px;
    background: #333;
    bottom: -30px;
    transform-origin: top;
    transform: perspective(60vw) rotateX(-25deg);
  }
  .shadow {
    position: absolute;
    bottom: -91px;
    left: 50%;
    width: 92%;
    height: 60px;
    background: linear-gradient(#000, transparent);
    transform: translateX(-50%);
    opacity: 0.5;
  }
}
.character {
  position: relative;
  width: calc(1122px / 12);
  height: 153px;
  overflow: hidden;
  left: 10px;
  background: url('~@/assets/images/spritewalkright.png') 0 0;
  transform: perspective(500px) rotateX(-25deg) translateY(-80px);
  -webkit-box-reflect: below 1px linear-gradient(transparent, 90%, #0004);
  animation: animateCharacter 1s steps(12) infinite;
}

@keyframes animateRoad {
  0% {
    background-position: 0;
  }
  100% {
    background-position: -120px;
  }
}
@keyframes animateCharacter {
  from {
    background-position: 0;
  }
  to {
    background-position: -1122px;
  }
}
</style>
