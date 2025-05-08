import { Provider } from 'react-redux'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './assets/style/main.css'

import { UserMsg } from './cmps/UserMsg'
import { AppFooter } from './cmps/AppFooter'
import { AppHeader } from './cmps/AppHeader'
import { AboutUs } from './pages/AboutUs'
import { ToyIndex } from './pages/ToyIndex'
import { store } from './store/store'
import { HomePage } from './pages/HomePage'

export function App() {
    const obj = {
        className: 'main-layout app',
    }
    return (
        <Provider store={store}>
            <Router>
                <section {...obj}>
                    <AppHeader />
                    <main>
                        <Routes>
                            <Route element={<HomePage />} path="/" />
                            <Route element={<AboutUs />} path="/about" />
                            <Route element={<ToyIndex />} path="/toy" />
                        </Routes>
                    </main>
                    <AppFooter />
                </section>
            </Router>
            <UserMsg />
        </Provider>
    )
}
