const ORDER_EVENT = "restaurant:order-updated";
const STORE_KEY = "__restaurantOrderItems__";

function ensureStore() {
  if (typeof window === "undefined") {
    return [];
  }

  if (!Array.isArray(window[STORE_KEY])) {
    window[STORE_KEY] = [];
  }

  return window[STORE_KEY];
}

function publish(items) {
  window[STORE_KEY] = items;
  window.dispatchEvent(new CustomEvent(ORDER_EVENT, { detail: items }));
  return items;
}

export function getOrderItems() {
  return [...ensureStore()];
}

export function addOrderItem(item) {
  return publish([...ensureStore(), item]);
}

export function clearOrder() {
  return publish([]);
}

// This keeps each micro frontend independent while still sharing browser state.
export function subscribeToOrder(listener) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handleOrderChange = (event) => {
    listener(event.detail);
  };

  window.addEventListener(ORDER_EVENT, handleOrderChange);
  listener(getOrderItems());

  return () => {
    window.removeEventListener(ORDER_EVENT, handleOrderChange);
  };
}
