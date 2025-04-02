<script>
import InteractiveGuidanceWidget from './components/InteractiveGuidanceWidget.vue'

export default {
  name: 'App',
  components: {
    InteractiveGuidanceWidget
  },
  data() {
    return {
      widgetConfig: {
        logo: '/logo.svg',
        colors: {
          primary: '#4CAF50',
          secondary: '#2196F3',
          background: '#ffffff',
          text: '#333333'
        },
        fonts: {
          primary: 'Arial, sans-serif',
          sizes: {
            heading: '24px',
            subheading: '18px',
            body: '16px'
          }
        }
      }
    }
  }
}
</script>

<template>
  <div class="app">
    <InteractiveGuidanceWidget :config="widgetConfig" />
  </div>
</template>

<style>
.app {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #f5f5f5;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
}
</style>
