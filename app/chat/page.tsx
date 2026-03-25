"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const suggestions = [
  "Book an appointment 📅",
  "Find a specialist 🩺",
  "I have chest pain, what should I do?",
  "What's the difference between Pro and Basic?",
];

// ── Inject keyframes + utility classes once, client-only ──
function useGlobalStyles() {
  useEffect(() => {
    const id = "medi-chat-styles";
    if (document.getElementById(id)) return;
    const el = document.createElement("style");
    el.id = id;
    el.textContent = `
      @keyframes mediTyping {
        0%,60%,100% { transform:translateY(0); opacity:.35; }
        30% { transform:translateY(-6px); opacity:1; }
      }
      @keyframes mediPulse {
        0%,100% { opacity:1; transform:scale(1); }
        50% { opacity:.6; transform:scale(.85); }
      }
      @keyframes mediFadeUp {
        from { opacity:0; transform:translateY(10px); }
        to   { opacity:1; transform:translateY(0); }
      }
      .medi-chip:hover {
        background: rgba(59,130,246,0.15) !important;
        border-color: rgba(59,130,246,0.5) !important;
        color: #bfdbfe !important;
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(59,130,246,0.15);
      }
      .medi-send:hover:not(:disabled) {
        transform: scale(1.06);
        box-shadow: 0 4px 18px rgba(37,99,235,0.5) !important;
      }
      .medi-send:active:not(:disabled) { transform:scale(.96); }
      .medi-msg { animation: mediFadeUp .28s ease both; }
      .medi-status-dot {
        width:7px; height:7px; border-radius:50%;
        background:#22c55e; box-shadow:0 0 6px #22c55e;
        display:inline-block;
        animation: mediPulse 2.5s ease-in-out infinite;
      }
      .medi-typing-dot {
        width:7px; height:7px; border-radius:50%;
        background:#3b82f6; display:inline-block;
        animation: mediTyping 1.3s ease-in-out infinite;
      }
      /* Markdown-style bold inside bubbles */
      .medi-bubble strong { font-weight: 700; }
      .medi-bubble br { display: block; content: ""; margin-top: 4px; }
    `;
    document.head.appendChild(el);
  }, []);
}

// ── Parse basic markdown: **bold** and newlines ──
function renderContent(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    // Handle newlines
    return part.split("\n").map((line, j, arr) => (
      <span key={`${i}-${j}`}>
        {line}
        {j < arr.length - 1 && <br />}
      </span>
    ));
  });
}

