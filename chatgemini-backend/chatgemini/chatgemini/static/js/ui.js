const $ = document.querySelector.bind(document);

export default class UI {
  async isListening() {
    $("#listening").style.color = "#19ab33";
    $("#listening").innerHTML = "Listening...";
    $("#button").style.color = "#19ab33";
    $("#button").style.borderColor = "#19ab33";
    $("#button").style.boxShadow = "0 4px 30px rgba(255, 255, 255, .85)";
    $("#button").classList.add("box-ripple");
    setTimeout(() => {
      $("#button").classList.remove("box-ripple");
    }, 900);
  }

  async isNotListening() {
    $("#listening").style.color = "#595959";
    $("#listening").innerHTML = "Press the button and start talking! =)";
    $("#button").style.color = "#595959";
    $("#button").style.borderColor = "#595959";
    $("#button").style.boxShadow = "none";
  }

  async showInput(input) {
    $("#terminal1").innerHTML += `<div class="terminalInput">${input}</div>`;
  }
}
