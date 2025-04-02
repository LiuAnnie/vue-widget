# Interactive Guidance Widget

A Vue.js-based interactive guidance widget that helps users solve problems through a series of questions and provides tailored solutions.

## Features

- Problem description input
- Multiple question types:
  - Text-based multiple choice
  - Image-based multiple choice
  - Free-form text input
  - Numerical input with validation
- Editable answered questions
- Dynamic solution generation
- User feedback collection
- Customizable styling
- Responsive design
- Easy to embed in any web page

## Installation

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

## Usage

### Basic Implementation

\`\`\`vue
<template>
  <InteractiveGuidanceWidget :config="widgetConfig" />
</template>

<script>
import InteractiveGuidanceWidget from './components/InteractiveGuidanceWidget.vue'

export default {
  components: {
    InteractiveGuidanceWidget
  },
  data() {
    return {
      widgetConfig: {
        logo: '/path/to/logo.png',
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
      }
    }
  }
}
</script>
\`\`\`

### Configuration Options

The widget accepts a configuration object with the following properties:

\`\`\`javascript
{
  logo: string, // URL to the logo image
  colors: {
    primary: string, // Primary color for buttons and highlights
    secondary: string, // Secondary color for accents
    background: string, // Widget background color
    text: string // Text color
  },
  fonts: {
    primary: string, // Primary font family
    sizes: {
      heading: string, // Size for main headings
      subheading: string, // Size for subheadings
      body: string // Size for body text
    }
  }
}
\`\`\`

## Project Structure

\`\`\`
src/
├── components/
│   ├── InteractiveGuidanceWidget.vue
│   └── questions/
│       ├── TextEnumQuestion.vue
│       ├── ImageEnumQuestion.vue
│       ├── TextBoxQuestion.vue
│       └── NumericalQuestion.vue
├── services/
│   └── mockDataService.js
└── App.vue
\`\`\`

## Development

The project uses Vite as the build tool and Vue.js 3 for the framework. To modify the widget's behavior:

1. Update the mock data service in \`src/services/mockDataService.js\`
2. Modify the question components in \`src/components/questions/\`
3. Adjust the styling in the respective component files

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
