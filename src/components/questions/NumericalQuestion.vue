<template>
  <div class="numerical-question">
    <div class="input-container">
      <div class="description" v-if="question.description">
        {{ question.description }}
      </div>
      <input
        type="text"
        v-model="inputValue"
        @input="handleInput"
        :placeholder="question.placeholder || `Enter a number (${question.min}-${question.max})`"
        class="number-input"
        :class="{ 'dark-mode': isDarkMode, 'has-error': showError }"
      />
      <!-- <div class="range-info" v-if="question.min !== undefined || question.max !== undefined">
        <span v-if="question.min !== undefined">Min: {{ question.min }}</span>
        <span v-if="question.max !== undefined">Max: {{ question.max }}</span>
      </div> -->
      <!-- <div class="error-message" v-if="showError">
        {{ errorMessage }}
      </div> -->
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
  data() {
    return {
      inputValue: this.modelValue?.toString() ?? ''
    }
  },
  watch: {
    modelValue(newVal) {
      this.inputValue = newVal?.toString() ?? ''
    }
  },
  computed: {
    showError() {
      const value = Number(this.inputValue)
      if (this.inputValue === '' || isNaN(value)) return false

      const min = this.question.min
      const max = this.question.max
      if (min !== undefined && value < min) return true
      if (max !== undefined && value > max) return true

      return false
    },
    errorMessage() {
      const value = Number(this.inputValue)
      const min = this.question.min
      const max = this.question.max
      
      if (min !== undefined && value < min) {
        // return `Value must be at least ${min}.`
        // The following line is for the mock data service.
        return 'An employee ID is an 8-digit number that begins with a non-zero digit.'
      }
      if (max !== undefined && value > max) {
        return `Value must be at most ${max}.`
      }
      return `Value must be between ${min} and ${max}.`
    }
  },
  methods: {
    handleInput(event) {
      const raw = event.target.value
      // Only allow digits
      const digitsOnly = raw.replace(/\D/g, '').slice(0, 8)
      this.inputValue = digitsOnly

      const numericValue = Number(digitsOnly)

      // Only emit valid numbers within range
      if (
        digitsOnly !== '' &&
        !isNaN(numericValue) &&
        (this.question.min === undefined || numericValue >= this.question.min) &&
        (this.question.max === undefined || numericValue <= this.question.max)
      ) {
        this.$emit('update:modelValue', numericValue)
      } else {
        this.$emit('update:modelValue', null)
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
  background-color: white;
  transition: border-color 0.2s ease, background-color 0.3s ease, color 0.3s ease;
}

.number-input.dark-mode {
  background-color: #333;
  color: #f5f5f5;
  border-color: #89AAE6;
}

.number-input.has-error {
  border-color: #ff3333;
  border-width: 2px;
  box-shadow: 0 0 5px rgba(255, 51, 51, 0.3);
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

.error-message {
  color: #ff3333;
  font-size: 14px;
  font-weight: 500;
  margin-top: 4px;
}

.guiding-message {
  color: #006eff;
  font-size: 14px;
  font-weight: 500;
  margin-top: 4px;
}

.description {
  font-size: 14px;
  color: var(--text-color);
  opacity: 0.8;
  margin-bottom: 8px;
  font-style: italic;
}

@media (max-width: 480px) {
  .number-input {
    padding: 10px;
  }
}
</style>
