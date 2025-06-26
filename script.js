let zeichenModusAktiv = false;

const infoDisplay = document.getElementById('info-display');

// address of the WebSocket server
const webRoomsWebSocketServerAddr = 'https://nosch.uber.space/web-rooms/';

// variables
let clientId = null; // client ID sent by web-rooms server when calling 'enter-room'
let clientCount = 0; // number of clients connected to the same room
const playerCountDisplay = document.getElementById('playerCountDisplay');

window.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#model-root');
  let inPanoramaMode = false;
  let currentPanorama = null;
  let currentMode = 'sun';


  const scene = document.querySelector('a-scene');

  const frontWindows = [];
  const backWindows = [];
  const exitBtn = document.getElementById('exitPanoramaBtn');


  // Gebäude
  const mainBlock = document.createElement('a-box');
  mainBlock.setAttribute('position', '0 1 0');
  mainBlock.setAttribute('width', '6');
  mainBlock.setAttribute('height', '2');
  mainBlock.setAttribute('depth', '4');
  mainBlock.setAttribute('color', '#a17c5b');
  mainBlock.setAttribute('material', 'roughness: 1; metalness: 0.1');
  root.appendChild(mainBlock);

  const roof = document.createElement('a-box');
  roof.setAttribute('position', '4.5 1.5 1.25');
  roof.setAttribute('width', '3');
  roof.setAttribute('height', '1');
  roof.setAttribute('depth', '1.5');
  roof.setAttribute('color', '#a17c5b');
  root.appendChild(roof);

  [-1, 0, 1].forEach((x) => {
    const col = document.createElement('a-cylinder');
    col.setAttribute('position', `${4.5 + x} 0.5 1.5`);
    col.setAttribute('radius', '0.05');
    col.setAttribute('height', '1');
    col.setAttribute('color', '#efefef');
    root.appendChild(col);
  });

  const plattform = document.createElement('a-box');
  plattform.setAttribute('position', '4.5 0.05 -0.5');
  plattform.setAttribute('width', '3');
  plattform.setAttribute('height', '0.1');
  plattform.setAttribute('depth', '5');
  plattform.setAttribute('color', '#ccc');
  root.appendChild(plattform);

  // Fenster
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 6; col++) {
      const win = document.createElement('a-box');
      win.setAttribute('width', '0.6');
      win.setAttribute('height', '0.6');
      win.setAttribute('depth', '0.01');
      win.setAttribute('color', '#222');
      win.setAttribute('material', 'opacity: 0.5; metalness: 0.3; roughness: 0.1; emissive: #000; emissiveIntensity: 0;');
      const x = -2.4 + col * 0.95;
      const y = 1.3 + row * -0.9;

      const front = win.cloneNode();
      front.setAttribute('position', `${x} ${y} -2`);
      root.appendChild(front);
      frontWindows.push(front);

      const back = win.cloneNode();
      back.setAttribute('position', `${x} ${y} 2`);
      root.appendChild(back);
      backWindows.push(back);
    }
  }

  // Glas
  const entry = document.createElement('a-box');
  entry.setAttribute('position', '3 1 0.1');
  entry.setAttribute('width', '0.9');
  entry.setAttribute('height', '2');
  entry.setAttribute('depth', '0.01');
  entry.setAttribute('color', '#222');
  entry.setAttribute('rotation', '0 90 0');
  entry.setAttribute('material', 'opacity: 0.5; metalness: 0.3; roughness: 0.1;');
  root.appendChild(entry);

  const studioG = document.createElement('a-box');
  studioG.setAttribute('position', '3 0.5 1.25');
  studioG.setAttribute('width', '1.4');
  studioG.setAttribute('height', '1');
  studioG.setAttribute('depth', '0.01');
  studioG.setAttribute('color', '#222');
  studioG.setAttribute('rotation', '0 90 0');
  studioG.setAttribute('material', 'opacity: 0.5; metalness: 0.3; roughness: 0.1;');
  root.appendChild(studioG);

  // Regen-Partikel
  const rainGroup = document.createElement('a-entity');
  rainGroup.setAttribute('id', 'rainGroup');
  rainGroup.setAttribute('visible', 'false');

  for (let i = 0; i < 2000; i++) {
    const drop = document.createElement('a-box');
    const x = Math.random() * 30 - 10;
    const y = Math.random() * 30;
    const z = Math.random() * 20 - 5;

    drop.setAttribute('position', `${x} ${y} ${z}`);
    drop.setAttribute('color', '#86c');
    drop.setAttribute('width', '0.01');
    drop.setAttribute('height', '0.04');
    drop.setAttribute('depth', '0.01');
    drop.setAttribute('animation', `property: position; to: ${x} 0 ${z}; dur: ${1000 + Math.random() * 2000}; loop: true; easing: linear`);
    rainGroup.appendChild(drop);
  }
  scene.appendChild(rainGroup);

  // Wolkenhimmel bei Regen
  const cloudGroup = document.createElement('a-entity');
  cloudGroup.setAttribute('id', 'cloudGroup');
  cloudGroup.setAttribute('visible', 'false');

  for (let i = 0; i < 80; i++) {
    const puff = document.createElement('a-sphere');
    const x = Math.random() * 18 - 7;  
    const y = 10.3 + Math.random();
    const z = Math.random() * 10 - 5;
    const scale = 1 + Math.random() * 1.5;

    puff.setAttribute('position', `${x} ${y} ${z}`);
    puff.setAttribute('radius', `${scale}`);
    puff.setAttribute('color', '#aaa');
    puff.setAttribute('material', 'transparent: true; opacity: 0.4; side: double');

    cloudGroup.appendChild(puff);
  }
  scene.appendChild(cloudGroup);

  // Audio
  const sunAudio = new Audio('sun.mp3');
  sunAudio.loop = true;
  const nightAudio = new Audio('night.mp3');
  nightAudio.loop = true;
  const rainAudio = new Audio('rain.mp3');
  rainAudio.loop = true;

  const sky = document.getElementById('sky');
  const ground = document.getElementById('ground');

  function stopAll() {
    [sunAudio, nightAudio, rainAudio].forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
  }

  function resetWindows() {
    [...frontWindows, ...backWindows].forEach(win => {
      win.setAttribute('color', '#222');
      win.setAttribute('material', 'opacity: 0.5; metalness: 0.3; roughness: 0.1; emissive: #000; emissiveIntensity: 0;');
    });
  }

  function randomizeWindowLights(mode) {
    resetWindows();
    if (mode === 'night' || mode === 'rain') {
      const allWindows = [...frontWindows, ...backWindows];
      const selected = [];
      const pool = [...allWindows];
      while (selected.length < 5 && pool.length > 0) {
        const index = Math.floor(Math.random() * pool.length);
        selected.push(pool.splice(index, 1)[0]);
      }
      selected.forEach(win => {
        win.setAttribute('color', '#ffd700');
        win.setAttribute('material', 'emissive: #ffea00; emissiveIntensity: 1;');
      });
    }
  }

  // Modi
  function showSun() {
    currentMode = 'sun';
    stopAll(); sunAudio.play();
    sky.setAttribute('color', '#dfefff');
    ground.setAttribute('color', '#a7d899');
    rainGroup.setAttribute('visible', 'false');
    cloudGroup.setAttribute('visible', 'false');
    resetWindows();
  }

  function showNight() {
    currentMode = 'night';
    stopAll(); nightAudio.play();
    sky.setAttribute('color', '#0a0a2a');
    ground.setAttribute('color', '#223');
    rainGroup.setAttribute('visible', 'false');
    cloudGroup.setAttribute('visible', 'false');
    randomizeWindowLights('night');
  }

