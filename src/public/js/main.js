import UI from "./ui.js";
import Observable from "./observer.js";
import AudioInput from "./audioAnalysis.js";

const $ = document.querySelector.bind(document);
const ui = new UI();
const isListening = new Observable();
const isNotListening = new Observable();
const showInput = new Observable();

isListening.subscribe(ui.isListening);
isNotListening.subscribe(ui.isNotListening);
showInput.subscribe(ui.showInput);

const audioAnalysis = new AudioInput({
  isListening,
  isNotListening,
  showInput,
});

$("#button").addEventListener("pointerup", () => {
  if (!audioAnalysis.audioListening) audioAnalysis.start();
});
