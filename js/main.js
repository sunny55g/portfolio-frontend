document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();
  
  // Mobile navigation toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
    });
  }
  
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70, // Adjust for header height
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          hamburger.classList.remove('active');
        }
        
        // Update active nav link
        document.querySelectorAll('.nav-links a').forEach(link => {
          link.classList.remove('active');
        });
        this.classList.add('active');
      }
    });
  });
  
  // Form submission handler
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const toast = document.getElementById('toast');
  
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
      };
      
      try {
        const response = await fetch('https://portfolio-backend-nptk.onrender.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        
        // Show toast message
        showToast(response.ok ? 'success' : 'error', result.message);
        
        if (response.ok) {
          // Clear form
          contactForm.reset();
        }
      } catch (error) {
        console.error('Error:', error);
        showToast('error', 'An unexpected error occurred. Please try again.');
      }
    });
  }
  
  // Toast message function
  function showToast(type, message) {
    const toastElement = document.getElementById('toast');
    const toastContent = document.querySelector('.toast-content');
    
    toastContent.textContent = message;
    toastElement.className = `toast ${type}`;
    
    // Show the toast
    toastElement.classList.remove('hidden');
    
    // Hide after 3 seconds
    setTimeout(() => {
      toastElement.classList.add('hidden');
    }, 3000);
  }
});
