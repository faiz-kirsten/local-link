import Character from "./Character";

// Iterates through each object in 'word' and maps each object(character) to the 'Character' component
const Word = ({ word }) => {
    return (
        <div className="word">
            {word.map((character, index) => (
                <Character key={index} character={character} />
            ))}
        </div>
    );
};

export default Word;
