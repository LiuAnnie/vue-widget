<template>
  <div class="text-enum-question">
    <div class="options-container">
      <label v-for="option in question.options" :key="option" class="option-label">
        <input
          type="radio"
          :value="option"
          v-model="selectedOption"
          :name="'question-' + question.id"
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
      type: String,
      default: ''
    }
  },
  computed: {
    selectedOption: {
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
  gap: 8px;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.option-label:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.option-text {
  font-size: var(--body-size);
}

input[type="radio"] {
  margin: 0;
}
</style> 