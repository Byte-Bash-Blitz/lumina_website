import React from 'react'

/**
 * Every icon is an 8x8 bitmap rendered as <rect> cells — cheap to paint,
 * colored entirely via `currentColor` so a single className controls it,
 * and true to a blocky Minecraft-item silhouette without depending on any
 * external image asset or icon library.
 */
const GRID_SIZE = 8

const GRIDS = {
  diamond: [
    '00011000',
    '00111100',
    '01111110',
    '11111111',
    '11111111',
    '01111110',
    '00111100',
    '00011000',
  ],
  emerald: [
    '00011000',
    '00111100',
    '01111110',
    '11111111',
    '11111111',
    '01111110',
    '00111100',
    '00011000',
  ],
  sword: [
    '00000011',
    '00000110',
    '00001100',
    '00011000',
    '00110000',
    '01100011',
    '11000111',
    '00001111',
  ],
  compass: [
    '00111100',
    '01000010',
    '10100101',
    '10011001',
    '10011001',
    '10100101',
    '01000010',
    '00111100',
  ],
  book: [
    '11101110',
    '11101110',
    '11101110',
    '11101110',
    '11101110',
    '11101110',
    '11101110',
    '11111111',
  ],
  lantern: [
    '00011000',
    '00011000',
    '01111110',
    '11111111',
    '11111111',
    '11111111',
    '01111110',
    '00011000',
  ],
  craftingTable: [
    '11101110',
    '11101110',
    '11101110',
    '00000000',
    '11101110',
    '11101110',
    '11101110',
    '00000000',
  ],
  beacon: [
    '00011000',
    '00011000',
    '00011000',
    '00111100',
    '01111110',
    '11111111',
    '11111111',
    '11111111',
  ],
  news: [
    '01111110',
    '11111111',
    '10000001',
    '10111101',
    '10000001',
    '10111101',
    '10000001',
    '01111110',
  ],
  members: [
    '00111000',
    '01111100',
    '01111100',
    '00111000',
    '01111110',
    '11111111',
    '11111111',
    '11111111',
  ],
  events: [
    '11111111',
    '10000001',
    '10101010',
    '10010101',
    '10101010',
    '10010101',
    '10000001',
    '11111111',
  ],
}

export const PixelIcon = ({ name, size = 32, className = '' }) => {
  const grid = GRIDS[name]
  if (!grid) return null

  const cell = 100 / GRID_SIZE

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
      shapeRendering="crispEdges"
    >
      {grid.map((row, y) =>
        row
          .split('')
          .map((bit, x) =>
            bit === '1' ? (
              <rect key={`${x}-${y}`} x={x * cell} y={y * cell} width={cell} height={cell} fill="currentColor" />
            ) : null
          )
      )}
    </svg>
  )
}

export default PixelIcon
