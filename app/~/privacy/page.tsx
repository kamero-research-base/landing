'use client';

import Footer from "@/app/pages/footer";
import SideBar from "@/app/pages/sidebar";
import TopBar from "@/app/pages/topbar";
import { useState } from "react";

const PrivacyPage = () => {
   const [isOpen, setIsOpen] = useState(false);
      const showSideBar = () => {
        setIsOpen(!isOpen);
      }
     const closeSideBar = () => {
      setIsOpen(false);
     }
  return (
    <>
    <TopBar onClickSideBar={showSideBar} />
    {isOpen && <SideBar />}

     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50/30" onClick={closeSideBar}>
      {/* Hero Section */}
      <div className="overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-7">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-lg rounded-2xl mb-6">
              <i className="bi bi-shield-check text-4xl text-black"></i>
            </div>
            <h1 className="text-5xl font-bold text-black mb-4">Privacy Policy</h1>
            <p className="text-xl text-teal-500 max-w-2xl mx-auto">
              Your privacy matters. Learn how we protect and respect your data.
            </p>
          </div>
        </div>
       
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-slate-200 rounded-2xl p-8 mb-8">
          <p className="inline-flex items-center text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-full">
            <i className="bi bi-calendar3 mr-2"></i>
            Last updated: January 2025
          </p>
        </div>
        
        <div className="space-y-8">

          <section className="bg-white rounded-2xl p-8 hover:shadow-xl transition-shadow">
            <div className="flex items-start mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mr-4">
                <i className="bi bi-heart text-xl text-teal-600"></i>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">Our Commitment to Privacy</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              At Kamero Research Base, we are committed to protecting your privacy and ensuring the security of your personal information. 
              This Privacy Policy outlines how we collect, use, and safeguard your data in alignment with our core values of integrity 
              and responsibility.
            </p>
          </section>

          <section className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="flex items-start mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                <i className="bi bi-database text-xl text-blue-600"></i>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">Information We Collect</h2>
            </div>
            <p className="text-gray-600 mb-4">We may collect the following types of information:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-xl">
                <i className="bi bi-person-badge text-blue-500 mr-2"></i>
                <span className="text-gray-700">Personal identification information</span>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <i className="bi bi-clipboard-data text-blue-500 mr-2"></i>
                <span className="text-gray-700">Research participation data</span>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <i className="bi bi-graph-up text-blue-500 mr-2"></i>
                <span className="text-gray-700">Usage data and analytics</span>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <i className="bi bi-chat-dots text-blue-500 mr-2"></i>
                <span className="text-gray-700">Communication preferences</span>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="flex items-start mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                <i className="bi bi-gear text-xl text-purple-600"></i>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">How We Use Your Information</h2>
            </div>
            <p className="text-gray-600 mb-4">Your information helps us:</p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="bi bi-check-circle-fill text-purple-500 mr-3 mt-1"></i>
                <span className="text-gray-700">Facilitate research collaboration and innovation</span>
              </li>
              <li className="flex items-start">
                <i className="bi bi-check-circle-fill text-purple-500 mr-3 mt-1"></i>
                <span className="text-gray-700">Communicate updates about our research initiatives</span>
              </li>
              <li className="flex items-start">
                <i className="bi bi-check-circle-fill text-purple-500 mr-3 mt-1"></i>
                <span className="text-gray-700">Improve our platform and services</span>
              </li>
              <li className="flex items-start">
                <i className="bi bi-check-circle-fill text-purple-500 mr-3 mt-1"></i>
                <span className="text-gray-700">Comply with legal and ethical research standards</span>
              </li>
              <li className="flex items-start">
                <i className="bi bi-check-circle-fill text-purple-500 mr-3 mt-1"></i>
                <span className="text-gray-700">Support our mission of creating sustainable solutions</span>
              </li>
            </ul>
          </section>

          <section className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-2xl shadow-lg p-8 text-white">
            <div className="flex items-start mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-white/20 backdrop-blur-lg rounded-xl flex items-center justify-center mr-4">
                <i className="bi bi-lock text-xl text-white"></i>
              </div>
              <h2 className="text-2xl font-semibold">Data Protection</h2>
            </div>
            <p className="mb-4 text-teal-50">
              We implement industry-standard security measures to protect your data. Our commitment to integrity means we:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-lg p-4 rounded-xl">
                <i className="bi bi-shield-lock text-teal-200 mr-2"></i>
                <span>Use encryption for all data</span>
              </div>
              <div className="bg-white/10 backdrop-blur-lg p-4 rounded-xl">
                <i className="bi bi-person-lock text-teal-200 mr-2"></i>
                <span>Limit access to authorized personnel</span>
              </div>
              <div className="bg-white/10 backdrop-blur-lg p-4 rounded-xl">
                <i className="bi bi-arrow-repeat text-teal-200 mr-2"></i>
                <span>Regular security updates</span>
              </div>
              <div className="bg-white/10 backdrop-blur-lg p-4 rounded-xl">
                <i className="bi bi-x-circle text-teal-200 mr-2"></i>
                <span>Never sell your data</span>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl p-8">
            <div className="flex items-start mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                <i className="bi bi-clipboard-check text-xl text-green-600"></i>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">Research Data</h2>
            </div>
            <p className="text-gray-600 mb-4">
              For research participants, we follow strict ethical guidelines:
            </p>
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <i className="bi bi-check-lg text-green-600 mr-3 mt-1"></i>
                  <span className="text-gray-700">All research data is anonymized and aggregated</span>
                </li>
                <li className="flex items-start">
                  <i className="bi bi-check-lg text-green-600 mr-3 mt-1"></i>
                  <span className="text-gray-700">Participation is always voluntary with informed consent</span>
                </li>
                <li className="flex items-start">
                  <i className="bi bi-check-lg text-green-600 mr-3 mt-1"></i>
                  <span className="text-gray-700">You may withdraw from research at any time</span>
                </li>
                <li className="flex items-start">
                  <i className="bi bi-check-lg text-green-600 mr-3 mt-1"></i>
                  <span className="text-gray-700">Research data is used solely for scientific purposes</span>
                </li>
              </ul>
            </div>
          </section>

          <section className="bg-white rounded-2xl p-8">
            <div className="flex items-start mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mr-4">
                <i className="bi bi-person-check text-xl text-amber-600"></i>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">Your Rights</h2>
            </div>
            <p className="text-gray-600 mb-4">You have the right to:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-amber-50 rounded-xl">
                <i className="bi bi-eye text-2xl text-amber-600 mb-2"></i>
                <p className="text-sm font-medium text-gray-700">Access your information</p>
              </div>
              <div className="text-center p-4 bg-amber-50 rounded-xl">
                <i className="bi bi-pencil-square text-2xl text-amber-600 mb-2"></i>
                <p className="text-sm font-medium text-gray-700">Request corrections</p>
              </div>
              <div className="text-center p-4 bg-amber-50 rounded-xl">
                <i className="bi bi-trash text-2xl text-amber-600 mb-2"></i>
                <p className="text-sm font-medium text-gray-700">Request deletion</p>
              </div>
              <div className="text-center p-4 bg-amber-50 rounded-xl">
                <i className="bi bi-bell-slash text-2xl text-amber-600 mb-2"></i>
                <p className="text-sm font-medium text-gray-700">Opt-out of communications</p>
              </div>
              <div className="text-center p-4 bg-amber-50 rounded-xl">
                <i className="bi bi-x-circle text-2xl text-amber-600 mb-2"></i>
                <p className="text-sm font-medium text-gray-700">Withdraw consent</p>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl p-8">
            <div className="flex items-start mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mr-4">
                <i className="bi bi-globe text-xl text-indigo-600"></i>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">International Collaboration</h2>
            </div>
            <p className="text-gray-600">
              As a global research organization, we may transfer data across borders for collaborative purposes. 
              We ensure all international data transfers comply with applicable privacy laws and maintain the same 
              level of protection regardless of location.
            </p>
            <div className="mt-4 p-4 bg-indigo-50 rounded-xl">
              <i className="bi bi-info-circle text-indigo-600 mr-2"></i>
              <span className="text-sm text-gray-700">All data transfers follow strict security protocols</span>
            </div>
          </section>

          <section className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center mr-4">
                    <i className="bi bi-envelope text-xl text-gray-700"></i>
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900">Contact Us</h2>
                </div>
                <p className="text-gray-600 mb-4">
                  If you have questions about this Privacy Policy or how we handle your data:
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <i className="bi bi-envelope-fill text-gray-500 mr-3"></i>
                    <a href="mailto:privacy@kamero.rw" className="text-teal-600 hover:text-teal-700">privacy@kamero.rw</a>
                  </div>
                  <div className="flex items-center">
                    <i className="bi bi-geo-alt-fill text-gray-500 mr-3"></i>
                    <span className="text-gray-700">Kigali, Rwanda</span>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center mr-4">
                    <i className="bi bi-arrow-repeat text-xl text-gray-700"></i>
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900">Updates to This Policy</h2>
                </div>
                <p className="text-gray-600">
                  We may update this Privacy Policy to reflect changes in our practices or legal requirements. 
                  We will notify you of any significant changes through our platform or via email.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Footer CTA */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-4 bg-white rounded-full px-8 py-4">
            <i className="bi bi-shield-check text-2xl text-teal-600"></i>
            <p className="text-gray-700 font-medium">Your privacy is our priority</p>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default PrivacyPage;