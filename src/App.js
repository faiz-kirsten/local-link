import { useState, useEffect } from "react";
import dir from "./dictionary.txt";
import Word from "./components/Word";
import Alphabets from "./components/Alphabets";
import Hangman from "./components/Hangman";
import Button from "./components/Button";

function App() {
    const [word, setWord] = useState([]); // stores each letter of the word as an array of characters
    const [wordSet, setWordSet] = useState(false); // sets whether the random word has been set
    // const [character, setCharacter] = useState("");
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
    ]);

    const [lost, setLost] = useState(false);

    const [hangmanImage, setHangmanImage] = useState(
        "/images/hangmandrawings/state1.gif"
    );
    const [wrongCounter, setWrongCounter] = useState(2);

    // used to help output whether the user won, counts the amount of letters they got correct and matches it to the length of the word
    const [correctCounter, setCorrecttCounter] = useState(0);

    useEffect(() => {
        if (!wordSet) {
            fetch(dir)
                .then((row) => row.text())
                .then((text) => {
                    const words = text.split("\n");
                    const randomNum = Math.floor(Math.random() * words.length);
                    let wordCharacters = words[randomNum].split("");

                    let characters = wordCharacters.map((character) => {
                        return { character: character, correct: false };
                    });

                    setWord(characters);
                });
            console.log("Word Set");
            setWordSet(true);
        }
    }, []);

    const checkAlphabet = (alphabet, word, alphabets) => {
        if (correctCounter === word.length) {
            return;
        }

        if (wrongCounter == 11) {
            setHangmanImage("/images/hangmandrawings/state11.gif");
        }

        if (wrongCounter >= 11) {
            setLost(true);
            return;
        }
        console.log("Correct counter," + correctCounter);

        // check my alphabet is not null
        // ensures the the alphabet can only be clicked on once
        let alphabetNotNull = false;
        alphabets.forEach((character) => {
            // console.log(character.character);
            if (character.char == alphabet) {
                alphabetNotNull = character.set != null && true;
            }
        });

        // console.log(alphabet);
        console.log(word);
        // console.log(alphabets);

        if (alphabetNotNull != true) {
            console.log("alphabetNull" + alphabetNotNull);
            let alphabetInWord = false;

            word.forEach((character) => {
                // console.log(character.character);
                if (character.character.toLowerCase() == alphabet) {
                    alphabetInWord = true;
                    setCorrecttCounter((correctCounter) => correctCounter + 1);
                }
            });
            console.log(alphabetInWord);

            if (alphabetInWord) {
                let newAlphabets = alphabets.map((character) =>
                    character.char === alphabet
                        ? { ...character, set: true }
                        : character
                );

                setAlphabets(newAlphabets);

                let newWord = word.map((character) =>
                    character.character.toLowerCase() == alphabet
                        ? { ...character, correct: true }
                        : character
                );

                // setCorrecttCounter(correctCounter + 1);
                setWord(newWord);
            } else {
                let newAlphabets = alphabets.map((character) =>
                    character.char === alphabet.toLowerCase()
                        ? { ...character, set: false }
                        : character
                );

                setAlphabets(newAlphabets);

                setWrongCounter(wrongCounter + 1);
                // console.log(wrongCounter);

                setHangmanImage(
                    `/images/hangmandrawings/state${wrongCounter}.gif`
                );
            }
        }
    };

    // function that refreshes the page
    function refreshPage() {
        window.location.reload(false);
    }

    return (
        <div className="main-container">
            <div className="input-container">
                <Hangman image={hangmanImage} />
                <div className="input-output">
                    <Word word={word} />
                    <Alphabets
                        alphabets={alphabets}
                        checkAlphabet={checkAlphabet}
                        word={word}
                    />
                </div>
            </div>
            <p className="win-or-lose">
                {word.length === correctCounter && "Congratulations. You won."}
                {lost && "You lost. You will win next time!"}
                {word.length === correctCounter && (
                    <Button text="Retry" onClick={refreshPage} />
                )}
                {lost && <Button text="Retry" onClick={refreshPage} />}
            </p>
        </div>
    );
}

export default App;
