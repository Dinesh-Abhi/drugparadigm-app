import { useState, useEffect } from "react";
import { 
  User, Mail, Calendar, LogOut, Edit, Moon, Sun, 
  ShieldCheck, RefreshCw, Check, Save, AlertTriangle, 
  Trash2, ArrowLeft, Search, X, Menu, ChevronRight,
  Bell, Lock, Laptop, Settings as SettingsIcon
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getUserId, doesSessionExist, signOut } from "supertokens-auth-react/recipe/session";
import { DeleteUserInformation, GetUserInformation } from "../../redux/auth/actionCreator";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function UserSettings() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get dark mode from cookies - using dark/light value instead of true/false
  const [darkMode, setDarkMode] = useState(() => {
    const themeCookie = Cookies.get("theme");
    return themeCookie === "dark";
  });

  const { getUserInfoReducerData, getUserInfoReducerLoading } = useSelector((state) => {
      return {
        getUserInfoReducerData: state.getUserInfoReducerRes.data,
        getUserInfoReducerLoading: state.getUserInfoReducerRes.loading,
      };
    }
  );

  const userInfo = getUserInfoReducerData?.userInfo?.[0];
  const [formattedDate, setFormattedDate] = useState("");
  const [userId, setUserId] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editableDisplayName, setEditableDisplayName] = useState("");
  const [activeSection, setActiveSection] = useState("account");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [notification, setNotification] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [showUnsavedChanges, setShowUnsavedChanges] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Toggle dark mode function
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    Cookies.set("theme", newDarkMode ? "dark" : "light", { expires: 365 }); // Store as "dark" or "light"
    
    // Apply the class to document for global styling
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  useEffect(() => {
    // Initial application of dark mode class
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    async function checkSession() {
      const hasSession = await doesSessionExist();
      if (hasSession) {
        const id = await getUserId();
        setUserId(id);
      } else {
        navigate('/auth');
      }
    }
    checkSession();
  }, [navigate]);
  
  useEffect(() => {
    if (userId) {
      dispatch(GetUserInformation(userId));
    }
  }, [userId, dispatch]);

  useEffect(() => {
    if (userInfo?.timeJoined) {
      const date = new Date(userInfo.timeJoined);
      setFormattedDate(date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }));
    }

    if (userInfo?.email) {
      // Create a display name from email (before the @ symbol)
      const name = userInfo.email.split('@')[0]
        .replace(/[^a-zA-Z0-9]/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase());
      setDisplayName(name);
      setEditableDisplayName(name);
    }
  }, [userInfo]);

  const handleLogout = async () => {
    await signOut();
    navigate('/auth');
  };

  const saveDisplayName = () => {
    setDisplayName(editableDisplayName);
    setIsEditing(false);
    showNotification("Display name updated successfully!", "success");
    // Here you would typically dispatch an action to update the display name in the backend
    // dispatch(UpdateUserDisplayName(userId, editableDisplayName));
  };

  const deleteAccount = async () => {
    if (deleteConfirmText !== "DELETE") {
      showNotification("Please type DELETE to confirm account deletion", "error");
      return;
    }
    
    try {
      setIsDeleting(true);
      // Call the delete user API endpoint
      await dispatch(DeleteUserInformation(userId));
      showNotification("Account successfully deleted", "success");
      
      // Sign out and redirect to auth page after a short delay
      setTimeout(async () => {
        await signOut();
        navigate('/auth');
      }, 1500);
    } catch (error) {
      console.error("Error deleting account:", error);
      showNotification("Failed to delete account. Please try again.", "error");
      setIsDeleting(false);
    }
  };

  const showNotification = (message, type = "info") => {
    setNotification({ message, type });
    
    // Auto-hide notification after 4 seconds
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const toggleEmailNotifications = () => {
    setEmailNotifications(!emailNotifications);
    setHasChanges(true);
  };

  const togglePushNotifications = () => {
    setPushNotifications(!pushNotifications);
    setHasChanges(true);
  };

  const saveChanges = () => {
    showNotification("Settings saved successfully!", "success");
    setHasChanges(false);
  };

  const discardChanges = () => {
    // Reset to original values
    setHasChanges(false);
    showNotification("Changes discarded", "info");
  };

  // Filter sections based on search query
  const filteredSections = ["account", "appearance", "notifications", "privacy"]
    .filter(section => section.includes(searchQuery.toLowerCase()));

  // Generate a consistent color based on email
  const generateAvatarColor = (email) => {
    const colors = [
      "bg-gradient-to-br from-blue-500 to-indigo-600", 
      "bg-gradient-to-br from-purple-500 to-pink-600", 
      "bg-gradient-to-br from-pink-500 to-rose-600", 
      "bg-gradient-to-br from-red-500 to-orange-600", 
      "bg-gradient-to-br from-orange-500 to-amber-600",
      "bg-gradient-to-br from-amber-500 to-yellow-600",
      "bg-gradient-to-br from-green-500 to-emerald-600", 
      "bg-gradient-to-br from-teal-500 to-cyan-600", 
      "bg-gradient-to-br from-cyan-500 to-blue-600"
    ];
    
    if (!email) return colors[0];
    const sum = email.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[sum % colors.length];
  };

  const avatarColor = generateAvatarColor(userInfo?.email || userId);
  const userInitial = userInfo?.email ? userInfo.email.charAt(0).toUpperCase() : "U";
  const authMethod = userInfo?.thirdParty?.id === "google" ? "Google" : "Email and Password";

  // Navigation items with icons
  const navigationItems = [
    { id: "account", label: "Account", icon: <User className="w-5 h-5" /> },
    { id: "appearance", label: "Appearance", icon: <Laptop className="w-5 h-5" /> },
    { id: "notifications", label: "Notifications", icon: <Bell className="w-5 h-5" /> },
    { id: "privacy", label: "Privacy", icon: <Lock className="w-5 h-5" /> },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Mobile Header */}
      <header className={`lg:hidden fixed top-0 left-0 right-0 z-20 px-4 py-3 shadow-md flex items-center justify-between ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        
        <h1 className="text-xl font-bold flex items-center">
          <SettingsIcon className="w-5 h-5 mr-2" /> Settings
        </h1>
        
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Navigation Drawer */}
      <div className={`lg:hidden fixed inset-0 z-10 transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className={`h-full w-64 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow-xl`}>
          <div className="pt-20 px-4">
            <div className="flex items-center gap-4 mb-8">
              <div className={`${avatarColor} text-white rounded-full h-10 w-10 flex items-center justify-center text-lg font-medium shadow flex-shrink-0`}>
                {userInitial}
              </div>
              <div className="overflow-hidden">
                <h2 className="font-semibold truncate">{displayName}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{userInfo?.email}</p>
              </div>
            </div>
            
            <div className="relative mb-6">
              <input 
                type="text"
                placeholder="Search settings"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
            
            <nav aria-label="Settings navigation">
              {filteredSections.length > 0 ? (
                <ul className="space-y-1">
                  {navigationItems.filter(item => filteredSections.includes(item.id)).map(item => (
                    <li key={item.id}>
                      <button
                        onClick={() => {
                          setActiveSection(item.id);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${
                          activeSection === item.id
                            ? 'bg-indigo-500 text-white'
                            : `${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`
                        }`}
                        aria-current={activeSection === item.id ? "page" : undefined}
                      >
                        <div className="flex items-center">
                          <span className="mr-3">{item.icon}</span>
                          <span>{item.label}</span>
                        </div>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <Search className="w-6 h-6 mx-auto mb-2" />
                  <p>No settings found</p>
                </div>
              )}
            </nav>
            
            <div className="absolute bottom-8 left-0 right-0 px-4">
              <button
                onClick={handleLogout}
                className={`w-full px-3 py-2.5 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} flex items-center justify-center gap-2 transition-colors`}
              >
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-30" 
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        ></div>
      </div>

      {/* Main Content */}
      <div className="pt-16 lg:pt-0 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block lg:w-64 fixed lg:sticky top-0 h-screen pt-8 pr-6">
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold flex items-center dark:text-white">
                  <SettingsIcon className="w-6 h-6 mr-2 text-indigo-500" /> 
                  Settings
                </h1>
                <button
                  onClick={toggleDarkMode}
                  className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
                  aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                >
                  {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              </div>
              
              <div className="flex items-center gap-3 mb-6">
                <div className={`${avatarColor} text-white rounded-full h-12 w-12 flex items-center justify-center text-xl font-medium shadow-lg flex-shrink-0`}>
                  {userInitial}
                </div>
                <div>
                  <h2 className="font-semibold text-lg dark:text-white">{displayName}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{userInfo?.email}</p>
                </div>
              </div>
              
              <div className="relative mb-6">
                <input 
                  type="text"
                  placeholder="Search settings"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-lg ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300 text-gray-800'} border focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <nav className="space-y-1 py-2" aria-label="Settings navigation">
                {filteredSections.length > 0 ? (
                  <ul>
                    {navigationItems.filter(item => filteredSections.includes(item.id)).map(item => (
                      <li key={item.id}>
                        <button
                          onClick={() => setActiveSection(item.id)}
                          className={`w-full flex items-center px-4 py-3 rounded-lg transition-all ${
                            activeSection === item.id
                              ? 'bg-indigo-500 text-white font-medium shadow-md'
                              : `text-gray-700 dark:text-gray-200 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`
                          }`}
                          aria-current={activeSection === item.id ? "page" : undefined}
                        >
                          <span className="mr-3">{item.icon}</span>
                          <span>{item.label}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <Search className="w-6 h-6 mx-auto mb-2" />
                    <p>No settings found</p>
                  </div>
                )}
              </nav>
              
              <div className="absolute bottom-8 left-0 right-0 px-8">
                <button
                  onClick={handleLogout}
                  className={`w-full px-4 py-2.5 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'} flex items-center justify-center gap-2 transition-colors font-medium`}
                >
                  <LogOut className="w-5 h-5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 lg:pl-64">
              <div className="py-6 lg:py-8 lg:px-8">
                {getUserInfoReducerLoading ? (
                  <div className="flex flex-col justify-center items-center h-64 gap-4">
                    <RefreshCw className="w-12 h-12 animate-spin text-indigo-500" />
                    <p className="text-gray-500 dark:text-gray-400">Loading your settings...</p>
                  </div>
                ) : (
                  <>
                    {/* Active Section Content */}
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold mb-2 dark:text-white flex items-center gap-3">
                        {navigationItems.find(item => item.id === activeSection)?.icon}
                        {navigationItems.find(item => item.id === activeSection)?.label} Settings
                      </h2>
                      <p className="text-gray-500 dark:text-gray-400">
                        {activeSection === "account" && "Manage your account information and preferences"}
                        {activeSection === "appearance" && "Customize the look and feel of your interface"}
                        {activeSection === "notifications" && "Control how and when you receive updates"}
                        {activeSection === "privacy" && "Manage your data and privacy settings"}
                      </p>
                    </div>

                    {/* Account Settings */}
                    {activeSection === "account" && (
                      <div className="space-y-6 animate-fadeIn">
                        <section className={`rounded-xl shadow-md overflow-hidden transition-all duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                            <h3 className="text-lg font-semibold dark:text-white flex items-center gap-2">
                              <User className="w-5 h-5 text-indigo-500" />
                              Profile Information
                            </h3>
                            {isEditing ? (
                              <div className="flex gap-2">
                                <button 
                                  onClick={() => setIsEditing(false)}
                                  className="px-3 py-1.5 rounded text-sm font-medium text-gray-600 bg-gray-200 hover:bg-gray-300 dark:text-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
                                >
                                  Cancel
                                </button>
                                <button 
                                  onClick={saveDisplayName}
                                  className="px-3 py-1.5 rounded text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 transition-colors"
                                >
                                  Save
                                </button>
                              </div>
                            ) : (
                              <button 
                                onClick={() => setIsEditing(true)}
                                className="px-3 py-1.5 rounded text-sm font-medium flex items-center gap-1 text-gray-600 bg-gray-200 hover:bg-gray-300 dark:text-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
                              >
                                <Edit className="w-4 h-4" /> Edit
                              </button>
                            )}
                          </div>
                          
                          <div className="p-6">
                            <div className="flex flex-col md:flex-row gap-6 items-start">
                              <div className={`${avatarColor} text-white rounded-full h-20 w-20 flex items-center justify-center text-3xl font-medium shadow-md flex-shrink-0 mx-auto md:mx-0`}>
                                {userInitial}
                              </div>
                              
                              <div className="space-y-4 w-full">
                                <div className="space-y-1">
                                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Display Name
                                  </label>
                                  {isEditing ? (
                                    <input
                                      type="text"
                                      value={editableDisplayName}
                                      onChange={(e) => setEditableDisplayName(e.target.value)}
                                      className={`w-full px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300 text-gray-800'} border focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                                      autoFocus
                                    />
                                  ) : (
                                    <p className="text-xl font-medium dark:text-white">{displayName}</p>
                                  )}
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                                      Email Address
                                    </label>
                                    <p className="dark:text-white">{userInfo?.email}</p>
                                  </div>
                                  
                                  <div className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                                      Member Since
                                    </label>
                                    <p className="dark:text-white">{formattedDate}</p>
                                  </div>
                                  
                                  <div className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                                      Authentication Method
                                    </label>
                                    <div className="flex items-center gap-2">
                                      {authMethod === "Google" ? (
                                        <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                        </svg>
                                      ) : (
                                        <Mail className="w-5 h-5 text-indigo-500" />
                                      )}
                                      <span className="dark:text-white">{authMethod}</span>
                                    </div>
                                  </div>
                                  
                                  {userInfo?.verified && (
                                    <div className="space-y-1">
                                      <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Account Status
                                      </label>
                                      <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                                        <ShieldCheck className="w-5 h-5" />
                                        <span>Verified Account</span>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                        
                        {userInfo?.thirdParty && (
                          <section className={`rounded-xl shadow-md overflow-hidden transition-all duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                              <h3 className="text-lg font-semibold dark:text-white flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-indigo-500" />
                                Connected Accounts
                              </h3>
                            </div>
                            
                            <div className="p-6">
                              <div className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200">
                                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                                  <svg className="w-7 h-7 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                  </svg>
                                </div>
                                
                                <div className="flex-1">
                                  <h4 className="font-medium dark:text-white">Google</h4>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">Connected on {formattedDate}</p>
                                </div>
                                
                                <div>
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                    Connected
                                  </span>
                                </div>
                              </div>
                            </div>
                          </section>
                        )}
                        
                       
                      </div>
                    )}

                    {/* Appearance Settings */}
                    {activeSection === "appearance" && (
                      <div className="space-y-6 animate-fadeIn">
                        <section className={`rounded-xl shadow-md overflow-hidden transition-all duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold dark:text-white flex items-center gap-2">
                              <Moon className="w-5 h-5 text-indigo-500" />
                              Theme
                            </h3>
                          </div>
                          
                          <div className="p-6">
                            <p className="mb-6 dark:text-white">
                              Choose how the application looks to you. You can toggle between light and dark mode.
                            </p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <button
                                onClick={() => {
                                  if (darkMode) toggleDarkMode();
                                }}
                                className={`relative p-4 rounded-xl border-2 transition-all ${!darkMode ? 'border-indigo-500 shadow-md' : 'border-gray-200 dark:border-gray-700'}`}
                              >
                                <div className="flex justify-between items-center mb-3">
                                  <h4 className="font-medium text-lg">Light Mode</h4>
                                  {!darkMode && <Check className="w-5 h-5 text-indigo-500" />}
                                </div>
                                <div className="bg-gray-100 rounded-lg p-3 shadow-inner">
                                  <div className="h-12 bg-white rounded-lg shadow mb-2"></div>
                                  <div className="flex space-x-1">
                                    <div className="h-3 bg-blue-500 rounded w-1/4"></div>
                                    <div className="h-3 bg-gray-300 rounded w-1/5"></div>
                                    <div className="h-3 bg-green-500 rounded w-1/5"></div>
                                  </div>
                                </div>
                              </button>
                              
                              <button
                                onClick={() => {
                                  if (!darkMode) toggleDarkMode();
                                }}
                                className={`relative p-4 rounded-xl border-2 transition-all ${darkMode ? 'border-indigo-500 shadow-md' : 'border-gray-200 dark:border-gray-700'}`}
                              >
                                <div className="flex justify-between items-center mb-3">
                                  <h4 className="font-medium text-lg">Dark Mode</h4>
                                  {darkMode && <Check className="w-5 h-5 text-indigo-500" />}
                                </div>
                                <div className="bg-gray-900 rounded-lg p-3 shadow-inner">
                                  <div className="h-12 bg-gray-800 rounded-lg shadow mb-2"></div>
                                  <div className="flex space-x-1">
                                    <div className="h-3 bg-blue-500 rounded w-1/4"></div>
                                    <div className="h-3 bg-gray-600 rounded w-1/5"></div>
                                    <div className="h-3 bg-green-500 rounded w-1/5"></div>
                                  </div>
                                </div>
                              </button>
                            </div>
                          </div>
                        </section>
                      </div>
                    )}

                    {/* Notifications Settings */}
                    {activeSection === "notifications" && (
                      <div className="space-y-6 animate-fadeIn">
                        <section className={`rounded-xl shadow-md overflow-hidden transition-all duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold dark:text-white flex items-center gap-2">
                              <Bell className="w-5 h-5 text-indigo-500" />
                              Communication Preferences
                            </h3>
                          </div>
                          
                          <div className="p-6">
                            <p className="mb-6 dark:text-white">
                              Select how and when you'd like to receive notifications and updates.
                            </p>
                            
                            <div className="space-y-4">
                              <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                                <div>
                                  <h4 className="font-medium dark:text-white">Email Notifications</h4>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">Receive updates and alerts via email</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                  <input 
                                    type="checkbox" 
                                    className="sr-only peer" 
                                    checked={emailNotifications}
                                    onChange={toggleEmailNotifications}
                                  />
                                  <div className={`w-11 h-6 rounded-full peer ${emailNotifications ? 'bg-indigo-500' : 'bg-gray-300 dark:bg-gray-600'} peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full`}></div>
                                </label>
                              </div>
                              
                              <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                                <div>
                                  <h4 className="font-medium dark:text-white">Push Notifications</h4>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">Receive notifications when using the application</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                  <input 
                                    type="checkbox" 
                                    className="sr-only peer" 
                                    checked={pushNotifications}
                                    onChange={togglePushNotifications}
                                  />
                                  <div className={`w-11 h-6 rounded-full peer ${pushNotifications ? 'bg-indigo-500' : 'bg-gray-300 dark:bg-gray-600'} peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full`}></div>
                                </label>
                              </div>
                            </div>
                          </div>
                        </section>
                      </div>
                    )}

                    {/* Privacy Settings */}
                    {activeSection === "privacy" && (
                      <div className="space-y-6 animate-fadeIn">
                        {/* <section className={`rounded-xl shadow-md overflow-hidden transition-all duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold dark:text-white flex items-center gap-2">
                              <Lock className="w-5 h-5 text-indigo-500" />
                              Data & Privacy
                            </h3>
                          </div>
                          
                          <div className="p-6">
                            <p className="mb-6 dark:text-white">
                              Control how your data is used and managed within our platform.
                            </p>
                            
                            <div className="space-y-4">
                              <div className="p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-900 text-yellow-800 dark:text-yellow-300">
                                <div className="flex items-start">
                                  <AlertTriangle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                                  <p>
                                    Privacy settings are simplified for this demo. In a production environment, more granular controls would be available.
                                  </p>
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                                <div>
                                  <h4 className="font-medium dark:text-white">Data Collection</h4>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">Allow us to collect anonymous usage data to improve our services</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                  <input type="checkbox" className="sr-only peer" defaultChecked />
                                  <div className="w-11 h-6 rounded-full peer bg-indigo-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                                </label>
                              </div>
                              
                              <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                                <div>
                                  <h4 className="font-medium dark:text-white">Cookies</h4>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">Allow cookies for better performance and personalization</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                  <input type="checkbox" className="sr-only peer" defaultChecked />
                                  <div className="w-11 h-6 rounded-full peer bg-indigo-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                                </label>
                              </div>
                              
                              <button className="mt-4 px-4 py-2 border border-indigo-500 text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg font-medium transition-colors">
                                Download My Data
                              </button>
                            </div>
                          </div>
                        </section> */}

                        <section className={`rounded-xl shadow-md overflow-hidden transition-all duration-300 ${darkMode ? 'bg-gray-800 border-red-800' : 'bg-white border-red-100'} border`}>
                          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 flex items-center gap-2">
                              <Trash2 className="w-5 h-5" />
                              Delete Account
                            </h3>
                          </div>
                          
                          <div className="p-6">
                            <p className="mb-4 dark:text-white">
                              Permanently delete your account and all associated data. This action cannot be undone.
                            </p>
                            
                            {showDeleteConfirmation ? (
                              <div className="space-y-4">
                                <div className="p-4 bg-red-50 dark:bg-red-900/30 rounded-lg border border-red-100 dark:border-red-800">
                                  <div className="flex items-start mb-3">
                                    <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                                    <p className="text-red-600 dark:text-red-400">
                                      This will permanently delete your account. All your data will be lost.
                                    </p>
                                  </div>
                                  
                                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Type "DELETE" to confirm:
                                  </label>
                                  <input
                                    type="text"
                                    value={deleteConfirmText}
                                    onChange={(e) => setDeleteConfirmText(e.target.value)}
                                    placeholder="Type DELETE"
                                    className={`w-full px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white border-red-700' : 'bg-white border-red-300 text-gray-800'} border focus:outline-none focus:ring-2 focus:ring-red-500`}
                                    autoFocus
                                  />
                                </div>
                                
                                <div className="flex gap-3">
                                  <button
                                    onClick={() => setShowDeleteConfirmation(false)}
                                    className="px-4 py-2 rounded font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 dark:text-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
                                  >
                                    Cancel
                                  </button>
                                  
                                  <button
                                    onClick={deleteAccount}
                                    disabled={isDeleting}
                                    className="px-4 py-2 rounded font-medium text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                                  >
                                    {isDeleting ? (
                                      <>
                                        <RefreshCw className="w-4 h-4 animate-spin" />
                                        Deleting...
                                      </>
                                    ) : (
                                      <>
                                        <Trash2 className="w-4 h-4" />
                                        Delete Account
                                      </>
                                    )}
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <button
                                onClick={() => setShowDeleteConfirmation(true)}
                                className="px-4 py-2 rounded font-medium text-white bg-red-600 hover:bg-red-700 transition-colors flex items-center gap-2"
                              >
                                <Trash2 className="w-4 h-4" />
                                Delete Account
                              </button>
                            )}
                          </div>
                        </section>
                      </div>
                    )}
                    
                    {/* Save Changes Bottom Bar (appears when changes are detected) */}
                    {hasChanges && (
                      <div className={`fixed bottom-0 left-0 right-0 p-4 ${darkMode ? 'bg-gray-800 border-t border-gray-700' : 'bg-white border-t border-gray-200'} shadow-lg animate-slideUp z-30`}>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                          <div className="flex items-center gap-2 text-indigo-500">
                            <AlertTriangle className="w-5 h-5" />
                            <span className="font-medium">You have unsaved changes</span>
                          </div>
                          
                          <div className="flex gap-3">
                            <button 
                              onClick={discardChanges}
                              className="px-4 py-2 rounded font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 dark:text-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
                            >
                              Discard
                            </button>
                            
                            <button 
                              onClick={saveChanges}
                              className="px-4 py-2 rounded font-medium text-white bg-indigo-500 hover:bg-indigo-600 transition-colors flex items-center gap-2"
                            >
                              <Save className="w-4 h-4" />
                              Save Changes
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Notification Toast */}
                    {notification && (
                      <div className={`fixed bottom-20 right-4 md:right-8 p-4 rounded-lg shadow-lg animate-fadeIn flex items-center gap-3 max-w-md ${
                        notification.type === 'success' ? 'bg-green-500 text-white' :
                        notification.type === 'error' ? 'bg-red-500 text-white' :
                        'bg-blue-500 text-white'
                      }`}>
                        {notification.type === 'success' && <Check className="w-5 h-5" />}
                        {notification.type === 'error' && <AlertTriangle className="w-5 h-5" />}
                        {notification.type === 'info' && <RefreshCw className="w-5 h-5" />}
                        <p>{notification.message}</p>
                        <button
                          onClick={() => setNotification(null)}
                          className="ml-auto text-white hover:text-gray-200 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}