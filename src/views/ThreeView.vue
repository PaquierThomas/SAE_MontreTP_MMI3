<template>
  <div>
    <canvas ref="canvas" />
    <h2>Ajouter une montre</h2>
    <form @submit.prevent="addWatch">
      <label for="userId">ID Utilisateur:</label>
      <h2>{{ token }}</h2>

      <label for="watchName">Nom de la montre:</label>
      <input v-model="newWatch.watchName" type="text" id="watchName" name="watchName" /><br /><br />

      <label for="caseId">Boîtier:</label>
      <select v-model="newWatch.caseId" id="caseId" name="caseId">
        <option value="" disabled selected hidden>Choisissez un boîtier</option>
        <option value="1" @click="toggleBoitierRond">Rond</option>
        <option value="2" @click="toggleBoitierRond">Carré</option></select
      ><br /><br />

      <label for="dialId">Cadran:</label>
      <select
        v-model="newWatch.dialId"
        id="dialId"
        name="dialId"
        @change="changeTextureBoitierRond"
      >
        <option value="1" @click="changeTextureBoitierRond('background_black01.png')">
          Classic Black
        </option>
        <option value="2" @click="changeTextureBoitierRond('background_black02.png')">
          Hourless Black
        </option>
        <option value="3" @click="changeTextureBoitierRond('background_fluo01.png')">Fluo</option>
        <option value="4" @click="changeTextureBoitierRond('background_mickey.png')">Mickey</option>
        <option value="5" @click="changeTextureBoitierRond('background_white01.png')">Neon</option>
        <option value="6" @click="changeTextureBoitierRond('background_white02.png')">Clock</option>
        <option value="7" @click="changeTextureBoitierRond('background_white03.png')">
          Classic
        </option>
        <option value="8" @click="changeTextureBoitierRond('background_white05.png')">
          Timeless
        </option></select
      ><br /><br />

      <label for="stonesId">Pierres précieuses:</label>
      <select v-model="newWatch.stonesId" id="stonesId" name="stonesId">
        <option value="1" @click="changePierreColor('rubis')">Rubis</option>
        <option value="2" @click="changePierreColor('diamant')">Diamant</option>
        <option value="3" @click="changePierreColor('émeraude')">Emeraude</option>
        <option value="4" @click="changePierreColor('topaze')">Topaze</option>
        <option value="5" @click="changePierreColor('saphir')">Saphir</option></select
      ><br /><br />

      <label for="braceletId">Bracelet:</label>
      <select v-model="newWatch.braceletId" id="braceletId" name="braceletId">
        <option value="1" @click="changeTexture('texture-tissus-marron.jpg')">Tissu marron</option>
        <option value="2" @click="changeTexture('texture-tissus-or.jpg')">Tissu Or</option>
        <option value="3" @click="changeTexture('texture-cuir-blanc.jpg')">Cuir</option></select
      ><br /><br />

      <label for="price">Prix:</label>
      <input v-model="newWatch.price" type="text" id="price" name="price" /><br /><br />

      <input type="submit" value="Ajouter la montre" />
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: localStorage.getItem('token'), // Récupérer le token une seule fois
      newWatch: {
        userId: '',
        watchName: '',
        caseId: '',
        dialId: '',
        stonesId: '',
        braceletId: '',
        price: ''
      }
    }
  },
  methods: {
    async addWatch() {
      // Afficher le token dans la console
      console.log(this.token)

      // Vérifier si l'utilisateur est connecté
      if (!this.token) {
        // Rediriger l'utilisateur vers la page de connexion
        this.$router.push('/connexion')
        return
      }

      // Assigner la valeur du token à userId
      this.newWatch.userId = this.token

      try {
        const response = await fetch('http://localhost:4000/add-watch', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.newWatch)
        })

        const data = await response.json()
        console.log(data)
        alert('Montre ajoutée avec succès!')
      } catch (error) {
        console.error('Error adding watch:', error)
        alert("Erreur lors de l'ajout de la montre.")
      }
    }
  }
}
</script>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader.js'
import * as THREE from 'three'
import { TextureLoader } from 'three/src/loaders/TextureLoader.js'

var clickInfo = []
var animations = []

const canvas = ref(null)
let clock = new THREE.Clock()
let animationId = null
const raycaster = new THREE.Raycaster()

function onClickEvent(event) {
  clickInfo.userHasClicked = true
  clickInfo.mouse = new THREE.Vector2()
  clickInfo.mouse.x = ((event.clientX - window.innerWidth) / window.innerHeight) * 2 - 1
  clickInfo.mouse.y = -((event.clientY - window.innerWidth) / window.innerHeight) * 2 + 1
}

var renderer, scene, camera, controls
let aiguilleHeures,
  aiguilleMinutes,
  aiguilleSecondes,
  boitierRond,
  boitierCarre,
  iPierre,
  iBracelet,
  iFermoir,
  iBouton

let currentTexture = '/texture-cuir-blanc.jpg'
let currentTextureBoitierRond = '/background_black01.png'

