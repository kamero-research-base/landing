import { useState, useEffect } from "react";

export default function PopupForm() {
  const [selectedRole, setSelectedRole] = useState<any>('');
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    // Load Bootstrap Icons CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.11.3/font/bootstrap-icons.min.css';
    document.head.appendChild(link);
  }, []);

  const handleRedirect = (role: string) => {
    const urls: Record<string, string> = {
      student: "https://app.kamero.rw/auth/login?auth=0&uuid=unknown&type=",
      supervisor: "https://supervisor.kamero.rw/auth/login?auth=1&uuid=unknown&type=",
      institution: "https://onboarding.kamero.rw/auth/login?auth=0&uuid=unknown&type=",
    };
    if (urls[role]) {
      setSelectedRole(role);
      setTimeout(() => window.location.href = urls[role], 300);
    }
  };

  const roles = [
    { id: "student", name: "Student", icon: "bi bi-mortarboard" },
    { id: "supervisor", name: "Supervisor", icon: "bi bi-person-badge" },
    { id: "institution", name: "Institution", icon: "bi bi-building" }
  ];

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm z-50"
      onClick={() => setIsOpen(false)}
    >
      <div 
        className="bg-white p-8 rounded-2xl shadow-2xl w-96 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <i className="bi bi-x text-2xl"></i>
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <i className="bi bi-rocket-takeoff text-white text-2xl"></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Select Your Role</h2>
        </div>

        <div className="space-y-3">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => handleRedirect(role.id)}
              disabled={selectedRole && selectedRole !== role.id}
              className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200 ${
                selectedRole === role.id 
                  ? 'border-teal-500 bg-teal-50' 
                  : 'border-gray-200 hover:border-teal-300 hover:bg-teal-50'
              } ${selectedRole && selectedRole !== role.id ? 'opacity-50' : ''}`}
            >
              <div className="flex items-center space-x-3">
                <i className={`${role.icon} text-teal-600 text-xl`}></i>
                <span className="font-medium text-gray-800">{role.name}</span>
              </div>
              {selectedRole === role.id ? (
                <div className="w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center">
                  <i className="bi bi-check text-white text-sm"></i>
                </div>
              ) : (
                <i className="bi bi-arrow-right text-gray-400"></i>
              )}
            </button>
          ))}
        </div>

        {selectedRole && (
          <div className="mt-6 text-center">
            <div className="inline-flex items-center space-x-2 text-teal-600">
              <div className="w-4 h-4 border-2 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm">Redirecting...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}