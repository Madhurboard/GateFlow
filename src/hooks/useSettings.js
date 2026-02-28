import { useLocalStorage } from './useLocalStorage';

const DEFAULT_SETTINGS = {
  dailyReminders: true,
  emailNotifs: false,
  soundFx: true,
  dailyGoalHours: 3,
  preferredTime: 'Morning',
  targetExamDate: '2027-02-01T00:00:00',
};

export function useSettings() {
  const [settings, setSettings] = useLocalStorage('gateflow_settings', DEFAULT_SETTINGS);

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return {
    settings,
    updateSetting,
  };
}
