'use client'
import NavbarHeader from "./components/NavBarHeader";
import SwipperCarrossel from "./components/SwipperCarrossel";

export default function Page() {
  return (
    <NavbarHeader titulo="Inicial">
      <SwipperCarrossel></SwipperCarrossel>
    </NavbarHeader>
  );
}