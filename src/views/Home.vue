<template>
  <v-container fluid>
    <v-parallax
      height="300"
      src="https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    >
    <div class="d-flex flex-column fill-height justify-center align-center text-white">
      <h1 class="text-h4 font-weight-thin mb-4">
        Vuetify Stationary
      </h1>
    </div>
    </v-parallax>

    <v-card flat class="mx-auto" height="20"></v-card>
    <div class="d-flex">
      <v-btn color="indigo-darken-2" @click="dialog = true" text>
        <v-icon>mdi-plus-circle</v-icon>
        Add Product
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="teal-darken-1" @click="goToCart()"
        ><v-icon>mdi-cart-outline</v-icon>Go to cart</v-btn
      >
    </div>

    <v-card flat class="mx-auto" height="50" max-width="200"></v-card>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{
            isEdit ? "Edit Product" : "Add Product"
          }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form
              @submit.prevent="isEdit ? updateProduct() : createProduct()"
            >
              <v-text-field
                v-model="currentProduct.name"
                label="Product Name"
                required
              ></v-text-field>
              <v-text-field
                v-model="currentProduct.price"
                label="Product Price"
                type="number"
                required
              ></v-text-field>
              <v-text-field
                v-model="currentProduct.stock"
                label="Product Stock"
                type="number"
                required
              ></v-text-field>
              <v-text-field
                v-model="currentProduct.image"
                label="Image URL"
                required
              ></v-text-field>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" text @click="dialog = false">Cancel</v-btn>
          <v-btn
            color="success"
            text
            @click="isEdit ? updateProduct() : createProduct()"
            >{{ isEdit ? "Save" : "Add" }}</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-divider></v-divider>

    <v-row>
      <v-col
        v-for="product in products"
        :key="product._id"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card>
          <v-img :src="product.image" height="150px">
            <v-menu offset-x>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  rounded
                  v-bind="attrs"
                  v-on="on"
                  class="ml-auto mt-2"
                >
                  <v-icon dense>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="openEditDialog(product)">
                  <v-list-item-title
                    ><v-icon>mdi-border-color</v-icon> Edit</v-list-item-title
                  >
                </v-list-item>
                <v-list-item @click="deleteProduct(product._id)">
                  <v-list-item-title
                    ><v-icon>mdi-delete</v-icon> Delete</v-list-item-title
                  >
                </v-list-item>
              </v-list>
            </v-menu>
          </v-img>
          <v-card-title>{{ product.name }}</v-card-title>
          <v-card-actions class="text-center">
            <v-chip class="ma-1" dark color="teal" variant="outlined">
              <v-icon>mdi-currency-thb</v-icon>{{ product.price }}
            </v-chip>
            <v-chip class="ma-1" dark color="teal" variant="outlined">
              <v-icon>mdi-archive</v-icon>{{ product.stock }}
            </v-chip>
            <v-spacer></v-spacer>
            <v-btn plain @click="addToCart(product)">
              Add to Cart
              <v-icon>mdi-cart-arrow-down</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from "../api";

export default {
  data() {
    return {
      products: [],
      cart: [],
      currentProduct: {
        name: "",
        price: 0,
        stock: 0,
        image: "",
      },
      dialog: false,
      isEdit: false,
    };
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await api.get("/products");
        console.log(response.data); // ตรวจสอบ response ใน console
        this.products = response.data.data;
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    },
    async createProduct() {
      try {
        const response = await api.post("/products", this.currentProduct);
        this.products.push(response.data.data); // เพิ่มสินค้าใหม่ในรายการสินค้า
        this.currentProduct = { name: "", price: 0, stock: 0, image: "" }; // รีเซ็ตฟอร์ม
        this.closeDialog(); // ปิด Dialog
      } catch (error) {
        console.error("Failed to create product:", error);
      }
    },
    async updateProduct() {
      try {
        const response = await api.put(
          `/products/${this.currentProduct._id}`,
          this.currentProduct
        );
        const index = this.products.findIndex(
          (product) => product._id === this.currentProduct._id
        );
        this.products.splice(index, 1, response.data.data);
        this.closeDialog();
      } catch (error) {
        console.error("Failed to update product:", error);
      }
    },
    async deleteProduct(productId) {
      try {
        await api.delete(`/products/${productId}`);
        const index = this.products.findIndex(
          (product) => product._id === productId
        );
        this.products.splice(index, 1);
      } catch (error) {
        console.error("Failed to delete product:", error);
      }
    },
    openAddDialog() {
      this.currentProduct = { name: "", price: 0, stock: 0, image: "" };
      this.isEdit = false;
      this.dialog = true;
    },
    openEditDialog(product) {
      this.currentProduct = { ...product };
      this.isEdit = true;
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
    addToCart(product) {
      let cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const cartItem = cart.find((item) => item.product._id === product._id);
      if (cartItem) {
        cartItem.quantity++;
      } else {
        cart.push({ product, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(cart));

      this.$emit("updateCart", cart);
    },
    goToCart() {
      this.$router.push("/cart");
    },
  },
  created() {
    this.fetchProducts();
  },
};
</script>

<style scoped></style>
