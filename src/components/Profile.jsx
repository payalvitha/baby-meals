import { useState } from 'react'

export default function Profile({ profile, setProfile, triedFoods, madeRecipes }) {
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState(profile)

  const save = () => { setProfile(form); setEditing(false) }
  const triedCount = Object.keys(triedFoods).length
  const madeCount = Object.keys(madeRecipes).length

  const lovedFoods = Object.entries(triedFoods)
    .filter(([, d]) => d.reaction === 'loved')
    .map(([id]) => id)
  const reactedFoods = Object.entries(triedFoods)
    .filter(([, d]) => d.reaction === 'allergic')
    .map(([id]) => id)

  return (
    <div style={{ paddingBottom: 100 }}>
      {/* Baby card */}
      <div style={{ background: 'linear-gradient(135deg, #FFCBA4 0%, #C9B8E8 100%)', borderRadius: 20, padding: '24px 20px', marginBottom: 20, textAlign: 'center', position: 'relative' }}>
        <div style={{ fontSize: 64, marginBottom: 8 }}>👶</div>
        {editing ? (
          <div style={{ background: 'white', borderRadius: 16, padding: '16px', marginTop: 10 }}>
            {[['name', "Baby's name", 'text'], ['dob', 'Date of birth', 'date'], ['allergies', 'Known allergies (comma-separated)', 'text']].map(([field, label, type]) => (
              <div key={field} style={{ marginBottom: 12, textAlign: 'left' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#8B6F5C', marginBottom: 4 }}>{label}</div>
                <input type={type} value={form[field] || ''} onChange={e => setForm(p => ({ ...p, [field]: e.target.value }))}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: 10, border: '1.5px solid #EDE0D4', fontSize: 14, boxSizing: 'border-box', outline: 'none' }} />
              </div>
            ))}
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={save} style={{ flex: 1, padding: '10px', borderRadius: 12, border: 'none', background: '#3D2C1E', color: 'white', cursor: 'pointer', fontWeight: 700 }}>Save</button>
              <button onClick={() => { setForm(profile); setEditing(false) }} style={{ padding: '10px 16px', borderRadius: 12, border: 'none', background: '#F5F0EB', cursor: 'pointer', color: '#6D5347' }}>Cancel</button>
            </div>
          </div>
        ) : (
          <>
            <div style={{ fontSize: 26, fontWeight: 800, fontFamily: 'Lora, serif' }}>{profile.name || 'My Baby'}</div>
            {profile.dob && <div style={{ fontSize: 14, color: '#6D5347', marginTop: 4 }}>{getAgeString(profile.dob)}</div>}
            <button onClick={() => { setEditing(true); setForm(profile) }}
              style={{ marginTop: 12, padding: '7px 18px', borderRadius: 99, border: 'none', background: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontSize: 13, fontWeight: 700, color: '#3D2C1E' }}>
              ✏️ Edit Profile
            </button>
          </>
        )}
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
        {[
          { label: 'Foods Tried', val: triedCount, emoji: '🌱', color: '#A8C5A0' },
          { label: 'Recipes Made', val: madeCount, emoji: '👩‍🍳', color: '#FFCBA4' },
          { label: 'Foods Loved', val: lovedFoods.length, emoji: '😍', color: '#C9B8E8' },
          { label: 'Reactions', val: reactedFoods.length, emoji: '⚠️', color: '#FDECEA' },
        ].map(s => (
          <div key={s.label} style={{ background: s.color + '55', borderRadius: 16, padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: 28 }}>{s.emoji}</div>
            <div style={{ fontSize: 28, fontWeight: 800, marginTop: 4 }}>{s.val}</div>
            <div style={{ fontSize: 12, color: '#6D5347', fontWeight: 600 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Allergies */}
      {profile.allergies && (
        <div style={{ background: '#FFF3CD', border: '1.5px solid #FFD700', borderRadius: 14, padding: '14px', marginBottom: 16 }}>
          <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 6 }}>⚠️ Known Allergies / Sensitivities</div>
          <div style={{ fontSize: 14, color: '#6D5347' }}>{profile.allergies}</div>
        </div>
      )}

      {/* Recent tried log */}
      {triedCount > 0 && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 10 }}>📋 Recent Food Log</div>
          {Object.entries(triedFoods)
            .sort((a, b) => (b[1].updatedAt || 0) - (a[1].updatedAt || 0))
            .slice(0, 6)
            .map(([id, data]) => {
              const REACTION_COLORS = { loved: ['#D8EDD8', '#1B5E20'], ok: ['#FFF9C4', '#F57F17'], disliked: ['#F5F0EB', '#6D5347'], allergic: ['#FDECEA', '#B71C1C'] }
              const REACTION_LABELS = { loved: '😍 Loved', ok: '😐 Okay', disliked: '😕 Disliked', allergic: '⚠️ Reaction' }
              const [bg, col] = REACTION_COLORS[data.reaction] || ['#F5F0EB', '#6D5347']
              return (
                <div key={id} style={{ display: 'flex', gap: 10, padding: '10px 12px', background: 'white', borderRadius: 12, marginBottom: 7, alignItems: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 14, textTransform: 'capitalize' }}>{id.replace(/-/g, ' ')}</div>
                    {data.note && <div style={{ fontSize: 12, color: '#8B6F5C', fontStyle: 'italic', marginTop: 2 }}>"{data.note}"</div>}
                    <div style={{ fontSize: 11, color: '#AAA', marginTop: 2 }}>{data.date}</div>
                  </div>
                  <div style={{ background: bg, color: col, borderRadius: 99, padding: '3px 10px', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
                    {REACTION_LABELS[data.reaction]}
                  </div>
                </div>
              )
            })}
        </div>
      )}

      {/* Tips */}
      <div style={{ background: 'white', borderRadius: 16, padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 10 }}>🌟 7-Month Milestones</div>
        {[
          'Breast milk or formula is still primary nutrition',
          'Aim for 1–2 solid meals per day',
          'Introduce one new food every 3–5 days',
          'Top allergens: egg, dairy, soy, wheat, peanut, tree nuts, fish, shellfish',
          'No honey, salt, or added sugar before 12 months',
          'Spices like cumin, turmeric & coriander are totally safe and beneficial!',
        ].map((tip, i) => (
          <div key={i} style={{ display: 'flex', gap: 8, padding: '6px 0', borderBottom: i < 5 ? '1px solid #F5F0EB' : 'none', fontSize: 13, color: '#3D2C1E', alignItems: 'flex-start' }}>
            <span style={{ color: '#FFCBA4', flexShrink: 0, marginTop: 1 }}>✦</span>
            <span>{tip}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function getAgeString(dob) {
  const birth = new Date(dob)
  const now = new Date()
  const months = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth())
  if (months < 12) return `${months} months old`
  const years = Math.floor(months / 12)
  const rem = months % 12
  return `${years} year${years > 1 ? 's' : ''}${rem ? ` ${rem} month${rem > 1 ? 's' : ''}` : ''} old`
}
