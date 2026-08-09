// UWAGA: ten import musi zostać PIERWSZY i nie wolno go sortować alfabetycznie.
// Ewaluacja modułów ES idzie w kolejności importów, a drei instaluje handlery
// DefaultLoadingManager w momencie ewaluacji swojego Progress.js — musi to się
// stać przed useGLTF.preload w ciele modułu laptop.tsx.
import LoadingScreen from './loading/LoadingScreen.tsx'
import Navbar from './components/navbar/main.tsx'
import MainPage from './components/mainPage/main.tsx'
import AboutUs from './components/aboutUs/main.tsx'
import Projects from './components/Projects/main.tsx'
import Kontakt from './components/Kontakt/main.tsx'
import Technologies from './components/technologies/main.tsx'
import './style.css'

export default () => {
  return (
    <>
      <LoadingScreen />
      <div className="App scrollbar-hidden min-h-screen pt-36">
        <Navbar />
        <MainPage />
        <Projects />
        <AboutUs />
        <Technologies />
        <Kontakt />
      </div>
    </>
  )
}

