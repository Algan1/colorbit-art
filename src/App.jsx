import { useEffect, useMemo, useRef, useState } from "react";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { onDisconnect, onValue, ref, set } from "firebase/database";
import { auth, database, googleProvider } from "./lib/firebase";

const translations = {
  tr: {
    eyebrow: "Hazır setler ve renk kodları",
    heroTitle: "Tasarımına yakışan renkleri saniyeler içinde seç.",
    liveLabel: "Şu anda çevrim içi",
    featuredTitle: "Öne çıkan set",
    metricSets: "Renk seti",
    metricSingles: "Tekli renk",
    metricFamilies: "Renk ailesi",
    tabsTitle: "Renk alanları",
    tabPalettes: "Renk Setleri",
    tabSingles: "Tekli Renkler",
    tabCreate: "Set Oluştur",
    searchLabel: "Renk ara",
    searchPlaceholder: "Örnek: mavi, sıcak, #2563eb",
    familyLabel: "Renk ailesi",
    familyAll: "Tüm aileler",
    sortLabel: "Sıralama",
    languageLabel: "Dil",
    loginButton: "Google ile giriş",
    logoutButton: "Çıkış yap",
    memberActive: "Üyelik aktif",
    lockedTitle: "Üyelere özel içerik",
    lockedText: "Bu içeriği açmak için Google ile giriş yapman gerekiyor.",
    lockedButton: "Google ile giriş",
    reactionLoginRequired: "Beğeni için giriş yap",
    copy: "Kopyala",
    copied: "Kopyalandı",
    palettesCount: (shown, total) => `${shown} / ${total} renk seti gösteriliyor`,
    singlesCount: (shown, total) => `${shown} / ${total} tekli renk gösteriliyor`,
    favoritesSaved: (count) => `${count} favori kaydedildi`,
    noFavorites: "Henüz favori yok",
    generatorTitle: "Kurallı rastgele set üretici",
    generatorText: "Renk çemberinden ana rengi seç, sistem uyum kuralına göre 5'li palet üretsin.",
    generatorBaseLabel: "Ana renk",
    generatorHarmonyLabel: "Uyum tipi",
    generatorHarmonyRandom: "Rastgele (Kurallı)",
    generatePaletteButton: "Set üret",
    extractorTitle: "Görselden renk çıkar",
    extractorText: "Bir görsel yükleyip en baskın 5 rengi otomatik çıkar.",
    extractorInputLabel: "Görsel yükle",
    extractPaletteButton: "Renkleri çıkar",
    manualPickHint: "Görselde bir noktaya tıklayarak manuel renk alabilirsin.",
    extractStatusIdle: "Henüz görsel seçilmedi.",
    extractStatusNoFile: "Lütfen önce bir görsel seç.",
    extractStatusDone: (count) => `${count} renk çıkarıldı.`,
    extractStatusPicked: (hex) => `Seçilen piksel rengi: ${hex}`,
    sortOptions: {
      default: "Varsayılan sıralama",
      likes: "En çok beğenilen",
      hearts: "En çok kalp alan",
      claps: "En çok alkış alan",
      favorites: "En çok favorilenen",
      dislikes: "En çok beğenilmeyen",
      favorites_only: "Sadece favoriler",
    },
    reactions: {
      like: "Beğen",
      dislike: "Beğenme",
      heart: "Kalp",
      clap: "Alkış",
      favorite: "Favori",
    },
    harmony: {
      analogous: "Analog",
      complementary: "Tamamlayıcı",
      triadic: "Üçlü uyum",
      split: "Bölünmüş tamamlayıcı",
      tetradic: "Dörtlü uyum",
    },
  },
  en: {
    eyebrow: "Curated palettes and color codes",
    heroTitle: "Choose colors that fit your design in seconds.",
    liveLabel: "Online now",
    featuredTitle: "Featured palette",
    metricSets: "Palettes",
    metricSingles: "Single colors",
    metricFamilies: "Color families",
    tabsTitle: "Color areas",
    tabPalettes: "Color Palettes",
    tabSingles: "Single Colors",
    tabCreate: "Create Palette",
    searchLabel: "Search colors",
    searchPlaceholder: "Example: blue, warm, #2563eb",
    familyLabel: "Color family",
    familyAll: "All families",
    sortLabel: "Sort",
    languageLabel: "Language",
    loginButton: "Sign in with Google",
    logoutButton: "Log out",
    memberActive: "Membership active",
    lockedTitle: "Members only content",
    lockedText: "Sign in with Google to unlock this content.",
    lockedButton: "Sign in with Google",
    reactionLoginRequired: "Sign in to react",
    copy: "Copy",
    copied: "Copied",
    palettesCount: (shown, total) => `Showing ${shown} / ${total} palettes`,
    singlesCount: (shown, total) => `Showing ${shown} / ${total} single colors`,
    favoritesSaved: (count) => `${count} favorites saved`,
    noFavorites: "No favorites yet",
    generatorTitle: "Rule-based random palette generator",
    generatorText: "Pick a base color from the wheel and generate a 5-color harmony palette.",
    generatorBaseLabel: "Base color",
    generatorHarmonyLabel: "Harmony type",
    generatorHarmonyRandom: "Random (Rule-based)",
    generatePaletteButton: "Generate palette",
    extractorTitle: "Extract colors from image",
    extractorText: "Upload an image and auto-extract the top 5 dominant colors.",
    extractorInputLabel: "Upload image",
    extractPaletteButton: "Extract colors",
    manualPickHint: "Click on the image to pick a pixel color manually.",
    extractStatusIdle: "No image selected yet.",
    extractStatusNoFile: "Please choose an image first.",
    extractStatusDone: (count) => `${count} colors extracted.`,
    extractStatusPicked: (hex) => `Picked pixel color: ${hex}`,
    sortOptions: {
      default: "Default order",
      likes: "Most liked",
      hearts: "Most hearted",
      claps: "Most clapped",
      favorites: "Most favorited",
      dislikes: "Most disliked",
      favorites_only: "Favorites only",
    },
    reactions: {
      like: "Like",
      dislike: "Dislike",
      heart: "Heart",
      clap: "Clap",
      favorite: "Favorite",
    },
    harmony: {
      analogous: "Analogous",
      complementary: "Complementary",
      triadic: "Triadic",
      split: "Split complementary",
      tetradic: "Tetradic",
    },
  },
};

