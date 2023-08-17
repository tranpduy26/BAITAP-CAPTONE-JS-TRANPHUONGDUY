var service = new Service();
var productList = [];
var cartItem = [];

function getEle(id) {
  return document.getElementById(id);
}

function getListProduct(render) {
  service
    .getListProductApi()
    .then((response) => {
      render(response.data);
      productList = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}
getListProduct(display);

function display(data) {
  var contentHTML = "";

  for (var i = 0; i < data.length; i++) {
    contentHTML += `
    <div class="card_item">
          <div class="card_hover">
            <h3>Specifiations</h3>
            <div class="sp_screen">
              Screen:
              <span>${data[i].screen}</span>
            </div>
            <div class="sp_backcamera">
              Back Camera:
              <span>${data[i].backCamera}</span>
            </div>
            <div class="sp_frontcamera">
              Front Camera:
              <span>${data[i].frontCamera}</span>
            </div>
            <a href="#" class="d-inline-block">Click here for more details</a>
            <button id="add_cart" onclick= "addItemCart(${data[i].id})">Add to cart</button>
          </div>
          <div class="card_content">
            <img src="${data[i].img}" alt="${data[i].name}" />
            <div class="card_body">
              <h5 class="card_title"><span>${data[i].name}</span></h5>
              <p class="card_price">
                <span>${data[i].price}</span>
              </p>
              <span class="card_brand">${data[i].type}</span>
              <p class="card_des">Descripion: <span>${data[i].desc}</span></p>
              <div class="card_footer">
                <div class="card_stars">
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                </div>
                <p>In Stock</p>
              </div>
            </div>
          </div>
        </div>
    `;
  }

  getEle("tblDanhSachSP").innerHTML = contentHTML;
}

function change() {
  var result = [];
  const keyWord = document.getElementById("product-type").value;
  if (keyWord === "default") {
    display(productList);
  } else {
    console.log(keyWord, productList);
    for (let i = 0; i < productList.length; i++) {
      const currentProduct = productList[i];
      console.log(currentProduct);
      if (currentProduct.type.toLowerCase().includes(keyWord)) {
        result.push(currentProduct);
      }
    }
    console.log(result);
    display(result);
  }
}

// HÀM RENDER GIỎ HÀNG
function renderCart() {
  var result = "";

  for (var i = 0; i < cartItem.length; i++) {
    const priceSum = cartItem[i].product.price * cartItem[i].quantity;
    result += `<tr>
    <td class="w-25">
      <img src="${cartItem[i].product.img}" class="img-fluid img-thumbnail" alt="Product" id="img_product" />
    </td>
    <td id="name_product">${cartItem[i].product.name}</td>
    <td id="price_product">${cartItem[i].product.price}</td>
    <td class="qty">
      <input
        type="text"
        class="form-control"
        id="input1"
        onchange="handleQuantity(${cartItem[i].id})"
        value="${cartItem[i].quantity}"
      />
    </td>
    <td id="total_product">${priceSum}</td>
    <td>
      <a class="btn btn-danger btn-sm" onclick='deleteCart(${cartItem[i].id})'>
        <i class="fa fa-times"></i>
      </a>
    </td>
  </tr>`;
  }
  getEle("cart_body").innerHTML = result;
  saveLocal("cartItem", cartItem);
  renderPaidCart();
}

function findById(id) {
  let tempId = "";
  for (var i = 0; i < productList.length; i++) {
    if (productList[i].id == id) {
      tempId = i;
      break;
    }
  }
  return tempId;
}

function findCartById(id) {
  for (var i = 0; i < cartItem.length; i++) {
    if (cartItem[i].product.id == id) {
      return i;
    }
  }
  return -1;
}

function addItemCart(id) {
  var index = findById(id);
  var indexCart = findCartById(id);
  if (!index) {
    alert("Sản phẩm không tồn tại!!!");
  } else {
    if (cartItem.length > 0) {
      if (indexCart === -1) {
        var newCartItem = new CartItem(productList[index], 1);
        cartItem.push(newCartItem);
      } else {
        cartItem[indexCart].quantity += 1;
      }
    } else {
      let newCartItem = new CartItem(productList[index], 1);
      cartItem.push(newCartItem);
    }
  }
  alert("Thêm sản phẩm thành công");
  saveLocal("cartItem", cartItem);
  renderPaidCart();
}

function deleteCart(id) {
  var indexCart = 0;

  for (var i = 0; i < cartItem.length; i++) {
    if (cartItem[i].id == id) {
      indexCart = i;
      break;
    } else {
      indexCart = -1;
    }
  }

  if (indexCart === -1) {
    alert("Can not delete!!");
  } else {
    cartItem.splice(indexCart, 1);
    renderCart();
  }
  saveLocal("cartItem", cartItem);
  renderPaidCart();
}

function handleQuantity(id) {
  var indexCart = 0;

  for (var i = 0; i < cartItem.length; i++) {
    if (cartItem[i].id == id) {
      indexCart = i;
      break;
    } else {
      indexCart = -1;
    }
  }
  if (indexCart === -1) {
    alert("ID invalid!!");
  } else {
    var newQuantity = document.getElementById("input1").value;
    cartItem[indexCart].quantity = newQuantity;
  }
  saveLocal("cartItem", cartItem);
  renderPaidCart();
}

function payProduct() {
  cartItem = [];
  saveLocal("cartItem", cartItem);
  renderCart();
  document.getElementById("closeCartBtn").click();
}

function renderPaidCart() {
  const total = cartItem.reduce(function (a, b) {
    return a + b.quantity * b.product.price;
  }, 0);
  document.getElementById("total_price").innerText = total;
}

function saveLocal(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getLocal(key) {
  var localData = localStorage.getItem(key);
  if (localData == null) return;
  localData = JSON.parse(localData);
  cartItem = localData;
}

getLocal("cartItem");
