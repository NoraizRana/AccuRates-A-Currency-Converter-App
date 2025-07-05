import { useEffect, useState } from "react";

function useCurrencyInfo(baseCurrency) {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(
      `https://api.currencyapi.com/v3/latest?apikey=cur_live_JEbrasFUeQkBohBfzYzNTULlpqQSAt6JJ3WWq0z2&base_currency=${baseCurrency.toUpperCase()}`
    )
      .then((res) => res.json())
      .then((res) => setData(res.data))
      .catch((err) => console.error("CurrencyAPI error:", err));
  }, [baseCurrency]);

  return data;
}

export default useCurrencyInfo;