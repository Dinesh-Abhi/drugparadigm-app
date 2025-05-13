import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserId, signOut, doesSessionExist } from 'supertokens-auth-react/recipe/session';
import { Settings, LogOut, History, ExternalLink, User } from 'lucide-react';
import { useSelector } from 'react-redux';

export default function ModernUserMenu({ darkMode }) {
  const [userId, setUserId] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const [userInitial, setUserInitial] = useState("");
  const [menuAnimation, setMenuAnimation] = useState("");
  
  // Get user information from Redux store
  const { getUserInfoReducerData } = useSelector((state) => ({
    getUserInfoReducerData: state.getUserInfoReducerRes.data
  }));

  const userInfo = getUserInfoReducerData?.userInfo?.[0];
  
  useEffect(() => {
    async function fetchUserId() {
      try {
        const hasSession = await doesSessionExist();
        if (hasSession) {
          const id = await getUserId();
          setUserId(id);
          
          // If we have email, use the first letter of the email
          if (userInfo?.email) {
            setUserInitial(userInfo.email.charAt(0).toUpperCase());
          } else if (id && id.length > 0) {
            setUserInitial(id.charAt(0).toUpperCase());
          }
        }
      } catch (err) {
        console.error("Error fetching user ID:", err);
      }
    }
    
    fetchUserId();
  }, [userInfo]);
  
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    }
    
    if (showUserMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUserMenu]);
  
  const openMenu = () => {
    setShowUserMenu(true);
    setMenuAnimation("animate-fadeIn");
  };
  
  const closeMenu = () => {
    setMenuAnimation("animate-fadeOut");
    setTimeout(() => {
      setShowUserMenu(false);
    }, 200);
  };
  
  const handleLogout = async () => {
    await signOut();
    closeMenu();
    navigate('/auth');
  };
  
  const handleManageAccount = () => {
    navigate('/profile');
    closeMenu();
  };
  
  const handleHistory = () => {
    navigate('/history');
    closeMenu();
  };
  
  // Generate a consistent color based on email
  const generateAvatarColor = (email) => {
    const colors = [
      "bg-blue-500", "bg-purple-500", "bg-pink-500", 
      "bg-red-500", "bg-orange-500", "bg-amber-500",
      "bg-green-500", "bg-teal-500", "bg-cyan-500"
    ];
    
    if (!email) return colors[0];
    const sum = email.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[sum % colors.length];
  };

  // Get display name from email
  const getDisplayName = (email) => {
    if (!email) return "User";
    return email.split('@')[0].replace(/[^a-zA-Z0-9]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const displayName = userInfo?.email ? getDisplayName(userInfo.email) : "User";
  const avatarColor = generateAvatarColor(userInfo?.email || userId);
  const email = userInfo?.email || "";
  
  return (
    <div className="relative" ref={menuRef}>
      {/* Avatar Button */}
      <button
        onClick={openMenu}
        className="flex items-center justify-center rounded-full h-9 w-9 transition-all hover:ring-4 ring-gray-200 dark:ring-gray-700 focus:outline-none active:scale-95"
        aria-label="User menu"
      >
        <div className={`${avatarColor} text-white rounded-full h-9 w-9 flex items-center justify-center font-medium shadow`}>
          {userInitial || ""}
        </div>
      </button>
      
      {/* User Menu Dropdown */}
      {showUserMenu && (
        <div className={`absolute right-0 mt-2 w-80 origin-top-right rounded-3xl shadow-2xl overflow-hidden z-50 ${menuAnimation}`}>
          <div className={`${darkMode ? 'bg-gray-900' : 'bg-white'} transition-all duration-200`}>
            {/* Header Section */}
            <div className="pt-6 pb-2 px-6">
              <div className="flex flex-col items-center text-center">
                <div className={`${avatarColor} text-white rounded-full h-20 w-20 flex items-center justify-center text-3xl font-medium shadow-md mb-4`}>
                  {userInitial || ""}
                </div>
                <p className={`font-medium text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>{displayName}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{email}</p>
                <button 
                  onClick={handleManageAccount}
                  className={`mt-2 text-sm px-4 py-1.5 rounded-full border ${darkMode ? 'border-gray-700 hover:bg-gray-800 text-gray-300' : 'border-gray-300 hover:bg-gray-100 text-gray-700'} transition-colors`}
                >
                  Manage your account
                </button>
              </div>
            </div>
            
            {/* Menu Options */}
            <div className="p-2 border-t border-gray-200 dark:border-gray-700 mt-2">
              {/* <button 
                onClick={handleManageAccount}
                className={`flex items-center gap-3 w-full text-left p-3 rounded-xl ${darkMode ? 'hover:bg-gray-800 text-gray-200' : 'hover:bg-gray-100 text-gray-700'} transition-colors duration-200`}
              >
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </button>
              
              <button 
                onClick={handleHistory}
                className={`flex items-center gap-3 w-full text-left p-3 rounded-xl ${darkMode ? 'hover:bg-gray-800 text-gray-200' : 'hover:bg-gray-100 text-gray-700'} transition-colors duration-200`}
              >
                <History className="w-5 h-5" />
                <span>Activity & history</span>
              </button>
              
              <button 
                onClick={() => window.open('https://support.drugparadigm.com', '_blank')}
                className={`flex items-center gap-3 w-full text-left p-3 rounded-xl ${darkMode ? 'hover:bg-gray-800 text-gray-200' : 'hover:bg-gray-100 text-gray-700'} transition-colors duration-200`}
              >
                <ExternalLink className="w-5 h-5" />
                <span>Help & support</span>
              </button>
               */}
              <button 
                onClick={handleLogout}
                className={`flex items-center gap-3 w-full text-left p-3 rounded-xl ${darkMode ? 'hover:bg-gray-800 text-gray-200' : 'hover:bg-gray-100 text-gray-700'} transition-colors duration-200`}
              >
                <LogOut className="w-5 h-5" />
                <span>Sign out</span>
              </button>
            </div>
            
            {/* Footer */}
            <div className={`p-2 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex justify-between items-center px-3 py-2 text-xs text-gray-500 dark:text-gray-400">
                <span>Privacy Policy</span>
                <span>•</span>
                <span>Terms of Service</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS for animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        @keyframes fadeOut {
          from { opacity: 1; transform: translateY(0) scale(1); }
          to { opacity: 0; transform: translateY(-10px) scale(0.95); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
        
        .animate-fadeOut {
          animation: fadeOut 0.2s ease-in forwards;
        }
      `}</style>
    </div>
  );
}