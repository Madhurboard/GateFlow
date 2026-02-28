import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { questions } from '../data/questions';
import { subjects } from '../data';

export function useQuiz() {
  const [history, setHistory] = useLocalStorage('gateflow_quiz_history', []);

  // Get questions for a specific subject (optionally filtered by topic)
  const getQuestions = useCallback((subjectId, topicId = null, count = 10) => {
    let pool = questions.filter(q => q.subjectId === subjectId);
    if (topicId) {
      pool = pool.filter(q => q.topicId === topicId);
    }
    // Shuffle and take `count`
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, shuffled.length));
  }, []);

  // Get all questions for a mock test (across all subjects)
  const getMockTestQuestions = useCallback((count = 30) => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, shuffled.length));
  }, []);

  // Save a completed quiz attempt
  const saveAttempt = useCallback((attempt) => {
    // attempt: { subjectId, topicId, questions: [{id, userAnswer, correct}], score, total, timeSeconds, date, type }
    const record = {
      id: Date.now().toString(),
      ...attempt,
      date: new Date().toISOString(),
    };
    setHistory(prev => [record, ...prev]);
    return record;
  }, [setHistory]);

  // Get attempt history (most recent first)
  const getAttemptHistory = useCallback((limit = 20) => {
    return history.slice(0, limit);
  }, [history]);

  // Get average score across all attempts
  const getAverageScore = useCallback(() => {
    if (history.length === 0) return 0;
    const total = history.reduce((sum, a) => sum + (a.score / a.total) * 100, 0);
    return Math.round(total / history.length);
  }, [history]);

  // Get weak topics — topics where avg score < 50%
  const getWeakTopics = useCallback(() => {
    const topicScores = {};

    history.forEach(attempt => {
      if (!attempt.questions) return;
      attempt.questions.forEach(q => {
        if (!topicScores[q.topicId]) {
          topicScores[q.topicId] = { correct: 0, total: 0, subjectId: q.subjectId || attempt.subjectId };
        }
        topicScores[q.topicId].total += 1;
        if (q.correct) topicScores[q.topicId].correct += 1;
      });
    });

    const weakTopics = Object.entries(topicScores)
      .map(([topicId, data]) => {
        const percentage = Math.round((data.correct / data.total) * 100);
        // Find topic name from subjects data
        let topicName = topicId;
        let subjectName = '';
        for (const subj of subjects) {
          const topic = subj.topics.find(t => t.id === topicId);
          if (topic) {
            topicName = topic.name;
            subjectName = subj.name.replace('\n', ' ');
            break;
          }
        }
        return { topicId, topicName, subjectName, subjectId: data.subjectId, score: percentage, total: data.total };
      })
      .filter(t => t.score < 60)
      .sort((a, b) => a.score - b.score)
      .slice(0, 5);

    return weakTopics;
  }, [history]);

  // Get quiz count
  const getQuizCount = useCallback(() => history.length, [history]);

  return {
    getQuestions,
    getMockTestQuestions,
    saveAttempt,
    getAttemptHistory,
    getAverageScore,
    getWeakTopics,
    getQuizCount,
  };
}
