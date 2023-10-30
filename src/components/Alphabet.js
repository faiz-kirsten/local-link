// Display each alphabet(alphabet.char) and adds the class correct or incorrect dependent on whether the 'alphabet.set' is true or false
// When a letter is clicked on it triggers the 'checkAlphabet' function which checks whether the letter was correct or not
const Alphabet = ({ alphabet, checkAlphabet, word, alphabets }) => {
    return (
        <span
            className={`alphabet ${alphabet.set === true && "correct"} ${
                alphabet.set === false && "incorrect"
            } alphabet-${alphabet.char}`}
            onClick={() => checkAlphabet(alphabet.char, word, alphabets)}>
            {alphabet.char}
        </span>
    );
};

export default Alphabet;
