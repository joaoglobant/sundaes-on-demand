import React from 'react'
import { formatter } from '../../utils/formatMoney'
import './styles.css'

const Options = ({
  title,
  eachValue,
  totalValue,
  data,
  checkbox,
  handleChange,
}) => {
  return (
    <div className='wrapper'>
      <h4>{title}</h4>
      <p>{formatter.format(eachValue)} each</p>
      <p>
        {title} total: {totalValue ? formatter.format(totalValue) : '$0.00'}
      </p>
      <div className='image__wrapper'>
        {data?.map((item, index) => {
          return (
            <div
              className='image__container'
              key={`${item.imagePath}-${index}`}
            >
              <img
                data-testid={title}
                className='image'
                src={`http://localhost:3030${item.imagePath}`}
                alt={title}
              />
              {checkbox ? (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <label htmlFor='toppings'>{item.name}</label>
                  <input
                    name='toppings'
                    type='checkbox'
                    onChange={e =>
                      handleChange(
                        item.name,
                        e.target.checked,
                        title.toLowerCase()
                      )
                    }
                  />
                </div>
              ) : (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <label htmlFor='scoops-input'>{item.name}</label>
                  <input
                    id='scoops-input'
                    name='scoops-input'
                    min={0}
                    type='number'
                    defaultValue={0}
                    onChange={e =>
                      handleChange(
                        item.name,
                        e.target.value,
                        title.toLowerCase()
                      )
                    }
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Options
