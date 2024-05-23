import { useState, useEffect } from "react";
import Word from "./components/Word";
import Alphabets from "./components/Alphabets";
import Hangman from "./components/Hangman";
import Footer from "./components/Footer";
import FinalMessage from "./components/FinalMessage";
import { LuInfo } from "react-icons/lu";
import { LuLightbulb } from "react-icons/lu";
import { LuRefreshCw } from "react-icons/lu";
import { GoogleGenerativeAI } from "@google/generative-ai";

import hangmanImg1 from "./assets/hangmandrawings/state1.GIF";
import hangmanImg2 from "./assets/hangmandrawings/state2.GIF";
import hangmanImg3 from "./assets/hangmandrawings/state3.GIF";
import hangmanImg4 from "./assets/hangmandrawings/state4.GIF";
import hangmanImg5 from "./assets/hangmandrawings/state5.GIF";
import hangmanImg6 from "./assets/hangmandrawings/state6.GIF";
import hangmanImg7 from "./assets/hangmandrawings/state7.GIF";
import hangmanImg8 from "./assets/hangmandrawings/state8.GIF";
import hangmanImg9 from "./assets/hangmandrawings/state9.GIF";
import hangmanImg10 from "./assets/hangmandrawings/state10.gif";
import hangmanImg11 from "./assets/hangmandrawings/state11.GIF";

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

// For text-only input, use the gemini-pro model
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const hangmanImgs = [
    hangmanImg1,
    hangmanImg2,
    hangmanImg3,
    hangmanImg4,
    hangmanImg5,
    hangmanImg6,
    hangmanImg7,
    hangmanImg8,
    hangmanImg9,
    hangmanImg10,
    hangmanImg11,
];

