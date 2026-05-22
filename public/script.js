document.addEventListener('DOMContentLoaded', () => {
    const quoteElement = document.getElementById('quote');
    const motivateBtn = document.getElementById('motivate-btn');

    // Function to fetch a new quote
    const fetchQuote = async () => {
        try {
            // Fade out current quote
            quoteElement.classList.add('fade-out');

            const response = await fetch('/motivate');
            if (!response.ok) {
                throw new Error('Failed to fetch motivation');
            }
            const data = await response.json();

            // Wait for fade out transition before updating text
            setTimeout(() => {
                quoteElement.innerText = `"${data.reason}"`; // Reusing the 'reason' key from the backend for now
                // Fade in new quote
                quoteElement.classList.remove('fade-out');
            }, 500); // 500ms matches the CSS transition time
            
        } catch (error) {
            console.error('Error fetching quote:', error);
            setTimeout(() => {
                quoteElement.innerText = '"Oops, even our servers need a break. Try again!"';
                quoteElement.classList.remove('fade-out');
            }, 500);
        }
    };

    // Fetch initial quote on load
    fetchQuote();

    // Fetch new quote on button click
    motivateBtn.addEventListener('click', fetchQuote);
});
