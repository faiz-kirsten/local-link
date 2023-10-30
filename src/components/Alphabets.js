import Alphabet from "./Alphabet";

// Iterates through each object in 'alphabets' and maps each object(alphabet) to the 'Alphabet' component
const Alphabets = ({ alphabets, checkAlphabet, word }) => {
    return (
        <div className="alphabets">
            {alphabets.map((alphabet, index) => (
                <Alphabet
                    key={index}
                    alphabet={alphabet}
                    checkAlphabet={checkAlphabet}
                    word={word}
                    alphabets={alphabets}
                />
            ))}
        </div>
    );
};

export default Alphabets;
