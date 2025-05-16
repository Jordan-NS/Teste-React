import React from "react";
import Image from "next/image";
import { Tire } from "../types/tire";

interface ProductCardProps {
  tire: Tire;
}

const ProductCard = React.memo(({ tire }: ProductCardProps) => (
  <div className="flex flex-col xl:flex-row items-center bg-white rounded-2xl shadow-md p-4 md:p-6 gap-4 md:gap-6 xl:gap-8 max-w-4xl w-full mx-auto">
    <div className="flex flex-col items-center w-full xl:w-auto min-w-[100px] md:min-w-[140px] xl:min-w-[180px]">
      <Image
        src={tire.image}
        alt={`Imagem do pneu ${tire.model}`}
        width={120}
        height={120}
        priority
        className="object-contain w-[90px] h-[90px] md:w-[120px] md:h-[120px] xl:w-[140px] xl:h-[140px]"
      />
      <span className="mt-2 font-semibold text-base md:text-lg text-black text-center">{tire.model}</span>
    </div>

    <div className="hidden xl:block h-32 w-1 bg-black mx-1" />

    <div className="flex-1 flex flex-col gap-2 w-full">
      <h2 className="font-semibold text-lg md:text-xl mb-2 text-black text-center xl:text-left">{tire.name}</h2>
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-y-2 gap-x-4 md:gap-x-6 text-xs md:text-sm">
        <div>
          <span className="text-gray-500">Durabilidade</span>
          <div className="font-semibold text-black">{tire.treadwear}</div>
        </div>
        <div>
          <span className="text-gray-500">Tração</span>
          <div className="font-semibold text-black">{tire.traction}</div>
        </div>
        <div>
          <span className="text-gray-500">Temperatura</span>
          <div className="font-semibold text-black">{tire.temperature}</div>
        </div>
        <div>
          <span className="text-gray-500">Índice de velocidade</span>
          <div className="font-semibold text-black">{tire.speedRating}</div>
        </div>
        <div>
          <span className="text-gray-500">Capacidade de Carga</span>
          <div className="font-semibold text-black">{tire.loadIndex}</div>
        </div>
        <div>
          <span className="text-gray-500">Desenho</span>
          <div className="font-semibold text-black">{tire.pattern.charAt(0).toUpperCase() + tire.pattern.slice(1).toLowerCase()}</div>
        </div>
      </div>
    </div>
  </div>
));

ProductCard.displayName = 'ProductCard';

export default ProductCard;