import UI from "./ui.js";
const userState = new UI();

export default class audioOutput {
  constructor(synthObj) {
    this.synth = synthObj.synth;
    this.defaultVoice = synthObj.defaultVoice;
    this.speaking = false;
    this.count = 0;
  }

  async speechInProgress() {
    setTimeout(async () => {

      if (await this.isSpeaking()) {
        this.speechInProgress();
      } else {
        this.speaking = false;
        await userState.update("hideCancelSpeech");
        await userState.update("isNotListening");
      }
    }, 300);
  }

  async speak(output) {

    if (output === "" && this.defaultVoice.name !== "Daniel") return;
    const text = new SpeechSynthesisUtterance(output);
    text.voice = this.defaultVoice;
    this.synth.speak(text);
    this.speechInProgress();
  }

  async stop() {
    this.synth.cancel();
    userState.update("hideCancelSpeech");
  }

  async isSpeaking() {
    return this.synth.speaking;
  }
}
