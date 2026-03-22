import { Routes, Route } from 'react-router-dom'
import Layout from '@/components/Layout/Layout'
import Home from '@/pages/Home'
import Exercises from '@/pages/Exercises'
import ExercisePage from '@/pages/ExercisePage'
import Wiki from '@/pages/Wiki'
import WikiArticle from '@/pages/WikiArticle'
import Calculators from '@/pages/Calculators'
import Nutrition from '@/pages/Nutrition'
import Videos from '@/pages/Videos'
import Health from '@/pages/Health'
import Motivation from '@/pages/Motivation'
import Community from '@/pages/Community'
import NotFound from '@/pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="exercises" element={<Exercises />} />
        <Route path="exercises/:slug" element={<ExercisePage />} />
        <Route path="wiki" element={<Wiki />} />
        <Route path="wiki/:slug" element={<WikiArticle />} />
        <Route path="calculators" element={<Calculators />} />
        <Route path="nutrition" element={<Nutrition />} />
        <Route path="videos" element={<Videos />} />
        <Route path="health" element={<Health />} />
        <Route path="motivation" element={<Motivation />} />
        <Route path="community" element={<Community />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
