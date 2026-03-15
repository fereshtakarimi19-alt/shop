document.addEventListener("DOMContentLoaded", () => {
  // dropdown list
  const dropBTN = document.getElementById("dropBTN");
  const dropmenue = document.getElementById("dropmenue");
  dropBTN.addEventListener("click", (e) => {
    e.stopPropagation();
    dropmenue.classList.toggle("show");
  });
  window.addEventListener("click", (event) => {
    if (!event.target.matches("#dropBTN")) {
      dropmenue.classList.remove("show");
    }
  });

  // /////////////////////////////////////////////////////
  // search box
  const searchInput = document.querySelector(".search input");
  const productCards = document.querySelectorAll(".product-card");

  searchInput.addEventListener("input", () => {
    let value = searchInput.value.toLowerCase().trim();

    productCards.forEach((card) => {
      let name = card.querySelector("h3").textContent.toLowerCase();
      if (name.includes(value)) {
        card.style.display = "block"; // نشان دادن
      } else {
        card.style.display = "none"; // پنهان کردن
      }
    });
  });
  // /////////////////////////////////////////////////////////

  const addtocartbutton = document.querySelectorAll(".product-card button");

  const cartitemcount = document.querySelector(".cart-icon span");
  const cartitemlist = document.querySelector(".cart-tems");
  const carttotal = document.querySelector(".cart-total");
  const carticon = document.querySelector(".cart-icon");
  const sidebar = document.getElementById("sidebar1");

  let cartitems = [];
  let totalamount = 0;

  addtocartbutton.forEach((button, index) => {
    button.addEventListener("click", () => {
      const item = {
        name: document.querySelectorAll(".product-card h3")[index].textContent,
        price: parseFloat(
          document
            .querySelectorAll(".product-card p")
            [index].textContent.replace(/[^0-9]/g, "")
        ),
        quantity: 1,
      };
      const existingitem = cartitems.find(
        (cartitem) => cartitem.name === item.name
      );
      if (existingitem) {
        existingitem.quantity++;
      } else {
        cartitems.push(item);
      }
      totalamount += item.price;
      updatecartul();
    });
    function updatecartul() {
      updatecartitemcount(cartitems.length);
      updatecartitemlist();
      updatecarttotal();
    }
    function updatecartitemcount(count) {
      cartitemcount.textContent = count;
    }
    function updatecartitemlist() {
      cartitemlist.innerHTML = "";
      cartitems.forEach((item, index) => {
        const cartitem = document.createElement("div");
        cartitem.classList.add("cart-item", "individual-cart-item");
        cartitem.innerHTML = `
  <span>(${item.quantity}x)${item.name}</span>
  <span class="cart-item-price">${(item.price * item.quantity).toFixed(
    2
  )}</span>
   
  <button class="remove-item"  data-index="${index}"><i class="fa-solid fa-close"></i></button>`;
        cartitemlist.append(cartitem);
      });
      const removebutton = document.querySelectorAll(".remove-item");
      removebutton.forEach((button) => {
        button.addEventListener("click", (event) => {
          const index = event.target.closest("button").dataset.index;
          removeitemfromcart(index);
        });
      });
    }
    function removeitemfromcart(index) {
      const removeitem = cartitems.splice(index, 1)[0];
      totalamount -= removeitem.price * removeitem.quantity;
      updatecartul();
    }
    function updatecarttotal() {
      carttotal.textContent = totalamount.toFixed(2) + "AFG";
    }

    if (!carticon.dataset.listener) {
      // check if already has listener
      carticon.addEventListener("click", () => {
        sidebar.classList.toggle("open");
      });

      carticon.dataset.listener = "true";
    }

    const closebutton = document.querySelector(".sidebar-close");
    closebutton.addEventListener("click", () => {
      sidebar.classList.remove("open");
    });
  });

  // //////////////////////////////////////////////////////
  function updateclock() {
    const now = new Date();
    const milli = now.getMilliseconds();
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();
    const month = now.getMonth();
    const date = now.getDate();
    const year = now.getFullYear();

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const tags = [
      "month",
      "date",
      "year",
      "hours",
      "minutes",
      "seconds",
      "milli",
    ];
    const values = [
      months[month],
      date,
      year,
      String(hours).padStart(2, "0"),
      String(minutes).padStart(2, "0"),
      String(seconds).padStart(2, "0"),
      String(milli).padStart(2, "0"),
    ];
    for (let i = 0; i < tags.length; i++) {
      document.querySelector(`.${tags[i]}`).textContent = values[i];
    }
  }
  setInterval(updateclock, 1000);
});
