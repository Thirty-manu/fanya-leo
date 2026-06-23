import { readFileSync, writeFileSync } from 'fs'

const files = ['src/pages/LandingPage.jsx', 'src/pages/Dashboard.jsx', 'src/pages/AuthPage.jsx']

const emojiToIcon = {
  '🏆': 'Trophy',
  '🌱': 'Sprout',
  '⚡': 'Zap',
  '🎯': 'Target',
  '✅': 'CheckCircle',
  '🔍': 'Search',
  '🏠': 'Home',
  '📋': 'ClipboardList',
  '⭐': 'Star',
  '🔔': 'Bell',
  '👤': 'User',
  '🚪': 'LogOut',
}

files.forEach(file => {
  try {
    let content = readFileSync(file, 'utf8')
    Object.entries(emojiToIcon).forEach(([emoji, icon]) => {
      content = content.replaceAll(`emoji:"${emoji}"`, `icon:"${icon}"`)
      content = content.replaceAll(`emoji: "${emoji}"`, `icon: "${icon}"`)
    })
    writeFileSync(file, content)
    console.log(`✓ Updated ${file}`)
  } catch(e) {
    console.log(`⚠ Skipped ${file}: ${e.message}`)
  }
})
