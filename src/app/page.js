'use client'
import CardsFilmes from "./components/CardsFilmes";
import NavbarHeader from "./components/NavBarHeader";
import SwipperCarrossel from "./components/SwipperCarrossel";

export default function Page() {

  return (
    <NavbarHeader titulo="Inicial">
      <SwipperCarrossel></SwipperCarrossel>
      <CardsFilmes></CardsFilmes>
    </NavbarHeader>
  );
}