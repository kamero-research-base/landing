import Footer from '@/app/pages/footer';
import React from 'react';

// Enhanced Section component with professional styling
const Section = ({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) => {
  return (
    <section className={`my-12 ${className}`}>
      <div className="relative mb-6">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-900/95 to-slate-900/95 bg-clip-text text-transparent mb-2">
          {title}
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-teal-600 to-slate-600 rounded-full"></div>
      </div>
      <div className="text-slate-700 leading-relaxed">{children}</div>
    </section>
  );
};

// Enhanced team card component
const TeamCard = ({ name, role, image }: { name: string; role: string; image: string }) => {
  return (
    <div className="group bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-2xl rounded-2xl p-6 text-center transition-all duration-300 hover:scale-105 border border-slate-100">
      <div className="relative mb-4">
        <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-teal-900/95 to-slate-900/95 p-1">
          <img src={image} alt={name} className="w-full h-full object-cover rounded-full bg-white" />
        </div>
        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      <h4 className="font-bold text-slate-800 mb-1 group-hover:text-teal-700 transition-colors">{name}</h4>
      <p className="text-slate-600 text-sm">{role}</p>
    </div>
  );
};

// Value card component
const ValueCard = ({ title, description, icon }: { title: string; description: string; icon: string }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-slate-200/60 hover:border-teal-300/60">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-gradient-to-r from-teal-100 to-slate-100 rounded-lg flex items-center justify-center mr-4">
          <span className="text-2xl">{icon}</span>
        </div>
        <h4 className="font-bold text-slate-800">{title}</h4>
      </div>
      <p className="text-slate-600">{description}</p>
    </div>
  );
};

