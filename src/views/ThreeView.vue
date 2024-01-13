<template>
  <div class="canvas-container">
    <canvas ref="canvas" />
    <div class="header">
      <Header />
    </div>
    <div class="form">
      <h2>Modifier votre montre</h2>
      <form @submit.prevent="updateMontreConfig">
        <div>
          <label for="userId">ID de la montre:</label>
          <p>{{ configId }}</p>
        </div>
        <div>
          <label for="watchName">Nom de la montre:</label>
          <input
            v-model="updatedConfig.watchName"
            type="text"
            id="watchName"
            name="watchName"
            placeholder="Nom de la montre"
          />
        </div>
        <div>
          <label for="caseId">Boîtier:</label>
          <select v-model="updatedConfig.caseId" id="caseId" name="caseId">
            <option value="" disabled selected hidden>Choisissez un boîtier</option>
            <option
              v-for="option in caseOptions"
              :key="option.id"
              :value="option.id"
              @click="toggleBoitierRond"
            >
              {{ option.label }}
            </option>
          </select>
        </div>
        <div>
          <label for="dialId">Cadran:</label>
          <select
            v-model="updatedConfig.dialId"
            id="dialId"
            name="dialId"
            @change="
              changeTextureBoitierRond(
                dialOptions.find((option) => option.id == updatedConfig.dialId).texture
              )
            "
          >
            <option value="" disabled selected hidden>Choisissez un Cadran</option>
            <option v-for="option in dialOptions" :key="option.id" :value="option.id">
              {{ option.label }}
            </option>
          </select>
        </div>
        <div>
          <label for="stonesId">Pierres précieuses:</label>
          <select v-model="updatedConfig.stonesId" id="stonesId" name="stonesId">
            <option value="" disabled selected hidden>Choisissez une pierre précieuse</option>
            <option
              v-for="option in stoneOptions"
              :key="option.id"
              :value="option.id"
              @click="changePierreColor(option.color)"
            >
              {{ option.label }}
            </option>
          </select>
        </div>

        <div>
          <label for="braceletId">Bracelet:</label>
          <select v-model="updatedConfig.braceletId" id="braceletId" name="braceletId">
            <option value="" disabled selected hidden>Choisissez un bracelet</option>
            <option
              v-for="option in braceletOptions"
              :key="option.id"
              :value="option.id"
              @click="changeTexture(option.texture)"
            >
              {{ option.label }}
            </option>
          </select>
        </div>

        <button type="submit" class="submit-btn">Enregistrer</button>
        <button @click="deleteMontre" class="submit-btn">Supprimer cette montre</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      token: localStorage.getItem('token'), // Récupérer le token une seule fois
      montreDetails: null,
      updatedConfig: {
        watchName: '',
        caseId: '',
        dialId: '',
        stonesId: '',
        braceletId: ''
      },
      dialOptions: [
        { id: 1, label: 'Classic Black', texture: 'background_black01.png' },
        { id: 2, label: 'Hourless Black', texture: 'background_black02.png' },
        { id: 3, label: 'Fluo', texture: 'background_fluo01.png' },
        { id: 4, label: 'Mickey', texture: 'background_mickey.png' },
        { id: 5, label: 'Neon', texture: 'background_white01.png' },
        { id: 6, label: 'Clock', texture: 'background_white02.png' },
        { id: 7, label: 'Classic', texture: 'background_white03.png' },
        { id: 8, label: 'Timeless', texture: 'background_white05.png' }
      ],
      stoneOptions: [
        { id: 1, label: 'Rubis', color: 'rubis' },
        { id: 2, label: 'Diamant', color: 'diamant' },
        { id: 3, label: 'Emeraude', color: 'émeraude' },
        { id: 4, label: 'Topaze', color: 'topaze' },
        { id: 5, label: 'Saphir', color: 'saphir' }
      ],
      braceletOptions: [
        { id: 1, label: 'Tissu marron', texture: 'texture-tissus-marron.jpg' },
        { id: 2, label: 'Tissu Or', texture: 'texture-tissus-or.jpg' },
        { id: 3, label: 'Cuir', texture: 'texture-cuir-blanc.jpg' }
      ],
      caseOptions: [
        { id: 1, label: 'Rond', handler: 'toggleBoitierRond' },
        { id: 2, label: 'Carré', handler: 'toggleBoitierRond' }
      ]
    }
  },
  created() {
    const configId = this.$route.params.configId
    this.getMontreDetails(configId)
  },
  methods: {
    async getMontreDetails(configId) {
      try {
        const response = await axios.get(`http://localhost:4000/montres/${configId}`)
        this.montreDetails = response.data
      } catch (error) {
        console.error('Erreur lors de la récupération des détails de la montre:', error)
      }
    },
    async updateMontreConfig() {
      try {
        const configId = this.$route.params.configId
        const response = await axios.put(
          `http://localhost:4000/montres/${configId}`,
          this.updatedConfig
        )
        console.log(response.data) // Affiche la réponse du serveur après la mise à jour
        // Tu peux rediriger l'utilisateur ou faire d'autres actions après la mise à jour réussie
      } catch (error) {
        console.error('Erreur lors de la mise à jour de la configuration de la montre:', error)
      }
    },
    async deleteMontre() {
      try {
        const configId = this.$route.params.configId
        const response = await axios.delete(`http://localhost:4000/montres/${configId}`)
        console.log(response.data) // Réponse du serveur après la suppression

        // Rediriger l'utilisateur ou effectuer d'autres actions après la suppression réussie
        this.$router.push('/montres')
      } catch (error) {
        console.error('Erreur lors de la suppression de la montre:', error)
        // Gérer l'erreur, afficher un message à l'utilisateur, etc.
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
import Header from '@/components/Header.vue'

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

  // Ajustez la position de l'objet de la montre
  const xOffset = 25 // Décalage X
  const zOffset = -35 // Décalage Z
  objects.position.x = xOffset
  objects.position.z = zOffset

  // objects.rotation.set(0, Math.PI, 0)

  controls.target.set(xOffset, zOffset, 10)
  camera.position.set(-120, -350, 300)
  camera.lookAt(new THREE.Vector3(xOffset, 0, 5))
  camera.up.set(0, 0, 1)
  camera.rotation.set(10, Math.PI, 0)
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

<!-- ⣿⣷⡶⠚⠉⢀⣤⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠋⠠⣴⣿⣿⣿⣿⣶⣤⣤⣤
⠿⠥⢶⡏⣸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠋⢀⣴⣷⣌⢿⣿⣿⣿⣿⣿⣿⣿
⣍⡛⢷⣠⣿⣿⣿⣿⣿⣟⠻⣯⠽⣿⣿⠟⠁⣠⠿⠿⣿⣿⣎⠻⣿⣿⣿⡿⠟⣿
⣿⣿⣦⠙⣿⣿⣿⣿⣿⣿⣷⣏⡧⠙⠁⣀⢾⣧    ⠈⣿⡟  ⠙⣫⣵⣶⠇⣋
⣿⣿⣿⢀⣿⣿⣿⣿⣿⣿⣿⠟⠃⢀⣀⢻⣎⢻⣷⣤⣴⠟  ⣠⣾⣿⢟⣵⡆⢿
⣿⣯⣄⢘⢻⣿⣿⣿⣿⡟⠁⢀⣤⡙⢿⣴⣿⣷⡉⠉⢀  ⣴⣿⡿⣡⣿⣿⡿⢆
⠿⣿⣧⣤⡘⢿⣿⣿⠏  ⡔⠉⠉⢻⣦⠻⣿⣿⣶⣾⡟⣼⣿⣿⣱⣿⡿⢫⣾⣿
⣷⣮⣝⣛⣃⡉⣿⡏  ⣾⣧⡀    ⣿⡇⢘⣿⠋    ⠻⣿⣿⣿⢟⣵⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣌⢧⣴⣘⢿⣿⣶⣾⡿⠁⢠⠿⠁⠜    ⣿⣿⣿⣿⡿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣦⡙⣿⣷⣉⡛⠋    ⣰⣾⣦⣤⣤⣤⣿⢿⠟⢋⣴⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣌⢿⣿⣿⣿⣿⢰⡿⣻⣿⣿⣿⣿⣿⢃⣰⣫⣾⣿⣿⣿
⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡆⠿⠿⠿⠛⢰⣾⡿⢟⣭⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿ -->

<style lang="scss" scoped>
.canvas-container {
  position: relative;
}

.canvas {
  width: 100%;
  height: 100%;
  z-index: -1;
}
.header {
  position: fixed; /* ou position: absolute; en fonction de vos besoins */
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}
p {
  color: white;
  font-weight: bold;
  text-align: center;
}
h2 {
  color: white;
  text-align: center;
  margin-bottom: 30px;
  margin-top: 10px;
  font-size: 20px;
  font-weight: bold;
  text-transform: uppercase;
}
.form {
  position: absolute;
  top: 50%;
  right: 5%;
  transform: translate(-5%, -50%);
  border: 3px solid white;
  font-family: $primary-font-family;
  /* stroke de couleur blanche de 2 px et solide (pas de pointillés) */

  z-index: 10;
  padding: 20px;

  div {
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 20px;
    margin-bottom: 20px;
  }

  label {
    color: white;
    text-transform: uppercase;
    font-weight: bold;
    padding-right: 10px;
    width: 200px; // Ajout d'une largeur fixe pour les étiquettes
    box-sizing: border-box;
  }

  input[type='text'] {
    background-color: white;
    color: black;
    text-transform: uppercase;
    font-weight: bold;
    text-align: center;
    padding: 5px 20px;
    width: 260px;
    border: none;
    display: block;
  }

  select {
    background-color: white;
    color: black;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 13px;
    padding: 5px 20px;
    width: 300px;
    text-align: center;
    border: none;
    cursor: pointer;
    display: block;
  }

  input[type='submit'] {
    background-color: white;
    color: black;
    text-transform: uppercase;
    font-weight: bold;
    padding: 10px 200px;
    border: none;
    cursor: pointer;
    margin: 0 auto;
    display: block;
  }
}
</style>
