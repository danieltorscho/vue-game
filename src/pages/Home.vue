<template>
  <div class="page">
    <character
      name="Character #1"
      model-path="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1376484/stacy_lightweight.glb"
      model-skin="https://i.imgur.com/okTtcVF.jpg"
    />
  </div>
</template>

<script>
import Character from '@/components/Character.vue'

export default {
  name: 'Home',
  components: {
    Character
  }
}
</script>
