<template>
  <div class="image-enum-question">
    <div class="options-grid">
      <div
        v-for="option in question.options"
        :key="option.value"
        class="option-card"
        :class="{ 
          selected: modelValue === option.value,
          'dark-mode': isDarkMode
        }"
        @click="selectOption(option.value)"
      >
        <img :src="option.imageUrl" :alt="option.label" class="option-image" />
        <div class="option-label">{{ option.label }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageEnumQuestion',
  props: {
    question: {
      type: Object,
      required: true
    },
    modelValue: {
      type: String,
      default: null
    },
    isDarkMode: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    selectOption(value) {
      this.$emit('update:modelValue', value)
    }
  }
}
</script>

<style scoped>
.image-enum-question {
  margin-top: 10px;
}

.options-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 15px;
}

.option-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  border: 1px solid var(--secondary-color, #89AAE6);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: white;
}

.option-card.dark-mode {
  background-color: #2a2a2a;
  border-color: #89AAE6;
}

.option-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.option-card.dark-mode:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.option-card.selected {
  border-color: var(--primary-color, #470FF4);
  background-color: var(--background-color, #EBFFED);
  border-width: 2px;
  box-shadow: 0 0 8px rgba(71, 15, 244, 0.4);
  transform: translateY(-2px);
}

.option-card.dark-mode.selected {
  border-color: #470FF4;
  background-color: #333;
  border-width: 2px;
  box-shadow: 0 0 12px rgba(71, 15, 244, 0.6);
  transform: translateY(-2px);
}

.option-image {
  width: 100%;
  height: auto;
  max-height: 120px;
  object-fit: contain;
  margin-bottom: 10px;
}

.option-label {
  font-size: var(--body-size, 16px);
  color: var(--text-color, #2E3532);
  text-align: center;
  font-weight: 500;
}

.option-card.dark-mode .option-label {
  color: #f5f5f5;
}

@media (max-width: 480px) {
  .options-grid {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 10px;
  }
  
  .option-card {
    padding: 10px;
  }
  
  .option-image {
    max-height: 100px;
  }
}
</style> 