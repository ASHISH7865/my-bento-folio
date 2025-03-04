import React from 'react'

type HeroProps = {
  name: string
  description: string
}

const Hero = ({ name, description }: HeroProps) => {
  return (
    <div>
      <h2>{name}</h2>
      <p>{description}</p>
    </div>
  )
}

export default Hero
