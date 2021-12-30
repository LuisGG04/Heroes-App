import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "../components/ui/NavBar";
import { DcScreen } from "../components/Dc/DcScreen";
import { MarvelScreen } from "../components/Marvel/MarvelScreen";
import { SearchScreen } from "../components/search/SearchScreen";
import { HeroScreen } from "../components/hero/HeroScreen";

export const DashboardRoutes = () => {
    return (
        <>
            <Navbar />
            <div className="container">

                <Routes>
                    <Route path="marvel" element={<MarvelScreen />} />
                    <Route path="dc" element={<DcScreen />} />
                    <Route path="search" element={<SearchScreen />} />
                    <Route path="hero/:heroeId" element={<HeroScreen />} />
                    <Route path="/" element={<MarvelScreen />} />
                </Routes>

            </div>
        </>
    );
}
