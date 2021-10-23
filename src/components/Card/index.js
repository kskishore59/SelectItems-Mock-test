import {ListItem, ListImage, Desc} from './styledComponents'

const Card = props => {
  const {details} = props
  const {name, imageUrl} = details

  return (
    <ListItem>
      <ListImage src={imageUrl} alt={name} />
      <Desc>{name}</Desc>
    </ListItem>
  )
}

export default Card
