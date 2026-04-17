import React, { useState } from 'react';
import { Beaker, ChevronRight, CheckCircle2, Circle, Code2, BookOpen, Clock, BarChart3, Rocket } from 'lucide-react';

const labsData = [
  {
    id: 'weather-app',
    title: "Build a Weather App in 30 Minutes",
    description: "Learn how to fetch real-time weather data using an API and display it in a beautiful UI.",
    difficulty: "Beginner",
    duration: "30 mins",
    tags: ["React", "API", "CSS"],
    steps: [
      { title: "Project Setup", content: "Initialize a new React project using Vite and install necessary dependencies like Lucide React and Axios." },
      { title: "API Configuration", content: "Sign up for OpenWeatherMap and get your API key. Set up environment variables." },
      { title: "UI Layout", content: "Create the search bar and the weather display card components using Tailwind CSS." },
      { title: "Fetching Data", content: "Implement the fetch logic using Axios inside a useEffect hook to get data based on city name." },
      { title: "Dynamic Themes", content: "Bonus: Change the background color based on the current weather condition (e.g., blue for rain, orange for sun)." }
    ]
  },
  {
    id: 'django-login',
    title: "Create a Login System using Django",
    description: "Master user authentication with Django's built-in auth system and custom templates.",
    difficulty: "Intermediate",
    duration: "45 mins",
    tags: ["Django", "Python", "Auth"],
    steps: [
      { title: "Django Setup", content: "Set up a new Django project and create an 'accounts' app." },
      { title: "Auth Views", content: "Utilize Django's built-in LoginView and LogoutView in your urls.py." },
      { title: "Custom Templates", content: "Create a registration form and login page template using Bootstrap or Tailwind." },
      { title: "Middleware & Decorators", content: "Learn how to protect routes using the login_required decorator and handle user sessions." }
    ]
  },
  {
    id: 'portfolio-site',
    title: "Aesthetic Portfolio with Glassmorphism",
    description: "Build a modern, high-conversion portfolio site with advanced CSS effects.",
    difficulty: "Beginner",
    duration: "60 mins",
    tags: ["HTML", "CSS", "UI/UX"],
    steps: [
      { title: "Glassmorphism Basics", content: "Understand backdrop-filter and transparency in CSS." },
      { title: "Interactive Hero", content: "Build a stunning hero section with floating abstract shapes." },
      { title: "Project Gallery", content: "Create a responsive grid for your projects with hover micro-animations." },
      { title: "Smooth Scrolling", content: "Implement smooth navigation between sections without external libraries." }
    ]
  }
];

