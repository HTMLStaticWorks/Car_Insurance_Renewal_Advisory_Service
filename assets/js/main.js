/**
 * TrailTune - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function () {
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Dark Mode Toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const updateIcon = () => {
            const isLight = document.body.classList.contains('light-theme');
            const iconContainer = themeToggle;
            
            // Clear existing icon and create new one
            iconContainer.innerHTML = isLight ? '<i data-lucide="moon"></i>' : '<i data-lucide="sun"></i>';
            
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        };

        // Check for saved theme
        if (localStorage.getItem('theme') === 'light') {
            document.body.classList.add('light-theme');
        }
        
        updateIcon();

        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
            updateIcon();
        });
    }

    // RTL Toggle (For Template Demo)
    const rtlToggle = document.getElementById('rtl-toggle');
    if (rtlToggle) {
        rtlToggle.addEventListener('click', () => {
            const currentDir = document.documentElement.getAttribute('dir');
            const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
            document.documentElement.setAttribute('dir', newDir);
            localStorage.setItem('dir', newDir);
        });
    }

    // Check for saved direction
    if (localStorage.getItem('dir') === 'rtl') {
        document.documentElement.setAttribute('dir', 'rtl');
    }

    // AOS Animation Initialization
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-out-cubic',
            once: true,
            offset: 50,
            delay: 100
        });
    }

    // Lucide Icons Initialization
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Active Menu Highlighting for Dropdowns
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const dropdownItems = document.querySelectorAll('.dropdown-item');

    dropdownItems.forEach(item => {
        if (item.getAttribute('href') === currentPath) {
            item.classList.add('active');
            const parentDropdown = item.closest('.dropdown');
            if (parentDropdown) {
                const parentLink = parentDropdown.querySelector('.nav-link');
                if (parentLink) {
                    parentLink.classList.add('active');
                }
            }
        }
    });

    // Scroll to Top Logic
    const scrollTopBtn = document.getElementById('scroll-top');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Password Visibility Toggle
    const togglePasswords = document.querySelectorAll('.password-toggle');
    togglePasswords.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const input = toggle.parentElement.querySelector('input');
            const icon = toggle.querySelector('i');

            if (input.type === 'password') {
                input.type = 'text';
                icon.setAttribute('data-lucide', 'eye-off');
            } else {
                input.type = 'password';
                icon.setAttribute('data-lucide', 'eye');
            }
            lucide.createIcons();
        });
    });

    // Skeleton Loaders - Simple removal demo
    const skeletons = document.querySelectorAll('.skeleton');
    if (skeletons.length > 0) {
        setTimeout(() => {
            skeletons.forEach(s => s.classList.remove('skeleton'));
        }, 1500);
    }
    // Navbar Mobile Scroll Lock
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse) {
        navbarCollapse.addEventListener('show.bs.collapse', () => {
            document.body.classList.add('no-scroll');
        });
        navbarCollapse.addEventListener('hidden.bs.collapse', () => {
            document.body.classList.remove('no-scroll');
        });
    }
});



/* --- Merged from turnaround-estimator.js --- */
/**
 * Turnaround Estimator Logic
 */

document.addEventListener('DOMContentLoaded', function() {
    const serviceSelect = document.getElementById('estimator-service');
    const rushToggle = document.getElementById('estimator-rush');
    const outputDate = document.getElementById('estimator-date');
    const outputPrice = document.getElementById('estimator-price');

    if (!serviceSelect) return;

    const basePrices = {
        'fork-lower': 85,
        'fork-full': 160,
        'shock-air': 75,
        'shock-full': 140,
        'tuning': 200
    };

    const baseDays = {
        'fork-lower': 3,
        'fork-full': 5,
        'shock-air': 3,
        'shock-full': 5,
        'tuning': 7
    };

    function updateEstimates() {
        const service = serviceSelect.value;
        const isRush = rushToggle.checked;

        let days = baseDays[service] || 5;
        let price = basePrices[service] || 100;

        if (isRush) {
            days = Math.max(1, Math.floor(days * 0.4)); // 40% of time
            price += 40;
        }

        const completionDate = new Date();
        completionDate.setDate(completionDate.getDate() + days);

        const options = { weekday: 'long', month: 'short', day: 'numeric' };
        outputDate.innerText = completionDate.toLocaleDateString('en-US', options);
        outputPrice.innerText = "$" + price;
    }

    serviceSelect.addEventListener('change', updateEstimates);
    rushToggle.addEventListener('change', updateEstimates);

    updateEstimates();
});


/* --- Merged from spring-rate-calculator.js --- */
/**
 * Spring Rate Calculator Logic
 */

document.addEventListener('DOMContentLoaded', function() {
    const calcForm = document.getElementById('spring-rate-calc');
    if (!calcForm) return;

    const weightInput = document.getElementById('rider-weight');
    const unitToggle = document.getElementById('weight-unit'); // kg/lb
    const bikeType = document.getElementById('bike-type');
    const travelInput = document.getElementById('bike-travel');
    const styleInput = document.getElementById('riding-style');
    
    const outputRate = document.getElementById('calc-output-rate');
    const outputPsi = document.getElementById('calc-output-psi');
    const outputSag = document.getElementById('calc-output-sag');

    function calculate() {
        let weight = parseFloat(weightInput.value);
        if (isNaN(weight) || weight <= 0) return;

        // Convert to kg for internal calc
        if (unitToggle.value === 'lb') {
            weight = weight * 0.453592;
        }

        const bikeFactor = bikeType.value === 'dh' ? 1.2 : (bikeType.value === 'enduro' ? 1.1 : 1.0);
        const styleFactor = styleInput.value === 'aggressive' ? 1.15 : (styleInput.value === 'smooth' ? 0.9 : 1.0);
        
        // Simplified heuristic for coil rate (lbs/in)
        // Rate = (Weight * Factor) / Travel Ratio
        const baseRate = weight * 6.5 * bikeFactor * styleFactor;
        
        // Simplified heuristic for air PSI
        const basePsi = weight * 1.1 * bikeFactor * styleFactor;

        // Target Sag %
        const sagTarget = bikeType.value === 'dh' ? '30%' : (bikeType.value === 'enduro' ? '28%' : '25%');

        // Update UI
        outputRate.innerText = Math.round(baseRate / 50) * 50 + " lbs/in";
        outputPsi.innerText = Math.round(basePsi) + " PSI";
        outputSag.innerText = sagTarget;
    }

    [weightInput, unitToggle, bikeType, travelInput, styleInput].forEach(el => {
        el.addEventListener('change', calculate);
        el.addEventListener('input', calculate);
    });

    calculate(); // Initial run
});
