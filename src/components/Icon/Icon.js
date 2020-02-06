import React from "react"
import ICONS from "./icons"
import "./Icon.scss"

const Icon = ({ name }) => {
  const uppercaseName = name.toLocaleUpperCase()
  const icon = ICONS[uppercaseName]
  return (
    <svg className="icon" viewBox={icon.viewBox}>
      <title>{name}</title>
      <path d={icon.path} />
    </svg>
  )
}

export default Icon
