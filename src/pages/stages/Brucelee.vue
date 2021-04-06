<template>
  <div class="page">
    <div class="debugbox" v-if="true">
      <ul>
        <li>P1.x: {{ player.position.x }}</li>
        <li>P1.y: {{ player.position.y }}</li>
      </ul>
    </div>
    <div class="stage" :class="stage">
      <div class="hitbox" :style="`transform: scale(3) translateX(${player.position.x}px) translateY(${player.position.y}px)`">
        <div class="character" :class="state"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.stage {
  &.deadpool {
    width: 1598px;
    height: 484px;
    background: url('~@/assets/images/stages/deadpool.gif') 0 0 repeat-x;
    background-size: contain;
  }
}
.hitbox {
  width: 57px;
  transform: scale(3) translateX(0px) translateY(0px);
  position: absolute;
  bottom: 150px;
  left: 100px;
}
.character {
  width: 57px;
  height: 108px;
  background: url('~@/assets/images/brucelee.png') 0 0 no-repeat;
  animation: idle 2s steps(1) infinite;
  &.walkLeft {
    width: 47px;
    animation: walkLeft 0.5s steps(1) infinite;
  }
  &.walkRight {
    width: 47px;
    animation: walkRight 0.5s steps(1) infinite;
  }
  &.jumpUp {
    width: 40px;
    transform: translateX(4px);
    animation: jumpUp 0.7s steps(1) infinite;
  }
  &.crouch {
    width: 52px;
    // transform: translateX(4px);
    animation: crouch 0.1s steps(1) forwards;
  }
}
@keyframes idle {
  0% {
    background-position-x: 0;
  }
  10% {
    background-position-x: -57px;
  }
  20% {
    background-position-x: -114px;
  }
  30% {
    background-position-x: -172px;
  }
  40% {
    background-position-x: -229px;
  }
  50% {
    background-position-x: -287px;
  }
  60% {
    background-position-x: -348px;
  }
  70% {
    background-position-x: -410px;
  }
  80% {
    background-position-x: -468px;
  }
  90% {
    background-position-x: -524px;
  }
  100% {
    background-position-x: -582px;
  }
}
@keyframes walkLeft {
  0% {
    background-position-x: -768px;
  }
  25% {
    background-position-x: -722px;
  }
  50% {
    background-position-x: -675px;
  }
  75% {
    background-position-x: -629px;
  }
  100% {
    background-position-x: -583px;
  }
}
@keyframes walkRight {
  0% {
    background-position-x: -583px;
  }
  25% {
    background-position-x: -629px;
  }
  50% {
    background-position-x: -675px;
  }
  75% {
    background-position-x: -722px;
  }
  100% {
    background-position-x: -770px;
  }
}
@keyframes jumpUp {
  0% {
    background-position-x: -830px;
    transform: translateX(12px) translateY(0px);
  }
  20% {
    background-position-x: -869px;
    transform: translateX(12px) translateY(-30px);
  }
  40% {
    background-position-x: -912px;
    transform: translateX(12px) translateY(-80px);
  }
  60% {
    background-position-x: -951px;
    transform: translateX(12px) translateY(-50px);
  }
  80% {
    background-position-x: -992px;
    transform: translateX(12px) translateY(-20px);
  }
  100% {
    background-position-x: -1029px;
    transform: translateX(12px) translateY(0px);
  }
}
@keyframes crouch {
  0% {
    background-position-x: -1452px;
  }
  50% {
    background-position-x: -1502px;
  }
  100% {
    background-position-x: -1502px;
  }
}
</style>

<script>
export default {
  name: 'Subzero',
  keys: {},
  data () {
    return {
      stage: 'deadpool',
      state: 'idle',
      player: {
        movement: {
          steps: 2,
          disabled: false
        },
        position: {
          x: 0,
          y: 0
        }
      }
    }
  },

  methods: {
    keydown (e) {
      this.$options.keys[e.keyCode] = true
    },

    keyup (e) {
      this.$options.keys[e.keyCode] = false
    },

    onWalkLeftPressed () {
      if (this.state !== 'walkLeft') this.state = 'walkLeft'
      this.player.position.x -= this.player.movement.steps
    },
    onWalkLeftReleased () {
      if (this.state === 'walkLeft') this.state = 'idle'
    },

    onWalkRightPressed () {
      if (this.state !== 'walkRight') this.state = 'walkRight'
      this.player.position.x += this.player.movement.steps
    },
    onWalkRightReleased () {
      if (this.state === 'walkRight') this.state = 'idle'
    },

    onJumpUpPressed () {
      if (this.state !== 'jumpUp') this.state = 'jumpUp'
    },
    onJumpUpReleased () {
      if (this.state === 'jumpUp') this.state = 'idle'
    },

    onCrouchPressed () {
      if (this.state !== 'crouch') this.state = 'crouch'
    },
    onCrouchReleased () {
      if (this.state === 'crouch') this.state = 'idle'
    },

    customKeysChecker () {
      const { keys = {} } = this.$options

      if (keys[37]) this.onWalkLeftPressed()
      else this.onWalkLeftReleased()

      if (keys[39]) this.onWalkRightPressed()
      else this.onWalkRightReleased()

      if (keys[38]) this.onJumpUpPressed()
      else this.onJumpUpReleased()

      if (keys[40]) this.onCrouchPressed()
      else this.onCrouchReleased()
    }
  },

  created () {
    window.addEventListener('keyup', this.keyup)
    window.addEventListener('keydown', this.keydown)

    setInterval(this.customKeysChecker, 20)
  }
}
</script>
