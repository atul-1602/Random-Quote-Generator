// Quote API endpoints
const QUOTE_APIS = {
  general: "https://api.quotable.io/random",
  life: "https://api.quotable.io/random?tags=life",
  tech: "https://programming-quotes-api.herokuapp.com/quotes/random",
  funny: "https://api.chucknorris.io/jokes/random?category=dev",
  love: "https://api.quotable.io/random?tags=love",
  bible: "https://beta.ourmanna.com/api/v1/get/?format=json",
};

// Application state
let currentQuote = "";
let currentAuthor = "";
let currentCategory = "general";
let isLoading = false;

// DOM elements
const elements = {
  quote: document.querySelector(".quote"),
  author: document.querySelector(".author"),
  categorySelect: document.querySelector("#category-select"),
  loading: document.querySelector(".loading"),
  quoteContent: document.querySelector(".quote-content")
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

function initializeApp() {
  setupEventListeners();
  getQuote();
}

function setupEventListeners() {
  if (elements.categorySelect) {
    elements.categorySelect.addEventListener('change', function() {
      currentCategory = this.value;
      getQuote();
    });
  }
}

async function getQuote() {
  if (isLoading) return; // Prevent multiple simultaneous requests
  
  setLoadingState(true);
  
  try {
    const apiUrl = QUOTE_APIS[currentCategory];
    console.log(`Fetching quote from: ${apiUrl}`);
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      timeout: 10000 // 10 second timeout
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('API Response:', JSON.stringify(data, null, 2));

    const { quote, author } = normalizeApiResponse(data, currentCategory);
    
    if (!quote || !author) {
      throw new Error('Invalid quote data received');
    }

    console.log(`Normalized: quote="${quote}", author="${author}"`);
    
    currentQuote = quote;
    currentAuthor = author;
    
    displayQuote(quote, author);
    
  } catch (error) {
    console.error('Error fetching quote:', error);
    displayError('Failed to load quote. Please try again.');
  } finally {
    setLoadingState(false);
  }
}

function normalizeApiResponse(data, category) {
  let quote = "";
  let author = "";

  try {
    switch (category) {
      case "funny":
        quote = data.value || "";
        author = "Chuck Norris";
        break;
      case "bible":
        quote = data.verse?.details?.text || "";
        author = data.verse?.details?.reference || "";
        break;
      case "tech":
        quote = data.en || "";
        author = data.author || "";
        break;
      default:
        // Handle array responses
        if (Array.isArray(data) && data.length > 0) {
          quote = data[0].q || "";
          author = data[0].a || "";
        } else {
          // Handle object responses
          quote = data.content || data.text || "";
          author = data.author || "";
        }
        break;
    }
  } catch (error) {
    console.error('Error normalizing API response:', error);
    return { quote: "", author: "" };
  }

  return { quote: quote.trim(), author: author.trim() };
}

function displayQuote(quote, author) {
  // Animate quote appearance
  elements.quote.style.opacity = '0';
  elements.author.style.opacity = '0';
  
  setTimeout(() => {
    elements.quote.textContent = quote;
    elements.author.textContent = `— ${author}`;
    
    elements.quote.style.opacity = '1';
    elements.author.style.opacity = '1';
  }, 300);
}

function displayError(message) {
  elements.quote.textContent = message;
  elements.author.textContent = "";
  elements.quote.style.opacity = '1';
  elements.author.style.opacity = '1';
}

function setLoadingState(loading) {
  isLoading = loading;
  
  if (elements.loading) {
    elements.loading.style.display = loading ? 'block' : 'none';
  }
  
  if (elements.quoteContent) {
    elements.quoteContent.style.display = loading ? 'none' : 'block';
  }
}

function copyQuote() {
  if (!currentQuote || !currentAuthor) {
    showToast('No quote to copy');
    return;
  }

  const textToCopy = `"${currentQuote}" — ${currentAuthor}`;
  
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(textToCopy)
      .then(() => showToast('Quote copied to clipboard!'))
      .catch(() => fallbackCopyTextToClipboard(textToCopy));
  } else {
    fallbackCopyTextToClipboard(textToCopy);
  }
}

function fallbackCopyTextToClipboard(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-999999px";
  textArea.style.top = "-999999px";
  textArea.style.opacity = "0";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  
  try {
    const successful = document.execCommand('copy');
    if (successful) {
      showToast('Quote copied to clipboard!');
    } else {
      showToast('Failed to copy quote');
    }
  } catch (err) {
    console.error('Fallback copy failed:', err);
    showToast('Failed to copy quote');
  } finally {
    document.body.removeChild(textArea);
  }
}

function shareQuote() {
  if (!currentQuote || !currentAuthor) {
    showToast('No quote to share');
    return;
  }

  const text = `"${currentQuote}" — ${currentAuthor}`;
  const url = window.location.href;
  
  if (navigator.share) {
    navigator.share({
      title: 'Random Quote',
      text: text,
      url: url
    }).catch((error) => {
      console.error('Share failed:', error);
      // Fallback to copy
      copyQuote();
    });
  } else {
    // Fallback: copy to clipboard
    copyQuote();
  }
}

function tweetQuote() {
  if (!currentQuote || !currentAuthor) {
    showToast('No quote to tweet');
    return;
  }

  const text = `"${currentQuote}" — ${currentAuthor}`;
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&hashtags=quotes,inspiration`;
  window.open(tweetUrl, '_blank', 'width=600,height=400');
}

function showToast(message) {
  // Remove existing toasts
  const existingToasts = document.querySelectorAll('.toast');
  existingToasts.forEach(toast => document.body.removeChild(toast));
  
  // Create toast element
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  
  // Show toast
  setTimeout(() => toast.classList.add('show'), 100);
  
  // Hide and remove toast
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      if (document.body.contains(toast)) {
        document.body.removeChild(toast);
      }
    }, 300);
  }, 3000);
}

// Add smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';
