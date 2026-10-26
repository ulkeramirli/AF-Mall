'use client'

import React from 'react'

interface AutumnLeavesProps {
  windspeed?: number | null
}

type LeafType = 'maple' | 'oak' | 'birch' | 'ginkgo' | 'starmaple'
type DepthLayer = 'back' | 'mid' | 'front'

interface LeafConfig {
  id: number
  type: LeafType
  depth: DepthLayer
  top: number
  size: number
  colorScheme: number
  gustAnim: 1 | 2 | 3 | 4
  tumbleAnim: 1 | 2 | 3
  baseDuration: number
  tumbleSpeed: number
  delay: number
}

/* ---------------- Botanical Leaf SVG Components ---------------- */

// 1. Canadian / Sugar Maple Leaf (5 pointed lobes with detailed venation)
function MapleLeaf({ uid, scheme }: { uid: string; scheme: number }) {
  const gradId = `maple-grad-${uid}`
  const palettes = [
    { start: '#dc2626', mid: '#ea580c', end: '#f59e0b', stem: '#78350f', vein: 'rgba(254, 240, 138, 0.65)' },
    { start: '#ea580c', mid: '#f59e0b', end: '#fbbf24', stem: '#78350f', vein: 'rgba(255, 255, 255, 0.7)' },
    { start: '#991b1b', mid: '#c2410c', end: '#d97706', stem: '#451a03', vein: 'rgba(254, 215, 170, 0.6)' },
  ]
  const p = palettes[scheme % palettes.length]

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
      <defs>
        <linearGradient id={gradId} x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor={p.start} />
          <stop offset="45%" stopColor={p.mid} />
          <stop offset="100%" stopColor={p.end} />
        </linearGradient>
      </defs>
      {/* Curved petiole stem */}
      <path d="M50 78 Q52 89 54 98" stroke={p.stem} strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* Blade */}
      <path
        d="M50 12 
           C52 22 55 25 61 24 
           C59 28 58 31 63 35 
           C70 33 76 32 82 38 
           C78 43 74 45 78 50 
           C84 51 89 53 86 62 
           C80 62 75 61 72 66 
           C72 72 70 76 64 76 
           C58 76 54 74 50 78 
           C46 74 42 76 36 76 
           C30 76 28 72 28 66 
           C25 61 20 62 14 62 
           C11 53 16 51 22 50 
           C26 45 22 43 18 38 
           C24 32 30 33 37 35 
           C42 31 41 28 39 24 
           C45 25 48 22 50 12 Z"
        fill={`url(#${gradId})`}
      />
      {/* Primary Veins */}
      <path d="M50 78 Q50 45 50 14" stroke={p.vein} strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M50 70 Q64 56 80 40" stroke={p.vein} strokeWidth="1.4" strokeLinecap="round" fill="none" />
      <path d="M50 70 Q36 56 20 40" stroke={p.vein} strokeWidth="1.4" strokeLinecap="round" fill="none" />
      <path d="M50 74 Q65 67 84 63" stroke={p.vein} strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <path d="M50 74 Q35 67 16 63" stroke={p.vein} strokeWidth="1.2" strokeLinecap="round" fill="none" />
      {/* Secondary Veinlets */}
      <path d="M50 48 Q60 40 68 36" stroke={p.vein} strokeWidth="0.9" strokeLinecap="round" fill="none" opacity="0.8" />
      <path d="M50 48 Q40 40 32 36" stroke={p.vein} strokeWidth="0.9" strokeLinecap="round" fill="none" opacity="0.8" />
    </svg>
  )
}

