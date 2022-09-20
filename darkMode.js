//DarkMode//
function darkMode() {
  let dark = document.getElementById("btnDark");
  let darkMode = localStorage.getItem("darkMode");

  if (darkMode == "dark") {
    document.body.classList.add("darkMode");
    dark.innerHTML = `<img class="dark" src="assets/ligth.png" alt="">`;
  } else {
    document.body.classList.remove("darkMode");
  }

  dark.addEventListener("click", () => {
    if (darkMode != "dark") {
      document.body.classList.add("darkMode");
      localStorage.setItem("darkMode", "dark");
      darkMode = "dark";
      dark.innerHTML = `<img class="dark" src="assets/ligth.png" alt="">`;
    } else {
      document.body.classList.remove("darkMode");
      localStorage.setItem("darkMode", "ligth");
      darkMode = "light";
      dark.innerHTML = `<img class="dark" src="assets/dark.png" alt="">`;
    }
  });
}

darkMode();