function AssistantAvatar() {
  return (
    <div style={{
      width:30,height:30,borderRadius:10,flexShrink:0,
      background:"linear-gradient(135deg,#1d4ed8,#0891b2)",
      display:"flex",alignItems:"center",justifyContent:"center",
      boxShadow:"0 0 12px rgba(59,130,246,0.3)",
    }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14l4-4h12c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
      </svg>
    </div>
  );
}

function UserAvatar() {
  return (
    <div style={{
      width:30,height:30,borderRadius:10,flexShrink:0,
      background:"rgba(59,130,246,0.1)",
      border:"1px solid rgba(59,130,246,0.2)",
      display:"flex",alignItems:"center",justifyContent:"center",
      color:"#93c5fd",
    }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
      </svg>
    </div>
  );
}

function TypingDots() {
  return (
    <div style={{display:"flex",alignItems:"center",gap:5}}>
      {[0,1,2].map((i) => (
        <span key={i} className="medi-typing-dot" style={{animationDelay:`${i*0.18}s`}}/>
      ))}
    </div>
  );
}

export default function ChatPage() {
  const router = useRouter();
  useGlobalStyles();

  const [messages, setMessages] = useState<Message[]>([]);
  const [input,    setInput]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const [focused,  setFocused]  = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior:"smooth" });
  }, [messages, loading]);

  const sendMessage = async (text?: string) => {
    const userMessage = (text ?? input).trim();
    if (!userMessage || loading) return;

    const newMessages: Message[] = [...messages, { role:"user", content:userMessage }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/send-confirmation/chat", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          message: userMessage,
          // Send full history so AI remembers the conversation
          history: messages,
        }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role:"assistant", content: data.reply ?? "Sorry, I couldn't get a response. Please try again." },
      ]);

      if (data.action) window.postMessage(data.action);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role:"assistant", content:"Connection issue. Please try again or reach us on WhatsApp: +20 100 674 1810" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const isEmpty = messages.length === 0;

  // Design tokens
  const font        = "'Sora', sans-serif";
  const mono        = "'JetBrains Mono', monospace";
  const textColor   = "#e2e8f0";
  const mutedColor  = "rgba(148,163,184,0.65)";
  const borderColor = "rgba(59,130,246,0.1)";
  const borderBright = "rgba(59,130,246,0.28)";

  return (
    <div style={{
      height:"100dvh",display:"flex",flexDirection:"column",
      background:"#050d1a",position:"relative",overflow:"hidden",
      fontFamily:font,color:textColor,
    }}>
      {/* Background orbs */}
      <div style={{position:"fixed",top:"-30%",left:"-15%",width:"70%",height:"70%",
        background:"radial-gradient(ellipse,rgba(59,130,246,0.07) 0%,transparent 65%)",
        pointerEvents:"none",zIndex:0}}/>
      <div style={{position:"fixed",bottom:"-25%",right:"-15%",width:"55%",height:"55%",
        background:"radial-gradient(ellipse,rgba(6,182,212,0.05) 0%,transparent 65%)",
        pointerEvents:"none",zIndex:0}}/>

      {/* ── HEADER ── */}
      <header
        style={{
          position:"relative",zIndex:10,
          display:"flex",alignItems:"center",gap:14,padding:"16px 24px",
          background:"rgba(5,13,26,0.85)",backdropFilter:"blur(24px)",
          borderBottom:`1px solid ${borderColor}`,
        }}
      >
        {/* 🔙 Back to Home */}
        <div
          onClick={() => router.push("/")}
          title="Back to home"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 36,
            height: 36,
            borderRadius: 10,
            cursor: "pointer",
            background: "rgba(59,130,246,0.08)",
            border: "1px solid rgba(59,130,246,0.2)",
            transition: "all .2s ease",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18l-6-6 6-6"
              stroke="#93c5fd"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div style={{
          width:40,height:40,borderRadius:12,flexShrink:0,
          background:"linear-gradient(135deg,#1d4ed8 0%,#0891b2 100%)",
          display:"flex",alignItems:"center",justifyContent:"center",
          boxShadow:"0 0 20px rgba(59,130,246,0.4),0 0 0 1px rgba(59,130,246,0.2)",
        }}>
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26C17.81 13.47 19 11.38 19 9c0-3.87-3.13-7-7-7z" fill="white"/>
            <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1z" fill="white" opacity="0.7"/>
          </svg>
        </div>

        <div style={{flex:1}}>
          <div style={{fontSize:15,fontWeight:600,color:textColor,letterSpacing:"-0.3px"}}>
            MediBook Assistant
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6,marginTop:2}}>
            <span className="medi-status-dot"/>
            <span style={{fontSize:11.5,color:mutedColor}}>
              {loading ? "Typing..." : "Online · Ready to help"}
            </span>
          </div>
        </div>

        {/* Clear chat button */}
        {!isEmpty && (
          <button
            onClick={() => setMessages([])}
            title="Clear chat"
            style={{
              background:"rgba(59,130,246,0.06)",
              border:"1px solid rgba(59,130,246,0.15)",
              borderRadius:10,padding:"6px 12px",
              color:mutedColor,fontSize:12,
              fontFamily:font,cursor:"pointer",
              transition:"all .2s",
            }}
          >
            Clear
          </button>
        )}

        <div style={{
          fontSize:10,fontWeight:700,padding:"4px 10px",borderRadius:20,
          background:"rgba(59,130,246,0.08)",border:"1px solid rgba(59,130,246,0.2)",
          color:"#93c5fd",letterSpacing:1,textTransform:"uppercase",fontFamily:mono,
        }}>AI</div>
      </header>

      {/* ── CHAT AREA ── */}
      <div style={{
        flex:1,overflowY:"auto",padding:"24px 18px",
        display:"flex",flexDirection:"column",gap:4,
        position:"relative",zIndex:1,
      }}>
        {isEmpty ? (
          <div style={{
            flex:1,display:"flex",flexDirection:"column",
            alignItems:"center",justifyContent:"center",
            gap:12,padding:"40px 24px",textAlign:"center",
            animation:"mediFadeUp .5s ease both",
          }}>
            <div style={{
              width:68,height:68,borderRadius:20,marginBottom:4,
              background:"linear-gradient(135deg,rgba(29,78,216,0.25),rgba(6,182,212,0.15))",
              border:`1px solid ${borderBright}`,
              display:"flex",alignItems:"center",justifyContent:"center",
              boxShadow:"0 0 40px rgba(59,130,246,0.12)",
            }}>
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                <defs>
                  <linearGradient id="medi-ig" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6"/>
                    <stop offset="100%" stopColor="#06b6d4"/>
                  </linearGradient>
                </defs>
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14l4-4h12c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" fill="url(#medi-ig)"/>
              </svg>
            </div>

            <div style={{fontSize:21,fontWeight:700,color:textColor,letterSpacing:"-0.5px"}}>
              Hi, I&apos;m your MediBook AI 👋
            </div>
            <div style={{fontSize:13.5,color:mutedColor,maxWidth:300,lineHeight:1.7}}>
              Ask me anything — health questions, booking help, finding the right doctor, or anything else.
            </div>

            <div style={{display:"flex",flexWrap:"wrap",gap:8,justifyContent:"center",marginTop:8}}>
              {suggestions.map((s) => (
                <button key={s} className="medi-chip" onClick={() => sendMessage(s)}
                  style={{
                    padding:"9px 16px",borderRadius:24,
                    border:`1px solid ${borderBright}`,
                    background:"rgba(59,130,246,0.05)",
                    color:"#93c5fd",fontSize:13,
                    fontFamily:font,cursor:"pointer",fontWeight:500,
                    whiteSpace:"nowrap",transition:"all .2s ease",
                  }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",marginBottom:4}}>
              <div style={{flex:1,height:1,background:borderColor}}/>
              <span style={{fontSize:11,color:mutedColor,fontFamily:mono,letterSpacing:"0.5px"}}>Today</span>
              <div style={{flex:1,height:1,background:borderColor}}/>
            </div>

            {messages.map((msg, i) => {
              const isUser = msg.role === "user";
              return (
                <div key={i} className="medi-msg"
                  style={{
                    display:"flex",justifyContent:isUser?"flex-end":"flex-start",
                    alignItems:"flex-end",gap:9,marginBottom:3,
                    animationDelay:`${Math.min(i,.1) * 0.04}s`,
                  }}>
                  {!isUser && <AssistantAvatar/>}
                  <div
                    className="medi-bubble"
                    style={{
                      maxWidth:"min(72%,600px)",
                      padding:"12px 16px",fontSize:14,lineHeight:1.7,fontWeight:400,
                      ...(isUser ? {
                        background:"linear-gradient(135deg,#1d4ed8,#2563eb)",
                        color:"#fff",
                        borderRadius:"18px 18px 4px 18px",
                        boxShadow:"0 4px 18px rgba(37,99,235,0.28)",
                      } : {
                        background:"#0d1b30",color:textColor,
                        border:`1px solid ${borderColor}`,
                        borderRadius:"18px 18px 18px 4px",
                        boxShadow:"0 2px 10px rgba(0,0,0,0.25)",
                      }),
                    }}>
                    {renderContent(msg.content)}
                  </div>
                  {isUser && <UserAvatar/>}
                </div>
              );
            })}
          </>
        )}

        {loading && (
          <div style={{display:"flex",alignItems:"flex-end",gap:9,marginBottom:3,animation:"mediFadeUp .28s ease both"}}>
            <AssistantAvatar/>
            <div style={{
              background:"#0d1b30",border:`1px solid ${borderColor}`,
              borderRadius:"18px 18px 18px 4px",padding:"14px 18px",
              boxShadow:"0 2px 10px rgba(0,0,0,0.25)",
            }}>
              <TypingDots/>
            </div>
          </div>
        )}

        <div ref={bottomRef}/>
      </div>

      {/* ── INPUT ── */}
      <div style={{
        position:"relative",zIndex:10,
        padding:"14px 18px 18px",
        background:"rgba(5,13,26,0.9)",backdropFilter:"blur(24px)",
        borderTop:`1px solid ${borderColor}`,
      }}>
        <div style={{
          display:"flex",alignItems:"center",gap:10,
          background:"#0d1b30",
          border:`1px solid ${focused ? borderBright : borderColor}`,
          borderRadius:15,padding:"6px 6px 6px 16px",
          transition:"border-color .2s,box-shadow .2s",
          boxShadow:focused?"0 0 0 3px rgba(59,130,246,0.15)":"none",
        }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key==="Enter"&&!e.shiftKey){ e.preventDefault(); sendMessage(); }
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Ask anything — health, doctors, bookings..."
            disabled={loading}
            autoComplete="off"
            style={{
              flex:1,background:"none",border:"none",outline:"none",
              color:textColor,fontSize:14,fontFamily:font,
              lineHeight:1.5,padding:"7px 0",
            }}
          />
          <button className="medi-send" onClick={() => sendMessage()}
            disabled={loading||!input.trim()}
            aria-label="Send message"
            style={{
              width:38,height:38,borderRadius:10,flexShrink:0,border:"none",
              background:loading||!input.trim()
                ?"rgba(59,130,246,0.12)"
                :"linear-gradient(135deg,#1d4ed8,#2563eb)",
              cursor:loading||!input.trim()?"not-allowed":"pointer",
              display:"flex",alignItems:"center",justifyContent:"center",
              boxShadow:"0 2px 10px rgba(37,99,235,0.35)",
              transition:"all .18s ease",
              opacity:loading||!input.trim()?0.5:1,
            }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="white">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </button>
        </div>

        <p style={{textAlign:"center",marginTop:9,fontSize:11,color:mutedColor,opacity:0.55}}>
          MediBook AI · Ask anything about health, doctors, or bookings
        </p>
      </div>
    </div>
  );
}
