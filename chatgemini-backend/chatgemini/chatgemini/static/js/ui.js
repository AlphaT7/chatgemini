const $ = document.querySelector.bind(document);

export default class UI {
  constructor() {}

  async update(func, options) {
    return this[func](options);
  }

  async isSpeechOn() {
    return $("#isSpeechOn").checked;
  }

  async isListening() {
    $("#listening").style.color = "#19ab33";
    $("#listening").innerHTML = "Listening...";
    $("#button").style.color = "#19ab33";
    $("#button").style.borderColor = "#19ab33";
    // $("#button").style.boxShadow = "0 4px 30px rgba(255, 255, 255, .85)";
    $("#button").classList.add("box-ripple");
    setTimeout(() => {
      $("#button").classList.remove("box-ripple");
    }, 900);
    $("#micOnIndicator").style.color = "#19ab33";
    $("#micOnIndicator").style.textShadow = "0 0 5px #19ab33";
  }

  async scrollToEnd() {
    document.querySelectorAll(".scrollMargin").forEach((el) => {
      el.remove();
    });
    $("#terminal").innerHTML += "<div class='scrollMargin'></div>";
    $("#tabContent1").scrollTop = $("#tabContent1").scrollHeight;
  }

  async showCancelSpeech() {
    $("#buttonIcon").classList.remove("fa-microphone");
    $("#buttonIcon").classList.add("fa-ban");
    $("#buttonIcon").style.color = "#ff4d4d";
    $("#button").style.borderColor = "#ff4d4d";
    $("#button").style.boxShadow = "unset";
    $("#button").dataset.type = "cancel";
  }

  async isNotListening() {
    $("#listening").style.color = "#595959";
    $("#listening").innerHTML = "Press the button and start talking! =)";
    $("#button").style.color = "#595959";
    $("#button").style.borderColor = "#595959";
    $("#button").style.boxShadow = "none";
    $("#micOnIndicator").style.color = "#505050";
    $("#micOnIndicator").style.textShadow = "unset";
  }

  async hideCancelSpeech() {
    $("#buttonIcon").classList.remove("fa-ban");
    $("#buttonIcon").classList.add("fa-microphone");
    $("#buttonIcon").style.color = "#595959";
    $("#button").dataset.type = "listen";
    this.isNotListening();
  }

  async userTranscript(input) {
    $("#terminal").innerHTML += `<div class="userTranscript">${input}</div>`;
    await this.scrollToEnd();
  }

  async aiTranscript(input) {
    $("#terminal").innerHTML += `<div class="aiTranscript">${input}</div>`;
    await this.scrollToEnd();
  }
}
