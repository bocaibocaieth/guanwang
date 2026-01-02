import React, { useState, useEffect } from 'react';
import {
  Plus, Edit2, Trash2, Save, X, ArrowLeft,
  Newspaper, Calendar, User, Tag, FileText,
  Check, AlertCircle
} from 'lucide-react';
import { getNewsList, addNews, updateNews, deleteNews, formatDate } from './utils/newsManager';

// Logo Component (simplified version)
const Logo = () => (
  <div className="flex items-center gap-3 select-none">
    <div className="relative w-10 h-6 flex items-center justify-end">
      <div className="absolute right-2 w-6 h-6 bg-gradient-to-l from-white/80 to-transparent blur-[2px]"></div>
      <div className="relative z-10 w-6 h-6 bg-white"></div>
    </div>
    <div className="flex flex-col justify-center">
      <div className="font-serif text-lg font-bold text-white leading-none">Unified</div>
      <div className="h-[1px] w-full bg-white my-[1px]"></div>
      <div className="font-serif text-lg font-bold text-white leading-none">Labs</div>
    </div>
  </div>
);

// Toast Notification Component
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg animate-slide-in ${
      type === 'success' ? 'bg-green-900/90 text-green-200 border border-green-700' :
      type === 'error' ? 'bg-red-900/90 text-red-200 border border-red-700' :
      'bg-gray-900/90 text-gray-200 border border-gray-700'
    }`}>
      {type === 'success' ? <Check size={18} /> : <AlertCircle size={18} />}
      <span className="text-sm font-medium">{message}</span>
      <button onClick={onClose} className="ml-2 hover:opacity-70">
        <X size={14} />
      </button>
    </div>
  );
};

// News Form Component
const NewsForm = ({ news, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: news?.title || '',
    summary: news?.summary || '',
    content: news?.content || '',
    category: news?.category || 'Announcement',
    author: news?.author || 'Unified Labs Team',
  });

  const categories = ['Announcement', 'Partnership', 'Report', 'Technology'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.summary.trim()) {
      return;
    }
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          <span className="flex items-center gap-2">
            <FileText size={14} />
            Title *
          </span>
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white/50 transition-colors"
          placeholder="Enter news title..."
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            <span className="flex items-center gap-2">
              <Tag size={14} />
              Category
            </span>
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/50 transition-colors"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat} className="bg-gray-900">{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            <span className="flex items-center gap-2">
              <User size={14} />
              Author
            </span>
          </label>
          <input
            type="text"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white/50 transition-colors"
            placeholder="Author name..."
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Summary *
        </label>
        <textarea
          value={formData.summary}
          onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
          rows={2}
          className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white/50 transition-colors resize-none"
          placeholder="Brief summary of the news..."
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Content
        </label>
        <textarea
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          rows={10}
          className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white/50 transition-colors resize-y font-mono text-sm"
          placeholder="Full content of the news article... (Markdown supported)"
        />
      </div>

      <div className="flex items-center justify-end gap-4 pt-4 border-t border-white/10">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-2 bg-white text-black font-medium rounded hover:bg-gray-200 transition-colors"
        >
          <Save size={16} />
          {news ? 'Update' : 'Publish'}
        </button>
      </div>
    </form>
  );
};

// News List Item Component
const NewsListItem = ({ news, onEdit, onDelete }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const categoryColors = {
    'Partnership': 'bg-blue-900/30 text-blue-400 border-blue-900/50',
    'Report': 'bg-green-900/30 text-green-400 border-green-900/50',
    'Technology': 'bg-purple-900/30 text-purple-400 border-purple-900/50',
    'Announcement': 'bg-yellow-900/30 text-yellow-400 border-yellow-900/50',
  };

  const colorClass = categoryColors[news.category] || 'bg-gray-900/30 text-gray-400 border-gray-900/50';

  return (
    <div className="group border border-white/10 rounded-lg p-6 hover:border-white/20 transition-all bg-black/30">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <span className={`text-xs font-mono px-2 py-0.5 rounded border ${colorClass}`}>
              {news.category}
            </span>
            <span className="text-xs text-gray-500 font-mono flex items-center gap-1">
              <Calendar size={12} />
              {formatDate(news.createdAt)}
            </span>
          </div>
          <h3 className="text-lg font-serif font-bold text-white mb-2 truncate">
            {news.title}
          </h3>
          <p className="text-sm text-gray-400 line-clamp-2">
            {news.summary}
          </p>
          <div className="mt-2 text-xs text-gray-600">
            By {news.author}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(news)}
            className="p-2 text-gray-500 hover:text-white hover:bg-white/10 rounded transition-all"
            title="Edit"
          >
            <Edit2 size={18} />
          </button>

          {showDeleteConfirm ? (
            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  onDelete(news.id);
                  setShowDeleteConfirm(false);
                }}
                className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded transition-all"
                title="Confirm Delete"
              >
                <Check size={18} />
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="p-2 text-gray-500 hover:text-white hover:bg-white/10 rounded transition-all"
                title="Cancel"
              >
                <X size={18} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-900/20 rounded transition-all"
              title="Delete"
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Main Admin Component
export default function Admin() {
  const [newsList, setNewsList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentNews, setCurrentNews] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = () => {
    setNewsList(getNewsList());
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const handleAdd = () => {
    setCurrentNews(null);
    setIsEditing(true);
  };

  const handleEdit = (news) => {
    setCurrentNews(news);
    setIsEditing(true);
  };

  const handleSave = (formData) => {
    try {
      if (currentNews) {
        updateNews(currentNews.id, formData);
        showToast('News updated successfully!');
      } else {
        addNews(formData);
        showToast('News published successfully!');
      }
      loadNews();
      setIsEditing(false);
      setCurrentNews(null);
    } catch (error) {
      showToast('Failed to save news', 'error');
    }
  };

  const handleDelete = (id) => {
    try {
      deleteNews(id);
      loadNews();
      showToast('News deleted successfully!');
    } catch (error) {
      showToast('Failed to delete news', 'error');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setCurrentNews(null);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <a href="/" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                <ArrowLeft size={20} />
                <span className="text-sm font-mono uppercase tracking-wider">Back to Site</span>
              </a>
              <div className="h-6 w-px bg-white/20"></div>
              <Logo />
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">
                News Management
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {isEditing ? (
          /* Edit/Add Form View */
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-serif font-bold text-white mb-2">
                {currentNews ? 'Edit News' : 'Add New Article'}
              </h1>
              <p className="text-gray-400">
                {currentNews ? 'Update the news article details below.' : 'Fill in the details to publish a new article.'}
              </p>
            </div>

            <div className="bg-gray-900/30 border border-white/10 rounded-lg p-8">
              <NewsForm
                news={currentNews}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            </div>
          </div>
        ) : (
          /* News List View */
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-serif font-bold text-white mb-2">
                  News Articles
                </h1>
                <p className="text-gray-400">
                  Manage your company news and announcements.
                </p>
              </div>

              <button
                onClick={handleAdd}
                className="flex items-center gap-2 px-6 py-3 bg-white text-black font-medium rounded hover:bg-gray-200 transition-colors"
              >
                <Plus size={18} />
                Add Article
              </button>
            </div>

            {newsList.length === 0 ? (
              <div className="text-center py-20 border border-white/10 rounded-lg bg-gray-900/20">
                <Newspaper size={64} className="mx-auto text-gray-700 mb-6" />
                <h3 className="text-xl font-serif font-bold text-white mb-2">
                  No articles yet
                </h3>
                <p className="text-gray-500 mb-6">
                  Start by adding your first news article.
                </p>
                <button
                  onClick={handleAdd}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-medium rounded hover:bg-gray-200 transition-colors"
                >
                  <Plus size={18} />
                  Add Your First Article
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {newsList.map((news) => (
                  <NewsListItem
                    key={news.id}
                    news={news}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}

            {/* Stats Footer */}
            {newsList.length > 0 && (
              <div className="mt-8 pt-8 border-t border-white/10">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Total: {newsList.length} articles</span>
                  <span className="font-mono">
                    Last updated: {formatDate(new Date().toISOString())}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-auto">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between text-xs text-gray-600 font-mono">
            <span>&copy; 2025 Unified Labs. All rights reserved.</span>
            <a href="/" className="hover:text-white transition-colors">
              Return to Main Site
            </a>
          </div>
        </div>
      </footer>

      {/* Custom Styles */}
      <style>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out forwards;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
