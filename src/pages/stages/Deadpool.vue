<template>
  <div class="page">
    <div class="debugbox">
      <ul>
        <li>P1.x: {{ player.position.x }}</li>
      </ul>
    </div>
    <div class="stage" :class="stage">
      <div class="hitbox" :style="`transform: scale(0.8) translateX(${player.position.x}px)`">
        <div class="character" :class="state"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.stage {
  &.forest {
    width: 3840px;
    height: 100%;
    background: url('~@/assets/images/stages/forest.png') 0 0 repeat-x;
    background-size: contain;
  }
  &.deadpool {
    width: 1598px;
    height: 484px;
    background: url('~@/assets/images/stages/deadpool.gif') 0 0 repeat-x;
    background-size: contain;
  }
}
.hitbox {
  width: calc(8130px / 30);
  transform: scale(0.80) translateX(0px);
  position: absolute;
  bottom: 0;
}
.character {
  width: calc(8130px / 30);
  height: 390px;
  background: url('~@/assets/images/subzero-sprite.png') 0 0 no-repeat;
  animation: subzeroIdle 1s steps(30) infinite;
  &.walkLeft {
    width: calc(9858px / 31);
    background: url('~@/assets/images/subzero-sprite-walk.png') 0 0 no-repeat;
    animation: subzeroWalkLeft 1s steps(31) infinite;
  }
  &.walkRight {
    width: calc(9858px / 31);
    background: url('~@/assets/images/subzero-sprite-walk.png') 0 0 no-repeat;
    animation: subzeroWalkRight 1s steps(31) infinite;
  }
}
@keyframes subzeroIdle {
  from {
    background-position: 0;
  }
  to {
    background-position: -8130px;
  }
}
@keyframes subzeroWalkLeft {
  from {
    background-position: -9858px;
  }
  to {
    background-position: 0;
  }
}
@keyframes subzeroWalkRight {
  from {
    background-position: 0;
  }
  to {
    background-position: -9858px;
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
          steps: 4
        },
        position: {
          x: 0
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
    onWalkRightPressed () {
      if (this.state !== 'walkRight') this.state = 'walkRight'
      this.player.position.x += this.player.movement.steps
    },
    onWalkLeftReleased () {
      if (this.state === 'walkLeft') this.state = 'idle'
    },
    onWalkRightReleased () {
      if (this.state === 'walkRight') this.state = 'idle'
    },

    customKeysChecker () {
      const { keys = {} } = this.$options

      if (keys[37]) this.onWalkLeftPressed()
      else this.onWalkLeftReleased()

      if (keys[39]) this.onWalkRightPressed()
      else this.onWalkRightReleased()
    }
  },

  created () {
    window.addEventListener('keyup', this.keyup)
    window.addEventListener('keydown', this.keydown)

    setInterval(this.customKeysChecker, 20)
  }
}
</script>