const familyData = [
  { family: "Blue", label: "Mavi", colors: ["#eff6ff", "#dbeafe", "#bfdbfe", "#93c5fd", "#60a5fa", "#3b82f6", "#2563eb", "#1d4ed8", "#1e40af", "#1e3a8a", "#172554"] },
  { family: "Sky", label: "Gökyüzü", colors: ["#f0f9ff", "#e0f2fe", "#bae6fd", "#7dd3fc", "#38bdf8", "#0ea5e9", "#0284c7", "#0369a1", "#075985", "#0c4a6e", "#082f49"] },
  { family: "Emerald", label: "Zümrüt", colors: ["#ecfdf5", "#d1fae5", "#a7f3d0", "#6ee7b7", "#34d399", "#10b981", "#059669", "#047857", "#065f46", "#064e3b", "#022c22"] },
  { family: "Rose", label: "Gül", colors: ["#fff1f2", "#ffe4e6", "#fecdd3", "#fda4af", "#fb7185", "#f43f5e", "#e11d48", "#be123c", "#9f1239", "#881337", "#4c0519"] },
  { family: "Amber", label: "Amber", colors: ["#fffbeb", "#fef3c7", "#fde68a", "#fcd34d", "#fbbf24", "#f59e0b", "#d97706", "#b45309", "#92400e", "#78350f", "#451a03"] },
  { family: "Orange", label: "Turuncu", colors: ["#fff7ed", "#ffedd5", "#fed7aa", "#fdba74", "#fb923c", "#f97316", "#ea580c", "#c2410c", "#9a3412", "#7c2d12", "#431407"] },
  { family: "Violet", label: "Mor", colors: ["#f5f3ff", "#ede9fe", "#ddd6fe", "#c4b5fd", "#a78bfa", "#8b5cf6", "#7c3aed", "#6d28d9", "#5b21b6", "#4c1d95", "#2e1065"] },
  { family: "Slate", label: "Gri", colors: ["#f8fafc", "#f1f5f9", "#e2e8f0", "#cbd5e1", "#94a3b8", "#64748b", "#475569", "#334155", "#1e293b", "#0f172a", "#020617"] },
];

const curatedSeeds = [
  { key: "northern-light", name: "Kuzey Işığı", desc: "Mavi, turkuaz ve yeşil geçişleriyle ferah bir dijital görünüm.", harmony: "analogous", colors: ["#0ea5e9", "#06b6d4", "#14b8a6", "#10b981", "#d1fae5"] },
  { key: "coral-sand", name: "Mercan ve Kum", desc: "Sıcak mercan tonlarıyla krem ve koyu denge.", harmony: "complementary", colors: ["#fff7ed", "#fed7aa", "#fb7185", "#ea580c", "#7c2d12"] },
  { key: "royal-pop", name: "Kraliyet Pop", desc: "Lacivert, mor ve pembe birlikteliğiyle güçlü durur.", harmony: "triadic", colors: ["#312e81", "#4f46e5", "#a855f7", "#f472b6", "#fdf2f8"] },
  { key: "forest-cream", name: "Orman ve Krem", desc: "Doğal yeşil tonlarını sıcak nötrlerle buluşturur.", harmony: "analogous", colors: ["#ecfdf5", "#a7f3d0", "#34d399", "#166534", "#fef3c7"] },
  { key: "midnight-citrus", name: "Gece ve Narenciye", desc: "Koyu zemin üzerinde canlı sarı ve turuncu vurgu.", harmony: "split", colors: ["#0f172a", "#1e293b", "#facc15", "#f59e0b", "#fdba74"] },
  { key: "studio-soft", name: "Stüdyo Soft", desc: "Krem, lavanta ve açık mavi ile sakin denge.", harmony: "tetradic", colors: ["#faf5ff", "#ddd6fe", "#dbeafe", "#fecdd3", "#fff7ed"] },
];

