import { useState } from "react";
import "./styles.css";
import DishCard from "./components/DishCard";
import { dishes } from "./data/dishes";
import { addOrderItem, getOrderItems } from "@shared/orderBus";

export default function App() {
  const [lastAddedId, setLastAddedId] = useState("");
  const [selectedCount, setSelectedCount] = useState(() => getOrderItems().length);

  const handleAddDish = (dish) => {
    const nextItems = addOrderItem(dish);
    setLastAddedId(dish.id);
    setSelectedCount(nextItems.length);

    window.setTimeout(() => {
      setLastAddedId((currentValue) => (currentValue === dish.id ? "" : currentValue));
    }, 1400);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-orange-100 bg-gradient-to-r from-orange-100 to-amber-50 p-5">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-700">
          Micro Cardapio
        </p>
        <h2 className="mt-3 text-2xl font-bold text-slate-900">Escolha seu prato favorito</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Os itens adicionados aqui sao publicados em um evento global e consumidos pelo micro
          de pedido.
        </p>
        <p className="mt-4 text-sm font-medium text-slate-700">
          Itens selecionados agora: <span className="font-bold text-orange-700">{selectedCount}</span>
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {dishes.map((dish) => (
          <DishCard
            key={dish.id}
            dish={dish}
            onAdd={handleAddDish}
            isHighlighted={lastAddedId === dish.id}
          />
        ))}
      </div>
    </div>
  );
}