function showRain() {
  currentMode = 'rain';
  stopAll();
  rainAudio.play();
  sky.setAttribute('color', '#7c8a97');
  ground.setAttribute('color', '#6c7a6f');

  // Panorama-Modus: Regen nur bei "360-right"
  if (inPanoramaMode) {
    if (currentPanorama?.includes('right')) {
      rainGroup.setAttribute('visible', 'true');
      cloudGroup.setAttribute('visible', 'true');
    } else {
      rainGroup.setAttribute('visible', 'false');
      cloudGroup.setAttribute('visible', 'false');
    }
  } else {
    // Normalmodus: Regen und Wolken immer zeigen
    rainGroup.setAttribute('visible', 'true');
    cloudGroup.setAttribute('visible', 'true');
  }

  randomizeWindowLights('rain');
}



  function resetAll() {
    stopAll();
    sky.setAttribute('color', '#dfefff');
    ground.setAttribute('color', '#a7d899');
    rainGroup.setAttribute('visible', 'false');
    cloudGroup.setAttribute('visible', 'false');
    resetWindows();
  }

  // Buttons
  document.getElementById('sunBtn')?.addEventListener('click', showSun);
  document.getElementById('nightBtn')?.addEventListener('click', showNight);
  document.getElementById('rainBtn')?.addEventListener('click', showRain);
  document.getElementById('resetBtn')?.addEventListener('click', resetAll);

  // Kamera & VR-Panorama Wechsel

  const camera = document.querySelector('#camera');

  // 360° Panoramen
  const panoramas = {
    left: '360-left.jpg',
    center: '360-center.jpg',
    right: '360-right.jpg'
  };

  // Kugeln als Punkte zum Wechsel
  const positions = {
    left: { x: -3, y: 3, z: 0 },
    center: { x: 0, y: 3, z: 0 },
    right: { x: 4, y: 3, z: 0 }
  };

  // Kugeln erstellen
  Object.entries(positions).forEach(([key, pos]) => {
    const sphere = document.createElement('a-sphere');
    sphere.setAttribute('position', `${pos.x} ${pos.y} ${pos.z}`);
    sphere.setAttribute('radius', '0.2');
    sphere.setAttribute('color', '#ff0055');
    sphere.setAttribute('material', 'shader: flat; opacity: 0.9');
    sphere.setAttribute('class', 'panorama-point');
    root.appendChild(sphere);

    // Klick Event für Wechsel in Panorama-VR-Modus
    sphere.addEventListener('click', () => {
      enterPanorama(panoramas[key]);
      showPlaneByKey(key);
    });
  });

  // Standard Himmel speichern
  const defaultSkySrc = sky.getAttribute('src');

