export const mockDataService = {
  async getQuestions(problemDescription) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))

    // Return a sequence of questions that demonstrates all question types
    return [
      {
        id: 1,
        type: 'text-enum',
        text: 'What type of problem are you experiencing?',
        options: ['Technical', 'Design', 'Business', 'Other']
      },
      {
        id: 2,
        type: 'image-enum',
        text: 'Which style best represents your needs?',
        options: [
          { value: 'modern', label: 'Modern', imageUrl: '/images/modern.svg' },
          { value: 'classic', label: 'Classic', imageUrl: '/images/classic.svg' },
          { value: 'minimalist', label: 'Minimalist', imageUrl: '/images/minimalist.svg' }
        ]
      },
      {
        id: 3,
        type: 'text-box',
        text: 'Please provide more details about your specific situation.',
        placeholder: 'Enter your situation details...',
        rows: 4
      },
      {
        id: 4,
        type: 'numerical',
        text: 'How many users or items are affected by this issue?',
        min: 1,
        max: 1000000,
        placeholder: 'Enter number'
      }
    ]
  },

  async getSolution(answers) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Generate a solution based on the answers
    const solution = this.generateSolution(answers)
    return solution
  },

  generateSolution(answers) {
    // Generate a solution that references all the answers
    const problemType = answers[1] || 'unknown'
    const style = answers[2] || 'unknown'
    const details = answers[3] || 'no details provided'
    const number = answers[4] || 'unknown'

    return '1. First, analyze the specific requirements based on your ' + problemType + ' problem\n' +
      '2. Consider implementing a ' + style + ' approach to address the needs of ' + number + ' affected items\n' +
      '3. Focus on the key details you provided: ' + details + '\n' +
      '4. Monitor the implementation and gather feedback from users\n\n' +
      'Would you like to proceed with this solution?'
  },

  async submitFeedback(feedback) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))
    console.log('Feedback submitted:', feedback)
    return { success: true }
  }
} 