function App() {
    const [word, setWord] = useState([]); // stores each letter of the word as an array of characters
    const [wordDetails, setWordDetails] = useState({
        hints: null,
        word: null,
        category: null,
    });
    const [wordSet, setWordSet] = useState(false); // sets whether the random word has been set
    const [loading, setLoading] = useState(true);
    const [hintRevealed, setHintRevealed] = useState(-1);
    const [curPressedKey, setCurPressedKey] = useState(null);
    const [alphabets, setAlphabets] = useState([
        { char: "a", set: null },
        { char: "b", set: null },
        { char: "c", set: null },
        { char: "d", set: null },
        { char: "e", set: null },
        { char: "f", set: null },
        { char: "g", set: null },
        { char: "h", set: null },
        { char: "i", set: null },
        { char: "j", set: null },
        { char: "k", set: null },
        { char: "l", set: null },
        { char: "m", set: null },
        { char: "n", set: null },
        { char: "o", set: null },
        { char: "p", set: null },
        { char: "q", set: null },
        { char: "r", set: null },
        { char: "s", set: null },
        { char: "t", set: null },
        { char: "u", set: null },
        { char: "v", set: null },
        { char: "w", set: null },
        { char: "x", set: null },
        { char: "y", set: null },
        { char: "z", set: null },
    ]); // used to change the color of the letter by changing the set value in each letter to green(true) or red(false)

    const [hangmanImage, setHangmanImage] = useState(hangmanImgs[0]); // state to keep track of the image being displayed to the user when they get a character wrong

    const [wrongCounter, setWrongCounter] = useState(2);

    // used to help output whether the user won, counts the amount of letters they got correct and matches it to the length of the word
    const [correctCounter, setCorrecttCounter] = useState(0);

    useEffect(() => {
        if (!wordSet) {
            async function generateWord() {
                const categories = [
                    "Animals",
                    "Movies",
                    "Television Series",
                    "Sports",
                    "Countries",
                    "Cities",
                ];
                // provide at least 5 hints that start off very vague and less obvious and become progressively more specific with each hint.
                const randomInt = Math.floor(Math.random() * (5 - 0 + 1)) + 0;
                const randomCategory = categories[randomInt];

                const prompt = `Generate a random interesting, fun and unique example that doed not include special characters or numbers from this specific category: ${randomCategory} , provide at least 3 hints that start off very general and less obvious and become slowly and progressively more helpful with each hint, do not include quotations in the hint. Please provide word, hints, and category in valid json format:  '{"word" : "Lion", "category": "Animal" , "hints": [{"hint": "...", "num": "1"}, {"hint": "...", "num": "2"}, {"hint": "...", "num": "3"}, {"hint": "...", "num": "4"}, {"hint": "...", "num": "5"}]}'`;

                const result = await model.generateContent(prompt);
                const response = await result.response;
                const text = response.text();

                function isValidJson(json) {
                    try {
                        JSON.parse(json);
                        return true;
                    } catch (e) {
                        return false;
                    }
                }
                if (!isValidJson(text.toString())) return restartGame();
                const data = await JSON.parse(text);

                // indexes the word at the given array and splits it to create an array of characters
                let splitChars = await data.word.split("");

                let chars = splitChars.map((character) => {
                    return { character: character, correct: false };
                });

                // adds to the correct counter based on the amount of spaces in the word
                const spaces = chars.filter(
                    (char) => char.character === " " && char
                );

                setCorrecttCounter(
                    (prevHintCount) => prevHintCount + spaces.length
                );

                let dataHints = data.hints.map((hint) => {
                    return { ...hint, revealed: false };
                });

                setWord(chars);

                const genWordDetails = {
                    hints: dataHints,
                    word: data.word,
                    category: data.category,
                };
                setWordDetails(genWordDetails);

                setLoading(false);
                setWordSet(true);
            }

            generateWord();
        }
    }, [wordSet]);

    const checkAlphabet = (alphabet, word, alphabets) => {
        // Ends the game by not allowing the user to select more letters
        if (correctCounter === word.length || wrongCounter > 11) {
            return;
        }

        // check my alphabet is not null
        // ensures the the alphabet can only be clicked on once
        let alphabetNotNull = false;
        alphabets.forEach((character) => {
            if (character.char === alphabet) {
                alphabetNotNull = character.set != null && true;
            }
        });

        if (alphabetNotNull !== true) {
            let alphabetInWord = false; // determines whether the alphabet the user clicks is in the word

            // the array(word) of characters is looped through and the value of the key 'character' for each iteration is converted to a lowercase and then compared to 'alphabet'
            word.forEach((character) => {
                if (character.character.toLowerCase() === alphabet) {
                    alphabetInWord = true;
                    // increments the correctCounter by one
                    setCorrecttCounter((correctCounter) => correctCounter + 1);
                }
            });

            if (alphabetInWord) {
                // A new array is created using map by changing the value of the 'set' key to true for the object within 'alphabets' of the alphabet that was clicked on
                let newAlphabets = alphabets.map((character) =>
                    character.char === alphabet
                        ? { ...character, set: true }
                        : character
                );

                setAlphabets(newAlphabets); // updates the state of 'alphabets' with the updated array

                // A new array is created using map by changing the value of the 'correct' key to true for the object within 'word' of the alphabet that was clicked
                let newWord = word.map((character) =>
                    character.character.toLowerCase() === alphabet
                        ? { ...character, correct: true }
                        : character
                );

                setWord(newWord); // updates the state of 'word' with the updated array
            } else {
                // A new array is created using map by changing the value of the 'set' key to false for the object within 'alphabets' of the alphabet that was clicked on
                let newAlphabets = alphabets.map((character) =>
                    character.char === alphabet.toLowerCase()
                        ? { ...character, set: false }
                        : character
                );

                setAlphabets(newAlphabets);
                // increments the wrongCounter by one
                setWrongCounter(wrongCounter + 1);
                // Changes the image based on the value of 'wrongCounter'
                setHangmanImage(hangmanImgs[wrongCounter - 1]);
            }
        }
    };

    // function that refreshes the page
    const restartGame = () => {
        setWrongCounter(2);
        setCorrecttCounter(0);
        setAlphabets([
            { char: "a", set: null },
            { char: "b", set: null },
            { char: "c", set: null },
            { char: "d", set: null },
            { char: "e", set: null },
            { char: "f", set: null },
            { char: "g", set: null },
            { char: "h", set: null },
            { char: "i", set: null },
            { char: "j", set: null },
            { char: "k", set: null },
            { char: "l", set: null },
            { char: "m", set: null },
            { char: "n", set: null },
            { char: "o", set: null },
            { char: "p", set: null },
            { char: "q", set: null },
            { char: "r", set: null },
            { char: "s", set: null },
            { char: "t", set: null },
            { char: "u", set: null },
            { char: "v", set: null },
            { char: "w", set: null },
            { char: "x", set: null },
            { char: "y", set: null },
            { char: "z", set: null },
        ]);
        setWord([]);
        setHangmanImage(hangmanImgs[0]);
        setWordSet(false);
        setLoading(true);
        setHintRevealed(-1);
    };

    const showHint = () => {
        if (hintRevealed < 5) {
            setHintRevealed((prevHintCount) => prevHintCount + 1);
        }
    };

    useEffect(() => {
        if (hintRevealed < 5 && hintRevealed >= 0) {
            const updatedHints = wordDetails.hints.map((hint) =>
                hintRevealed === parseInt(hint.num) - 1
                    ? { ...hint, revealed: true }
                    : hint
            );

            setWordDetails({ ...wordDetails, hints: updatedHints });
        }
    }, [hintRevealed]);

    // show info modal
    const showInfoModal = () => {
        const infoModal = document.querySelector("#dialog");

        infoModal.showModal();
    };
    const closeInfoModal = () => {
        const infoModal = document.querySelector("#dialog");

        infoModal.close();
    };

    const showHintsModal = () => {
        const hintsModal = document.querySelector("#dialog-hints");

        hintsModal.showModal();
    };
    const closeHintsModal = () => {
        const hintsModal = document.querySelector("#dialog-hints");

        hintsModal.close();
    };

    return (
        <main className="main-container">
            <div className="navbar-wrapper">
                <nav className="navbar">
                    <div className="logo">
                        H
                        {<LuRefreshCw onClick={restartGame} className="icon" />}
                        ngman
                    </div>
                </nav>
            </div>
            {loading && !wordSet ? (
                <div className="loading-animation">
                    <div className="loader" />
                    <p>Fetching random word...</p>
                </div>
            ) : (
                <>
                    <section>
                        {correctCounter === word.length || wrongCounter > 11 ? (
                            <FinalMessage
                                correctCounter={correctCounter}
                                wrongCounter={wrongCounter}
                                word={word}
                                correctWord={wordDetails.word}
                                restartGame={restartGame}
                            />
                        ) : (
                            <>
                                <div className="hangman-container">
                                    <Hangman image={hangmanImage} />
                                    <Word word={word} />
                                </div>
                                <div className="secondary-navbar">
                                    <LuLightbulb
                                        onClick={showHint}
                                        className="icon"
                                    />
                                    <LuInfo
                                        className="icon"
                                        onClick={showInfoModal}
                                    />
                                    <button
                                        className="btn"
                                        onClick={showHintsModal}>
                                        View Hints
                                    </button>
                                </div>

                                <Alphabets
                                    alphabets={alphabets}
                                    checkAlphabet={checkAlphabet}
                                    word={word}
                                />
                            </>
                        )}
                    </section>
                </>
            )}
            <dialog id="dialog-hints">
                <h3>Hints: </h3>
                <div className="hints">
                    {hintRevealed >= 0 ? (
                        wordDetails.hints.map(
                            (hint, index) =>
                                hint.revealed === true && (
                                    <li key={index} className="hint">
                                        {hint.hint}
                                    </li>
                                )
                        )
                    ) : (
                        <p>
                            No hints generated. Clicking on the <LuLightbulb />{" "}
                            icon provides a hint for the current word.{" "}
                        </p>
                    )}
                </div>
                <button className="btn btn-close" onClick={closeHintsModal}>
                    Close
                </button>
            </dialog>
            <dialog id="dialog">
                <h3>Chosen Category: {wordDetails.category}</h3>
                <p className="modalInfoDescription">
                    Start the game by clicking on a letter. You can generate a
                    new random word by clicking on the {<LuRefreshCw />} icon.
                    Clicking on the <LuLightbulb /> icon provides a hint for the
                    current word.
                </p>
                <button className="btn btn-close" onClick={closeInfoModal}>
                    Close
                </button>
            </dialog>
            <Footer />
        </main>
    );
}

export default App;
