import { useEffect, useState } from "react";

function UseCurrencyInfo(baseCurrency) {
  const [data, setData] = useState({});

  useEffect(() => {
   fetch(`Your_Api_Key=${baseCurrency.toUpperCase()}`)

      .then((res) => res.json())
      .then((res) => setData(res.data))
      .catch((err) => console.error("CurrencyAPI error:", err));
  }, [baseCurrency]);

  return data;
}

export default UseCurrencyInfo;
