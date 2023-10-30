import Button from "./Button";

// Displays whether the user has won or lost
const FinalMessage = ({ wrongCounter, correctCounter, word, refreshPage }) => {
    return (
        <div className="final-message">
            {word.length === correctCounter && (
                <p>Congratulations. You won!!</p>
            )}
            {wrongCounter > 11 && <p>You lost. The word was</p>}
            {wrongCounter > 11 && (
                <div className="correct-word">
                    {word.map((character) => character.character)}
                </div>
            )}
            {/* Displays this button when the game is over */}
            {word.length === correctCounter ||
                (wrongCounter > 11 && (
                    <Button text="Play Again" onClick={refreshPage} />
                ))}
        </div>
    );
};

export default FinalMessage;
