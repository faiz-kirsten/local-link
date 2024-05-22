import { LuRefreshCw } from "react-icons/lu";
import { LuInfo } from "react-icons/lu";

// Header that displays the logo and navigation
const Header = ({ restartGame }) => {
    return (
        <header className="main-header">
            <span className="logo">Hangman</span>
            <nav className="navbar">
                <LuRefreshCw onClick={restartGame} className="icon" />
            </nav>
        </header>
    );
};

export default Header;
