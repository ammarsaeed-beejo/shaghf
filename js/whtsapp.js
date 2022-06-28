const firebaseConfig = {
  apiKey: "AIzaSyBEfXjqap2M47gsTdYcJMEGvt1iwEVH0kY",
  authDomain: "shagf-console.firebaseapp.com",
  projectId: "shagf-console",
  storageBucket: "shagf-console.appspot.com",
  messagingSenderId: "104517493217",
  appId: "1:104517493217:web:f493f511ee6339568172a0",
  measurementId: "G-W5ZYMGPJWM",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize Firestore
const itemsRef = firebase.firestore().collection("items");

const params = new URLSearchParams(window.location.search);

tabelNumber = params.get("tb");

var products = [
  // {
  //   id: 1,
  //   img: "./images/menu/1.png",
  //   name: "Mocha",
  //   price: 3.5,
  //   cart: false,
  //   quantity: 1,
  //   total: 0,
  //   class: "ice coffee",
  // },
  // {
  //   id: 2,
  //   img: "./images/menu/2.png",
  //   name: "Red Velvet Latte",
  //   price: 4,
  //   cart: false,
  //   quantity: 1,
  //   total: 0,
  //   class: "ice coffee",
  // },
  // {
  //   id: 3,
  //   img: "./images/menu/3.png",
  //   name: "Acai",
  //   price: 6.5,
  //   cart: false,
  //   quantity: 1,
  //   total: 0,
  //   class: "sweets",
  // },
  // {
  //   id: 4,
  //   img: "./images/menu/4.png",
  //   name: "Dates Latte",
  //   price: 3.5,
  //   cart: false,
  //   quantity: 1,
  //   total: 0,
  //   class: "chicken",
  // },
  // {
  //   id: 5,
  //   img: "./images/menu/5.png",
  //   name: "Double Espresso",
  //   price: 2.5,
  //   cart: false,
  //   quantity: 1,
  //   total: 0,
  //   class: "coffee",
  // },
  // {
  //   id: 6,
  //   img: "./images/menu/6.png",
  //   name: "Cappuccino",
  //   price: 3,
  //   cart: false,
  //   quantity: 1,
  //   total: 0,
  //   class: "coffee",
  // },
  // {
  //   id: 7,
  //   img: "./images/menu/7.png",
  //   name: "Kinder Sauce",
  //   price: 4,
  //   cart: false,
  //   quantity: 1,
  //   total: 0,
  //   class: "chicken",
  // },
  // {
  //   id: 8,
  //   img: "./images/menu/8.png",
  //   name: "Brownie Bites",
  //   price: 1,
  //   cart: false,
  //   quantity: 1,
  //   total: 0,
  //   class: "sweets",
  // },
  // {
  //   id: 9,
  //   img: "./images/menu/9.png",
  //   name: "Shaghf Box",
  //   price: 40,
  //   cart: false,
  //   quantity: 1,
  //   total: 0,
  //   class: "ice coffee",
  // },
  // {
  //   id: 10,
  //   img: "./images/menu/10.png",
  //   name: "Cappuccino ice",
  //   price: 2.75,
  //   cart: false,
  //   quantity: 1,
  //   total: 0,
  //   class: "rice",
  // },
];
var filterdItems = [];
var categorys = [
  { title: "all", data: "all" },
  { title: "sweets", data: "sweets" },
  { title: "coffee", data: "coffee" },
  { title: "ice coffee", data: "ice coffee" },
];

var firstcustomername = document.getElementById("Customer_first_name");

var Second_customer_name = document.getElementById("Second_customer_name");

var Customer_number_1 = document.getElementById("Customer_number_1");

var Customer_number_2 = document.getElementById("Customer_number_2");

var Area_name = document.getElementById("Area_name");

var Street_name = document.getElementById("Street_name");

var discountValue = document.getElementById("cod");

var Floor_number = document.getElementById("Floor_number");

var Apartment_number = document.getElementById("Apartment_number");
var buy_btn = document.getElementById("buy-btn");

var Notes = document.getElementById("order_comments");

var notify = document.getElementById("notify_amount");

var con2 = []; //POSITION AT TABLE

var con = 0;

var order = [];

var currentCountOfCollection = 0;

var firebaseOrder = [];

var googlemapsurl = "...";

var storage = firebase.storage(); // I am getting an error in this line

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition);
} else {
  alert("Geolocation is not supported by this browser.");
}

function getCollectionlenght() {
  firebase
    .firestore()
    .collection("orders")
    .get()
    .then(function (querySnapshot) {
      if (querySnapshot.isEmpty) {
        currentCountOfCollection = 0;
      } else {
        currentCountOfCollection = querySnapshot.size + 1;
      }
    });
}

