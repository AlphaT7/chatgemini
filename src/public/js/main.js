import UI from "./ui.js";
import Observable from "./observer.js";
import AudioInput from "./audioInput.js";
import AudioOutput from "./audioOutput.js";

const $ = document.querySelector.bind(document);
const ui = new UI();
const isListening = new Observable();
const isNotListening = new Observable();
const showInput = new Observable();
const showOutput = new Observable();

isListening.subscribe(ui.isListening);
isNotListening.subscribe(ui.isNotListening);
showInput.subscribe(ui.showInput);
showOutput.subscribe(ui.showOutput);

async function init() {
  if (typeof speechSynthesis === "undefined") return;

  const synthObj = {
    synth: window.speechSynthesis,
    defaultVoice: window.speechSynthesis
      .getVoices()
      .find((voice) => voice.default),
  };

  const audioOutput = new AudioOutput(synthObj);

  const uiObj = {
    isListening,
    isNotListening,
    showInput,
    showOutput,
    audioOutput,
  };

  const audioAnalysis = new AudioInput(uiObj);

  $("#button").addEventListener("pointerup", () => {
    if (!audioAnalysis.audioListening) audioAnalysis.start();
  });
}

init();

if (
  typeof speechSynthesis !== "undefined" &&
  speechSynthesis.onvoiceschanged !== undefined
) {
  speechSynthesis.onvoiceschanged = init;
}
