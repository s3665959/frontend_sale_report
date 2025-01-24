<template>
    <div class="home">
      <div class="container">
        <div class="row align-items-center text-center">
          <div class="col-md-12">
            <h1 class="display-4 my-4">Nira Sales Report</h1>
            <p class="lead">
              Manage daily sales efficiently develop by APGEN
            </p>
            <router-link to="/submit-sale" class="btn btn-primary btn-lg mt-3">
              เริ่มใช้งาน
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Home',
  };
  </script>
  
  <style scoped>
  .home {
    padding: 50px 0;
    background-color: #f8f9fa;
  }
  
  h1 {
    color: #343a40;
  }
  
  p {
    color: #6c757d;
  }
  </style>
  