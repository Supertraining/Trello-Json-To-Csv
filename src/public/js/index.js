// Theme toggle functionality
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const htmlElement = document.documentElement;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        themeIcon.className = theme === 'light' ? 'ri-moon-line' : 'ri-sun-line';
    }
});

// File upload and drag & drop functionality
const fileInput = document.querySelector('.file-input');
const uploadForm = document.getElementById('upload-form');
const fileInputText = document.querySelector('.file-input-text');

// Handle file selection
fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        updateFileInputText(file.name);
    }
});

// Drag and drop handlers
uploadForm.addEventListener('dragenter', (e) => {
    e.preventDefault();
    uploadForm.classList.add('dragging');
});

uploadForm.addEventListener('dragleave', (e) => {
    e.preventDefault();
    if (!uploadForm.contains(e.relatedTarget)) {
        uploadForm.classList.remove('dragging');
    }
});

uploadForm.addEventListener('dragover', (e) => {
    e.preventDefault();
});

uploadForm.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadForm.classList.remove('dragging');
    const file = e.dataTransfer.files[0];
    if (file) {
        fileInput.files = e.dataTransfer.files;
        updateFileInputText(file.name);
    }
});

function updateFileInputText(fileName) {
    fileInputText.innerHTML = `Selected file: <strong>${fileName}</strong><br>Click Convert to proceed`;
}

async function downloadCSV(e) {
    e.preventDefault();
    const file = e.target.file.files[0];
    
    if (!file) {
        showNotification('Please select a file first', 'error');
        return;
    }
    
    try {
        const formData = new FormData(e.target);
        const response = await fetch('/download', {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error('Failed to convert file');
        }
        
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `${cleanName(file)}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        showNotification('File converted successfully!', 'success');
    } catch (error) {
        showNotification('Error converting file. Please try again.', 'error');
        console.error('Error:', error);
    }
}

function cleanName(file) {
    return file?.name?.replace('.json', '') || 'trello_board';
}

function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add notification styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 2rem',
        borderRadius: '0.5rem',
        backgroundColor: type === 'success' ? 'var(--success-color)' : 'var(--error-color)',
        color: 'white',
        boxShadow: '0 2px 5px var(--shadow-color)',
        zIndex: '1000',
        transition: 'all 0.3s ease',
        transform: 'translateX(120%)'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(120%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}