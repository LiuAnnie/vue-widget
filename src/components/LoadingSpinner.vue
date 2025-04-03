<template>
  <div class="loading-spinner" :class="{ 'dark-mode': isDarkMode }">
    <div class="spinner"></div>
    <div class="loading-text">Processing your request...</div>
  </div>
</template>

<script>
export default {
  name: 'LoadingSpinner',
  props: {
    isDarkMode: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  gap: 1rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--secondary-color, #89AAE6);
  border-top: 3px solid var(--primary-color, #470FF4);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-text {
  color: var(--text-color, #2E3532);
  font-size: var(--body-size, 16px);
  font-family: var(--font-family, Arial, sans-serif);
}

.dark-mode .loading-text {
  color: #f5f5f5;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 480px) {
  .spinner {
    width: 32px;
    height: 32px;
    border-width: 2.5px;
  }
  
  .loading-text {
    font-size: calc(var(--body-size, 16px) * 0.9);
  }
}
</style> 