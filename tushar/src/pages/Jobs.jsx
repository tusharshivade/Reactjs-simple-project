import React, { useState, useEffect } from 'react';
import { Search, MapPin, Briefcase, Filter, CheckCircle2, AlertCircle, Building2, TrendingUp, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Jobs = () => {
  const { currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock Jobs Data (Replace with real API later)
  const mockJobs = [
    {
      id: 1,
      title: "Frontend Developer (React)",
      company: "TechFlow Solutions",
      location: "Remote",
      category: "Web Development",
      salary: "$60k - $90k",
      type: "Full-time",
      skills: ["React", "Tailwind CSS", "JavaScript", "Redux"],
      description: "Looking for a passionate React developer to build modern user interfaces.",
      logo: Building2
    },
    {
      id: 2,
      title: "Junior Data Scientist",
      company: "DataViz AI",
      location: "San Francisco, CA",
      category: "AI & Data Science",
      salary: "$70k - $100k",
      type: "Internship",
      skills: ["Python", "SQL", "Pandas", "Scikit-learn"],
      description: "Join our team to gain hands-on experience in machine learning and data analysis.",
      logo: TrendingUp
    },
    {
      id: 3,
      title: "DevOps Engineer Intern",
      company: "CloudScale Systems",
      location: "Austin, TX",
      category: "DevOps",
      salary: "$40 - $60 /hr",
      type: "Internship",
      skills: ["Docker", "Kubernetes", "AWS", "CI/CD"],
      description: "Learn how to manage cloud infrastructure at scale with our DevOps mentors.",
      logo: Users
    },
    {
      id: 4,
      title: "Backend Engineer (Node.js)",
      company: "ServerSide Inc.",
      location: "Remote",
      category: "Web Development",
      salary: "$80k - $120k",
      type: "Full-time",
      skills: ["Node.js", "Express", "SQLite", "PostgreSQL"],
      description: "Help us build robust and scalable backend systems using Node.js.",
      logo: Building2
    }
  ];

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setJobs(mockJobs);
      setLoading(false);
    }, 1000);
  }, []);

  const userSkills = currentUser?.skills ? (typeof currentUser.skills === 'string' ? JSON.parse(currentUser.skills) : currentUser.skills) : [];

  const calculateMatch = (jobSkills) => {
    if (!userSkills.length) return 0;
    const matches = jobSkills.filter(skill => 
      userSkills.some(userSkill => userSkill.toLowerCase() === skill.toLowerCase())
    );
    return Math.round((matches.length / jobSkills.length) * 100);
  };

  const filteredJobs = jobs.filter(job => 
    (job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
     job.company.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedCategory === 'All' || job.category === selectedCategory) &&
    (locationFilter === '' || job.location.toLowerCase().includes(locationFilter.toLowerCase()))
  );

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
            <Briefcase className="w-10 h-10 text-emerald-500" />
            Job & Internship Board
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
            Find your next opportunity in tech. Our skill match system helps you identify roles that perfectly fit your profile.
          </p>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="relative col-span-1 md:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search by role or company..."
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Location..."
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none dark:text-white"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            />
          </div>
          <select 
            className="px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none dark:text-white"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Web Development">Web Development</option>
            <option value="AI & Data Science">AI & Data Science</option>
            <option value="DevOps">DevOps</option>
          </select>
        </div>

        {/* Job List */}
        <div className="space-y-6">
          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
              <p className="mt-4 text-slate-500">Fetching latest opportunities...</p>
            </div>
          ) : filteredJobs.length > 0 ? (
            filteredJobs.map(job => {
              const matchPercentage = calculateMatch(job.skills);
              const Icon = job.logo;
              return (
                <div key={job.id} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6 flex flex-col md:flex-row gap-6 hover:shadow-xl transition-all group overflow-hidden relative">
                  {/* Skill Match Indicator */}
                  <div className={`absolute top-0 right-0 px-4 py-1.5 rounded-bl-xl text-xs font-bold flex items-center gap-1.5 ${
                    matchPercentage >= 70 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400' :
                    matchPercentage >= 40 ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400' :
                    'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400'
                  }`}>
                    {matchPercentage >= 70 ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                    {matchPercentage}% Skill Match
                  </div>

                  {/* Company Logo */}
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-900/50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-emerald-500" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">{job.title}</h3>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">{job.salary}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-sm text-slate-500 dark:text-slate-400 mb-4">
                      <span className="flex items-center gap-1"><Building2 className="w-4 h-4" /> {job.company}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.location}</span>
                      <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 rounded-lg text-xs font-bold">{job.type}</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 line-clamp-2">{job.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map(skill => {
                        const isMatch = userSkills.some(us => us.toLowerCase() === skill.toLowerCase());
                        return (
                          <span key={skill} className={`px-2.5 py-1 text-xs font-semibold rounded-lg border ${
                            isMatch 
                              ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                              : 'bg-slate-50 dark:bg-slate-900/40 text-slate-500 dark:text-slate-400 border-slate-100 dark:border-slate-700'
                          }`}>
                            {skill}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Action */}
                  <div className="flex items-center justify-end md:w-32">
                    <button className="w-full md:w-auto px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-colors shadow-lg shadow-emerald-500/20 active:translate-y-0.5">
                      Apply Now
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
              <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">No jobs found</h3>
              <p className="text-slate-500 dark:text-slate-400 mt-2">Try adjusting your filters or search keywords.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
