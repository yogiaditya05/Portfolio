// ── Custom Lag Cursor ──
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursorRing');
    let mx = 0, my = 0, rx = 0, ry = 0;
    
    document.addEventListener('mousemove', e => {
      mx = e.clientX;
      my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top = my + 'px';
    });
    
    function animRing() {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
      requestAnimationFrame(animRing);
    }
    animRing();

    // Hover effect on links and buttons
    document.querySelectorAll('a, button, .btn, .cert-card, .suggestion-chip, #chat-send').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hovered');
        ring.classList.add('hovered');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hovered');
        ring.classList.remove('hovered');
      });
    });

    // ── Scroll Scrolled Nav and Reveal Animations ──
    window.addEventListener('scroll', () => {
      document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40);
    });

    const reveals = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    reveals.forEach(el => obs.observe(el));

    // ── Certificate Modal ──
    const CERT_DATA = {
  "python": "./certificates/python.jpg",
  "cpp": "./certificates/cpp.jpg",
  "c": "./certificates/c.jpg",
  "java": "./certificates/java.jpg",
  "html": "./certificates/html.jpg",
  "css": "./certificates/css.jpg",
  "dbms": "./certificates/dbms.jpg",
  "be10x": "./certificates/be10x.jpg",
  "outskill": "./certificates/outskill.jpg"
};

    const modal = document.getElementById('certModal');
    const modalTitle = document.getElementById('certModalTitle');
    const modalImg = document.getElementById('certModalImg');

    function openCert(id, title) {
      if (CERT_DATA[id]) {
        modalTitle.textContent = title;
        modalImg.src = CERT_DATA[id];
        modal.classList.add('open');
      }
    }

    function closeCert() {
      modal.classList.remove('open');
      setTimeout(() => {
        modalImg.src = '';
      }, 300);
    }

    // Escape key closes modal
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        closeCert();
      }
    });

    // ── Local Rule-Based Chatbot Assistant ──
    const launcher = document.getElementById('chat-launcher');
    const windowEl = document.getElementById('chat-window');
    const closeBtn = document.getElementById('chat-close');
    const messagesEl = document.getElementById('chat-messages');
    const inputEl = document.getElementById('chat-input');
    const sendBtn = document.getElementById('chat-send');
    const suggestionsRow = document.getElementById('chat-suggestions');

    // Toggle Chat Window
    launcher.addEventListener('click', () => {
      windowEl.classList.toggle('open');
      if (windowEl.classList.contains('open') && messagesEl.children.length === 0) {
        initializeChat();
      }
    });
    closeBtn.addEventListener('click', () => windowEl.classList.remove('open'));

    // Welcome logic
    function initializeChat() {
      showTyping();
      setTimeout(() => {
        removeTyping();
        appendBotMsg("Hi there! I am Aditya Yogi's AI Assistant. How can I help you today? Feel free to ask about his skills, services, projects, or how to contact him directly!");
      }, 800);
    }

    function appendBotMsg(text, isHtml = false) {
      const div = document.createElement('div');
      div.className = 'msg bot';
      if (isHtml) {
        div.innerHTML = `<div class="msg-bubble">${text}</div>`;
      } else {
        const bubble = document.createElement('div');
        bubble.className = 'msg-bubble';
        bubble.textContent = text;
        div.appendChild(bubble);
      }
      messagesEl.appendChild(div);
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function showTyping() {
      const div = document.createElement('div');
      div.className = 'msg bot';
      div.id = 'typing-indicator';
      div.innerHTML = `<div class="msg-bubble typing-dots"><span></span><span></span><span></span></div>`;
      messagesEl.appendChild(div);
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function removeTyping() {
      const t = document.getElementById('typing-indicator');
      if (t) t.remove();
    }

    // Input handlers
    sendBtn.addEventListener('click', () => handleUserSend());
    inputEl.addEventListener('keypress', e => {
      if (e.key === 'Enter') handleUserSend();
    });

    // Suggestions click handlers
    document.querySelectorAll('.suggestion-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const text = chip.textContent;
        handleUserSend(text);
      });
    });

    function handleUserSend(text) {
      const query = (text || inputEl.value).trim();
      if (!query) return;

      if (!text) inputEl.value = '';
      appendUserMsg(query);

      showTyping();
      setTimeout(() => {
        removeTyping();
        processQuery(query);
      }, 600);
    }

    // Local Query Processor (Rules-based AI logic)
    function processQuery(text) {
      const val = text.toLowerCase();
      
      // 1. Contact / Hire Info
      if (val.includes('contact') || val.includes('hire') || val.includes('phone') || val.includes('email') || val.includes('whatsapp') || val.includes('call') || val.includes('number') || val.includes('gmail')) {
        appendBotMsg(
          `You can reach out to Aditya Yogi directly through the following channels: <br/><br/>
          <b>Email:</b> aadiwork25@gmail.com<br/>
          <b>Phone/WhatsApp:</b> +91 73898 12899<br/>
          <b>LinkedIn:</b> Aditya Yogi on LinkedIn<br/>
          <b>GitHub:</b> yogiaditya05 on GitHub<br/><br/>
          <a class="chat-link-btn" href="mailto:aadiwork25@gmail.com">Email Aditya</a>
          <a class="chat-link-btn" href="tel:+917389812899">Call / WhatsApp</a>
          <a class="chat-link-btn" href="https://github.com/yogiaditya05" target="_blank">GitHub</a>`,
          true
        );
      }
      // 2. Freelance Services
      else if (val.includes('service') || val.includes('work') || val.includes('offer') || val.includes('freelance') || val.includes('price') || val.includes('cost')) {
        appendBotMsg(
          `Aditya offers premium freelance services for businesses and individuals:<br/><br/>
          1. <b>AI Integration & Automation:</b> Custom chat bots, Gemini API automation scripts, voice-to-text transcription helpers.<br/>
          2. <b>Full-Stack Development:</b> Responsive websites, secure user flows, administrative backends (MySQL, SQLite, PHP, Node.js).<br/>
          3. <b>Custom Dashboards:</b> Interactive reporting analytics, databases integration (Supabase, MySQL), and user data registries.<br/><br/>
          Click below to initiate a contact request directly:`,
          true
        );
        appendBotMsg(
          `<a class="chat-link-btn" href="mailto:aadiwork25@gmail.com?subject=Freelance%20Project%20Inquiry">Request Quote</a>
          <a class="chat-link-btn" href="https://www.linkedin.com/in/aditya-yogi-b77319300" target="_blank">Message on LinkedIn</a>`,
          true
        );
      }
      // 3. Featured Projects
      else if (val.includes('project') || val.includes('portfolio') || val.includes('built') || val.includes('make') || val.includes('my hridyam') || val.includes('college') || val.includes('eduportal')) {
        appendBotMsg(
          `Here are Aditya Yogi's highlighted development projects:<br/><br/>
          • <b>My Hridyam:</b> An AI Wellness Companion app. Powered by Vite/React, Express, Drizzle ORM, SQLite, and direct <b>Google Gemini 2.5</b> voice transcription API. Deployed live on Vercel at <a href="https://myhridyam.vercel.app" target="_blank" style="color:#00f5ff;">myhridyam.vercel.app</a>.<br/>
          • <b>EduPortal:</b> College Result and Gradebook management system. Responsive PHP & MySQL portal featuring Admin/Teacher/Student dashboards, secure Bcrypt passwords hashing, and report tables.<br/><br/>
          Which one would you like to discuss?`,
          true
        );
      }
      // 4. Skills / Technologies
      else if (val.includes('skill') || val.includes('technology') || val.includes('languages') || val.includes('know') || val.includes('code') || val.includes('python') || val.includes('c++') || val.includes('database')) {
        appendBotMsg(
          `Aditya is highly skilled in the following technical domains:<br/><br/>
          • <b>Languages:</b> Python (95% score), C++, C, SQL, JavaScript, HTML & CSS.<br/>
          • <b>Databases:</b> Supabase, MySQL, SQLite, Drizzle ORM.<br/>
          • <b>AI Tools:</b> Generative AI workflows, Google Gemini developer APIs, ML fundamentals.<br/>
          • <b>Verification:</b> Holds 8+ verified certifications from IIT Bombay.`
        );
      }
      // 5. Bio / About
      else if (val.includes('about') || val.includes('who are you') || val.includes('aditya') || val.includes('yogi') || val.includes('college') || val.includes('education')) {
        appendBotMsg(
          `Aditya Yogi is a Data Analytics Enthusiast and AI Full Stack Developer. He is a Computer Science and Engineering student at Acropolis Institute of Technology & Research, Indore (graduating in 2027).<br/><br/>
          He combines machine learning fundamentals with modern database stacks to build clean, functional, and automated applications for freelance clients.`,
          true
        );
      }
      // 6. Basic greetings
      else if (val.includes('hello') || val.includes('hi') || val.includes('hey') || val.includes('hola') || val.includes('greetings')) {
        appendBotMsg("Hello! How can I help you today? You can ask about my skills, services, projects, or how to contact me.");
      }
      // 7. Thank you
      else if (val.includes('thank') || val.includes('thanks') || val.includes('cool') || val.includes('great') || val.includes('awesome')) {
        appendBotMsg("You're welcome! Let me know if you need anything else, or feel free to contact Aditya directly to discuss a freelance project!");
      }
      // 8. Fallback
      else {
        appendBotMsg(
          `I'm here to answer questions about Aditya Yogi's portfolio. I parsed your query but couldn't find a direct match. Feel free to:<br/><br/>
          • Ask about <b>"skills"</b> or <b>"certifications"</b><br/>
          • Ask about <b>"projects"</b> or <b>"services"</b><br/>
          • Ask how to <b>"contact"</b> or <b>"hire"</b> him<br/><br/>
          Or choose one of the quick suggestions below:`,
          true
        );
      }
    }

    function appendUserMsg(text) {
      const div = document.createElement('div');
      div.className = 'msg user';
      div.innerHTML = `<div class="msg-bubble"></div>`;
      div.querySelector('.msg-bubble').textContent = text;
      messagesEl.appendChild(div);
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }