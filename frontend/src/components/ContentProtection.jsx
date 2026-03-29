import { useEffect, useState } from 'react';

const ContentProtection = () => {
  const [settings, setSettings] = useState({
    rightClickDisabled: false,
    copyProtectionEnabled: false,
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const [rightClickRes, copyProtectionRes] = await Promise.all([
        fetch('http://localhost:5000/api/settings/rightClickDisabled'),
        fetch('http://localhost:5000/api/settings/copyProtectionEnabled'),
      ]);

      const rightClickData = await rightClickRes.json();
      const copyProtectionData = await copyProtectionRes.json();

      const newSettings = {
        rightClickDisabled: rightClickData.success ? rightClickData.data.settingValue : false,
        copyProtectionEnabled: copyProtectionData.success ? copyProtectionData.data.settingValue : false,
      };

      setSettings(newSettings);

      if (newSettings.rightClickDisabled) {
        document.addEventListener('contextmenu', preventRightClick);
      }

      if (newSettings.copyProtectionEnabled) {
        document.body.style.userSelect = 'none';
        document.body.style.webkitUserSelect = 'none';
      }
    } catch (error) {
      console.error('Error fetching content protection settings:', error);
    }
  };

  const preventRightClick = (e) => {
    e.preventDefault();
    return false;
  };

  useEffect(() => {
    return () => {
      document.removeEventListener('contextmenu', preventRightClick);
      document.body.style.userSelect = '';
      document.body.style.webkitUserSelect = '';
    };
  }, []);

  return null;
};

export default ContentProtection;
