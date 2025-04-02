<template>
  <div class="guidance-widget" :class="{ 'dark-mode': isDarkMode }" :style="widgetStyle">
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
            :is-dark-mode="isDarkMode"
          />
        </div>
        <button @click="submitAnswers" :disabled="!canSubmitAnswers">
          Submit Answers
        </button>
      </div>

      <!-- Loading State -->
      <div v-else-if="isLoading" class="solution-container">
        <LoadingSpinner :is-dark-mode="isDarkMode" />
      </div>

      <!-- Solution Section -->
      <div v-else-if="solution" class="solution-section">
        <h3>Solution</h3>
        <p>{{ solution }}</p>
        
        <!-- Answered Questions Section -->
        <div class="answered-questions">
          <h4>Your Answers</h4>
          <div v-for="question in answeredQuestions" :key="question.id" class="answered-question">
            <div class="question-header" @click="editAnswer(question)">
              <h5>{{ question.text }}</h5>
              <span class="edit-icon">✎</span>
            </div>
            <div v-if="question.isEditing" class="edit-answer">
              <component
                :is="getQuestionComponent(question.type)"
                :question="question"
                v-model="answers[question.id]"
                :is-dark-mode="isDarkMode"
              />
              <div class="edit-buttons">
                <button @click="saveAnswer(question)">Save</button>
                <button @click="cancelEdit(question)">Cancel</button>
              </div>
            </div>
            <div v-else class="answer-display">
              {{ formatAnswer(answers[question.id]) }}
            </div>
          </div>
        </div>

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
        <button class="reset-button" @click="resetForm">Start Over</button>
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
import LoadingSpinner from './LoadingSpinner.vue'

export default {
  name: 'InteractiveGuidanceWidget',
  components: {
    TextEnumQuestion,
    ImageEnumQuestion,
    TextBoxQuestion,
    NumericalQuestion,
    LoadingSpinner
  },
  props: {
    config: {
      type: Object,
      default: () => ({
        logo: '/default-logo.png',
        colors: {
          primary: '#470FF4',
          secondary: '#89AAE6',
          background: '#EBFFED',
          text: '#2E3532',
          accent: '#2F242C'
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
      feedback: null,
      isDarkMode: false,
      showSolution: false,
      isLoading: false
    }
  },
  computed: {
    widgetStyle() {
      return {
        '--primary-color': this.config.colors.primary,
        '--secondary-color': this.config.colors.secondary,
        '--background-color': this.config.colors.background,
        '--text-color': this.config.colors.text,
        '--accent-color': this.config.colors.accent,
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
  mounted() {
    // Check for system dark mode preference
    this.checkDarkMode()
    
    // Listen for changes in system appearance
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', this.checkDarkMode)
    }
  },
  beforeUnmount() {
    // Clean up event listener
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', this.checkDarkMode)
    }
  },
  methods: {
    checkDarkMode() {
      this.isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    },
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
      this.isLoading = true
      this.answeredQuestions.push(...this.currentQuestions)
      this.currentQuestions = []
      
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500))
        this.solution = await mockDataService.getSolution(this.answers)
      } catch (error) {
        console.error('Error fetching solution:', error)
        this.solution = "Sorry, there was an error generating your solution. Please try again."
      } finally {
        this.isLoading = false
      }
    },
    editAnswer(question) {
      question.isEditing = true
    },
    async saveAnswer(question) {
      question.isEditing = false
      this.isLoading = true
      
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500))
        this.solution = await mockDataService.getSolution(this.answers)
      } catch (error) {
        console.error('Error fetching solution:', error)
        this.solution = "Sorry, there was an error generating your solution. Please try again."
      } finally {
        this.isLoading = false
      }
    },
    cancelEdit(question) {
      question.isEditing = false
    },
    formatAnswer(answer) {
      if (Array.isArray(answer)) return answer.join(', ')
      if (answer === null || answer === undefined) return 'Not answered'
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
    },
    resetForm() {
      this.answers = {}
      this.currentQuestions = []
      this.answeredQuestions = []
      this.solution = null
      this.feedback = null
      this.problemDescription = ''
      this.userProblem = ''
    }
  }
}
</script>

