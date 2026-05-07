import { useState } from 'react'
import { FOODS, CATEGORIES } from '../data/foods'

const REACTIONS = [
  { key: 'loved', label: 'Loved it! 😍', color: '#D8EDD8', text: '#1B5E20' },
  { key: 'ok', label: 'It was okay 😐', color: '#FFF9C4', text: '#F57F17' },
  { key: 'disliked', label: 'Didn\'t like 😕', color: '#FDECEA', text: '#B71C1C' },
  { key: 'allergic', label: 'Reaction ⚠️', color: '#FCE4EC', text: '#880E4F' },
]

export default function FoodLibrary({ triedFoods, setTriedFoods }) {
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('All')
  const [filter, setFilter] = useState('all') // all | tried | new
  const [selected, setSelected] = useState(null) // food id for detail modal
  const [logMode, setLogMode] = useState(false)
  const [logReaction, setLogReaction] = useState('')
  const [logNote, setLogNote] = useState('')
  const [logDate, setLogDate] = useState(new Date().toISOString().split('T')[0])

  const filtered = FOODS.filter(f => {
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase())
    const matchCat = cat === 'All' || f.category === cat
    const matchFilter = filter === 'all' || (filter === 'tried' && triedFoods[f.id]) || (filter === 'new' && !triedFoods[f.id])
    return matchSearch && matchCat && matchFilter
  })

  const selectedFood = FOODS.find(f => f.id === selected)
  const triedData = selected ? triedFoods[selected] : null
  const triedCount = Object.keys(triedFoods).length

  const saveLog = () => {
    if (!logReaction) return
    setTriedFoods(prev => ({ ...prev, [selected]: { reaction: logReaction, note: logNote, date: logDate, updatedAt: Date.now() } }))
    setLogMode(false)
    setLogReaction('')
    setLogNote('')
  }

  const removeTried = (id) => {
    setTriedFoods(prev => { const n = { ...prev }; delete n[id]; return n })
  }

  return (
    <div style={{ paddingBottom: 100 }}>
      {/* Stats bar */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
        {[
          { label: 'Tried', val: triedCount, color: '#A8C5A0' },
          { label: 'Remaining', val: FOODS.length - triedCount, color: '#FFCBA4' },
          { label: 'Total Foods', val: FOODS.length, color: '#C9B8E8' },
        ].map(s => (
          <div key={s.label} style={{ flex: 1, background: s.color + '44', borderRadius: 12, padding: '10px 8px', textAlign: 'center' }}>
            <div style={{ fontSize: 20, fontWeight: 800 }}>{s.val}</div>
            <div style={{ fontSize: 11, color: '#6D5347', fontWeight: 600 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: 12 }}>
        <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 16 }}>🔍</span>
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search foods…"
          style={{ width: '100%', padding: '10px 12px 10px 38px', borderRadius: 12, border: '1.5px solid #EDE0D4', background: 'white', fontSize: 15, outline: 'none', boxSizing: 'border-box' }}
        />
      </div>

      {/* Filter pills */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 12, overflowX: 'auto' }}>
        {['all', 'tried', 'new'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: '5px 14px', borderRadius: 99, border: 'none', cursor: 'pointer', flexShrink: 0,
            background: filter === f ? '#3D2C1E' : 'white', color: filter === f ? 'white' : '#6D5347',
            fontSize: 13, fontWeight: 600,
          }}>
            {f === 'all' ? 'All' : f === 'tried' ? '✓ Tried' : '✨ Not Yet'}
          </button>
        ))}
      </div>

      {/* Category pills */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 16, overflowX: 'auto' }}>
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setCat(c)} style={{
            padding: '5px 14px', borderRadius: 99, border: '1.5px solid', flexShrink: 0,
            borderColor: cat === c ? '#FFCBA4' : '#EDE0D4',
            background: cat === c ? '#FFCBA4' : 'white', color: '#3D2C1E',
            fontSize: 13, fontWeight: 600, cursor: 'pointer',
          }}>{c}</button>
        ))}
      </div>

      {/* Food grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {filtered.map(food => {
          const t = triedFoods[food.id]
          const rxn = t ? REACTIONS.find(r => r.key === t.reaction) : null
          return (
            <div key={food.id} onClick={() => { setSelected(food.id); setLogMode(false) }}
              style={{ background: 'white', borderRadius: 14, padding: '14px 12px', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: t ? '2px solid #A8C5A0' : '2px solid transparent', transition: 'transform 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'none'}
            >
              <div style={{ fontSize: 32, textAlign: 'center', marginBottom: 6 }}>{food.emoji}</div>
              <div style={{ fontWeight: 700, fontSize: 13, textAlign: 'center', marginBottom: 6 }}>{food.name}</div>
              <div style={{ fontSize: 11, color: '#8B6F5C', textAlign: 'center', marginBottom: 8 }}>{food.category}</div>
              {food.allergen && (
                <div style={{ background: '#FFF3CD', borderRadius: 6, padding: '2px 0', fontSize: 10, fontWeight: 700, textAlign: 'center', color: '#856404', marginBottom: 6 }}>
                  ⚠️ {food.allergenName}
                </div>
              )}
              {t ? (
                <div style={{ background: rxn?.color || '#D8EDD8', borderRadius: 8, padding: '4px 6px', fontSize: 11, fontWeight: 700, textAlign: 'center', color: rxn?.text || '#1B5E20' }}>
                  ✓ {t.date} · {rxn?.label?.split(' ')[0] || 'Tried'}
                </div>
              ) : (
                <div style={{ background: '#F5F0EB', borderRadius: 8, padding: '4px 6px', fontSize: 11, textAlign: 'center', color: '#8B6F5C' }}>
                  Not tried yet
                </div>
              )}
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px 20px', color: '#8B6F5C' }}>
          <div style={{ fontSize: 40 }}>🔍</div>
          <div style={{ marginTop: 8 }}>No foods found</div>
        </div>
      )}

      {/* ── DETAIL MODAL ── */}
      {selectedFood && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(61,44,30,0.5)', zIndex: 200, display: 'flex', alignItems: 'flex-end' }}
          onClick={e => { if (e.target === e.currentTarget) { setSelected(null); setLogMode(false) } }}>
          <div style={{ background: '#FFF8F0', borderRadius: '24px 24px 0 0', width: '100%', maxWidth: 500, margin: '0 auto', padding: '24px 20px 40px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <div style={{ fontSize: 52 }}>{selectedFood.emoji}</div>
              <h2 style={{ margin: '8px 0 4px', fontSize: 22, fontFamily: 'Lora, serif' }}>{selectedFood.name}</h2>
              <div style={{ display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap' }}>
                <span style={{ background: '#FFCBA4', borderRadius: 99, padding: '2px 10px', fontSize: 12, fontWeight: 700 }}>{selectedFood.category}</span>
                <span style={{ background: '#F5F0EB', borderRadius: 99, padding: '2px 10px', fontSize: 12 }}>From {selectedFood.minAge}+ months</span>
                {selectedFood.allergen && <span style={{ background: '#FFF3CD', borderRadius: 99, padding: '2px 10px', fontSize: 12, fontWeight: 700, color: '#856404' }}>⚠️ {selectedFood.allergenName} allergen</span>}
              </div>
            </div>

            <InfoRow label="Texture progression" value={selectedFood.texture} />
            <InfoRow label="Key nutrients" value={selectedFood.nutrients.join(' · ')} />
            <div style={{ background: '#FFF3E0', border: '1px solid #FFCBA4', borderRadius: 12, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: '#6D5347' }}>
              💡 {selectedFood.tip}
            </div>

            {/* Tried log */}
            {triedData && !logMode && (
              <div style={{ background: '#D8EDD8', borderRadius: 14, padding: '14px', marginBottom: 14 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: '#1B5E20', marginBottom: 4 }}>
                  ✓ Tried on {triedData.date}
                </div>
                <div style={{ fontSize: 13, color: '#2E6B2E', marginBottom: 6 }}>
                  {REACTIONS.find(r => r.key === triedData.reaction)?.label}
                </div>
                {triedData.note && <div style={{ fontSize: 13, color: '#3D2C1E', fontStyle: 'italic' }}>"{triedData.note}"</div>}
                <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                  <button onClick={() => { setLogMode(true); setLogReaction(triedData.reaction); setLogNote(triedData.note || ''); setLogDate(triedData.date) }}
                    style={{ flex: 1, padding: '8px', borderRadius: 10, border: 'none', background: 'white', cursor: 'pointer', fontSize: 13, fontWeight: 600, color: '#3D2C1E' }}>Edit Log</button>
                  <button onClick={() => removeTried(selected)}
                    style={{ padding: '8px 14px', borderRadius: 10, border: 'none', background: '#FDECEA', cursor: 'pointer', fontSize: 13, color: '#B71C1C' }}>Remove</button>
                </div>
              </div>
            )}

            {(!triedData || logMode) && (
              <div style={{ background: 'white', borderRadius: 14, padding: '14px', marginBottom: 14 }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>{logMode ? 'Update log' : 'Log this food'}</div>
                <div style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#8B6F5C', marginBottom: 6 }}>Date tried</div>
                  <input type="date" value={logDate} onChange={e => setLogDate(e.target.value)}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: 10, border: '1.5px solid #EDE0D4', fontSize: 14, background: '#FFF8F0', boxSizing: 'border-box', outline: 'none' }} />
                </div>
                <div style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#8B6F5C', marginBottom: 6 }}>Reaction</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                    {REACTIONS.map(r => (
                      <button key={r.key} onClick={() => setLogReaction(r.key)} style={{
                        padding: '8px', borderRadius: 10, border: '2px solid',
                        borderColor: logReaction === r.key ? r.text : 'transparent',
                        background: r.color, cursor: 'pointer', fontSize: 12, fontWeight: 600, color: r.text,
                      }}>{r.label}</button>
                    ))}
                  </div>
                </div>
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#8B6F5C', marginBottom: 6 }}>Notes (optional)</div>
                  <textarea value={logNote} onChange={e => setLogNote(e.target.value)}
                    placeholder="e.g. Ate 3 spoonfuls! Made a funny face at first…"
                    style={{ width: '100%', padding: '9px 12px', borderRadius: 10, border: '1.5px solid #EDE0D4', fontSize: 13, resize: 'none', minHeight: 68, background: '#FFF8F0', outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={saveLog} disabled={!logReaction}
                    style={{ flex: 1, padding: '11px', borderRadius: 12, border: 'none', background: logReaction ? '#FFCBA4' : '#EDE0D4', cursor: logReaction ? 'pointer' : 'default', fontWeight: 800, fontSize: 14, color: '#3D2C1E' }}>
                    {logMode ? 'Update' : 'Save Log'} ✓
                  </button>
                  {logMode && <button onClick={() => setLogMode(false)}
                    style={{ padding: '11px 16px', borderRadius: 12, border: 'none', background: '#F5F0EB', cursor: 'pointer', fontSize: 13, color: '#8B6F5C' }}>Cancel</button>}
                </div>
              </div>
            )}

            <button onClick={() => { setSelected(null); setLogMode(false) }}
              style={{ width: '100%', padding: '12px', borderRadius: 14, border: 'none', background: '#3D2C1E', color: 'white', cursor: 'pointer', fontWeight: 700, fontSize: 15 }}>
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function InfoRow({ label, value }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontSize: 11, fontWeight: 800, color: '#8B6F5C', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 3 }}>{label}</div>
      <div style={{ fontSize: 14, color: '#3D2C1E' }}>{value}</div>
    </div>
  )
}
