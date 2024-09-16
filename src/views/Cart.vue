<template>
  <v-container>
    <v-row>
      <v-col
        v-for="item in cart"
        :key="item.product._id"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card>
          <v-img :src="item.product.image" height="200px"></v-img>
          <v-card-title>{{ item.product.name }}</v-card-title>
          <v-card-subtitle
            >Price: {{ item.product.price }} Baht</v-card-subtitle
          >
          <v-card-text>
            Quantity:
            <v-btn small @click="decreaseQuantity(item)">-</v-btn>
            {{ item.quantity }}
            <v-btn small @click="increaseQuantity(item)">+</v-btn>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="removeFromCart(item.product._id)">
              <v-icon>mdi-delete</v-icon> Remove</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <v-toolbar flat>
      <v-toolbar-title>Total: {{ total }} Baht</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="checkout">Checkout</v-btn>
    </v-toolbar>
  </v-container>
</template>

<script>
import api from "../api";

export default {
  data() {
    return {
      cart: [],
      total: 0,
    };
  },
  methods: {
    fetchCart() {
      this.cart = JSON.parse(localStorage.getItem("cart") || "[]");
      this.calculateTotal();
    },
    removeFromCart(productId) {
      const index = this.cart.findIndex(
        (item) => item.product._id === productId
      );
      if (index !== -1) {
        this.cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(this.cart));
        this.calculateTotal();
        this.$emit("updateCart", this.cart);
      }
    },
    increaseQuantity(item) {
      item.quantity++;
      localStorage.setItem("cart", JSON.stringify(this.cart));
      this.calculateTotal();
      this.$emit("updateCart", this.cart);
    },
    decreaseQuantity(item) {
      if (item.quantity > 1) {
        item.quantity--;
        localStorage.setItem("cart", JSON.stringify(this.cart));
        this.calculateTotal();
        this.$emit("updateCart", this.cart);
      }
    },
    calculateTotal() {
      this.total = this.cart.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      );
    },
    async checkout() {
      try {
        for (let i = 0; i < this.cart.length; i++) {
          const item = this.cart[i];
          const response = await api.post(
            `/products/${item.product._id}/orders`,
            { quantity: item.quantity }
          );
          console.log(response.data);
        }
        localStorage.removeItem("cart");
        this.$emit("updateCart", []);
        this.$router.push("/orders");
      } catch (error) {
        console.error(
          "Failed to checkout:",
          error.response ? error.response.data : error.message
        );
      }
    },
  },
  created() {
    this.fetchCart();
    this.$on("updateCart", (cart) => {
      this.cart = cart;
      this.calculateTotal();
    });
  },
};
</script>

<style scoped></style>