const Labs = () => {
  const [selectedLab, setSelectedLab] = useState(null);
  const [completedSteps, setCompletedSteps] = useState({});

  const toggleStep = (labId, stepIndex) => {
    setCompletedSteps(prev => ({
      ...prev,
      [`${labId}-${stepIndex}`]: !prev[`${labId}-${stepIndex}`]
    }));
  };

  const getLabProgress = (labId, stepsCount) => {
    const completed = Array.from({ length: stepsCount }).filter((_, i) => completedSteps[`${labId}-${i}`]).length;
    return Math.round((completed / stepsCount) * 100);
  };

  if (selectedLab) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => setSelectedLab(null)}
            className="mb-8 text-emerald-500 font-bold flex items-center gap-2 hover:translate-x-[-4px] transition-transform"
          >
            <ChevronRight className="w-5 h-5 rotate-180" /> Back to Labs
          </button>

          <div className="bg-white dark:bg-slate-800 rounded-[2rem] shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden">
            <div className="p-8 sm:p-12 border-b border-slate-100 dark:border-slate-700">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold rounded-full uppercase tracking-wider">
                  {selectedLab.difficulty}
                </span>
                <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-sm font-medium">
                  <Clock className="w-4 h-4" /> {selectedLab.duration}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
                {selectedLab.title}
              </h1>
              <div className="w-full bg-slate-100 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden mb-2">
                <div 
                  className="bg-emerald-500 h-full transition-all duration-500" 
                  style={{ width: `${getLabProgress(selectedLab.id, selectedLab.steps.length)}%` }}
                ></div>
              </div>
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400 text-right">
                {getLabProgress(selectedLab.id, selectedLab.steps.length)}% Completed
              </p>
            </div>

            <div className="p-8 sm:p-12 space-y-12">
              {selectedLab.steps.map((step, index) => {
                const isCompleted = completedSteps[`${selectedLab.id}-${index}`];
                return (
                  <div key={index} className="flex gap-6 relative group">
                    {/* Timeline Line */}
                    {index !== selectedLab.steps.length - 1 && (
                      <div className="absolute left-6 top-12 bottom-[-48px] w-0.5 bg-slate-100 dark:bg-slate-700"></div>
                    )}

                    <div 
                      onClick={() => toggleStep(selectedLab.id, index)}
                      className={`w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center cursor-pointer transition-all duration-300 border-2 z-10 
                        ${isCompleted 
                          ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-300 group-hover:border-emerald-500'}`}
                    >
                      {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <div className="w-2.5 h-2.5 bg-slate-200 rounded-full"></div>}
                    </div>

                    <div className={`flex-1 pt-1 ${isCompleted ? 'opacity-60 transition-opacity' : ''}`}>
                      <h3 className={`text-xl font-bold mb-2 ${isCompleted ? 'text-slate-500' : 'text-slate-900 dark:text-white'}`}>
                        {index + 1}. {step.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                        {step.content}
                      </p>
                      
                      <div className="bg-slate-900 rounded-xl p-4 flex items-center justify-between group/code cursor-pointer hover:bg-slate-950 transition-colors">
                        <div className="flex items-center gap-3">
                          <Code2 className="w-5 h-5 text-emerald-400" />
                          <span className="text-sm font-mono text-slate-300">View code for this step</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover/code:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                );
              })}

              {getLabProgress(selectedLab.id, selectedLab.steps.length) === 100 && (
                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-8 rounded-3xl border border-emerald-100 dark:border-emerald-800 text-center animate-in zoom-in duration-500">
                  <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white shadow-xl">
                    <Rocket className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-emerald-900 dark:text-emerald-400">Lab Completed!</h3>
                  <p className="text-emerald-700 dark:text-emerald-300/80 mt-2">
                    Congratulations! You've successfully finished this build-along lab. +100 points awarded!
                  </p>
                  <button 
                    onClick={() => setSelectedLab(null)}
                    className="mt-6 px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/30"
                  >
                    Explore More Labs
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-100 dark:bg-indigo-900/40 rounded-2xl mb-4">
            <Beaker className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Virtual Build-Along Labs
          </h1>
          <p className="mt-6 text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Hands-on learning by building real-world projects. Choose a lab, follow the steps, and mark them as you code.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {labsData.map(lab => (
            <div key={lab.id} className="bg-white dark:bg-slate-800 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-2 group">
              <div className="p-8 sm:p-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-2">
                    {lab.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[10px] font-bold rounded-lg uppercase tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400">
                    <BookOpen className="w-5 h-5" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-indigo-500 transition-colors">
                  {lab.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 mb-8 text-sm leading-relaxed flex-grow">
                  {lab.description}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-slate-50 dark:border-slate-700/50">
                  <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    <span className="flex items-center gap-1.5"><Clock size={14} className="text-indigo-500" /> {lab.duration}</span>
                    <span className="flex items-center gap-1.5"><BarChart3 size={14} className="text-emerald-500" /> {lab.difficulty}</span>
                  </div>
                  <button 
                    onClick={() => setSelectedLab(lab)}
                    className="p-3 bg-slate-900 dark:bg-indigo-600 hover:bg-slate-800 dark:hover:bg-indigo-500 text-white rounded-2xl transition-colors shadow-lg shadow-indigo-500/20"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Labs;
