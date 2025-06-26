    document.addEventListener('DOMContentLoaded', function() {
            // DOM Elements
            const signupForm = document.getElementById('signup-form');
            const nameInput = document.getElementById('signup-name');
            const emailInput = document.getElementById('signup-email');
            const passwordInput = document.getElementById('signup-password');
            const confirmPasswordInput = document.getElementById('confirm-password');
            const roleSelect = document.getElementById('signup-role');
            const termsCheckbox = document.getElementById('terms-checkbox');
            const signupBtn = document.getElementById('signup-btn');
            
            // Toggle password visibility
            document.querySelectorAll('.toggle-password').forEach(toggle => {
                toggle.addEventListener('click', function() {
                    const input = this.parentElement.querySelector('input');
                    const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
                    input.setAttribute('type', type);
                    this.classList.toggle('fa-eye');
                    this.classList.toggle('fa-eye-slash');
                });
            });
            
            // Form validation
            function validateForm() {
                let isValid = true;
                
                // Validate name
                if (!nameInput.value.trim()) {
                    document.getElementById('name-error').style.display = 'block';
                    nameInput.classList.add('error');
                    isValid = false;
                } else {
                    document.getElementById('name-error').style.display = 'none';
                    nameInput.classList.remove('error');
                }
                
                // Validate email
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailInput.value.trim() || !emailRegex.test(emailInput.value)) {
                    document.getElementById('email-error').style.display = 'block';
                    emailInput.classList.add('error');
                    isValid = false;
                } else {
                    document.getElementById('email-error').style.display = 'none';
                    emailInput.classList.remove('error');
                }
                
                // Validate password
                if (!passwordInput.value.trim() || passwordInput.value.length < 8) {
                    document.getElementById('password-error').style.display = 'block';
                    passwordInput.classList.add('error');
                    isValid = false;
                } else {
                    document.getElementById('password-error').style.display = 'none';
                    passwordInput.classList.remove('error');
                }
                
                // Validate confirm password
                if (!confirmPasswordInput.value.trim() || confirmPasswordInput.value !== passwordInput.value) {
                    document.getElementById('confirm-password-error').style.display = 'block';
                    confirmPasswordInput.classList.add('error');
                    isValid = false;
                } else {
                    document.getElementById('confirm-password-error').style.display = 'none';
                    confirmPasswordInput.classList.remove('error');
                }
                
                // Validate role
                if (!roleSelect.value) {
                    document.getElementById('role-error').style.display = 'block';
                    roleSelect.classList.add('error');
                    isValid = false;
                } else {
                    document.getElementById('role-error').style.display = 'none';
                    roleSelect.classList.remove('error');
                }
                
                // Validate terms checkbox
                if (!termsCheckbox.checked) {
                    document.getElementById('terms-error').style.display = 'block';
                    termsCheckbox.classList.add('error');
                    isValid = false;
                } else {
                    document.getElementById('terms-error').style.display = 'none';
                    termsCheckbox.classList.remove('error');
                }
                
                return isValid;
            }
            
            // Real-time validation
            nameInput.addEventListener('input', function() {
                if (this.value.trim()) {
                    document.getElementById('name-error').style.display = 'none';
                    this.classList.remove('error');
                }
            });
            
            emailInput.addEventListener('input', function() {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (this.value.trim() && emailRegex.test(this.value)) {
                    document.getElementById('email-error').style.display = 'none';
                    this.classList.remove('error');
                }
            });
            
            passwordInput.addEventListener('input', function() {
                if (this.value.trim() && this.value.length >= 8) {
                    document.getElementById('password-error').style.display = 'none';
                    this.classList.remove('error');
                    
                    // Also validate confirm password if password changes
                    if (confirmPasswordInput.value.trim()) {
                        if (confirmPasswordInput.value === this.value) {
                            document.getElementById('confirm-password-error').style.display = 'none';
                            confirmPasswordInput.classList.remove('error');
                        } else {
                            document.getElementById('confirm-password-error').style.display = 'block';
                            confirmPasswordInput.classList.add('error');
                        }
                    }
                }
            });
            
            confirmPasswordInput.addEventListener('input', function() {
                if (this.value.trim() && this.value === passwordInput.value) {
                    document.getElementById('confirm-password-error').style.display = 'none';
                    this.classList.remove('error');
                }
            });
            
            roleSelect.addEventListener('change', function() {
                if (this.value) {
                    document.getElementById('role-error').style.display = 'none';
                    this.classList.remove('error');
                }
            });
            
            termsCheckbox.addEventListener('change', function() {
                if (this.checked) {
                    document.getElementById('terms-error').style.display = 'none';
                    this.classList.remove('error');
                }
            });
            
            // Form submission
            signupForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                if (validateForm()) {
                    // Show loading state
                    signupBtn.innerHTML = '<div class="spinner"></div>';
                    signupBtn.disabled = true;
                    
                    // Simulate API call
                    setTimeout(() => {
                        // For demo purposes, we're just storing in localStorage
                        const user = {
                            name: nameInput.value.trim(),
                            email: emailInput.value.trim(),
                            initials: nameInput.value.trim().substring(0, 2).toUpperCase(),
                            role: roleSelect.value,
                            isLoggedIn: true,
                            profileComplete: false
                        };
                        
                        localStorage.setItem('user', JSON.stringify(user));



                        // Redirect to profile setup
                        window.location.href = 'profile-setup.html';
                        
                         // Redirect based on email prefix and profile completion
                        // Check if email starts with 'u' (student) or not (faculty/admin)
                        //if (email.toLowerCase().startsWith('u') || email.toLowerCase().includes('student') || user.role === 'student') {
                          //  window.location.href = 'sprofile-setup.html';
                        //} else {
                          //  window.location.href = 'fprofile-setup.html';
                        //}
                    
                        // Reset button
                        signupBtn.innerHTML = '<i class="fas fa-user-plus"></i> Continue';
                        signupBtn.disabled = false;
                    }, 1500);
                }
            });
        });
       