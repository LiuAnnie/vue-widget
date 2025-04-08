<template>
  <div class="guidance-widget" :class="{ 'dark-mode': isDarkMode }">
    <div class="widget-header">
      <h2>{{ headerText }}</h2>
      <img :src="config.logo" alt="Logo" class="widget-logo" />
    </div>

    <div class="widget-content">
      <!-- Problem Description Section -->
      <div v-if="!currentQuestions.length && !answeredQuestions.length" class="user-problem">
        <h3>How can I help you?</h3>
        <textarea
          v-model="userProblem"
          placeholder="Describe your HR question or request..."
          @input="handleUserProblemInput"
        ></textarea>
        <button @click="startQuestions" :disabled="!userProblem.trim()">
          Continue
        </button>
      </div>

      <!-- Questions Section -->
      <div v-else-if="currentQuestions.length > 0" class="questions-section">
        <button class="back-button" @click="goBack">
          ←
        </button>
        <div class="question-container">
          <h3>{{ currentQuestions[currentQuestionIndex].text }}</h3>
          <component
            :is="getQuestionComponent(currentQuestions[currentQuestionIndex].type)"
            :question="currentQuestions[currentQuestionIndex]"
            v-model="answers[currentQuestions[currentQuestionIndex].id]"
            :is-dark-mode="isDarkMode"
          />
          <button 
            @click="goToNextQuestion" 
            :disabled="!answers[currentQuestions[currentQuestionIndex].id]"
            class="continue-button"
          >
            Continue
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-else-if="isLoading" class="solution-container">
        <LoadingSpinner :is-dark-mode="isDarkMode" />
      </div>

      <!-- Solution Section -->
      <div v-if="solution && showSolution" class="solution-section">
        <h3>Based on your request:</h3>
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
                  max: answer.max,
                  description: answer.description
                }"
                v-model="answers[answer.id]"
                :is-dark-mode="isDarkMode"
              />
              <div class="edit-buttons">
                <button class="cancel-button" @click="cancelEdit(answer)">Cancel</button>
                <button class="save-button primary-button" @click="saveAnswer(answer)">Save</button>
              </div>
            </div>
            <div v-else class="answer-display">{{ answer.answer }}</div>
          </div>
        </div>

        <!-- Feedback and Reset Buttons -->
        <div class="feedback-section">
          <h4>Was this helpful?</h4>
          <div class="feedback-buttons">
            <button 
              @click="submitFeedback(true)" 
              class="feedback-button"
              :class="{ 'selected': feedback === true }"
            >
              👍
            </button>
            <button 
              @click="submitFeedback(false)" 
              class="feedback-button"
              :class="{ 'selected': feedback === false }"
            >
              👎
            </button>
          </div>
          <button @click="resetWidget" class="reset-button">Done</button>
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
      default: 'MyHR'
    }
  },
  data() {
    return {
      userProblem: '',
      problemDescription: '',
      currentQuestions: [],
      currentQuestionIndex: 0,
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
        min: question.min,
        max: question.max,
        description: question.description,
        placeholder: question.placeholder,
        isEditing: false
      }))
      this.currentQuestions = []
      
      try {
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
      // For numerical questions, validate the input before saving
      if (answer.type === 'numerical') {
        const numValue = Number(this.answers[answer.id])
        if (
          isNaN(numValue) || 
          (answer.min !== undefined && numValue < answer.min) || 
          (answer.max !== undefined && numValue > answer.max)
        ) {
          // Reset to previous valid value
          this.answers[answer.id] = answer.answer
          answer.isEditing = false
          return
        }
      }

      answer.isEditing = false
      // Update the answer in the answeredQuestions array
      answer.answer = this.answers[answer.id]
      this.isLoading = true
      
      try {
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
    },
    goToNextQuestion() {
      if (this.currentQuestionIndex < this.currentQuestions.length - 1) {
        this.currentQuestionIndex++
      } else {
        this.submitAnswers()
      }
    },
    goBack() {
      if (this.currentQuestionIndex > 0) {
        this.currentQuestionIndex--
      } else {
        this.currentQuestions = []
        this.userProblem = ''
      }
    },
    handleContinue() {
      if (this.currentQuestion === null) {
        // Handle initial user problem submission
        if (!this.userProblem.trim()) {
          return;
        }
        this.answeredQuestions.push({
          question: 'How can I help you?',
          answer: this.userProblem,
          isEditing: false
        });
        this.currentQuestion = this.questions[0];
        this.currentQuestionIndex = 0;
        return;
      }

      // Handle other questions
      if (this.currentQuestion.type === 'enum' && !this.selectedAnswer) {
        return;
      }

      // Add current question to answered questions
      this.answeredQuestions.push({
        question: this.currentQuestion.text,
        answer: this.selectedAnswer,
        isEditing: false
      });

      // Find next question
      const currentIndex = this.questions.findIndex(q => q.id === this.currentQuestion.id);
      if (currentIndex < this.questions.length - 1) {
        this.currentQuestion = this.questions[currentIndex + 1];
        this.currentQuestionIndex = currentIndex + 1;
        this.selectedAnswer = null;
      } else {
        this.currentQuestion = null;
        this.currentQuestionIndex = -1;
      }
    }
  }
}
</script>

<style scoped>
/* Remove all scoped styles as they are now in style.css */
</style> 