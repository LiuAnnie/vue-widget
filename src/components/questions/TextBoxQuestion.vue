<template>
  <div class="text-box-question">
    <div class="input-container">
      <div class="description" v-if="question.description">
        {{ question.description }}
      </div>
      <textarea
        v-model="localValue"
        :placeholder="question.placeholder || 'Enter your answer...'"
        :rows="question.rows || 4"
        class="text-input"
        :class="{ 'dark-mode': isDarkMode }"
      ></textarea>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextBoxQuestion',
  props: {
    question: {
      type: Object,
      required: true
    },
    modelValue: {
      type: String,
      default: ''
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
.text-box-question {
  margin-top: 10px;
}

.input-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.description {
  font-size: 14px;
  color: var(--text-color);
  opacity: 0.8;
  margin-bottom: 8px;
  font-style: italic;
}

.text-input {
  width: 100%;
  padding: 12px;
  border: 1px solid var(--secondary-color, #89AAE6);
  border-radius: 4px;
  font-family: var(--font-family, Arial, sans-serif);
  font-size: var(--body-size, 16px);
  color: var(--text-color, #2E3532);
  resize: vertical;
  min-height: 100px;
  transition: border-color 0.2s ease, background-color 0.3s ease, color 0.3s ease;
  background-color: white;
}

.text-input.dark-mode {
  background-color: #333;
  color: #f5f5f5;
  border-color: #89AAE6;
}

.text-input:focus {
  outline: none;
  border-color: var(--primary-color, #470FF4);
  border-width: 2px;
  box-shadow: 0 0 8px rgba(71, 15, 244, 0.4);
}

.text-input.dark-mode:focus {
  border-width: 2px;
  box-shadow: 0 0 12px rgba(71, 15, 244, 0.6);
}

.text-input::placeholder {
  color: rgba(46, 53, 50, 0.5);
}

.text-input.dark-mode::placeholder {
  color: rgba(245, 245, 245, 0.5);
}

@media (max-width: 480px) {
  .text-input {
    padding: 10px;
    min-height: 80px;
  }
}
</style> 