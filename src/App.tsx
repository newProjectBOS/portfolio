import Navbar from './components/navbar/main.tsx'
import MainPage from './components/mainPage/main.tsx'
import AboutUs from './components/aboutUs/main.tsx'
import HorizontalView from './components/HorizontalView/main.tsx'
import Projects from './components/Projects/main.tsx'
import Kontakt from './components/Kontakt/main.tsx'
import './style.css'

export default () => {
  return (
    <div className="App scrollbar-hidden min-h-screen pt-36">
      <Navbar />
      <MainPage />
      <AboutUs />
      <HorizontalView />
      <Projects />
      <Kontakt />
    </div>
  )
}

