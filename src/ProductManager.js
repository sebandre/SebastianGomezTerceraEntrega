const fs = require("fs").promises;


class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
  }
  

  async init() {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      const products = JSON.parse(data);
      this.products = products;
      if (this.products.length === 0) {
        this.lastId = 0;
      } else {
        this.lastId = this.products[this.products.length - 1].id;
      }
    } catch (error) {
      this.lastId = 0;
    }
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    await this.init();
    const product = {
      id: this.lastId + 1,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
    this.products.push(product);
    await this.saveToFile();
  }

  async getProducts() {
    await this.init();
    return this.products;
  }


  async getProductById(productId) {
    await this.init();
    const product = this.products.find((p) => p.id === productId);
    if (product) {
      return product;
    } else {
      return ("Product not found");
    }
  }

  async updateProduct(productId, options) {
    const product = await this.getProductById(productId);
    if (!product) {
      return "Product not found";
    }
    if (options.title !== undefined) {
      product.title = options.title;
    }
    if (options.description !== undefined) {
      product.description = options.description;
    }
    if (options.price !== undefined) {
      product.price = options.price;
    }
    if (options.thumbnail !== undefined) {
      product.thumbnail = options.thumbnail;
    }
    if (options.code !== undefined) {
      product.code = options.code;
    }
    if (options.stock !== undefined) {
      product.stock = options.stock;
    }
    await this.saveToFile();
    return "Product successfully updated";
  }

  async deleteProduct(productId) {
    const product = await this.getProductById(productId);
    if (!product) {
      return "Product not found";
    }
    const index = this.products.indexOf(product);
    this.products.splice(index, 1);
    await this.saveToFile();
    return "Product successfully removed";
  }

  async saveToFile() {
    try {
      const data = JSON.stringify(this.products, null, 2);
      await fs.writeFile(this.path, data);
    } catch (error) {
      console.error("Error saving products to file:", error);
    }
  }
}

const productManager = new ProductManager("products.json");


//See all products
  // (async () => {
  //   console.log(await productManager.getProducts());
  // })();
  //productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin Imagen", "abc123", 25);
  //See all products
  // (async () => {
  //   console.log(await productManager.getProducts());
  // })();
    //Serch product by ID
  // (async () => {
  //   console.log(await productManager.getProductById(5));
  // })();
  //productManager.updateProduct(2, {title:"Prueba update"});
 // console.log(productManager.getProductById(2));
 //productManager.deleteProduct(2);
 //console.log(productManager.getProducts());

 module.exports = ProductManager;