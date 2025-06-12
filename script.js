// Typing effect for intro typing-text
const typingText = document.getElementById('typing-text');
const phrases = [
  "Creative Developer",
  "AI Enthusiast",
  "Innovator",
  "Full Stack Developer",
  "Problem Solver"
];
let phraseIndex = 0;
let letterIndex = 0;
let currentPhrase = '';
let isDeleting = false;
let typingSpeed = 100;

function type() {
  if (phraseIndex >= phrases.length) phraseIndex = 0;
  currentPhrase = phrases[phraseIndex];
  if (!isDeleting) {
    typingText.textContent = currentPhrase.substring(0, letterIndex + 1);
    letterIndex++;
    if (letterIndex === currentPhrase.length) {
      isDeleting = true;
      typingSpeed = 1500; // pause before deleting
    } else {
      typingSpeed = 100;
    }
  } else {
    typingText.textContent = currentPhrase.substring(0, letterIndex - 1);
    letterIndex--;
    if (letterIndex === 0) {
      isDeleting = false;
      phraseIndex++;
      typingSpeed = 500; // pause before typing next
    } else {
      typingSpeed = 50;
    }
  }
  setTimeout(type, typingSpeed);
}
document.addEventListener('DOMContentLoaded', () => {
  type();
  // Responsive nav toggle
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
  // Load projects dynamically
  loadProjects();
  // Contact form validation and submission
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', handleFormSubmit);
});

// Scroll to contact section
function scrollToContact() {
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

// Load projects dynamically - replaced with static projects
function loadProjects() {
  const gallery = document.getElementById('project-gallery');
  gallery.innerHTML = '';

  const projects = [
    {
      name: 'AI Chatbot',
      description: 'Developed an AI-powered chatbot using natural language processing techniques to assist users with common queries.'
    },
    {
      name: 'Personal Blog Website',
      description: 'Created a responsive personal blog website using HTML, CSS, and JavaScript to share articles and tutorials.'
    },
    {
      name: 'Data Analysis Tool',
      description: 'Built a data analysis tool in Python to process and visualize large datasets for business insights.'
    }
  ];

  projects.forEach(project => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
      <div class="project-content">
        <h3>${project.name}</h3>
        <p>${project.description}</p>
      </div>
    `;
    gallery.appendChild(card);
  });
}

// Contact form validation and submission simulation
function handleFormSubmit(event) {
  event.preventDefault();

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  let valid = true;

  // Clear previous errors
  clearError('name-error');
  clearError('email-error');
  clearError('message-error');

  if (!nameInput.value.trim()) {
    showError('name-error', 'Name is required');
    valid = false;
  }
  if (!validateEmail(emailInput.value)) {
    showError('email-error', 'Valid email is required');
    valid = false;
  }
  if (!messageInput.value.trim()) {
    showError('message-error', 'Message cannot be empty');
    valid = false;
  }

  if (!valid) return;

  // Simulate form submission
  const status = document.getElementById('form-status');
  status.textContent = 'Sending message...';
  setTimeout(() => {
    status.textContent = 'Message sent successfully! Thank you.';
    document.getElementById('contact-form').reset();
  }, 1500);
}

function showError(id, message) {
  const el = document.getElementById(id);
  el.textContent = message;
  el.style.display = 'block';
}

function clearError(id) {
  const el = document.getElementById(id);
  el.textContent = '';
  el.style.display = 'none';
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
}
