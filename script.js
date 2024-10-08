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
let ids = [];  // This array will store added IDs

// Toggle Settings Slider
settingsBtn.addEventListener('click', () => {
    settingsSlider.classList.toggle('slider-active');
});

closeSliderBtn.addEventListener('click', () => {
    settingsSlider.classList.remove('slider-active');
});

// Delete an ID with confirmation
idsList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        idToDelete = e.target.parentElement;
        deleteModal.style.display = 'flex';
    }
});

// Confirm delete
confirmDeleteButton.addEventListener('click', () => {
    if (idToDelete) {
        const idText = idToDelete.textContent.trim().split(' ')[1];
        ids = ids.filter(id => id !== idText);  // Remove ID from the array
        idsList.removeChild(idToDelete);  // Remove ID from the list
        idToDelete = null;
        deleteModal.style.display = 'none';
    }
});

// Cancel delete
cancelDeleteButton.addEventListener('click', () => {
    idToDelete = null;
    deleteModal.style.display = 'none';
});

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

// Enable ID input when a radio button is selected
radioButtons.forEach((radio) => {
    radio.addEventListener('change', () => {
        newIdInput.disabled = false;  // Enable the input field
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

// Add the ID and corresponding icon to the list when clicking the add button
addIdBtn.addEventListener('click', () => {
    const newId = newIdInput.value.trim();

    // Check for duplicate ID
    if (ids.includes(newId)) {
        alert('This ID already exists. Please use a different ID.');
        return;  // Stop if duplicate ID is found
    }

    if (newId !== '') {
        // Get the selected icon type
        let selectedIcon;
        radioButtons.forEach((radio) => {
            if (radio.checked) {
                selectedIcon = radio.value === 'trailer' ? '<i class="fas fa-trailer"></i>' : '<i class="fas fa-exchange-alt"></i>';
            }
        });

        // Create list item with icon and ID
        const li = document.createElement('li');
        li.innerHTML = `${selectedIcon} ${newId} <button class="delete-btn">Delete</button>`;
        idsList.appendChild(li);

        // Add ID to the array
        ids.push(newId);

        // Clear input field and disable add button
        newIdInput.value = '';
        addIdBtn.disabled = true;
    }
});

// Language selection handling
languageSelect.addEventListener('change', () => {
    const selectedLanguage = languageSelect.value;
    switch (selectedLanguage) {
        case 'en':
            document.getElementById('main-title').innerText = 'ID Management System';
            document.getElementById('settings-title').innerText = 'Settings';
            document.getElementById('toggle-dark-mode').innerText = 'Toggle Dark Mode';
            document.getElementById('language-label').innerText = 'Language:';
            document.getElementById('trailer-label').innerText = 'Trailer';
            document.getElementById('swapbody-label').innerText = 'Swapbody';
            document.getElementById('current-ids-title').innerText = 'Current IDs';
            document.getElementById('delete-confirmation-text').innerText = 'Are you sure you want to delete this ID?';
            document.getElementById('confirm-delete').innerText = 'Confirm';
            document.getElementById('cancel-delete').innerText = 'Cancel';
            break;
        case 'de':
            document.getElementById('main-title').innerText = 'ID-Verwaltungssystem';
            document.getElementById('settings-title').innerText = 'Einstellungen';
            document.getElementById('toggle-dark-mode').innerText = 'Dunkelmodus umschalten';
            document.getElementById('language-label').innerText = 'Sprache:';
            document.getElementById('trailer-label').innerText = 'Anhänger';
            document.getElementById('swapbody-label').innerText = 'Wechselbrücke';
            document.getElementById('current-ids-title').innerText = 'Aktuelle IDs';
            document.getElementById('delete-confirmation-text').innerText = 'Möchten Sie diese ID wirklich löschen?';
            document.getElementById('confirm-delete').innerText = 'Bestätigen';
            document.getElementById('cancel-delete').innerText = 'Abbrechen';
            break;
    }
});
