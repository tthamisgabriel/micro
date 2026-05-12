import { formatCurrency } from "@shared/formatCurrency";

export default function OrderItem({ item }) {
  return (
    <li className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3">
      <div>
        <p className="font-semibold text-slate-900">{item.name}</p>
        <p className="text-sm text-slate-500">
          {item.quantity}x item{item.quantity > 1 ? "s" : ""}
        </p>
      </div>
      <span className="text-sm font-semibold text-slate-700">
        {formatCurrency(item.price * item.quantity)}
      </span>
    </li>
  );
}
