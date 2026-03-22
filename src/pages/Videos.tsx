import { useState } from 'react';
import { Play, Youtube } from 'lucide-react';

type VideoCategory = 'technique' | 'nutrition' | 'motivation' | 'recovery' | 'program';

interface Video {
  id: string;
  youtubeId: string;
  title: string;
  channel: string;
  category: VideoCategory;
  duration: string;
  tags: string[];
}

const categoryLabels: Record<VideoCategory, string> = {
  technique:  '🏋️ Техника',
  nutrition:  '🥗 Питание',
  motivation: '🔥 Мотивация',
  recovery:   '💤 Восстановление',
  program:    '📋 Программы',
};

const videos: Video[] = [
  { id:'v01', youtubeId:'rT7DgCr-3pg', title:'Жим штанги лёжа — идеальная техника', channel:'AthleanX',                  category:'technique',  duration:'12:34', tags:['жим','грудь','техника'] },
  { id:'v02', youtubeId:'U0bhE67HuDY', title:'Становая тяга — полный гайд',           channel:'Alan Thrall',              category:'technique',  duration:'15:22', tags:['становая','спина','техника'] },
  { id:'v03', youtubeId:'Dy28eq2PjcM', title:'Приседания со штангой — как правильно', channel:'Calgary Barbell',          category:'technique',  duration:'18:05', tags:['приседания','ноги','техника'] },
  { id:'v04', youtubeId:'IODxDxX7oi4', title:'Питание для роста мышц — полный план', channel:'Jeff Nippard',             category:'nutrition',  duration:'22:10', tags:['питание','масса','белок'] },
  { id:'v05', youtubeId:'eMjyvIQbn9M', title:'Что есть до и после тренировки',       channel:'Renaissance Periodization', category:'nutrition',  duration:'14:55', tags:['питание','до тренировки','после'] },
  { id:'v06', youtubeId:'XK3SIpCMnhc', title:'Почему сон важнее тренировок',         channel:'Andrew Huberman',          category:'recovery',   duration:'25:30', tags:['сон','восстановление','гормоны'] },
  { id:'v07', youtubeId:'SqD6DLBpBZk', title:'Как восстанавливаться быстрее',        channel:'Jeff Nippard',             category:'recovery',   duration:'16:40', tags:['восстановление','дилоад','отдых'] },
  { id:'v08', youtubeId:'RmZFHFpOaAU', title:'Программа на массу 3 дня в неделю',   channel:'MASSTHETICS',              category:'program',    duration:'19:15', tags:['программа','масса','3 дня'] },
  { id:'v09', youtubeId:'pFp0M8THGAU', title:'6 недель — трансформация тела',        channel:'Greg Doucette',            category:'motivation', duration:'11:20', tags:['мотивация','трансформация'] },
  { id:'v10', youtubeId:'kN_MdWiUABY', title:'Как тренируется Арнольд',             channel:"Gold's Gym",              category:'motivation', duration:'08:45', tags:['мотивация','Арнольд','легенды'] },
  { id:'v11', youtubeId:'v-vKeHQVFT4', title:'Подтягивания — прогрессия с нуля',    channel:'Calisthenics Movement',   category:'technique',  duration:'13:10', tags:['подтягивания','спина','начинающий'] },
  { id:'v12', youtubeId:'ykJmrZ5v0Oo', title:'Периодизация для натурала',           channel:'Dr. Mike Israetel',       category:'program',    duration:'28:00', tags:['периодизация','программа','наука'] },
];

function VideoCard({ video, onPlay }: { video: Video; onPlay: (v: Video) => void }) {
  return (
    <div className="group bg-dark-800 border border-white/10 rounded-2xl overflow-hidden hover:border-red-500/40 transition-all duration-300">
      <div className="relative aspect-video bg-dark-700 cursor-pointer overflow-hidden" onClick={() => onPlay(video)}>
        <img
          src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <div className="w-14 h-14 bg-red-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Play className="w-6 h-6 text-white ml-1" fill="white" />
          </div>
        </div>
        <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-0.5 rounded font-mono">{video.duration}</span>
      </div>
      <div className="p-4">
        <span className="text-xs text-red-400 font-medium">{categoryLabels[video.category]}</span>
        <h3 className="font-bold text-white mt-1 line-clamp-2 group-hover:text-red-400 transition-colors">{video.title}</h3>
        <p className="text-xs text-gray-500 mt-1">{video.channel}</p>
        <div className="flex flex-wrap gap-1 mt-2">
          {video.tags.slice(0, 3).map((t) => (
            <span key={t} className="text-xs bg-dark-700 text-gray-500 px-2 py-0.5 rounded-full">#{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function VideoModal({ video, onClose }: { video: Video; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <div className="relative bg-dark-800 border border-white/10 rounded-2xl max-w-3xl w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="aspect-video">
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
            className="w-full h-full rounded-t-2xl"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
        <div className="p-5 flex items-start justify-between">
          <div>
            <h3 className="font-bold text-white text-lg">{video.title}</h3>
            <p className="text-sm text-gray-400">{video.channel} · {video.duration}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl leading-none ml-4">×</button>
        </div>
      </div>
    </div>
  );
}

export default function Videos() {
  const [activeCategory, setActiveCategory] = useState<VideoCategory | ''>('');
  const [playing, setPlaying] = useState<Video | null>(null);

  const categories = Object.keys(categoryLabels) as VideoCategory[];
  const filtered = activeCategory ? videos.filter((v) => v.category === activeCategory) : videos;

  return (
    <div className="min-h-screen bg-dark-900 text-white">
      <div className="relative bg-gradient-to-br from-dark-800 via-dark-900 to-dark-800 border-b border-white/5 py-14 px-4">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #ef4444 0%, transparent 50%), radial-gradient(circle at 70% 50%, #f97316 0%, transparent 50%)' }} />
        <div className="max-w-7xl mx-auto relative">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-red-500/20 rounded-xl border border-red-500/30">
              <Youtube className="w-8 h-8 text-red-400" />
            </div>
            <div>
              <p className="text-red-400 text-sm font-medium uppercase tracking-wider">Обучение</p>
              <h1 className="text-4xl font-black">Видео-хаб</h1>
            </div>
          </div>
          <p className="text-gray-400 text-lg">{videos.length} видео по технике, питанию и программам</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2 mb-8">
          <button onClick={() => setActiveCategory('')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeCategory === '' ? 'bg-red-500 text-white' : 'bg-dark-800 border border-white/10 text-gray-400 hover:text-white'
            }`}>Все ({videos.length})</button>
          {categories.map((cat) => {
            const count = videos.filter((v) => v.category === cat).length;
            return (
              <button key={cat} onClick={() => setActiveCategory(cat === activeCategory ? '' : cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeCategory === cat ? 'bg-red-500 text-white' : 'bg-dark-800 border border-white/10 text-gray-400 hover:text-white'
                }`}>
                {categoryLabels[cat]} ({count})
              </button>
            );
          })}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((v) => <VideoCard key={v.id} video={v} onPlay={setPlaying} />)}
        </div>
      </div>

      {playing && <VideoModal video={playing} onClose={() => setPlaying(null)} />}
    </div>
  );
}