function buildExtraPalettes() {
  const out = [];
  familyData.forEach((f, index) => {
    for (let start = 0; start <= f.colors.length - 5; start += 1) {
      out.push({
        key: `mono-${f.family.toLowerCase()}-${start + 1}`,
        name: `${f.label} Tonları ${start + 1}`,
        desc: `${f.label} ailesinde açık-koyu dengeli 5'li set.`,
        harmony: "analogous",
        colors: f.colors.slice(start, start + 5),
      });
    }
    const next = familyData[(index + 1) % familyData.length];
    const third = familyData[(index + 2) % familyData.length];
    for (let v = 0; v < 3; v += 1) {
      out.push({
        key: `mix-${f.family.toLowerCase()}-${next.family.toLowerCase()}-${v + 1}`,
        name: `${f.label} x ${next.label} ${v + 1}`,
        desc: `${f.label}, ${next.label} ve ${third.label} ailelerinden harman set.`,
        harmony: v % 2 ? "triadic" : "complementary",
        colors: [f.colors[v], f.colors[v + 3], next.colors[v + 4], third.colors[v + 6], next.colors[v + 8]],
      });
    }
  });
  return out;
}

const palettes = [...curatedSeeds, ...buildExtraPalettes()];
const singleCards = familyData.flatMap((f) =>
  f.colors.map((hex, i) => ({
    id: `${f.family}-${i + 1}`,
    family: f.family,
    familyLabel: f.label,
    name: `${f.label} ${i + 1}`,
    hex,
  }))
);

const reactionIcons = { like: "👍", dislike: "👎", heart: "♥", clap: "👏", favorite: "★" };
const metricMap = { likes: "like", hearts: "heart", claps: "clap", favorites: "favorite", dislikes: "dislike" };
const adsenseClient = import.meta.env.VITE_ADSENSE_CLIENT;
const presenceSessionKey = "colorArchivePresenceSessionV1";

function clamp(v, min, max) { return Math.min(max, Math.max(min, v)); }
function nh(v) { return ((v % 360) + 360) % 360; }
function rgbHex({ r, g, b }) { return `#${[r, g, b].map((n) => n.toString(16).padStart(2, "0")).join("")}`.toUpperCase(); }
function hexRgb(hex) { const v = parseInt(hex.replace("#", ""), 16); return { r: (v >> 16) & 255, g: (v >> 8) & 255, b: v & 255 }; }

function hsvRgb({ h, s, v }) {
  const hh = nh(h) / 60;
  const ss = clamp(s, 0, 100) / 100;
  const vv = clamp(v, 0, 100) / 100;
  const c = vv * ss;
  const x = c * (1 - Math.abs((hh % 2) - 1));
  const m = vv - c;
  let r = 0, g = 0, b = 0;
  if (hh < 1) [r, g] = [c, x];
  else if (hh < 2) [r, g] = [x, c];
  else if (hh < 3) [g, b] = [c, x];
  else if (hh < 4) [g, b] = [x, c];
  else if (hh < 5) [r, b] = [x, c];
  else [r, b] = [c, x];
  return { r: Math.round((r + m) * 255), g: Math.round((g + m) * 255), b: Math.round((b + m) * 255) };
}

function rgbHsl({ r, g, b }) {
  const rr = r / 255, gg = g / 255, bb = b / 255;
  const max = Math.max(rr, gg, bb), min = Math.min(rr, gg, bb), d = max - min;
  let h = 0;
  if (d) {
    if (max === rr) h = ((gg - bb) / d) % 6;
    else if (max === gg) h = (bb - rr) / d + 2;
    else h = (rr - gg) / d + 4;
  }
  const l = (max + min) / 2;
  const s = d ? d / (1 - Math.abs(2 * l - 1)) : 0;
  return { h: nh(h * 60), s: s * 100, l: l * 100 };
}

function hslRgb({ h, s, l }) {
  const hh = nh(h) / 60, ss = clamp(s, 0, 100) / 100, ll = clamp(l, 0, 100) / 100;
  const c = (1 - Math.abs(2 * ll - 1)) * ss, x = c * (1 - Math.abs((hh % 2) - 1)), m = ll - c / 2;
  let r = 0, g = 0, b = 0;
  if (hh < 1) [r, g] = [c, x];
  else if (hh < 2) [r, g] = [x, c];
  else if (hh < 3) [g, b] = [c, x];
  else if (hh < 4) [g, b] = [x, c];
  else if (hh < 5) [r, b] = [x, c];
  else [r, b] = [c, x];
  return { r: Math.round((r + m) * 255), g: Math.round((g + m) * 255), b: Math.round((b + m) * 255) };
}

