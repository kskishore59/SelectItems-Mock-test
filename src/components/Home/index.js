import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Card from '../Card'

import {
  MainContainer,
  NavHeader,
  LogoImage,
  BottomContainer,
  ProductsLoaderContainer,
  NotFoundContainer,
  Image,
  Heading,
  Desc,
  Retry,
  SelectOption,
  ItemsList,
} from './styledComponents'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    optionId: categoriesList[0].id,
    apiStatus: apiStatusConstants.initial,
    Items: [],
  }

  componentDidMount() {
    this.getItemsList()
  }

  getItemsList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {optionId} = this.state
    const url = `https://apis.ccbp.in/ps/projects?category=${optionId}`
    const response = await fetch(url)
    const data = await response.json()
    const updatedData = data.projects.map(each => ({
      id: each.id,
      name: each.name,
      imageUrl: each.image_url,
    }))
    console.log(updatedData)
    if (response.ok) {
      this.setState({Items: updatedData, apiStatus: apiStatusConstants.success})
    } elseif (response.ok !== true) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeOptionID = event => {
    this.setState({optionId: event.target.value}, this.getItemsList)
  }

  renderLoadingView = () => (
    <ProductsLoaderContainer
      className="products-loader-container"
      data-testid="loader"
    >
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </ProductsLoaderContainer>
  )

  renderFailureView = () => (
    <NotFoundContainer>
      <Image
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        alt="failure view"
        className="jobs-failure-img"
      />
      <Heading>Oops! Something Went Wrong</Heading>
      <Desc className="jobs-failure-description">
        We cannot seem to find the page you are looking for
      </Desc>

      <Retry className="button" type="button" onClick={this.getItemsList}>
        Retry
      </Retry>
    </NotFoundContainer>
  )

  renderHome = () => {
    const {optionId, Items} = this.state

    return (
      <MainContainer>
        <NavHeader>
          <LogoImage
            src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
            alt="website logo"
          />
        </NavHeader>
        <BottomContainer>
          <SelectOption
            id="select"
            className="input"
            value={optionId}
            onChange={this.onChangeOptionID}
          >
            {categoriesList.map(eachOption => (
              <option key={eachOption.id} value={eachOption.id}>
                {eachOption.displayText}
              </option>
            ))}
          </SelectOption>
          <ItemsList>
            {Items.map(each => (
              <Card key={each.id} details={each} />
            ))}
          </ItemsList>
        </BottomContainer>
      </MainContainer>
    )
  }

  renderAllItems = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderHome()

      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return this.renderAllItems()
  }
}

export default Home
