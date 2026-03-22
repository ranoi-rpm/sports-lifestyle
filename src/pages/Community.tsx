import { useState } from 'react';
import { Users, MessageSquare, ThumbsUp, Send, Award, TrendingUp } from 'lucide-react';

type PostCategory = 'progress' | 'question' | 'advice' | 'achievement';

const categoryLabels: Record<PostCategory, string> = {
  progress:    '💪 Прогресс',
  question:    '❓ Вопрос',
  advice:      '💡 Совет',
  achievement: '🏆 Достижение',
};

const categoryColors: Record<PostCategory, string> = {
  progress:    'bg-blue-500/20 text-blue-400 border-blue-500/30',
  question:    'bg-purple-500/20 text-purple-400 border-purple-500/30',
  advice:      'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  achievement: 'bg-green-500/20 text-green-400 border-green-500/30',
};

interface Post {
  id: number;
  author: string;
  avatar: string;
  category: PostCategory;
  text: string;
  likes: number;
  comments: number;
  time: string;
  badge?: string;
}

const initialPosts: Post[] = [
  { id: 1, author: 'Алексей_Power',    avatar: '💪', category: 'achievement', text: 'Наконец-то пожал жим 100кг! Шёл к этому 8 месяцев. Никогда не сдавайтесь! 🔥', likes: 47, comments: 12, time: '2 часа назад', badge: '🥇' },
  { id: 2, author: 'Катя_Fit',        avatar: '👩', category: 'question',    text: 'Парни помогают худеть? Читала противоречивые отзывы — кто пробовал на себе?', likes: 23, comments: 18, time: '5 часов назад' },
  { id: 3, author: 'ДимаStr',         avatar: '💪', category: 'advice',      text: 'Совет начинающим: не гонитесь за весом, сосредоточьтесь на технике. Базовые движения — основа всего.', likes: 61, comments: 8,  time: 'вчера', badge: '💡' },
  { id: 4, author: 'Sergey_Marathon', avatar: '🏋️', category: 'progress',    text: 'Неделя 4: снизил жировую массу на 2.1 кг, потерял в хронике 0.5 кг мышц. Дефицит — друг!', likes: 35, comments: 14, time: '2 дня назад' },
  { id: 5, author: 'Аня_Yoga',        avatar: '🧘', category: 'advice',      text: 'Добавила йогу 2 раза в неделю — боли в спине ушли через месяц. Рекомендую!', likes: 29, comments: 6,  time: '3 дня назад' },
  { id: 6, author: 'Vova_Gains',      avatar: '🔥', category: 'progress',    text: '+5 кг за полгода натурально. Калории, белок, сон — простая формула.', likes: 44, comments: 9,  time: 'неделю назад', badge: '📈' },
];

const topUsers = [
  { rank: 1, name: 'ДимаStr',         points: 1240, badge: '🥇' },
  { rank: 2, name: 'Алексей_Power',   points: 980,  badge: '🥈' },
  { rank: 3, name: 'Vova_Gains',      points: 760,  badge: '🥉' },
  { rank: 4, name: 'Sergey_Marathon', points: 640,  badge: '💪' },
  { rank: 5, name: 'Аня_Yoga',        points: 520,  badge: '🧘' },
];

