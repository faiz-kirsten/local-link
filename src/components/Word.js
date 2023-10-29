import Character from "./Character";

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