<style scoped>
.guidance-widget {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: var(--font-family);
  color: var(--text-color);
  background-color: var(--background-color);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.guidance-widget.dark-mode {
  background-color: #1a1a1a;
  color: #f5f5f5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.widget-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.widget-header h2 {
  font-size: var(--heading-size);
  margin: 0;
  color: var(--accent-color);
}

.dark-mode .widget-header h2 {
  color: #f5f5f5;
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
  border: 1px solid var(--secondary-color);
  border-radius: 4px;
  background-color: white;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.dark-mode .question-container {
  background-color: #2a2a2a;
  border-color: #89AAE6;
}

.question-container h3 {
  font-size: var(--subheading-size);
  margin-top: 0;
  margin-bottom: 15px;
  color: var(--accent-color);
}

.dark-mode .question-container h3 {
  color: #f5f5f5;
}

.answered-questions {
  margin: 2rem 0;
  padding: 1rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.dark-mode .answered-questions {
  background-color: #2a2a2a;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.answered-questions h4 {
  font-size: var(--subheading-size);
  margin-bottom: 1rem;
  color: var(--accent-color);
}

.dark-mode .answered-questions h4 {
  color: #f5f5f5;
}

.answered-question {
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: var(--background-color);
  border: 1px solid var(--secondary-color);
  border-radius: 4px;
  transition: all 0.3s ease;
}

.dark-mode .answered-question {
  background-color: #333;
  border-color: #89AAE6;
}

.question-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.question-header:hover {
  background-color: rgba(71, 15, 244, 0.1);
}

.dark-mode .question-header:hover {
  background-color: rgba(71, 15, 244, 0.2);
}

.question-header h5 {
  margin: 0;
  font-size: var(--body-size);
  color: var(--text-color);
}

.dark-mode .question-header h5 {
  color: #f5f5f5;
}

.edit-icon {
  color: var(--primary-color);
  font-size: 1.2rem;
}

.edit-answer {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--secondary-color);
}

.dark-mode .edit-answer {
  border-top-color: #89AAE6;
}

.edit-buttons {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.answer-display {
  padding: 0.5rem;
  color: var(--text-color);
  font-size: var(--body-size);
  background-color: rgba(71, 15, 244, 0.05);
  border-radius: 4px;
}

.dark-mode .answer-display {
  color: #f5f5f5;
  background-color: rgba(71, 15, 244, 0.1);
}

.solution-section {
  margin-top: 20px;
  padding: 15px;
  border: 1px solid var(--secondary-color);
  border-radius: 4px;
  background-color: white;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.dark-mode .solution-section {
  background-color: #2a2a2a;
  border-color: #89AAE6;
}

.solution-section h3 {
  font-size: var(--subheading-size);
  margin-bottom: 15px;
  color: var(--accent-color);
}

.dark-mode .solution-section h3 {
  color: #f5f5f5;
}

.solution-section p {
  white-space: pre-line;
  line-height: 1.5;
}

.feedback-section {
  margin-top: 20px;
  text-align: center;
}

.feedback-section h4 {
  font-size: var(--body-size);
  margin-bottom: 10px;
  color: var(--accent-color);
}

.dark-mode .feedback-section h4 {
  color: #f5f5f5;
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
  font-size: var(--body-size);
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.dark-mode button:disabled {
  background-color: #555;
}

button.active {
  background-color: var(--secondary-color);
}

textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid var(--secondary-color);
  border-radius: 4px;
  margin: 10px 0;
  font-family: var(--font-family);
  font-size: var(--body-size);
  resize: vertical;
  min-height: 100px;
  background-color: white;
  color: var(--text-color);
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}

.dark-mode textarea {
  background-color: #333;
  color: #f5f5f5;
  border-color: #89AAE6;
}

.dark-mode textarea::placeholder {
  color: rgba(245, 245, 245, 0.5);
}

/* Responsive styles */
@media (max-width: 768px) {
  .guidance-widget {
    max-width: 100%;
    margin: 10px;
    padding: 15px;
  }
  
  .widget-header h2 {
    font-size: calc(var(--heading-size) * 0.9);
  }
  
  .question-container h3,
  .answered-questions h4,
  .solution-section h3 {
    font-size: calc(var(--subheading-size) * 0.9);
  }
}

@media (max-width: 480px) {
  .guidance-widget {
    margin: 5px;
    padding: 10px;
  }
  
  .widget-header h2 {
    font-size: calc(var(--heading-size) * 0.8);
  }
  
  .question-container h3,
  .answered-questions h4,
  .solution-section h3 {
    font-size: calc(var(--subheading-size) * 0.8);
  }
  
  .question-container,
  .answered-question {
    padding: 10px;
  }
  
  button {
    padding: 6px 12px;
    font-size: calc(var(--body-size) * 0.9);
  }
  
  .edit-buttons {
    flex-direction: column;
  }
  
  .feedback-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .feedback-buttons button {
    width: 100%;
    max-width: 200px;
  }
}

.solution-container {
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
}

.dark-mode .solution-container {
  background-color: #2a2a2a;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.solution-title {
  color: var(--primary-color, #470FF4);
  font-size: var(--heading-size, 24px);
  margin-bottom: 1.5rem;
  font-family: var(--font-family, Arial, sans-serif);
}

.solution-content {
  color: var(--text-color, #2E3532);
  font-size: var(--body-size, 16px);
  line-height: 1.6;
  margin-bottom: 2rem;
  font-family: var(--font-family, Arial, sans-serif);
}

.dark-mode .solution-content {
  color: #f5f5f5;
}

.reset-button {
  background-color: var(--secondary-color, #89AAE6);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: var(--body-size, 16px);
  font-family: var(--font-family, Arial, sans-serif);
  transition: background-color 0.2s ease;
}

.reset-button:hover {
  background-color: var(--primary-color, #470FF4);
}

@media (max-width: 480px) {
  .solution-container {
    padding: 1.5rem;
  }
  
  .solution-title {
    font-size: calc(var(--heading-size, 24px) * 0.9);
  }
  
  .solution-content {
    font-size: calc(var(--body-size, 16px) * 0.9);
  }
}
</style> 