<template>
  <div class="text-enum-question">
    <div class="options-container">
      <label
        v-for="option in question.options"
        :key="option"
        class="option-label"
        :class="{ 
          selected: modelValue === option,
          'dark-mode': isDarkMode
        }"
      >
        <input
          type="radio"
          :name="'question-' + question.id"
          :value="option"
          v-model="localValue"
          class="option-input"
        />
        <span class="option-text">{{ option }}</span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextEnumQuestion',
  props: {
    question: {
      type: Object,
      required: true
    },
    modelValue: {
      type: [String, Number],
      default: null
    },
    isDarkMode: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    localValue: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    }
  }
}
</script>

<style scoped>
.text-enum-question {
  margin-top: 10px;
}

.options-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.option-label {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  border: 1px solid var(--secondary-color, #89AAE6);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: white;
}

.option-label.dark-mode {
  background-color: #2a2a2a;
  border-color: #89AAE6;
}

.option-label:hover {
  background-color: var(--background-color, #EBFFED);
}

.option-label.dark-mode:hover {
  background-color: #333;
}

.option-label.selected {
  background-color: var(--background-color, #EBFFED);
  border-color: var(--primary-color, #470FF4);
  border-width: 2px;
  box-shadow: 0 0 8px rgba(71, 15, 244, 0.4);
  transform: translateY(-1px);
}

.option-label.dark-mode.selected {
  background-color: #333;
  border-color: var(--primary-color);
  border-width: 2px;
  box-shadow: 0 0 12px rgba(71, 15, 244, 0.6);
  transform: translateY(-1px);
}

.option-input {
  margin-right: 10px;
  accent-color: var(--primary-color, #470FF4);
}

.option-text {
  font-size: var(--body-size, 16px);
  color: var(--text-color, #2E3532);
}

.option-label.dark-mode .option-text {
  color: #f5f5f5;
}

@media (max-width: 480px) {
  .option-label {
    padding: 8px 12px;
  }
}
</style> 