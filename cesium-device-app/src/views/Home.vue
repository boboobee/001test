<template>
    <div>
      <h1> </h1>
      <DeviceData />
    </div>
  </template>
  
  <script>
  import DeviceData from '@/components/DeviceData.vue';
  
  export default {
    components: {
      DeviceData,
    },
  };
  </script>
  
<style scoped>
h1 {
  position: absolute;
  top: 0px;
  left: 750px;

}

</style>