import appState from "./appState.js";
import AudioInput from "./audioInput.js";
import AudioOutput from "./audioOutput.js";

const $ = document.querySelector.bind(document);

async function init(synth) {
  if (typeof speechSynthesis === "undefined") return;

  let defaultVoice =
    speechSynthesis.getVoices().find((voice) => voice.name == "Daniel") ||
    speechSynthesis.getVoices().find((voice) => voice.default);

  const synthObj = {
    synth: synth,
    defaultVoice: defaultVoice,
  };

  const AppState = new appState();

  const audioOutput = new AudioOutput(synthObj, AppState);

  const audioAnalysis = new AudioInput(audioOutput, AppState);

  $("#button").addEventListener("pointerup", () => {
    if ($("#button").dataset.type === "listen") {
      if (AppState.getListeningState()) return;
      audioOutput.speak(""); // necessary to start the speech synthesis; if not included, audioOutput.speak() will not work on IOS;
      audioAnalysis.start();
    } else {
      audioOutput.stop();
    }
  });
}

const synth = speechSynthesis;
setTimeout(() => init(synth), 100);