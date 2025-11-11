import { useMemo, useState } from 'react'

import { calculateEllipseEquidistantPointsCoordinates } from '../../../../../utils/calc'
import { StyledCircle, StyledTable, StyledTableContainer } from './styles'

import { useRoom } from '../../../../../hooks/useRoom'

export function RoomTable() {
  const { roomData } = useRoom()

  const tableDimensions = {
    width: 820,
    height: 440,
  }

  const circles = useMemo(
    () => calculateEllipseEquidistantPointsCoordinates(
      tableDimensions.width + 100,
      tableDimensions.height + 100,
      Object.keys(roomData?.users ?? {}).length,
      270,
    ),
    [roomData?.users, tableDimensions.height, tableDimensions.width],
  )

  return roomData
    ? (
      <StyledTableContainer>
        <StyledTable>
          {
            circles
              .filter(circle => circle.degree !== 270)
              .map(circle => <StyledCircle $translateX={circle.x} $translateY={circle.y * -1} />)
          }
        </StyledTable>
      </StyledTableContainer>
    )
    : null
}