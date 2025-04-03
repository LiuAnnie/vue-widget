<template>
  <div class="guidance-widget" :class="{ 'dark-mode': isDarkMode }" :style="widgetStyle">
    <div class="widget-header">
      <h2>{{ headerText }}</h2>
      <img :src="config.logo" alt="Logo" class="widget-logo" />
    </div>

    <div class="widget-content">
      <!-- Problem Description Section -->
      <div v-if="!currentQuestions.length && !answeredQuestions.length" class="user-problem">
        <h3>What problem are you trying to solve?</h3>
        <textarea
          v-model="userProblem"
          placeholder="Describe your problem here..."
          @input="handleUserProblemInput"
        ></textarea>
        <button @click="startQuestions" :disabled="!userProblem.trim()">
          Start Questions
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
      <div v-if="solution && showSolution" class="solution-section">
        <h3>Here's our recommended solution:</h3>
        <p>{{ solution }}</p>
        
        <!-- Your Answers Section -->
        <div class="answered-questions">
          <h4>Your Answers</h4>
          <div v-for="(answer, index) in answeredQuestions" :key="index" class="answered-question">
            <div class="question-header">
              <h5>{{ answer.question }}</h5>
              <span class="edit-icon" @click="editAnswer(index)">✎</span>
            </div>
            <div v-if="answer.isEditing" class="edit-answer">
              <component
                :is="getQuestionComponent(answer.type)"
                :question="{ 
                  id: answer.id, 
                  type: answer.type, 
                  text: answer.question,
                  options: answer.options,
                  placeholder: answer.placeholder,
                  min: answer.min,
                  max: answer.max
                }"
                v-model="answers[answer.id]"
                :is-dark-mode="isDarkMode"
              />
              <div class="edit-buttons">
                <button @click="cancelEdit(answer)">Cancel</button>
                <button @click="saveAnswer(answer)">Save</button>
              </div>
            </div>
            <div v-else class="answer-display">{{ answer.answer }}</div>
          </div>
        </div>

        <!-- Feedback and Reset Buttons -->
        <div class="feedback-section">
          <h4>Was this solution helpful?</h4>
          <div class="feedback-buttons">
            <button @click="submitFeedback(true)">Yes</button>
            <button @click="submitFeedback(false)">No</button>
          </div>
          <button @click="resetWidget" class="reset-button">Start Over</button>
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
    },
    isDarkMode: {
      type: Boolean,
      default: false
    },
    headerText: {
      type: String,
      default: 'Aidea'
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
      showSolution: false,
      isLoading: false,
      isDarkMode: false
    }
  },
  computed: {
    widgetStyle() {
      return {
        '--primary-color': this.config.colors.primary,
        '--secondary-color': this.config.colors.secondary,
        '--text-color': this.config.colors.text,
        '--accent-color': this.config.colors.accent,
        '--font-primary': this.config.fonts.primary,
        '--heading-size': this.config.fonts.sizes.heading,
        '--subheading-size': this.config.fonts.sizes.subheading,
        '--body-size': this.config.fonts.sizes.body,
        '--background-color': this.isDarkMode ? '#1a1a1a' : this.config.colors.background
      }
    },
    canSubmitAnswers() {
      return this.currentQuestions.every(q => this.answers[q.id] !== undefined)
    }
  },
  mounted() {
    // Set initial dark mode based on system preference
    this.isDarkMode = this.checkSystemDarkMode()
    
    // Listen for system appearance changes
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        this.isDarkMode = e.matches
      })
    }
  },
  beforeUnmount() {
    // Clean up event listener
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', this.checkSystemDarkMode)
    }
  },
  methods: {
    checkSystemDarkMode() {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
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
      // Store both question and answer for each answered question
      this.answeredQuestions = this.currentQuestions.map(question => ({
        question: question.text,
        answer: this.answers[question.id],
        id: question.id,
        type: question.type,
        options: question.options,
        isEditing: false
      }))
      this.currentQuestions = []
      
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500))
        this.solution = await mockDataService.getSolution(this.answers)
        this.showSolution = true
      } catch (error) {
        console.error('Error fetching solution:', error)
        this.solution = "Sorry, there was an error generating your solution. Please try again."
        this.showSolution = true
      } finally {
        this.isLoading = false
      }
    },
    editAnswer(index) {
      // Reset all other editing states
      this.answeredQuestions.forEach(q => q.isEditing = false)
      // Set current answer to editing
      this.answeredQuestions[index].isEditing = true
      // Set the current answer in the answers object
      this.answers[this.answeredQuestions[index].id] = this.answeredQuestions[index].answer
    },
    async saveAnswer(answer) {
      answer.isEditing = false
      // Update the answer in the answeredQuestions array
      answer.answer = this.answers[answer.id]
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
    cancelEdit(answer) {
      answer.isEditing = false
      // Reset the answer to its original value
      this.answers[answer.id] = answer.answer
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
    resetWidget() {
      this.answers = {}
      this.currentQuestions = []
      this.answeredQuestions = []
      this.solution = null
      this.feedback = null
      this.problemDescription = ''
      this.userProblem = ''
      this.showSolution = false
    },
    startQuestions() {
      this.submitProblem()
    },
    handleUserProblemInput() {
      // Implementation of handleUserProblemInput method
    }
  }
}
</script>

