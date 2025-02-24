import UI from "./ui.js";
const userState = new UI();

export default class audioOutput {
  constructor(synthObj) {
    this.synth = synthObj.synth;
    this.defaultVoice = synthObj.defaultVoice;
  }

  async speak(output) {
    const text = new SpeechSynthesisUtterance(output);
    text.voice = this.defaultVoice;
    text.addEventListener("end", () => {
      userState.update("hideCancelSpeech");
    });
    this.synth.speak(text);
  }

  async stop() {
    this.synth.cancel();
    userState.update("hideCancelSpeech");
  }
}
