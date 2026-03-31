import { Heart, ExternalLink } from 'lucide-react';

const Card = ({ resource, isLiked, onLike }) => {
  return (
    <div className="group relative bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-6 border border-gray-100 dark:border-slate-700 overflow-hidden">
      {/* Decorative gradient blur background on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-emerald-50/50 dark:from-indigo-900/20 dark:to-emerald-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl -z-10"></div>
      
      <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
        {resource.title}
      </h3>
      
      <p className="text-gray-600 dark:text-gray-400 mb-5 text-sm leading-relaxed line-clamp-3">
        {resource.description}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {resource.tags.map(tag => (
          <span key={tag} className="bg-indigo-50 dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider shadow-sm">
            {tag}
          </span>
        ))}
      </div>
      
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-slate-700">
        <button
          onClick={onLike}
          className={`flex items-center space-x-1 p-2 rounded-full transform transition-all duration-300 ${
            isLiked 
            ? 'text-red-500 bg-red-50 dark:bg-red-500/10 scale-110' 
            : 'text-gray-400 dark:text-gray-500 hover:text-red-400 hover:bg-gray-50 dark:hover:bg-slate-700 hover:scale-105'
          }`}
          aria-label="Like resource"
        >
          <Heart size={22} fill={isLiked ? 'currentColor' : 'none'} className={`${isLiked ? 'animate-pulse' : ''}`} />
          <span className="font-medium text-sm">{isLiked ? 1 : 0}</span>
        </button>
        
        <a
          href={resource.link}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-900 hover:bg-indigo-600 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 shadow-sm hover:shadow-md transform active:scale-95 text-sm font-medium"
        >
          <span>Visit</span>
          <ExternalLink size={16} />
        </a>
      </div>
    </div>
  );
};

export default Card;