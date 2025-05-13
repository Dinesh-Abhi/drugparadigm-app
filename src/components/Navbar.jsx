import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Search,
  Moon,
  Sun,
  Beaker,
  FlaskConical,
  Database,
  MessageSquare,
  Menu,
} from "lucide-react";
import Cookies from "js-cookie";
import {
  doesSessionExist,
  getUserId,
} from "supertokens-auth-react/recipe/session"; // Import from supertokens
import UserMenu from "./User/UserMenu";
import { GetUserInformation } from "@/redux/auth/actionCreator";
import { useDispatch } from "react-redux";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { models, drugModalities } from "../lib/data";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Initialize theme from cookie on component mount
  useEffect(() => {
    const savedTheme = Cookies.get("theme");
    const isDark = savedTheme === "dark";
    setDarkMode(isDark);

    // Apply theme to document
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = () => setShowUserMenu(false);
    if (showUserMenu) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [showUserMenu]);

  // Check session and get user info on mount
  useEffect(() => {
    async function checkSession() {
      const hasSession = await doesSessionExist();
      if (hasSession) {
        const id = await getUserId();
        setUserId(id); // Set user ID when logged in
      }
    }
    checkSession();
  }, []);

  useEffect(() => {
    if (userId) {
      dispatch(GetUserInformation(userId));
    }
  }, [userId, dispatch]);

  // Toggle theme function
  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);

    // Save theme preference in cookie
    Cookies.set("theme", newDarkMode ? "dark" : "light", { expires: 365 });

    // Apply theme to document
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const openSearch = () => {
    setIsSearchOpen(true);
  };

  const handleSearchSelect = (type, id) => {
    setIsSearchOpen(false);
    if (type === "model") {
      navigate(`/models/${id}`);
    } else if (type === "modality") {
      // Encode modality for URL (e.g., "Small Molecule" → "Small%20Molecule")
      const encodedModality = encodeURIComponent(id);
      navigate(`/models?modality=${encodedModality}`);
    } else {
      console.warn("Unknown type selected:", type);
    }
  };
  
  return (
    <nav className="border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-20 shadow-md backdrop-blur-sm bg-white/90 dark:bg-gray-900/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Nav Links */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-dp-purple-500 to-dp-blue-500 rounded-lg shadow-md">
                <FlaskConical className="h-5 w-5 text-white" />
              </div>
              <span className="text-dp-purple-600 dark:text-dp-purple-400 font-bold text-lg">
                Drug
                <span className="text-dp-blue-500 dark:text-dp-blue-300">
                  paradigm
                </span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:ml-10 md:flex md:space-x-1">
              <Link
                to="/models"
                className="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-dp-purple-500 dark:hover:text-dp-purple-400 transition-colors"
              >
                Models
              </Link>
              <Link
                to="/resources"
                className="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-dp-purple-500 dark:hover:text-dp-purple-400 transition-colors"
              >
                Resources
              </Link>
              <Link
                to="/about"
                className="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-dp-purple-500 dark:hover:text-dp-purple-400 transition-colors"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-dp-purple-500 dark:hover:text-dp-purple-400 transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Right Side: Search, Theme Toggle, Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Box */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="w-64 justify-start text-muted-foreground gap-2"
                onClick={openSearch}
              >
                <Search className="h-4 w-4" />
                <span>Search models...</span>
              </Button>
            </div>

            {/* Dark/Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-dp-purple-300 dark:focus:ring-dp-purple-500 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            {/* Show Sign In/Up or User Info */}
            {userId ? (
              <UserMenu darkMode={darkMode} />
            ) : (
              <div className="flex space-x-2">
                <Link to="/auth">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-dp-purple-600 dark:text-dp-purple-400 border-dp-purple-200 dark:border-dp-purple-600 hover:bg-dp-purple-50 dark:hover:bg-dp-purple-900 hover:text-dp-purple-700 dark:hover:text-dp-purple-300 transition-colors"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth?show=signup">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-dp-purple-500 to-dp-blue-500 hover:from-dp-purple-600 hover:to-dp-blue-600 dark:from-dp-purple-600 dark:to-dp-blue-600 dark:hover:from-dp-purple-700 dark:hover:to-dp-blue-700 text-white shadow-sm transition-all"
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleTheme}
              className="mr-2 p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Toggle based on state */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg pt-2 pb-3 px-4 space-y-1 border-t border-gray-200 dark:border-gray-800">
          <Link
            to="/models"
            className="flex items-center px-3 py-2 text-base font-medium rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-dp-purple-500 dark:hover:text-dp-purple-400"
            onClick={() => setMobileMenuOpen(false)}
          >
            Models
          </Link>
          <Link
            to="/resources"
            className="flex items-center px-3 py-2 text-base font-medium rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-dp-purple-500 dark:hover:text-dp-purple-400"
            onClick={() => setMobileMenuOpen(false)}
          >
            Resources
          </Link>
          <Link
            to="/about"
            className="flex items-center px-3 py-2 text-base font-medium rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-dp-purple-500 dark:hover:text-dp-purple-400"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="flex items-center px-3 py-2 text-base font-medium rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-dp-purple-500 dark:hover:text-dp-purple-400"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </Link>
          {/* Mobile Search */}
          <div className="relative mt-3">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400 dark:text-gray-500" />
            </div>
            <input
              type="text"
              className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 text-sm rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-dp-purple-300 dark:focus:ring-dp-purple-500 focus:border-dp-purple-300 dark:focus:border-dp-purple-500 w-half"
              placeholder="Search models..."
            />
          </div>
          {/* Mobile Auth Buttons */}
          {userId ? (
              <UserMenu darkMode={darkMode} />
            ) : (
            <div className="mt-4 flex space-x-2">
              <Link to="/auth" className="flex-1">
                <Button
                  variant="outline"
                  className="w-full text-dp-purple-600 dark:text-dp-purple-400 border-dp-purple-200 dark:border-dp-purple-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Button>
              </Link>
              <Link to="/auth?show=signup" className="flex-1">
                <Button
                  className="w-full bg-gradient-to-r from-dp-purple-500 to-dp-blue-500 text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Command Dialog for search */}
      <CommandDialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <CommandInput placeholder="Search models, drugModalities, and resources..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Models">
            {models.map((model) => (
              <CommandItem
                key={model.id}
                onSelect={() => handleSearchSelect("model", model.id)}
                className="cursor-pointer"
              >
                <div className="flex items-center">
                  <FlaskConical className="mr-2 h-4 w-4 text-drugparadigm-teal" />
                  <span>{model.name}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Modalities">
            {drugModalities?.map((modality) => (
              <CommandItem
                key={modality}
                onSelect={() => handleSearchSelect("modality", modality)}
                className="cursor-pointer"
              >
                <div className="flex items-center">
                  <Database className="mr-2 h-4 w-4 text-drugparadigm-sage" />
                  <span>{modality}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </nav>
  );
};

export default Navbar;