<style scoped>
.guidance-widget {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 1.5rem;
  box-sizing: border-box;
  background-color: var(--background-color);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  text-align: left;
  color: var(--text-color);
}

.dark-mode .guidance-widget {
  background-color: #1a1a1a;
  color: #f5f5f5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.widget-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: nowrap;
  gap: 1rem;
  position: relative;
  padding-right: 140px;
  text-align: left;
}

.widget-header h2 {
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  margin: 0;
  color: var(--accent-color);
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 1rem;
  text-align: left;
}

.dark-mode .widget-header h2 {
  color: #f5f5f5;
}

.widget-logo {
  max-width: 120px;
  height: auto;
  object-fit: contain;
  flex-shrink: 0;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

.widget-content {
  width: 100%;
  text-align: left;
  color: inherit;
}

.question-container {
  width: 100%;
  margin-bottom: 1.5rem;
  padding: 1.25rem;
  border: 1px solid var(--secondary-color);
  border-radius: 4px;
  background-color: white;
  box-sizing: border-box;
  text-align: left;
  color: var(--text-color);
}

.dark-mode .question-container {
  background-color: #2a2a2a;
  border-color: #89AAE6;
  color: #f5f5f5;
}

.question-container h3 {
  font-size: clamp(1.1rem, 3vw, 1.5rem);
  margin-top: 0;
  margin-bottom: 1rem;
  color: var(--accent-color);
  text-align: left;
}

.dark-mode .question-container h3 {
  color: #f5f5f5;
}

.answered-questions {
  width: 100%;
  margin: 1.5rem 0;
  padding: 1.25rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  text-align: left;
  color: var(--text-color);
}

.dark-mode .answered-questions {
  background-color: #2a2a2a;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  color: #f5f5f5;
}

.answered-questions h4 {
  font-size: clamp(1.1rem, 3vw, 1.5rem);
  margin-bottom: 1rem;
  color: var(--accent-color);
  text-align: left;
}

.dark-mode .answered-questions h4 {
  color: #f5f5f5;
}

.answered-question {
  width: 100%;
  margin-bottom: 0.75rem;
  padding: 0.75rem;
  background-color: var(--background-color);
  border: 1px solid var(--secondary-color);
  border-radius: 4px;
  box-sizing: border-box;
  text-align: left;
  color: var(--text-color);
}

.dark-mode .answered-question {
  background-color: #333;
  border-color: #89AAE6;
  color: #f5f5f5;
}

.question-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.question-header h5 {
  font-size: clamp(0.9rem, 2.5vw, 1.2rem);
  margin: 0;
  color: var(--text-color);
  text-align: left;
  flex: 1;
}

.dark-mode .question-header h5 {
  color: #f5f5f5;
}

.edit-icon {
  color: var(--primary-color);
  cursor: pointer;
  margin-left: 0.5rem;
  flex-shrink: 0;
}

.dark-mode .edit-icon {
  color: #89AAE6;
}

.answer-display {
  font-size: clamp(0.9rem, 2.5vw, 1.1rem);
  padding: 0.75rem;
  color: var(--text-color);
  background-color: rgba(71, 15, 244, 0.05);
  border-radius: 4px;
  text-align: left;
}

.dark-mode .answer-display {
  color: #f5f5f5;
  background-color: rgba(71, 15, 244, 0.1);
}

.solution-section {
  width: 100%;
  margin-top: 1.5rem;
  padding: 1.25rem;
  border: 1px solid var(--secondary-color);
  border-radius: 4px;
  background-color: white;
  box-sizing: border-box;
  text-align: left;
  color: var(--text-color);
}

.dark-mode .solution-section {
  background-color: #2a2a2a;
  border-color: #89AAE6;
  color: #f5f5f5;
}

.solution-section h3 {
  font-size: clamp(1.1rem, 3vw, 1.5rem);
  margin-bottom: 1rem;
  color: var(--accent-color);
  text-align: left;
}

.dark-mode .solution-section h3 {
  color: #f5f5f5;
}

.solution-section p {
  font-size: clamp(0.9rem, 2.5vw, 1.1rem);
  line-height: 1.6;
  white-space: pre-line;
  text-align: left;
}

.dark-mode .solution-section p {
  color: #f5f5f5;
}

.feedback-section {
  margin-top: 1.5rem;
  text-align: left;
}

.feedback-section h4 {
  font-size: clamp(0.9rem, 2.5vw, 1.1rem);
  margin-bottom: 1rem;
  color: var(--accent-color);
  text-align: left;
}

.dark-mode .feedback-section h4 {
  color: #f5f5f5;
}

.feedback-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  justify-content: flex-start;
}

