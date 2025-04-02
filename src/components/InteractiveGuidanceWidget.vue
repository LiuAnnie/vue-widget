<template>
  <div class="guidance-widget" :style="widgetStyle">
    <div class="widget-header">
      <h2>Interactive Guidance</h2>
      <img :src="config.logo" alt="Logo" class="widget-logo" />
    </div>

    <div class="widget-content">
      <!-- Problem Description Section -->
      <div v-if="!problemDescription" class="problem-description">
        <h3>What problem are you trying to solve?</h3>
        <textarea
          v-model="userProblem"
          placeholder="Please describe your problem..."
          rows="4"
        ></textarea>
        <button @click="submitProblem" :disabled="!userProblem.trim()">
          Continue
        </button>
      </div>

      <!-- Questions Section -->
      <div v-else-if="currentQuestions.length > 0" class="questions-section">
        <div v-for="question in currentQuestions" :key="question.id" class="question-container">
          <h3>{{ question.text }}</h3>
          <component
            :is="getQuestionComponent(question.type)"
            :question="question"
            v-model="answers[question.id]"
          />
        </div>
        <button @click="submitAnswers" :disabled="!canSubmitAnswers">
          Submit Answers
        </button>
      </div>

      <!-- Answered Questions Section -->
      <div v-if="answeredQuestions.length > 0" class="answered-questions">
        <h3>Answered Questions</h3>
        <div v-for="question in answeredQuestions" :key="question.id" class="answered-question">
          <div class="question-header" @click="editAnswer(question)">
            <h4>{{ question.text }}</h4>
            <span class="edit-icon">✎</span>
          </div>
          <div v-if="question.isEditing" class="edit-answer">
            <component
              :is="getQuestionComponent(question.type)"
              :question="question"
              v-model="answers[question.id]"
            />
            <button @click="saveAnswer(question)">Save</button>
            <button @click="cancelEdit(question)">Cancel</button>
          </div>
          <div v-else class="answer-display">
            {{ formatAnswer(answers[question.id]) }}
          </div>
        </div>
      </div>

      <!-- Solution Section -->
      <div v-if="solution" class="solution-section">
        <h3>Solution</h3>
        <p>{{ solution }}</p>
        <div class="feedback-section">
          <h4>Was this solution helpful?</h4>
          <div class="feedback-buttons">
            <button @click="submitFeedback(true)" :class="{ active: feedback === true }">
              Yes
            </button>
            <button @click="submitFeedback(false)" :class="{ active: feedback === false }">
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TextEnumQuestion from './questions/TextEnumQuestion.vue'
import ImageEnumQuestion from './questions/ImageEnumQuestion.vue'
import TextBoxQuestion from './questions/TextBoxQuestion.vue'
import NumericalQuestion from './questions/NumericalQuestion.vue'
import { mockDataService } from '../services/mockDataService'

export default {
  name: 'InteractiveGuidanceWidget',
  components: {
    TextEnumQuestion,
    ImageEnumQuestion,
    TextBoxQuestion,
    NumericalQuestion
  },
  props: {
    config: {
      type: Object,
      default: () => ({
        logo: '/default-logo.png',
        colors: {
          primary: '#4CAF50',
          secondary: '#2196F3',
          background: '#ffffff',
          text: '#333333'
        },
        fonts: {
          primary: 'Arial, sans-serif',
          sizes: {
            heading: '24px',
            subheading: '18px',
            body: '16px'
          }
        }
      })
    }
  },
  data() {
    return {
      userProblem: '',
      problemDescription: '',
      currentQuestions: [],
      answeredQuestions: [],
      answers: {},
      solution: null,
      feedback: null
    }
  },
  computed: {
    widgetStyle() {
      return {
        '--primary-color': this.config.colors.primary,
        '--secondary-color': this.config.colors.secondary,
        '--background-color': this.config.colors.background,
        '--text-color': this.config.colors.text,
        '--font-family': this.config.fonts.primary,
        '--heading-size': this.config.fonts.sizes.heading,
        '--subheading-size': this.config.fonts.sizes.subheading,
        '--body-size': this.config.fonts.sizes.body
      }
    },
    canSubmitAnswers() {
      return this.currentQuestions.every(q => this.answers[q.id] !== undefined)
    }
  },
  methods: {
    async submitProblem() {
      this.problemDescription = this.userProblem
      await this.fetchQuestions()
    },
    async fetchQuestions() {
      try {
        this.currentQuestions = await mockDataService.getQuestions(this.problemDescription)
      } catch (error) {
        console.error('Error fetching questions:', error)
        // Handle error appropriately
      }
    },
    getQuestionComponent(type) {
      const components = {
        'text-enum': 'TextEnumQuestion',
        'image-enum': 'ImageEnumQuestion',
        'text-box': 'TextBoxQuestion',
        'numerical': 'NumericalQuestion'
      }
      return components[type] || 'TextBoxQuestion'
    },
    async submitAnswers() {
      this.answeredQuestions.push(...this.currentQuestions)
      this.currentQuestions = []
      await this.fetchSolution()
    },
    async fetchSolution() {
      try {
        this.solution = await mockDataService.getSolution(this.answers)
      } catch (error) {
        console.error('Error fetching solution:', error)
        // Handle error appropriately
      }
    },
    editAnswer(question) {
      question.isEditing = true
    },
    async saveAnswer(question) {
      question.isEditing = false
      await this.fetchSolution()
    },
    cancelEdit(question) {
      question.isEditing = false
    },
    formatAnswer(answer) {
      if (Array.isArray(answer)) return answer.join(', ')
      return answer
    },
    async submitFeedback(isHelpful) {
      this.feedback = isHelpful
      try {
        await mockDataService.submitFeedback(isHelpful)
      } catch (error) {
        console.error('Error submitting feedback:', error)
        // Handle error appropriately
      }
    }
  }
}
</script>

<style scoped>
.guidance-widget {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: var(--font-family);
  color: var(--text-color);
  background-color: var(--background-color);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.widget-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.widget-logo {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.widget-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.question-container {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.answered-questions {
  margin-top: 20px;
}

.answered-question {
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 4px;
}

.question-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.edit-icon {
  color: var(--secondary-color);
}

.feedback-section {
  margin-top: 20px;
  text-align: center;
}

.feedback-buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 10px;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: var(--primary-color);
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

button.active {
  background-color: var(--secondary-color);
}

textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin: 10px 0;
}

@media (max-width: 600px) {
  .guidance-widget {
    margin: 10px;
    padding: 15px;
  }
}
</style> 