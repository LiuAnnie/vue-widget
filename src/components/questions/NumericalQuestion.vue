<template>
  <div class="numerical-question">
    <div class="input-container">
      <input
        type="number"
        v-model="localValue"
        :min="question.min"
        :max="question.max"
        :placeholder="question.placeholder || 'Enter a number'"
        class="number-input"
        :class="{ 'dark-mode': isDarkMode }"
      />
      <div class="range-info" v-if="question.min !== undefined || question.max !== undefined">
        <span v-if="question.min !== undefined">Min: {{ question.min }}</span>
        <span v-if="question.max !== undefined">Max: {{ question.max }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NumericalQuestion',
  props: {
    question: {
      type: Object,
      required: true
    },
    modelValue: {
      type: [Number, String],
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
        // Convert to number if possible, otherwise keep as string
        const numValue = value === '' ? null : Number(value)
        this.$emit('update:modelValue', numValue)
      }
    }
  }
}
</script>

<style scoped>
.numerical-question {
  margin-top: 10px;
}

.input-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.number-input {
  width: 100%;
  padding: 12px;
  border: 1px solid var(--secondary-color, #89AAE6);
  border-radius: 4px;
  font-family: var(--font-family, Arial, sans-serif);
  font-size: var(--body-size, 16px);
  color: var(--text-color, #2E3532);
  transition: border-color 0.2s ease, background-color 0.3s ease, color 0.3s ease;
  background-color: white;
}

.number-input.dark-mode {
  background-color: #333;
  color: #f5f5f5;
  border-color: #89AAE6;
}

.number-input:focus {
  outline: none;
  border-color: var(--primary-color, #470FF4);
  border-width: 2px;
  box-shadow: 0 0 8px rgba(71, 15, 244, 0.4);
}

.number-input.dark-mode:focus {
  border-width: 2px;
  box-shadow: 0 0 12px rgba(71, 15, 244, 0.6);
}

.number-input::placeholder {
  color: rgba(46, 53, 50, 0.5);
}

.number-input.dark-mode::placeholder {
  color: rgba(245, 245, 245, 0.5);
}

.range-info {
  display: flex;
  justify-content: space-between;
  font-size: calc(var(--body-size, 16px) * 0.9);
  color: var(--text-color, #2E3532);
  opacity: 0.8;
}

.dark-mode + .range-info {
  color: #f5f5f5;
}

@media (max-width: 480px) {
  .number-input {
    padding: 10px;
  }
}
</style> 