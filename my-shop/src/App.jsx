import { ToastContainer } from 'react-toastify'
import Header from './layouts/Header'
import Footer from './layouts/Footer'
import PageContent from './layouts/PageContent'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faInstagram, faFacebook, faTwitter, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faMagnifyingGlass, faCartShopping, faPhone, faChartSimple, faLocationDot, faEye, faBorderAll, faListCheck, faAngleDown, faAngleUp, faBars, faCheck, faX, faXmark, faLeftLong, faTrash, faPlus, faUserLarge, faRightFromBracket, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faUser, faHeart, faEnvelope, faClock } from '@fortawesome/free-regular-svg-icons'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { autoLoginAction } from './store/actions/UserActions'
import { fetchCategories } from './store/actions/GlobalActions'
library.add(faInstagram, faFacebook, faTwitter, faLinkedin, faYoutube, faMagnifyingGlass, faListCheck, faBorderAll, faAngleDown, faAngleUp, faBars, faCheck, faX, faXmark, faLeftLong, faCartShopping, faTrash, faPlus, faUserLarge, faRightFromBracket, faLocationDot, faPhone, faChartSimple, faUser, faHeart, faEnvelope, faClock, faEye, faArrowRight)
function App() {
  const dispatch = useDispatch();
  const [autoLoginLoading, setAutoLoginLoading] = useState(true)
  useEffect(() => {
    dispatch(autoLoginAction(setAutoLoginLoading));
    dispatch(fetchCategories());
  }, [])

  if (autoLoginLoading) return ""

  return (
    <>
      <div className='min-h-screen flex flex-col justify-between'>
        <div>
          <Header />
          <PageContent />
        </div>
        <Footer />
      </div>
      <ToastContainer />
    </>
  )
}

export default App