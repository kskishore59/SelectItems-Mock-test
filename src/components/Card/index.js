const Card = props => {
  const {list} = props
  const {name, imageUrl} = list
  return (
    <li>
      <img src={imageUrl} alt={name} />
      <p>{name}</p>
    </li>
  )
}

export default Card