export default function Community() {
  const [posts, setPosts]           = useState<Post[]>(initialPosts);
  const [liked, setLiked]           = useState<Set<number>>(new Set());
  const [filter, setFilter]         = useState<PostCategory | ''>('');
  const [newText, setNewText]       = useState('');
  const [newCategory, setNewCategory] = useState<PostCategory>('progress');

  const toggleLike = (id: number) => {
    setLiked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    setPosts((prev) =>
      prev.map((p) => p.id === id ? { ...p, likes: liked.has(id) ? p.likes - 1 : p.likes + 1 } : p)
    );
  };

  const submitPost = () => {
    if (!newText.trim()) return;
    const post: Post = {
      id: Date.now(),
      author: 'Ты',
      avatar: '👤',
      category: newCategory,
      text: newText.trim(),
      likes: 0,
      comments: 0,
      time: 'только что',
    };
    setPosts((prev) => [post, ...prev]);
    setNewText('');
  };

  const filtered = filter ? posts.filter((p) => p.category === filter) : posts;

  return (
    <div className="min-h-screen bg-dark-900 text-white">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-dark-800 via-dark-900 to-dark-800 border-b border-white/5 py-14 px-4">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #8b5cf6 0%, transparent 50%), radial-gradient(circle at 70% 50%, #06b6d4 0%, transparent 50%)' }} />
        <div className="max-w-5xl mx-auto relative">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-purple-500/20 rounded-xl border border-purple-500/30">
              <Users className="w-8 h-8 text-purple-400" />
            </div>
            <div>
              <p className="text-purple-400 text-sm font-medium uppercase tracking-wider">Люди</p>
              <h1 className="text-4xl font-black">Сообщество</h1>
            </div>
          </div>
          <p className="text-gray-400 text-lg">Делись прогрессом, задавай вопросы, вдохновляй других</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Feed */}
          <div className="lg:col-span-2 space-y-6">

            {/* New post */}
            <div className="bg-dark-800 border border-white/10 rounded-2xl p-5">
              <h3 className="font-bold mb-3">Написать пост</h3>
              <div className="flex gap-2 mb-3 flex-wrap">
                {(Object.keys(categoryLabels) as PostCategory[]).map((cat) => (
                  <button key={cat} onClick={() => setNewCategory(cat)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                      newCategory === cat ? categoryColors[cat] : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10'
                    }`}>
                    {categoryLabels[cat]}
                  </button>
                ))}
              </div>
              <textarea
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                placeholder="Чем хочешь поделиться?"
                rows={3}
                className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none"
              />
              <div className="flex justify-end mt-3">
                <button
                  onClick={submitPost}
                  disabled={!newText.trim()}
                  className="flex items-center gap-2 px-5 py-2 bg-purple-500 text-white rounded-xl text-sm font-medium hover:bg-purple-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-4 h-4" /> Опубликовать
                </button>
              </div>
            </div>

            {/* Filter */}
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setFilter('')}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  filter === '' ? 'bg-purple-500 text-white' : 'bg-dark-800 border border-white/10 text-gray-400 hover:text-white'
                }`}>Все</button>
              {(Object.keys(categoryLabels) as PostCategory[]).map((cat) => (
                <button key={cat} onClick={() => setFilter(cat === filter ? '' : cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    filter === cat ? 'bg-purple-500 text-white' : 'bg-dark-800 border border-white/10 text-gray-400 hover:text-white'
                  }`}>
                  {categoryLabels[cat]}
                </button>
              ))}
            </div>

            {/* Posts */}
            <div className="space-y-4">
              {filtered.map((post) => (
                <div key={post.id} className="bg-dark-800 border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-colors">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-2xl">{post.avatar}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-white">{post.author}</span>
                        {post.badge && <span>{post.badge}</span>}
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${categoryColors[post.category]}`}>
                          {categoryLabels[post.category]}
                        </span>
                        <span className="text-xs text-gray-500 ml-auto">{post.time}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">{post.text}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <button
                      onClick={() => toggleLike(post.id)}
                      className={`flex items-center gap-1.5 transition-colors ${
                        liked.has(post.id) ? 'text-red-400' : 'text-gray-400 hover:text-red-400'
                      }`}
                    >
                      <ThumbsUp className="w-4 h-4" /> {post.likes}
                    </button>
                    <span className="flex items-center gap-1.5 text-gray-500">
                      <MessageSquare className="w-4 h-4" /> {post.comments}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Leaderboard */}
            <div className="bg-dark-800 border border-white/10 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4 text-yellow-400" />
                <h3 className="font-bold">Топ участников</h3>
              </div>
              <div className="space-y-3">
                {topUsers.map((u) => (
                  <div key={u.rank} className="flex items-center gap-3">
                    <span className="text-lg">{u.badge}</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">{u.name}</p>
                      <div className="h-1.5 bg-dark-600 rounded-full mt-1 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
                          style={{ width: `${(u.points / 1240) * 100}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">{u.points}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="bg-dark-800 border border-white/10 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-4 h-4 text-purple-400" />
                <h3 className="font-bold">Статистика</h3>
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Участников',   value: '1 247',  color: 'text-purple-400' },
                  { label: 'Постов',        value: '4 830',  color: 'text-cyan-400' },
                  { label: 'Сегодня онлайн', value: '142',    color: 'text-green-400' },
                  { label: 'Челленджей',    value: '6',      color: 'text-yellow-400' },
                ].map(({ label, value, color }) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-sm text-gray-400">{label}</span>
                    <span className={`text-sm font-bold ${color}`}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
