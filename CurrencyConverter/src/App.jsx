import { useState } from 'react'
import UseCurrencyInfo from './hooks/usecurrencyinfo'
import { InputBox } from './components'; 

function App() {
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("USD");
const [to, setTo] = useState("INR");
  const [convertedamount, setConvertedAmount] = useState(0);

  const currencyinfo = UseCurrencyInfo(from);

  const options = Object.keys(currencyinfo);

  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedamount)
  }
  const convert = () => {
  setConvertedAmount(amount * (currencyinfo[to]?.value || 0));

  }

  if (!currencyinfo || Object.keys(currencyinfo).length === 0) {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-black text-white">
      <p>Loading currency data...</p>
    </div>
  );
}



  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
  backgroundImage: `url('/img/bgcurrency.jpg')`,
}}

    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();

            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
               onCurrencychange={(currency) => setFrom(currency.toUpperCase())}
                onAmountchange={(amount) => setAmount(amount)}
                selectCurrency={from}

              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}
              >
                swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedamount}
                currencyOptions={options}
                onCurrencychange={(currency) => setTo(currency.toUpperCase())}
                selectCurrency={to}
                amountDisabled
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App
