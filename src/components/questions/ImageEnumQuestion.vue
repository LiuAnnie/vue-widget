<template>
  <div class="image-enum-question">
    <div class="image-grid">
      <div
        v-for="option in question.options"
        :key="option.value"
        class="image-option"
        :class="{ selected: selectedOption === option.value }"
        @click="selectOption(option.value)"
      >
        <img :src="option.imageUrl" :alt="option.label" />
        <span class="option-label">{{ option.label }}</span>
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
  },
  methods: {
    selectOption(value) {
      this.selectedOption = value
    }
  }
}
</script>

<style scoped>
.image-enum-question {
  margin-top: 10px;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  padding: 10px 0;
}

.image-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 10px;
  border: 2px solid transparent;
  border-radius: 8px;
  transition: all 0.2s;
}

.image-option:hover {
  border-color: var(--secondary-color);
  background-color: rgba(0, 0, 0, 0.05);
}

.image-option.selected {
  border-color: var(--primary-color);
  background-color: rgba(76, 175, 80, 0.1);
}

.image-option img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
}

.option-label {
  font-size: var(--body-size);
  text-align: center;
}

@media (max-width: 600px) {
  .image-grid {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 15px;
  }
}
</style> 