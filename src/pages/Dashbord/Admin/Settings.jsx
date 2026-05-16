import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiSettings, 
  FiDatabase, 
  FiLock, 
  FiBell, 
  FiMail, 
  FiSave,
  FiRotateCcw,
  FiChevronRight,
  FiShield,
  FiCpu,
  FiGlobe
} from 'react-icons/fi';
import toast from 'react-hot-toast';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    general: {
      siteName: 'LocalChefBazaar',
      siteDescription: 'Marketplace for Local Home-Cooked Meals',
      timezone: 'UTC',
      language: 'en',
      maintenanceMode: false,
    },
    security: {
      twoFactorAuth: true,
      passwordExpiry: 90,
      maxLoginAttempts: 5,
      sessionTimeout: 30,
      ipWhitelist: '',
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      smsNotifications: false,
      orderAlerts: true,
      systemAlerts: true,
    },
    email: {
      smtpHost: 'smtp.gmail.com',
      smtpPort: 587,
      smtpUser: '',
      smtpPassword: '',
      fromEmail: 'noreply@localchefbazaar.com',
      fromName: 'LocalChefBazaar',
    },
    database: {
      backupFrequency: 'daily',
      retentionPeriod: 30,
      autoCleanup: true,
      compressionEnabled: true,
    }
  });

  const tabs = [
    { id: 'general', label: 'Protocol', icon: <FiSettings />, desc: 'Core architecture settings' },
    { id: 'security', label: 'Security', icon: <FiShield />, desc: 'Access & encryption' },
    { id: 'notifications', label: 'Alerts', icon: <FiBell />, desc: 'System push notifications' },
    { id: 'email', label: 'Gateway', icon: <FiMail />, desc: 'SMTP & transmission' },
    { id: 'database', label: 'Assets', icon: <FiDatabase />, desc: 'Storage & backup flux' },
  ];

  const handleInputChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    toast.success('System protocol updated successfully!');
  };

  const handleReset = () => {
    toast.success('Configuration restored to baseline.');
  };

  const inputClasses = "w-full px-5 py-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-[#6db70e]/40 focus:border-[#6db70e] outline-none transition-all duration-300 font-bold text-slate-900 dark:text-white placeholder-slate-400";
  const labelClasses = "block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 px-1";

  const renderGeneralSettings = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="group">
          <label className={labelClasses}>Bazaar Title</label>
          <input
            type="text"
            value={settings.general.siteName}
            onChange={(e) => handleInputChange('general', 'siteName', e.target.value)}
            className={inputClasses}
          />
        </div>
        <div className="group">
          <label className={labelClasses}>Base Language</label>
          <select
            value={settings.general.language}
            onChange={(e) => handleInputChange('general', 'language', e.target.value)}
            className={inputClasses}
          >
            <option value="en">English (US)</option>
            <option value="bn">Bengali (Local)</option>
            <option value="fr">French (Gourmet)</option>
          </select>
        </div>
      </div>

      <div className="group">
        <label className={labelClasses}>Bazaar Manifesto</label>
        <textarea
          value={settings.general.siteDescription}
          onChange={(e) => handleInputChange('general', 'siteDescription', e.target.value)}
          rows={3}
          className={`${inputClasses} resize-none`}
        />
      </div>

      <div className="p-8 bg-[#6db70e]/5 border border-[#6db70e]/20 rounded-[2rem] flex items-center justify-between group hover:bg-[#6db70e]/10 transition-colors duration-500">
        <div className="flex items-center gap-6">
          <div className="w-14 h-14 bg-white dark:bg-white/10 rounded-2xl flex items-center justify-center text-[#6db70e] shadow-sm">
            <FiRotateCcw size={24} className={settings.general.maintenanceMode ? 'animate-spin' : ''} />
          </div>
          <div>
            <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-tighter">Maintenance Protocol</h4>
            <p className="text-xs text-slate-500 font-serif italic">Redirect all traffic to static status page</p>
          </div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            checked={settings.general.maintenanceMode}
            onChange={(e) => handleInputChange('general', 'maintenanceMode', e.target.checked)}
            className="sr-only peer" 
          />
          <div className="w-14 h-7 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-white/10 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6db70e]"></div>
        </label>
      </div>
    </motion.div>
  );

  const renderSecuritySettings = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className={labelClasses}>Key Rotation Cycle (Days)</label>
          <input
            type="number"
            value={settings.security.passwordExpiry}
            onChange={(e) => handleInputChange('security', 'passwordExpiry', parseInt(e.target.value))}
            className={inputClasses}
          />
        </div>
        <div>
          <label className={labelClasses}>Breach Threshold</label>
          <input
            type="number"
            value={settings.security.maxLoginAttempts}
            onChange={(e) => handleInputChange('security', 'maxLoginAttempts', parseInt(e.target.value))}
            className={inputClasses}
          />
        </div>
      </div>

      <div className="group">
        <label className={labelClasses}>Session Terminal TTL (Minutes)</label>
        <input
          type="number"
          value={settings.security.sessionTimeout}
          onChange={(e) => handleInputChange('security', 'sessionTimeout', parseInt(e.target.value))}
          className={inputClasses}
        />
      </div>

      <div className="p-8 bg-blue-500/5 border border-blue-500/20 rounded-[2rem] flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="w-14 h-14 bg-white dark:bg-white/10 rounded-2xl flex items-center justify-center text-blue-500 shadow-sm">
            <FiLock size={24} />
          </div>
          <div>
            <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-tighter">Dual-Factor Audit</h4>
            <p className="text-xs text-slate-500 font-serif italic">Mandatory biometric or token verification</p>
          </div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            checked={settings.security.twoFactorAuth}
            onChange={(e) => handleInputChange('security', 'twoFactorAuth', e.target.checked)}
            className="sr-only peer" 
          />
          <div className="w-14 h-7 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-white/10 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
        </label>
      </div>
    </motion.div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general': return renderGeneralSettings();
      case 'security': return renderSecuritySettings();
      case 'notifications': return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-12 text-center border-2 border-dashed border-slate-200 dark:border-white/10 rounded-[3rem]">
          <FiBell size={48} className="mx-auto text-slate-300 mb-6" />
          <h4 className="font-black text-slate-400 uppercase tracking-widest">Notification Flow Active</h4>
          <p className="text-slate-400 italic font-serif">Signal pathways are operating at peak efficiency.</p>
        </motion.div>
      );
      default: return renderGeneralSettings();
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#05070a] text-slate-900 dark:text-white pb-32 transition-colors duration-500">
      <title>LocalChefBazaar || Intelligence Settings</title>
      
      {/* Cinematic Hero Header */}
      <div className="relative h-[45vh] flex items-center justify-center overflow-hidden mb-12 md:mb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 dark:via-[#05070a]/50 to-white dark:to-[#05070a] z-10" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558494949-ef8b56521927?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10 dark:opacity-20 grayscale" />
        
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#6db70e]/10 rounded-full blur-[120px] animate-pulse" />

        <div className="relative z-20 text-center px-6">
          <motion.h4 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#6db70e] text-[10px] md:text-xs font-black uppercase tracking-[0.8em] mb-6 font-serif italic"
          >
            Terminal Configuration
          </motion.h4>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-black tracking-tighter mb-8 text-slate-900 dark:text-white uppercase leading-none"
          >
            SYSTEM <span className="text-[#6db70e]">SETTINGS</span>
          </motion.h1>
          <div className="flex items-center justify-center gap-4 bg-[#6db70e]/10 px-6 py-2 rounded-full border border-[#6db70e]/20 mx-auto w-max">
            <div className="w-2 h-2 rounded-full bg-[#6db70e] animate-ping" />
            <span className="text-[9px] font-black uppercase tracking-widest text-[#6db70e]">Central Authority Link Active</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Executive Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-10 space-y-4">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  whileHover={{ x: 10 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full group flex items-center gap-6 p-6 rounded-[2rem] transition-all duration-500 border ${
                    activeTab === tab.id
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-transparent shadow-2xl'
                      : 'bg-slate-50 dark:bg-white/5 text-slate-500 border-slate-200 dark:border-white/10 hover:border-[#6db70e]/40'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-500 ${
                    activeTab === tab.id ? 'bg-[#6db70e] text-white' : 'bg-white dark:bg-white/10 text-slate-400 group-hover:text-[#6db70e]'
                  }`}>
                    {tab.icon}
                  </div>
                  <div className="text-left">
                    <h4 className="font-black text-xs uppercase tracking-widest leading-none mb-1">{tab.label}</h4>
                    <p className={`text-[10px] font-serif italic ${activeTab === tab.id ? 'opacity-60' : 'text-slate-400'}`}>
                      {tab.desc}
                    </p>
                  </div>
                  <FiChevronRight className={`ml-auto transition-transform ${activeTab === tab.id ? 'rotate-90' : ''}`} />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Configuration Canvas */}
          <div className="lg:col-span-8">
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-10 md:p-16 rounded-[3.5rem] backdrop-blur-xl shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-10 opacity-5">
                <FiCpu size={120} />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-12">
                  <span className="text-[#6db70e]"><FiGlobe size={24} /></span>
                  <h2 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white uppercase">
                    {tabs.find(t => t.id === activeTab)?.label} <span className="text-[#6db70e]">Flux</span>
                  </h2>
                </div>

                {renderTabContent()}

                {/* Boutique Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-end gap-6 mt-16 pt-10 border-t border-slate-200 dark:border-white/10">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleReset}
                    className="flex items-center justify-center gap-3 px-10 py-5 border border-slate-200 dark:border-white/10 text-slate-500 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
                  >
                    <FiRotateCcw />
                    Restore Baseline
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSave}
                    className="flex items-center justify-center gap-3 px-10 py-5 bg-slate-900 dark:bg-[#6db70e] text-white dark:text-white rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:shadow-[#6db70e]/40 transition-all"
                  >
                    <FiSave />
                    Commit Protocol
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Settings;