// 2. English / Red Oak Leaf (sinuous rounded lobes with pinnatifid venation)
function OakLeaf({ uid, scheme }: { uid: string; scheme: number }) {
  const gradId = `oak-grad-${uid}`
  const palettes = [
    { start: '#b45309', mid: '#d97706', end: '#f59e0b', stem: '#78350f', vein: 'rgba(254, 243, 199, 0.65)' },
    { start: '#78350f', mid: '#b45309', end: '#ea580c', stem: '#451a03', vein: 'rgba(254, 215, 170, 0.6)' },
    { start: '#9a3412', mid: '#ea580c', end: '#eab308', stem: '#78350f', vein: 'rgba(254, 240, 138, 0.65)' },
  ]
  const p = palettes[scheme % palettes.length]

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
      <defs>
        <linearGradient id={gradId} x1="15%" y1="0%" x2="85%" y2="100%">
          <stop offset="0%" stopColor={p.start} />
          <stop offset="50%" stopColor={p.mid} />
          <stop offset="100%" stopColor={p.end} />
        </linearGradient>
      </defs>
      <path d="M50 82 Q51 90 53 98" stroke={p.stem} strokeWidth="3" strokeLinecap="round" fill="none" />
      <path
        d="M50 10
           C58 10 63 15 61 22
           C59 26 68 28 69 35
           C70 41 62 44 65 50
           C68 56 75 58 74 65
           C73 72 64 74 62 77
           C59 81 55 81 50 82
           C45 81 41 81 38 77
           C36 74 27 72 26 65
           C25 58 32 56 35 50
           C38 44 30 41 31 35
           C32 28 41 26 39 22
           C37 15 42 10 50 10 Z"
        fill={`url(#${gradId})`}
      />
      {/* Venation */}
      <path d="M50 82 Q50 48 50 12" stroke={p.vein} strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M50 72 Q56 68 64 66" stroke={p.vein} strokeWidth="1.1" strokeLinecap="round" fill="none" />
      <path d="M50 72 Q44 68 36 66" stroke={p.vein} strokeWidth="1.1" strokeLinecap="round" fill="none" />
      <path d="M50 58 Q60 52 68 51" stroke={p.vein} strokeWidth="1.1" strokeLinecap="round" fill="none" />
      <path d="M50 58 Q40 52 32 51" stroke={p.vein} strokeWidth="1.1" strokeLinecap="round" fill="none" />
      <path d="M50 42 Q58 36 64 36" stroke={p.vein} strokeWidth="1.1" strokeLinecap="round" fill="none" />
      <path d="M50 42 Q42 36 36 36" stroke={p.vein} strokeWidth="1.1" strokeLinecap="round" fill="none" />
    </svg>
  )
}

// 3. Silver Birch Leaf (delicate ovate blade with herringbone veins)
function BirchLeaf({ uid, scheme }: { uid: string; scheme: number }) {
  const gradId = `birch-grad-${uid}`
  const palettes = [
    { start: '#facc15', mid: '#eab308', end: '#ca8a04', stem: '#713f12', vein: 'rgba(255, 255, 255, 0.75)' },
    { start: '#fde047', mid: '#f59e0b', end: '#d97706', stem: '#854d0e', vein: 'rgba(255, 255, 255, 0.7)' },
    { start: '#fef08a', mid: '#eab308', end: '#ea580c', stem: '#78350f', vein: 'rgba(254, 240, 138, 0.7)' },
  ]
  const p = palettes[scheme % palettes.length]

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
      <defs>
        <linearGradient id={gradId} x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor={p.start} />
          <stop offset="55%" stopColor={p.mid} />
          <stop offset="100%" stopColor={p.end} />
        </linearGradient>
      </defs>
      <path d="M50 80 Q51 89 53 97" stroke={p.stem} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path
        d="M50 10
           C54 20 62 25 65 34
           C67 40 73 45 74 53
           C75 62 70 70 63 76
           C58 80 54 79 50 80
           C46 79 42 80 37 76
           C30 70 25 62 26 53
           C27 45 33 40 35 34
           C38 25 46 20 50 10 Z"
        fill={`url(#${gradId})`}
      />
      <path d="M50 80 Q50 45 50 12" stroke={p.vein} strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <path d="M50 70 Q58 64 66 64" stroke={p.vein} strokeWidth="1.0" strokeLinecap="round" fill="none" />
      <path d="M50 70 Q42 64 34 64" stroke={p.vein} strokeWidth="1.0" strokeLinecap="round" fill="none" />
      <path d="M50 56 Q60 48 70 48" stroke={p.vein} strokeWidth="1.0" strokeLinecap="round" fill="none" />
      <path d="M50 56 Q40 48 30 48" stroke={p.vein} strokeWidth="1.0" strokeLinecap="round" fill="none" />
      <path d="M50 42 Q58 35 65 35" stroke={p.vein} strokeWidth="1.0" strokeLinecap="round" fill="none" />
      <path d="M50 42 Q42 35 35 35" stroke={p.vein} strokeWidth="1.0" strokeLinecap="round" fill="none" />
    </svg>
  )
}

