import Alphabet from "./Alphabet";

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