function enterPanorama(imgSrc) {
  camera.removeAttribute('wasd-controls');
  inPanoramaMode = true;
  currentPanorama = imgSrc;

  root.setAttribute('visible', 'false');

  const isRainActive = !rainAudio.paused;
  const isRightPanorama = imgSrc.includes('right');

  rainGroup.setAttribute('visible', isRainActive && isRightPanorama);
  cloudGroup.setAttribute('visible', isRainActive && isRightPanorama);

  ground.setAttribute('visible', 'false');
  camera.setAttribute('position', '0 1.6 0');
  camera.setAttribute('rotation', '0 0 0');
  sky.setAttribute('src', imgSrc);
  exitBtn.style.display = 'inline-block';

  

  // Audio dämpfen für center & left
  const inside = imgSrc.includes('center') || imgSrc.includes('left');
  const volume = inside ? 0.2 : 1.0; // gedämpft oder normal
  sunAudio.volume = volume;
  nightAudio.volume = volume;
  rainAudio.volume = volume;
}



// Funktion um Panorama-Modus zu verlassen
function exitPanorama() {
  if (!inPanoramaMode) return;
  camera.removeAttribute('wasd-controls');
  inPanoramaMode = false;
  currentPanorama = null;

  root.setAttribute('visible', 'true');
  ground.setAttribute('visible', 'true');
  sky.removeAttribute('src');

if (currentMode === 'sun') {
  sky.setAttribute('color', '#dfefff');
} else if (currentMode === 'night') {
  sky.setAttribute('color', '#0a0a2a');
} else if (currentMode === 'rain') {
  sky.setAttribute('color', '#7c8a97');
}
// Volumen wieder auf normal
sunAudio.volume = 1.0;
nightAudio.volume = 1.0;
rainAudio.volume = 1.0;

  const isRainActive = !rainAudio.paused;
rainGroup.setAttribute('visible', isRainActive);
cloudGroup.setAttribute('visible', isRainActive);


  camera.setAttribute('position', '0 1.6 10');
  camera.setAttribute('rotation', '0 0 0');
  camera.setAttribute('wasd-controls', '');
  exitBtn.style.display = 'none';
  zeichenModusAktiv = false;
  aktiveNummer = null;

  // Canvas verstecken + Events entfernen
  Object.values(canvasMap).forEach(c => {
    c.style.display = "none";
    c.onmousedown = null;
    c.onmouseup = null;
    c.onmousemove = null;
  });
// Alle Graffiti-Planes unsichtbar machen
Object.values(planeMap).forEach(p => p.setAttribute('visible', 'false'));
}


