import React from 'react'

const PRESET_CHANNELS = [
  { id: '', label: 'استخدم القناة الافتراضية (env)' },
  { id: 'UC8butISFwT-Wl7EV0hUK0BQ', label: 'freeCodeCamp' },
  { id: 'UC29ju8bIPH5as8OGnQzwJyA', label: 'Traversy Media' },
  { id: 'UCW5YeuERMmlnqo4oq8vwUpg', label: 'The Net Ninja' },
  { id: 'UC0Vlhde7N5uGDIFXXWWEbFQ', label: 'EEVblog' },
  { id: 'UCpp0KqLrH4f5QWc6qS3zSzg', label: 'GreatScott!' } // Example ID (verify if needed)
]

export default function ChannelSelector({ value, onChange }) {
  return (
    <div style={{marginBottom:12,display:'flex',gap:8,alignItems:'center'}}>
      <label style={{color:'#cbd5e1'}}>القناة:</label>

      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{padding:8,borderRadius:6}}
      >
        {PRESET_CHANNELS.map(c => (
          <option key={c.id || 'default'} value={c.id}>{c.label}</option>
        ))}
      </select>

      <input
        placeholder="أدخل Channel ID مباشرةً أو اختَر من القائمة"
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{flex:1,padding:8,borderRadius:6}}
      />
    </div>
  )
}
