<template>
  <div>
    <h1>APICON</h1>
    <h1>{{ apidata }}</h1>
    <v-btn color="success" @click="getData()">callapi</v-btn>
    <v-row>
      <v-col cols="3" v-for="(item,index) in apidata" :key="index">
        <v-card width="350">
          <v-img
          width="150"
          src=""
          ></v-img>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogedit: true,
      apidata: [],
      id: '',
      postdata: {
        username: '',
        password: '',
        name: '',
        address: '',
        moneypag: 1234,
      },
      postdefualt: {
        username: '',
        password: '',
        name: '',
        address: '',
        moneypag: 1234,
      }
    };
  },
  created() {
    this.getData();
  },
  computed:{
    savemode () {
      return this.id == '' ? 'New Item' : "Edit Item"
    }
  },
  methods: {
    newItem() {
      this.id = ''
      this.postdata = {...this.postdefault}
      this.dialogedit = true
    },
    editItem(item) {
      this.id = item._id
      this.postdata = {...item}
      this.dialogedit = true
    },
    closeItem(){
      this.id = ''
      this.postdata = {...this.postdefault}
      this.dialogedit = false
    },
    saveSelect() {
      if(this.id != ''){
        alert('Update')
      }else alert('Create')
    },
    getData() {
      this.axios.get("http://localhost:3000/api/v1", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      });
    },
  },
};
</script>
