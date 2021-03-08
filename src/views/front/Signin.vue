<template>
  <form class="form-signin text-center mt-4" @submit.prevent="signin()">
    <img class="my-4 rounded-circle" src="@/assets/images/Chin.png" alt="" width="125" height="125">
    <h1 class="h3 mb-3 font-weight-normal">後台管理</h1>
    <label for="inputEmail" class="sr-only">Email address</label>
    <input type="email" id="inputEmail" class="form-control" placeholder="Email address"
    required autofocus
    v-model="user.username">
    <label for="inputPassword" class="sr-only">Password</label>
    <input type="password" id="inputPassword" class="form-control" placeholder="Password" required
    v-model="user.password">
    <div class="checkbox mb-3">
      <label>
        <input type="checkbox" value="remember-me"> Remember me
      </label>
    </div>
    <button class="btn btn-lg btn-primary btn-block" type="submit">登入</button>
    <p class="mt-5 mb-3 text-muted">&copy; 2017-2020</p>
  </form>
</template>

<script>
export default {
  name: 'Signin',
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    signin() {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}admin/signin`;

      vm.$http.post(api, vm.user).then((response) => {
        if (response.data.success) {
          document.cookie = `Hextoken=${response.data.token}; expires=${new Date()}`;
          vm.$router.push('/admin/products_list');
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  html, body {
    height: 100%;
  }

  body {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    padding-top: 40px;
    padding-bottom: 40px;
    background-color: #f5f5f5;
  }

  .form-signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
  }
  .form-signin .checkbox {
    font-weight: 400;
  }
  .form-signin .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
  }
  .form-signin .form-control:focus {
    z-index: 2;
  }
  .form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
  .form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
</style>
