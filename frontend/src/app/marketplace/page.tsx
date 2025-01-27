"use client";
const products = [
  {
    id: 1,
    name: "NFT Pack",
    description: "A pack of 3 random football NFTs.",
    price: 100, // en puntos
    image: "images/pack.png",
  },
  {
    id: 2,
    name: "NFT Pack",
    description: "A pack of 3 random Boxers NFTs.",
    price: 100, // en puntos
    image: "images/pack.png",
  },
  {
    id: 3,
    name: "NFT Pack",
    description: "A pack of 3 random Boxers NFTs.",
    price: 100, // en puntos
    image: "images/pack.png",
  },
];

import { useEffect, useState } from "react";
import { useBetting } from "@/hooks/useBetting";
import { Toaster, toast } from "sonner";

export default function Marketplace() {
  const { connectContract, redeemPointsForPack } = useBetting();
  const [loading, setLoading] = useState(false); // Estado de carga
  const [nftsDelivered, setNftsDelivered] = useState(false); // Estado para manejar la entrega de NFTs

  // Conectar al contrato cuando se carga el componente
  useEffect(() => {
    connectContract();
  }, []);

  // Manejar la compra de un producto
  const handleBuy = async () => {
    setLoading(true); // Mostrar loader
    setNftsDelivered(false); // Resetear el estado de entrega de NFTs
    try {
      // Aquí pasar la dirección del contrato de GameStakeNFT para redimir el pack
      // Llamar a la función del contrato para redimir puntos
      await redeemPointsForPack();

      setLoading(false); // Quitar el loader cuando la transacción se confirme
      setNftsDelivered(true); // Mostrar que los NFTs fueron entregados
      toast.success("Successful purchase!"); // Mostrar notificación de
    } catch (error) {
      setLoading(false); // Quitar el loader en caso de error
      toast.error("Error al realizar la compra: " + (error as Error).message); // Mostrar notificación de error
      alert("Error al realizar la compra: " + (error as Error).message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  p-10">
      <h1 className="text-4xl font-bold  mb-10 text-white">Marketplace</h1>
      {loading && (
        <div className="flex items-center justify-center space-x-2">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-t-transparent border-blue-600 rounded-full"></div>
          <span className="text-blue-600 font-semibold">
            Processing the purchase...
          </span>
        </div>
      )}

      <div
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl w-full ${
          loading ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded-md mb-4 p h-fit"
            />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {product.name}
            </h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-xl font-bold text-gray-700 mb-6">
              Price: {product.price} points
            </p>
            <button
              onClick={() => handleBuy()}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Buy
            </button>
            <Toaster />
          </div>
        ))}
      </div>
    </div>
  );
}