// Beispiel: Doppelklick auf Szene verlässt Panorama
scene.addEventListener('dblclick', () => {
  exitPanorama();
});

// ESC-Taste verlässt Panorama
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    exitPanorama();
  }
});

// Klicken auf den Boden verlässt Panorama
ground.addEventListener('click', () => {
  exitPanorama();
});

exitBtn.addEventListener('click', () => {
  exitPanorama();
});

// Graffiti-Wände erzeugen
const graffitiPlanes = [
  { id: "plane1", canvas: "#canvas1", position: "-6 4 -2.4", rotation:"0 65 0", width:"6", height:"6" },
  { id: "plane2", canvas: "#canvas2", position: "4.3 1.6 -7", rotation:"0 -25 0", width:"8", height:"10" },
  { id: "plane3", canvas: "#canvas3", position: "12 8.5 15", rotation:"0 -130 1", width:"12", height:"18" },
];

const planeMap = {}; 

graffitiPlanes.forEach(({ id, canvas, position, rotation, width, height }) => {
  const plane = document.createElement('a-plane');
  plane.setAttribute('id', id);
  plane.setAttribute('position', position);
  plane.setAttribute('rotation', rotation)
  plane.setAttribute('width', width);
  plane.setAttribute('height', height);
  plane.setAttribute('visible', 'false'); 
  plane.setAttribute('material', `shader: flat; src: ${canvas}`);
  scene.appendChild(plane);
  planeMap[id] = plane;
});

//Canvas Zeichnen
function showPlaneByKey(key) {
  const keyMap = {
    left: 1,
    center: 2,
    right: 3
  };

  const num = keyMap[key];
  if (!num) return;

  // Canvases verstecken
  Object.values(canvasMap).forEach(c => c.style.display = "none");

  // Planes verstecken
  Object.values(planeMap).forEach(p => p.setAttribute('visible', 'false'));

  // Nur zugewählte Plane anzeigen
  document.querySelector(`#plane${num}`).setAttribute('visible', 'true');

  aktiveNummer = num;
  zeichenModusAktiv = true;
}

// === ZEICHENLOGIK ===
  const canvasMap = {
    1: document.getElementById("canvas1"),
    2: document.getElementById("canvas2"),
    3: document.getElementById("canvas3"),
  };

  const contextMap = {};
  let aktiveNummer = null;
  let zeichnen = false;

  for (const [num, canvas] of Object.entries(canvasMap)) {
    const ctx = canvas.getContext("2d");

    // Hintergrund weiß setzen
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    contextMap[num] = ctx;
  }

  function getCanvasCoords(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }

  function toggleCanvas(num) {
    const canvas = canvasMap[num];

    if (aktiveNummer === num) {
      canvas.style.display = "none";
      aktiveNummer = null;
      return;
    }

    if (aktiveNummer) {
      canvasMap[aktiveNummer].style.display = "none";
    }

    aktiveNummer = num;
    canvas.style.display = "block";

    const ctx = contextMap[num];

    canvas.onmousedown = (e) => {
      zeichnen = true;
      const pos = getCanvasCoords(canvas, e);
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
      sendRequest('*broadcast-message*', ['draw-start', num, pos.x, pos.y]);
    };

    canvas.onmouseup = () => zeichnen = false;

    canvas.onmousemove = (e) => {
      if (!zeichnen) return;
      const pos = getCanvasCoords(canvas, e);
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 2, 0, 2 * Math.PI); // kleiner Kreis
      ctx.fill();
      updatePlaneTexture(num);
      sendRequest('*broadcast-message*', ['draw-line', num, pos.x, pos.y]);
    };
  }


  function updatePlaneTexture(num) {
    const plane = document.querySelector(`#plane${num}`);
    const mesh = plane.getObject3D('mesh');
    if (mesh && mesh.material.map) {
      mesh.material.map.needsUpdate = true;
    }
  }

