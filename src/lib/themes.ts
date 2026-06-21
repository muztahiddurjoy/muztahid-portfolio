// The 12 warm "paper + ink" palettes. id matches the .theme-<id> CSS class.
export type Theme = { id: string; name: string; paper: string; ink: string }

export const themes: Theme[] = [
  { id: 'oxford-tan', name: 'Oxford & Tan', paper: '#fdfcfb', ink: '#002147' },
  { id: 'vanilla-coffee', name: 'Vanilla & Coffee', paper: '#fceccf', ink: '#442d1d' },
  { id: 'champagne-choc', name: 'Champagne & Chocolate', paper: '#fbdfa2', ink: '#442216' },
  { id: 'rose-maroon', name: 'Rose Water & Maroon', paper: '#fff7ec', ink: '#630100' },
  { id: 'almond-coffee', name: 'Almond & Coffee', paper: '#efe1d5', ink: '#2e0d14' },
  { id: 'smoke-wine', name: 'Smoke & Wine', paper: '#f7f4f3', ink: '#5b2333' },
  { id: 'milk-sage', name: 'Milk & Sage', paper: '#fdfbf0', ink: '#465940' },
  { id: 'offwhite-olive', name: 'Off-White & Olive', paper: '#fefbf6', ink: '#4b4d39' },
  { id: 'cream-indigo', name: 'Cream & Indigo', paper: '#f0e7d5', ink: '#212842' },
  { id: 'amber-cocoa', name: 'Amber & Cocoa', paper: '#ddc5a3', ink: '#342721' },
  { id: 'floral-olive', name: 'Floral & Olive', paper: '#faf7ee', ink: '#31372b' },
  { id: 'butter-espresso', name: 'Butter & Espresso', paper: '#ffedab', ink: '#301c1b' },
]

export const themeIds = themes.map((t) => t.id)
export const themeClasses = themes.map((t) => `theme-${t.id}`)

// Inline <head> script: picks a random theme before first paint (no FOUC).
export const themeInitScript = `(function(){try{var ids=${JSON.stringify(
  themeIds,
)};var pick=ids[Math.floor(Math.random()*ids.length)];var el=document.documentElement;el.classList.forEach(function(c){if(c.indexOf('theme-')===0)el.classList.remove(c)});el.classList.add('theme-'+pick);el.setAttribute('data-theme',pick);}catch(e){}})();`
