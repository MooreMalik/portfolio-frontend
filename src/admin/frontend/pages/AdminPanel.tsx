import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useData } from '../../../../context/DataContext';
import { 
  LayoutDashboard, Folder, Award, Code, Briefcase, FileText, 
  MessageSquare, Settings, ExternalLink, LogOut, Lock, Plus, Trash2, Edit2, Save, Image, Edit, Trash, Menu, X
} from 'lucide-react';

const DashboardView = ({ data }: { data: any }) => (
  <div>
    <h1 className="text-sm font-medium text-zinc-400 mb-6">Xush kelibsiz! Portfolioingiz holati haqida umumiy ma'lumot.</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-[#18181b] p-6 rounded-xl border border-zinc-800/50 flex flex-col gap-2">
         <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-500 mb-2">
            <Folder size={24} />
         </div>
         <span className="text-3xl font-bold text-zinc-100">{data?.projects?.length || 0}</span>
         <div className="flex flex-col">
            <span className="text-sm font-medium text-zinc-300">Total Projects</span>
            <span className="text-xs text-zinc-500">Bazadagi loyihalar</span>
         </div>
      </div>
      <div className="bg-[#18181b] p-6 rounded-xl border border-zinc-800/50 flex flex-col gap-2">
         <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center text-purple-500 mb-2">
            <Briefcase size={24} />
         </div>
         <span className="text-3xl font-bold text-zinc-100">{data?.experience?.length || 0}</span>
         <div className="flex flex-col">
            <span className="text-sm font-medium text-zinc-300">Experience Entries</span>
            <span className="text-xs text-zinc-500">Ish joylari</span>
         </div>
      </div>
      <div className="bg-[#18181b] p-6 rounded-xl border border-zinc-800/50 flex flex-col gap-2">
         <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center text-orange-500 mb-2">
            <Award size={24} />
         </div>
         <span className="text-3xl font-bold text-zinc-100">{data?.certificates?.length || 0}</span>
         <div className="flex flex-col">
            <span className="text-sm font-medium text-zinc-300">Certificates</span>
            <span className="text-xs text-zinc-500">Sertifikatlar</span>
         </div>
      </div>
      <div className="bg-[#18181b] p-6 rounded-xl border border-zinc-800/50 flex flex-col gap-2">
         <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center text-green-500 mb-2">
            <FileText size={24} />
         </div>
         <span className="text-3xl font-bold text-zinc-100">{data?.blogs?.length || 0}</span>
         <div className="flex flex-col">
            <span className="text-sm font-medium text-zinc-300">Blogs</span>
            <span className="text-xs text-zinc-500">Maqolalar</span>
         </div>
      </div>
    </div>
  </div>
);

