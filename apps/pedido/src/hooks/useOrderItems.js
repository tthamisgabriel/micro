import { useEffect, useState } from "react";
import { getOrderItems, subscribeToOrder } from "@shared/orderBus";

// The hook abstracts the event subscription so the UI stays focused on rendering.
export function useOrderItems() {
  const [items, setItems] = useState(() => getOrderItems());

  useEffect(() => subscribeToOrder(setItems), []);

  return items;
}
