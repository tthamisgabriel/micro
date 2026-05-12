import React, { Suspense, useEffect, useMemo, useState } from "react";
import SectionPanel from "./components/SectionPanel";
import { clearOrder, getOrderItems, subscribeToOrder } from "@shared/orderBus";
import { formatCurrency } from "@shared/formatCurrency";

const CardapioApp = React.lazy(() => import("cardapio/MenuApp"));
const PedidoApp = React.lazy(() => import("pedido/OrderApp"));

function LoadingState({ label }) {
  return (
    <div className="rounded-2xl border border-dashed border-white/20 bg-white/5 p-6 text-sm text-slate-300">
      {label}
    </div>
  );
}

export default function App() {
  const [items, setItems] = useState(() => getOrderItems());

  useEffect(() => subscribeToOrder(setItems), []);

  const summary = useMemo(() => {
    const total = items.reduce((accumulator, item) => accumulator + item.price, 0);

    return {
      count: items.length,
      total
    };
  }, [items]);

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <header className="grid gap-6 rounded-3xl border border-white/10 bg-gradient-to-r from-orange-500 to-amber-400 p-8 text-slate-950 shadow-panel lg:grid-cols-[1.5fr_1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em]">Container App</p>
          <h1 className="mt-4 text-4xl font-bold">Restaurante em Micro Frontends</h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-900/75">
            O container importa os micros de cardapio e pedido com Module Federation e
            mantem a experiencia integrada usando eventos globais compartilhados.
          </p>
        </div>

        <div className="rounded-3xl bg-black/10 p-6">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-slate-900/75">
            Resumo do pedido
          </p>
          <div className="mt-5 grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white/50 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-700">Itens</p>
              <p className="mt-2 text-3xl font-bold">{summary.count}</p>
            </div>
            <div className="rounded-2xl bg-white/50 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-700">Total</p>
              <p className="mt-2 text-3xl font-bold">{formatCurrency(summary.total)}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={clearOrder}
            className="mt-5 inline-flex rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Limpar pedido
          </button>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionPanel
          eyebrow="Micro frontend"
          title="Cardapio"
          description="Lista de pratos disponiveis com acao de adicionar ao pedido."
        >
          <Suspense fallback={<LoadingState label="Carregando cardapio..." />}>
            <CardapioApp />
          </Suspense>
        </SectionPanel>

        <SectionPanel
          eyebrow="Micro frontend"
          title="Pedido"
          description="Visualizacao reativa dos itens selecionados pelo cliente."
        >
          <Suspense fallback={<LoadingState label="Carregando pedido..." />}>
            <PedidoApp />
          </Suspense>
        </SectionPanel>
      </div>
    </main>
  );
}
