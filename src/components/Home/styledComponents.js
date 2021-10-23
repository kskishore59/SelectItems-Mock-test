import styled from 'styled-components'

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const NavHeader = styled.nav`
  background-color: #f1f5f9;
  height: 60px;
  padding: 20px;
  padding-left: 30px;
  display: flex;
  align-items: center;
`
export const LogoImage = styled.img`
  height: 40px;
`

export const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 100px;
`

export const ProductsLoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  @media screen and (min-width: 768px) {
    width: 70%;
  }
`

export const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  align-items: center;
  background-color: #fff;
`

export const Image = styled.img`
  width: 300px;
  margin: 20px;
`

export const Heading = styled.h1`
  color: black;
  text-align: center;
  font-size: 30px;
`

export const Desc = styled.p`
  color: black;
  text-align: center;
  font-size: 20px;
`

export const Retry = styled.button`
  padding: 15px;
  color: blue;
  cursor: pointer;
`

export const SelectOption = styled.select`
  width: 150px;
`

export const ItemsList = styled.ul`
  display: flex;
  list-style-type: none;
  flex-wrap: wrap;
  width: 80%;
`

export const Options = styled.option`
  color: black;
`
