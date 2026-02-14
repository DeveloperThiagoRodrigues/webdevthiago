// Gerar partículas aleatórias
const particlesContainer = document.getElementById('particles');
for (let i = 0; i < 25; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    const size = Math.random() * 5 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.animationDelay = `${Math.random() * 15}s`;
    particle.style.animationDuration = `${15 + Math.random() * 20}s`;
    particlesContainer.appendChild(particle);
}

// Abrir/Fechar demo do Chatbot ao clicar no card
document.addEventListener('DOMContentLoaded', () => {
    const trigger = document.querySelector('.chatbot-demo-trigger');
    const demo = document.getElementById('chatbotDemo');
    const closeBtn = document.getElementById('closeDemo');
    const chatBody = document.getElementById('chatBody');
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');

    if (trigger && demo && closeBtn) {
        trigger.addEventListener('click', () => {
            demo.classList.remove('hidden');
            demo.scrollIntoView({ behavior: 'smooth' });
            // Inicia conversa se ainda não começou
            if (!chatBody.hasChildNodes()) {
                addMessage('bot', "Olá! Sou o Assistente IA do Thiago Karpovicz. 😎\nVi que você está interessado em um agente de IA para atendimento automático na sua empresa.\nMe conta: qual o maior desafio no atendimento dos seus clientes hoje? (demora na resposta, volume alto, custo com equipe...?)");
            }
        });

        closeBtn.addEventListener('click', () => {
            demo.classList.add('hidden');
        });
    }

    // Lógica do Chatbot
    function addMessage(sender, text) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message', sender === 'user' ? 'user-message' : 'bot-message');
        msgDiv.innerHTML = text.replace(/\n/g, '<br>');
        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function showTyping() {
        const typing = document.createElement('div');
        typing.classList.add('message', 'bot-message', 'typing-indicator');
        typing.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
        chatBody.appendChild(typing);
        chatBody.scrollTop = chatBody.scrollHeight;
        return typing;
    }

    function botResponse(userText) {
        const lowerText = userText.toLowerCase();
        let response = "Interessante! Me conta mais sobre isso...";

        if (lowerText.includes('demora') || lowerText.includes('lento') || lowerText.includes('espera')) {
            response = "Exato! Esse é um dos maiores gargalos que vejo nas empresas.<br><br>Meu agente IA responde em <strong>menos de 2 segundos</strong>, 24h por dia, 7 dias por semana, sem fila de espera. Já reduziu em até 85% o tempo médio de resposta para clientes meus.<br><br>Você atende via WhatsApp, site, Instagram ou todos?";
        } else if (lowerText.includes('volume') || lowerText.includes('muito') || lowerText.includes('atendimento alto')) {
            response = "Perfeito, volume alto é onde a IA brilha mais!<br><br>Meu sistema escala infinitamente sem precisar contratar mais gente. Um cliente meu que recebia 400+ mensagens/dia agora resolve 92% delas sem humano.<br><br>Quantas mensagens/dia você lida hoje no pico?";
        } else if (lowerText.includes('custo') || lowerText.includes('caro') || lowerText.includes('equipe')) {
            response = "Entendo perfeitamente. Equipe 24h é caro e difícil de manter.<br><br>Com meu agente IA você corta até 70% do custo de atendimento sem perder qualidade (na verdade, ganha em consistência e velocidade).<br><br>Implementação rápida: em até 7 dias já está rodando no seu WhatsApp/Site.<br><br>Qual seu orçamento mensal atual com atendimento?";
        } else if (lowerText.includes('quanto') || lowerText.includes('preço') || lowerText.includes('valor') || lowerText.includes('investimento')) {
            response = "Ótima pergunta! 😊<br><br>Tenho planos a partir de R$ 497/mês (para volumes médios) até pacotes enterprise com customizações avançadas.<br><br>Mas o melhor: o ROI é rápido – a maioria recupera o investimento em 30-45 dias só com redução de custos e aumento de vendas via upsell automático.<br><br>Quer que eu te envie uma proposta personalizada agora? É só dizer seu ramo e volume aproximado!";
        } else if (lowerText.includes('sim') || lowerText.includes('quero') || lowerText.includes('interessado') || lowerText.includes('agendar')) {
            response = "Perfeito! Você acabou de dar o primeiro passo para revolucionar o atendimento da sua empresa 🚀<br><br>Vou te direcionar agora para falar direto comigo no WhatsApp. Clique abaixo e me manda os detalhes do seu negócio que já preparo uma proposta sob medida em até 24h.<br><br><a href='https://wa.me/5519996982524?text=Olá Thiago, vi a demo do chatbot no seu portfólio e quero uma proposta!' target='_blank' style='color:#0ef; font-weight:bold;'>Falar com Thiago agora no WhatsApp →</a>";
        } else {
            response = "Entendi! Pode falar mais sobre o que você precisa?<br><br>Exemplos: 'Quero reduzir tempo de resposta', 'Tenho muito volume no WhatsApp', 'Quero vender mais pelo chat', 'Quanto custa?'... Estou aqui pra te ajudar a decidir o melhor caminho!";
        }

        const typing = showTyping();
        setTimeout(() => {
            typing.remove();
            addMessage('bot', response);
        }, 1500 + Math.random() * 1500);
    }

    function sendMessage() {
        const text = userInput.value.trim();
        if (!text) return;
        addMessage('user', text);
        userInput.value = '';
        botResponse(text);
    }

    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', e => {
        if (e.key === 'Enter') sendMessage();
    });
});