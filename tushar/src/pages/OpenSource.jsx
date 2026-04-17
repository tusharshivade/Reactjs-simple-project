import React, { useState, useEffect } from 'react';
import { Search, ExternalLink, Star, GitBranch, Terminal, CheckCircle2, Filter, AlertTriangle } from 'lucide-react';

const Github = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const OpenSource = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState('javascript');
  const [error, setError] = useState(null);

  const fetchIssues = async (lang) => {
    setLoading(true);
    setError(null);
    try {
      // Searching for "good first issue" in the specified language
      const response = await fetch(`https://api.github.com/search/issues?q=label:"good+first+issue"+state:open+language:${lang}&sort=updated&order=desc&per_page=10`);
      if (!response.ok) throw new Error('Failed to fetch issues from GitHub');
      const data = await response.json();
      setIssues(data.items);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues(language);
  }, [language]);

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Main Content */}
          <div className="lg:w-2/3">
            <div className="mb-12">
              <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                <Github className="w-10 h-10 text-slate-900 dark:text-white" />
                Open Source Guide
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
                Start your open-source journey here. We've curated beginner-friendly issues from popular repositories to help you make your first contribution.
              </p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-8">
              {['javascript', 'python', 'react', 'typescript', 'java', 'go'].map(lang => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
                    language === lang
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xl'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-slate-400'
                  }`}
                >
                  {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </button>
              ))}
            </div>

            {/* Issue List */}
            <div className="space-y-6">
              {loading ? (
                <div className="text-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 dark:border-white mx-auto"></div>
                  <p className="mt-4 text-slate-500">Scanning GitHub for opportunities...</p>
                </div>
              ) : error ? (
                <div className="p-8 bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-800 rounded-3xl text-center">
                  <AlertTriangle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-rose-900 dark:text-rose-400">GitHub API Limit Reached</h3>
                  <p className="text-rose-700 dark:text-rose-300/80 mt-2">Please wait a minute or connect your GitHub account to continue searching.</p>
                </div>
              ) : (
                issues.map(issue => (
                  <div key={issue.id} className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 p-6 sm:p-8 hover:shadow-2xl transition-all group relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    <div className="flex flex-col sm:flex-row gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                           <span className="text-xs font-bold text-slate-400 uppercase tracking-widest truncate max-w-[200px]">
                             {issue.repository_url.split('/').pop()}
                           </span>
                           <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold rounded-md uppercase tracking-tighter">
                             Good First Issue
                           </span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 line-clamp-2 group-hover:text-emerald-500 transition-colors">
                          {issue.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                          <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-amber-500" /> {issue.user.login}</span>
                          <span className="flex items-center gap-1.5"><GitBranch className="w-4 h-4" /> #{issue.number}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col justify-between items-end gap-4">
                        <a 
                          href={issue.html_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="px-6 py-2.5 bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 dark:hover:bg-slate-600 text-white font-bold rounded-xl text-sm flex items-center gap-2 transition-all shadow-lg"
                        >
                          View Issue <ExternalLink size={16} />
                        </a>
                        <button className="text-emerald-500 dark:text-emerald-400 text-sm font-bold flex items-center gap-1.5 hover:translate-x-1 transition-transform">
                          Mark as Done <CheckCircle2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Sidebar: Guide & Instructions */}
          <div className="lg:w-1/3">
             <div className="sticky top-28 space-y-8">
               
               <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2.5rem] p-8 text-white shadow-2xl overflow-hidden relative">
                  <Terminal className="absolute -bottom-6 -right-6 w-32 h-32 opacity-10" />
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-emerald-400" />
                    Contribution Guide
                  </h3>
                  <div className="space-y-6 relative z-10">
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 text-xs font-bold border border-white/20">1</div>
                      <p className="text-sm text-slate-300">Fork the repository to your own GitHub account.</p>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 text-xs font-bold border border-white/20">2</div>
                      <p className="text-sm text-slate-300">Clone it locally: <code className="bg-black/30 px-1.5 rounded">git clone repo-url</code></p>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 text-xs font-bold border border-white/20">3</div>
                      <p className="text-sm text-slate-300">Create a new branch for your specific fix or feature.</p>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 text-xs font-bold border border-white/20">4</div>
                      <p className="text-sm text-slate-300">Commit changes and push back to your fork.</p>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 text-xs font-bold border border-white/20">5</div>
                      <p className="text-sm text-slate-300">Open a Pull Request (PR) to the original repository.</p>
                    </div>
                  </div>
               </div>

               <div className="bg-emerald-50 dark:bg-emerald-900/10 rounded-[2.5rem] border border-emerald-100 dark:border-emerald-800 p-8">
                  <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-400 mb-4">Why contribute?</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-sm text-emerald-700 dark:text-emerald-300/80">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Gain real-world coding experience
                    </div>
                    <div className="flex items-center gap-3 text-sm text-emerald-700 dark:text-emerald-300/80">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Build your developer profile/portfolio
                    </div>
                    <div className="flex items-center gap-3 text-sm text-emerald-700 dark:text-emerald-300/80">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Network with maintainers and pros
                    </div>
                    <div className="flex items-center gap-3 text-sm text-emerald-700 dark:text-emerald-300/80">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Earn Hub Points for your contributions
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

export default OpenSource;
