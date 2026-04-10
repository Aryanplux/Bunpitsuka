document.addEventListener('DOMContentLoaded', () => {
    const toneSelect = document.getElementById('toneSelect');
    const statusMessage = document.getElementById('statusMessage');

    // Load saved tone from Chrome storage
    chrome.storage.local.get(['aiTone'], (result) => {
        if (result.aiTone) {
            toneSelect.value = result.aiTone;
        }
    });

    // Save tone on change
    toneSelect.addEventListener('change', () => {
        const selectedTone = toneSelect.value;
        chrome.storage.local.set({ aiTone: selectedTone }, () => {
            // Show a brief saved message
            statusMessage.style.display = 'block';
            setTimeout(() => {
                statusMessage.style.display = 'none';
            }, 1200);
        });
    });
});
