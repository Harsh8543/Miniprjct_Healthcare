
import React, { useState, useEffect } from 'react';
import { CheckCircle, Circle, Star, Gift, Trophy } from 'lucide-react';
import { Toaster, toast } from 'sonner'
import { Card } from '@/components/ui/card';
import { Progress } from '@radix-ui/react-progress';
import { Button } from '@/components/ui/button';

// NOTE: Logic unchanged from your original component — only styling/UI has been improved.
export function DailyWellnessQuest() {
  const [completedQuests, setCompletedQuests] = useState([]);
  const [selectedQuests, setSelectedQuests] = useState([]);
  const [demoModalOpen, setDemoModalOpen] = useState(false); // small demo modal (animated)

  useEffect(() => {
    // Select 4 random quests for today
    const quests = [
      { id: 'breathing', title: 'Take 5 Deep Breaths', description: 'Practice mindful breathing for 2 minutes', points: 10, category: 'Mindfulness' },
      { id: 'gratitude', title: "Write Down 3 Things You're Grateful For", description: 'Reflect on positive aspects of your day', points: 15, category: 'Gratitude' },
      { id: 'movement', title: 'Move Your Body for 10 Minutes', description: 'Take a walk, stretch, or do light exercise', points: 20, category: 'Physical' },
      { id: 'connection', title: 'Connect with Someone You Care About', description: 'Send a message or call a friend or family member', points: 15, category: 'Social' },
      { id: 'nature', title: 'Spend 10 Minutes in Nature', description: 'Go outside or look at plants/nature photos', points: 10, category: 'Nature' },
      { id: 'selfcare', title: 'Do One Kind Thing for Yourself', description: 'Take a bath, listen to music, or treat yourself gently', points: 10, category: 'Self-Care' },
      { id: 'learn', title: 'Learn Something New', description: 'Read an article, watch a video, or explore a hobby', points: 15, category: 'Growth' },
      { id: 'organize', title: 'Tidy Up One Small Space', description: 'Organize your desk, a drawer, or make your bed', points: 10, category: 'Environment' }
    ];

    const shuffled = [...quests].sort(() => 0.5 - Math.random());
    setSelectedQuests(shuffled.slice(0, 4));

    // Load completed quests from localStorage (in a real app, this would be from a database)
    const today = new Date().toDateString();
    const saved = localStorage.getItem(`wellness-quest-${today}`);
    if (saved) {
      setCompletedQuests(JSON.parse(saved));
    }
  }, []);

  const toggleQuest = (questId) => {
    const newCompleted = completedQuests.includes(questId)
      ? completedQuests.filter(id => id !== questId)
      : [...completedQuests, questId];

    setCompletedQuests(newCompleted);

    // Save to localStorage
    const today = new Date().toDateString();
    localStorage.setItem(`wellness-quest-${today}`, JSON.stringify(newCompleted));

    if (!completedQuests.includes(questId)) {
      const quest = selectedQuests.find(q => q.id === questId);
      toast.success(`Quest completed! +${quest?.points} points 🎉`);
    }
  };

  const totalPoints = selectedQuests
    .filter(quest => completedQuests.includes(quest.id))
    .reduce((sum, quest) => sum + quest.points, 0);

  const maxPoints = selectedQuests.reduce((sum, quest) => sum + quest.points, 0);
  const progress = maxPoints > 0 ? (totalPoints / maxPoints) * 100 : 0;

  const getLevelInfo = (points) => {
    if (points >= 60) return { level: 'Wellness Champion', icon: Trophy, color: '#FFD166' };
    if (points >= 40) return { level: 'Wellness Warrior', icon: Star, color: '#7B9ACC' };
    if (points >= 20) return { level: 'Self-Care Seeker', icon: Gift, color: '#A8D0E6' };
    return { level: 'Getting Started', icon: Circle, color: '#C4B5FD' };
  };

  const levelInfo = getLevelInfo(totalPoints);
  const LevelIcon = levelInfo.icon;

  return (
    <section className="relative py-20 overflow-hidden" aria-labelledby="daily-wellness-title">
      {/* Floating animated bubbles + soft neon gradient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full opacity-30 blur-3xl animate-slow-spin" style={{ background: 'radial-gradient(circle at 30% 30%, rgba(123,154,204,0.28), rgba(123,154,204,0.05))' }} />
        <div className="absolute top-10 right-10 w-56 h-56 rounded-full opacity-25 blur-2xl animate-pulse-slow" style={{ background: 'radial-gradient(circle at 30% 30%, rgba(168,208,230,0.24), rgba(168,208,230,0.02))' }} />
        <div className="absolute bottom-10 left-1/4 w-44 h-44 rounded-full opacity-22 blur-2xl animate-float" style={{ background: 'radial-gradient(circle at 20% 20%, rgba(255,209,102,0.18), rgba(255,209,102,0.01))' }} />
        <div className="absolute -bottom-14 right-1/3 w-80 h-80 rounded-full opacity-18 blur-3xl animate-rotate-slow" style={{ background: 'radial-gradient(circle at 40% 40%, rgba(196,181,253,0.18), rgba(196,181,253,0.02))' }} />
      </div>

      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-8">
          <h2 id="daily-wellness-title" className="mb-4 text-4xl font-semibold text-slate-800">Daily Wellness Quest</h2>
          <p className="text-lg max-w-2xl mx-auto text-slate-600">Complete small acts of self-care throughout your day. Every step counts towards your wellbeing journey.</p>
        </div>

        {/* Glassmorphism card for header/stats */}
        <Card className="p-6 mb-8 border-0 backdrop-blur-lg bg-white/40 shadow-lg rounded-2xl" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-full shadow-2xl" style={{ background: 'linear-gradient(135deg, rgba(123,154,204,0.12), rgba(255,209,102,0.08))' }}>
                <LevelIcon className="w-10 h-10" style={{ color: levelInfo.color }} />
              </div>
              <div>
                <div className="text-2xl font-semibold text-slate-800">{levelInfo.level}</div>
                <div className="text-sm text-slate-600">{completedQuests.length} of {selectedQuests.length} quests completed</div>
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <div className="flex items-center justify-between mb-2">
                <div className="text-3xl font-bold text-slate-800">{totalPoints}</div>
                <div className="text-sm text-slate-600">/ {maxPoints} pts</div>
              </div>
              <div className="bg-white/30 rounded-full h-3 overflow-hidden">
                <Progress value={progress} className="h-3" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button onClick={() => setDemoModalOpen(true)} className="shadow-sm transform transition-all hover:-translate-y-1 hover:scale-105">View Reward</Button>
              <Button variant="ghost" onClick={() => toast.info('Streak tracking coming soon!')} className="text-slate-700">Streak</Button>
            </div>
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {selectedQuests.map((quest) => {
            const isCompleted = completedQuests.includes(quest.id);
            return (
              <Card
                key={quest.id}
                onClick={() => toggleQuest(quest.id)}
                className={`p-6 cursor-pointer transform transition-all duration-300 ${isCompleted ? 'scale-100 shadow-xl' : 'hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl'}`}
                style={{
                  background: isCompleted ? 'linear-gradient(135deg, rgba(220,252,231,0.9), rgba(167,243,208,0.6))' : 'linear-gradient(180deg, rgba(255,255,255,0.8), rgba(255,255,255,0.6))',
                  border: '1px solid rgba(168,208,230,0.3)',
                  borderRadius: '16px'
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {isCompleted ? (
                      <CheckCircle className="w-6 h-6" style={{ color: '#16A34A' }} />
                    ) : (
                      <Circle className="w-6 h-6" style={{ color: '#475569' }} />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className={`${isCompleted ? 'line-through text-slate-500' : 'text-slate-800 font-semibold'}`}>{quest.title}</h3>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="px-2 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(123,154,204,0.12)', color: '#1f2937' }}>{quest.category}</span>
                        <span className="text-sm font-medium" style={{ color: '#3b82f6' }}>+{quest.points}pts</span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600">{quest.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Card className="p-6 border-0 backdrop-blur-sm bg-white/30 shadow rounded-2xl">
            <h3 className="mb-2 text-lg font-semibold text-slate-800">Daily Streak Bonus</h3>
            <p className="text-sm mb-4 text-slate-600">Complete all quests for 7 days in a row to unlock special wellness content and earn bonus points!</p>
            <div className="flex items-center justify-center gap-4">
              <Button onClick={() => toast.success('Nice — keep the streak!')} className="transform transition-all hover:-translate-y-1 hover:scale-105">Claim Info</Button>
              <Button variant="ghost" onClick={() => toast.info('More rewards coming soon')}>Learn More</Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Animated demo modal (small, accessible) */}
      {demoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 backdrop-blur-md bg-black/40" onClick={() => setDemoModalOpen(false)} />
          <div className="relative w-full max-w-lg mx-auto transform transition-all duration-500 scale-100 animate-pop-in">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-white/70 to-white/50 border border-white/30 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Trophy className="w-8 h-8" style={{ color: '#FFD166' }} />
                  <div>
                    <div className="font-semibold text-slate-800">Daily Completion Bonus</div>
                    <div className="text-sm text-slate-600">You unlock calming music and a breathing mini-session</div>
                  </div>
                </div>
                <button aria-label="close" onClick={() => setDemoModalOpen(false)} className="text-slate-600 hover:text-slate-800">✕</button>
              </div>
              <div className="mt-2">
                <p className="text-sm text-slate-700 mb-4">Congratulations! Keep going to build a healthy habit. This is a demo modal with a smooth pop-in animation.</p>
                <div className="flex items-center justify-end gap-3">
                  <Button variant="ghost" onClick={() => setDemoModalOpen(false)}>Close</Button>
                  <Button onClick={() => { toast.success('Enjoy your bonus content!'); setDemoModalOpen(false); }}>Open Bonus</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sonner toaster for toasts (mounted once) */}
      <Toaster />

      {/* Small CSS additions for animations (tailwind-first approach, extras here) */}
      <style jsx>{`
        @keyframes slow-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes rotate-slow { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-14px); } 100% { transform: translateY(0px); } }
        @keyframes pop-in { 0% { transform: scale(.9) translateY(10px); opacity: 0 } 100% { transform: scale(1) translateY(0); opacity: 1 } }

        .animate-slow-spin { animation: slow-spin 24s linear infinite; }
        .animate-rotate-slow { animation: rotate-slow 30s linear infinite; }
        .animate-pulse-slow { animation: pulse 6s ease-in-out infinite; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-pop-in { animation: pop-in 320ms cubic-bezier(.2,.9,.2,1); }
      `}</style>
    </section>
  );
}
