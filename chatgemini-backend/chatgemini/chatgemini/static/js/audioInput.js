import UI from "./ui.js";
const userState = new UI();

export default class AudioInput {
  constructor(audioOutput) {
    this.audioOutput = audioOutput;
    this.SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    this.AudioAnalysis = new this.SpeechRecognition();
  }

  async submitQuery(input) {
    const regex = /\*\*/g;
    const url = location.origin + "/ai_request/";
    const response = await fetch(url, { method: "POST", body: input });
    let output = (await response.text()).replaceAll(regex, "");
    userState.update("aiTranscript", output);
    if (await userState.update("isSpeechOn")) {
      await userState.update("showCancelSpeech");
      await this.audioOutput.speak(output);
    }
  }

  async start() {
    if (this.audioListening) return;
    this.AudioAnalysis.onresult = (e) => {
      let transcript = e.results[0][0].transcript.toString().toLowerCase();
      userState.update("userTranscript", transcript);
      this.submitQuery(transcript);
    };

    this.AudioAnalysis.addEventListener("start", () => {
      userState.update("isListening");
    });

    this.AudioAnalysis.onerror = (e) => {
      console.log(`${Date.now()} Recognition Error: ${e.error}`);
      userState.update("isNotListening");
    };

    this.AudioAnalysis.start();
  }
}
