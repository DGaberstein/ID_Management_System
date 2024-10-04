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
        idsList.removeChild(idToDelete);
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
        addIdBtn.disabled = false;    // Enable the add button
    });
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
