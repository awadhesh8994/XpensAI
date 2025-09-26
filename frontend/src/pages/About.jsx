import React from 'react';
import { Link } from 'react-router';
import { 
  TrendingUp, 
  Shield, 
  Zap, 
  Users, 
  Target, 
  Award,
  Brain,
  PieChart,
  Smartphone,
  Globe,
  Plus,
  Edit3,
  Trash2,
  BarChart3
} from 'lucide-react';

function AboutPage() {
  const features = [
    {
      icon: Plus,
      title: "Add Expenses",
      description: "Quickly add your daily expenses with smart categorization and receipt scanning."
    },
    {
      icon: Edit3,
      title: "Update & Edit",
      description: "Easily modify your expense entries with intuitive editing interface."
    },
    {
      icon: Trash2,
      title: "Delete Records",
      description: "Remove unwanted entries with simple one-click deletion functionality."
    },
    {
      icon: BarChart3,
      title: "Track & Analyze",
      description: "Monitor your spending patterns with detailed analytics and visual reports."
    },
    {
      icon: Brain,
      title: "AI Assistant",
      description: "Get personalized insights and spending advice from our intelligent AI assistant."
    },
    {
      icon: Shield,
      title: "Secure Storage",
      description: "Your financial data is protected with enterprise-grade security protocols."
    }
  ];

  const coreFeatures = [
    {
      icon: Plus,
      title: "Expense Management",
      description: "Complete CRUD operations for all your expenses"
    },
    {
      icon: Brain,
      title: "AI Assistant",
      description: "Smart recommendations and financial insights"
    },
    {
      icon: PieChart,
      title: "Visual Analytics",
      description: "Beautiful charts and spending pattern analysis"
    },
    {
      icon: Smartphone,
      title: "User-Friendly",
      description: "Intuitive interface designed for ease of use"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50/30">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-50/20 to-transparent"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          
          
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 tracking-tight">
            About{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent">
              XpensaAI
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
            A comprehensive expense management application with intelligent AI assistance, 
            designed to help you add, update, delete, and track all your expenses with 
            powerful analytics and insights.
          </p>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight">
              Core Features
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage your expenses effectively
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreFeatures.map((feature, index) => (
              <div 
                key={feature.title}
                className="group hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-gray-200/60 group-hover:shadow-xl transition-all duration-300 text-center h-full">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 text-white inline-flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-black text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Can Do Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-50/50 via-white to-indigo-50/50 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
              What You Can Do
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete expense management with intelligent features
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="group hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-gray-200/60 group-hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 text-white group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-black text-gray-900">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      

      

      {/* CTA Section */}
      <section className="py-5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gray-200"></div>
        {/* <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div> */}
        
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-2xl font-black text-black mb-6 tracking-tight">
            Start Managing Your Expenses Today
          </h2>
          <p className="text-md text-gray-700 mb-8 max-w-3xl mx-auto">
            Experience the power of AI-assisted expense management with full CRUD operations 
            and intelligent insights
          </p>
          
          
        </div>
      </section>
    </div>
  );
}

export default AboutPage;