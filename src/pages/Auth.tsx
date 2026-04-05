import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../integration/client";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) navigate("/dashboard");
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate("/dashboard");
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { display_name: displayName },
          emailRedirectTo: window.location.origin,
        },
      });
      if (error) setError(error.message);
      else setSuccess("Check your email to confirm your account!");
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--black)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      position: "relative",
      overflow: "hidden",
    }}>
      <div className="orb-pink" style={{ top: "-200px", right: "-100px" }} />
      <div className="orb-teal" style={{ bottom: "-200px", left: "-100px" }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: "100%",
          maxWidth: "440px",
          background: "rgba(15,18,32,0.85)",
          backdropFilter: "blur(24px)",
          border: "1px solid var(--border)",
          borderRadius: "24px",
          padding: "48px 40px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Top gradient line */}
        <div style={{
          position: "absolute",
          top: 0, left: "15%", right: "15%",
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(240,160,192,0.6), rgba(110,212,200,0.6), transparent)",
        }} />

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "20px" }}>
            <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "11px", color: "var(--muted)", fontWeight: 300 }}>00.</span>
            <div style={{ width: "18px", height: "1px", background: "var(--border-mid)" }} />
            <span style={{ fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--teal)", fontWeight: 300 }}>
              {isLogin ? "Welcome back" : "Join the constellation"}
            </span>
          </div>

          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "42px",
            fontWeight: 300,
            letterSpacing: "-0.04em",
            lineHeight: 0.95,
            color: "var(--white)",
          }}>
            {isLogin ? "Sign " : "Create "}
            <em style={{ fontStyle: "italic", color: "var(--pink)", fontWeight: 300 }}>
              {isLogin ? "in" : "account"}
            </em>
          </h1>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <AnimatePresence mode="wait">
            {!isLogin && (
              <motion.div
                key="name"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <label style={{ fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted-mid)", fontWeight: 300, marginBottom: "6px", display: "block" }}>
                  Display name
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Your name"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    background: "var(--surface2)",
                    border: "1px solid var(--border-mid)",
                    borderRadius: "12px",
                    color: "var(--white)",
                    fontSize: "14px",
                    fontFamily: "'Outfit', sans-serif",
                    outline: "none",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = "var(--teal)"}
                  onBlur={(e) => e.currentTarget.style.borderColor = "var(--border-mid)"}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div>
            <label style={{ fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted-mid)", fontWeight: 300, marginBottom: "6px", display: "block" }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              style={{
                width: "100%",
                padding: "12px 16px",
                background: "var(--surface2)",
                border: "1px solid var(--border-mid)",
                borderRadius: "12px",
                color: "var(--white)",
                fontSize: "14px",
                fontFamily: "'Outfit', sans-serif",
                outline: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = "var(--teal)"}
              onBlur={(e) => e.currentTarget.style.borderColor = "var(--border-mid)"}
            />
          </div>

          <div>
            <label style={{ fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted-mid)", fontWeight: 300, marginBottom: "6px", display: "block" }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
              style={{
                width: "100%",
                padding: "12px 16px",
                background: "var(--surface2)",
                border: "1px solid var(--border-mid)",
                borderRadius: "12px",
                color: "var(--white)",
                fontSize: "14px",
                fontFamily: "'Outfit', sans-serif",
                outline: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = "var(--pink)"}
              onBlur={(e) => e.currentTarget.style.borderColor = "var(--border-mid)"}
            />
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ fontSize: "12px", color: "var(--pink-bright)", padding: "8px 12px", background: "var(--pink-dim)", borderRadius: "8px", border: "1px solid rgba(240,160,192,0.2)" }}
            >
              {error}
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ fontSize: "12px", color: "var(--teal)", padding: "8px 12px", background: "var(--teal-dim)", borderRadius: "8px", border: "1px solid rgba(110,212,200,0.2)" }}
            >
              {success}
            </motion.div>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ y: -2, boxShadow: "0 0 44px rgba(240,160,192,0.25)" }}
            whileTap={{ scale: 0.98 }}
            className="hover-target"
            data-cursor="click"
            style={{
              marginTop: "8px",
              padding: "14px",
              background: "linear-gradient(135deg, var(--pink), var(--teal))",
              border: "none",
              borderRadius: "14px",
              color: "var(--black)",
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              cursor: "none",
              fontFamily: "'Outfit', sans-serif",
              opacity: loading ? 0.6 : 1,
              transition: "opacity 0.2s",
            }}
          >
            {loading ? "..." : isLogin ? "Sign in" : "Create account"}
          </motion.button>
        </form>

        {/* Toggle */}
        <div style={{ marginTop: "24px", textAlign: "center" }}>
          <button
            onClick={() => { setIsLogin(!isLogin); setError(""); setSuccess(""); }}
            className="hover-target"
            data-cursor="click"
            style={{
              background: "none",
              border: "none",
              color: "var(--muted-mid)",
              fontSize: "12px",
              cursor: "none",
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 300,
              letterSpacing: "0.03em",
            }}
          >
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span style={{ color: "var(--teal)", fontWeight: 400 }}>
              {isLogin ? "Sign up" : "Sign in"}
            </span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
