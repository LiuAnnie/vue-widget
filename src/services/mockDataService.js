export const mockDataService = {
  async getQuestions(problemDescription) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))

    // Return a sequence of questions that demonstrates all question types
    return [
      {
        id: 1,
        type: 'text-enum',
        text: 'What type of HR question do you have?',
        options: [
          'Benefits-related (Health Insurance, Retirement Plans)',
          'Timesheet Submission Process',
          'Holiday or Vacation Policies',
          'Payroll Information',
          'HR Policies and Procedures',
          'Sick Leave or Paid Time Off',
          'Office Attendance Policies'
        ]
      },
      {
        id: 2,
        type: 'image-enum',
        text: 'Which communication style would you prefer for this matter?',
        options: [
          { value: 'AI summary', label: 'AI Summary', imageUrl: './images/textguide.svg' },
          { value: 'link to company documentation', label: 'Company Documentation', imageUrl: './images/docs.svg' },
          { value: 'video', label: 'Video Walkthrough', imageUrl: './images/video.svg' }
        ]
      },
      {
        id: 3,
        type: 'text-box',
        text: 'Your Company Email Address.',
        placeholder: 'you@company.com',
        rows: 4
      },
      {
        id: 4,
        type: 'numerical',
        text: 'Your Employee ID.',
        min: 1,
        max: 99999999,
        placeholder: '12345678'
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
    const questionType = answers[1] || 'unknown'
    const guidanceFormat = answers[2] || 'unknown'
    const email = answers[3] || 'no email provided'
    const employeeId = answers[4] || 'unknown'

    // Determine the correct article based on the guidance format
    const article = guidanceFormat.toLowerCase().startsWith('ai') ? 'an' : 'a'

    return `We've received your request on information about ${questionType}. ` +
      `We'll send ${article} ${guidanceFormat} to your provided email address. ` +
      `Typical response time is 2 minutes, but more complicated requests can take up to 2 hours. ` +
      `Thank you for your patience.\n\n` +
      `Request successfully processed for employee ${employeeId}.`
  },

  async submitFeedback(feedback) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))
    console.log('Feedback submitted:', feedback)
    return { success: true }
  }
} 