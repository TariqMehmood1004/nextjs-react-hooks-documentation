// React Hooks Documentation with Sidebar Navigation

"use client";

import { useState, useEffect, useMemo, useCallback, useReducer, useId } from "react";
import { useTheme } from "../../context/ThemeContext";
import { Action } from "../../type/type";
import { Check, Copy, Menu, Moon, Sun, X } from "lucide-react";

const hookList = [
  "useState",
  "useEffect",
  "useContext",
  "useMemo",
  "useCallback",
  "useReducer",
  "useId",
];

export default function HooksDocumentation() {
  const [selectedHook, setSelectedHook] = useState<string>("useState");
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");
  const { theme, toggleTheme } = useTheme();
  const doubled = useMemo(() => count * 2, [count]);
  const handleClick = useCallback(() => setCount((c) => c + 1), []);
  const reducerFn = (state: number, action: Action): number => {
    switch (action.type) {
      case "increment":
        return state + 1;
      case "decrement":
        return state - 1;
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducerFn, 0);
  const userId = useId();

  useEffect(() => {
    setMessage("Component mounted or count changed");
  }, [count]);
  
  const [copied, setCopied] = useState<string | null>(null);

  const renderContent = () => {

    const handleCopy = (text: string) => {
      navigator.clipboard.writeText(text);
      setCopied(text);
      setTimeout(() => setCopied(null), 2000);
    };

    switch (selectedHook) {
      case "useState":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold">useState</h2>
            <p className={`
              text-xl text-gray-700 leading-relaxed mb-4
              ${theme === "dark" ? "text-slate-400" : ""}
              `}>Manages local component state.</p>

            <pre className="w-full max-w-4xl relative bg-gray-800 text-white p-4 rounded text-sm sm:text-base">
              <button
                onClick={() => handleCopy("const [count, setCount] = useState(0);")}
                className="cursor-pointer transition-all duration-300 absolute top-2 right-2 text-white bg-gray-600 p-2 rounded-full hover:bg-gray-500"
              >
                {copied === "const [count, setCount] = useState(0);" ? (
                  <Check className="w-4 h-4 text-green-400 animate-pulse transition-opacity duration-300" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
              <div className="overflow-x-auto">
                <code className="block whitespace-pre">
                {`const [count, setCount] = useState(0);`}
                </code>
              </div>
            </pre>

            <div className="flex flex-wrap items-center gap-2 mt-4">
              <button className="bg-gray-700 text-white p-2 px-3 rounded-lg hover:bg-gray-600" onClick={() => setCount(count - 1)}>Decrement</button>
              <span>{count}</span>
              <button className="bg-gray-700 text-white p-2 px-3 rounded-lg hover:bg-gray-600" onClick={() => setCount(count + 1)}>Increment</button>
            </div>
          </div>
        );

      case "useEffect":
        return (
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">useEffect</h2>
            <p className={`
              text-xl text-gray-700 leading-relaxed mb-4
              ${theme === "dark" ? "text-slate-400" : ""}
              `}>Runs side effects after render (like fetching data or subscriptions).</p>
            <pre className="w-full max-w-4xl relative bg-gray-800 text-white p-4 rounded text-sm sm:text-base">
              <button
                onClick={() => handleCopy("useEffect(() => {\n  // effect\n  return () => {\n    // cleanup\n  };\n}, [dependencies]);")}
                className="cursor-pointer transition-all duration-300 absolute top-2 right-2 text-white bg-gray-600 p-2 rounded-full hover:bg-gray-500"
              >
                {copied === "const [count, setCount] = useState(0);" ? (
                  <Check className="w-4 h-4 text-green-400 animate-pulse transition-opacity duration-300" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>

              <div className="overflow-x-auto">
                <code className="block whitespace-pre">
                  {`useEffect(() => {
                  // effect
                  return () => {
                    // cleanup
                  };
                }, [dependencies]);`}
                </code>
              </div>
            </pre>
            <p className={`
              text-xl text-gray-700 leading-relaxed mb-4
              ${theme === "dark" ? "text-slate-400" : ""}
              `}>{message}</p>
          </div>
        );

      case "useContext":
        return (
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">useContext</h2>
            <p className={`
              text-xl text-gray-700 leading-relaxed mb-4
              ${theme === "dark" ? "text-slate-400" : ""}
              `}>Accesses context values from React Context API.</p>
              <pre className="w-full max-w-4xl relative bg-gray-800 text-white p-4 rounded text-sm sm:text-base">
              <button
                onClick={() => handleCopy("const theme = useContext(ThemeContext);")}
                className="cursor-pointer transition-all duration-300 absolute top-2 right-2 text-white bg-gray-600 p-2 rounded-full hover:bg-gray-500"
              >
                {copied === "const [count, setCount] = useState(0);" ? (
                  <Check className="w-4 h-4 text-green-400 animate-pulse transition-opacity duration-300" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
              <div className="overflow-x-auto">
                <code className="block whitespace-pre">
                {`const theme = useContext(ThemeContext);`}
                </code>
              </div>
            </pre>
            <p className={`
              text-xl text-gray-700 leading-relaxed mb-4
              ${theme === "dark" ? "text-slate-400" : ""}
              `}>Theme: {theme}</p>
            <button className="bg-gray-700 text-white p-2 px-3 rounded-lg hover:bg-gray-600" onClick={toggleTheme}>Toggle Theme</button>
          </div>
        );

      case "useMemo":
        return (
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">useMemo</h2>
            <p className={`
              text-xl text-gray-700 leading-relaxed mb-4
              ${theme === "dark" ? "text-slate-400" : ""}
              `}>Memoizes a value to avoid expensive recalculations.</p>
            <pre className="w-full max-w-4xl relative bg-gray-800 text-white p-4 rounded text-sm sm:text-base">
              <button
                onClick={() => handleCopy("const doubled = useMemo(() => count * 2, [count]);")}
                className="cursor-pointer transition-all duration-300 absolute top-2 right-2 text-white bg-gray-600 p-2 rounded-full hover:bg-gray-500"
              >
                {copied === "const [count, setCount] = useState(0);" ? (
                  <Check className="w-4 h-4 text-green-400 animate-pulse transition-opacity duration-300" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
              <div className="overflow-x-auto">
                <code className="block whitespace-pre">
                {`const doubled = useMemo(() => count * 2, [count]);`}
                </code>
              </div>
            </pre>
            <p className={`
              text-xl text-gray-700 leading-relaxed mb-4
              ${theme === "dark" ? "text-slate-400" : ""}
              `}>Doubled: {doubled}</p>
          </div>
        );

      case "useCallback":
        return (
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">useCallback</h2>
            <p className={`
              text-xl text-gray-700 leading-relaxed mb-4
              ${theme === "dark" ? "text-slate-400" : ""}
              `}>Memoizes a function to prevent re-creation on each render.</p>
            <pre className="w-full max-w-4xl relative bg-gray-800 text-white p-4 rounded text-sm sm:text-base">
              <button
                onClick={() => handleCopy("const handleClick = useCallback(() => setCount(c => c + 1), []);")}
                className="cursor-pointer transition-all duration-300 absolute top-2 right-2 text-white bg-gray-600 p-2 rounded-full hover:bg-gray-500"
              >
                {copied === "const [count, setCount] = useState(0);" ? (
                  <Check className="w-4 h-4 text-green-400 animate-pulse transition-opacity duration-300" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
              <div className="overflow-x-auto">
                <code className="block whitespace-pre">
                {`const handleClick = useCallback(() => setCount(c => c + 1), []);`}
                </code>
              </div>
            </pre>
            <p className={`
              text-xl text-gray-700 leading-relaxed mb-4
              ${theme === "dark" ? "text-slate-400" : ""}
              `}>Count: {count}</p>
            <button className="bg-gray-700 text-white p-2 px-3 rounded-lg hover:bg-gray-600" onClick={handleClick}>Increment</button>
          </div>
        );

      case "useReducer":
        return (
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">useReducer</h2>
            <p className={`
              text-xl text-gray-700 leading-relaxed mb-4
              ${theme === "dark" ? "text-slate-400" : ""}
              `}>Manages complex state logic using a reducer function.</p>
            <pre className="w-full max-w-4xl relative bg-gray-800 text-white p-4 rounded text-sm sm:text-base">
              <button
                onClick={() => handleCopy("const [state, dispatch] = useReducer(reducer, initialState);")}
                className="cursor-pointer transition-all duration-300 absolute top-2 right-2 text-white bg-gray-600 p-2 rounded-full hover:bg-gray-500"
              >
                {copied === "const [count, setCount] = useState(0);" ? (
                  <Check className="w-4 h-4 text-green-400 animate-pulse transition-opacity duration-300" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
              <div className="overflow-x-auto">
                <code className="block whitespace-pre">
                {`const [state, dispatch] = useReducer(reducer, initialState);`}
                </code>
              </div>
            </pre>
            <p className={`
              text-xl text-gray-700 leading-relaxed mb-4
              ${theme === "dark" ? "text-slate-400" : ""}
              `}>State: {state}</p>
            <button className="bg-gray-700 text-white p-2 px-3 rounded-lg hover:bg-gray-600" onClick={() => dispatch({ type: "increment" })}>Increment</button>
            <button className="bg-gray-700 text-white p-2 px-3 rounded-lg hover:bg-gray-600" onClick={() => dispatch({ type: "decrement" })}>Decrement</button>
          </div>
        );

      case "useId":
        return (
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">useId</h2>
            <p className={`
              text-xl text-gray-700 leading-relaxed mb-4
              ${theme === "dark" ? "text-slate-400" : ""}
              `}>Generates unique ID for accessibility or SSR consistency.</p>
            <pre className="w-full max-w-4xl relative bg-gray-800 text-white p-4 rounded text-sm sm:text-base">
              <button
                onClick={() => handleCopy("const id = useId();")}
                className="cursor-pointer transition-all duration-300 absolute top-2 right-2 text-white bg-gray-600 p-2 rounded-full hover:bg-gray-500"
              >
                {copied === "const [count, setCount] = useState(0);" ? (
                  <Check className="w-4 h-4 text-green-400 animate-pulse transition-opacity duration-300" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
              <div className="overflow-x-auto">
                <code className="block whitespace-pre">
                  {`const id = useId();`}
                </code>
              </div>
            </pre>
            <p className={`
              text-xl text-gray-700 leading-relaxed mb-4
              ${theme === "dark" ? "text-slate-400" : ""}
              `}>ID: {userId}</p>
          </div>
        );

      default:
        return null;
    }
  };

  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
  <div
    className={`
      flex w-full min-h-screen
      ${theme === "dark" ? "bg-slate-900" : "bg-gray-100"}
    `}
  >
    {/* Mobile Nav Toggle */}
    <button
      className="md:hidden fixed top-4 right-4 z-50 bg-gray-800 text-white p-2 rounded shadow-lg"
      onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
    >
      {isMobileNavOpen ? (
        <X className="w-6 h-6" />
      ) : (
        <Menu className="w-6 h-6" />
      )}
    </button>

    {/* Sidebar */}
    <aside
      className={`
        fixed top-0 left-0 z-40 transform transition-transform duration-300
        w-full md:w-64 h-screen p-4
        ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white"}
        ${isMobileNavOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:block
      `}
    >
      <h1 className="text-xl font-bold mb-4">React Hooks</h1>
      <ul className="space-y-2">
        {hookList.map((hook) => (
          <li
            key={hook}
            className={`cursor-pointer p-2 rounded transition-all duration-200
              ${
                selectedHook === hook
                  ? theme === "dark"
                    ? "bg-gray-700 text-white font-semibold"
                    : "bg-gray-200 text-black font-semibold"
                  : theme === "dark"
                    ? "text-white hover:bg-gray-700"
                    : "text-black hover:bg-gray-200"
              }
            `}
            onClick={() => {
              setSelectedHook(hook);
              setIsMobileNavOpen(false); // Close sidebar on mobile
            }}
          >
            {hook}
          </li>
        ))}
      </ul>
    </aside>

    {/* Main Content */}
    <main
      className={`
        flex-1 min-h-screen space-y-4 overflow-auto p-5 overflow-y-scroll overflow-x-hidden xs:p-3 md:px-8 shadow-inner
        ${theme === "dark" ? "text-white" : "bg-white"}
      `}
    >
      {/* Header with Theme Toggle Icons */}
      <div className="flex items-center justify-end mb-4">
        <h1 className="text-2xl font-bold hidden">React Hooks</h1>
        <div className="flex items-center">
          <button
            onClick={toggleTheme}
            className="cursor-pointer transition-all duration-300"
          >
            {theme === "dark" ? (
              <Sun className="w-6 h-6" />
            ) : (
              <Moon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
      <div className="mt-4">
        {renderContent()}
      </div>
    </main>
  </div>
);
}