/* Base button styles */
button {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: clamp(0.5rem, 1vw, 0.75rem) clamp(1rem, 2vw, 1.5rem);
  border-radius: 4px;
  cursor: pointer;
  font-size: clamp(0.875rem, 1.5vw, 1rem);
  font-family: var(--font-primary);
  transition: all 0.3s ease;
  width: auto;
  min-width: clamp(100px, 15vw, 150px);
  margin-left: auto;
  display: block;
}

/* Edit buttons specific styles */
.edit-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1rem;
}

.edit-buttons button {
  min-width: 80px;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  margin-left: 0;
}

.edit-buttons button:first-child {
  background-color: transparent;
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
}

.edit-buttons button:last-child {
  background-color: var(--primary-color);
  color: white;
  border: none;
}

/* Remove duplicate button styles */
.edit-buttons button,
.feedback-buttons button,
.reset-button {
  min-width: 80px;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
}

button:hover {
  background-color: var(--secondary-color);
  transform: translateY(-1px);
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
  transform: none;
}

.dark-mode button {
  background-color: var(--primary-color);
  color: white;
}

.dark-mode button:hover {
  background-color: var(--secondary-color);
}

.dark-mode button:disabled {
  background-color: #666;
}

textarea {
  width: 100%;
  padding: 1rem;
  font-size: clamp(0.9rem, 2.5vw, 1.1rem);
  font-family: var(--font-primary);
  border: 1px solid var(--secondary-color);
  border-radius: 4px;
  margin: 0.75rem 0;
  resize: vertical;
  min-height: 100px;
  box-sizing: border-box;
  text-align: left;
  color: var(--text-color);
  background-color: white;
}

.dark-mode textarea {
  background-color: #333;
  border-color: #89AAE6;
  color: #f5f5f5;
  font-family: var(--font-primary);
}

.dark-mode textarea::placeholder {
  color: rgba(245, 245, 245, 0.5);
  font-family: var(--font-primary);
}

/* Add styles for input elements */
input {
  font-family: var(--font-primary);
}

.dark-mode input {
  font-family: var(--font-primary);
}

.dark-mode input::placeholder {
  font-family: var(--font-primary);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .guidance-widget {
    padding: 1.25rem;
  }
  
  .widget-header {
    padding-right: 120px;
  }
  
  .widget-logo {
    max-width: 100px;
  }
  
  .question-container,
  .answered-questions,
  .solution-section {
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .guidance-widget {
    padding: 1rem;
  }
  
  .widget-header {
    padding-right: 100px;
  }
  
  .widget-logo {
    max-width: 80px;
  }
  
  .question-container,
  .answered-questions,
  .solution-section {
    padding: 0.75rem;
  }
  
  button,
  .edit-buttons button,
  .feedback-buttons button,
  .reset-button {
    min-width: 100%;
    padding: 0.75rem 1rem;
    font-size: 0.875rem;
  }
}

.user-problem {
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid var(--secondary-color);
  margin-bottom: 1.5rem;
}

.user-problem h3 {
  color: var(--accent-color);
  margin-bottom: 1rem;
  font-size: clamp(1.1rem, 3vw, 1.5rem);
  text-align: left;
}

.dark-mode .user-problem {
  background-color: #2a2a2a;
  border-color: #89AAE6;
}

.dark-mode .user-problem h3 {
  color: #f5f5f5;
}

/* Update container styles to support right-aligned buttons */
.user-problem,
.question-container,
.answered-questions,
.solution-section,
.feedback-section {
  display: flex;
  flex-direction: column;
  position: relative;
}

/* Ensure buttons are right-aligned in their containers */
.user-problem button,
.question-container button,
.answered-questions button,
.solution-section button,
.feedback-section button {
  align-self: flex-end;
  margin-top: 1rem;
}

.edit-answer {
  margin-top: 1rem;
}

.edit-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1rem;
}

.edit-buttons button {
  min-width: 80px;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  margin-left: 0;
}

.edit-buttons button:first-child {
  background-color: transparent;
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
}

.edit-buttons button:last-child {
  background-color: var(--primary-color);
  color: white;
  border: none;
}

.edit-buttons button:hover {
  opacity: 0.9;
}

.edit-buttons button:first-child:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

/* Dark mode styles for edit buttons */
.dark-mode .edit-buttons button:first-child {
  color: var(--primary-color);
  border-color: var(--primary-color);
}

.dark-mode .edit-buttons button:last-child {
  background-color: var(--primary-color);
  color: white;
}

.dark-mode .edit-buttons button:first-child:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

/* Mobile styles */
@media (max-width: 480px) {
  .edit-buttons {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .edit-buttons button {
    width: 100%;
  }
}

/* Override specific button styles while maintaining consistent size */
.edit-buttons button,
.feedback-buttons button,
.reset-button {
  min-width: clamp(80px, 12vw, 120px);
  padding: clamp(0.5rem, 1vw, 0.75rem) clamp(1rem, 2vw, 1.5rem);
  font-size: clamp(0.875rem, 1.5vw, 1rem);
}
</style> 