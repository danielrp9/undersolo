// Chatbot Logic
document.addEventListener('DOMContentLoaded', function() {
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotContainer = document.getElementById('chatbotContainer');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');
    
    let userName = '';
    let currentStep = 'askName';
    
    // Toggle chatbot visibility
    chatbotToggle.addEventListener('click', function() {
        chatbotContainer.classList.toggle('active');
        if (chatbotContainer.classList.contains('active')) {
            // Start conversation when opening
            if (chatbotMessages.children.length === 0) {
                addBotMessage('Olá, me chamo Daniel, sou o assistente virtual da UnderSolo. Antes de começarmos, qual o seu nome?');
            }
        }
    });
    
    chatbotClose.addEventListener('click', function() {
        chatbotContainer.classList.remove('active');
    });
    
    // Send message function
    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (message === '') return;
        
        addUserMessage(message);
        chatbotInput.value = '';
        
        // Process user response
        setTimeout(() => {
            processUserResponse(message);
        }, 500);
    }
    
    // Send message on button click or Enter key
    chatbotSend.addEventListener('click', sendMessage);
    chatbotInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Add bot message to chat
    function addBotMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', 'bot-message');
        messageDiv.innerHTML = text;
        chatbotMessages.appendChild(messageDiv);
        scrollToBottom();
    }
    
    // Add user message to chat
    function addUserMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', 'user-message');
        messageDiv.textContent = text;
        chatbotMessages.appendChild(messageDiv);
        scrollToBottom();
    }
    
    // Scroll to bottom of chat
    function scrollToBottom() {
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // Process user responses
    function processUserResponse(response) {
        if (currentStep === 'askName') {
            userName = response;
            currentStep = 'offerHelp';
            addBotMessage(`Prazer em conhecê-lo, ${userName}! Deseja falar com uma pessoa de nossa equipe? (responda "sim" ou "não")`);
        } 
        else if (currentStep === 'offerHelp') {
            if (response.toLowerCase().includes('sim') || response.toLowerCase().includes('s')) {
                addBotMessage(`Ótimo, ${userName}! Vou conectar você com nosso time. <br><br>
                             <a href="https://wa.me/5538991683260" class="whatsapp-btn" target="_blank">
                                <i class="fab fa-whatsapp"></i> Conversar no WhatsApp
                             </a>`);
                currentStep = 'completed';
            } else {
                addBotMessage(`Entendi, ${userName}. Se precisar de ajuda no futuro, estarei aqui! Tenha um ótimo dia!`);
                currentStep = 'completed';
            }
        }
        else if (currentStep === 'completed') {
            addBotMessage(`Para iniciar uma nova conversa, por favor feche e abra o chat novamente.`);
        }
    }
    
    // Initialize chat if needed
    function initChat() {
        if (chatbotContainer.classList.contains('active')) {
            if (chatbotMessages.children.length === 0) {
                addBotMessage('Olá, me chamo Daniel, sou o assistente virtual da UnderSolo. Antes de começarmos, qual o seu nome?');
            }
        }
    }
    
    // Optional: Auto-open chat after 30 seconds if not interacted with
    setTimeout(() => {
        if (!localStorage.getItem('chatbotOpened')) {
            chatbotContainer.classList.add('active');
            initChat();
            localStorage.setItem('chatbotOpened', 'true');
        }
    }, 30000);
});