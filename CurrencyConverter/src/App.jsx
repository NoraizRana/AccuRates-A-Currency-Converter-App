import { useState } from "react";
import useCurrencyInfo from "./hooks/usecurrencyinfo";
import { InputBox } from "./components";

function App() {
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [convertedamount, setConvertedAmount] = useState(0);

  const currencyinfo = useCurrencyInfo(from);
  const options = Object.keys(currencyinfo);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedamount);
  };

  const convert = () => {
    const rate = currencyinfo[to]?.value;
    if (!rate || isNaN(amount) || amount === "") {
      setConvertedAmount(0);
      return;
    }
    setConvertedAmount(amount * rate);
  };

  if (!currencyinfo || Object.keys(currencyinfo).length === 0) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-black text-white font-sans">
        <p className="animate-pulse text-xl tracking-wide">Loading currency data...</p>
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-screen flex flex-col items-center justify-center font-sans overflow-auto"
      style={{
        backgroundImage: `url('/img/bgcurrency.jpg')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
    
      <div className="absolute inset-0 bg-black opacity-40 pointer-events-none z-0"></div>
      
    
      <div className="relative z-10 flex flex-col items-center w-full h-full">
 
        <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-5  mt-4 tracking-wider bg-gradient-to-r from-[#19c2ff] via-blue-400 to-fuchsia-500 bg-clip-text text-transparent drop-shadow-[0_2px_15px_rgba(30,64,175,0.3)] font-heading animate-fade-in-down [text-shadow:_0_1px_14px_rgba(0,0,0,0.6)]">
          AccuRates Global&copy;
        </h1>
       
        <div className="w-full max-w-lg mx-auto border border-blue-900/40 rounded-2xl p-8 shadow-2xl bg-white/10 backdrop-blur-md transition-transform transform hover:scale-105 hover:shadow-blue-400/40 duration-300 animate-fade-in-up">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
          
            <div className="w-full mb-4">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencychange={(currency) => setFrom(currency.toUpperCase())}
                onAmountchange={(amount) => setAmount(amount)}
                selectCurrency={from}
                className="transition-all duration-200 hover:ring-2 hover:ring-blue-400 text-md"
              />
            </div>
          
            <div className="relative w-full py-2 flex items-center justify-center">
              <button
                type="button"
                className="flex items-center gap-2 border-2 border-blue-400 rounded-md bg-gradient-to-r from-blue-600 to-fuchsia-600 text-white px-4 py-1.5 shadow-md hover:scale-110 hover:shadow-blue-300/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 active:scale-100"
                onClick={swap}
                aria-label="Swap currencies"
              >
                <svg className="w-5 h-5 animate-bounce-horizontal" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 17v2a2 2 0 002 2h12M20 7V5a2 2 0 00-2-2H6M7 14l-5-5m0 0l5-5m-5 5h18" />
                </svg>
                Swap
              </button>
            </div>
            
            <div className="w-full mt-4 mb-8">
              <InputBox
                label="To"
                amount={convertedamount}
                currencyOptions={options}
                onCurrencychange={(currency) => setTo(currency.toUpperCase())}
                selectCurrency={to}
                amountDisabled
                className="transition-all duration-200 hover:ring-2 hover:ring-fuchsia-400 text-md"
              />
            </div>
         
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-700 to-fuchsia-600 text-white px-6 py-3 rounded-xl font-semibold text-lg shadow-lg hover:from-fuchsia-600 hover:to-blue-700 hover:shadow-fuchsia-400/40 transition-all duration-300 active:scale-95 tracking-wider"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
       
        <footer className="mt-8 mb-4 px-6 py-3 bg-black/60 rounded-xl text-gray-100 text-sm shadow-md font-medium opacity-95 backdrop-blur-sm z-20 transition-all">
          &copy; {new Date().getFullYear()} AccuRates Global. Designed by <i>Noraiz Rana</i>.
        </footer>
      </div>
    </div>
  );
}

export default App;