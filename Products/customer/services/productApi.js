function Service() {
  this.getListProductApi = function () {
    return axios({
      url: "https://64a6ad16096b3f0fcc804327.mockapi.io/products",
      method: "GET",
    });
  };

  this.postListProductApi = function (dataProd) {
    return axios({
      url: "https://64a6ad16096b3f0fcc804327.mockapi.io/products",
      method: "POST",
      data: dataProd,
    });
  };
}
