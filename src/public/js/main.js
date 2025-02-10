const $ = document.querySelector.bind(document);

$("#container").addEventListener("pointerup", (el) => {
  $("#container").classList.add("box-ripple");
  setTimeout(() => {
    $("#container").classList.remove("box-ripple");
  }, 900);
});
