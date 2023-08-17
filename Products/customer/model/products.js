function Product(
  name,
  price,
  screen,
  backCamera,
  frontCamera,
  img,
  desc,
  type
) {
  this.id = Math.random();
  this.name = name;
  this.price = price;
  this.screen = screen;
  this.backCamera = backCamera;
  this.frontCamera = frontCamera;
  this.img = img;
  this.desc = desc;
  this.type = type;
}

function CartItem(product, quantity) {
  this.id = Math.random();
  this.product = product;
  this.quantity = quantity;
}
