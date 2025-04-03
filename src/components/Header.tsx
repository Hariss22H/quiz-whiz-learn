
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="w-full border-b bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-quiz-primary flex items-center justify-center text-white font-bold">
            Q
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-quiz-primary to-quiz-secondary text-transparent bg-clip-text">
            QuizWhiz
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="text-gray-700 hover:text-quiz-primary transition-colors">
                Dashboard
              </Link>
              <Link to="/explore" className="text-gray-700 hover:text-quiz-primary transition-colors">
                Explore
              </Link>
              {user?.isAdmin && (
                <Link to="/admin" className="text-gray-700 hover:text-quiz-primary transition-colors">
                  Admin
                </Link>
              )}
              <Link to="/profile" className="text-gray-700 hover:text-quiz-primary transition-colors">
                Profile
              </Link>
            </>
          ) : (
            <>
              <Link to="/" className="text-gray-700 hover:text-quiz-primary transition-colors">
                Home
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-quiz-primary transition-colors">
                About
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <Link to="/profile" className="flex items-center space-x-2 text-sm text-gray-700">
                <div className="w-8 h-8 rounded-full bg-quiz-primary/10 flex items-center justify-center">
                  <User size={16} className="text-quiz-primary" />
                </div>
                <span className="hidden md:inline">{user?.username}</span>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={logout}
                className="text-gray-500 hover:text-quiz-primary"
                aria-label="Logout"
              >
                <LogOut size={18} />
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link to="/login">
                <Button variant="outline" className="border-quiz-primary text-quiz-primary hover:bg-quiz-primary/10">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-quiz-primary hover:bg-quiz-primary/90 text-white">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
