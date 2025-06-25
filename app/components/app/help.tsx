import Link from "next/link";
import React, { useState } from "react";

const HelpPage = () => {
  const [showResearch, setShowResearch] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [questionForm, setQuestionForm] = useState({
    message: "",
    category: "general",
    email: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const researchData = [
    {
      title: "AI in Environmental Science",
      year: 2023,
      abstract: "This research explores the role of artificial intelligence in environmental sustainability and climate change mitigation strategies.",
      documentLink: "https://example.com/ai-research.pdf",
      institution: "Kamero Research Base",
      category: "Environmental Science",
      status: "Published"
    },
    {
      title: "Renewable Energy Innovations",
      year: 2022,
      abstract: "A comprehensive study on the latest trends and developments in renewable energy sources and their implementation in developing countries.",
      documentLink: "https://example.com/energy.pdf",
      institution: "Kamero Research Base",
      category: "Energy & Infrastructure",
      status: "Published"
    },
    {
      title: "Digital Health Solutions in Rural Areas",
      year: 2023,
      abstract: "Examining the impact of digital health technologies on healthcare delivery in rural communities across East Africa.",
      documentLink: "https://example.com/digital-health.pdf",
      institution: "Kamero Research Base",
      category: "Health & Medicine",
      status: "Under Review"
    }
  ];

  const helpTopics = [
    {
      id: "signup",
      icon: "👤",
      title: "How to Sign Up?",
      content: (
        <div className="space-y-3">
          <p className="text-slate-700">Getting started with Kamero Research Base is simple:</p>
          <ol className="list-decimal list-inside space-y-2 text-slate-600 pl-4">
            <li>Navigate to the <Link href="/auth/join" className="text-teal-600 hover:text-teal-700 font-medium underline">Sign-Up page</Link></li>
            <li>Fill in your personal details (name, email, phone, department)</li>
            <li>Upload a profile picture</li>
            <li>Click "Join KRB Community"</li>
            <li>Check your email for verification code</li>
            <li>Enter the verification code to activate your account</li>
          </ol>
          <div className="bg-teal-50 p-3 rounded-lg border border-teal-200 mt-4">
            <p className="text-sm text-teal-700"><strong>Tip:</strong> Make sure to use a valid email address as verification is required.</p>
          </div>
        </div>
      )
    },
    {
      id: "signin",
      icon: "🔑",
      title: "How to Sign In?",
      content: (
        <div className="space-y-3">
          <p className="text-slate-700">Access your account with these steps:</p>
          <ol className="list-decimal list-inside space-y-2 text-slate-600 pl-4">
            <li>Click on the "Sign In" option from the sidebar menu</li>
            <li>Select your user role (Student, Researcher, Admin)</li>
            <li>Enter your registered email and password</li>
            <li>Click "Sign In" to access your dashboard</li>
          </ol>
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-4">
            <p className="text-sm text-blue-700"><strong>Note:</strong> If you forget your password, use the "Forgot Password" link on the login page.</p>
          </div>
        </div>
      )
    },
    {
      id: "search",
      icon: "🔍",
      title: "How to Search for Research?",
      content: (
        <div className="space-y-3">
          <p className="text-slate-700">Find research papers efficiently using our advanced search:</p>
          <ul className="list-disc list-inside space-y-2 text-slate-600 pl-4">
            <li><strong>Keywords:</strong> Enter relevant terms in the search bar</li>
            <li><strong>Filters:</strong> Use category, year, and institution filters</li>
            <li><strong>Similar Topics:</strong> Browse related research categories</li>
            <li><strong>Related Titles:</strong> Discover similar research papers</li>
          </ul>
          <div className="bg-green-50 p-3 rounded-lg border border-green-200 mt-4">
            <p className="text-sm text-green-700"><strong>Pro Tip:</strong> Use specific keywords and combine multiple search terms for better results.</p>
          </div>
        </div>
      )
    },
    {
      id: "password",
      icon: "🔐",
      title: "How to Change Password?",
      content: (
        <div className="space-y-3">
          <p className="text-slate-700">Reset your password securely:</p>
          <ol className="list-decimal list-inside space-y-2 text-slate-600 pl-4">
            <li>Go to the <Link href="/auth/login" className="text-teal-600 hover:text-teal-700 font-medium underline">Login page</Link></li>
            <li>Click on "Forgot Password?" link</li>
            <li>Enter your registered email address</li>
            <li>Check your email for the reset link</li>
            <li>Follow the link and create a new password</li>
            <li>Confirm your new password</li>
          </ol>
          <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200 mt-4">
            <p className="text-sm text-yellow-700"><strong>Security:</strong> Choose a strong password with at least 8 characters, including numbers and symbols.</p>
          </div>
        </div>
      )
    }
  ];

  const handleQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
     try {
      const response = await fetch("/api/auth/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(FormData),
      });

      const data = await response.json();
      if(data){
          setTimeout(() => {
            setIsSubmitting(false);
            setQuestionForm({ message: "", category: "general", email: "" });
            // Show success message
          }, 2000);
        }
    } catch (err) {
      
    }
   
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/20">
      <div className="pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Hero Section */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-gradient-to-r from-teal-900/95 to-slate-900/95 rounded-full flex items-center justify-center shadow-xl">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-teal-900/95 to-slate-900/95 bg-clip-text text-transparent mb-3 sm:mb-4">
              Help & Support
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Everything you need to know about using Kamero Research Base effectively
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            
            {/* Main Content */}
            <div className="lg:col-span-8 order-2 lg:order-1">
              
              {/* FAQ Section */}
              <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl p-4 sm:p-6 lg:p-8 border border-slate-200/60 mb-6 lg:mb-8">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 mb-4 sm:mb-6 flex items-center">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 mr-3 text-teal-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  Frequently Asked Questions
                </h2>
                
                <div className="space-y-3 sm:space-y-4">
                  {helpTopics.map((topic) => (
                    <div key={topic.id} className="border border-slate-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setActiveSection(activeSection === topic.id ? null : topic.id)}
                        className="w-full flex items-center justify-between p-3 sm:p-4 lg:p-5 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
                      >
                        <div className="flex items-center min-w-0 flex-1">
                          <span className="text-xl sm:text-2xl mr-3 flex-shrink-0">{topic.icon}</span>
                          <h3 className="font-semibold text-slate-800 text-sm sm:text-base lg:text-lg">{topic.title}</h3>
                        </div>
                        <svg 
                          className={`w-5 h-5 sm:w-6 sm:h-6 text-slate-500 transition-transform flex-shrink-0 ml-3 ${activeSection === topic.id ? 'rotate-180' : ''}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {activeSection === topic.id && (
                        <div className="p-3 sm:p-4 lg:p-6 bg-white border-t border-slate-200">
                          {topic.content}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Research Documentation */}
              <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl p-4 sm:p-6 lg:p-8 border border-slate-200/60">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-4">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 flex items-center">
                    <svg className="w-6 h-6 sm:w-7 sm:h-7 mr-3 text-teal-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Research Documentation
                  </h2>
                  <button 
                    onClick={() => setShowResearch(!showResearch)} 
                    className="bg-gradient-to-r from-teal-600 to-slate-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:from-teal-500 hover:to-slate-600 transition-all duration-300 flex items-center shadow-lg text-sm sm:text-base whitespace-nowrap"
                  >
                    {showResearch ? (
                      <>
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                        </svg>
                        Hide Research
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        View Research
                      </>
                    )}
                  </button>
                </div>
                
                {showResearch && (
                  <div className="space-y-4 sm:space-y-6">
                    {researchData.map((item, index) => (
                      <div key={index} className="bg-gradient-to-r from-slate-50 to-white p-4 sm:p-6 rounded-xl border border-slate-200 hover:shadow-lg transition-all duration-300">
                        <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-3 sm:mb-4 gap-3">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base sm:text-lg lg:text-xl font-bold text-slate-800 mb-2 break-words">{item.title}</h3>
                            <div className="flex flex-wrap gap-2 mb-3">
                              <span className="px-2 sm:px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs sm:text-sm font-medium">
                                {item.category}
                              </span>
                              <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                                item.status === 'Published' 
                                  ? 'bg-green-100 text-green-700' 
                                  : 'bg-yellow-100 text-yellow-700'
                              }`}>
                                {item.status}
                              </span>
                            </div>
                          </div>
                          <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-400 flex-shrink-0">{item.year}</span>
                        </div>
                        
                        <p className="text-slate-600 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">{item.abstract}</p>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="text-xs sm:text-sm text-slate-500">
                            <strong>Institution:</strong> {item.institution}
                          </div>
                          <a 
                            href={item.documentLink} 
                            className="inline-flex items-center justify-center px-3 sm:px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors shadow-md text-sm whitespace-nowrap" 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            View Document
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-4 order-1 lg:order-2">
              <div className="lg:sticky lg:top-32 space-y-4 sm:space-y-6">
                
                {/* Quick Links */}
                <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl p-4 sm:p-6 border border-slate-200/60">
                  <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-3 sm:mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-teal-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    Quick Links
                  </h3>
                  <div className="space-y-2">
                    <Link href="/auth/join" className="block p-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors">
                      <div className="font-medium text-slate-800 text-sm sm:text-base">Join KRB</div>
                      <div className="text-xs sm:text-sm text-slate-600">Create new account</div>
                    </Link>
                    <Link href="/auth/login" className="block p-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors">
                      <div className="font-medium text-slate-800 text-sm sm:text-base">Sign In</div>
                      <div className="text-xs sm:text-sm text-slate-600">Access your account</div>
                    </Link>
                    <Link href="/~/result" className="block p-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors">
                      <div className="font-medium text-slate-800 text-sm sm:text-base">Search Research</div>
                      <div className="text-xs sm:text-sm text-slate-600">Find academic papers</div>
                    </Link>
                  </div>
                </div>

                {/* Ask Question Form */}
                <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl p-4 sm:p-6 border border-slate-200/60">
                  <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-3 sm:mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-teal-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Ask a Question
                  </h3>
                  
                  <form onSubmit={handleQuestionSubmit} className="space-y-3 sm:space-y-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-2">Category</label>
                      <select 
                        value={questionForm.category}
                        onChange={(e) => setQuestionForm({...questionForm, category: e.target.value})}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:border-teal-500 focus:ring-1 focus:ring-teal-500 focus:outline-none text-sm sm:text-base"
                      >
                        <option value="general">General Help</option>
                        <option value="account">Account Issues</option>
                        <option value="search">Search Help</option>
                        <option value="technical">Technical Support</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-2">Email (optional)</label>
                      <input 
                        type="email"
                        value={questionForm.email}
                        onChange={(e) => setQuestionForm({...questionForm, email: e.target.value})}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:border-teal-500 focus:ring-1 focus:ring-teal-500 focus:outline-none text-sm sm:text-base"
                        placeholder="your@email.com"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-2">Your Question</label>
                      <textarea 
                        value={questionForm.message}
                        onChange={(e) => setQuestionForm({...questionForm, message: e.target.value})}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:border-teal-500 focus:ring-1 focus:ring-teal-500 focus:outline-none resize-none text-sm sm:text-base" 
                        placeholder="Describe your question or issue..." 
                        rows={4}
                        required
                      />
                    </div>
                    
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-teal-600 to-slate-700 text-white py-2.5 sm:py-3 rounded-lg hover:from-teal-500 hover:to-slate-600 transition-all duration-300 disabled:opacity-50 flex items-center justify-center text-sm sm:text-base"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-4 w-4 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                          <span>Submit Question</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>

                {/* Contact Support */}
                <div className="bg-gradient-to-r from-teal-900/95 to-slate-900/95 text-white rounded-2xl p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3">Need Direct Support?</h3>
                  <p className="text-xs sm:text-sm opacity-90 mb-3 sm:mb-4">Get in touch with our support team for immediate assistance.</p>
                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="break-all">research@kamero.rw</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      +250 781 121 117
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;