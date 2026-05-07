import { useState } from 'react'
import { useStorage } from './hooks/useStorage'
import FoodLibrary from './components/FoodLibrary'
import Recipes from './components/Recipes'
import MealPlanner from './components/MealPlanner'
import Profile from './components/Profile'

const TABS = [
  { id: 'foods', label: 'Foods', emoji: '🌱' },
  { id: 'recipes', label: 'Recipes', emoji: '🍳' },
  { id: 'planner', label: 'Planner', emoji: '📅' },
  { id: 'profile', label: 'Profile', emoji: '👶' },
]

const TAB_TITLES = {
  foods: 'Food Library',
  recipes: 'Recipes',
  planner: 'Meal Planner',
  profile: 'Baby Profile',
}

export default function App() {
  const [tab, setTab] = useState('foods')
  const [triedFoods, setTriedFoods] = useStorage('bf-tried-foods', {})
  const [madeRecipes, setMadeRecipes] = useStorage('bf-made-recipes', {})
  const [mealPlan, setMealPlan] = useStorage('bf-meal-plan', {})
  const [profile, setProfile] = useStorage('bf-profile', { name: '', dob: '', allergies: '' })

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#FFF8F0' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #FFCBA4 0%, #C9B8E8 100%)', padding: 'env(safe-area-inset-top, 16px) 20px 0', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 16, paddingBottom: 14 }}>
          <div style={{ fontSize: 28 }}>🍼</div>
          <div>
            <div style={{ fontFamily: 'Lora, serif', fontSize: 20, fontWeight: 700, lineHeight: 1.1 }}>
              {profile.name ? `${profile.name}'s` : 'Baby'} Meals
            </div>
            <div style={{ fontSize: 12, color: '#8B6F5C' }}>{TAB_TITLES[tab]}</div>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 16px 0' }}>
        {tab === 'foods' && <FoodLibrary triedFoods={triedFoods} setTriedFoods={setTriedFoods} />}
        {tab === 'recipes' && <Recipes madeRecipes={madeRecipes} setMadeRecipes={setMadeRecipes} />}
        {tab === 'planner' && <MealPlanner mealPlan={mealPlan} setMealPlan={setMealPlan} />}
        {tab === 'profile' && <Profile profile={profile} setProfile={setProfile} triedFoods={triedFoods} madeRecipes={madeRecipes} />}
      </div>

      {/* Bottom Nav */}
      <div style={{
        position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: '100%', maxWidth: 500, background: 'white',
        borderTop: '1px solid #EDE0D4', display: 'flex',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.08)',
        zIndex: 100,
      }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            flex: 1, padding: '10px 4px 8px', border: 'none', background: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
          }}>
            <div style={{ fontSize: 22, filter: tab === t.id ? 'none' : 'grayscale(0.3)', transition: 'transform 0.15s', transform: tab === t.id ? 'scale(1.15)' : 'scale(1)' }}>
              {t.emoji}
            </div>
            <div style={{ fontSize: 11, fontWeight: tab === t.id ? 800 : 500, color: tab === t.id ? '#3D2C1E' : '#8B6F5C' }}>
              {t.label}
            </div>
            {tab === t.id && <div style={{ width: 20, height: 3, background: '#FFCBA4', borderRadius: 99, marginTop: 1 }} />}
          </button>
        ))}
      </div>
    </div>
  )
}
