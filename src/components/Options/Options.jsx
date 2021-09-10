import React from 'react'
import './styles.css'

const Options = ({ title, eachValue, totalValue, data, checkbox }) => {
  return (
    <div className='wrapper'>
      <h4>{title}</h4>
      <p>{eachValue} each</p>
      <p>
        {title} total: {totalValue}
      </p>
      <div className='image__wrapper'>
        {data.map(item => (
          <div className='image__container'>
            <img className='image' src={item.image} alt={item.item} />
            {checkbox ? (
              <div>
                <input type='checkbox' />
                {item.label}
              </div>
            ) : (
              <div>
                {item.label}
                <input type='text' />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Options
