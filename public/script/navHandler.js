const menu = document.querySelector(".navbar--menu__hamburger");
const menuList = document.querySelector(".navbar--menu__list");
const listItems = menuList.childNodes
const body = document.getElementsByTagName("body")[0];

// event on the hamburger menu click
menu.addEventListener("click", () => {
  // body.classList.toggle("bodyScrollDisabled");
  menuList.classList.toggle("menuClickEffect");
  menu.classList.toggle("hamburgerClickEffect")
  const menuChildren = menuList.querySelectorAll(".liClickEffect");

  // list item effect
  menuChildren.forEach((child) => {
    setTimeout(() => {
      child.classList.toggle("liClickEffect");
    }, 350);
  });
});

listItems.forEach(item => {
  item.addEventListener("click", () => {
    menuList.classList.toggle("menuClickEffect");
    menu.classList.toggle("hamburgerClickEffect")
    const menuChildren = menuList.querySelectorAll(".liClickEffect");
  
    // list item effect
    menuChildren.forEach((child) => {
      setTimeout(() => {
        child.classList.toggle("liClickEffect");
      }, 350);
    });
  })
})