function buy() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported in this browser.");
  }
  for (let index = 0; index < con2.length; index++) {
    var position = con2[index];
    for (let index3 = 0; index3 < products.length; index3++) {
      if (position == products[index3].id) {
        order.push(
          "%0a" + "الكمية : " + products[index3].quantity + " ",
          products[index3].name + " ",
          "السعر : " + products[index3].price + " "

          // "total : " + products[index3].total + "%0a",
        );

        firebaseOrder.push({
          name: products[index3].name,
          price: products[index3].price,
          id: products[index3].id,
          quantity: products[index3].quantity,
          total: products[index3].total,
          category: products[index3].class,
        });
        products[index3].total =
          products[index3].price * products[index3].quantity;
      } else {
      }
    }
    con = con + 1;
  }

  var dateTime = firebase.firestore.Timestamp.fromDate(new Date());
  firebase.firestore().collection("orders").add({
    status: "waiting",
    tabelNumber: tabelNumber,
    time: dateTime.toDate(),
    order: firebaseOrder,
    total: total(),
    notes: Notes.value,
  });
  // window.open(url, "_blank").focus();
}

function showPosition(position) {
  googlemapsurl =
    "https://www.google.com/maps/?q=" +
    position.coords.latitude +
    "," +
    position.coords.longitude;
}

async function total() {
  var totalPrice = 0;

  for (let index = 0; index < products.length; index++) {
    if (products[index].cart) {
      totalPrice += products[index].total;
    }
  }
  var sale = await checkDiscount(cod.value);

  console.log(sale);

  if (sale != 0) {
    return (totalPrice *= Number(sale));
  }

  return totalPrice;
}

async function checkDiscount(discount) {
  let sale = 0;
  console.log("asdasds", discount);

  if (discount.length) {
    let querySnapshot = await db
      .collection("discounts")
      .where("discountName", "==", discount)
      .get();

    querySnapshot.forEach((doc) => {
      sale = Number(doc.data()["discountValue"]);
    });
  }
  return sale;
}

function clean() {
  for (let index = 0; index < products.length; index++) {
    products[index].total = 0;
    products[index].quantity = 1;
    products[index].cart = false;
    con2 = [];
    updateCart();
  }
}

async function add(id) {
  for (let index = 0; index < products.length; index++) {
    if (products[index].id != id || products[index].cart == true) {
    } else {
      products[index].cart = true;
      con2.push(products[index].id);
      document.getElementById("tableProducts").innerHTML += `

      <div class="main">
      <div id="titel">
        <h1>your ordar</h1>
      </div>
      <div class="cartitem">
        <div class="itemimg">
          <img src="${products[index].img}" />
          <div id="name">
            <h2 class="name">${products[index].name}</h2>
            
            <div id="price">
              <h2 class="price">price:</h2>
              <h2 class="price">${products[index].price} JD</h2>
            </div>
          </div>
        </div>
        <div class="info">
        <div class="counter">
        <button id="addbt" class="btnbtn" onclick="reduceAmount(${products[index].id})" >-</button>
        <input class="inputc" style="width: 2rem; id="input${products[index].id}" value="${products[index].quantity}" disabled>
          <button  id="addbt" class="btnbtn" onclick="addAmount(${products[index].id})" >
            +
          </button>
        </div>

          <div class="icon">
            <img onclick="remove(${products[index].id})" src="./images/trash.svg" />
            <img src="./images/note.svg" />
          </div>
        </div>
      </div>
      <hr />

      <div class="total">
        <h2>total</h2>
        <h2 id="total"></h2>
      </div>
      <input id="cod" type="text" placeholder="promo code" />
      <div id="btns">
        <button id="confirm">
          <h2>conﬁrm order</h2>
        </button>
        <button id="additems">
          <h2>add more items</h2>
        </button>
      </div>
    </div>
        

      
       
       `;
      buy_btn.innerHTML =
        '<button  onclick="buy()" id="butadd" class="btn btn-primary">done</button>';

      con++;
      products[index].total = products[index].price * products[index].quantity;
    }
  }

  var x = document.getElementById("snackbar1");
  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 3000);
  var value = await total();
  document.getElementById("total").innerHTML = `<td> ${value} jd</td>  `;
}

function remove(id) {
  for (let index = 0; index < products.length; index++) {
    if (products[index].id == id) {
      products[index].cart = false;
      products[index].total = 0;
      products[index].quantity = 1;
      total();
      for (let index2 = 0; index2 < con2.length; index2++) {
        if (products[index].id == con2[index2]) {
          con2.splice(index2, 1);
        } else {
        }
      }
      // notify.innerText = con2.length;

      updateCart();
    } else {
      updateCart();
    }
  }
}

