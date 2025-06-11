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

// Load projects dynamically from GitHub repos (example)
async function loadProjects() {
  const gallery = document.getElementById('project-gallery');
  gallery.innerHTML = '<p>Loading projects...</p>';

  try {
    const response = await fetch('https://api.github.com/users/Rdvprasad36/repos');
    const repos = await response.json();

    gallery.innerHTML = '';
    repos.slice(0, 6).forEach(repo => {
      const card = document.createElement('div');
      card.className = 'project-card';

      // Use repo description or fallback text
      const description = repo.description ? repo.description : 'No description available';

      // Use repo homepage or fallback image placeholder
      const imageUrl = repo.homepage ? repo.homepage : 'https://via.placeholder.com/300x160?text=Project+Image';

      card.innerHTML = `
        <img src="${imageUrl}" alt="${repo.name}" class="project-image" />
        <div class="project-content">
          <h3>${repo.name}</h3>
          <p>${description}</p>
          <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">View Repo</a>
        </div>
      `;
      gallery.appendChild(card);
    });
  } catch (error) {
    gallery.innerHTML = '<p>Failed to load projects.</p>';
    console.error('Error loading projects:', error);
  }
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
