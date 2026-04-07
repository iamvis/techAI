import { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = (id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  };

  const addToast = ({ message, type = "success", duration = 4000 }) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const toast = { id, message, type };

    setToasts((current) => [...current, toast]);

    window.setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="pointer-events-none fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto w-full max-w-sm rounded-3xl border px-4 py-4 shadow-xl transition ${
              toast.type === "error"
                ? "border-rose-700 bg-rose-600 text-white"
                : "border-slate-700 bg-slate-950 text-white"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-200">
                  {toast.type === "error" ? "Error" : "Success"}
                </p>
                <p className="mt-2 text-sm leading-6 text-white">{toast.message}</p>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-white/80 transition hover:text-white"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  return useContext(ToastContext);
};