const SettingsView = ({ data, onSave }: { data: any, onSave: (newData: any) => void }) => {
  const [formData, setFormData] = useState(data?.about || {});
  const [footerData, setFooterData] = useState(data?.footer || { name: 'Ilhomjon', title: 'AI Engineer & Developer' });
  const [adminData, setAdminData] = useState(data?.adminConfig || { pass1: 'mooremal', pass2: 'mooremal' });
  const [contactData, setContactData] = useState(data?.contact || {
    email: "bozorovilxomjon22@gmail.com",
    github: "https://github.com/",
    linkedin: "https://linkedin.com/",
    instagram: "https://instagram.com/",
    telegram: "https://t.me/"
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleFooterChange = (field: string, value: string) => {
    setFooterData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleAdminChange = (field: string, value: string) => {
    setAdminData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleContactChange = (field: string, value: string) => {
    setContactData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    await onSave({ 
      about: formData,
      footer: footerData,
      adminConfig: adminData,
      contact: contactData
    });
    setLoading(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-sm font-medium text-zinc-400">Portfolio ma'lumotlarini (About / Home / Settings) boshqarish</h1>
        <button 
          onClick={handleSave} 
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md text-sm transition-colors"
        >
          {loading ? 'Saqlanmoqda...' : <><Save size={16} /> Saqlash</>}
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="space-y-6">
           <div className="bg-[#18181b] p-6 rounded-xl border border-zinc-800/50 flex flex-col items-center justify-start">
             <div className="w-full flex justify-between items-center mb-4">
                <span className="text-sm font-medium flex items-center gap-2 text-zinc-100"><Image size={16} /> Profil rasmi URL</span>
             </div>
             <div className="w-32 h-32 rounded-full bg-zinc-800 mb-6 border-4 border-zinc-800/50 overflow-hidden">
                 <img src={formData.heroImage || "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&h=200&fit=crop"} className="w-full h-full object-cover" alt="Profile" />
             </div>
             <input 
               type="text" 
               value={formData.heroImage || ''} 
               onChange={(e) => handleChange('heroImage', e.target.value)}
               className="w-full bg-[#111111] border border-zinc-800 rounded px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-indigo-500 mb-4" 
               placeholder="https://..."
             />
             <p className="text-xs text-zinc-500 text-center">Asosiy sahifada ko'rsatiladigan rasmingiz havolasini kiritish</p>
           </div>

           <div className="bg-[#18181b] p-6 rounded-xl border border-zinc-800/50">
             <h2 className="text-base font-bold text-zinc-100 mb-4">Xavfsizlik (Security)</h2>
             <div className="space-y-4">
                <div>
                   <label className="block text-xs text-zinc-400 mb-1">1-Parol</label>
                   <input 
                      type="text" 
                      value={adminData.pass1 || ''} 
                      onChange={(e) => handleAdminChange('pass1', e.target.value)}
                      className="w-full bg-[#111111] border border-zinc-800 rounded px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-indigo-500" 
                    />
                </div>
                <div>
                   <label className="block text-xs text-zinc-400 mb-1">2-Parol</label>
                   <input 
                      type="text" 
                      value={adminData.pass2 || ''} 
                      onChange={(e) => handleAdminChange('pass2', e.target.value)}
                      className="w-full bg-[#111111] border border-zinc-800 rounded px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-indigo-500" 
                    />
                </div>
             </div>
           </div>
         </div>

         <div className="lg:col-span-2 col-span-1 space-y-6">
            <div className="bg-[#18181b] p-6 rounded-xl border border-zinc-800/50">
               <h2 className="text-base font-bold text-zinc-100 mb-4">Asosiy ma'lumotlar</h2>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                     <label className="block text-xs text-zinc-400 mb-1">Ism-sharif</label>
                     <input 
                        type="text" 
                        value={formData.name || ''} 
                        onChange={(e) => handleChange('name', e.target.value)}
                        className="w-full bg-[#111111] border border-zinc-800 rounded px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-indigo-500" 
                      />
                  </div>
                  <div>
                     <label className="block text-xs text-zinc-400 mb-1">Kasbingiz (Role)</label>
                     <input 
                        type="text" 
                        value={formData.role || ''} 
                        onChange={(e) => handleChange('role', e.target.value)}
                        className="w-full bg-[#111111] border border-zinc-800 rounded px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-indigo-500" 
                      />
                  </div>
               </div>
               <div className="mb-4">
                  <label className="block text-xs text-zinc-400 mb-1">Rezüme URL (Resume URL)</label>
                  <input 
                     type="text" 
                     value={formData.resumeUrl || ''} 
                     onChange={(e) => handleChange('resumeUrl', e.target.value)}
                     className="w-full bg-[#111111] border border-zinc-800 rounded px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-indigo-500" 
                     placeholder="https://drive.google.com/... yoki boshqa havola"
                   />
               </div>
               <div className="mb-4">
                  <label className="block text-xs text-zinc-400 mb-1">Bio / Tavsif</label>
                  <textarea 
                    rows={4} 
                    value={formData.bio || ''} 
                    onChange={(e) => handleChange('bio', e.target.value)}
                    className="w-full bg-[#111111] border border-zinc-800 rounded px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-indigo-500"
                  />
               </div>
               <div>
                  <label className="block text-xs text-zinc-400 mb-1">Ko'nikmalar (Skills - vergul bilan ajrating)</label>
                  <input 
                    type="text" 
                    value={formData.skills?.join(', ') || ''} 
                    onChange={(e) => handleChange('skills', e.target.value.split(',').map(s => s.trim()))}
                    className="w-full bg-[#111111] border border-zinc-800 rounded px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-indigo-500" 
                    placeholder="React, Node.js, TypeScript..."
                  />
               </div>
            </div>

            <div className="bg-[#18181b] p-6 rounded-xl border border-zinc-800/50">
               <h2 className="text-base font-bold text-zinc-100 mb-4">Footer (Sayt tag qismi)</h2>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                     <label className="block text-xs text-zinc-400 mb-1">Ism / Nickname</label>
                     <input 
                        type="text" 
                        value={footerData.name || ''} 
                        onChange={(e) => handleFooterChange('name', e.target.value)}
                        className="w-full bg-[#111111] border border-zinc-800 rounded px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-indigo-500" 
                      />
                  </div>
                  <div>
                     <label className="block text-xs text-zinc-400 mb-1">Kasb / Title</label>
                     <input 
                        type="text" 
                        value={footerData.title || ''} 
                        onChange={(e) => handleFooterChange('title', e.target.value)}
                        className="w-full bg-[#111111] border border-zinc-800 rounded px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-indigo-500" 
                      />
                  </div>
               </div>
            </div>

            <div className="bg-[#18181b] p-6 rounded-xl border border-zinc-800/50">
               <h2 className="text-base font-bold text-zinc-100 mb-4">Aloqa (Contact & Ijtimoiy tarmoqlar)</h2>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                     <label className="block text-xs text-zinc-400 mb-1">Email</label>
                     <input 
                        type="email" 
                        value={contactData.email || ''} 
                        onChange={(e) => handleContactChange('email', e.target.value)}
                        className="w-full bg-[#111111] border border-zinc-800 rounded px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-indigo-500" 
                      />
                  </div>
                  <div>
                     <label className="block text-xs text-zinc-400 mb-1">GitHub URL</label>
                     <input 
                        type="text" 
                        value={contactData.github || ''} 
                        onChange={(e) => handleContactChange('github', e.target.value)}
                        className="w-full bg-[#111111] border border-zinc-800 rounded px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-indigo-500" 
                      />
                  </div>
                  <div>
                     <label className="block text-xs text-zinc-400 mb-1">LinkedIn URL</label>
                     <input 
                        type="text" 
                        value={contactData.linkedin || ''} 
                        onChange={(e) => handleContactChange('linkedin', e.target.value)}
                        className="w-full bg-[#111111] border border-zinc-800 rounded px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-indigo-500" 
                      />
                  </div>
                  <div>
                     <label className="block text-xs text-zinc-400 mb-1">Instagram URL</label>
                     <input 
                        type="text" 
                        value={contactData.instagram || ''} 
                        onChange={(e) => handleContactChange('instagram', e.target.value)}
                        className="w-full bg-[#111111] border border-zinc-800 rounded px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-indigo-500" 
                      />
                  </div>
                  <div className="md:col-span-2">
                     <label className="block text-xs text-zinc-400 mb-1">Telegram URL</label>
                     <input 
                        type="text" 
                        value={contactData.telegram || ''} 
                        onChange={(e) => handleContactChange('telegram', e.target.value)}
                        className="w-full bg-[#111111] border border-zinc-800 rounded px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-indigo-500" 
                      />
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

// Generic CRUD View
function GenericCRUDView({ 
  data, collectionKey, title, fields, renderItem, onSave 
}: { 
  data: any, collectionKey: string, title: string, fields: any[], renderItem: (item: any) => React.ReactNode, onSave: (newData: any) => void 
}) {
  const items = data?.[collectionKey] || [];
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState<any>(null);

  const handleAddNew = () => {
    setCurrentItem({ id: Date.now() });
    setIsEditing(true);
  };

  const handleEdit = (item: any) => {
    setCurrentItem({ ...item });
    setIsEditing(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Rostdan ham o'chirmoqchimisiz?")) return;
    const newItems = items.filter((i: any) => i.id !== id);
    await onSave({ [collectionKey]: newItems });
  };

  const handleSaveForm = async () => {
    let newItems = [];
    if (items.find((i: any) => i.id === currentItem.id)) {
      newItems = items.map((i: any) => i.id === currentItem.id ? currentItem : i);
    } else {
      newItems = [...items, currentItem];
    }
    await onSave({ [collectionKey]: newItems });
    setIsEditing(false);
    setCurrentItem(null);
  };

  if (isEditing) {
    return (
      <div className="bg-[#18181b] p-6 rounded-xl border border-zinc-800/50">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-zinc-100">{currentItem?.title || currentItem?.role || "Yangi qo'shish"}</h2>
          <div className="flex gap-2">
            <button onClick={() => setIsEditing(false)} className="px-4 py-2 border border-zinc-700 rounded-md text-sm hover:bg-zinc-800 transition-colors">Yopish</button>
            <button onClick={handleSaveForm} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm transition-colors flex items-center gap-2"><Save size={16}/> Saqlash</button>
          </div>
        </div>
        <div className="space-y-4">
          {fields.map(field => (
            <div key={field.key}>
              <label className="block text-xs font-medium text-zinc-400 mb-1">{field.label}</label>
              {field.type === 'textarea' ? (
                <textarea 
                  rows={4}
                  value={currentItem[field.key] || ''}
                  onChange={(e) => setCurrentItem({...currentItem, [field.key]: e.target.value})}
                  className="w-full bg-[#111111] border border-zinc-800 rounded px-3 py-2 text-sm focus:outline-none focus:border-indigo-500 text-zinc-200"
                />
              ) : field.type === 'array' ? (
                <input 
                  type="text"
                  value={currentItem[field.key]?.join(', ') || ''}
                  onChange={(e) => setCurrentItem({...currentItem, [field.key]: e.target.value.split(',').map((s:string) => s.trim())})}
                  className="w-full bg-[#111111] border border-zinc-800 rounded px-3 py-2 text-sm focus:outline-none focus:border-indigo-500 text-zinc-200"
                  placeholder="Vergul bilan ajrating"
                />
              ) : (
                <input 
                  type="text"
                  value={currentItem[field.key] || ''}
                  onChange={(e) => setCurrentItem({...currentItem, [field.key]: e.target.value})}
                  className="w-full bg-[#111111] border border-zinc-800 rounded px-3 py-2 text-sm focus:outline-none focus:border-indigo-500 text-zinc-200"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-lg font-medium text-zinc-300">{title}</h1>
        <button onClick={handleAddNew} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm transition-colors">
          <Plus size={16} /> Yangi qo'shish
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item: any) => (
          <div key={item.id} className="bg-[#18181b] p-5 rounded-xl border border-zinc-800/50 flex flex-col gap-3 group relative overflow-hidden">
            {renderItem(item)}
            <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
               <button onClick={() => handleEdit(item)} className="p-2 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 rounded-md backdrop-blur-sm"><Edit size={14}/></button>
               <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-500/20 hover:bg-red-500/40 text-red-400 rounded-md backdrop-blur-sm"><Trash size={14}/></button>
            </div>
          </div>
        ))}
      </div>
      {items.length === 0 && <p className="text-zinc-500 text-sm mt-4">Hozircha hech narsa yo'q.</p>}
    </div>
  );
}

// MAIN ADMIN PANEL

export default function AdminPanel() {
  const navigate = useNavigate();
  const { data, refreshData } = useData();
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem('isAdminAuth') === 'true'
  );
  const [password, setPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('');
  const [error, setError] = useState('');
  const [fullData, setFullData] = useState<any>(null);
  
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchFullData = async () => {
    const token = sessionStorage.getItem('adminToken');
    const API_URL = import.meta.env.VITE_API_URL || '';
    if (!token) return;
    try {
      const res = await fetch(`${API_URL}/api/data`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const result = await res.json();
        setFullData(result);
      }
    } catch (err) {
      console.error('Failed to fetch full admin data:', err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchFullData();
    }
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const API_URL = import.meta.env.VITE_API_URL || '';
    try {
      const res = await fetch(`${API_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, secondPassword })
      });
      const result = await res.json();
      if (result.success) {
        sessionStorage.setItem('isAdminAuth', 'true');
        sessionStorage.setItem('adminToken', result.token);
        setIsAuthenticated(true);
        setError('');
      } else {
        setError('Noto\'g\'ri parol.');
      }
    } catch(err) {
      setError('Tizimga kirishda xato.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('isAdminAuth');
    sessionStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    navigate('/');
  };

  const handleSaveData = async (newData: any) => {
    const token = sessionStorage.getItem('adminToken');
    const API_URL = import.meta.env.VITE_API_URL || '';
    try {
      const res = await fetch(`${API_URL}/api/data`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(newData)
      });
      if (res.ok) {
        refreshData();
        fetchFullData();
      }
    } catch(err) {
      console.error(err);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 text-zinc-100 font-sans">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#121212] p-8 rounded-2xl border border-zinc-800/50 w-full max-w-sm shadow-2xl"
        >
          <div className="w-12 h-12 bg-indigo-500/10 rounded-full flex items-center justify-center text-indigo-500 mx-auto mb-6">
            <Lock size={24} />
          </div>
          <h2 className="text-xl font-bold text-center mb-2">Admin Portal</h2>
          <p className="text-sm text-zinc-500 text-center mb-8">Tizimga kirish uchun maxfiy parollarni yozing.</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="1-parol"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-zinc-800 text-zinc-100 rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors"
                autoFocus
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="2-parol"
                value={secondPassword}
                onChange={(e) => setSecondPassword(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-zinc-800 text-zinc-100 rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
            {error && <p className="text-sm text-red-500 text-center">{error}</p>}
            <button 
              type="submit"
              className="w-full bg-white text-black font-medium py-3 rounded-lg hover:bg-zinc-200 transition-colors"
            >
              Kirish
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  const TABS = [
    { label: 'Dashboard', icon: LayoutDashboard },
    { label: 'About & Home', icon: Settings },
    { label: 'Projects', icon: Folder },
    { label: 'Experience', icon: Briefcase },
    { label: 'Certificates', icon: Award },
    { label: 'Blog', icon: FileText },
  ];

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-zinc-100 font-sans overflow-hidden relative">
      {/* Backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-[240px] bg-[#111111] border-r border-zinc-800/50 flex flex-col shrink-0 transition-transform duration-300 lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6 flex items-center justify-between gap-3">
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-indigo-600 text-white flex items-center justify-center font-bold text-lg">
                A
              </div>
              <div>
                 <h1 className="font-bold text-sm leading-tight text-zinc-100">Admin Panel</h1>
                 <p className="text-xs text-zinc-500">Portfolio CMS</p>
              </div>
           </div>
           <button 
             onClick={() => setSidebarOpen(false)}
             className="p-1 text-zinc-400 hover:text-zinc-100 lg:hidden"
           >
             <X size={18} />
           </button>
        </div>

        <div className="px-4 py-2">
           <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2 px-2">Boshqaruv</p>
           <nav className="flex flex-col gap-1">
             {TABS.map((tab) => {
               const Icon = tab.icon;
               const isActive = activeTab === tab.label;
               return (
                 <button
                   key={tab.label}
                   onClick={() => {
                     setActiveTab(tab.label);
                     setSidebarOpen(false);
                   }}
                   className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                     isActive 
                       ? 'bg-zinc-800 text-zinc-100 pl-4 border border-zinc-700/50' 
                       : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50'
                   }`}
                 >
                   <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                   {tab.label}
                 </button>
               );
             })}
           </nav>
        </div>

        <div className="mt-auto p-4 flex flex-col gap-1">
           <button 
             onClick={() => {
               window.scrollTo(0,0);
               navigate('/');
             }}
             className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 rounded-lg transition-colors"
           >
             <ExternalLink size={18} /> Saytni ko'rish
           </button>
           <button 
             onClick={handleLogout}
             className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
           >
             <LogOut size={18} /> Chiqish
           </button>
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#0e0e0e] w-full">
        {/* Top Header */}
        <header className="h-16 border-b border-zinc-800/50 flex items-center justify-between lg:justify-end px-6 shrink-0 bg-[#111111]/50 backdrop-blur-md">
           <button 
             onClick={() => setSidebarOpen(true)}
             className="p-2 -ml-2 text-zinc-400 hover:text-zinc-100 lg:hidden"
           >
             <Menu size={20} />
           </button>

           <div className="flex items-center gap-3 border border-zinc-800/50 rounded-full pl-3 pr-1 py-1 text-sm bg-[#18181b]">
             <div className="text-right">
                <div className="font-semibold text-zinc-200 text-xs">{(fullData || data)?.about?.name || "Admin"}</div>
                <div className="text-[10px] text-zinc-500">Super Admin</div>
             </div>
             <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden">
               {(fullData || data)?.about?.heroImage ? (
                 <img src={(fullData || data).about.heroImage} className="w-full h-full object-cover" />
               ) : (
                 <UserAvatar />
               )}
             </div>
           </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
           <div className="max-w-4xl w-full mx-auto">
              {activeTab === 'Dashboard' && <DashboardView data={fullData || data} />}
              {activeTab === 'About & Home' && <SettingsView data={fullData || data} onSave={handleSaveData} />}
              {activeTab === 'Projects' && (
                <GenericCRUDView 
                  data={fullData || data} collectionKey="projects" title="Loyihalar (Projects)" onSave={handleSaveData}
                  fields={[
                    { label: 'Manzil / URL', key: 'link', type: 'text' },
                    { label: 'Sarlavha (Title)', key: 'title', type: 'text' },
                    { label: 'Tavsif (Description)', key: 'description', type: 'textarea' },
                    { label: 'Texnologiyalar (Tech)', key: 'tech', type: 'array' },
                    { label: 'GitHub Link', key: 'github', type: 'text' }
                  ]}
                  renderItem={(item) => (
                    <>
                      <h3 className="font-bold text-zinc-100">{item.title}</h3>
                      <p className="text-sm text-zinc-400 line-clamp-2">{item.description}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {item.tech?.map((t:any) => <span key={t} className="text-[10px] px-2 py-0.5 bg-zinc-800 text-zinc-300 rounded">{t}</span>)}
                      </div>
                    </>
                  )}
                />
              )}
              {activeTab === 'Experience' && (
                <GenericCRUDView 
                  data={fullData || data} collectionKey="experience" title="Ish Tajribasi (Experience)" onSave={handleSaveData}
                  fields={[
                    { label: 'Kompaniya / Joy', key: 'company', type: 'text' },
                    { label: 'Lavozim (Role)', key: 'role', type: 'text' },
                    { label: 'Muddat (Period)', key: 'period', type: 'text' },
                    { label: 'Tavsif (Description)', key: 'description', type: 'textarea' }
                  ]}
                  renderItem={(item) => (
                    <>
                      <h3 className="font-bold text-zinc-100">{item.company}</h3>
                      <p className="text-sm text-indigo-400">{item.role}</p>
                      <p className="text-xs text-zinc-500 mt-1">{item.period}</p>
                      <p className="text-sm text-zinc-400 line-clamp-2 mt-2">{item.description}</p>
                    </>
                  )}
                />
              )}
              {activeTab === 'Certificates' && (
                <GenericCRUDView 
                  data={fullData || data} collectionKey="certificates" title="Sertifikatlar (Certificates)" onSave={handleSaveData}
                  fields={[
                    { label: 'Sertifikat nomi', key: 'title', type: 'text' },
                    { label: 'Bergan tashkilot (Issuer)', key: 'issuer', type: 'text' },
                    { label: 'Sana (Date)', key: 'date', type: 'text' },
                    { label: 'Rasm havolasi (Image URL)', key: 'image', type: 'text' }
                  ]}
                  renderItem={(item) => (
                    <>
                      {item.image && <img src={item.image} alt={item.title} className="w-full h-32 object-cover rounded-lg mb-2 opacity-80" />}
                      <h3 className="font-bold text-zinc-100">{item.title}</h3>
                      <p className="text-sm text-indigo-400">{item.issuer}</p>
                      <p className="text-xs text-zinc-500 mt-1">{item.date}</p>
                    </>
                  )}
                />
              )}
              {activeTab === 'Blog' && (
                <GenericCRUDView 
                  data={fullData || data} collectionKey="blogs" title="Maqolalar (Blog)" onSave={handleSaveData}
                  fields={[
                    { label: 'Sarlavha', key: 'title', type: 'text' },
                    { label: 'Qisqacha mazmun (Excerpt)', key: 'excerpt', type: 'textarea' },
                    { label: 'Sana (Date)', key: 'date', type: 'text' },
                    { label: 'O\'qish vaqti (Masalan: 5 min read)', key: 'readTime', type: 'text' }
                  ]}
                  renderItem={(item) => (
                    <>
                      <h3 className="font-bold text-zinc-100">{item.title}</h3>
                      <p className="text-sm text-zinc-400 line-clamp-2">{item.excerpt}</p>
                      <div className="flex justify-between items-center mt-2">
                         <span className="text-xs text-zinc-500">{item.date}</span>
                         <span className="text-xs text-indigo-400">{item.readTime}</span>
                      </div>
                    </>
                  )}
                />
              )}
           </div>
        </div>
      </main>
    </div>
  );
}

const UserAvatar = () => (
   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
   </svg>
);