function genPalette(baseHex, mode) {
  const base = rgbHsl(hexRgb(baseHex));
  const pick = mode === "random" ? ["analogous", "complementary", "triadic"][Math.floor(Math.random() * 3)] : mode;
  const map = {
    analogous: [[-36, -8, 12], [-18, -4, 6], [0, 0, 0], [18, 4, -6], [36, 6, -12]],
    complementary: [[0, 0, 8], [18, 8, 0], [180, 0, -2], [198, 6, -8], [-14, -8, 12]],
    triadic: [[0, -8, 12], [0, 0, 0], [120, 8, -6], [240, 6, -10], [120, -6, 10]],
  };
  return {
    harmony: pick,
    colors: map[pick].map((s) => rgbHex(hslRgb({ h: base.h + s[0], s: clamp(base.s + s[1], 20, 95), l: clamp(base.l + s[2], 14, 90) }))),
  };
}

function dist(a, b) { return Math.sqrt((a.r - b.r) ** 2 + (a.g - b.g) ** 2 + (a.b - b.b) ** 2); }

function dominant(imageData, limit = 5) {
  const m = new Map();
  const d = imageData.data;
  const step = 24;
  for (let i = 0; i < d.length; i += 16) {
    if (d[i + 3] < 140) continue;
    const r = Math.round(d[i] / step) * step, g = Math.round(d[i + 1] / step) * step, b = Math.round(d[i + 2] / step) * step;
    const k = `${r},${g},${b}`;
    m.set(k, (m.get(k) || 0) + 1);
  }
  const ranked = [...m.entries()].sort((a, b) => b[1] - a[1]).map(([k]) => {
    const [r, g, b] = k.split(",").map(Number);
    return { r, g, b };
  });
  const out = [];
  ranked.forEach((c) => { if (out.length < limit && out.every((p) => dist(c, p) > 44)) out.push(c); });
  while (out.length < limit && ranked[out.length]) out.push(ranked[out.length]);
  return out.slice(0, limit).map(rgbHex);
}

