import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useData } from '../../../context/DataContext';
import {
  LayoutDashboard, Folder, Award, Briefcase, FileText,
  Settings, ExternalLink, LogOut, Lock, Plus, Save, Image,
  Edit, Trash, Menu, X, Upload, Eye, EyeOff, Send,
  CheckCircle, AlertCircle, RefreshCw, Link as LinkIcon
} from 'lucide-react';

const API_URL = () => import.meta.env.VITE_API_URL || '';
const token = () => sessionStorage.getItem('adminToken') || '';

// ─── MEDIA UPLOAD COMPONENT ────────────────────────────────────────────────────
const MediaUpload = ({
  value, onChange, accept = 'image/*', label = 'Fayl', small = false
}: {
  value: string; onChange: (url: string) => void;
  accept?: string; label?: string; small?: boolean;
}) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const isPdf = accept.includes('pdf');

  const handleUpload = async (file: File) => {
    setUploading(true); setError('');
    const fd = new FormData();
    fd.append('file', file);
    try {
      const res = await fetch(`${API_URL()}/api/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token()}` },
        body: fd,
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Yuklash xato');
      onChange(result.url);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wide">{label}</label>

      {value && !isPdf && (
        <div className={`relative rounded-lg overflow-hidden border border-zinc-800 bg-zinc-900 ${small ? 'h-24' : 'h-40'}`}>
          <img src={value} alt="preview" className="w-full h-full object-cover" />
          <button onClick={() => onChange('')}
            className="absolute top-1.5 right-1.5 bg-black/70 text-white rounded-full p-1 hover:bg-red-500/80 transition-colors">
            <X size={11} />
          </button>
        </div>
      )}

      {value && isPdf && (
        <div className="flex items-center gap-2 p-3 bg-zinc-900 rounded-lg border border-zinc-800">
          <FileText size={18} className="text-red-400 shrink-0" />
          <a href={value} target="_blank" rel="noreferrer"
            className="text-sm text-indigo-400 hover:underline flex-1 truncate">
            PDF faylni ko'rish ↗
          </a>
          <button onClick={() => onChange('')} className="text-zinc-500 hover:text-red-400 transition-colors">
            <X size={16} />
          </button>
        </div>
      )}

      <div
        onClick={() => !uploading && fileRef.current?.click()}
        onDragOver={e => e.preventDefault()}
        onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleUpload(f); }}
        className={`flex flex-col items-center justify-center gap-1.5 border-2 border-dashed rounded-lg cursor-pointer transition-colors
          ${small ? 'p-3' : 'p-5'}
          ${uploading ? 'border-indigo-500/50 bg-indigo-500/5' : 'border-zinc-700 hover:border-indigo-500 hover:bg-indigo-500/5'}`}
      >
        {uploading
          ? <><RefreshCw size={16} className="text-indigo-400 animate-spin" /><span className="text-xs text-zinc-400">Yuklanmoqda...</span></>
          : <><Upload size={16} className="text-zinc-500" /><span className="text-xs text-zinc-400">Bosing yoki faylni tashlang</span></>
        }
      </div>

      <input ref={fileRef} type="file" accept={accept} className="hidden"
        onChange={e => { const f = e.target.files?.[0]; if (f) handleUpload(f); e.target.value = ''; }} />

      {error && (
        <div className="flex items-start gap-2 p-2 bg-red-500/10 rounded text-xs text-red-400">
          <AlertCircle size={12} className="mt-0.5 shrink-0" /> {error}
        </div>
      )}
    </div>
  );
};

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
const DashboardView = ({ data }: { data: any }) => (
  <div>
    <h1 className="text-sm font-medium text-zinc-400 mb-6">Xush kelibsiz! Portfolioingiz holati haqida umumiy ma'lumot.</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {[
        { label: 'Total Projects', sub: 'Loyihalar', count: data?.projects?.length || 0, color: 'blue', Icon: Folder },
        { label: 'Experience', sub: 'Ish joylari', count: data?.experience?.length || 0, color: 'purple', Icon: Briefcase },
        { label: 'Certificates', sub: 'Sertifikatlar', count: data?.certificates?.length || 0, color: 'orange', Icon: Award },
        { label: 'Telegram Posts', sub: "Kanal postlari", count: data?.telegramPosts?.filter((p: any) => !p.hidden).length || 0, color: 'green', Icon: FileText },
      ].map(({ label, sub, count, color, Icon }) => (
        <div key={label} className="bg-[#18181b] p-6 rounded-xl border border-zinc-800/50 flex flex-col gap-2">
          <div className={`w-12 h-12 bg-${color}-500/10 rounded-lg flex items-center justify-center text-${color}-500 mb-2`}>
            <Icon size={24} />
          </div>
          <span className="text-3xl font-bold text-zinc-100">{count}</span>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-zinc-300">{label}</span>
            <span className="text-xs text-zinc-500">{sub}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ─── SETTINGS VIEW ────────────────────────────────────────────────────────────
const SettingsView = ({ data, onSave }: { data: any; onSave: (d: any) => Promise<void> }) => {
  const [formData, setFormData] = useState(data?.about || {});
  const [footerData, setFooterData] = useState(data?.footer || { name: 'Ilhomjon', title: 'AI Engineer & Developer' });
  const [adminData, setAdminData] = useState(data?.adminConfig || { pass1: 'mooremal', pass2: 'mooremal' });
  const [contactData, setContactData] = useState(data?.contact || {});
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  // KEY FIX: re-sync form when data prop updates (after save + fetchFullData)
  useEffect(() => {
    if (!data) return;
    setFormData(data.about || {});
    setFooterData(data.footer || { name: 'Ilhomjon', title: 'AI Engineer & Developer' });
    setAdminData(data.adminConfig || { pass1: 'mooremal', pass2: 'mooremal' });
    setContactData(data.contact || {});
  }, [data]);

  const handleSave = async () => {
    setLoading(true);
    await onSave({ about: formData, footer: footerData, adminConfig: adminData, contact: contactData });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    setLoading(false);
  };

  const inp = 'w-full bg-[#111111] border border-zinc-800 rounded px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-indigo-500';

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-sm font-medium text-zinc-400">Portfolio ma'lumotlarini boshqarish</h1>
        <button onClick={handleSave} disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md text-sm transition-colors disabled:opacity-50">
          {saved ? <><CheckCircle size={16} /> Saqlandi!</> : loading ? 'Saqlanmoqda...' : <><Save size={16} /> Saqlash</>}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="space-y-6">
          {/* Hero image */}
          <div className="bg-[#18181b] p-6 rounded-xl border border-zinc-800/50">
            <div className="flex items-center gap-2 mb-4">
              <Image size={16} className="text-zinc-400" />
              <span className="text-sm font-medium text-zinc-100">Profil rasmi</span>
            </div>
            <div className="w-28 h-28 rounded-full overflow-hidden mx-auto mb-4 border-4 border-zinc-800">
              <img
                src={formData.heroImage || 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&h=200&fit=crop'}
                className="w-full h-full object-cover" alt="profile" />
            </div>
            <MediaUpload
              value={formData.heroImage || ''} label="Rasm yuklash"
              onChange={url => setFormData((p: any) => ({ ...p, heroImage: url }))} />
          </div>

          {/* Security */}
          <div className="bg-[#18181b] p-6 rounded-xl border border-zinc-800/50">
            <h2 className="text-base font-bold text-zinc-100 mb-4">Xavfsizlik</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-zinc-400 mb-1">1-Parol</label>
                <input type="text" value={adminData.pass1 || ''} className={inp}
                  onChange={e => setAdminData((p: any) => ({ ...p, pass1: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs text-zinc-400 mb-1">2-Parol</label>
                <input type="text" value={adminData.pass2 || ''} className={inp}
                  onChange={e => setAdminData((p: any) => ({ ...p, pass2: e.target.value }))} />
              </div>
            </div>
          </div>
        </div>

        {/* Right columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* About */}
          <div className="bg-[#18181b] p-6 rounded-xl border border-zinc-800/50">
            <h2 className="text-base font-bold text-zinc-100 mb-4">Asosiy ma'lumotlar</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Ism-sharif</label>
                <input type="text" value={formData.name || ''} className={inp}
                  onChange={e => setFormData((p: any) => ({ ...p, name: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Kasb (Role)</label>
                <input type="text" value={formData.role || ''} className={inp}
                  onChange={e => setFormData((p: any) => ({ ...p, role: e.target.value }))} />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-xs text-zinc-400 mb-1">Resume URL</label>
              <input type="text" value={formData.resumeUrl || ''} className={inp} placeholder="https://drive.google.com/..."
                onChange={e => setFormData((p: any) => ({ ...p, resumeUrl: e.target.value }))} />
            </div>
            <div className="mb-4">
              <label className="block text-xs text-zinc-400 mb-1">Bio / Tavsif</label>
              <textarea rows={4} value={formData.bio || ''} className={inp}
                onChange={e => setFormData((p: any) => ({ ...p, bio: e.target.value }))} />
            </div>
            <div>
              <label className="block text-xs text-zinc-400 mb-1">Ko'nikmalar (vergul bilan)</label>
              <input type="text" value={formData.skills?.join(', ') || ''} className={inp}
                placeholder="React, Node.js, TypeScript..."
                onChange={e => setFormData((p: any) => ({ ...p, skills: e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean) }))} />
            </div>
          </div>

          {/* Footer */}
          <div className="bg-[#18181b] p-6 rounded-xl border border-zinc-800/50">
            <h2 className="text-base font-bold text-zinc-100 mb-4">Footer</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Ism / Nickname</label>
                <input type="text" value={footerData.name || ''} className={inp}
                  onChange={e => setFooterData((p: any) => ({ ...p, name: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Kasb / Title</label>
                <input type="text" value={footerData.title || ''} className={inp}
                  onChange={e => setFooterData((p: any) => ({ ...p, title: e.target.value }))} />
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-[#18181b] p-6 rounded-xl border border-zinc-800/50">
            <h2 className="text-base font-bold text-zinc-100 mb-4">Aloqa (Contact)</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'Email', key: 'email', type: 'email' },
                { label: 'GitHub URL', key: 'github', type: 'text' },
                { label: 'LinkedIn URL', key: 'linkedin', type: 'text' },
                { label: 'Instagram URL', key: 'instagram', type: 'text' },
                { label: 'Telegram URL', key: 'telegram', type: 'text' },
              ].map(({ label, key, type }) => (
                <div key={key} className={key === 'telegram' ? 'sm:col-span-2' : ''}>
                  <label className="block text-xs text-zinc-400 mb-1">{label}</label>
                  <input type={type} value={(contactData as any)[key] || ''} className={inp}
                    onChange={e => setContactData((p: any) => ({ ...p, [key]: e.target.value }))} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── GENERIC CRUD VIEW ────────────────────────────────────────────────────────
function GenericCRUDView({
  data, collectionKey, title, fields, renderItem, onSave,
}: {
  data: any; collectionKey: string; title: string;
  fields: { label: string; key: string; type: string; placeholder?: string }[];
  renderItem: (item: any) => React.ReactNode;
  onSave: (d: any) => Promise<void>;
}) {
  const items: any[] = data?.[collectionKey] || [];
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  const handleAddNew = () => { setCurrentItem({ id: Date.now() }); setIsEditing(true); };
  const handleEdit = (item: any) => { setCurrentItem({ ...item }); setIsEditing(true); };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Rostdan ham o'chirmoqchimisiz?")) return;
    await onSave({ [collectionKey]: items.filter((i: any) => i.id !== id) });
  };

  const handleSaveForm = async () => {
    setSaving(true);
    const exists = items.find((i: any) => i.id === currentItem.id);
    const newItems = exists
      ? items.map((i: any) => i.id === currentItem.id ? currentItem : i)
      : [...items, currentItem];
    await onSave({ [collectionKey]: newItems });
    setSaving(false);
    setIsEditing(false);
    setCurrentItem(null);
  };

  const inp = 'w-full bg-[#111111] border border-zinc-800 rounded px-3 py-2 text-sm focus:outline-none focus:border-indigo-500 text-zinc-200';

  if (isEditing) {
    return (
      <div className="bg-[#18181b] p-6 rounded-xl border border-zinc-800/50">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-zinc-100">
            {currentItem?.title || currentItem?.role || currentItem?.company || "Yangi qo'shish"}
          </h2>
          <div className="flex gap-2">
            <button onClick={() => setIsEditing(false)} className="px-4 py-2 border border-zinc-700 rounded-md text-sm hover:bg-zinc-800 transition-colors">
              Yopish
            </button>
            <button onClick={handleSaveForm} disabled={saving}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm transition-colors flex items-center gap-2 disabled:opacity-50">
              {saving ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />}
              Saqlash
            </button>
          </div>
        </div>

        <div className="space-y-5">
          {fields.map(field => (
            <div key={field.key}>
              {field.type === 'image' ? (
                <MediaUpload label={field.label} value={currentItem[field.key] || ''}
                  onChange={url => setCurrentItem((p: any) => ({ ...p, [field.key]: url }))} />
              ) : field.type === 'pdf' ? (
                <MediaUpload label={field.label} value={currentItem[field.key] || ''}
                  accept=".pdf,application/pdf"
                  onChange={url => setCurrentItem((p: any) => ({ ...p, [field.key]: url }))} />
              ) : field.type === 'textarea' ? (
                <>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">{field.label}</label>
                  <textarea rows={4} value={currentItem[field.key] || ''} className={inp} placeholder={field.placeholder}
                    onChange={e => setCurrentItem((p: any) => ({ ...p, [field.key]: e.target.value }))} />
                </>
              ) : field.type === 'array' ? (
                <>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">{field.label}</label>
                  <input type="text" value={currentItem[field.key]?.join(', ') || ''} className={inp}
                    placeholder={field.placeholder || "Vergul bilan ajrating"}
                    onChange={e => setCurrentItem((p: any) => ({
                      ...p, [field.key]: e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean)
                    }))} />
                </>
              ) : (
                <>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">{field.label}</label>
                  <input type="text" value={currentItem[field.key] || ''} className={inp} placeholder={field.placeholder}
                    onChange={e => setCurrentItem((p: any) => ({ ...p, [field.key]: e.target.value }))} />
                </>
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
        <button onClick={handleAddNew}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm transition-colors">
          <Plus size={16} /> Yangi qo'shish
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item: any) => (
          <div key={item.id} className="bg-[#18181b] p-5 rounded-xl border border-zinc-800/50 flex flex-col gap-3 group relative overflow-hidden">
            {renderItem(item)}
            <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => handleEdit(item)} className="p-2 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 rounded-md"><Edit size={14} /></button>
              <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-500/20 hover:bg-red-500/40 text-red-400 rounded-md"><Trash size={14} /></button>
            </div>
          </div>
        ))}
      </div>
      {items.length === 0 && <p className="text-zinc-500 text-sm mt-4">Hozircha hech narsa yo'q.</p>}
    </div>
  );
}

// ─── TELEGRAM BLOG VIEW ───────────────────────────────────────────────────────
const TelegramBlogView = ({ data, onSave }: { data: any; onSave: (d: any) => Promise<void> }) => {
  const telegramPosts: any[] = data?.telegramPosts || [];
  const [channel, setChannel] = useState(data?.adminConfig?.telegramChannel || '');
  const [webhookInfo, setWebhookInfo] = useState<any>(null);
  const [setupLoading, setSetupLoading] = useState(false);
  const [setupMsg, setSetupMsg] = useState('');
  const [editingPost, setEditingPost] = useState<any>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editText, setEditText] = useState('');

  const inp = 'w-full bg-[#111111] border border-zinc-800 rounded px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-indigo-500';

  useEffect(() => {
    setChannel(data?.adminConfig?.telegramChannel || '');
    fetchWebhookInfo();
  }, [data]);

  const fetchWebhookInfo = async () => {
    try {
      const res = await fetch(`${API_URL()}/api/telegram/webhook-info`, {
        headers: { Authorization: `Bearer ${token()}` }
      });
      const d = await res.json();
      setWebhookInfo(d);
    } catch {}
  };

  const saveChannel = async () => {
    await onSave({ adminConfig: { ...data?.adminConfig, telegramChannel: channel } });
    setSetupMsg('Kanal manzili saqlandi!');
    setTimeout(() => setSetupMsg(''), 3000);
  };

  const setupWebhook = async () => {
    setSetupLoading(true); setSetupMsg('');
    try {
      const res = await fetch(`${API_URL()}/api/telegram/setup-webhook`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token()}`, 'Content-Type': 'application/json' },
      });
      const d = await res.json();
      if (d.ok) {
        setSetupMsg('✅ Webhook muvaffaqiyatli ulandi! Kanal postlari avtomatik ko\'rinadi.');
        await fetchWebhookInfo();
      } else {
        setSetupMsg(`❌ ${d.description || d.error || 'Xato yuz berdi'}`);
      }
    } catch (e: any) {
      setSetupMsg(`❌ ${e.message}`);
    }
    setSetupLoading(false);
  };

  const toggleHide = async (post: any) => {
    await fetch(`${API_URL()}/api/telegram/post/${post.id}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token()}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ hidden: !post.hidden })
    });
    await onSave({});
  };

  const openEdit = (post: any) => {
    setEditingPost(post);
    setEditTitle(post.editedTitle || post.text?.split('\n')[0] || '');
    setEditText(post.editedText || post.text || '');
  };

  const saveEdit = async () => {
    if (!editingPost) return;
    await fetch(`${API_URL()}/api/telegram/post/${editingPost.id}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token()}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ editedTitle: editTitle, editedText: editText })
    });
    setEditingPost(null);
    await onSave({});
  };

  const webhookActive = webhookInfo?.result?.url?.includes('telegram/webhook');

  return (
    <div className="space-y-8">
      {/* Telegram Setup */}
      <div className="bg-[#18181b] p-6 rounded-xl border border-zinc-800/50">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
            <Send size={18} />
          </div>
          <div>
            <h2 className="text-base font-bold text-zinc-100">Telegram Kanal Integratsiyasi</h2>
            <p className="text-xs text-zinc-500">Kanal postlari avtomatik blog sifatida ko'rinadi</p>
          </div>
          <div className={`ml-auto text-xs px-2 py-1 rounded-full ${webhookActive ? 'bg-green-500/10 text-green-400' : 'bg-zinc-800 text-zinc-500'}`}>
            {webhookActive ? '● Faol' : '● Ulangmagan'}
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-xs text-zinc-400 mb-1">Telegram kanal username (masalan: @mychannel)</label>
            <div className="flex gap-2">
              <input type="text" value={channel} className={inp} placeholder="@mychannel"
                onChange={e => setChannel(e.target.value)} />
              <button onClick={saveChannel} className="px-3 py-2 bg-zinc-700 hover:bg-zinc-600 text-zinc-200 rounded-md text-sm whitespace-nowrap transition-colors">
                Saqlash
              </button>
            </div>
          </div>

          <div className="p-4 bg-zinc-900 rounded-lg border border-zinc-800 text-xs text-zinc-400 space-y-1.5">
            <p className="font-medium text-zinc-300">Sozlash tartibi:</p>
            <p>1. <a href="https://t.me/BotFather" target="_blank" className="text-indigo-400 hover:underline">@BotFather</a>-da yangi bot yarating → token oling</p>
            <p>2. Botni kanalingizga Admin qilib qo'shing</p>
            <p>3. Render-da <code className="text-indigo-400">TELEGRAM_BOT_TOKEN</code> va <code className="text-indigo-400">BACKEND_URL</code> env vars qo'shing</p>
            <p>4. Yuqoridagi kanal manzilini saqlang → "Webhookni ulash" ni bosing</p>
          </div>

          <button
            onClick={setupWebhook} disabled={setupLoading}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors disabled:opacity-50">
            {setupLoading ? <><RefreshCw size={14} className="animate-spin" /> Ulanmoqda...</> : <><LinkIcon size={14} /> Webhookni ulash</>}
          </button>

          {setupMsg && (
            <p className={`text-sm text-center p-2 rounded ${setupMsg.startsWith('✅') ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
              {setupMsg}
            </p>
          )}
        </div>
      </div>

      {/* Telegram Posts List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-zinc-100">
            Telegram Postlar ({telegramPosts.length})
          </h2>
        </div>

        {telegramPosts.length === 0 ? (
          <div className="bg-[#18181b] p-10 rounded-xl border border-zinc-800/50 text-center">
            <Send size={32} className="text-zinc-700 mx-auto mb-3" />
            <p className="text-zinc-500 text-sm">Hozircha Telegram postlari yo'q.</p>
            <p className="text-zinc-600 text-xs mt-1">Webhook ulangandan so'ng, kanalingizga post joylashtirsangiz – bu yerda avtomatik ko'rinadi.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {telegramPosts.map(post => (
              <div key={post.id}
                className={`bg-[#18181b] p-4 rounded-xl border transition-colors ${post.hidden ? 'border-zinc-800/30 opacity-50' : 'border-zinc-800/50'}`}>
                <div className="flex items-start gap-3">
                  {post.mediaUrl && (
                    <img src={post.mediaUrl} alt="" className="w-16 h-16 rounded-lg object-cover shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    {post.editedTitle && (
                      <p className="text-xs text-indigo-400 font-medium mb-0.5">{post.editedTitle}</p>
                    )}
                    <p className="text-sm text-zinc-300 line-clamp-2">
                      {post.editedText || post.text || '(Media post)'}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-[10px] text-zinc-600 font-mono">
                        {new Date(post.date).toLocaleDateString('uz-UZ')}
                      </span>
                      {post.channelUrl && (
                        <a href={post.channelUrl} target="_blank" rel="noreferrer"
                          className="text-[10px] text-indigo-400 hover:underline">
                          Telegramda ko'rish ↗
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-1.5 shrink-0">
                    <button onClick={() => openEdit(post)}
                      className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-md transition-colors" title="Tahrirlash">
                      <Edit size={14} />
                    </button>
                    <button onClick={() => toggleHide(post)}
                      className={`p-2 rounded-md transition-colors ${post.hidden ? 'bg-zinc-700 text-zinc-300' : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-400'}`}
                      title={post.hidden ? "Ko'rsatish" : "Yashirish"}>
                      {post.hidden ? <Eye size={14} /> : <EyeOff size={14} />}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingPost && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={e => e.target === e.currentTarget && setEditingPost(null)}>
          <div className="bg-[#18181b] rounded-xl border border-zinc-800 p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-zinc-100">Postni tahrirlash</h3>
              <button onClick={() => setEditingPost(null)} className="text-zinc-500 hover:text-zinc-200"><X size={18} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Sarlavha (ixtiyoriy)</label>
                <input type="text" value={editTitle} className={inp} placeholder="Blog sarlavhasi..."
                  onChange={e => setEditTitle(e.target.value)} />
              </div>
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Matn</label>
                <textarea rows={5} value={editText} className={inp}
                  onChange={e => setEditText(e.target.value)} />
              </div>
              <div className="flex gap-2 justify-end">
                <button onClick={() => setEditingPost(null)} className="px-4 py-2 border border-zinc-700 rounded-md text-sm hover:bg-zinc-800">
                  Bekor
                </button>
                <button onClick={saveEdit} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm">
                  Saqlash
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── MAIN ADMIN PANEL ─────────────────────────────────────────────────────────
export default function AdminPanel() {
  const navigate = useNavigate();
  const { data, refreshData } = useData();
  const [isAuthenticated, setIsAuthenticated] = useState(sessionStorage.getItem('isAdminAuth') === 'true');
  const [password, setPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('');
  const [error, setError] = useState('');
  const [fullData, setFullData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchFullData = async () => {
    const t = sessionStorage.getItem('adminToken');
    if (!t) return;
    try {
      const res = await fetch(`${API_URL()}/api/data`, {
        headers: { Authorization: `Bearer ${t}` }
      });
      if (res.ok) setFullData(await res.json());
    } catch (e) {
      console.error('fetchFullData error:', e);
    }
  };

  useEffect(() => { if (isAuthenticated) fetchFullData(); }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL()}/api/admin/login`, {
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
        setError("Noto'g'ri parol.");
      }
    } catch {
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
    const t = sessionStorage.getItem('adminToken');
    try {
      const res = await fetch(`${API_URL()}/api/data`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${t}` },
        body: JSON.stringify(newData)
      });
      if (res.ok) { refreshData(); await fetchFullData(); }
    } catch (e) {
      console.error('Save error:', e);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 text-zinc-100 font-sans">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="bg-[#121212] p-8 rounded-2xl border border-zinc-800/50 w-full max-w-sm shadow-2xl">
          <div className="w-12 h-12 bg-indigo-500/10 rounded-full flex items-center justify-center text-indigo-500 mx-auto mb-6">
            <Lock size={24} />
          </div>
          <h2 className="text-xl font-bold text-center mb-2">Admin Portal</h2>
          <p className="text-sm text-zinc-500 text-center mb-8">Tizimga kirish uchun maxfiy parollarni yozing.</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="password" placeholder="1-parol" value={password} autoFocus
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-zinc-800 text-zinc-100 rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors" />
            <input type="password" placeholder="2-parol" value={secondPassword}
              onChange={e => setSecondPassword(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-zinc-800 text-zinc-100 rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors" />
            {error && <p className="text-sm text-red-500 text-center">{error}</p>}
            <button type="submit" className="w-full bg-white text-black font-medium py-3 rounded-lg hover:bg-zinc-200 transition-colors">
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
    { label: 'Blog & Telegram', icon: FileText },
  ];

  const mergedData = fullData || data;

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-zinc-100 font-sans overflow-hidden relative">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-[240px] bg-[#111111] border-r border-zinc-800/50 flex flex-col shrink-0 transition-transform duration-300 lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-indigo-600 text-white flex items-center justify-center font-bold text-lg">A</div>
            <div>
              <h1 className="font-bold text-sm leading-tight text-zinc-100">Admin Panel</h1>
              <p className="text-xs text-zinc-500">Portfolio CMS</p>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="p-1 text-zinc-400 hover:text-zinc-100 lg:hidden"><X size={18} /></button>
        </div>

        <div className="px-4 py-2">
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2 px-2">Boshqaruv</p>
          <nav className="flex flex-col gap-1">
            {TABS.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.label;
              return (
                <button key={tab.label} onClick={() => { setActiveTab(tab.label); setSidebarOpen(false); }}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive ? 'bg-zinc-800 text-zinc-100 border border-zinc-700/50' : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50'}`}>
                  <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-4 flex flex-col gap-1">
          <button onClick={() => { window.scrollTo(0, 0); navigate('/'); }}
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 rounded-lg transition-colors">
            <ExternalLink size={18} /> Saytni ko'rish
          </button>
          <button onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
            <LogOut size={18} /> Chiqish
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#0e0e0e] w-full">
        <header className="h-16 border-b border-zinc-800/50 flex items-center justify-between lg:justify-end px-6 shrink-0 bg-[#111111]/50 backdrop-blur-md">
          <button onClick={() => setSidebarOpen(true)} className="p-2 -ml-2 text-zinc-400 hover:text-zinc-100 lg:hidden">
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-3 border border-zinc-800/50 rounded-full pl-3 pr-1 py-1 text-sm bg-[#18181b]">
            <div className="text-right">
              <div className="font-semibold text-zinc-200 text-xs">{mergedData?.about?.name || 'Admin'}</div>
              <div className="text-[10px] text-zinc-500">Super Admin</div>
            </div>
            <div className="w-8 h-8 rounded-full bg-zinc-800 overflow-hidden">
              {mergedData?.about?.heroImage
                ? <img src={mergedData.about.heroImage} className="w-full h-full object-cover" alt="avatar" />
                : <UserAvatar />
              }
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-4xl w-full mx-auto">
            {activeTab === 'Dashboard' && <DashboardView data={mergedData} />}
            {activeTab === 'About & Home' && <SettingsView data={mergedData} onSave={handleSaveData} />}

            {activeTab === 'Projects' && (
              <GenericCRUDView
                data={mergedData} collectionKey="projects" title="Loyihalar (Projects)" onSave={handleSaveData}
                fields={[
                  { label: 'Sarlavha (Title)', key: 'title', type: 'text' },
                  { label: 'Tavsif (Description)', key: 'description', type: 'textarea' },
                  { label: 'Rasm', key: 'image', type: 'image' },
                  { label: 'Texnologiyalar (vergul bilan)', key: 'tech', type: 'array' },
                  { label: 'Demo URL', key: 'link', type: 'text', placeholder: 'https://...' },
                  { label: 'GitHub URL', key: 'github', type: 'text', placeholder: 'https://github.com/...' },
                ]}
                renderItem={item => (
                  <>
                    {item.image && <img src={item.image} alt={item.title} className="w-full h-28 object-cover rounded-lg mb-2 opacity-90" />}
                    <h3 className="font-bold text-zinc-100">{item.title}</h3>
                    <p className="text-sm text-zinc-400 line-clamp-2">{item.description}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {item.tech?.map((t: string) => <span key={t} className="text-[10px] px-2 py-0.5 bg-zinc-800 text-zinc-300 rounded">{t}</span>)}
                    </div>
                  </>
                )}
              />
            )}

            {activeTab === 'Experience' && (
              <GenericCRUDView
                data={mergedData} collectionKey="experience" title="Ish Tajribasi (Experience)" onSave={handleSaveData}
                fields={[
                  { label: 'Kompaniya / Joy', key: 'company', type: 'text' },
                  { label: 'Lavozim (Role)', key: 'role', type: 'text' },
                  { label: 'Muddat (masalan: 2023 - Present)', key: 'period', type: 'text' },
                  { label: 'Tavsif (Description)', key: 'description', type: 'textarea' },
                ]}
                renderItem={item => (
                  <>
                    <h3 className="font-bold text-zinc-100">{item.company}</h3>
                    <p className="text-sm text-indigo-400">{item.role}</p>
                    <p className="text-xs text-zinc-500 mt-0.5">{item.period}</p>
                    <p className="text-sm text-zinc-400 line-clamp-2 mt-1">{item.description}</p>
                  </>
                )}
              />
            )}

            {activeTab === 'Certificates' && (
              <GenericCRUDView
                data={mergedData} collectionKey="certificates" title="Sertifikatlar (Certificates)" onSave={handleSaveData}
                fields={[
                  { label: 'Sertifikat nomi', key: 'title', type: 'text' },
                  { label: 'Bergan tashkilot (Issuer)', key: 'issuer', type: 'text' },
                  { label: 'Sana (masalan: 2024-01)', key: 'date', type: 'text' },
                  { label: 'Sertifikat rasmi', key: 'image', type: 'image' },
                  { label: 'PDF fayli (ixtiyoriy)', key: 'pdfUrl', type: 'pdf' },
                ]}
                renderItem={item => (
                  <>
                    {item.image && <img src={item.image} alt={item.title} className="w-full h-28 object-cover rounded-lg mb-2 opacity-80" />}
                    <h3 className="font-bold text-zinc-100">{item.title}</h3>
                    <p className="text-sm text-indigo-400">{item.issuer}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-zinc-500">{item.date}</p>
                      {item.pdfUrl && (
                        <a href={item.pdfUrl} target="_blank" rel="noreferrer"
                          className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1">
                          <FileText size={12} /> PDF
                        </a>
                      )}
                    </div>
                  </>
                )}
              />
            )}

            {activeTab === 'Blog & Telegram' && (
              <TelegramBlogView data={mergedData} onSave={handleSaveData} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

const UserAvatar = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
    strokeLinecap="round" strokeLinejoin="round" className="text-zinc-500 p-1">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
