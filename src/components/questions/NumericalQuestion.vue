<template>
  <div class="numerical-question">
    <div class="input-container">
      <input
        type="number"
        v-model="numericValue"
        :min="question.min"
        :max="question.max"
        :step="question.step || 1"
        :placeholder="question.placeholder || 'Enter a number'"
        class="number-input"
        @input="validateInput"
      />
      <span v-if="error" class="error-message">{{ error }}</span>
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
      default: ''
    }
  },
  data() {
    return {
      error: null
    }
  },
  computed: {
    numericValue: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    }
  },
  methods: {
    validateInput(event) {
      const value = event.target.value
      if (value === '') {
        this.error = null
        return
      }

      const num = Number(value)
      
      if (isNaN(num)) {
        this.error = 'Please enter a valid number'
        return
      }

      if (this.question.min !== undefined && num < this.question.min) {
        this.error = `Value must be at least ${this.question.min}`
        return
      }

      if (this.question.max !== undefined && num > this.question.max) {
        this.error = `Value must be at most ${this.question.max}`
        return
      }

      this.error = null
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
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: var(--body-size);
  font-family: var(--font-family);
  transition: border-color 0.2s;
}

.number-input:focus {
  outline: none;
  border-color: var(--primary-color);
}

.number-input::-webkit-inner-spin-button,
.number-input::-webkit-outer-spin-button {
  opacity: 1;
}

.error-message {
  color: #dc3545;
  font-size: 14px;
  margin-top: 4px;
}
</style> 