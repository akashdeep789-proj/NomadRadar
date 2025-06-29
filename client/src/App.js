import React, { useState, useEffect, useCallback } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import Header from './components/Header'
import Home from './components/Home'
import Footer from './components/Footer'
import Admin from './components/Admin'
import './App.css'
import { AdminProvider } from './utils/Context/admin'
import { UserProvider } from './utils/Context/user'
import Other from './components/Other'
import {
    getServices,
    getTrending,
    getCarousel,
    getAdvtBanner,
    getDestinations,
    getPrices,
} from './api/admin'
import Bookings from './components/Bookings'
import Individual from './components/Individual'
import Forgot from './components/PasswordReset/Forgot'
import Update from './components/PasswordReset/Update'
import CreateOwn from './components/CreateOwn'

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [carousel, setCarousel] = useState([])
    const [services, setServices] = useState([])
    const [trending, setTrending] = useState([])
    const [advt, setAdvt] = useState([])
    const [destinations, setDestinations] = useState([])
    const [prices, setPrices] = useState({})

    // fetch functions wrapped in useCallback
    const fetchCarousel = useCallback(async () => {
        let response = await getCarousel()
        setCarousel(response.data)
    }, [])

    const fetchServices = useCallback(async () => {
        let response = await getServices()
        setServices(response.data)
    }, [])

    const fetchTrending = useCallback(async () => {
        let response = await getTrending()
        setTrending(response.data)
    }, [])

    const fetchAdvt = useCallback(async () => {
        let response = await getAdvtBanner()
        setAdvt(response.data)
    }, [])

    const fetchDestinations = useCallback(async () => {
        let response = await getDestinations()
        setDestinations(response.data)
    }, [])

    const fetchPrices = useCallback(async () => {
        let response = await getPrices()
        setPrices(response.data)
    }, [])

    // useEffects with correct dependencies
    useEffect(() => {
        fetchCarousel().catch((err) => console.log(err.message))
    }, [fetchCarousel])

    useEffect(() => {
        fetchServices().catch((err) => console.log(err.message))
    }, [fetchServices])

    useEffect(() => {
        fetchTrending().catch((err) => console.log(err.message))
    }, [fetchTrending])

    useEffect(() => {
        fetchAdvt().catch((err) => console.log(err.message))
    }, [fetchAdvt])

    useEffect(() => {
        fetchDestinations().catch((err) => console.log(err.message))
    }, [fetchDestinations])

    useEffect(() => {
        fetchPrices().catch((err) => console.log(err.message))
    }, [fetchPrices])

    return (
        <Router>
            {window.location.pathname === '/' && <Redirect to="/user" />}
            <div className="app">
                <Route exact path="/admin">
                    <AdminProvider>
                        <Admin />
                    </AdminProvider>
                </Route>

                <UserProvider>
                    <Route path="/user">
                        <Header
                            isModalOpen={isModalOpen}
                            setIsModalOpen={setIsModalOpen}
                        />
                    </Route>

                    <Route
                        exact
                        path="/user"
                        render={(props) => (
                            <Home
                                carouselData={carousel}
                                servicesData={services}
                                trendingServices={trending}
                                setIsModalOpen={setIsModalOpen}
                                advtData={advt.length >= 1 ? advt[0] : null}
                                {...props}
                            />
                        )}
                    />

                    <Route exact path="/user/treks">
                        <Other
                            tab={'Treks'}
                            servicesData={services}
                            advtData={advt.length >= 2 ? advt[1] : null}
                        />
                    </Route>
                    <Route exact path="/user/camps">
                        <Other
                            tab={'Camps'}
                            servicesData={services}
                            advtData={advt.length >= 3 ? advt[2] : null}
                        />
                    </Route>
                    <Route exact path="/user/packages">
                        <Other
                            tab={'Packages'}
                            servicesData={services}
                            advtData={advt.length >= 4 ? advt[3] : null}
                        />
                    </Route>
                    <Route exact path="/user/bookings">
                        <Bookings
                            setIsModalOpen={setIsModalOpen}
                            advtData={advt.length >= 5 ? advt[4] : null}
                        />
                    </Route>
                    <Route
                        path="/user/service/:serviceID"
                        render={(props) => (
                            <Individual
                                {...props}
                                setIsModalOpen={setIsModalOpen}
                                advtData={advt.length >= 6 ? advt[5] : null}
                            />
                        )}
                    />
                    <Route path="/user/create-own">
                        <CreateOwn
                            destinationsData={destinations}
                            pricesData={prices}
                            setIsModalOpen={setIsModalOpen}
                        />
                    </Route>

                    <Route path="/user" component={Footer} />

                    <Route exact path="/password-reset/forgot">
                        <Forgot />
                    </Route>
                    <Route
                        path="/password-reset/:userID/:token"
                        render={(props) => <Update {...props} />}
                    />
                </UserProvider>
            </div>
        </Router>
    )
}

export default App
