// Get the form element
const form = document.getElementById('contactForm');

// Add event listener for form submission
form.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent form submission

  // Perform form validation
  if (validateForm()) {
    // If the form is valid, submit the form data
    submitForm();
  }
});

// Function to validate the form
function validateForm() {
  // Get the form inputs
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  // Perform validation
  if (nameInput.value.trim() === '') {
    alert('Please enter your name');
    nameInput.focus();
    return false;
  }

  if (emailInput.value.trim() === '') {
    alert('Please enter your email');
    emailInput.focus();
    return false;
  }

  if (messageInput.value.trim() === '') {
    alert('Please enter your message');
    messageInput.focus();
    return false;
  }

  return true; // Form is valid
}

// Function to submit the form data
function submitForm() {
  // Get the form inputs
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  // Create an object with the form data
  const formData = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    message: messageInput.value.trim(),
  };

  // Send an HTTP POST request to the server
  fetch('/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      if (response.ok) {
        alert('Form submitted successfully');
        form.reset(); // Clear the form inputs
      } else {
        alert('Error submitting form');
      }
    })
    .catch((error) => {
      console.log('Error submitting form:', error);
      alert('Error submitting form');
    });
}
