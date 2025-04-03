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
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  width: 100%;
}

.option-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border: 2px solid var(--secondary-color);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: white;
  width: 100%;
  box-sizing: border-box;
}

.option-card:hover {
  border-color: var(--primary-color);
  box-shadow: 0 2px 8px rgba(71, 15, 244, 0.1);
}

.option-card.selected {
  border-color: var(--primary-color);
  border-width: 2px;
  box-shadow: 0 4px 12px rgba(71, 15, 244, 0.2);
  transform: translateY(-2px);
}

.option-image {
  width: 100%;
  height: auto;
  object-fit: contain;
  margin-bottom: 0.75rem;
  border-radius: 4px;
}

.option-label {
  text-align: center;
  font-size: clamp(0.9rem, 2.5vw, 1.1rem);
  color: var(--text-color);
  margin: 0;
  width: 100%;
}

.dark-mode .option-card {
  background-color: #d6d6d6;
  border-color: #89AAE6;
}

.dark-mode .option-card:hover {
  border-color: var(--primary-color);
  box-shadow: 0 2px 8px rgba(71, 15, 244, 0.2);
}

.dark-mode .option-card.selected {
  border-color: var(--primary-color);
  border-width: 2px;
  box-shadow: 0 4px 12px rgba(71, 15, 244, 0.3);
  transform: translateY(-2px);
}

.dark-mode .option-label {
  color: #333;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .image-options {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 0.75rem;
  }
}

@media (max-width: 480px) {
  .image-options {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 0.5rem;
  }
}
</style> 