import AudioInput from "./audioAnalysis.js";

const $ = document.querySelector.bind(document);
const audioAnalysis = new AudioInput();

// terminal.open($("#terminal1"));
// terminal.write("Just push the button and talk! =)");

$("#button").addEventListener("pointerup", (el) => {
  if (audioAnalysis.audioListening) return;

  $("#listening").style.color = "#19ab33";
  $("#listening").innerHTML = "Listening...";
  $("#button").style.color = "#19ab33";
  $("#button").classList.add("box-ripple");

  audioAnalysis.start();
  setTimeout(() => {
    $("#button").classList.remove("box-ripple");
  }, 900);
});
