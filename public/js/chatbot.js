// DOM Elements
const chatBox = document.getElementById('chatBox');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

// Add a message to the chat
function addMessage(text, sender) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${sender}`;
  messageDiv.innerHTML = `
    <div class="message-bubble">
      <strong>${sender === 'user' ? 'You' : 'Bot'}:</strong> ${text}
    </div>
  `;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Add these functions
function showTyping() {
  const typingDiv = document.createElement('div');
  typingDiv.id = 'typing';
  typingDiv.className = 'message bot';
  typingDiv.innerHTML = '<div class="message-bubble"><em>Bot is typing...</em></div>';
  chatBox.appendChild(typingDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function hideTyping() {
  const typing = document.getElementById('typing');
  if (typing) typing.remove();
}

// Modify handleQuestion()
async function handleQuestion() {
  const question = userInput.value.trim();
  if (!question) return;

  addMessage(question, 'user');
  userInput.value = '';
  showTyping();

  try {
    // Use absolute URL for debugging
    const response = await fetch('http://localhost:8080/chatbot/ask', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ question }),
      credentials: 'include' // For session/cookies if needed
    });

    console.log('Response status:', response.status); // Check in browser console
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Received data:', data); // Debug log
    
    hideTyping();
    addMessage(data.answer || "I'm not sure how to answer that.", 'bot');
  } catch (err) {
    hideTyping();
    console.error('Fetch error:', err);
    addMessage("Our help desk is currently unavailable. Please try again shortly.", 'bot');
  }
}

// Event Listeners
sendBtn.addEventListener('click', handleQuestion);
userInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') handleQuestion();
});

// Initial bot greeting (optional)
addMessage("Hello! Ask me about station facilities, tickets, or timings.", 'bot');