const initScene = () => {
  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(13, window.innerWidth / window.innerHeight, 1, 60000)
  camera.position.set(25 / 2.54, 320 / 2.54, 600 / 2.54)

  renderer = new THREE.WebGLRenderer({ canvas: canvas.value })
  renderer.setSize(window.innerWidth, window.innerHeight)
  controls = new OrbitControls(camera, renderer.domElement)
  renderer.shadowMap.enabled = true

  // controls.target.set(0, 0, 0)
  // controls.minDistance = 200 / 2.54
  // controls.maxDistance = 500 / 2.54
  // controls.enablePan = true
  // controls.enableDamping = true
  // controls.panSpeed = 1
  // controls.screenSpacePanning = false
  controls.update()

  //   // Créer une lumière ambiante
  var ambientLight = new THREE.AmbientLight(0x202020)
  scene.add(ambientLight)
  // In your point light setup:
  var pointLight = new THREE.PointLight(0xffffff, 1)
  pointLight.position.set(-300, 600, 1500)
  pointLight.castShadow = true
  scene.add(pointLight)

  var loader = new ColladaLoader()
  loader.load('/models/montre.dae', onLoaded, onProgress, onError)
}

const updateClockHands = () => {
  const now = new Date()
  const hours = now.getHours() % 12
  const minutes = now.getMinutes()
  const seconds = now.getSeconds()

  const hoursRotation = (hours + minutes / 60) * (Math.PI / 6)
  const minutesRotation = (minutes + seconds / 60) * (Math.PI / 30)
  const secondsRotation = seconds * (Math.PI / 30)

  if (aiguilleHeures) aiguilleHeures.rotation.z = -hoursRotation
  if (aiguilleMinutes) aiguilleMinutes.rotation.z = -minutesRotation
  if (aiguilleSecondes) aiguilleSecondes.rotation.z = -secondsRotation
}

const animate = () => {
  let dt = clock.getDelta()
  updateClockHands()
  animationId = requestAnimationFrame(animate)

  // if (clickInfo.userHasClicked) {
  //   document.getElementById('positions').value =
  //     '(' +
  //     parseInt(0.5 * (clickInfo.mouse.x + 1) * SCREEN_WIDTH + SCREEN_LEFT) +
  //     ';' +
  //     parseInt(-0.5 * (clickInfo.mouse.y - 1) * SCREEN_HEIGHT + SCREEN_TOP) +
  //     ')'
  //   clickInfo.userHasClicked = false // pret pour le clique suivant
  //   raycaster.setFromCamera(clickInfo.mouse, camera)
  //   let intersections = raycaster.intersectObjects(scene.children, true)
  //   let obj = null
  //   if (intersections.length > 0) {
  //     obj = intersections[0].object // l'objet de la premiere intersection
  //     // si l'objet à un nom vide alors on sélectionne son pere
  //     while (obj != null && obj.name == '') {
  //       // cherche le nom du parent
  //       obj = obj.parent
  //     }
  //     document.getElementById('obj_name').value =
  //       obj.name +
  //       ' uv= (' +
  //       intersections[0].uv.x.toFixed(2) +
  //       ',' +
  //       intersections[0].uv.y.toFixed(2) +
  //       ')'
  //     if (obj) {
  //       // Lance la fonction onclick sur l'objet cliqué
  //       animations.forEach((object) => {
  //         if (object.name == obj.name) {
  //           object.onClick(intersections[0])
  //         }
  //       })
  //     }
  //   }
  // }

  animations.forEach((object) => {
    // mettre à jour l'animation sur tous les objects cliquables
    object.updateAnimation(dt)
  })

  controls.update()
  renderer.render(scene, camera)
}

let showBoitier = true // Variable pour contrôler la visibilité des boitier

const toggleBoitierRond = () => {
  showBoitier = !showBoitier // Inverser la visibilité du boitier
  if (showBoitier) {
    // Si c'est le boîtier rond qui doit être affiché
    boitierRond.visible = true
    boitierCarre.visible = false

    // Mettre à jour la texture pour le boîtier rond
    changeTextureBoitierRond(currentTextureBoitierRond)
  } else {
    // Si c'est le boîtier carré qui doit être affiché
    boitierRond.visible = false
    boitierCarre.visible = true
  }
}

const changePierreColor = (type) => {
  let color

  switch (type) {
    case 'rubis':
      color = 0xff0000 // Rouge
      break
    case 'diamant':
      color = 0xddeeed // Diamant
      break
    case 'émeraude':
      color = 0x00ff00 // Vert
      break
    case 'saphir':
      color = 0x0000ff // Saphir
      break
    case 'topaze':
      color = 0xfaea73 // Topaze
      break
    default:
      color = 0xffffff // Blanc par défaut
  }

  if (iPierre) iPierre.material.color.set(color)
}

