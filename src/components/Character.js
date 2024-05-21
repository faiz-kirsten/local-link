// Display each character(character.character) and adds the class show dependent on whether the 'character.show' is true
const Character = ({ character }) => {
    return (
        <span
            className={`character ${character.correct && "show"} ${
                character.correct & (character.character === " ") && "showSpace"
            }`}>
            {character.character}
        </span>
    );
};

export default Character;
