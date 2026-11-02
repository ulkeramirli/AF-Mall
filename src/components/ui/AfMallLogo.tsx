'use client'

import React from 'react'

interface AfMallLogoProps {
  /**
   * 'dark'  → Gray frame + Red accent  (for light backgrounds)
   * 'light' → Light-gray frame + Red accent  (for dark backgrounds)
   * 'mono'  → Single-color (currentColor throughout)
   */
  variant?: 'dark' | 'light' | 'mono'
  className?: string
  width?: number | string
  height?: number | string
}

/**
 * AF Mall — architectural logo in the style of the official AF Holding mark.
 *
 * ViewBox : 0 0 400 160  (2.5 : 1)
 *   → at h-10 (40 px) renders as  100 × 40 px  — perfect for navbar
 *   → at h-12 (48 px) renders as  120 × 48 px
 *
 * Structure : bold gabled rafters → inner posts → entablature → pillars
 * Monogram  : thick italic AF ligature inside the gable
 * Wordmark  : "MALL"  bold + wide tracking, clearly visible at all sizes
 *
 * Geometry notes (all in viewBox units):
 *   Rafter   — parallelogram, 22 units thick, peak at x = 194–206
 *   Gable    — y 0–88, x 88–312  (inner posts)
 *   Monogram — stroke width ≈ 18 units  → 4.5 px at h-40, 5.4 px at h-48
 *   MALL     — fontSize 34, baseline y = 154  → cap-top ≈ y 130
 */
export function AfMallLogo({
  variant = 'dark',
  className = 'h-10 w-auto',
  width,
  height,
}: AfMallLogoProps) {
  const isLight = variant === 'light'
  const isMono  = variant === 'mono'

  /** Silver-gray architectural frame */
  const frame = isMono ? 'currentColor' : isLight ? '#CBD5E1' : '#9BA3AE'

  /** Brand red — AF monogram + MALL */
  const red = isMono ? 'currentColor' : '#C1272D'

  /** MALL wordmark */
  const mall = isLight ? 'rgba(255,255,255,0.85)' : isMono ? 'currentColor' : '#C1272D'

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 160"
      className={className}
      width={width}
      height={height}
      aria-label="AF Mall Logo"
      role="img"
    >
      {/* ═══════════════════════════════════════════════════════
          ARCHITECTURAL FRAME  (gray)
          ═══════════════════════════════════════════════════════ */}
      <g fill={frame}>
        {/* Left rafter  — parallelogram 22 units thick */}
        <polygon points="194,0 194,22 0,88 0,66" />

        {/* Right rafter — mirror */}
        <polygon points="206,0 400,66 400,88 206,22" />

        {/* Left inner post  (rafter foot → entablature) */}
        <rect x="88"  y="59" width="26" height="29" />

        {/* Right inner post */}
        <rect x="286" y="59" width="26" height="29" />

        {/* Horizontal entablature — full width, 22 units tall */}
        <rect x="0"   y="88" width="400" height="22" />

        {/* Left outer pillar */}
        <rect x="0"   y="110" width="32" height="18" />

        {/* Right outer pillar */}
        <rect x="368" y="110" width="32" height="18" />

        {/* Left inner pillar */}
        <rect x="88"  y="110" width="26" height="14" />

        {/* Right inner pillar */}
        <rect x="286" y="110" width="26" height="14" />
      </g>

      {/* ═══════════════════════════════════════════════════════
          AF MONOGRAM  (italic interlocked ligature, red)
          Gable area : x 88–312, y 0–88 — stroke width ≈ 18 units
          ═══════════════════════════════════════════════════════ */}
      <g fill={red}>
        {/* A — left slanted leg */}
        <polygon points="152,85 170,85 196,6 178,6" />

        {/* A + F — shared central stem */}
        <polygon points="176,85 194,85 220,6 202,6" />

        {/* A — horizontal crossbar */}
        <polygon points="162,52 207,52 205,64 160,64" />

        {/* F — top horizontal arm */}
        <polygon points="204,6 248,6 246,20 202,20" />

        {/* F — middle horizontal arm */}
        <polygon points="193,34 233,34 231,46 191,46" />
      </g>

      {/* ═══════════════════════════════════════════════════════
          WORDMARK  "MALL"
          Baseline at y = 154 → cap-top ≈ 130 → 4 px gap above pillars
          ═══════════════════════════════════════════════════════ */}
      <text
        x="200"
        y="154"
        fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
        fontSize="34"
        fontWeight="800"
        letterSpacing="12"
        textAnchor="middle"
        fill={mall}
      >
        MALL
      </text>
    </svg>
  )
}
