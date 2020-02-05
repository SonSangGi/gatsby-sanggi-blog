import React from "react"
import ICONS from "./icons"
import styled from "styled-components"

const IconSvg = styled.svg`
  background: #ffffff6e;
  padding: 0.5rem;
  border-radius: 30%;
  color: black;
  display: inline-block;
  width: 2em;
  height: 2em;
  stroke-width: 0;
  stroke: currentColor;
  fill: currentColor;
  font-style: normal;
  font-weight: normal;
  speak: none;
  margin-right: 0.2em;
  text-align: center;
  font-variant: normal;
  text-transform: none;
  line-height: 1em;
  margin-left: 0.2em;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  transition: 0.7s;
  &:hover {
    background: white;
  }
`

const Icon = ({ name }) => {
  const uppercaseName = name.toLocaleUpperCase()
  const icon = ICONS[uppercaseName]
  return (
    <IconSvg viewBox={icon.viewBox}>
      <title>{name}</title>
      <path d={icon.path} />
    </IconSvg>
  )
}

export default Icon
