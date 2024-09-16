<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>Orders</v-card-title>
            <v-card-text>
              <v-simple-table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Products</th>
                    <th>Total Quantity</th>
                    <th>Status</th>
                    <th>Created At</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="order in orders" :key="order._id">
                    <td>{{ order._id }}</td>
                    <td>
                      <ul>
                        <li v-for="product in order.products" :key="product.product ? product.product._id : ''">
                          {{ product.product ? product.product.name : 'Unknown Product' }} (x{{ product.quantity }})
                        </li>
                      </ul>
                    </td>
                    <td>{{ totalQuantity(order.products) }}</td>
                    <td>{{ order.status }}</td>
                    <td>{{ new Date(order.createdAt).toLocaleString() }}</td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import api from '../api';
  
  export default {
    data() {
      return {
        orders: []
      };
    },
    methods: {
      async fetchOrders() {
        try {
          const response = await api.get('/orders');
          console.log(response.data.data);
          this.orders = response.data.data;
        } catch (error) {
          console.error('Failed to fetch orders:', error);
        }
      },
      totalQuantity(products) {
        return products.reduce((acc, item) => acc + item.quantity, 0);
      }
    },
    created() {
      this.fetchOrders();
    }
  };
  </script>
  
  <style scoped>
  </style>
  