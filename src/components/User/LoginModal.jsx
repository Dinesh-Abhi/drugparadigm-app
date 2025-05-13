import { useEffect } from 'react';
import { LockIcon, ArrowRight, X } from 'lucide-react';

const LoginModal = ({ 
  isOpen, 
  onClose, 
  onLogin, 
  modelName 
}) => {
  // Handle escape key to close modal
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  // If modal is not open, don't render anything
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div 
          className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-md transform transition-all"
          onClick={e => e.stopPropagation()}
        >
          {/* Close button */}
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X size={20} />
          </button>
          
          <div className="p-6 text-center">
            {/* Header with icon animation */}
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-500 dark:from-purple-600 dark:to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>
              <LockIcon size={36} className="text-purple-600 dark:text-purple-300 group-hover:text-white relative z-10 transform group-hover:scale-110 transition-transform duration-300" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
              <span className="inline-block">
                <span className="flex items-center justify-center gap-2">
                  {/* <LockIcon size={24} className="text-purple-500 dark:text-purple-400" /> */}
                  Sign in required
                </span>
              </span>
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-sm mx-auto">
              You need to be signed in to try out <span className="font-semibold text-purple-600 dark:text-purple-400">{modelName}</span>. Create an account or sign in to continue.
            </p>
            
            <div className="flex flex-col gap-4">
              {/* Login button with hover effects */}
              <button 
                onClick={onLogin}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg transition-all duration-300 flex items-center justify-center gap-3 font-medium transform hover:-translate-y-1 hover:shadow-lg"
              >
                Sign in to continue
                <ArrowRight size={16} className="ml-1" />
              </button>                        
            </div>
            
            {/* Extra note at bottom */}
            {/* <div className="mt-6 text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1">
              <ShieldCheck size={14} className="text-green-500" />
              Your data is secure and protected
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