export default function App() {
  const [language, setLanguage] = useState("tr");
  const lang = translations[language] || translations.tr;
  const [themeDark, setThemeDark] = useState(false);
  const [tab, setTab] = useState("create");
  const [user, setUser] = useState(null);
  const [liveUsers, setLiveUsers] = useState(0);
  const [paletteSearch, setPaletteSearch] = useState("");
  const [singleSearch, setSingleSearch] = useState("");
  const [family, setFamily] = useState("all");
  const [paletteSort, setPaletteSort] = useState("default");
  const [singleSort, setSingleSort] = useState("default");
  const [copied, setCopied] = useState("");
  const [reactions, setReactions] = useState({});
  const [baseColor, setBaseColor] = useState("#2563EB");
  const [mode, setMode] = useState("random");
  const [gen, setGen] = useState(() => genPalette("#2563EB", "random"));
  const [extractColors, setExtractColors] = useState([]);
  const [extractStatus, setExtractStatus] = useState(lang.extractStatusIdle);
  const [manual, setManual] = useState("");
  const [imageReady, setImageReady] = useState(false);
  const wheelRef = useRef(null);
  const thumbRef = useRef(null);
  const imageRef = useRef(null);
  const presenceSessionRef = useRef(null);

  async function handleGoogleSignIn() {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Google sign-in failed", error);
    }
  }

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!adsenseClient) return undefined;

    const existing = document.querySelector(`script[data-adsense-client="${adsenseClient}"]`);
    if (existing) return undefined;

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-adsense-client", adsenseClient);
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  useEffect(() => {
    setExtractStatus(lang.extractStatusIdle);
  }, [language]);

  useEffect(() => { document.body.classList.toggle("theme-dark", themeDark); }, [themeDark]);
  useEffect(() => {
    const reactionRef = ref(database, "reactions");
    const unsubscribe = onValue(reactionRef, (snapshot) => {
      setReactions(snapshot.val() || {});
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const presenceRootRef = ref(database, "presence");
    const connectedRef = ref(database, ".info/connected");
    const unsubscribePresence = onValue(presenceRootRef, (snapshot) => {
      setLiveUsers(snapshot.exists() ? Object.keys(snapshot.val()).length : 0);
    });

    let sessionId = window.sessionStorage.getItem(presenceSessionKey);
    if (!sessionId) {
      sessionId = window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`;
      window.sessionStorage.setItem(presenceSessionKey, sessionId);
    }

    presenceSessionRef.current = ref(database, `presence/${sessionId}`);
    const unsubscribeConnected = onValue(connectedRef, async (snapshot) => {
      if (!snapshot.val()) return;
      try {
        await onDisconnect(presenceSessionRef.current).remove();
        await set(presenceSessionRef.current, {
          path: window.location.pathname,
          updatedAt: Date.now(),
        });
      } catch (error) {
        console.error("Presence sync failed", error);
      }
    });

    return () => {
      unsubscribePresence();
      unsubscribeConnected();
      if (presenceSessionRef.current) {
        set(presenceSessionRef.current, null).catch(() => {});
      }
    };
  }, []);
  useEffect(() => { setGen(genPalette(baseColor, mode)); }, [baseColor, mode]);

  const userId = user?.uid || null;

  function ensureLogin() {
    if (userId) return true;
    handleGoogleSignIn();
    return false;
  }

  function getSelection(itemId) {
    if (!userId) return { selectedReaction: null, favorite: false };
    const byItem = reactions[itemId] || {};
    return byItem[userId] || { selectedReaction: null, favorite: false };
  }

  function getStats(itemId) {
    const byItem = reactions[itemId] || {};
    const users = Object.values(byItem);
    return users.reduce(
      (acc, current) => {
        if (current?.selectedReaction) acc[current.selectedReaction] += 1;
        if (current?.favorite) acc.favorite += 1;
        return acc;
      },
      { like: 0, dislike: 0, heart: 0, clap: 0, favorite: 0 }
    );
  }

  async function toggleReaction(itemId, reaction) {
    if (!ensureLogin()) return;
    const cur = getSelection(itemId);
    const nextState =
      reaction === "favorite"
        ? { ...cur, favorite: !cur.favorite }
        : { ...cur, selectedReaction: cur.selectedReaction === reaction ? null : reaction };
    const reactionRef = ref(database, `reactions/${itemId}/${userId}`);
    const hasSelection = Boolean(nextState.selectedReaction) || nextState.favorite;
    try {
      await set(
        reactionRef,
        hasSelection
          ? {
              selectedReaction: nextState.selectedReaction || null,
              favorite: nextState.favorite,
              updatedAt: Date.now(),
            }
          : null
      );
    } catch (error) {
      console.error("Reaction update failed", error);
    }
  }

  function sortItems(items, modeValue, itemIdBuilder) {
    if (modeValue === "favorites_only") return items.filter((x) => getSelection(itemIdBuilder(x)).favorite);
    if (modeValue === "default") return items;
    const metric = metricMap[modeValue];
    if (!metric) return items;
    return [...items].sort((a, b) => getStats(itemIdBuilder(b))[metric] - getStats(itemIdBuilder(a))[metric]);
  }

  const paletteItems = useMemo(() => {
    const filtered = palettes.filter((p) => [p.name, p.desc, p.colors.join(" ")].join(" ").toLowerCase().includes(paletteSearch.toLowerCase()));
    return sortItems(filtered, paletteSort, (x) => `palette:${x.key}`);
  }, [paletteSearch, paletteSort, reactions]);

  const singleItems = useMemo(() => {
    const filtered = singleCards.filter((c) => (family === "all" || c.family === family) && [c.name, c.hex, c.familyLabel].join(" ").toLowerCase().includes(singleSearch.toLowerCase()));
    return sortItems(filtered, singleSort, (x) => `single:${x.id}`);
  }, [singleSearch, family, singleSort, reactions]);

  const favoriteCount = useMemo(() => {
    if (!userId) return 0;
    return Object.values(reactions).reduce((acc, item) => acc + (item?.[userId]?.favorite ? 1 : 0), 0);
  }, [reactions, userId]);

  function isPalettePublic(key) {
    return palettes.findIndex((p) => p.key === key) < 5;
  }

  function isSinglePublic(id) {
    return singleCards.findIndex((c) => c.id === id) < 5;
  }

  function lockOverlay() {
    return (
      <div className="lock-layer">
        <div className="lock-box">
          <strong>{lang.lockedTitle}</strong>
          <span>{lang.lockedText}</span>
          <button className="auth-button" type="button" onClick={handleGoogleSignIn}>{lang.lockedButton}</button>
        </div>
      </div>
    );
  }

  function copy(hex) {
    navigator.clipboard.writeText(hex);
    setCopied(hex);
    setTimeout(() => setCopied(""), 900);
  }

  function reactionRow(itemId) {
    const sel = getSelection(itemId);
    const stats = getStats(itemId);
    const disabled = !userId;
    return (
      <div className="reaction-row">
        {["like", "dislike", "heart", "clap", "favorite"].map((r) => (
          <button
            key={`${itemId}-${r}`}
            className={`reaction-button ${r === "favorite" ? "is-icon-only" : ""} ${((r === "favorite" && sel.favorite) || (r !== "favorite" && sel.selectedReaction === r)) ? "is-active" : ""}`}
            title={disabled ? lang.reactionLoginRequired : lang.reactions[r]}
            disabled={disabled}
            onClick={() => toggleReaction(itemId, r)}
          >
            <span className="reaction-icon">{reactionIcons[r]}</span>
            {r !== "favorite" && <span className="reaction-count">{stats[r]}</span>}
          </button>
        ))}
      </div>
    );
  }

  function drawWheel() {
    const c = wheelRef.current;
    if (!c) return;
    const ctx = c.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    const size = c.width;
    const r = size / 2;
    const img = ctx.createImageData(size, size);
    for (let y = 0; y < size; y += 1) for (let x = 0; x < size; x += 1) {
      const dx = x - r, dy = y - r, d = Math.sqrt(dx * dx + dy * dy), p = (y * size + x) * 4;
      if (d > r) { img.data[p + 3] = 0; continue; }
      const rgb = hsvRgb({ h: nh((Math.atan2(dy, dx) * 180) / Math.PI), s: (d / r) * 100, v: 100 });
      img.data[p] = rgb.r; img.data[p + 1] = rgb.g; img.data[p + 2] = rgb.b; img.data[p + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
  }

  function placeThumb(x, y) {
    const c = wheelRef.current;
    const th = thumbRef.current;
    if (!c || !th) return;
    th.style.left = `${x * (c.clientWidth / c.width)}px`;
    th.style.top = `${y * (c.clientHeight / c.height)}px`;
  }

  useEffect(() => {
    if (tab !== "create") return;
    const c = wheelRef.current;
    if (!c) return;
    drawWheel();
    const { h, s } = rgbHsl(hexRgb(baseColor));
    const r = c.width / 2;
    const rr = (s / 100) * r;
    const a = (h * Math.PI) / 180;
    placeThumb(r + Math.cos(a) * rr, r + Math.sin(a) * rr);
  }, [tab]);

  function pickWheel(clientX, clientY) {
    const c = wheelRef.current;
    if (!c) return;
    const rect = c.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * c.width;
    const y = ((clientY - rect.top) / rect.height) * c.height;
    const r = c.width / 2;
    const dx = x - r, dy = y - r, d = Math.sqrt(dx * dx + dy * dy);
    const ratio = d > r ? r / d : 1;
    const px = r + dx * ratio, py = r + dy * ratio;
    const hue = nh((Math.atan2(py - r, px - r) * 180) / Math.PI);
    const sat = clamp((Math.sqrt((px - r) ** 2 + (py - r) ** 2) / r) * 100, 0, 100);
    setBaseColor(rgbHex(hsvRgb({ h: hue, s: sat, v: 100 })));
    placeThumb(px, py);
  }

  function onWheelDown(e) {
    const c = wheelRef.current;
    if (!c) return;
    c.setPointerCapture(e.pointerId);
    pickWheel(e.clientX, e.clientY);
    const mv = (ev) => pickWheel(ev.clientX, ev.clientY);
    const up = () => {
      c.removeEventListener("pointermove", mv);
      c.removeEventListener("pointerup", up);
      c.removeEventListener("pointercancel", up);
    };
    c.addEventListener("pointermove", mv);
    c.addEventListener("pointerup", up);
    c.addEventListener("pointercancel", up);
  }

  function onImageSelect(e) {
    const file = e.target.files?.[0];
    if (!file) {
      setImageReady(false);
      setExtractColors([]);
      setManual("");
      setExtractStatus(lang.extractStatusIdle);
      return;
    }
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const c = imageRef.current;
      if (!c) return;
      const ctx = c.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;
      const ratio = Math.min(520 / img.width, 280 / img.height, 1);
      const w = Math.max(1, Math.round(img.width * ratio));
      const h = Math.max(1, Math.round(img.height * ratio));
      c.width = w;
      c.height = h;
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(url);
      setImageReady(true);
      setExtractColors([]);
      setManual("");
      setExtractStatus(lang.extractStatusIdle);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      setImageReady(false);
      setExtractStatus(lang.extractStatusNoFile);
    };
    img.src = url;
  }

  function autoExtract() {
    if (!imageReady) { setExtractStatus(lang.extractStatusNoFile); return; }
    const c = imageRef.current;
    if (!c) return;
    const ctx = c.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    const colors = dominant(ctx.getImageData(0, 0, c.width, c.height), 5);
    setExtractColors(colors);
    setManual("");
    setExtractStatus(lang.extractStatusDone(colors.length));
  }

  function pickPixel(e) {
    if (!imageReady) return;
    const c = imageRef.current;
    if (!c) return;
    const rect = c.getBoundingClientRect();
    const x = Math.floor(((e.clientX - rect.left) / rect.width) * c.width);
    const y = Math.floor(((e.clientY - rect.top) / rect.height) * c.height);
    const ctx = c.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    const px = ctx.getImageData(x, y, 1, 1).data;
    const hex = rgbHex({ r: px[0], g: px[1], b: px[2] });
    setManual(hex);
    setExtractColors((prev) => [hex, ...prev.filter((h) => h !== hex)].slice(0, 5));
    setExtractStatus(lang.extractStatusPicked(hex));
  }

  return (
    <>
      <div className="page-shell">
        <header className="hero">
          <div className="hero-card">
            <section className="hero-copy">
              <div className="brand-row">
                <div className="logo-mark"><img src="/LOGO.jpeg" alt="Logo" /></div>
                <div className="eyebrow">{lang.eyebrow}</div>
              </div>
              <h1>{lang.heroTitle}</h1>
              <div className="live-counter"><span className="live-dot" /><span>{lang.liveLabel}</span><strong>{liveUsers}</strong></div>
            </section>
            <aside className="hero-side">
              <div className="hero-toolbar">
                {user ? (
                  <div className="member-badge">
                    <span className="member-avatar" style={{ background: "linear-gradient(135deg,#0ea5e9,#2563eb)" }} />
                    <div>
                      <strong>{user.displayName || user.email || "User"}</strong>
                      <small>{lang.memberActive}</small>
                    </div>
                    <button
                      className="logout-button"
                      onClick={() => {
                        signOut(auth).catch((error) => {
                          console.error("Sign-out failed", error);
                        });
                      }}
                    >
                      {lang.logoutButton}
                    </button>
                  </div>
                ) : (
                  <button className="auth-button" onClick={handleGoogleSignIn}>{lang.loginButton}</button>
                )}
                <label className="toolbar-label">{lang.languageLabel}</label>
                <select className="language-select" value={language} onChange={(e) => setLanguage(e.target.value)}>
                  <option value="tr">Türkçe</option>
                  <option value="en">English</option>
                </select>
                <label className="theme-toggle" htmlFor="theme">
                  <span className="theme-label">Açık</span>
                  <span className="theme-switch"><input id="theme" type="checkbox" checked={themeDark} onChange={(e) => setThemeDark(e.target.checked)} /><span className="theme-track"><span className="theme-thumb" /></span></span>
                  <span className="theme-label">Koyu</span>
                </label>
              </div>
              <div className="preview-board">
                <div className="preview-header"><h2>{lang.featuredTitle}</h2><span className="badge badge-accent">{lang.harmony[palettes[0].harmony]}</span></div>
                <div className="preview-swatches"><div className="swatch-stack">{palettes[0].colors.map((h) => <div key={h} className="preview-dot" style={{ background: h }} />)}</div></div>
                <p className="preview-caption">{palettes[0].desc}</p>
              </div>
              <div className="metrics">
                <div className="metric-card"><strong>{palettes.length}</strong><span>{lang.metricSets}</span></div>
                <div className="metric-card"><strong>{singleCards.length}</strong><span>{lang.metricSingles}</span></div>
                <div className="metric-card"><strong>{familyData.length}</strong><span>{lang.metricFamilies}</span></div>
              </div>
            </aside>
          </div>
        </header>

        <main>
          <section className="section">
            <div className="panel">
              <div className="section-head"><h2>{lang.tabsTitle}</h2></div>
              <div className="tab-nav">
                <button className={`tab-button ${tab === "create" ? "is-active" : ""}`} onClick={() => setTab("create")}>{lang.tabCreate}</button>
                <button className={`tab-button ${tab === "palettes" ? "is-active" : ""}`} onClick={() => setTab("palettes")}>{lang.tabPalettes}</button>
                <button className={`tab-button ${tab === "singles" ? "is-active" : ""}`} onClick={() => setTab("singles")}>{lang.tabSingles}</button>
              </div>

              {tab === "palettes" && (
                <section className="tab-panel is-active">
                  <div className="layout">
                    <aside className="sidebar">
                      <div className="control"><label>{lang.searchLabel}</label><input type="search" placeholder={lang.searchPlaceholder} value={paletteSearch} onChange={(e) => setPaletteSearch(e.target.value)} /></div>
                      <div className="control"><label>{lang.sortLabel}</label><select className="sort-select" value={paletteSort} onChange={(e) => setPaletteSort(e.target.value)}>{Object.keys(lang.sortOptions).map((k) => <option key={k} value={k}>{lang.sortOptions[k]}</option>)}</select></div>
                    </aside>
                    <section className="catalog-shell">
                      <div className="results-bar"><strong>{lang.palettesCount(paletteItems.length, palettes.length)}</strong></div>
                      <div className="palette-grid">
                        {paletteItems.map((p) => (
                          <article key={p.key} className={`palette-card ${!userId && !isPalettePublic(p.key) ? "is-locked" : ""}`}>
                            <div className="palette-card-head"><div><h3>{p.name}</h3><p>{p.desc}</p></div><span className="badge badge-accent">{lang.harmony[p.harmony]}</span></div>
                            <div className="palette-swatches">{p.colors.map((h) => <div key={h} className="palette-swatch-shell"><div className="palette-swatch" style={{ background: h }} /></div>)}</div>
                            <div className="palette-codes">{p.colors.map((h) => <button key={h} className="palette-code" disabled={!userId && !isPalettePublic(p.key)} onClick={() => copy(h)}>{copied === h ? lang.copied : h}</button>)}</div>
                            {reactionRow(`palette:${p.key}`)}
                            {!userId && !isPalettePublic(p.key) ? lockOverlay() : null}
                          </article>
                        ))}
                      </div>
                    </section>
                  </div>
                </section>
              )}

              {tab === "singles" && (
                <section className="tab-panel is-active">
                  <div className="layout">
                    <aside className="sidebar">
                      <div className="control"><label>{lang.searchLabel}</label><input type="search" placeholder={lang.searchPlaceholder} value={singleSearch} onChange={(e) => setSingleSearch(e.target.value)} /></div>
                      <div className="control"><label>{lang.familyLabel}</label><select value={family} onChange={(e) => setFamily(e.target.value)}><option value="all">{lang.familyAll}</option>{familyData.map((f) => <option key={f.family} value={f.family}>{f.label}</option>)}</select></div>
                      <div className="control"><label>{lang.sortLabel}</label><select className="sort-select" value={singleSort} onChange={(e) => setSingleSort(e.target.value)}>{Object.keys(lang.sortOptions).map((k) => <option key={k} value={k}>{lang.sortOptions[k]}</option>)}</select></div>
                    </aside>
                    <section className="catalog-shell">
                      <div className="results-bar"><strong>{lang.singlesCount(singleItems.length, singleCards.length)}</strong><span>{favoriteCount ? lang.favoritesSaved(favoriteCount) : lang.noFavorites}</span></div>
                      <div className="cards-grid">
                        {singleItems.map((c) => (
                          <article key={c.id} className={`card ${!userId && !isSinglePublic(c.id) ? "is-locked" : ""}`}>
                            <div className="card-top-shell"><div className="card-top" style={{ background: c.hex }} /></div>
                            <div className="card-body">
                              <div className="card-meta"><div className="legend-item"><span className="color-dot" style={{ background: c.hex }} /><h3>{c.name}</h3></div><span className="badge badge-neutral">{c.familyLabel}</span></div>
                              <div className="code-row"><code>{c.hex}</code><button className="copy-button" disabled={!userId && !isSinglePublic(c.id)} onClick={() => copy(c.hex)}>{copied === c.hex ? lang.copied : lang.copy}</button></div>
                              {reactionRow(`single:${c.id}`)}
                            </div>
                            {!userId && !isSinglePublic(c.id) ? lockOverlay() : null}
                          </article>
                        ))}
                      </div>
                    </section>
                  </div>
                </section>
              )}

              {tab === "create" && (
                <section className="tab-panel is-active">
                  <section className="tool-grid">
                    <article className="tool-card tool-card-generator">
                      <div className="section-head"><h3>{lang.generatorTitle}</h3><span className="badge badge-neutral">{lang.harmony[gen.harmony]}</span></div>
                      <p className="tool-copy">{lang.generatorText}</p>
                      <div className="wheel-shell"><canvas id="colorWheelCanvas" ref={wheelRef} width={260} height={260} onPointerDown={onWheelDown} /><span ref={thumbRef} className="wheel-thumb" /></div>
                      <div className="tool-controls">
                        <label className="control"><span>{lang.generatorHarmonyLabel}</span><select value={mode} onChange={(e) => setMode(e.target.value)}><option value="random">{lang.generatorHarmonyRandom}</option><option value="analogous">{lang.harmony.analogous}</option><option value="complementary">{lang.harmony.complementary}</option><option value="triadic">{lang.harmony.triadic}</option></select></label>
                        <div className="control"><span>{lang.generatorBaseLabel}</span><div className="selected-color-row"><span className="selected-color-dot" style={{ background: baseColor }} /><code>{baseColor}</code></div></div>
                        <button className="primary-action" onClick={() => setGen(genPalette(baseColor, mode))}>{lang.generatePaletteButton}</button>
                      </div>
                      <div className="tool-result">
                        <div className="palette-swatches palette-swatches-compact">{gen.colors.map((h) => <div key={h} className="palette-swatch-shell"><div className="palette-swatch" style={{ background: h }} /></div>)}</div>
                        <div className="palette-codes">{gen.colors.map((h) => <button key={h} className="palette-code" onClick={() => copy(h)}>{copied === h ? lang.copied : h}</button>)}</div>
                      </div>
                    </article>

                    <article className="tool-card">
                      <div className="section-head"><h3>{lang.extractorTitle}</h3></div>
                      <p className="tool-copy">{lang.extractorText}</p>
                      <div className="tool-controls tool-controls-extract"><label className="control"><span>{lang.extractorInputLabel}</span><input type="file" accept="image/*" onChange={onImageSelect} /></label><button className="primary-action" onClick={autoExtract}>{lang.extractPaletteButton}</button></div>
                      <div className="image-sample-shell"><canvas id="imageSampleCanvas" ref={imageRef} width={520} height={280} onClick={pickPixel} /></div>
                      <p className="tool-note">{lang.manualPickHint}</p>
                      <div className="manual-pick-row"><span className="selected-color-dot" style={{ background: manual || "transparent" }} /><code>{manual || "--"}</code></div>
                      <p className="tool-note">{extractStatus}</p>
                      <div className="tool-result">
                        <div className="palette-swatches palette-swatches-compact">{extractColors.map((h) => <div key={h} className="palette-swatch-shell"><div className="palette-swatch" style={{ background: h }} /></div>)}</div>
                        <div className="palette-codes">{extractColors.map((h) => <button key={h} className="palette-code" onClick={() => copy(h)}>{copied === h ? lang.copied : h}</button>)}</div>
                      </div>
                    </article>
                  </section>
                </section>
              )}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
