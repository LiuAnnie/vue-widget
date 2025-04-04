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
   This will generate the following files in the `public/dist` directory:
   - `vue-widget.umd.js` - UMD bundle for direct browser use
   - `vue-widget.es.js` - ES module bundle
   - `style.css` - Compiled styles

## Deployment

### GitHub Pages Deployment

1. Ensure you have two branches:
   - `main` - for source code
   - `gh-pages` - for built files

2. Build and deploy to GitHub Pages:
   ```bash
   # Build the project
   npm run build

   # Switch to gh-pages branch
   git checkout gh-pages

   # Add all changes
   git add .

   # Commit changes
   git commit -m "Update built files"

   # Push to GitHub Pages
   git push origin gh-pages
   ```

3. Your widget will be available at:
   `https://[your-username].github.io/vue-widget/`

### Using the Widget in Other Projects

1. Include the required files in your HTML:
   ```html
   <link rel="stylesheet" href="path/to/style.css">
   <script src="path/to/vue-widget.umd.js"></script>
   ```

2. Initialize the widget:
   ```html
   <div id="widget-container"></div>
   <script>
     const widget = new VueWidget({
       container: '#widget-container',
       config: {
         logo: '/images/logo.svg',
         colors: {
           primary: '#4CAF50',
           secondary: '#2196F3'
         }
       },
       headerText: 'HR Assistant',
       isDarkMode: false
     });
     widget.mount();
   </script>
   ```

## Troubleshooting

### Common Issues

1. Images not loading:
   - Ensure image paths are relative (e.g., `./images/logo.svg`)
   - Check that images are in the correct directory (`public/images/`)

2. Widget not displaying:
   - Verify that `widget.mount()` is called after initialization
   - Check browser console for error messages
   - Ensure all required files are loaded

3. Styling issues:
   - Confirm that `style.css` is properly loaded
   - Check that the container element exists in the DOM

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.