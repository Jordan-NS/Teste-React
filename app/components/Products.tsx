'use client';

import { useEffect, useState, useMemo } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { Tire } from "../types/tire";
import ProductCard from "./ProductCard";
import { useDebounce } from "use-debounce";

export default function Products() {
  const [tires, setTires] = useState<Tire[]>([]);
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery] = useDebounce(query, 300);

  useEffect(() => {
    const fetchTires = async () => {
      const response = await fetch('/api/products');
      const data = await response.json();
      setTires(data);
    };

    fetchTires();
  }, []);

  const filteredTires = useMemo(() => {
    const q = debouncedQuery.toLowerCase();

    return tires.filter(
      (tire) => 
        tire.name.toLowerCase().includes(q) || 
        tire.cars.some((car) => car.toLowerCase().includes(q))
    );
  }, [debouncedQuery, tires]);

  return (
    <div className="w-full flex justify-center flex-col h-full px-2 sm:px-0">
      <div className="border-gray-500 w-full sm:w-1/2 mx-auto mb-4">
        <label htmlFor="search" className="block text-sm/6 font-medium text-gray-900">
          Pesquisa
        </label>
        <div className="mt-2 grid grid-cols-1">
          <input
            id="search"
            name="search"
            type="search"
            placeholder="Pesquisar produtos"
            className="col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pl-10 pr-3 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:pl-9 sm:text-sm/6"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            data-testid="search-input"
          />
          <MagnifyingGlassIcon
            aria-hidden="true"
            className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400 sm:size-4"
          />
        </div>
      </div>

      <div className="mb-4 border-b border-1"></div>
      <div>
        {filteredTires.length === 0 ? (
          <p className="text-center text-gray-600 mt-4">
            Nenhum produto encontrado
          </p>
        ) : (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-2">
            {filteredTires.map((tire) => (
              <ProductCard key={tire.name} tire={tire} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}