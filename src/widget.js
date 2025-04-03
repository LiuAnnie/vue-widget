import { createApp } from 'vue'
import InteractiveGuidanceWidget from './components/InteractiveGuidanceWidget.vue'
import './style.css'

class VueWidget {
  constructor(options = {}) {
    this.options = {
      target: options.target || '#vue-widget',
      config: options.config || {
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
      },
      headerText: options.headerText || 'MyHR',
      isDarkMode: options.isDarkMode || false
    }
  }

  mount() {
    const targetElement = document.querySelector(this.options.target)
    if (!targetElement) {
      throw new Error(`Target element "${this.options.target}" not found`)
    }

    const app = createApp(InteractiveGuidanceWidget, {
      config: this.options.config,
      headerText: this.options.headerText,
      isDarkMode: this.options.isDarkMode
    })

    app.mount(targetElement)
    return app
  }
}

// Export for use in browser
if (typeof window !== 'undefined') {
  window.VueWidget = VueWidget
}

// Export for use in Node.js
export default VueWidget 