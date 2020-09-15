let audioContext = new (window.AudioContext || window.webkitAudioContext)();
let masterGainNode = null;
let volume = document.querySelector("#volume")
let wavePicker = document.querySelector("select[name='waveform']");
const notas = createNoteTable()

setup()

function createNoteTable(){
    const notas = [
        {
            texto: "A",
            freq: 261.63
        },
        {
            texto: "B",
            freq: 293.66
        },
        {
            texto: "C",
            freq: 329.63
        },
        {
            texto: "D",
            freq: 349.23
        },
        {
            texto: "E",
            freq: 391.99
        },
        {
            texto: "F",
            freq: 440.00
        },
        {
            texto: "G",
            freq: 493.88
        }
    ]
    return notas
}

function setup(){
    masterGainNode = audioContext.createGain();
    masterGainNode.connect(audioContext.destination);
    masterGainNode.gain.value = volume.value;

    volume.addEventListener("change",changeVolume)

    for(let cont = 0; cont < Object.keys(notas).length; cont++){
        createKey(notas[cont].texto,notas[cont].freq)
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

function createKey(nota, freq){
    let keyboard = document.querySelector(".keyboard")
    let tecla = document.createElement("input")
    tecla.setAttribute("type","button")
    tecla.value = nota
    tecla.classList.add("tecla")
    keyboard.appendChild(tecla)

    tecla.addEventListener("mousedown",function(event){
        oscList = playTone(freq)
    })
    tecla.addEventListener("mouseup",noteReleased)
    tecla.addEventListener("mouseleave", noteReleased)
}

function noteReleased(event){
    oscList.stop()
}

function changeVolume(){
    masterGainNode.gain.value = volume.value
}