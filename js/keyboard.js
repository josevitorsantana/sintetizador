let audioContext = new (window.AudioContext || window.webkitAudioContext)();
let masterGainNode = null;
let oscList = null
let volume = document.querySelector("#volume")
let oitava = document.querySelector("#freq")
let freq0 = parseInt(oitava.value)
let freq1 = freq0 + 1
let wavePicker = document.querySelector("select[name='waveform']");
const notas = createNoteTable()

setup()


function setup(){
    masterGainNode = audioContext.createGain();
    masterGainNode.connect(audioContext.destination);
    masterGainNode.gain.value = volume.value;

    volume.addEventListener("change",changeVolume)
    oitava.addEventListener("change",changeFrequency)

    createKeyboard()
}

function createKeyboard(){
    for(let cont = 0; cont < Object.keys(notas).length; cont++){
        createKey(notas[cont].texto,notas[cont].freq, 0)
    }
    for(let cont = 0; cont < Object.keys(notas).length; cont++){
        createKey(notas[cont].texto,notas[cont].freq, 1)
    }
}

function playTone(freq) {
    let osc = audioContext.createOscillator();
    osc.connect(masterGainNode);
   
    let type = wavePicker.options[wavePicker.selectedIndex].value;
    osc.type = type;
  
    osc.frequency.value = freq;
    osc.start();

    return osc;
}

function createKey(nota, freq, part){
    let keyboard = document.querySelector(".keyboard")
    let tecla = document.createElement("input")
    tecla.setAttribute("type","button")
    keyboard.appendChild(tecla)

    //tecla.value = nota

    if(nota.length === 1) 
        tecla.classList.add("tecla")
    else
        tecla.classList.add("newtecla")

    //eventos de mouse pressionado

    if(!part){
        tecla.addEventListener("mousedown",function(event){
            oscList = playTone(freq[freq0])
        })
    }
    else{
        tecla.addEventListener("mousedown",function(event){
            oscList = playTone(freq[freq1])
        })
    }
    tecla.addEventListener("mouseup",noteReleased)
    tecla.addEventListener("mouseleave", noteReleased)

    // eventos de toque mobile
    tecla.addEventListener("touchstart",function(event){
        oscList = playTone(freq[(oitava.value)])
    })
    tecla.addEventListener("touchend",noteReleased)
}

function noteReleased(event){
    oscList.stop()
}

function changeVolume(){
    masterGainNode.gain.value = volume.value
}

function changeFrequency(){
    freq0 = parseInt(oitava.value)
    freq1 = freq0 + 1
}