import Button from "./Button";

// Header that displays the logo and navigation
const Header = ({ openRules, refreshPage }) => {
    return (
        <header className="main-header">
            <span className="logo">Hangman</span>
            <nav className="navbar">
                <Button text="Restart" onClick={refreshPage} />
            </nav>
        </header>
    );
};

export default Header;
