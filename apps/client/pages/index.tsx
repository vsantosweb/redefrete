import _nav from '../nav'
import { Navigation } from '@redefrete/components'
import { Page } from './_app'

const Home: Page = () => {

  return (<Navigation list={_nav} />)
}

Home.config = {
  title: 'Painel de Controle',
  layout: 'AccountLayout'
}

export default Home