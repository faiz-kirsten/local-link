import { useState, useEffect } from "react";
import dir from "./dictionary.txt";
import Word from "./components/Word";
import Alphabets from "./components/Alphabets";
import Hangman from "./components/Hangman";
import Button from "./components/Button";
import Rules from "./components/Rules";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FinalMessage from "./components/FinalMessage";

function App() {
    const [word, setWord] = useState([]); // stores each letter of the word as an array of characters
    const [wordSet, setWordSet] = useState(false); // sets whether the random word has been set
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
        { char: "-", set: null },
    ]); // used to change the color of the letter by changing the set value in each letter to green(true) or red(false)

    const [hangmanImage, setHangmanImage] = useState(
        "/images/hangmandrawings/state1.gif"
    ); // state to keep track of the image being displayed to the user when they get a character wrong

    const [wrongCounter, setWrongCounter] = useState(2);

    // used to help output whether the user won, counts the amount of letters they got correct and matches it to the length of the word
    const [correctCounter, setCorrecttCounter] = useState(0);

    useEffect(() => {
        if (!wordSet) {
            // Reads from 'dictionary.txt'
            fetch(dir)
                .then((row) => row.text())
                .then((text) => {
                    const words = text.split("\n"); // splits each line in the text file by '\n'
                    const randomNum = Math.floor(Math.random() * words.length); // returns a random number
                    // indexes the word at the given array and splits it to create an array of characters
                    let wordCharacters = words[randomNum].split("");

                    // each character in 'wordCharacters' is mapped to an object which is stored in 'characters'
                    let characters = wordCharacters.map((character) => {
                        return { character: character, correct: false };
                    });

                    setWord(characters);
                });
            setWordSet(true);
        }
    }, []);

    const checkAlphabet = (alphabet, word, alphabets) => {
        // Ends the game by not allowing the user to select more letters
        if (correctCounter === word.length || wrongCounter > 11) {
            return;
        }

        // check my alphabet is not null
        // ensures the the alphabet can only be clicked on once
        let alphabetNotNull = false;
        alphabets.forEach((character) => {
            if (character.char == alphabet) {
                alphabetNotNull = character.set != null && true;
            }
        });

        if (alphabetNotNull != true) {
            let alphabetInWord = false; // determines whether the alphabet the user clicks is in the word

            // the array(word) of characters is looped through and the value of the key 'character' for each iteration is converted to a lowercase and then compared to 'alphabet'
            word.forEach((character) => {
                if (character.character.toLowerCase() == alphabet) {
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
                    character.character.toLowerCase() == alphabet
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
                setHangmanImage(
                    `/images/hangmandrawings/state${wrongCounter}.gif`
                );
            }
        }
    };

    // function that refreshes the page
    const refreshPage = () => {
        window.location.reload(false);
    };

    // open rules modal
    const openRules = () => {
        const rulesPopupElement = document.querySelector(".rules");

        rulesPopupElement.showModal(); // shows the modal
    };

    return (
        <main className="main-container">
            <Header refreshPage={refreshPage} openRules={openRules} />
            <section className="intro">
                <p>
                    Start guesing the word by clicking on a letter to begin the
                    game. You can restart to change the word.
                </p>
            </section>
            <section>
                <div className="secondary-container">
                    <Hangman image={hangmanImage} />

                    <FinalMessage
                        correctCounter={correctCounter}
                        wrongCounter={wrongCounter}
                        word={word}
                        refreshPage={refreshPage}
                    />
                </div>

                <Word word={word} />

                <Alphabets
                    alphabets={alphabets}
                    checkAlphabet={checkAlphabet}
                    word={word}
                />
            </section>
            {/* Pop up menu that displays the rules of the game */}
            <Rules onClick={openRules} />
            <Footer />
        </main>
    );
}

export default App;
