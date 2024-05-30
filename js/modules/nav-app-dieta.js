export default function NavDieta(buttons, sections) {
  const navButton = document.querySelectorAll(buttons);
  const calculadoraDivs = document.querySelectorAll(sections);

  function activeSection(index) {
    [...navButton][index].disabled = true;
    [...navButton][index].style =
      "box-shadow: inset 0 0 0px 50px rgba(0, 0, 0, 0.4)";
    [...calculadoraDivs][index].classList.add("active");
  }

  function clearSection() {
    calculadoraDivs.forEach((div) => {
      div.classList.remove("active");
    });
    navButton.forEach((button) => {
      button.disabled = false;
      button.style = "box-shadow: none";
    });
  }

  function addEvents() {
    navButton.forEach((button, index) => {
      button.addEventListener("click", () => {
        clearSection();
        activeSection(index);
      });
    });
  }
  function init() {
    if (localStorage.getItem("dietaImportada")) {
      activeSection(3);
      [...calculadoraDivs][3].classList.add("active");
    } else {
      activeSection(0);
      [...calculadoraDivs][0].classList.add("active");
    }
    if (navButton && calculadoraDivs) addEvents();
  }

  return {
    activeSection,
    clearSection,
    init,
  };
}