// 4. Ginkgo Biloba (aesthetic fan-shaped leaf with radiating venation)
function GinkgoLeaf({ uid, scheme }: { uid: string; scheme: number }) {
  const gradId = `ginkgo-grad-${uid}`
  const palettes = [
    { start: '#fef08a', mid: '#facc15', end: '#d97706', stem: '#854d0e', vein: 'rgba(255, 255, 255, 0.6)' },
    { start: '#fde047', mid: '#eab308', end: '#b45309', stem: '#713f12', vein: 'rgba(254, 240, 138, 0.6)' },
    { start: '#fef9c3', mid: '#f59e0b', end: '#ea580c', stem: '#78350f', vein: 'rgba(255, 255, 255, 0.65)' },
  ]
  const p = palettes[scheme % palettes.length]

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
      <defs>
        <linearGradient id={gradId} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor={p.start} />
          <stop offset="50%" stopColor={p.mid} />
          <stop offset="100%" stopColor={p.end} />
        </linearGradient>
      </defs>
      <path d="M50 68 Q52 82 54 96" stroke={p.stem} strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <path
        d="M50 68 
           C46 64 26 54 18 38 
           C12 26 18 16 30 18 
           C38 19 44 24 50 28 
           C56 24 62 19 70 18 
           C82 16 88 26 82 38 
           C74 54 54 64 50 68 Z"
        fill={`url(#${gradId})`}
      />
      <path d="M50 68 Q50 48 50 28" stroke={p.vein} strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <path d="M50 68 Q44 48 38 22" stroke={p.vein} strokeWidth="0.9" strokeLinecap="round" fill="none" />
      <path d="M50 68 Q56 48 62 22" stroke={p.vein} strokeWidth="0.9" strokeLinecap="round" fill="none" />
      <path d="M50 68 Q38 52 28 26" stroke={p.vein} strokeWidth="0.8" strokeLinecap="round" fill="none" />
      <path d="M50 68 Q62 52 72 26" stroke={p.vein} strokeWidth="0.8" strokeLinecap="round" fill="none" />
    </svg>
  )
}

// 5. Japanese Star Maple Leaf (7 slender fingers with deep incisions)
function StarMapleLeaf({ uid, scheme }: { uid: string; scheme: number }) {
  const gradId = `starmaple-grad-${uid}`
  const palettes = [
    { start: '#991b1b', mid: '#dc2626', end: '#ea580c', stem: '#451a03', vein: 'rgba(254, 205, 211, 0.65)' },
    { start: '#831843', mid: '#be123c', end: '#f97316', stem: '#500724', vein: 'rgba(254, 215, 170, 0.65)' },
    { start: '#7f1d1d', mid: '#b91c1c', end: '#f59e0b', stem: '#451a03', vein: 'rgba(254, 240, 138, 0.6)' },
  ]
  const p = palettes[scheme % palettes.length]

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
      <defs>
        <linearGradient id={gradId} x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%" stopColor={p.start} />
          <stop offset="50%" stopColor={p.mid} />
          <stop offset="100%" stopColor={p.end} />
        </linearGradient>
      </defs>
      <path d="M50 75 Q52 86 54 96" stroke={p.stem} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path
        d="M50 12
           C52 24 55 30 60 32
           C66 22 74 18 78 24
           C75 32 68 38 67 43
           C76 40 85 40 88 48
           C82 54 74 53 69 58
           C74 65 76 72 71 76
           C65 74 60 67 55 69
           C53 73 51 75 50 75
           C49 75 47 73 45 69
           C40 67 35 74 29 76
           C24 72 26 65 31 58
           C26 53 18 54 12 48
           C15 40 24 40 33 43
           C32 38 25 32 22 24
           C26 18 34 22 40 32
           C45 30 48 24 50 12 Z"
        fill={`url(#${gradId})`}
      />
      <path d="M50 75 Q50 44 50 14" stroke={p.vein} strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <path d="M50 72 Q64 48 76 26" stroke={p.vein} strokeWidth="1.3" strokeLinecap="round" fill="none" />
      <path d="M50 72 Q36 48 24 26" stroke={p.vein} strokeWidth="1.3" strokeLinecap="round" fill="none" />
      <path d="M50 72 Q68 60 86 48" stroke={p.vein} strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <path d="M50 72 Q32 60 14 48" stroke={p.vein} strokeWidth="1.2" strokeLinecap="round" fill="none" />
    </svg>
  )
}

function RenderLeafBody({ type, uid, scheme }: { type: LeafType; uid: string; scheme: number }) {
  switch (type) {
    case 'maple': return <MapleLeaf uid={uid} scheme={scheme} />
    case 'oak': return <OakLeaf uid={uid} scheme={scheme} />
    case 'birch': return <BirchLeaf uid={uid} scheme={scheme} />
    case 'ginkgo': return <GinkgoLeaf uid={uid} scheme={scheme} />
    case 'starmaple': return <StarMapleLeaf uid={uid} scheme={scheme} />
  }
}

