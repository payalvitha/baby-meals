import { useState } from 'react'
import { RECIPES } from '../data/recipes'
import { FOODS } from '../data/foods'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const FULL_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const SLOTS = ['Breakfast', 'Lunch']

function buildGroceryList(plan) {
  const ingredientSet = {}
  Object.values(plan).forEach(dayPlan => {
    Object.values(dayPlan).forEach(slotData => {
      if (!slotData) return
      const recipe = RECIPES.find(r => r.id === slotData.recipeId)
      if (recipe) {
        recipe.ingredients.forEach(ing => {
          ingredientSet[ing] = (ingredientSet[ing] || 0) + 1
        })
      }
    })
  })
  return Object.entries(ingredientSet).map(([name, count]) => ({ name, count }))
}

export default function MealPlanner({ mealPlan, setMealPlan }) {
  const [activeDay, setActiveDay] = useState(0)
  const [picking, setPicking] = useState(null) // { day, slot }
  const [pickSearch, setPickSearch] = useState('')
  const [pickCat, setPickCat] = useState('All')
  const [tab, setTab] = useState('plan') // plan | grocery
  const [checkedItems, setCheckedItems] = useState({})

  const groceryList = buildGroceryList(mealPlan)
  const checkedCount = Object.values(checkedItems).filter(Boolean).length

  const setMeal = (day, slot, recipeId) => {
    setMealPlan(prev => ({
      ...prev,
      [day]: { ...(prev[day] || {}), [slot]: recipeId ? { recipeId } : null }
    }))
    setPicking(null)
    setPickSearch('')
  }

  const clearMeal = (day, slot) => setMeal(day, slot, null)

  const filteredRecipes = RECIPES.filter(r => {
    const matchSearch = r.name.toLowerCase().includes(pickSearch.toLowerCase())
    const matchCat = pickCat === 'All' || r.category === pickCat
    return matchSearch && matchCat
  })

  const CAT_COLORS = { 'Purée': '#FFCBA4', 'Indian': '#FFD700', 'Finger Food': '#A8C5A0', 'No-Cook': '#C9B8E8' }

  const dayPlan = mealPlan[activeDay] || {}

  return (
    <div style={{ paddingBottom: 100 }}>
      {/* Tab switch */}
      <div style={{ display: 'flex', background: 'white', borderRadius: 14, padding: 4, marginBottom: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        {[['plan', '📅 Planner'], ['grocery', '🛒 Grocery List']].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} style={{
            flex: 1, padding: '9px', borderRadius: 11, border: 'none', cursor: 'pointer',
            background: tab === id ? '#3D2C1E' : 'transparent',
            color: tab === id ? 'white' : '#6D5347', fontWeight: 700, fontSize: 14,
          }}>{label}</button>
        ))}
      </div>

      {tab === 'plan' && (
        <>
          {/* Day selector */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 18, overflowX: 'auto' }}>
            {DAYS.map((d, i) => {
              const dp = mealPlan[i] || {}
              const filled = SLOTS.filter(s => dp[s]).length
              return (
                <button key={d} onClick={() => setActiveDay(i)} style={{
                  flex: '0 0 auto', padding: '8px 12px', borderRadius: 12, border: '2px solid',
                  borderColor: activeDay === i ? '#3D2C1E' : 'transparent',
                  background: activeDay === i ? '#FFCBA4' : 'white',
                  cursor: 'pointer', fontWeight: activeDay === i ? 800 : 600, fontSize: 13, color: '#3D2C1E',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.07)', textAlign: 'center',
                }}>
                  <div>{d}</div>
                  <div style={{ fontSize: 10, color: filled === 2 ? '#1B5E20' : '#8B6F5C', marginTop: 2 }}>
                    {filled === 0 ? '· · ·' : filled === 1 ? '● · ·' : '● ●'}
                  </div>
                </button>
              )
            })}
          </div>

          <div style={{ fontFamily: 'Lora, serif', fontSize: 20, fontWeight: 700, marginBottom: 14 }}>
            {FULL_DAYS[activeDay]}
          </div>

          {SLOTS.map(slot => {
            const slotData = dayPlan[slot]
            const recipe = slotData ? RECIPES.find(r => r.id === slotData.recipeId) : null
            return (
              <div key={slot} style={{ background: 'white', borderRadius: 16, padding: '14px', marginBottom: 12, boxShadow: '0 2px 10px rgba(0,0,0,0.07)' }}>
                <div style={{ fontWeight: 800, fontSize: 13, color: '#8B6F5C', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.5 }}>{slot}</div>
                {recipe ? (
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: (CAT_COLORS[recipe.category] || '#F5F0EB') + '55', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>
                      {recipe.emoji}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 15 }}>{recipe.name}</div>
                      <div style={{ fontSize: 12, color: '#8B6F5C' }}>{recipe.category} · {recipe.time}</div>
                    </div>
                    <button onClick={() => clearMeal(activeDay, slot)} style={{ background: '#FDECEA', border: 'none', borderRadius: 8, padding: '6px 10px', cursor: 'pointer', fontSize: 12, color: '#B71C1C', fontWeight: 700 }}>✕</button>
                  </div>
                ) : (
                  <button onClick={() => { setPicking({ day: activeDay, slot }); setPickSearch(''); setPickCat('All') }}
                    style={{ width: '100%', padding: '14px', borderRadius: 12, border: '2px dashed #EDE0D4', background: '#FAFAF8', cursor: 'pointer', color: '#8B6F5C', fontSize: 14 }}>
                    + Add {slot}
                  </button>
                )}
              </div>
            )
          })}

          <div style={{ background: '#FFF3E0', border: '1px solid #FFCBA4', borderRadius: 12, padding: '10px 14px', fontSize: 13, color: '#6D5347' }}>
            💡 At 7 months, aim for 1–2 solid meals per day alongside breast milk or formula.
          </div>
        </>
      )}

      {tab === 'grocery' && (
        <>
          {groceryList.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '50px 20px', color: '#8B6F5C' }}>
              <div style={{ fontSize: 48 }}>🛒</div>
              <div style={{ marginTop: 12, fontSize: 16, fontWeight: 700 }}>No items yet</div>
              <div style={{ marginTop: 6, fontSize: 14 }}>Add meals to your planner to auto-generate your grocery list</div>
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <div style={{ fontWeight: 800, fontSize: 16 }}>This Week's List</div>
                <div style={{ fontSize: 13, color: '#8B6F5C' }}>{checkedCount}/{groceryList.length} got</div>
              </div>
              <div style={{ background: '#EDE0D4', borderRadius: 99, height: 6, marginBottom: 16, overflow: 'hidden' }}>
                <div style={{ background: 'linear-gradient(90deg, #A8C5A0, #C9B8E8)', height: '100%', borderRadius: 99, width: `${groceryList.length ? (checkedCount / groceryList.length) * 100 : 0}%`, transition: 'width 0.3s' }} />
              </div>
              {groceryList.map(item => {
                const checked = !!checkedItems[item.name]
                return (
                  <div key={item.name} onClick={() => setCheckedItems(p => ({ ...p, [item.name]: !checked }))}
                    style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: 'white', borderRadius: 12, marginBottom: 8, cursor: 'pointer', opacity: checked ? 0.5 : 1, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                    <div style={{ width: 24, height: 24, borderRadius: 7, border: checked ? 'none' : '2px solid #EDE0D4', background: checked ? '#A8C5A0' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {checked && <span style={{ color: 'white', fontSize: 14, fontWeight: 800 }}>✓</span>}
                    </div>
                    <span style={{ flex: 1, fontSize: 14, textDecoration: checked ? 'line-through' : 'none' }}>{item.name}</span>
                    {item.count > 1 && <span style={{ fontSize: 11, color: '#8B6F5C', background: '#F5F0EB', padding: '2px 8px', borderRadius: 99 }}>×{item.count}</span>}
                  </div>
                )
              })}
              <button onClick={() => setCheckedItems({})} style={{ width: '100%', marginTop: 8, padding: '11px', borderRadius: 12, border: '1.5px solid #EDE0D4', background: 'white', cursor: 'pointer', fontSize: 13, color: '#8B6F5C', fontWeight: 600 }}>
                Reset All Checks
              </button>
            </>
          )}
        </>
      )}

      {/* ── RECIPE PICKER MODAL ── */}
      {picking && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(61,44,30,0.5)', zIndex: 200, display: 'flex', alignItems: 'flex-end' }}
          onClick={e => { if (e.target === e.currentTarget) setPicking(null) }}>
          <div style={{ background: '#FFF8F0', borderRadius: '24px 24px 0 0', width: '100%', maxWidth: 500, margin: '0 auto', padding: '20px 16px 40px', maxHeight: '88vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontWeight: 800, fontSize: 17, marginBottom: 12 }}>Pick {picking.slot} for {FULL_DAYS[picking.day]}</div>
            <input value={pickSearch} onChange={e => setPickSearch(e.target.value)} placeholder="Search recipes…" autoFocus
              style={{ padding: '10px 14px', borderRadius: 12, border: '1.5px solid #EDE0D4', fontSize: 15, marginBottom: 10, outline: 'none', background: 'white' }} />
            <div style={{ display: 'flex', gap: 6, marginBottom: 12, overflowX: 'auto', flexShrink: 0 }}>
              {['All', 'Purée', 'Indian', 'Finger Food', 'No-Cook'].map(c => (
                <button key={c} onClick={() => setPickCat(c)} style={{ padding: '5px 13px', borderRadius: 99, border: 'none', cursor: 'pointer', flexShrink: 0, background: pickCat === c ? '#3D2C1E' : 'white', color: pickCat === c ? 'white' : '#6D5347', fontSize: 13, fontWeight: 600 }}>{c}</button>
              ))}
            </div>
            <div style={{ overflowY: 'auto', flex: 1 }}>
              {filteredRecipes.map(recipe => (
                <div key={recipe.id} onClick={() => setMeal(picking.day, picking.slot, recipe.id)}
                  style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '12px 14px', background: 'white', borderRadius: 14, marginBottom: 8, cursor: 'pointer', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                  <div style={{ fontSize: 28, flexShrink: 0 }}>{recipe.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{recipe.name}</div>
                    <div style={{ fontSize: 12, color: '#8B6F5C' }}>{recipe.category} · {recipe.time} · {recipe.minAge}+ mo</div>
                  </div>
                  <div style={{ fontSize: 18, color: '#FFCBA4' }}>›</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
