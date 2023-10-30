import Button from "./Button";

const Header = ({ openRules, refreshPage }) => {
    return (
        <header className="main-header">
            <span className="logo">Hangman</span>
            <nav className="navbar">
                <Button
                    text="Restart"
                    onClick={refreshPage}
                    className="btn-retry"
                />
                <Button
                    text="Rules"
                    className="btn-rules"
                    onClick={openRules}
                />
            </nav>
        </header>
    );
};

export default Header;
