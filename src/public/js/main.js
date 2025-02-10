const $ = document.querySelector.bind(document);
const terminal = new Terminal();
terminal.open($("#terminal1"));
terminal.write("Just push the button and talk! =)");

$("#button").addEventListener("pointerup", (el) => {
  $("#button").classList.add("box-ripple");
  setTimeout(() => {
    $("#button").classList.remove("box-ripple");
  }, 900);
});
