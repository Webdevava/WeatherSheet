import React from 'react'
import '../styles/recentlocation.scss'
// import thermometer from '../assets/thermometer.svg'

const RecentLocationCard = ({location,country,temp,feelsLike,icon}) => {
  const iconImg = `http://openweathermap.org/img/w/${icon}.png`;
 
  return (
    <div className='card'>
      <h3>{location}, {country}</h3>
      <h2><img src={iconImg} alt="" /> {temp}°C</h2>
      <h4>feels like {feelsLike}°C</h4>
    </div>
  )
}

export default RecentLocationCard
