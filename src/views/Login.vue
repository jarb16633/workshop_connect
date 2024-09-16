<template>
  <main align-center>
    <v-card flat class="mx-auto" height="150" max-width="200"></v-card>

    <v-card
      class="mx-auto pa-12 pb-8"
      title="Log in"
      max-width="448"
      rounded="lg"
      outlined
    >
      <v-card-text class="font-weight-medium text-h5 text-center"
        ><v-icon>mdi-login</v-icon> Log In
      </v-card-text>
      <v-text-field
        v-model="username"
        label="Username"
        placeholder="Username"
        prepend-inner-icon="mdi mdi-account"
        outlined
        required
      >
      </v-text-field>
      <v-text-field
        v-model="password"
        label="Password"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        placeholder="Enter your password"
        prepend-inner-icon="mdi mdi-lock"
        outlined
        @click:append-inner="visible = !visible"
        required
      ></v-text-field>
      <v-btn
        type="submit"
        class="mb-8"
        color="primary"
        variant="tonal"
        block
        @click="login"
        >Log In</v-btn
      >
      <v-card-text class="text-center">
        <a
          class="text-blue text-decoration-none"
          rel="noopener noreferrer"
          target="_blank"
          @click="goToRegister()"
        >
          Dont have an account? Sign up now
          <v-icon icon="mdi-chevron-right"></v-icon>
        </a>
      </v-card-text>
    </v-card>
  </main>
</template>

<script>
import api from "../api";

export default {
  data() {
    return {
      username: "",
      password: "",
      visible: false,
    };
  },
  methods: {
    async login() {
      try {
        const response = await api.post("/login", {
          username: this.username,
          password: this.password,
        });
        localStorage.setItem("token", response.data.data.token); // เก็บ token ใน localStorage
        this.$router.push("/home");
      } catch (error) {
        console.error("Failed to log in:", error);
      }
    },
    goToRegister() {
      this.$router.push("/register");
    },
  },
};
</script>
