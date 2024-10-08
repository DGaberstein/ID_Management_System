// Variables for elements
const settingsBtn = document.getElementById('settings-btn');
const settingsSlider = document.getElementById('settings-slider');
const closeSliderBtn = document.getElementById('close-slider');
const darkModeToggle = document.getElementById('toggle-dark-mode');
const languageSelect = document.getElementById('language-select');
const idsList = document.getElementById('ids');
const deleteModal = document.getElementById('delete-modal');
const confirmDeleteButton = document.getElementById('confirm-delete');
const cancelDeleteButton = document.getElementById('cancel-delete');
const addIdBtn = document.getElementById('add-id-btn');
const newIdInput = document.getElementById('new-id');
const radioButtons = document.querySelectorAll('input[name="icon-type"]');

let darkMode = false;
let idToDelete = null;
let ids = [];

// Toggle Settings Slider
settingsBtn.addEventListener('click', () => {
    settingsSlider.classList.toggle('slider-active');
});

closeSliderBtn.addEventListener('click', () => {
    settingsSlider.classList.remove('slider-active');
});

// Enable ID input when a radio button is selected
radioButtons.forEach((radio) => {
    radio.addEventListener('change', () => {
        newIdInput.disabled = false;  // Enable the input field
        newIdInput.dataset.iconType = radio.value; // Store the selected icon type
    });
});

// Enable/Disable the Add button based on input value
newIdInput.addEventListener('input', () => {
    if (newIdInput.value.trim() !== '') {
        addIdBtn.disabled = false;
    } else {
        addIdBtn.disabled = true;
    }
});

// Add the ID to the list when clicking the add button
addIdBtn.addEventListener('click', () => {
    const newId = newIdInput.value.trim();
    const iconType = newIdInput.dataset.iconType || 'trailer';
    const timestamp = new Date().toLocaleString();

    if (newId !== '') {
        if (isDuplicate(newId, iconType)) {
            alert('This ID already exists for the selected vehicle type.');
            return;
        }

        const li = document.createElement('li');
        li.innerHTML = `<span class="id-text">${newId}</span> - <span class="icon-type">${iconType}</span> 
                        <span class="timestamp">(${timestamp})</span> 
                        <button class="delete-btn">Delete</button>`;
        idsList.appendChild(li);

        ids.push({ id: newId, iconType: iconType, timestamp: timestamp });

        newIdInput.value = '';  // Clear input field
        addIdBtn.disabled = true;  // Disable button after adding
    }
});

// Delete an ID with confirmation
idsList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const li = e.target.parentElement;
        const idText = li.querySelector('.id-text').innerText;
        const iconType = li.querySelector('.icon-type').innerText;

        idToDelete = ids.findIndex(item => item.id === idText && item.iconType === iconType);
        deleteModal.style.display = 'flex';
    }
});

// Confirm delete
confirmDeleteButton.addEventListener('click', () => {
    if (idToDelete !== null) {
        ids.splice(idToDelete, 1); // Remove from array
        idsList.removeChild(idsList.children[idToDelete]); // Remove from UI
        idToDelete = null;
        deleteModal.style.display = 'none';
    }
});

// Cancel delete
cancelDeleteButton.addEventListener('click', () => {
    idToDelete = null;
    deleteModal.style.display = 'none';
});

// Check for duplicate IDs for the same icon type
function isDuplicate(id, iconType) {
    return ids.some(item => item.id === id && item.iconType === iconType);
}

// Toggle dark mode
darkModeToggle.addEventListener('click', () => {
    darkMode = !darkMode;
    document.body.classList.toggle('dark-mode', darkMode);
    applyDarkModeToModal();
});

// Apply dark mode to modal as well
function applyDarkModeToModal() {
    const modalContent = document.querySelector('.modal-content');
    if (darkMode) {
        modalContent.classList.add('dark-mode');
    } else {
        modalContent.classList.remove('dark-mode');
    }
}