// Canvas auswählen und überprüfen zum Zeichnen
document.addEventListener("keydown", (event) => {
  if (!zeichenModusAktiv) return;

  const key = event.key;
  if (!["1", "2", "3"].includes(key)) return;

  const plane = document.querySelector(`#plane${key}`);
  const isPlaneVisible = plane?.getAttribute("visible");

  // Nur Canvas zeigen/verstecken, wenn plane sichtbar
  if (isPlaneVisible) {
    toggleCanvas(Number(key));
  }
});

  // Alle 5 Minuten Canvas clearen
setInterval(() => {
  Object.entries(contextMap).forEach(([num, ctx]) => {
    ctx.clearRect(0, 0, canvasMap[num].width, canvasMap[num].height);

    // Hintergrund wieder weiß setzen
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvasMap[num].width, canvasMap[num].height);

    updatePlaneTexture(num);
  });
  console.log("Alle Canvases wurden automatisch geleert.");
}, 300000); 

/****************************************************************
 * websocket communication
 */
const socket = new WebSocket(webRoomsWebSocketServerAddr);

// helper function to send requests over websocket to web-room server
function sendRequest(...message) {
  const str = JSON.stringify(message);
  socket.send(str);
  console.log("Hi ich funktionier")
}


// listen to opening websocket connections
socket.addEventListener('open', (event) => {
  sendRequest('*enter-room*', 'i-bau-graffiti');
  sendRequest('*subscribe-client-count*');
  sendRequest('*subscribe-client-enter-exit*');
  sendRequest('*broadcast-message*', ['draw-line', num, x, y]);
  sendRequest('*broadcast-message*', ['draw-start', num, x, y]);

  // ping the server regularly with an empty message to prevent the socket from closing
  setInterval(() => socket.send(''), 30000);
});

socket.addEventListener("close", (event) => {
  clientId = null;
  document.body.classList.add('disconnected');
});

// listen to messages from server
socket.addEventListener('message', (event) => {
  const data = event.data;

  if (data.length > 0) {
    const incoming = JSON.parse(data);
    const selector = incoming[0];

    // dispatch incomming messages

switch (selector) {
  // responds to '*client-count*'
  case '*client-count*':
    clientCount = incoming[1];
    infoDisplay.innerHTML = `#${clientId}/${clientCount}`;
    
    // Spieleranzahl-Anzeige aktualisieren
    const playerCountDisplay = document.getElementById('playerCountDisplay');
    if (playerCountDisplay) {
      playerCountDisplay.textContent = `Spieler online: ${clientCount}`;
    }
    break;
      case 'draw-line': {
        const num = incoming[1];
        const x = incoming[2];
        const y = incoming[3];
        const ctx = contextMap[num];
        if (ctx) {
          ctx.arc(pos.x, pos.y, 2, 0, 2 * Math.PI); // kleiner Kreis
          ctx.fill();
        updatePlaneTexture(num);
        }
        break;
      }
      case 'draw-start': {
        const num = incoming[1];
        const x = incoming[2];
        const y = incoming[3];
        const ctx = contextMap[num];
        if (ctx) {
          ctx.beginPath();
          ctx.moveTo(x, y);        }
        break;
      }
      case '*client-enter*':
        const enterId = incoming[1];
        console.log(`client #${enterId} has entered the room`);
        break;

      case '*client-exit*':
        const exitId = incoming[1];
        console.log(`client #${exitId} has left the room`);
        break;

      // 'hello there' messages sent from other clients
      case 'hello-there':
        const otherId = incoming[1];
        console.log(`client #${otherId} says 'Hello there!'`);

        highlightText(titleDisplay); // highlight screen by others (function defined above)
        break;

      case '*error*': {
        const message = incoming[1];
        console.warn('server error:', ...message);
        break;
      }

      default:
        console.log(`unknown incoming messsage: [${incoming}]`);
        break;
    
    }
        console.log(data)
        '*get-client-count*'
  }
});
})
