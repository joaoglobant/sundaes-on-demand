import React, { useState } from 'react'
import './styles.css'

const Tooltip = props => {
  let timeout
  const [active, setActive] = useState(false)

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true)
    }, props.delay || 300)
  }

  const hideTip = () => {
    clearInterval(timeout)
    setActive(false)
  }

  return (
    <div
      className='Tooltip-Wrapper'
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
      data-testid='trigger'
    >
      {props.children}
      {active && (
        <div
          data-testid='expected'
          className={`Tooltip-Tip ${props.direction || 'top'}`}
        >
          {props.content}
        </div>
      )}
    </div>
  )
}

export default Tooltip
