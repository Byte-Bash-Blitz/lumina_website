import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

const WalterWhite = () => {
  const mountRef = useRef(null)
  const sceneRef = useRef(null)
  const animationRef = useRef(null)

  useEffect(() => {
    let camera, scene, renderer, walter, world
    let hemiLight, dirLight, backLight, isUp = false

    const container = {
      width: 0,
      height: 0
    }

    const mouse = {
      x: {
        current: 0,
        previous: 0,
        calc: 0
      },
      y: {
        current: 0,
        previous: 0,
        calc: 0
      }
    }

    function init() {
      // Set container size to be smaller and contained
      container.width = 320
      container.height = 320

      camera = new THREE.PerspectiveCamera(65, container.width / container.height, 1, 2000)
      camera.position.z = 2000
      camera.position.y = 400
      camera.lookAt(new THREE.Vector3(0, 0, 0))

      scene = new THREE.Scene()

      renderer = new THREE.WebGLRenderer({
        alpha: true, // This makes the background transparent
        antialias: true
      })
      renderer.setSize(container.width, container.height)
      renderer.shadowMapEnabled = true
      renderer.setClearColor(0x000000, 0) // Transparent background

      // Append to our ref instead of document body
      if (mountRef.current) {
        mountRef.current.appendChild(renderer.domElement)
      }

      // Add event listeners
      document.addEventListener('mousemove', mousemove, false)
      document.addEventListener('mouseup', mouseup, false)
      document.addEventListener('mousedown', mousedown, false)
      document.addEventListener('touchend', touchend, false)
      document.addEventListener('touchmove', touchmove, false)
    }

    function mousemove(e) {
      const rect = mountRef.current?.getBoundingClientRect()
      if (rect) {
        mouse.x.current = e.clientX - rect.left
        mouse.y.current = e.clientY - rect.top
        mouse.x.calc = mouse.x.current - (container.width / 2)
        mouse.y.calc = mouse.y.current - (container.height / 2)
      }
    }

    function touchend(e) {
      // Toggle state on touch
      isUp = !isUp
    }

    function touchmove(e) {
      if (e.touches.length === 1) {
        e.preventDefault()
        const rect = mountRef.current?.getBoundingClientRect()
        if (rect) {
          mouse.x.current = e.touches[0].pageX - rect.left
          mouse.y.current = e.touches[0].pageY - rect.top
          mouse.x.calc = mouse.x.current - (container.width / 2)
          mouse.y.calc = mouse.y.current - (container.height / 2)
        }
      }
    }

    function mouseup(e) {
      // Remove mouseup functionality since we're using click toggle
    }

    function mousedown(e) {
      // Toggle the state on each click
      isUp = !isUp
    }

    function addLights() {
      hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6)

      dirLight = new THREE.DirectionalLight(0xffffff, 0.8)
      dirLight.position.set(200, 200, 200)
      dirLight.castShadow = true
      dirLight.shadowDarkness = 0.1

      const backLight = new THREE.DirectionalLight(0xffffff, 0.4)
      backLight.position.set(-200, 200, 50)
      backLight.shadowDarkness = 0.1
      backLight.castShadow = true

      scene.add(backLight)
      scene.add(hemiLight)
      scene.add(dirLight)
    }

    function createWalter() {
      walter = new Walter()
      scene.add(walter.threegroup)
    }

    function Walter() {
      this.threegroup = new THREE.Group()

      this.informalSmokingMat = "#ffc107"
      this.informalLegsMMat = "#755b0b"
      this.informalZipperMat = "#755b0b"
      this.informalShoesMat = "#907637"

      this.formalSmokingMat = "#333"
      this.formalLegsMMat = "#222"
      this.formalZipperMat = "white"
      this.formalShoesMat = "#585858"

      this.hatMat = new THREE.MeshLambertMaterial({
        color: "#333",
        flatShading: true,
      })

      this.skinMat = new THREE.MeshLambertMaterial({
        color: "#e0bea5",
        flatShading: true,
      })

      this.pupilaMat = new THREE.MeshLambertMaterial({
        color: "#333",
        flatShading: true,
      })

      this.lipMat = new THREE.MeshLambertMaterial({
        color: "#333",
        flatShading: true,
      })

      this.eyeMat = new THREE.MeshLambertMaterial({
        color: "white",
        flatShading: true
      })

      this.bearMat = new THREE.MeshLambertMaterial({
        color: "#bb7344",
        flatShading: true
      })

      this.zipperMat = new THREE.MeshLambertMaterial({
        color: this.formalZipperMat,
        flatShading: true
      })

      this.smokingMat = new THREE.MeshLambertMaterial({
        color: this.formalSmokingMat,
        flatShading: true
      })

      this.legsMMat = new THREE.MeshLambertMaterial({
        color: this.formalLegsMMat,
        flatShading: true
      })

      this.shoesMat = new THREE.MeshLambertMaterial({
        color: this.formalShoesMat,
        flatShading: true
      })

      // Head
      const head = new THREE.BoxGeometry(300, 350, 280)
      this.head = new THREE.Mesh(head, this.skinMat)
      this.head.position.x = 0
      this.head.position.y = 160
      this.head.position.z = 400

      // Glasses
      const glass = new THREE.BoxGeometry(120, 78, 10)
      this.glassLeft = new THREE.Mesh(glass, this.eyeMat)
      this.glassLeft.position.x = -80
      this.glassLeft.position.y = 4
      this.glassLeft.position.z = 160

      this.glassRight = new THREE.Mesh(glass, this.eyeMat)
      this.glassRight.position.x = 80
      this.glassRight.position.y = 4
      this.glassRight.position.z = 160

      // Glass middle
      const glassu = new THREE.BoxGeometry(40, 10, 10)
      this.glassu = new THREE.Mesh(glassu, this.pupilaMat)
      this.glassu.position.x = 0
      this.glassu.position.y = 5
      this.glassu.position.z = 155

      // Retinas
      const retina = new THREE.BoxGeometry(25, 25, 5)
      this.retinaLeft = new THREE.Mesh(retina, this.pupilaMat)
      this.retinaLeft.position.x = -80
      this.retinaLeft.position.y = 5
      this.retinaLeft.position.z = 168

      this.retinaRight = new THREE.Mesh(retina, this.pupilaMat)
      this.retinaRight.position.x = 80
      this.retinaRight.position.y = 5
      this.retinaRight.position.z = 168

      // Beard
      const beard = new THREE.BoxGeometry(140, 130, 10)
      this.beard = new THREE.Mesh(beard, this.bearMat)
      this.beard.position.x = 0
      this.beard.position.z = 160
      this.beard.position.y = -140

      // Mouth
      const mout = new THREE.BoxGeometry(90, 60, 50)
      this.mout = new THREE.Mesh(mout, this.skinMat)
      this.mout.position.x = 0
      this.mout.position.z = 155
      this.mout.position.y = -130

      // Lip
      const lip = new THREE.BoxGeometry(40, 20, 50)
      this.lip = new THREE.Mesh(lip, this.lipMat)
      this.lip.position.x = 0
      this.lip.position.z = 162
      this.lip.position.y = -120

      // Hat
      const hatTop = new THREE.BoxGeometry(320, 120, 290)
      this.hatTop = new THREE.Mesh(hatTop, this.hatMat)
      this.hatTop.position.x = 0
      this.hatTop.position.z = 0
      this.hatTop.position.y = 180

      const hatBottom = new THREE.BoxGeometry(400, 40, 380)
      this.hatBottom = new THREE.Mesh(hatBottom, this.hatMat)
      this.hatBottom.position.x = 0
      this.hatBottom.position.z = 0
      this.hatBottom.position.y = 100

      // Body
      const body = new THREE.BoxGeometry(300, 250, 600)
      this.body = new THREE.Mesh(body, this.smokingMat)
      this.body.position.x = 0
      this.body.position.y = -220
      this.body.position.z = 100

      // Arms
      const arm = new THREE.BoxGeometry(50, 250, 100)

      this.armLeft = new THREE.Mesh(arm, this.smokingMat)
      this.armLeft.position.x = -170
      this.armLeft.position.y = 0
      this.armLeft.position.z = 200

      this.armRight = new THREE.Mesh(arm, this.smokingMat)
      this.armRight.position.x = 170
      this.armRight.position.y = 0
      this.armRight.position.z = 200

      // Hands
      const hand = new THREE.BoxGeometry(50, 50, 50)

      this.handLeft = new THREE.Mesh(hand, this.skinMat)
      this.handLeft.position.x = -170
      this.handLeft.position.y = -150
      this.handLeft.position.z = 220

      this.handRight = new THREE.Mesh(hand, this.skinMat)
      this.handRight.position.x = 170
      this.handRight.position.y = -150
      this.handRight.position.z = 220

      // Zipper
      const zipper = new THREE.BoxGeometry(80, 250, 10)
      this.zipper = new THREE.Mesh(zipper, this.zipperMat)
      this.zipper.position.x = 0
      this.zipper.position.y = 0
      this.zipper.position.z = 300

      // Legs
      const legs = new THREE.BoxGeometry(200, 300, 300)
      this.legs = new THREE.Mesh(legs, this.smokingMat)
      this.legs.position.x = 0
      this.legs.position.y = -200
      this.legs.position.z = 100

      // Legs Middle
      const legsM = new THREE.BoxGeometry(10, 130, 5)
      this.legsM = new THREE.Mesh(legsM, this.legsMMat)
      this.legsM.position.x = 0
      this.legsM.position.y = -280
      this.legsM.position.z = 248

      // Shoes
      const shoes = new THREE.BoxGeometry(200, 50, 400)
      this.shoes = new THREE.Mesh(shoes, this.shoesMat)
      this.shoes.position.x = 0
      this.shoes.position.y = -400
      this.shoes.position.z = 100

      // Group elements
      this.head.add(this.hatTop)
      this.head.add(this.hatBottom)
      this.head.add(this.glassu)
      this.head.add(this.glassLeft)
      this.head.add(this.glassRight)
      this.head.add(this.retinaLeft)
      this.head.add(this.retinaRight)
      this.head.add(this.beard)
      this.head.add(this.mout)
      this.head.add(this.lip)

      this.body.add(this.armLeft)
      this.body.add(this.armRight)
      this.body.add(this.zipper)
      this.body.add(this.handLeft)
      this.body.add(this.handRight)
      this.body.add(this.legs)
      this.body.add(this.legsM)
      this.body.add(this.shoes)

      this.threegroup.add(this.head)
      this.threegroup.add(this.body)

      this.update = function() {
        // Move body
        this.bodyRY = calc(mouse.x.calc, -400, 400, -Math.PI / 20, Math.PI / 20)
        this.bodyRX = calc(mouse.y.calc, -400, 400, -Math.PI / 90, Math.PI / 90)
        // Move head
        this.headRY = calc(mouse.x.calc, -200, 200, -Math.PI / 4, Math.PI / 4)
        this.headRX = calc(mouse.y.calc, -200, 200, -Math.PI / 4, Math.PI / 4)

        this.rotate(10)
      }

      this.rotate = function(speed) {
        if (isUp) {
          if (this.beard.scale.y < 2) {
            this.beard.scale.y += 0.02
            this.beard.position.y -= 1.3
            this.body.position.z -= 2
          }

          this.body.material.color = new THREE.Color(this.informalSmokingMat)
          this.legsM.material.color = new THREE.Color(this.informalLegsMMat)
          this.zipper.material.color = new THREE.Color(this.informalZipperMat)
          this.shoes.material.color = new THREE.Color(this.informalShoesMat)

          this.zipper.scale.x = 0.2
          this.hatTop.scale.x = this.hatBottom.scale.x = 0
          this.hatTop.scale.y = this.hatBottom.scale.y = 0
          this.hatTop.scale.z = this.hatBottom.scale.z = 0
          this.lip.scale.x = 0.5

          this.retinaLeft.rotateZ(0.1)
          this.retinaRight.rotateZ(-0.1)
          this.handLeft.rotateY(0.1)
          this.handRight.rotateY(-0.1)
        } else {
          this.beard.position.set(0, -140, 160)
          this.beard.scale.y = 1
          this.body.position.z = 100

          this.body.material.color = new THREE.Color(this.formalSmokingMat)
          this.legsM.material.color = new THREE.Color(this.formalLegsMMat)
          this.zipper.material.color = new THREE.Color(this.formalZipperMat)
          this.shoes.material.color = new THREE.Color(this.formalShoesMat)

          this.zipper.scale.x = 1
          this.hatTop.scale.x = this.hatBottom.scale.x = 1
          this.hatTop.scale.y = this.hatBottom.scale.y = 1
          this.hatTop.scale.z = this.hatBottom.scale.z = 1
          this.lip.scale.x = 1

          this.retinaLeft.rotation.z = 0
          this.retinaRight.rotation.z = 0
          this.handLeft.rotation.y = 0
          this.handRight.rotation.y = 0
        }

        this.body.rotation.y += (this.bodyRY - this.body.rotation.y) / speed
        this.body.rotation.x += (this.bodyRX - this.body.rotation.x) / speed
        this.head.scale.x = this.head.scale.y = this.head.scale.z = 1
        this.head.rotation.y += (this.headRY - this.head.rotation.y) / speed
        this.head.rotation.x += (this.headRX - this.head.rotation.x) / speed
      }
    }

    function calc(v, vmin, vmax, tmin, tmax) {
      const nv = Math.max(Math.min(v, vmax), vmin)
      const dv = vmax - vmin
      const pc = (nv - vmin) / dv
      const dt = tmax - tmin
      const tv = tmin + (pc * dt)
      return tv
    }

    function loop() {
      if (walter && scene && camera && renderer) {
        renderer.render(scene, camera)
        walter.update()
      }
      animationRef.current = requestAnimationFrame(loop)
    }

    // Initialize the scene
    init()
    addLights()
    createWalter()
    loop()

    // Store scene reference for cleanup
    sceneRef.current = { camera, scene, renderer, walter }

    // Cleanup function
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }

      // Remove event listeners
      document.removeEventListener('mousemove', mousemove)
      document.removeEventListener('mouseup', mouseup)
      document.removeEventListener('mousedown', mousedown)
      document.removeEventListener('touchend', touchend)
      document.removeEventListener('touchmove', touchmove)

      // Cleanup Three.js objects
      if (sceneRef.current) {
        const { scene, renderer } = sceneRef.current
        if (scene) {
          while (scene.children.length > 0) {
            scene.remove(scene.children[0])
          }
        }
        if (renderer && mountRef.current?.contains(renderer.domElement)) {
          mountRef.current.removeChild(renderer.domElement)
          renderer.dispose()
        }
      }
    }
  }, [])

  return (
    <div className="flex justify-center">
      <div 
        ref={mountRef} 
        className="w-80 h-80"
        style={{ cursor: 'crosshair' }}
      />
    </div>
  )
}

export default WalterWhite