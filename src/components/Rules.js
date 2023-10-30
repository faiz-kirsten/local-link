import Button from "./Button";

const Rules = ({ onClick }) => {
    return (
        <dialog className="rules-popup">
            <form method="dialog">
                <h2>Rules</h2>
                <ul>
                    <li>Select any character on the page to begin the game.</li>
                    <li>
                        If you guess a letter incorrectly, a limb will be added
                        to the stickman and the color scheme of the character
                        will be changed to red.
                    </li>
                    <li>
                        If you guess a letter correctly, it will be added above
                        the underline in the word. The color scheme will also be
                        changed to green.
                    </li>
                    <li>
                        Note that once you select a character. It cannot be
                        selected again.
                    </li>
                    <li>
                        You have 10 attempts to guess the letters correctly.
                    </li>
                    <li>You can restart the game at any time.</li>
                </ul>
                <Button text="Close" className="btn-rules" onClick={onClick} />
            </form>
        </dialog>
    );
};

export default Rules;
