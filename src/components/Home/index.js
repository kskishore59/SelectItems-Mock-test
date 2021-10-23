import {Component} from 'react'

import Loader from 'react-loader-spinner'
import Card from '../Card'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

class Home extends Component {
  state = {initial: 'ALL', status: false, list: [], fail: true}

  componentDidMount() {
    this.getList()
  }

  getSuccess = data => {
    const content = data.map(each => ({
      id: each.id,
      name: each.name,
      imageUrl: each.image_url,
    }))

    this.setState({list: content, status: true})
  }

  failure = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.getList}>
        Retry
      </button>
    </div>
  )

  getList = async () => {
    const {initial} = this.state
    const url = `https://apis.ccbp.in/ps/projects?category=${initial}`

    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.getSuccess(data.projects)
    } else {
      this.setState({fail: false, status: true})
    }
  }

  getData = () => {
    const {list, fail} = this.state

    return fail ? (
      <ul>
        {list.map(each => (
          <Card key={each.id} list={each} />
        ))}
      </ul>
    ) : (
      this.failure()
    )
  }

  getLoader = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  onSelect = event => {
    this.setState({initial: event.target.value}, this.getList)
  }

  render() {
    const {initial, status} = this.state
    return (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
          alt="website logo"
        />
        <select value={initial} onChange={this.onSelect}>
          {categoriesList.map(each => (
            <option key={each.id} value={each.id}>
              {each.displayText}
            </option>
          ))}
        </select>
        {status ? this.getData() : this.getLoader()}
      </div>
    )
  }
}

export default Home
