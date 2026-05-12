import { useMemo } from "react";
import "./styles.css";
import OrderItem from "./components/OrderItem";
import { useOrderItems } from "./hooks/useOrderItems";
import { clearOrder } from "@shared/orderBus";
import { formatCurrency } from "@shared/formatCurrency";

export default function App() {
  const items = useOrderItems();

  const groupedItems = useMemo(() => {
    const grouped = new Map();

    items.forEach((item) => {
      const currentItem = grouped.get(item.id) || { ...item, quantity: 0 };
      currentItem.quantity += 1;
      grouped.set(item.id, currentItem);
    });

    return Array.from(grouped.values());
  }, [items]);

  const total = useMemo(
    () => groupedItems.reduce((accumulator, item) => accumulator + item.price * item.quantity, 0),
    [groupedItems]
  );

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-panel">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
          Micro Pedido
        </p>
        <h2 className="mt-3 text-2xl font-bold text-slate-900">Itens escolhidos</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Este micro escuta o evento global compartilhado e reage sempre que um prato e
          adicionado no cardapio.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Resumo</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{formatCurrency(total)}</p>
          </div>
          <button
            type="button"
            onClick={clearOrder}
            className="inline-flex rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-orange-400 hover:text-orange-600"
          >
            Limpar pedido
          </button>
        </div>

        {groupedItems.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-8 text-center text-sm text-slate-500">
            Nenhum item foi adicionado ainda.
          </div>
        ) : (
          <ul className="mt-6 space-y-3">
            {groupedItems.map((item) => (
              <OrderItem key={item.id} item={item} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
