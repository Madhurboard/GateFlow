import { useState, useCallback, useEffect } from 'react';
import { subjects } from '../data';

const STORAGE_KEY = 'gateflow_progress';
const STREAK_KEY = 'gateflow_streak';

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function loadStreak() {
  try {
    const raw = localStorage.getItem(STREAK_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveStreak(dates) {
  localStorage.setItem(STREAK_KEY, JSON.stringify(dates));
}

function getToday() {
  return new Date().toISOString().split('T')[0];
}

function calculateStreak(dates) {
  if (!dates.length) return 0;
  const sorted = [...new Set(dates)].sort().reverse();
  const today = getToday();
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  if (sorted[0] !== today && sorted[0] !== yesterday) return 0;

  let streak = 1;
  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1]);
    const curr = new Date(sorted[i]);
    const diff = (prev - curr) / 86400000;
    if (diff === 1) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

const STATES = ['not_started', 'in_progress', 'confident'];

export function useProgress() {
  const [progress, setProgress] = useState(loadProgress);
  const [streakDates, setStreakDates] = useState(loadStreak);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  useEffect(() => {
    saveStreak(streakDates);
  }, [streakDates]);

  const getTopicState = useCallback(
    (topicId) => progress[topicId] || 'not_started',
    [progress]
  );

  const cycleTopicState = useCallback((topicId) => {
    setProgress((prev) => {
      const current = prev[topicId] || 'not_started';
      const idx = STATES.indexOf(current);
      const next = STATES[(idx + 1) % STATES.length];
      return { ...prev, [topicId]: next };
    });

    // Record streak activity
    const today = getToday();
    setStreakDates((prev) => {
      if (prev.includes(today)) return prev;
      return [...prev, today];
    });
  }, []);

  const getSubtopicState = useCallback(
    (subtopicId) => progress[subtopicId] === 'confident',
    [progress]
  );

  const toggleSubtopicState = useCallback((subtopicId) => {
    setProgress((prev) => {
      const current = prev[subtopicId] === 'confident';
      return { ...prev, [subtopicId]: current ? 'not_started' : 'confident' };
    });

    // Record streak activity
    const today = getToday();
    setStreakDates((prev) => {
      if (prev.includes(today)) return prev;
      return [...prev, today];
    });
  }, []);

  const getSubjectProgress = useCallback(
    (subjectId) => {
      const subject = subjects.find((s) => s.id === subjectId);
      if (!subject) return { completed: 0, total: 0, percentage: 0, status: 'not_started' };

      const total = subject.topics.length;
      const confident = subject.topics.filter(
        (t) => progress[t.id] === 'confident'
      ).length;
      const inProgress = subject.topics.filter(
        (t) => progress[t.id] === 'in_progress'
      ).length;

      const percentage = Math.round((confident / total) * 100);

      let status = 'not_started';
      if (confident === total) status = 'confident';
      else if (confident > 0 || inProgress > 0) status = 'in_progress';

      return { completed: confident, total, percentage, status, inProgress };
    },
    [progress]
  );

  const getOverallProgress = useCallback(() => {
    const allTopics = subjects.flatMap((s) => s.topics);
    const total = allTopics.length;
    const confident = allTopics.filter(
      (t) => progress[t.id] === 'confident'
    ).length;
    return Math.round((confident / total) * 100);
  }, [progress]);

  const getStreak = useCallback(() => {
    return calculateStreak(streakDates);
  }, [streakDates]);

  const hasAnyProgress = useCallback(() => {
    return Object.keys(progress).some(
      (key) => progress[key] !== 'not_started'
    );
  }, [progress]);

  return {
    getTopicState,
    cycleTopicState,
    getSubtopicState,
    toggleSubtopicState,
    getSubjectProgress,
    getOverallProgress,
    getStreak,
    hasAnyProgress,
  };
}
