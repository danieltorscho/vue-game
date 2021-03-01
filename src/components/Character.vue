<template>
  <div class="hello">
    <h1>{{ name }}</h1>
    <canvas id="canvas" ref="canvas"></canvas>
    <div v-if="loading" class="loading"><div class="loader"></div></div>
  </div>
</template>

<script>
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export default {
  name: 'Character',
  props: {
    name: String,
    modelPath: String,
    modelSkin: String
  },

  data () {
    return {
      scene: null,
      renderer: null,
      camera: null,
      model: null,
      neck: null,
      waist: null,
      possibleAnims: null,
      mixer: null,
      idle: null,
      clock: new THREE.Clock(),
      currentlyAnimating: false,
      raycaster: new THREE.Raycaster(),
      loading: true
    }
  },

  methods: {
    init () {
      this.setupScene()
      this.setupRendered()
      this.setupCamera()
      this.setupModel()
      this.setupLights()
      this.setupFloor()
    },

    setupScene () {
      this.scene = new THREE.Scene()
      this.scene.background = new THREE.Color(0xf1f1f1)
      this.scene.fog = new THREE.Fog(0xf1f1f1, 60, 100)
    },

    setupRendered () {
      const canvas = this.$refs.canvas
      this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
      this.renderer.shadowMap.enabled = true
      this.renderer.setPixelRatio(window.devicePixelRatio)
    },

    setupCamera () {
      this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000)
      this.camera.position.x = 0
      this.camera.position.y = -3
      this.camera.position.z = 30
    },

    setupModel () {
      const loader = new GLTFLoader()

      const stacyTxt = new THREE.TextureLoader().load(this.modelSkin)
      stacyTxt.flipY = false
      const stacyMtl = new THREE.MeshPhongMaterial({
        map: stacyTxt,
        color: 0xffffff,
        skinning: true
      })

      loader.load(this.modelPath, (gltf) => {
        this.model = gltf.scene
        const fileAnimations = gltf.animations

        this.model.traverse(o => {
          if (o.isMesh) {
            o.castShadow = true
            o.receiveShadow = true
            o.material = stacyMtl
          }

          if (o.isBone && o.name === 'mixamorigNeck') this.neck = o
          if (o.isBone && o.name === 'mixamorigSpine') this.waist = o
        })

        this.model.scale.set(7, 7, 7)
        this.model.position.y = -11
        this.scene.add(this.model)

        this.loading = false

        this.mixer = new THREE.AnimationMixer(this.model)

        const idleAnim = THREE.AnimationClip.findByName(fileAnimations, 'idle')

        idleAnim.tracks.splice(3, 3)
        idleAnim.tracks.splice(9, 3)

        const idle = this.mixer.clipAction(idleAnim)
        idle.play()
      },
      undefined,
      (error) => {
        console.eror(error)
      })
    },

    setupLights () {
      const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61)
      hemiLight.position.set(0, 50, 0)
      this.scene.add(hemiLight)

      const direct = 8.25
      const light = new THREE.DirectionalLight(0xffffff, 0.54)
      light.position.set(-8, 12, 8)
      light.castShadow = true
      light.shadow.mapSize = new THREE.Vector2(1024, 1024)
      light.shadow.camera.near = 0.1
      light.shadow.camera.far = 1500
      light.shadow.camera.left = direct * -1
      light.shadow.camera.right = direct
      light.shadow.camera.top = direct
      light.shadow.camera.bottom = direct * -1
      this.scene.add(light)
    },

    setupFloor () {
      const floorGeometry = new THREE.PlaneGeometry(5000, 5000, 1, 1)
      const floorMaterial = new THREE.MeshPhongMaterial({ color: 0xeeeeee, shininess: 0 })

      const floor = new THREE.Mesh(floorGeometry, floorMaterial)
      floor.rotation.x = -0.5 * Math.PI
      floor.receiveShadow = true
      floor.position.y = -11
      this.scene.add(floor)

      const geometry = new THREE.SphereGeometry(8, 32, 32)
      const material = new THREE.MeshBasicMaterial({ color: 0x9bffaf })
      const sphere = new THREE.Mesh(geometry, material)
      sphere.position.x = -0.25
      sphere.position.y = -2.5
      sphere.position.z = -15
      this.scene.add(sphere)
    },

    update () {
      if (this.mixer) {
        this.mixer.update(this.clock.getDelta())
      }
      if (this.resizeRendererToDisplaySize(this.renderer)) {
        const canvas = this.$refs.canvas
        this.camera.aspect = canvas.clientWidth / canvas.clientHeight
        this.camera.updateProjectionMatrix()
      }

      this.renderer.render(this.scene, this.camera)
      requestAnimationFrame(this.update)
    },

    resizeRendererToDisplaySize (renderer) {
      const canvas = this.$refs.canvas
      if (canvas.width && canvas.height) {
        const width = window.innerWidth
        const height = window.innerHeight

        const canvasPxWidth = canvas.width / window.devicePixelRatio
        const canvasPxHeight = canvas.height / window.devicePixelRatio

        const needResize = canvasPxWidth !== width || canvasPxHeight !== height

        if (needResize) {
          this.renderer.setSize(width, height, false)
        }

        return needResize
      } else {
        return false
      }
    },

    setupMouseEvents () {
      document.addEventListener('mousemove', e => {
        const mousecoords = {
          x: e.clientX,
          y: e.clientY
        }

        if (this.neck && this.waist) {
          this.moveJoint(mousecoords, this.neck, 50)
          this.moveJoint(mousecoords, this.waist, 30)
        }
      })
    },

    moveJoint (mouse, joint, degreeLimit) {
      const degrees = this.getMouseDegrees(mouse.x, mouse.y, degreeLimit)
      joint.rotation.x = THREE.Math.degToRad(degrees.y)
      joint.rotation.y = THREE.Math.degToRad(degrees.x)
    },

    getMouseDegrees (x, y, degreeLimit) {
      let dx = 0
      let dy = 0
      let xdiff = 0
      let xPercentage
      let ydiff
      let yPercentage

      const w = { x: window.innerWidth, y: window.innerHeight }

      // Left (Rotates neck left between 0 and -degreeLimit)
      // 1. If cursor is in the left half of screen
      if (x <= w.x / 2) {
        // 2. Get the difference between middle of screen and cursor position
        xdiff = w.x / 2 - x
        // 3. Find the percentage of that difference (percentage toward edge of screen)
        xPercentage = (xdiff / (w.x / 2)) * 100
        // 4. Convert that to a percentage of the maximum rotation we allow for the neck
        dx = ((degreeLimit * xPercentage) / 100) * -1
      }

      // Right (Rotates neck right between 0 and degreeLimit)
      if (x >= w.x / 2) {
        xdiff = x - w.x / 2
        xPercentage = (xdiff / (w.x / 2)) * 100
        dx = (degreeLimit * xPercentage) / 100
      }
      // Up (Rotates neck up between 0 and -degreeLimit)
      if (y <= w.y / 2) {
        ydiff = w.y / 2 - y
        yPercentage = (ydiff / (w.y / 2)) * 100
        // Note that I cut degreeLimit in half when she looks up
        dy = (((degreeLimit * 0.5) * yPercentage) / 100) * -1
      }

      // Down (Rotates neck down between 0 and degreeLimit)
      if (y >= w.y / 2) {
        ydiff = y - w.y / 2
        yPercentage = (ydiff / (w.y / 2)) * 100
        dy = (degreeLimit * yPercentage) / 100
      }

      return { x: dx, y: dy }
    }
  },

  mounted () {
    this.init()
    this.update()
    this.setupMouseEvents()
  }
}
</script>

<style lang="scss" scoped>
#canvas {
  border: 5px solid #ccc;
}
.loading {
  position: fixed;
  z-index: 50;
  width: 100%;
  height: 100%;
  top: 0; left: 0;
  background: #f1f1f1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loader{
  -webkit-perspective: 120px;
  -moz-perspective: 120px;
  -ms-perspective: 120px;
  perspective: 120px;
  width: 100px;
  height: 100px;
}

.loader:before{
  content: "";
  position: absolute;
  left: 25px;
  top: 25px;
  width: 50px;
  height: 50px;
  background-color: #9bffaf;
  animation: flip 1s infinite;
}

@keyframes flip {
  0% {
    transform: rotate(0);
  }

  50% {
    transform: rotateY(180deg);
  }

  100% {
    transform: rotateY(180deg)  rotateX(180deg);
  }
}
</style>