/* ---------------- 24 Botanical Leaves in 3 Cinematic Layers ---------------- */

const LEAF_ITEMS: LeafConfig[] = [
  // --- BACKGROUND LAYER: subtle distant leaves, soft focus, very smooth slow drift ---
  { id: 1,  type: 'birch',      depth: 'back', top: 6,  size: 16, colorScheme: 0, gustAnim: 1, tumbleAnim: 3, baseDuration: 26.0, tumbleSpeed: 8.5,  delay: -3.5 },
  { id: 2,  type: 'maple',      depth: 'back', top: 16, size: 18, colorScheme: 1, gustAnim: 2, tumbleAnim: 2, baseDuration: 28.5, tumbleSpeed: 9.5,  delay: -11.2 },
  { id: 3,  type: 'ginkgo',     depth: 'back', top: 27, size: 15, colorScheme: 0, gustAnim: 3, tumbleAnim: 3, baseDuration: 24.0, tumbleSpeed: 7.8,  delay: -6.8 },
  { id: 4,  type: 'oak',        depth: 'back', top: 41, size: 17, colorScheme: 1, gustAnim: 4, tumbleAnim: 1, baseDuration: 27.0, tumbleSpeed: 9.0,  delay: -18.4 },
  { id: 5,  type: 'starmaple',  depth: 'back', top: 55, size: 18, colorScheme: 2, gustAnim: 1, tumbleAnim: 2, baseDuration: 29.0, tumbleSpeed: 10.2, delay: -14.6 },
  { id: 6,  type: 'birch',      depth: 'back', top: 67, size: 16, colorScheme: 1, gustAnim: 3, tumbleAnim: 3, baseDuration: 25.5, tumbleSpeed: 8.2,  delay: -21.0 },
  { id: 7,  type: 'ginkgo',     depth: 'back', top: 79, size: 15, colorScheme: 2, gustAnim: 2, tumbleAnim: 1, baseDuration: 28.0, tumbleSpeed: 9.2,  delay: -8.7 },
  { id: 8,  type: 'oak',        depth: 'back', top: 87, size: 17, colorScheme: 0, gustAnim: 4, tumbleAnim: 2, baseDuration: 26.5, tumbleSpeed: 8.6,  delay: -2.0 },

  // --- MIDGROUND LAYER: rich core foliage, graceful gliding motion ---
  { id: 9,  type: 'maple',      depth: 'mid',  top: 9,  size: 28, colorScheme: 0, gustAnim: 1, tumbleAnim: 3, baseDuration: 19.5, tumbleSpeed: 7.0,  delay: -5.2 },
  { id: 10, type: 'starmaple',  depth: 'mid',  top: 19, size: 30, colorScheme: 0, gustAnim: 3, tumbleAnim: 2, baseDuration: 18.0, tumbleSpeed: 6.8,  delay: -1.5 },
  { id: 11, type: 'oak',        depth: 'mid',  top: 28, size: 26, colorScheme: 0, gustAnim: 2, tumbleAnim: 3, baseDuration: 21.0, tumbleSpeed: 7.5,  delay: -13.0 },
  { id: 12, type: 'ginkgo',     depth: 'mid',  top: 36, size: 24, colorScheme: 1, gustAnim: 4, tumbleAnim: 1, baseDuration: 18.5, tumbleSpeed: 6.5,  delay: -8.9 },
  { id: 13, type: 'birch',      depth: 'mid',  top: 45, size: 27, colorScheme: 2, gustAnim: 1, tumbleAnim: 2, baseDuration: 20.0, tumbleSpeed: 7.2,  delay: -16.4 },
  { id: 14, type: 'maple',      depth: 'mid',  top: 52, size: 32, colorScheme: 2, gustAnim: 3, tumbleAnim: 1, baseDuration: 17.5, tumbleSpeed: 6.2,  delay: -4.0 },
  { id: 15, type: 'oak',        depth: 'mid',  top: 61, size: 28, colorScheme: 2, gustAnim: 2, tumbleAnim: 3, baseDuration: 20.5, tumbleSpeed: 7.4,  delay: -15.2 },
  { id: 16, type: 'starmaple',  depth: 'mid',  top: 68, size: 29, colorScheme: 1, gustAnim: 4, tumbleAnim: 2, baseDuration: 18.8, tumbleSpeed: 6.6,  delay: -10.5 },
  { id: 17, type: 'ginkgo',     depth: 'mid',  top: 75, size: 25, colorScheme: 0, gustAnim: 1, tumbleAnim: 3, baseDuration: 19.8, tumbleSpeed: 7.1,  delay: -2.3 },
  { id: 18, type: 'birch',      depth: 'mid',  top: 83, size: 26, colorScheme: 0, gustAnim: 3, tumbleAnim: 2, baseDuration: 19.0, tumbleSpeed: 6.9,  delay: -12.1 },
  { id: 19, type: 'maple',      depth: 'mid',  top: 39, size: 30, colorScheme: 1, gustAnim: 2, tumbleAnim: 3, baseDuration: 20.0, tumbleSpeed: 7.3,  delay: -18.8 },

  // --- FOREGROUND LAYER: cinematic close-ups, smooth majestic flight ---
  { id: 20, type: 'maple',      depth: 'front', top: 13, size: 48, colorScheme: 0, gustAnim: 3, tumbleAnim: 3, baseDuration: 15.5, tumbleSpeed: 6.0,  delay: -3.8 },
  { id: 21, type: 'oak',        depth: 'front', top: 31, size: 46, colorScheme: 1, gustAnim: 1, tumbleAnim: 2, baseDuration: 16.5, tumbleSpeed: 6.4,  delay: -10.8 },
  { id: 22, type: 'starmaple',  depth: 'front', top: 57, size: 52, colorScheme: 0, gustAnim: 4, tumbleAnim: 1, baseDuration: 14.8, tumbleSpeed: 5.6,  delay: -7.0 },
  { id: 23, type: 'ginkgo',     depth: 'front', top: 73, size: 44, colorScheme: 1, gustAnim: 2, tumbleAnim: 3, baseDuration: 16.8, tumbleSpeed: 6.3,  delay: -14.5 },
  { id: 24, type: 'birch',      depth: 'front', top: 23, size: 45, colorScheme: 2, gustAnim: 3, tumbleAnim: 2, baseDuration: 15.8, tumbleSpeed: 5.9,  delay: -8.4 },
]

