import Button from "./Button";

// Displays whether the user has won or lost
const FinalMessage = ({
    wrongCounter,
    correctCounter,
    word,
    restartGame,
    correctWord,
}) => {
    return (
        <div className="final-message">
            {word.length === correctCounter && (
                <p>Congratulations. You won!!</p>
            )}
            {wrongCounter > 11 && (
                <>
                    <p>You lost. The word was</p>
                    <div className="correct-word">{correctWord}</div>
                </>
            )}

            <Button text="Play Again" onClick={restartGame} />
        </div>
    );
};

export default FinalMessage;