async function updateCart() {
  con = 0;
  var totalTable = 0;
  document.getElementById("tableProducts").innerHTML = "";
  for (let index = 0; index < con2.length; index++) {
    var position = con2[index];
    for (let index3 = 0; index3 < products.length; index3++) {
      if (position == products[index3].id) {
        document.getElementById("tableProducts").innerHTML += `
        

        <div class="main">
        <div id="titel">
          <h1>your ordar</h1>
        </div>
        <div class="cartitem">
          <div class="itemimg">
            <img src="${products[index].img}" />
            <div id="name">
              <h2 class="name">${products[index].name}</h2>
              
              <div id="price">
                <h2 class="price">price:</h2>
                <h2 class="price">${products[index].price} JD</h2>
              </div>
            </div>
          </div>
          <div class="info">
            <div class="counter">
            <button id="addbt" class="btnbtn" onclick="reduceAmount(${products[index].id})" >-</button>
            <input class="inputc" style="width: 2rem; id="input${products[index].id}" value="${products[index].quantity}" disabled>
              <button id="addbt" class="btnbtn" onclick="addAmount(${products[index].id})" >
                +
              </button>
            </div>
  
            <div class="icon">
              <img onclick="remove(${products[index].id})" src="./images/trash.svg" />
              <img src="./images/note.svg" />
            </div>
          </div>
        </div>
        <hr />
  
        <div class="total">
          <h2>total</h2>
          <h2 id="total"></h2>
        </div>
        <input id="cod" type="text" placeholder="promo code" />
        <div id="btns">
          <button id="confirm" onclick="buy()>
            <h2>conﬁrm order</h2>
          </button>
          <button id="additems">
            <h2>add more items</h2>
          </button>
        </div>
      </div>
       
       
       `;
        products[index3].total =
          products[index3].price * products[index3].quantity;
      } else {
      }
    }

    con = con + 1;
  }
  let value = await total();
  console.log("99999999", value);

  if (value == 0) {
    document.getElementById("total").innerHTML = "";
  } else {
    document.getElementById("total").innerHTML = `
      
      <td>${value} jd</td>
      
      `;
  }
}

function reduceAmount(id) {
  for (let index = 0; index < products.length; index++) {
    if (products[index].id == id) {
      if (products[index].quantity > 1) {
        products[index].quantity = products[index].quantity - 1;

        updateCart();
      } else {
      }
    } else {
    }
  }
}

function addAmount(id) {
  for (let index = 0; index < products.length; index++) {
    if (products[index].id == id) {
      if (products[index].quantity > 0) {
        products[index].quantity = products[index].quantity + 1;

        updateCart();
      } else {
      }
    } else {
    }
  }
}

async function getItemsfromFirebsae() {
  await itemsRef.onSnapshot((snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: 0,
      img: doc.data()["img"],
      name: doc.data()["name"],
      price: doc.data()["price"],
      cart: false,
      quantity: 1,
      total: 0,
      class: doc.data()["category"],
    }));

    for (let index = 0; index < data.length; index++) {
      storage
        .refFromURL("gs://shagf-console.appspot.com/" + data[index].img)
        .getDownloadURL()
        .then((url) => {
          products.push({
            id: index,
            img: url,
            name: data[index].name,
            price: data[index].price,
            cart: false,
            quantity: 1,
            total: 0,
            class: data[index].class,
          });
        });
    }
  });
}

function filterItems(category) {
  if (category == "all") {
    filterdItems = products;
  } else {
    filterdItems = products.filter((product) => product.class == category);
  }
  renderItems();
}

function renderItems() {
  document.getElementById("all").innerHTML = ``;

  for (let index = 0; index < filterdItems.length; index++) {
    document.getElementById("all").innerHTML += `
      
    
      <div class="col-md-6 col-lg-5 col-xl-6 menu-holder fixed left-40">
      <a href="shop-single.html" class="menu-thumb">
      <img src="${filterdItems[index].img}" alt="">
      </a>
       <div class="menu-item">
      <h5 class="color-fff">
      <a href="shop-single.html">${filterdItems[index].name}</a>
      <span class="dots"></span>
      <span class="price">
      <span>JD</span>
      ${filterdItems[index].price}
      </span>
      </h5>
      <ul>
      <li>
      
      
      <button onclick="add(${filterdItems[index].id})" id="butadd" class="btn btn-primary">Add</button>
      </li>
      </ul>
      </div>
      
      </div>
    `;
  }
}

function renderCategory() {
  for (let index = 0; index < categorys.length; index++) {
    document.getElementById("category").innerHTML += `
        <button id="filterItems" class="btn btn-primary shadow-none" type = "button" onclick = "filterItems('${categorys[index].data}')">
        <li>
            <span>${categorys[index].title}</span>
          </a>
        </li>
        </button>
      `;
  }
}

setTimeout(() => {
  filterItems("all");
  renderItems();
  renderCategory();
}, 1500);

getItemsfromFirebsae();