export function AutumnLeaves({ windspeed }: AutumnLeavesProps) {
  // Gentle, smooth wind modulation
  const currentSpeed = typeof windspeed === 'number' && windspeed > 0 ? windspeed : 30
  const speedFactor = Math.min(Math.max(1 + (currentSpeed - 20) * 0.007, 0.85), 1.25)

  return (
    <div 
      className="absolute inset-0 pointer-events-none z-15 overflow-hidden" 
      style={{ perspective: '900px' }}
      aria-hidden="true"
    >
      {LEAF_ITEMS.map(leaf => {
        const gustDuration = (leaf.baseDuration / speedFactor).toFixed(2)
        const tumbleDuration = (leaf.tumbleSpeed / Math.sqrt(speedFactor)).toFixed(2)

        // Depth-specific styling
        const depthStyles: React.CSSProperties = leaf.depth === 'back'
          ? {
              zIndex: 10,
              opacity: 0.55,
              filter: 'blur(0.8px) drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
            }
          : leaf.depth === 'front'
          ? {
              zIndex: 25,
              opacity: 0.98,
              filter: 'drop-shadow(0 8px 18px rgba(0,0,0,0.22))',
            }
          : {
              zIndex: 15,
              opacity: 0.9,
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))',
            }

        const tumbleAnimName = leaf.tumbleAnim === 1
          ? 'leaf-tumble-1'
          : leaf.tumbleAnim === 2
          ? 'leaf-tumble-2'
          : 'leaf-flutter-sway'

        const tumbleTiming = leaf.tumbleAnim === 3 ? 'ease-in-out' : 'linear'

        return (
          // Outer element: linear steady flight across the wind corridor
          <div
            key={leaf.id}
            className="absolute pointer-events-none will-change-transform"
            style={{
              top: `${leaf.top}%`,
              left: 0,
              animation: `leaf-gust-${leaf.gustAnim} ${gustDuration}s linear infinite`,
              animationDelay: `${leaf.delay}s`,
              ...depthStyles,
            }}
          >
            {/* Inner element: graceful 3D tilt, pitch, and sway */}
            <div
              className="will-change-transform"
              style={{
                width: `${leaf.size}px`,
                height: `${leaf.size}px`,
                transformStyle: 'preserve-3d',
                animation: `${tumbleAnimName} ${tumbleDuration}s ${tumbleTiming} infinite`,
              }}
            >
              <RenderLeafBody 
                type={leaf.type} 
                uid={`${leaf.id}`} 
                scheme={leaf.colorScheme} 
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
