'use client';

import Footer from "@/app/pages/footer";
import SideBar from "@/app/pages/sidebar";
import TopBar from "@/app/pages/topbar";
import { useState } from "react";


const TermsPage = () => {
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
  
 <div className="min-h-screen" onClick={closeSideBar}>
      {/* Hero Section */}
      <div className="" >
        <div className="max-w-7xl mx-auto px-6 py-7">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-2xl mb-6">
              <i className="bi bi-file-text text-4xl text-black"></i>
            </div>
            <h1 className="text-5xl font-bold text-slate-800 mb-4">Terms of Service</h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">
              Guidelines for using our platform and contributing to global research
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-slate-50 rounded-2xl p-8 mb-8">
          <p className="inline-flex items-center text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-full">
            <i className="bi bi-calendar3 mr-2"></i>
            Effective Date: January 2025
          </p>
        </div>
        
        <div className="space-y-8">

          <section className="bg-gradient-to-r from-teal-600 to-slate-600 rounded-2xl shadow-lg p-8 text-white">
            <div className="flex items-start mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-white/20 backdrop-blur-lg rounded-xl flex items-center justify-center mr-4">
                <i className="bi bi-rocket text-xl text-white"></i>
              </div>
              <h2 className="text-2xl font-semibold">Welcome to Kamero Research Base</h2>
            </div>
            <p className="text-blue-50 leading-relaxed">
              By accessing and using our platform, you agree to these Terms of Service. Our terms reflect our commitment 
              to innovation, collaboration, integrity, and sustainability in advancing global research initiatives.
            </p>
          </section>

          <section className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="flex items-start mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                <i className="bi bi-check-square text-xl text-green-600"></i>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">1. Acceptance of Terms</h2>
            </div>
            <p className="text-gray-600">
              By using Kamero Research Base, you acknowledge that you have read, understood, and agree to be bound by 
              these terms. If you do not agree, please do not use our services.
            </p>
          </section>

          <section className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="flex items-start mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                <i className="bi bi-layers text-xl text-purple-600"></i>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">2. Our Services</h2>
            </div>
            <p className="text-gray-600 mb-4">Kamero Research Base provides:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center p-4 bg-purple-50 rounded-xl">
                <i className="bi bi-book text-purple-500 mr-3"></i>
                <span className="text-gray-700">Research resources & publications</span>
              </div>
              <div className="flex items-center p-4 bg-purple-50 rounded-xl">
                <i className="bi bi-people text-purple-500 mr-3"></i>
                <span className="text-gray-700">Global collaboration tools</span>
              </div>
              <div className="flex items-center p-4 bg-purple-50 rounded-xl">
                <i className="bi bi-lightbulb text-purple-500 mr-3"></i>
                <span className="text-gray-700">Innovation sharing platform</span>
              </div>
              <div className="flex items-center p-4 bg-purple-50 rounded-xl">
                <i className="bi bi-mortarboard text-purple-500 mr-3"></i>
                <span className="text-gray-700">Educational content</span>
              </div>
            </div>
          </section>           <section className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="flex items-start mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mr-4">
                <i className="bi bi-person-workspace text-xl text-amber-600"></i>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">3. User Responsibilities</h2>
            </div>
            <p className="text-gray-600 mb-4">As a user of our platform, you agree to:</p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="bi bi-check-circle-fill text-amber-500 mr-3 mt-1"></i>
                <span className="text-gray-700">Provide accurate and truthful information</span>
              </li>
              <li className="flex items-start">
                <i className="bi bi-check-circle-fill text-amber-500 mr-3 mt-1"></i>
                <span className="text-gray-700">Use the platform for legitimate research and educational purposes</span>
              </li>
              <li className="flex items-start">
                <i className="bi bi-check-circle-fill text-amber-500 mr-3 mt-1"></i>
                <span className="text-gray-700">Respect intellectual property rights</span>
              </li>
              <li className="flex items-start">
                <i className="bi bi-check-circle-fill text-amber-500 mr-3 mt-1"></i>
                <span className="text-gray-700">Maintain the confidentiality of your account credentials</span>
              </li>
              <li className="flex items-start">
                <i className="bi bi-check-circle-fill text-amber-500 mr-3 mt-1"></i>
                <span className="text-gray-700">Comply with all applicable laws and ethical research standards</span>
              </li>
            </ul>
          </section>

          <section className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="flex items-start mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                <i className="bi bi-c-circle text-xl text-blue-600"></i>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">4. Intellectual Property</h2>
            </div>
            <p className="text-gray-600 mb-4">
              All content on Kamero Research Base, including research findings, publications, and platform features, 
              is protected by intellectual property laws. Users may:
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <i className="bi bi-eye text-2xl text-blue-600 mb-2"></i>
                  <p className="text-sm font-medium text-gray-700">Access for research</p>
                </div>
                <div className="text-center">
                  <i className="bi bi-share text-2xl text-blue-600 mb-2"></i>
                  <p className="text-sm font-medium text-gray-700">Share with attribution</p>
                </div>
                <div className="text-center">
                  <i className="bi bi-people text-2xl text-blue-600 mb-2"></i>
                  <p className="text-sm font-medium text-gray-700">Collaborate with permission</p>
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              <i className="bi bi-info-circle text-blue-500 mr-2"></i>
              Users may not reproduce, distribute, or commercialize our content without written permission.
            </p>
          </section>

          <section className="bg-gradient-to-r from-teal-600 to-green-600 rounded-2xl shadow-lg p-8 text-white">
            <div className="flex items-start mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-white/20 backdrop-blur-lg rounded-xl flex items-center justify-center mr-4">
                <i className="bi bi-heart text-xl text-white"></i>
              </div>
              <h2 className="text-2xl font-semibold">5. Research Ethics</h2>
            </div>
            <p className="mb-4 text-green-50">
              We maintain the highest standards of research integrity. All users must:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-lg p-4 rounded-xl">
                <i className="bi bi-person-check text-green-200 mr-2"></i>
                <span>Follow ethical guidelines for human subjects</span>
              </div>
              <div className="bg-white/10 backdrop-blur-lg p-4 rounded-xl">
                <i className="bi bi-graph-up-arrow text-green-200 mr-2"></i>
                <span>Ensure data accuracy and transparency</span>
              </div>
              <div className="bg-white/10 backdrop-blur-lg p-4 rounded-xl">
                <i className="bi bi-exclamation-triangle text-green-200 mr-2"></i>
                <span>Disclose any conflicts of interest</span>
              </div>
              <div className="bg-white/10 backdrop-blur-lg p-4 rounded-xl">
                <i className="bi bi-shield-check text-green-200 mr-2"></i>
                <span>Respect participant privacy and consent</span>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="flex items-start mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mr-4">
                <i className="bi bi-globe2 text-xl text-indigo-600"></i>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">6. Collaboration Guidelines</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Our platform encourages global collaboration. When engaging with others:
            </p>
            <div className="space-y-3">
              <div className="flex items-start p-4 bg-indigo-50 rounded-xl">
                <i className="bi bi-chat-dots text-indigo-500 mr-3 mt-1"></i>
                <span className="text-gray-700">Maintain professional and respectful communication</span>
              </div>
              <div className="flex items-start p-4 bg-indigo-50 rounded-xl">
                <i className="bi bi-handshake text-indigo-500 mr-3 mt-1"></i>
                <span className="text-gray-700">Honor collaboration agreements and commitments</span>
              </div>
              <div className="flex items-start p-4 bg-indigo-50 rounded-xl">
                <i className="bi bi-award text-indigo-500 mr-3 mt-1"></i>
                <span className="text-gray-700">Share credit appropriately for joint work</span>
              </div>
              <div className="flex items-start p-4 bg-indigo-50 rounded-xl">
                <i className="bi bi-globe-americas text-indigo-500 mr-3 mt-1"></i>
                <span className="text-gray-700">Respect diverse perspectives and cultural differences</span>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl shadow-lg p-8 border border-green-200">
            <div className="flex items-start mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-green-200 rounded-xl flex items-center justify-center mr-4">
                <i className="bi bi-tree text-xl text-green-700"></i>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">7. Sustainability Commitment</h2>
            </div>
            <p className="text-gray-600">
              Users of our platform are encouraged to consider environmental impact in their research and to prioritize 
              sustainable practices that benefit both people and the planet.
            </p>
            <div className="mt-4 flex items-center justify-center">
              <div className="inline-flex items-center space-x-2 bg-white px-6 py-3 rounded-full shadow-md">
                <i className="bi bi-leaf text-green-600"></i>
                <span className="text-sm font-medium text-gray-700">Together for a sustainable future</span>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mr-4">
                  <i className="bi bi-shield-x text-xl text-red-600"></i>
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">8. Limitation of Liability</h2>
              </div>
              <p className="text-gray-600">
                While we strive for excellence, Kamero Research Base provides services "as is" without warranties. 
                We are not liable for any indirect, incidental, or consequential damages arising from platform use.
              </p>
            </section>

            <section className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mr-4">
                  <i className="bi bi-x-octagon text-xl text-orange-600"></i>
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">9. Termination</h2>
              </div>
              <p className="text-gray-600">
                We reserve the right to suspend or terminate accounts that violate these terms or engage in activities 
                that harm our community or mission. Users may terminate their accounts at any time.
              </p>
            </section>
          </div>

          <section className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="flex items-start mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mr-4">
                <i className="bi bi-bank text-xl text-gray-600"></i>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">10. Governing Law</h2>
            </div>
            <p className="text-gray-600">
              These terms are governed by the laws of Rwanda. Any disputes will be resolved through good faith 
              negotiation, and if necessary, through appropriate legal channels in Kigali, Rwanda.
            </p>
          </section>

          <section className="bg-gray-50 rounded-2xl shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center mr-4">
                    <i className="bi bi-arrow-repeat text-xl text-gray-700"></i>
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900">11. Changes to Terms</h2>
                </div>
                <p className="text-gray-600">
                  We may update these terms to reflect changes in our services or legal requirements. Users will be 
                  notified of significant changes, and continued use constitutes acceptance of updated terms.
                </p>
              </div>
              
              <div>
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center mr-4">
                    <i className="bi bi-envelope text-xl text-gray-700"></i>
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900">Contact Information</h2>
                </div>
                <p className="text-gray-600 mb-4">
                  For questions about these terms or our services:
                </p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <i className="bi bi-envelope-fill text-gray-500 mr-3"></i>
                    <a href="mailto:info@kamero.rw" className="text-blue-600 hover:text-blue-700">info@kamero.rw</a>
                  </div>
                  <div className="flex items-center">
                    <i className="bi bi-geo-alt-fill text-gray-500 mr-3"></i>
                    <span className="text-gray-700">Kigali, Rwanda</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="mt-12 p-8 bg-gradient-to-r from-teal-600 to-slate-800/90 rounded-2xl shadow-xl text-center">
            <i className="bi bi-stars text-4xl text-white mb-4"></i>
            <p className="text-xl text-white font-medium">
              Thank you for being part of our mission to create a sustainable future through research and innovation.
            </p>
          </div>
        </div>
      </div>
    </div>
        <Footer />
    </>
  );
};

export default TermsPage;