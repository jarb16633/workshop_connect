<template>
  <div>
    <v-card flat class="mx-auto" height="150" max-width="200"></v-card>
    <v-card
      class="mx-auto pa-12 pb-8"
      title="Log in"
      max-width="448"
      rounded="lg"
      outlined
    >
      <v-card-text class="font-weight-medium text-h5 text-center"
        ><v-icon>mdi-account-plus-outline</v-icon> Register
      </v-card-text>
      <v-text-field
        v-model="username"
        name="username"
        id="usernameId"
        density="compact"
        placeholder="Username"
        prepend-inner-icon="mdi mdi-account"
        variant="outlined"
        required
      ></v-text-field>

      <v-text-field
        v-model="password"
        name="password"
        id="passwordId"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="Enter your password"
        prepend-inner-icon="mdi mdi-lock"
        variant="outlined"
        @click:append-inner="visible = !visible"
        required
      ></v-text-field>
      <v-btn
        class="mb-8"
        color="blue"
        size="large"
        variant="tonal"
        type="submit"
        dark
        block
        @click="register"
        >register</v-btn
      >
      <v-card-text class="text-center">
        <a
          class="text-blue text-decoration-none"
          rel="noopener noreferrer"
          target="_blank"
          @click="goToLogin"
          >Already have an account? Log in.<v-icon
            icon="mdi-chevron-right"
          ></v-icon
        ></a>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import api from "@/api";

export default {
  data() {
    return {
      username: "",
      password: "",
      visible: false,
    };
  },
  methods: {
    async register() {
      try {
        const response = await api.post("/register", {
          username: this.username,
          password: this.password,
        });
        console.log(response);
        this.$router.push("/login");
      } catch (error) {
        console.log("Failed to register:", error);
      }
    },
    goToLogin() {
      this.$router.push("/login");
    },
  },
};
</script>
