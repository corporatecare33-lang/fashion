import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, CreditCard, Loader2 } from "lucide-react";

export type PaymentMethod = "bkash" | "nagad" | "card";

const themes: Record<PaymentMethod, { name: string; bg: string; accent: string }> = {
  bkash: { name: "bKash", bg: "#e2136e", accent: "#d11264" },
  nagad: { name: "Nagad", bg: "#ec1c24", accent: "#f7941d" },
  card: { name: "Card Payment", bg: "#1a1a1a", accent: "#d4af37" },
};

export function PaymentModal({
  method, amount, open, onClose, onSuccess,
}: {
  method: PaymentMethod | null; amount: number; open: boolean;
  onClose: () => void; onSuccess: () => void;
}) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [account, setAccount] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [pin, setPin] = useState("");
  const [card, setCard] = useState({ num: "", exp: "", cvv: "", name: "" });
  const [loading, setLoading] = useState(false);

  if (!method) return null;
  const theme = themes[method];

  const reset = () => { setStep(1); setAccount(""); setOtp(["", "", "", "", "", ""]); setPin(""); setCard({ num: "", exp: "", cvv: "", name: "" }); setLoading(false); };

  const handleStep1 = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep(2); }, 700);
  };
  const handleStep2 = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Card flow goes straight to success; mobile wallets go to PIN step
      if (method === "card") {
        setStep(4);
        setTimeout(() => { onSuccess(); reset(); }, 1200);
      } else {
        setStep(3);
      }
    }, 900);
  };
  const handleStep3 = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false); setStep(4);
      setTimeout(() => { onSuccess(); reset(); }, 1200);
    }, 900);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={() => { onClose(); reset(); }}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white rounded-lg w-full max-w-sm overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-3" style={{ backgroundColor: theme.bg }}>
              <div className="flex items-center gap-2 text-white">
                <span className="bg-white text-[10px] font-bold px-2 py-0.5 rounded" style={{ color: theme.bg }}>{theme.name}</span>
                <span className="font-semibold text-sm">Payment</span>
              </div>
              <button onClick={() => { onClose(); reset(); }} className="text-white/90 hover:text-white"><X className="h-4 w-4" /></button>
            </div>
            <div className="p-5">
              <p className="text-xs text-gray-500">Merchant</p>
              <p className="font-semibold text-gray-900">NOORÉVA</p>
              <p className="text-xs text-gray-500 mt-3">Amount</p>
              <p className="text-2xl font-bold" style={{ color: theme.bg }}>৳{amount.toLocaleString()}</p>
              <div className="border-t border-gray-200 my-4" />
              {step === 1 && method !== "card" && (
                <>
                  <label className="text-sm text-gray-700">Your {theme.name} account number</label>
                  <input value={account} onChange={(e) => setAccount(e.target.value)} placeholder="01YYXXXXXXX" maxLength={11} className="mt-2 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-gray-500 text-gray-900" />
                  <p className="text-[11px] text-gray-500 mt-2 flex items-center gap-1"><Check className="h-3 w-3 text-emerald-600" /> Your {theme.name} account details are never stored. Demo flow — no real charge.</p>
                  <button disabled={account.length < 11 || loading} onClick={handleStep1} className="mt-4 w-full text-white font-semibold py-2.5 rounded disabled:opacity-50 inline-flex items-center justify-center gap-2" style={{ backgroundColor: theme.bg }}>
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Proceed"}
                  </button>
                </>
              )}
              {step === 1 && method === "card" && (
                <>
                  <label className="text-sm text-gray-700">Card Number</label>
                  <div className="relative mt-2"><CreditCard className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" /><input value={card.num} onChange={(e) => setCard({ ...card, num: e.target.value })} placeholder="1234 5678 9012 3456" maxLength={19} className="w-full pl-9 border border-gray-300 rounded px-3 py-2 text-gray-900" /></div>
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <div><label className="text-sm text-gray-700">Expiry</label><input value={card.exp} onChange={(e) => setCard({ ...card, exp: e.target.value })} placeholder="MM/YY" maxLength={5} className="mt-2 w-full border border-gray-300 rounded px-3 py-2 text-gray-900" /></div>
                    <div><label className="text-sm text-gray-700">CVV</label><input value={card.cvv} onChange={(e) => setCard({ ...card, cvv: e.target.value })} placeholder="123" maxLength={4} className="mt-2 w-full border border-gray-300 rounded px-3 py-2 text-gray-900" /></div>
                  </div>
                  <label className="text-sm text-gray-700 mt-3 block">Cardholder Name</label>
                  <input value={card.name} onChange={(e) => setCard({ ...card, name: e.target.value })} placeholder="Jane Doe" className="mt-2 w-full border border-gray-300 rounded px-3 py-2 text-gray-900" />
                  <button disabled={!card.num || !card.exp || !card.cvv || !card.name || loading} onClick={handleStep2} className="mt-4 w-full text-white font-semibold py-2.5 rounded disabled:opacity-50 inline-flex items-center justify-center" style={{ backgroundColor: theme.bg }}>
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Pay Now"}
                  </button>
                </>
              )}
              {step === 2 && method !== "card" && (
                <>
                  <p className="text-xs text-gray-600">A verification code has been sent to <span className="font-semibold">{account}</span></p>
                  <p className="text-sm text-gray-700 mt-4">Enter 6-digit OTP</p>
                  <div className="mt-2 grid grid-cols-6 gap-2">
                    {otp.map((v, i) => (
                      <input key={i} value={v} onChange={(e) => { const n = [...otp]; n[i] = e.target.value.slice(-1); setOtp(n); const nxt = document.getElementById(`otp-${i+1}`); if (e.target.value && nxt) (nxt as HTMLInputElement).focus(); }} id={`otp-${i}`} maxLength={1} className="text-center border border-gray-300 rounded py-2 text-gray-900 font-bold" />
                    ))}
                  </div>
                  <button disabled={otp.some((x) => !x) || loading} onClick={handleStep2} className="mt-4 w-full text-white font-semibold py-2.5 rounded disabled:opacity-50 inline-flex items-center justify-center" style={{ backgroundColor: theme.bg }}>
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Proceed"}
                  </button>
                </>
              )}
              {step === 3 && method !== "card" && (
                <>
                  <p className="text-xs text-gray-600">Enter your <span className="font-semibold">{theme.name}</span> PIN to confirm payment of <span className="font-semibold">৳{amount.toLocaleString()}</span></p>
                  <label className="text-sm text-gray-700 mt-4 block">{theme.name} PIN</label>
                  <input
                    type="password"
                    inputMode="numeric"
                    value={pin}
                    onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 5))}
                    placeholder="• • • • •"
                    maxLength={5}
                    className="mt-2 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-gray-500 text-gray-900 tracking-[0.4em] text-center font-bold"
                  />
                  <p className="text-[11px] text-gray-500 mt-2 flex items-center gap-1"><Check className="h-3 w-3 text-emerald-600" /> Your PIN is encrypted and never stored. Demo flow — no real charge.</p>
                  <button disabled={pin.length < 4 || loading} onClick={handleStep3} className="mt-4 w-full text-white font-semibold py-2.5 rounded disabled:opacity-50 inline-flex items-center justify-center" style={{ backgroundColor: theme.bg }}>
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Confirm Payment"}
                  </button>
                </>
              )}
              {step === 4 && (
                <div className="text-center py-6">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-16 h-16 rounded-full mx-auto flex items-center justify-center" style={{ backgroundColor: theme.bg }}>
                    <Check className="h-8 w-8 text-white" strokeWidth={3} />
                  </motion.div>
                  <p className="mt-4 font-semibold text-gray-900">Payment Successful</p>
                  <p className="text-xs text-gray-500 mt-1">Redirecting…</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}