<template>
  <div class="hello">
    <h1>{{ name }}</h1>
    <canvas id="canvas" ref="canvas"></canvas>
    <!-- {{ renderer.domElement }} -->
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
      loaderAnim: null
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
        // const fileAnimations = gltf.animations

        this.model.traverse(o => {
          if (o.isMesh) {
            o.castShadow = true
            o.receiveShadow = true
            o.material = stacyMtl
          }
        })

        this.model.scale.set(7, 7, 7)
        this.model.position.y = -11
        this.scene.add(this.model)
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
    },

    update () {
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
      const width = window.innerWidth
      const height = window.innerHeight
      const canvasPxWidth = canvas.width / window.devicePixelRatio
      const canvasPxHeight = canvas.height / window.devicePixelRatio

      const needResize = canvasPxWidth !== width || canvasPxHeight !== height

      if (needResize) {
        this.renderer.setSize(width, height, false)
      }

      return needResize
    }
  },

  mounted () {
    this.init()
    this.update()
  }
}
</script>

<style lang="scss" scoped>
#canvas {
  border: 5px solid #ccc;
}
</style>
