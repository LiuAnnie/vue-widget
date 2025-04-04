# Vue Widget

A customizable interactive guidance widget built with Vue.js 3 for HR question handling.

## Features

- Interactive question flow with single-question-per-page design
- Multiple question types:
  - Text enumeration (dropdown)
  - Image enumeration (with icons)
  - Text box input
  - Numerical input
- Dark mode support (follows system preferences)
- Customizable styling through props
- Responsive design
- Feedback system
- Editable answer history

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/LiuAnnie/vue-widget.git
   cd vue-widget
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Development

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to:
   - http://localhost:5173 (default Vite port)
   - or http://localhost:3000 (if using vite.config.dev.js)

3. The application will be running in development mode with hot-reload enabled.

## Testing the Application

1. Start with the initial question:
   - Enter your HR question or request in the text area
   - Click "Continue" to proceed

2. Answer the sequence of questions:
   - Select your HR question type
   - Choose your preferred communication style
   - Enter your company email
   - Provide your employee ID

3. Review your answers:
   - All answers can be edited using the pencil icon
   - Click "Save" to update an answer
   - Click "Cancel" to discard changes

4. Submit feedback:
   - Use thumbs up/down to rate the solution
   - Click "Done" to complete the session

## Customization

The application can be customized through props:

```javascript
const config = {
  logo: '/',
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
```

## Building for Production

1. Build the application:
   ```bash
   npm run build
   ```

2. Preview the production build:
   ```bash
   npm run preview
   ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.