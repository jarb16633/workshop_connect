<template>
  <v-app>
    <v-app-bar app color="black" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>My App</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" color="#004D40" dark>
      <v-list dense>
        <v-list-item link :to="{ name: 'home' }">
          <v-list-item-icon><v-icon>mdi-home</v-icon></v-list-item-icon>
          <v-list-item-content
            ><v-list-item-title>Home</v-list-item-title></v-list-item-content
          >
        </v-list-item>

        <v-list-item link :to="{ name: 'cart' }">
          <v-list-item-icon><v-icon>mdi-cart</v-icon></v-list-item-icon>
          <v-list-item-content
            ><v-list-item-title>Cart</v-list-item-title></v-list-item-content
          >
        </v-list-item>

        <v-list-item link :to="{ name: 'orders' }">
          <v-list-item-icon
            ><v-icon>mdi-file-document-outline</v-icon></v-list-item-icon
          >
          <v-list-item-content
            ><v-list-item-title>Orders</v-list-item-title></v-list-item-content
          >
        </v-list-item>
      </v-list>

      <v-spacer></v-spacer>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn rounded block @click="logOut()"> Logout </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
    };
  },
  methods: {
    logOut() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
  },
};
</script>
