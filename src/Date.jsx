// eslint-disable-next-line no-unused-vars
import React from 'react' 

// eslint-disable-next-line no-unused-vars
const Dates = (date) => {
  return new Date(date).toLocaleString('ko-KR', {
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  })
}
export default Dates