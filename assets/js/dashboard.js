/**
 * Dashboard Logic for Car Insurance Advisory
 */

document.addEventListener('DOMContentLoaded', function () {

    // --- Lucide Icons ---
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // -------------------------------------------------------
    // Sidebar Toggle (Mobile)
    // -------------------------------------------------------
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.querySelector('.dashboard-sidebar');

    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            sidebar.classList.toggle('active');
        });
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (sidebar && sidebar.classList.contains('active')) {
            if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        }
    });

    // -------------------------------------------------------
    // Tab Navigation (Sidebar links → Dashboard views)
    // -------------------------------------------------------
    const navLinks = document.querySelectorAll('.sidebar-link[data-target]');
    const dashViews = document.querySelectorAll('.dash-view');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Deactivate all links
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            // Hide all views
            dashViews.forEach(v => v.classList.add('d-none'));

            // Show the target view
            const targetId = this.getAttribute('data-target');
            const targetView = document.getElementById(targetId);
            if (targetView) {
                targetView.classList.remove('d-none');
            }

            // Re-render Lucide icons for newly shown views
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }

            // Mobile: close sidebar after navigating
            if (window.innerWidth < 992 && sidebar) {
                sidebar.classList.remove('active');
            }
        });
    });

    // -------------------------------------------------------
    // File Upload (Drop Zone)
    // -------------------------------------------------------
    const dropZone = document.getElementById('policy-drop-zone');
    const fileInput = document.getElementById('policy-file-input');

    if (dropZone && fileInput) {
        dropZone.addEventListener('click', () => fileInput.click());

        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('border-accent');
        });

        dropZone.addEventListener('dragleave', () => {
            dropZone.classList.remove('border-accent');
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('border-accent');
            if (e.dataTransfer.files.length) {
                handleFileUpload(e.dataTransfer.files[0]);
            }
        });

        fileInput.addEventListener('change', function () {
            if (this.files.length) {
                handleFileUpload(this.files[0]);
            }
        });
    }

    function handleFileUpload(file) {
        const uploadStatus = document.getElementById('upload-status');
        if (uploadStatus) {
            uploadStatus.innerHTML = `
                <div class="alert alert-success mt-3 py-2 d-flex align-items-center mb-0">
                    <i data-lucide="check-circle" class="me-2" size="18"></i>
                    <span class="small"><b>${file.name}</b> uploaded successfully! Under review.</span>
                </div>
            `;
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }
    }

});
