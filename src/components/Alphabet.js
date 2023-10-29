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
