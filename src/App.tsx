import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Sections from './components/Sections.jsx'
import ChatWidget from './components/ChatWidget.jsx'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Navbar />
      <main id="main">
        <Hero />
        <Sections />
      </main>
      <ChatWidget />
    </>
  )
}
