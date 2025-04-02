<template>
  <div class="text-box-question">
    <textarea
      v-model="textValue"
      :placeholder="question.placeholder || 'Enter your answer here...'"
      :rows="question.rows || 4"
      class="text-input"
    ></textarea>
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
    }
  },
  computed: {
    textValue: {
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

.text-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: var(--body-size);
  font-family: var(--font-family);
  resize: vertical;
  min-height: 100px;
  transition: border-color 0.2s;
}

.text-input:focus {
  outline: none;
  border-color: var(--primary-color);
}

.text-input::placeholder {
  color: #999;
}
</style> 