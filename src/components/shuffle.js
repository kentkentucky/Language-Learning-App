// Get a random index ranging from 0 (inclusive) to max (exclusive).
const getRandomIndex = (max) => Math.floor(Math.random() * max);

// Shuffle an array of words
const shuffleWords = (words) => {
    // Loop over the word deck array once
    for (let i = 0; i < words.length; i += 1) {
        // Select a random index in the deck
        const j = getRandomIndex(words.length);
        // Select the word that corresponds to randomIndex
        const randomWord = words[j];
        // Select the word that corresponds to currentIndex
        const currentWord = words[i];
        // Swap positions of randomCard and currentCard in the deck
        words[i] = randomWord;
        words[j] = currentWord;
    }
    // Return the shuffled deck
    return words;
};

export { shuffleWords, getRandomIndex };