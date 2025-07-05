# Random Quote Generator

A beautiful, modern web application that generates random quotes from various categories. Built with vanilla JavaScript, HTML, and CSS.

## ✨ Features

- **Multiple Quote Categories**: Choose from General, Life, Technology, Funny, Love, and Bible quotes
- **Modern UI/UX**: Beautiful gradient design with smooth animations and hover effects
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Dark Mode Support**: Automatically adapts to system dark mode preferences
- **Copy to Clipboard**: One-click quote copying with toast notifications
- **Social Sharing**: Share quotes on Twitter with pre-filled text
- **Native Share API**: Use device's native sharing capabilities when available
- **Loading States**: Smooth loading animations with spinner
- **Error Handling**: Graceful error handling with user-friendly messages

## 🎨 Design Features

- **Glassmorphism Effect**: Modern backdrop blur and transparency
- **Gradient Backgrounds**: Beautiful purple-blue gradient theme
- **Smooth Animations**: Hover effects, transitions, and micro-interactions
- **Typography**: Clean Inter font with proper hierarchy
- **Icons**: Font Awesome icons for better visual appeal
- **Toast Notifications**: Non-intrusive feedback for user actions

## 📡 APIs Used

The application integrates with multiple quote APIs:

- **General Quotes**: `https://api.quotable.io/random`
- **Life Quotes**: `https://api.quotable.io/random?tags=life`
- **Technology Quotes**: `https://programming-quotes-api.herokuapp.com/quotes/random`
- **Funny Quotes**: `https://api.chucknorris.io/jokes/random?category=dev`
- **Love Quotes**: `https://api.quotable.io/random?tags=love`
- **Bible Quotes**: `https://beta.ourmanna.com/api/v1/get/?format=json`

## 🚀 Getting Started

1. **Clone or download** the project files
2. **Open** `index.html` in your web browser
3. **Or serve locally** using a local server:
   ```bash
   # Using Python
   python3 -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```
4. **Visit** `http://localhost:8000` in your browser

## 🎯 How to Use

1. **Select a Category**: Choose from the dropdown menu to filter quotes by category
2. **Generate Quote**: Click "New Quote" to get a random quote from the selected category
3. **Copy Quote**: Click the copy icon to copy the quote to your clipboard
4. **Share Quote**: Use the share button for native sharing or Twitter button for social media
5. **Enjoy**: Discover inspiring quotes from various sources!

## 🛠️ Technical Details

### File Structure
```
Random-Quote-Generator/
├── index.html          # Main HTML structure
├── style.css           # Modern CSS styling
├── script.js           # JavaScript functionality
└── README.md           # Project documentation
```

### Technologies Used
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Flexbox, Grid, and animations
- **Vanilla JavaScript**: ES6+ features, async/await, Fetch API
- **Font Awesome**: Icons
- **Google Fonts**: Inter font family

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🎨 Customization

### Changing Colors
The main color scheme can be modified in `style.css`:
```css
/* Primary gradient */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Primary color */
color: #667eea;
```

### Adding New Categories
1. Add the API endpoint to the `QUOTE_APIS` object in `script.js`
2. Add the option to the select dropdown in `index.html`
3. Handle the API response format in the `getQuote()` function

### Styling Modifications
The CSS is well-organized with comments. Key sections:
- Base styles and reset
- Layout and container styles
- Component-specific styles
- Responsive design
- Dark mode support

## 🤝 Contributing

Feel free to contribute to this project by:
- Reporting bugs
- Suggesting new features
- Adding new quote APIs
- Improving the design
- Enhancing functionality

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Quote APIs for providing the data
- Font Awesome for icons
- Google Fonts for typography
- The open-source community for inspiration

---

**Made with ❤️ for inspiration** 