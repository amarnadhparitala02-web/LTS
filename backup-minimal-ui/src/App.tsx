import { useEffect, useState } from 'react'
import { About } from './components/About'
import { Approach } from './components/Approach'
import { Contact } from './components/Contact'
import { Faq } from './components/Faq'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Privacy } from './components/Privacy'
import { Services } from './components/Services'

const isPrivacy = () => window.location.hash === '#/privacy'

export default function App() {
  const [privacy, setPrivacy] = useState(isPrivacy)

  useEffect(() => {
    const onChange = () => {
      setPrivacy(isPrivacy())
      if (isPrivacy()) window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  useEffect(() => {
    document.title = privacy ? 'Privacy notice — LTS Digital Solutions' : 'LTS Digital Solutions | Websites, Apps & Software'
  }, [privacy])

  return (
    <>
      <Header />
      <main id="main">
        {privacy ? (
          <Privacy />
        ) : (
          <>
            <Hero />
            <Services />
            <Approach />
            <About />
            <Faq />
            <Contact />
          </>
        )}
      </main>
      <Footer />
    </>
  )
}
