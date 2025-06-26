// DOM Elements
        const signinForm = document.getElementById('signin-form');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const emailError = document.getElementById('email-error');
        const passwordError = document.getElementById('password-error');
        const togglePassword = document.getElementById('toggle-password');

        // Toggle password visibility
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });

        // Form validation
        function validateForm() {
            let isValid = true;
            
            // Validate email
            if (!emailInput.value.trim()) {
                emailError.style.display = 'block';
                emailInput.classList.add('error');
                isValid = false;
            } else {
                emailError.style.display = 'none';
                emailInput.classList.remove('error');
            }
            
            // Validate password
            if (!passwordInput.value.trim()) {
                passwordError.style.display = 'block';
                passwordInput.classList.add('error');
                isValid = false;
            } else {
                passwordError.style.display = 'none';
                passwordInput.classList.remove('error');
            }
            
            return isValid;
        }

        // Form submission
        signinForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                // Show loading state
                const signinBtn = document.getElementById('signin-btn');
                signinBtn.innerHTML = '<div class="spinner"></div>';
                
                // Simulate API call
                setTimeout(() => {
                    // For demo purposes, we're just storing in localStorage
                    const demoUsers = {
                        'student@univ.edu': {
                            name: 'John Student',
                            email: 'student@univ.edu',
                            initials: 'JS',
                            role: 'student',
                            isLoggedIn: true,
                            profile: {
                                name: 'John Student',
                                department: 'Computer Science',
                                level: 'junior',
                                term: 'fall-2023',
                                courses: ['CSE-326', 'CSE-335', 'CSE-331'],
                                profileComplete: true
                            }
                        },
                        'faculty@univ.edu': {
                            name: 'Dr. Sarah Faculty',
                            email: 'faculty@univ.edu',
                            initials: 'SF',
                            role: 'faculty',
                            isLoggedIn: true,
                            profile: {
                                name: 'Dr. Sarah Faculty',
                                department: 'Computer Science',
                                position: 'assistant-professor',
                                term: 'fall-2023',
                                courses: ['CSE-326', 'CSE-335'],
                                profileComplete: true
                            }
                        },
                        'admin@univ.edu': {
                            name: 'Admin User',
                            email: 'admin@univ.edu',
                            initials: 'AU',
                            role: 'admin',
                            isLoggedIn: true,
                            profile: {
                                name: 'Admin User',
                                department: 'Administration',
                                position: 'admin',
                                profileComplete: true
                            }
                        }
                    };
                    
                    const email = emailInput.value.trim();
                    const user = demoUsers[email] || {
                        name: email.split('@')[0],
                        email: email,
                        initials: email.substring(0, 2).toUpperCase(),
                        role: 'student',
                        isLoggedIn: true,
                        profileComplete: false
                    };
                    
                    localStorage.setItem('user', JSON.stringify(user));
                    
                    // Redirect based on email prefix and profile completion
                        // Check if email starts with 'u' (student) or not (faculty/admin)
                        if (email.toLowerCase().startsWith('u') || email.toLowerCase().includes('student')) {
                            window.location.href = 'sdashboard.html';
                        } else {
                            window.location.href = 'fdashboard.html';
                        }
                    
                    
                    // Reset button
                    signinBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Continue';
                }, 1000);
            }
        });

        // Real-time validation
        emailInput.addEventListener('input', function() {
            if (this.value.trim()) {
                emailError.style.display = 'none';
                this.classList.remove('error');
            }
        });

        passwordInput.addEventListener('input', function() {
            if (this.value.trim()) {
                passwordError.style.display = 'none';
                this.classList.remove('error');
            }
        });