const handleColorChange = (event) => {
  const newColor = event.target.value
  changeFermoirColor(newColor)
}
const changeFermoirColor = (color) => {
  // Convertir la couleur hexadécimale en décimal
  const decimalColor = parseInt(color.slice(1), 16)

  // Mettre à jour la couleur du matériau iFermoir
  if (iFermoir) iFermoir.material.color.set(decimalColor)
}

const changeTexture = (texture) => {
  currentTexture = texture
  // Charger la nouvelle texture et l'appliquer au matériau du bracelet
  const textureLoader = new TextureLoader()
  const newTexture = textureLoader.load(`images/${texture}`)
  iBracelet.material.map = newTexture
  iBracelet.material.needsUpdate = true
}
const changeTextureBoitierRond = (textureBoitierRond) => {
  currentTextureBoitierRond = textureBoitierRond

  // Charger la nouvelle texture et l'appliquer au matériau du boîtier rond
  const textureLoader = new TextureLoader()
  const newTexture = textureLoader.load(`images/${textureBoitierRond}`)
  boitierRond.material[1].map = newTexture
  boitierRond.material[1].needsUpdate = true
  boitierCarre.material[1].map = newTexture
  boitierCarre.material[1].needsUpdate = true
  console.log(boitierCarre)
}

function onLoaded(collada) {
  let objects = collada.scene
  scene.add(objects)
  objects.scale.set(0.8, 0.8, 0.8)

  aiguilleHeures = objects.getObjectByName('aiguille_heures')
  aiguilleHeures.material = new THREE.MeshBasicMaterial({
    color: 0x888888
  })
  aiguilleHeures.material.color.set(0x888888)
  aiguilleMinutes = objects.getObjectByName('aiguille_minutes')
  aiguilleMinutes.material = new THREE.MeshBasicMaterial({
    color: 0x666666
  })
  aiguilleSecondes = objects.getObjectByName('aiguille_secondes')
  aiguilleSecondes.material = new THREE.MeshBasicMaterial({
    color: 0xd9544d
  })

  boitierRond = objects.getObjectByName('boitier_rond')
  boitierRond.material[0] = new THREE.MeshBasicMaterial({
    color: 0x777777,
    specular: 0x777777,
    shininess: 1
  })
  const textureLoaderBoitierRond = new TextureLoader()
  const textureBoitierRond = textureLoaderBoitierRond.load(`/images/${currentTextureBoitierRond}`)
  boitierRond.material[1] = new THREE.MeshBasicMaterial({
    map: textureBoitierRond
  })

  boitierCarre = objects.getObjectByName('boitier_carre')
  const textureBoitierCarre = textureLoaderBoitierRond.load(`/images/${currentTextureBoitierRond}`)
  boitierCarre.material[0] = new THREE.MeshBasicMaterial({ color: 0x777777 })
  boitierCarre.material[1] = new THREE.MeshBasicMaterial({
    map: textureBoitierCarre
  })
  boitierCarre.visible = false

  iBouton = objects.getObjectByName('bouton')
  iBouton.material = new THREE.MeshBasicMaterial({
    color: 0x202020 // Couleur par défaut du bouton côté
  })

  iPierre = objects.getObjectByName('pierre')
  iPierre.material = new THREE.MeshBasicMaterial({
    color: 0x0000ff
  })

  let iPierre2 = iPierre.clone()
  iPierre2.position.y -= 38

  let iPierre3 = iPierre.clone()
  iPierre3.position.x -= 18.5
  iPierre3.position.y -= 18.75

  let iPierre4 = iPierre.clone()
  iPierre4.position.x += 18.5
  iPierre4.position.y -= 18.75

  iBracelet = objects.getObjectByName('bracelet')
  const textureLoader = new TextureLoader()
  const texture = textureLoader.load(`/images/${currentTexture}`)
  iBracelet.material = new THREE.MeshBasicMaterial({
    map: texture,
    color: 0x777777
  })
  console.log(iBracelet)

  iFermoir = objects.getObjectByName('fermoir')
  iFermoir.material = new THREE.MeshBasicMaterial({
    color: 0x777777 // couleur par défaut du fermoir
  })

  scene.add(
    aiguilleHeures,
    aiguilleMinutes,
    aiguilleSecondes,
    boitierCarre,
    boitierRond,
    iBouton,
    iPierre,
    iPierre2,
    iPierre3,
    iPierre4,
    iBracelet,
    iFermoir
  )

  controls.target.set(0, 0, 0)
  camera.position.set(200, 350, 350)
  camera.lookAt(new THREE.Vector3(0, 0, 5))
  camera.up.set(0, 0, 1)
  controls.update()
  scene.add(camera)
}

var onProgress = function (data) {
  if (data.lengthComputable) {
    var percentComplete = (data.loaded / data.total) * 100
    console.log(Math.round(percentComplete, 2) + '% downloaded')
  }
}

var onError = function (data) {
  console.error(data)
}

onMounted(() => {
  initScene()
  animate()
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId)
})
</script>

<style scoped>
.canvas {
  width: 100vw;
  height: 100%;
}
</style>

<script setup></script>
