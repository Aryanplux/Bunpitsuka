// content.js - Gmail AI Reply Extension (Fixed)

console.log('Content script loaded');

function createAIButton() {
    const button = document.createElement('div');
    button.className = 'T-I J-J5-Ji aoO v7 T-I-atl L3';
    button.style.marginRight = '8px';
    button.innerHTML = 'AI Reply';
    button.setAttribute('role', 'button');
    button.setAttribute('data-tooltip', 'Generate AI response');
    button.classList.add('ai-reply-button');
    return button;
}

function getEmailContent() {
    // Fixed: try all selectors before returning empty string
    const selectors = [
        '.h7',               // Gmail's email body (common)
        '.a3s.aiL',          // Alternative email content
        '.gmail_quote',      // Quoted text (fallback)
        '[role="presentation"]',
        'div[dir="ltr"]',    // General fallback
        '.ii.gt'             // Another common Gmail class
    ];
    
    for (const selector of selectors) {
        const element = document.querySelector(selector);
        if (element && element.innerText && element.innerText.trim().length > 0) {
            return element.innerText.trim();
        }
    }
    return ''; // No content found
}

function findComposeToolbar() {
    // Fixed: try all selectors, return first match
    const selectors = [
        '.btC',              // Gmail compose toolbar (common)
        '.aDh',              // Alternative toolbar
        '[role="toolbar"]',  // ARIA toolbar
        '.gU.Up',            // Another toolbar class
        '.Am.Al.editable'    // Compose area itself (fallback)
    ];
    
    for (const selector of selectors) {
        const toolbar = document.querySelector(selector);
        if (toolbar) {
            return toolbar;
        }
    }
    return null;
}

async function generateAIResponse(emailContent, tone, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch('http://localhost:8081/api/email/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ emailContent, tone })
            });

            if (response.status === 503 && i < retries - 1) {
                // Wait 2 seconds, then retry (exponential backoff)
                await new Promise(resolve => setTimeout(resolve, 2000 * (i + 1)));
                continue;
            }

            if (!response.ok) throw new Error(`API failed with status ${response.status}`);
            return await response.text();
        } catch (err) {
            if (i === retries - 1) throw err;
            await new Promise(resolve => setTimeout(resolve, 2000 * (i + 1)));
        }
    }
}

function insertGeneratedText(text) {
    // More reliable compose box selectors
    const composeSelectors = [
        '[role="textbox"][g_editable="true"]',
        '[aria-label*="Message Body"]',
        '.Am.Al.editable',
        'div[contenteditable="true"][role="textbox"]'
    ];
    
    let composeBox = null;
    for (const selector of composeSelectors) {
        composeBox = document.querySelector(selector);
        if (composeBox) break;
    }
    
    if (!composeBox) {
        throw new Error('Compose box not found');
    }
    
    composeBox.focus();
    // Modern way to insert text into contenteditable
    composeBox.innerText = text;
    // Trigger input event so Gmail registers the change
    composeBox.dispatchEvent(new Event('input', { bubbles: true }));
}

function injectButton() {
    // Remove existing button if any
    const existingButton = document.querySelector('.ai-reply-button');
    if (existingButton) existingButton.remove();

    const toolbar = findComposeToolbar();
    if (!toolbar) {
        console.log('Toolbar not found – compose window may not be fully loaded');
        return;
    }
    
    console.log('Toolbar found, creating AI Reply button');
    const button = createAIButton();

    button.addEventListener('click', async () => {
        try {
            button.innerHTML = 'Generating...';
            button.style.opacity = '0.6';
            button.style.pointerEvents = 'none';

            const emailContent = getEmailContent();
            if (!emailContent) {
                throw new Error('Could not extract email content. Please make sure an email is open.');
            }
            
            // Read preferred tone from storage, default to professional
            const { aiTone } = await chrome.storage.local.get(['aiTone']);
            const selectedTone = aiTone || 'professional';
            
            const generatedText = await generateAIResponse(emailContent, selectedTone);
            insertGeneratedText(generatedText);
            
        } catch (error) {
            console.error('AI Reply Error:', error);
            if (error.message.includes('503') || error.message.includes('high demand')) {
                alert('Gemini API is currently overloaded. Please try again in a few minutes.');
            } else {
                alert('Failed to generate AI response: ' + error.message);
            }
        } finally {
            button.innerHTML = 'AI Reply';
            button.style.opacity = '1';
            button.style.pointerEvents = 'auto';
        }
    });

    toolbar.insertBefore(button, toolbar.firstChild);
}

// Watch for Gmail's dynamic compose window
const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        const addedNodes = Array.from(mutation.addedNodes);
        const hasComposeElements = addedNodes.some(node => {
            if (node.nodeType !== Node.ELEMENT_NODE) return false;
            return node.matches && (
                node.matches('.aDh, .btC, [role="dialog"]') ||
                node.querySelector('.aDh, .btC, [role="dialog"]')
            );
        });

        if (hasComposeElements) {
            console.log('Compose window detected, injecting custom UI');
            // Small delay to ensure toolbar is fully rendered
            setTimeout(injectButton, 500);
        }
    }
});

observer.observe(document.body, { childList: true, subtree: true });

// Also try to inject immediately in case compose window is already open
if (document.querySelector('.aDh, .btC, [role="dialog"]')) {
    injectButton();
}