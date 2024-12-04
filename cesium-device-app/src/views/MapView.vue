<template>
    <div>
      <h1>设备位置地图</h1>
      <CesiumMap />
    </div>
  </template>
  
  <script>
  import CesiumMap from '@/components/CesiumMap.vue';
  
  export default {
    components: {
      CesiumMap,
    },
  };
  </script>
  