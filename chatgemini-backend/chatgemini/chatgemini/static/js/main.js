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

  const audioOutput = new AudioOutput(synthObj);

  const audioAnalysis = new AudioInput(audioOutput);

  $("#button").addEventListener("pointerup", () => {
    if ($("#button").dataset.type === "listen") {
      if (audioAnalysis.audioListening) return;
      audioOutput.speak("!ignore!");
      audioAnalysis.start();
    } else {
      audioOutput.stop();
    }
  });
}

const synth = speechSynthesis;
setTimeout(() => init(synth), 100);