// Research area card component
const ResearchCard = ({ title, description }: { title: string; description: string }) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-slate-200/60 hover:border-teal-300/60 group">
      <h4 className="font-bold text-slate-800 mb-3 group-hover:text-teal-700 transition-colors">{title}</h4>
      <p className="text-slate-600">{description}</p>
    </div>
  );
};

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/20">
      <div className="sm:max-w-[85%] w-full mx-auto p-4 pt-20 sm:pt-32">
        
        {/* Enhanced Hero Section */}
        <div className="relative bg-gradient-to-r from-teal-900/95 to-slate-900/95 text-white text-center py-16 px-8 mb-16 rounded-3xl shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="w-20 h-20 mx-auto mb-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <img src="/logo.svg" alt="KRB Logo" className="w-12 h-12 rounded-full" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Welcome to Kamero Research Base
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              Leading research to create a sustainable future through collaboration, innovation, and global impact.
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <Section title="Our Mission">
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-slate-200/60">
            <p className="text-lg leading-relaxed">
              At Kamero Research Base, we drive research that positively impacts the environment, society, and
              technology. Our team is committed to collaborating globally, addressing humanity's most pressing
              challenges with innovative solutions that shape a better tomorrow.
            </p>
          </div>
        </Section>

        {/* Vision Section */}
        <Section title="Our Vision">
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-slate-200/60">
            <p className="text-lg leading-relaxed">
              Our vision is to be a global leader in scientific research and innovation, shaping a sustainable
              and brighter future for everyone through groundbreaking discoveries and meaningful partnerships.
            </p>
          </div>
        </Section>

        {/* Core Values Section */}
        <Section title="Core Values">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ValueCard 
              title="Innovation" 
              description="Pushing boundaries with fresh ideas and cutting-edge technology to solve complex challenges."
              icon="💡"
            />
            <ValueCard 
              title="Collaboration" 
              description="Partnering with experts worldwide to achieve greater outcomes and lasting impact."
              icon="🤝"
            />
            <ValueCard 
              title="Integrity" 
              description="Committing to the highest ethical standards in all aspects of our research and operations."
              icon="🛡️"
            />
            <ValueCard 
              title="Sustainability" 
              description="Ensuring long-term well-being for both people and the planet through responsible practices."
              icon="🌱"
            />
          </div>
        </Section>

        {/* Research Focus Areas Section */}
        <Section title="Research Focus Areas">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <ResearchCard 
              title="Environmental Science"
              description="Studying ecosystems and sustainability practices to address climate change and environmental challenges."
            />
            <ResearchCard 
              title="Health and Medicine"
              description="Innovating medical solutions to improve public health and healthcare accessibility on a global scale."
            />
            <ResearchCard 
              title="Technology & AI"
              description="Harnessing artificial intelligence, machine learning, and emerging technologies to advance industries."
            />
            <ResearchCard 
              title="Social Science"
              description="Researching societal issues to foster community development, equity, and social well-being."
            />
            <ResearchCard 
              title="Energy & Infrastructure"
              description="Developing sustainable energy solutions and infrastructure for modern society's needs."
            />
            <ResearchCard 
              title="Education Innovation"
              description="Transforming educational approaches through research in pedagogy and learning technologies."
            />
          </div>
          <div className="bg-gradient-to-r from-teal-50 to-slate-50 p-6 rounded-xl border border-teal-200/60">
            <p className="text-slate-600 italic text-center">
              <strong>Note:</strong> Our research encompasses all recognized categories by Rwanda Academic Regulators, 
              ensuring comprehensive coverage of national research priorities.
            </p>
          </div>
        </Section>

        {/* Team Section */}
        <Section title="Our Leadership Team">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <TeamCard 
              name="Olivier Turikumwe" 
              role="Founder & Chief Executive Officer" 
              image="/logo.svg" 
            />
            <TeamCard 
              name="Joseph Maranatha" 
              role="Lead Technologist & Innovation Director" 
              image="/logo.svg" 
            />
            <TeamCard 
              name="Dorcas Nyiramahoro" 
              role="Chief Sales & Partnership Manager" 
              image="/logo.svg" 
            />
          </div>
        </Section>

        {/* What Sets Us Apart Section */}
        <Section title="What Sets Us Apart">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-slate-200/60">
              <div className="w-12 h-12 bg-gradient-to-r from-teal-100 to-slate-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🌍</span>
              </div>
              <h4 className="font-bold text-slate-800 mb-3">Global Impact</h4>
              <p className="text-slate-600">Our research and findings are recognized globally, influencing industries and communities worldwide with measurable outcomes.</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-slate-200/60">
              <div className="w-12 h-12 bg-gradient-to-r from-teal-100 to-slate-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🔬</span>
              </div>
              <h4 className="font-bold text-slate-800 mb-3">Advanced Facilities</h4>
              <p className="text-slate-600">Equipped with state-of-the-art research technologies and modern infrastructure for maximum efficiency and innovation.</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-slate-200/60">
              <div className="w-12 h-12 bg-gradient-to-r from-teal-100 to-slate-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">♻️</span>
              </div>
              <h4 className="font-bold text-slate-800 mb-3">Sustainability Leadership</h4>
              <p className="text-slate-600">Leading with eco-friendly practices in all aspects of our research, operations, and community engagement.</p>
            </div>
          </div>
        </Section>

        {/* Join Us Section */}
        <Section title="Partner With Us">
          <div className="bg-gradient-to-r from-teal-900/95 to-slate-900/95 text-white p-8 rounded-2xl shadow-xl">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Make an Impact?</h3>
              <p className="text-lg opacity-90 mb-6 max-w-3xl mx-auto">
                We believe in the power of collaboration. Whether you're a researcher, academic, organization, or innovator 
                looking to partner with us, let's work together to build solutions for a sustainable future.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center" onClick={() => window.location.assign("https://onboarding.kamero.rw")}>
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-teal-900 transition-colors">
                  Join Our Research Network
                </button>
              </div>
            </div>
          </div>
        </Section>

        {/* Enhanced Footer */}
        <footer className="bg-gradient-to-r from-teal-900/95 to-slate-900/95 text-white py-8 text-center mt-20 rounded-2xl shadow-2xl">
          <Footer />
        </footer>
      </div>
    </div>
  );
};

export default AboutUs;