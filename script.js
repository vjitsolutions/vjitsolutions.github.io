        // 3D Background with Three.js
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById('hero-canvas'),
            antialias: true,
            alpha: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0xf5f9ff, 1);
        
        // Create particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 1000;
        
        const posArray = new Float32Array(particlesCount * 3);
        for(let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 10;
        }
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.005,
            color: 0x0066cc,
            transparent: true,
            opacity: 0.8
        });
        
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);
        
        // Create data-themed objects
        // Hard drive platter
        const platterGeometry = new THREE.CylinderGeometry(1, 1, 0.1, 32);
        const platterMaterial = new THREE.MeshBasicMaterial({ 
            color: 0x888888,
            transparent: true,
            opacity: 0.3
        });
        const platter = new THREE.Mesh(platterGeometry, platterMaterial);
        platter.position.set(-3, 0, -5);
        scene.add(platter);
        
        // Memory card
        const cardGeometry = new THREE.BoxGeometry(0.6, 0.4, 0.05);
        const cardMaterial = new THREE.MeshBasicMaterial({ 
            color: 0x00aaff,
            transparent: true,
            opacity: 0.3
        });
        const card = new THREE.Mesh(cardGeometry, cardMaterial);
        card.position.set(3, 1, -5);
        scene.add(card);
        
        // Hard drive
        const driveGeometry = new THREE.BoxGeometry(1, 0.2, 1.4);
        const driveMaterial = new THREE.MeshBasicMaterial({ 
            color: 0x333333,
            transparent: true,
            opacity: 0.3
        });
        const drive = new THREE.Mesh(driveGeometry, driveMaterial);
        drive.position.set(2, -1, -6);
        scene.add(drive);
        
        // Digital data flow (lines)
        const createDataLine = (x1, y1, z1, x2, y2, z2) => {
            const points = [];
            points.push(new THREE.Vector3(x1, y1, z1));
            points.push(new THREE.Vector3(x2, y2, z2));
            
            const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
            const lineMaterial = new THREE.LineBasicMaterial({ 
                color: 0x00aaff,
                transparent: true,
                opacity: 0.3
            });
            
            const line = new THREE.Line(lineGeometry, lineMaterial);
            scene.add(line);
            return line;
        };
        
        const dataLines = [];
        for(let i = 0; i < 15; i++) {
            const x1 = (Math.random() - 0.5) * 8;
            const y1 = (Math.random() - 0.5) * 8;
            const z1 = -10;
            
            const x2 = (Math.random() - 0.5) * 8;
            const y2 = (Math.random() - 0.5) * 8;
            const z2 = -5;
            
            dataLines.push(createDataLine(x1, y1, z1, x2, y2, z2));
        }
        
        camera.position.z = 5;
        
        // Animation
        function animate() {
            requestAnimationFrame(animate);
            
            particlesMesh.rotation.y += 0.001;
            particlesMesh.rotation.x += 0.0005;
            
            platter.rotation.y += 0.01;
            card.rotation.y += 0.005;
            drive.rotation.y += 0.003;
            
            dataLines.forEach(line => {
                line.rotation.z += 0.002;
                line.rotation.x += 0.001;
            });
            
            renderer.render(scene, camera);
        }
        animate();
        
        // Resize canvas on window resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
        
        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Back to top button
            const backToTop = document.querySelector('.back-to-top');
            if (window.scrollY > 300) {
                backToTop.classList.add('active');
            } else {
                backToTop.classList.remove('active');
            }
        });
        
        // Mobile menu toggle
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close mobile menu on link click
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Back to top functionality
        document.querySelector('.back-to-top').addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Testimonial slider
        const testimonialTrack = document.querySelector('.testimonials-track');
        const testimonials = document.querySelectorAll('.testimonial');
        const dots = document.querySelectorAll('.dot');
        let currentIndex = 0;
        
        function updateSlider() {
            testimonialTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateSlider();
            });
        });
        
        // Auto slide testimonials
        setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            updateSlider();
        }, 5000);
        
    // Contact form submission
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
    
        // Send form data using EmailJS
        emailjs.sendForm('vjit service', 'template_d22gufa', this)
        .then(() => {
            alert('Thank you for your message! We will contact you shortly.');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Oops! Something went wrong. Please try again later.');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    });
    

        
        // Animate elements on scroll
        function animateOnScroll() {
            const elements = document.querySelectorAll('.service-card, .feature-card, .tips-box, .step, .about-text, .about-image, .team-card');
            
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight - 100) {
                    gsap.to(element, {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: 'power2.out'
                    });
                }
            });
        }
        
        // Set initial opacity
        gsap.set('.service-card, .feature-card, .tips-box, .step, .about-text, .about-image, .team-card', {
            opacity: 0,
            y: 30
        });
        
        window.addEventListener('scroll', animateOnScroll);
        window.addEventListener('load', animateOnScroll);