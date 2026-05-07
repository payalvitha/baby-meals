import { useState } from 'react'
import { RECIPES, RECIPE_CATEGORIES } from '../data/recipes'

export default function Recipes({ madeRecipes, setMadeRecipes }) {
  const [cat, setCat] = useState('All')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)
  const [noteText, setNoteText] = useState('')
  const [editingNote, setEditingNote] = useState(false)

  const filtered = RECIPES.filter(r => {
    const matchCat = cat === 'All' || r.category === cat
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const sel = RECIPES.find(r => r.id === selected)
  const madeData = selected ? madeRecipes[selected] : null

  const markMade = () => {
    const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    setMadeRecipes(prev => ({ ...prev, [selected]: { ...prev[selected], lastMade: today, note: madeData?.note || '' } }))
  }

  const saveNote = () => {
    setMadeRecipes(prev => ({ ...prev, [selected]: { ...prev[selected], note: noteText } }))
    setEditingNote(false)
  }

  const openDetail = (id) => {
    setSelected(id)
    const d = madeRecipes[id]
    setNoteText(d?.note || '')
    setEditingNote(false)
  }

  const CAT_COLORS = { 'Purée': '#FFCBA4', 'Indian': '#FFD700', 'Finger Food': '#A8C5A0', 'No-Cook': '#C9B8E8' }

  return (
    <div style={{ paddingBottom: 100 }}>
      {/* Search */}
      <div style={{ position: 'relative', marginBottom: 12 }}>
        <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 16 }}>🔍</span>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search recipes…"
          style={{ width: '100%', padding: '10px 12px 10px 38px', borderRadius: 12, border: '1.5px solid #EDE0D4', background: 'white', fontSize: 15, outline: 'none', boxSizing: 'border-box' }} />
      </div>

      {/* Category filters */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 18, overflowX: 'auto' }}>
        {RECIPE_CATEGORIES.map(c => (
          <button key={c} onClick={() => setCat(c)} style={{
            padding: '6px 15px', borderRadius: 99, border: 'none', cursor: 'pointer', flexShrink: 0,
            background: cat === c ? '#3D2C1E' : 'white', color: cat === c ? 'white' : '#6D5347',
            fontSize: 13, fontWeight: 700,
          }}>{c}</button>
        ))}
      </div>

      {/* Recipe cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filtered.map(recipe => {
          const made = madeRecipes[recipe.id]
          const catColor = CAT_COLORS[recipe.category] || '#F5F0EB'
          return (
            <div key={recipe.id} onClick={() => openDetail(recipe.id)}
              style={{ background: 'white', borderRadius: 16, padding: '14px', cursor: 'pointer', boxShadow: '0 2px 10px rgba(0,0,0,0.07)', border: made ? '2px solid #A8C5A0' : '2px solid transparent', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div style={{ width: 56, height: 56, borderRadius: 14, background: catColor + '55', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, flexShrink: 0 }}>
                {recipe.emoji}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                  <div style={{ fontWeight: 700, fontSize: 15, lineHeight: 1.3 }}>{recipe.name}</div>
                  {made && <span style={{ fontSize: 16, flexShrink: 0, marginLeft: 6 }}>✅</span>}
                </div>
                <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 6 }}>
                  <span style={{ background: catColor + '88', borderRadius: 99, padding: '2px 9px', fontSize: 11, fontWeight: 700, color: '#3D2C1E' }}>{recipe.category}</span>
                  <span style={{ background: '#F5F0EB', borderRadius: 99, padding: '2px 9px', fontSize: 11, color: '#6D5347' }}>⏱ {recipe.time}</span>
                  <span style={{ background: '#F5F0EB', borderRadius: 99, padding: '2px 9px', fontSize: 11, color: '#6D5347' }}>{recipe.minAge}+ mo</span>
                </div>
                <div style={{ fontSize: 12, color: '#8B6F5C' }}>{recipe.tag}</div>
                {made?.note && <div style={{ fontSize: 12, color: '#8B6F5C', fontStyle: 'italic', marginTop: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>📝 {made.note}</div>}
              </div>
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#8B6F5C' }}>
          <div style={{ fontSize: 40 }}>🍽️</div>
          <div style={{ marginTop: 8 }}>No recipes found</div>
        </div>
      )}

      {/* ── RECIPE DETAIL MODAL ── */}
      {sel && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(61,44,30,0.5)', zIndex: 200, display: 'flex', alignItems: 'flex-end' }}
          onClick={e => { if (e.target === e.currentTarget) setSelected(null) }}>
          <div style={{ background: '#FFF8F0', borderRadius: '24px 24px 0 0', width: '100%', maxWidth: 500, margin: '0 auto', padding: '24px 20px 40px', maxHeight: '92vh', overflowY: 'auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <div style={{ fontSize: 52 }}>{sel.emoji}</div>
              <h2 style={{ margin: '8px 0 6px', fontSize: 21, fontFamily: 'Lora, serif' }}>{sel.name}</h2>
              <div style={{ display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap' }}>
                <span style={{ background: (CAT_COLORS[sel.category] || '#F5F0EB') + '88', borderRadius: 99, padding: '3px 11px', fontSize: 12, fontWeight: 700 }}>{sel.category}</span>
                <span style={{ background: '#F5F0EB', borderRadius: 99, padding: '3px 11px', fontSize: 12 }}>⏱ {sel.time}</span>
                <span style={{ background: '#F5F0EB', borderRadius: 99, padding: '3px 11px', fontSize: 12 }}>🍽 {sel.servings}</span>
                <span style={{ background: '#F5F0EB', borderRadius: 99, padding: '3px 11px', fontSize: 12 }}>{sel.minAge}+ months</span>
              </div>
            </div>

            {/* Ingredients */}
            <SectionHead>Ingredients</SectionHead>
            <div style={{ background: 'white', borderRadius: 14, padding: '12px 14px', marginBottom: 16 }}>
              {sel.ingredients.map((ing, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, padding: '5px 0', borderBottom: i < sel.ingredients.length - 1 ? '1px solid #F5F0EB' : 'none', fontSize: 14 }}>
                  <span style={{ color: '#FFCBA4', fontWeight: 800 }}>·</span>
                  <span>{ing}</span>
                </div>
              ))}
            </div>

            {/* Steps */}
            <SectionHead>Instructions</SectionHead>
            <div style={{ marginBottom: 16 }}>
              {sel.steps.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 14px', background: 'white', borderRadius: 12, marginBottom: 8, alignItems: 'flex-start' }}>
                  <div style={{ width: 26, height: 26, borderRadius: 99, background: '#FFCBA4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, flexShrink: 0, color: '#3D2C1E' }}>{i + 1}</div>
                  <div style={{ fontSize: 14, lineHeight: 1.5, paddingTop: 3 }}>{step}</div>
                </div>
              ))}
            </div>

            {/* Tip */}
            <div style={{ background: '#FFF3E0', border: '1px solid #FFCBA4', borderRadius: 12, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: '#6D5347' }}>
              💡 {sel.tip}
            </div>

            {/* Made log */}
            {madeData?.lastMade && (
              <div style={{ background: '#D8EDD8', borderRadius: 12, padding: '10px 14px', marginBottom: 14, fontSize: 13 }}>
                <div style={{ fontWeight: 700, color: '#1B5E20', marginBottom: 2 }}>✅ Last made: {madeData.lastMade}</div>
              </div>
            )}

            {/* Notes */}
            <SectionHead>My Notes</SectionHead>
            {!editingNote && (
              <div onClick={() => { setEditingNote(true); setNoteText(madeData?.note || '') }}
                style={{ background: 'white', borderRadius: 12, padding: '12px 14px', marginBottom: 14, minHeight: 50, cursor: 'pointer', fontSize: 14, color: madeData?.note ? '#3D2C1E' : '#AAA', fontStyle: madeData?.note ? 'normal' : 'italic', border: '1.5px dashed #EDE0D4' }}>
                {madeData?.note || 'Tap to add notes, modifications, or how baby liked it…'}
              </div>
            )}
            {editingNote && (
              <div style={{ marginBottom: 14 }}>
                <textarea value={noteText} onChange={e => setNoteText(e.target.value)} autoFocus
                  placeholder="e.g. Used less turmeric. She loved it! Try adding peas next time."
                  style={{ width: '100%', padding: '11px 13px', borderRadius: 12, border: '1.5px solid #FFCBA4', fontSize: 14, resize: 'none', minHeight: 90, background: '#FFFDE7', outline: 'none', boxSizing: 'border-box' }} />
                <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                  <button onClick={saveNote} style={{ flex: 1, padding: '10px', borderRadius: 12, border: 'none', background: '#FFCBA4', cursor: 'pointer', fontWeight: 700, fontSize: 14, color: '#3D2C1E' }}>Save Note</button>
                  <button onClick={() => setEditingNote(false)} style={{ padding: '10px 16px', borderRadius: 12, border: 'none', background: '#F5F0EB', cursor: 'pointer', fontSize: 13, color: '#8B6F5C' }}>Cancel</button>
                </div>
              </div>
            )}

            {/* Actions */}
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={markMade} style={{ flex: 1, padding: '13px', borderRadius: 14, border: 'none', background: '#A8C5A0', cursor: 'pointer', fontWeight: 800, fontSize: 14, color: '#1B5E20' }}>
                ✅ Mark as Made Today
              </button>
              <button onClick={() => setSelected(null)} style={{ padding: '13px 18px', borderRadius: 14, border: 'none', background: '#3D2C1E', cursor: 'pointer', fontWeight: 700, fontSize: 14, color: 'white' }}>
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const CAT_COLORS = { 'Purée': '#FFCBA4', 'Indian': '#FFD700', 'Finger Food': '#A8C5A0', 'No-Cook': '#C9B8E8' }

function SectionHead({ children }) {
  return <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.8, color: '#8B6F5C', marginBottom: 8 }}>{children}</div>
}
