import { formatCurrency } from "@shared/formatCurrency";

export default function DishCard({ dish, onAdd, isHighlighted }) {
  return (
    <article className="flex h-full flex-col rounded-3xl border border-orange-100 bg-white p-5 shadow-panel transition hover:-translate-y-1">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="inline-flex rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
            {dish.tag}
          </span>
          <h3 className="mt-4 text-xl font-semibold text-slate-900">{dish.name}</h3>
        </div>
        <span className="text-sm font-semibold text-orange-600">{formatCurrency(dish.price)}</span>
      </div>

      <p className="mt-4 flex-1 text-sm leading-6 text-slate-600">{dish.description}</p>

      <button
        type="button"
        onClick={() => onAdd(dish)}
        className="mt-6 inline-flex items-center justify-center rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
      >
        {isHighlighted ? "Adicionado!" : "Adicionar ao pedido"}
      </button>
    </article>
  );
}
