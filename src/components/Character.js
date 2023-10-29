const Character = ({ character }) => {
    return (
        <span className={`character ${character.correct ? "show" : ""}`}>
            {character.character}
        </span>
    );
};

export default Character;
