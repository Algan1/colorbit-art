import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  getAdditionalUserInfo,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAalO5_b7JobFUZlBhs2X2mF3lZhWjgWmM",
  authDomain: "colorbit-b04e1.firebaseapp.com",
  projectId: "colorbit-b04e1",
  storageBucket: "colorbit-b04e1.firebasestorage.app",
  messagingSenderId: "379240783016",
  appId: "1:379240783016:web:01e823301628cc7308f69d",
  measurementId: "G-15LXDN1D6V",
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

const translations = {
  tr: {
    eyebrow: "Hazır setler ve renk kodları",
    heroTitle: "Tasarımına yakışan renkleri saniyeler içinde seç.",
    liveLabel: "Şu anda çevrim içi",
    languageLabel: "Dil",
    lightMode: "Açık",
    darkMode: "Koyu",
    featuredTitle: "Öne çıkan set",
    metricSets: "Renk seti",
    metricSingles: "Tekli renk",
    metricFamilies: "Renk ailesi",
    tabsTitle: "Renk alanları",
    tabPalettes: "Renk Setleri",
    tabSingles: "Tekli Renkler",
    tabCreate: "Set Oluştur",
    generatorTitle: "Kurallı rastgele set üretici",
    generatorText: "Bir ana renk seç, sistem uyum kuralına göre 5'li palet üretsin.",
    generatorBaseLabel: "Ana renk",
    generatorHarmonyLabel: "Uyum tipi",
    generatorHarmonyRandom: "Rastgele (Kurallı)",
    generatePaletteButton: "Set üret",
    extractorTitle: "Görselden renk çıkar",
    extractorText: "Bir görsel yükleyip en baskın 5 rengi otomatik çıkar.",
    extractorInputLabel: "Görsel yükle",
    extractPaletteButton: "Renkleri çıkar",
    manualPickHint: "Görsel üzerinde bir yere tıklayıp o pikselin rengini alabilirsin.",
    extractStatusIdle: "Henüz görsel seçilmedi.",
    extractStatusNoFile: "Lütfen önce bir görsel seç.",
    extractStatusError: "Renk çıkarma sırasında bir sorun oluştu.",
    extractStatusDone: ({ count }) => `${count} renk çıkarıldı.`,
    extractStatusPicked: ({ hex }) => `Seçilen piksel rengi: ${hex}`,
    searchLabel: "Renk ara",
    searchPlaceholder: "Örnek: mavi, sıcak, #2563eb",
    familyLabel: "Renk ailesi",
    familyAll: "Tüm aileler",
    sortLabel: "Sıralama",
    loginButton: "Giriş yap",
    logoutButton: "Çıkış yap",
    memberActive: "Üyelik aktif",
    loginTitle: "Giriş yap",
    registerTitle: "Kayıt ol",
    authText: "İlk 5 renk seti ve ilk 5 tekli renk herkese açık. Geri kalanlarını görmek için üye olun.",
    googleLoginButton: "Google ile giriş yap",
    googleRegisterButton: "Google ile kayıt ol",
    alreadyRegistered: "Bu Google hesabı zaten kayıtlı. Giriş yapıldı.",
    signedInWithGoogle: "Google hesabınızla giriş yapıldı.",
    displayNameLabel: "Kullanıcı adı",
    displayNamePlaceholder: "Kullanıcı adın",
    avatarTitle: "Profil resmi seç",
    saveProfileButton: "Profili kaydet",
    noAccountLead: "Hesabınız yoksa",
    haveAccountLead: "Zaten hesabınız varsa",
    registerLink: "kayıt ol",
    loginLink: "giriş yap",
    lockedTitle: "Üyelere özel içerik",
    lockedText: "Bu içeriği açmak için kayıt olmanız gerekiyor.",
    lockedButton: "Kayıt ol",
    reactionLoginRequired: "Beğeni vermek için giriş yapın",
    emptyTitle: "Bu filtreye uygun renk bulunamadı.",
    emptyText: "Arama kelimesini kısaltın veya renk ailesini tekrar tüm aileler olarak seçin.",
    palettesCount: ({ shown, total }) => `${shown} / ${total} renk seti gösteriliyor`,
    singlesCount: ({ shown, total }) => `${shown} / ${total} tekli renk gösteriliyor`,
    favoritesSaved: ({ count }) => `${count} favori kaydedildi`,
    noFavorites: "Henüz favori yok",
    copy: "Kopyala",
    copied: "Kopyalandı",
    harmony: {
      analogous: "Analog",
      complementary: "Tamamlayıcı",
      triadic: "Üçlü uyum",
      split: "Bölünmüş tamamlayıcı",
      tetradic: "Dörtlü uyum",
    },
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
  },
  en: {
    eyebrow: "Curated palettes and color codes",
    heroTitle: "Choose colors that fit your design in seconds.",
    liveLabel: "Online now",
    languageLabel: "Language",
    lightMode: "Light",
    darkMode: "Dark",
    featuredTitle: "Featured palette",
    metricSets: "Palettes",
    metricSingles: "Single colors",
    metricFamilies: "Color families",
    tabsTitle: "Color areas",
    tabPalettes: "Color Palettes",
    tabSingles: "Single Colors",
    tabCreate: "Create Palette",
    generatorTitle: "Rule-based random palette generator",
    generatorText: "Pick one base color and generate a 5-color palette using harmony rules.",
    generatorBaseLabel: "Base color",
    generatorHarmonyLabel: "Harmony type",
    generatorHarmonyRandom: "Random (Rule-based)",
    generatePaletteButton: "Generate palette",
    extractorTitle: "Extract colors from image",
    extractorText: "Upload an image and auto-extract the top 5 dominant colors.",
    extractorInputLabel: "Upload image",
    extractPaletteButton: "Extract colors",
    manualPickHint: "Click anywhere on the image to pick that pixel color manually.",
    extractStatusIdle: "No image selected yet.",
    extractStatusNoFile: "Please choose an image first.",
    extractStatusError: "Something went wrong while extracting colors.",
    extractStatusDone: ({ count }) => `${count} colors extracted.`,
    extractStatusPicked: ({ hex }) => `Picked pixel color: ${hex}`,
    searchLabel: "Search colors",
    searchPlaceholder: "Example: blue, warm, #2563eb",
    familyLabel: "Color family",
    familyAll: "All families",
    sortLabel: "Sort",
    loginButton: "Log in",
    logoutButton: "Log out",
    memberActive: "Membership active",
    loginTitle: "Log in",
    registerTitle: "Sign up",
    authText: "The first 5 palettes and the first 5 single colors are public. Sign up to unlock the rest.",
    googleLoginButton: "Continue with Google",
    googleRegisterButton: "Sign up with Google",
    alreadyRegistered: "This Google account is already registered. You have been signed in.",
    signedInWithGoogle: "Signed in with your Google account.",
    displayNameLabel: "Username",
    displayNamePlaceholder: "Your username",
    avatarTitle: "Choose profile image",
    saveProfileButton: "Save profile",
    noAccountLead: "No account yet?",
    haveAccountLead: "Already have an account?",
    registerLink: "Sign up",
    loginLink: "Log in",
    lockedTitle: "Members only content",
    lockedText: "You need to sign up to unlock this content.",
    lockedButton: "Sign up",
    reactionLoginRequired: "Log in to react",
    emptyTitle: "No colors matched this filter.",
    emptyText: "Try a shorter search or switch the family filter back to all families.",
    palettesCount: ({ shown, total }) => `Showing ${shown} / ${total} palettes`,
    singlesCount: ({ shown, total }) => `Showing ${shown} / ${total} single colors`,
    favoritesSaved: ({ count }) => `${count} favorites saved`,
    noFavorites: "No favorites yet",
    copy: "Copy",
    copied: "Copied",
    harmony: {
      analogous: "Analogous",
      complementary: "Complementary",
      triadic: "Triadic",
      split: "Split complementary",
      tetradic: "Tetradic",
    },
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
  },
};

const curatedSetSeeds = [
  { key: "northern-light", name: { tr: "Kuzey Işığı", en: "Northern Light" }, description: { tr: "Mavi, turkuaz ve yeşil geçişleriyle ferah ama güçlü bir dijital görünüm üretir.", en: "A fresh but strong digital look built from blue, teal, and green transitions." }, harmony: "analogous", colors: ["#0ea5e9", "#06b6d4", "#14b8a6", "#10b981", "#d1fae5"] },
  { key: "coral-sand", name: { tr: "Mercan ve Kum", en: "Coral and Sand" }, description: { tr: "Sıcak mercan tonlarını krem ve koyu kahverengi dengeyle birleştirir.", en: "Pairs warm coral tones with cream and dark earthy balance." }, harmony: "complementary", colors: ["#fff7ed", "#fed7aa", "#fb7185", "#ea580c", "#7c2d12"] },
  { key: "midnight-citrus", name: { tr: "Gece ve Narenciye", en: "Midnight Citrus" }, description: { tr: "Koyu zemin üstüne canlı sarı ve turuncu vurgular için uygundur.", en: "Built for dark backgrounds with lively yellow and orange accents." }, harmony: "split", colors: ["#0f172a", "#1e293b", "#facc15", "#f59e0b", "#fdba74"] },
  { key: "royal-pop", name: { tr: "Kraliyet Pop", en: "Royal Pop" }, description: { tr: "Lacivert, mor ve pembe birlikteliğiyle güçlü ve dikkat çekici durur.", en: "Navy, violet, and pink combine for a bold and eye-catching feel." }, harmony: "triadic", colors: ["#312e81", "#4f46e5", "#a855f7", "#f472b6", "#fdf2f8"] },
  { key: "forest-cream", name: { tr: "Orman ve Krem", en: "Forest and Cream" }, description: { tr: "Doğal yeşil tonlarını sıcak nötr renklerle buluşturur.", en: "Brings natural greens together with warm neutrals." }, harmony: "analogous", colors: ["#ecfdf5", "#a7f3d0", "#34d399", "#166534", "#fef3c7"] },
  { key: "studio-soft", name: { tr: "Stüdyo Soft", en: "Studio Soft" }, description: { tr: "Krem, lavanta, açık mavi ve pudra pembeyi sakin bir dengede tutar.", en: "Cream, lavender, pale blue, and blush pink sit in a calm balance." }, harmony: "tetradic", colors: ["#faf5ff", "#ddd6fe", "#dbeafe", "#fecdd3", "#fff7ed"] },
  { key: "sea-sunset", name: { tr: "Deniz Gün Batımı", en: "Sea Sunset" }, description: { tr: "Mavi tabanı sıcak şeftali ve gün batımı kırmızısıyla tamamlar.", en: "A blue base completed with peach and sunset reds." }, harmony: "complementary", colors: ["#082f49", "#0ea5e9", "#7dd3fc", "#fdba74", "#ef4444"] },
  { key: "tech-clean", name: { tr: "Temiz Teknoloji", en: "Clean Tech" }, description: { tr: "Kurumsal teknoloji sayfaları için mavi, gri ve cam etkili beyaz karışımı.", en: "A mix of blue, slate, and glassy white for tech landing pages." }, harmony: "analogous", colors: ["#f8fafc", "#cbd5e1", "#94a3b8", "#3b82f6", "#1e3a8a"] },
  { key: "berry-matcha", name: { tr: "Berry ve Matcha", en: "Berry and Matcha" }, description: { tr: "Canlı pembe tonlarını yumuşak yeşille birleştirerek modern kontrast oluşturur.", en: "Creates modern contrast by pairing vivid pinks with soft green." }, harmony: "split", colors: ["#fdf2f8", "#f472b6", "#e11d48", "#bef264", "#4d7c0f"] },
  { key: "editorial-earth", name: { tr: "Editoryal Toprak", en: "Editorial Earth" }, description: { tr: "Toprak, kil ve koyu zeytin tonlarıyla sakin ama karakterli bir düzen sunar.", en: "Earth, clay, and deep olive tones create a calm yet distinctive layout." }, harmony: "tetradic", colors: ["#fafaf9", "#d6d3d1", "#c2410c", "#78716c", "#365314"] },
  { key: "electric-night", name: { tr: "Elektrik Gece", en: "Electric Night" }, description: { tr: "Koyu mavi zemin üstünde elektrik mavisi ve neon yeşil vurgu verir.", en: "Delivers electric blue and neon green accents on a dark navy base." }, harmony: "triadic", colors: ["#020617", "#1d4ed8", "#38bdf8", "#a3e635", "#f8fafc"] },
  { key: "rose-latte", name: { tr: "Gül Latte", en: "Rose Latte" }, description: { tr: "Krem, kahve ve yumuşak pembe ile sıcak ve davetkâr bir görünüm sağlar.", en: "Cream, coffee, and soft rose create a warm inviting look." }, harmony: "analogous", colors: ["#fff7ed", "#e7d3c2", "#c08457", "#fbcfe8", "#be185d"] },
  { key: "fresh-market", name: { tr: "Taze Pazar", en: "Fresh Market" }, description: { tr: "Meyve ve sebze temalı markalar için yeşil, sarı ve kırmızıyı dengeler.", en: "Balances green, yellow, and red for food or fresh market brands." }, harmony: "triadic", colors: ["#166534", "#65a30d", "#fde047", "#fb7185", "#fff7ed"] },
  { key: "arctic-ui", name: { tr: "Arktik Arayüz", en: "Arctic UI" }, description: { tr: "Soğuk mavi ve gri geçişleriyle sade ve profesyonel ekranlar üretir.", en: "Builds clean professional screens with cool blue and gray transitions." }, harmony: "analogous", colors: ["#f8fafc", "#e0f2fe", "#7dd3fc", "#0369a1", "#1e293b"] },
  { key: "festival-poster", name: { tr: "Festival Afişi", en: "Festival Poster" }, description: { tr: "Mor, turuncu ve sarı ile enerjik ve dikkat çekici afiş dili oluşturur.", en: "Purple, orange, and yellow build an energetic poster language." }, harmony: "complementary", colors: ["#3b0764", "#9333ea", "#f97316", "#facc15", "#fff7ed"] },
  { key: "deep-lux", name: { tr: "Derin Lüks", en: "Deep Luxe" }, description: { tr: "Siyahımsı zemin, altın vurgu ve bordo ile güçlü bir lüks hissi verir.", en: "Near-black, gold accents, and burgundy create a strong luxury feel." }, harmony: "tetradic", colors: ["#0a0a0a", "#7f1d1d", "#f59e0b", "#fef3c7", "#fafaf9"] },
  { key: "mint-peach", name: { tr: "Nane ve Şeftali", en: "Mint and Peach" }, description: { tr: "Yumuşak yeşil ve şeftali tonlarıyla hafif, modern ve sıcak görünür.", en: "Soft green and peach make the palette feel light, modern, and warm." }, harmony: "complementary", colors: ["#f0fdf4", "#bbf7d0", "#6ee7b7", "#fdba74", "#ffedd5"] },
  { key: "urban-neutral", name: { tr: "Şehir Nötr", en: "Urban Neutral" }, description: { tr: "Gri tabanı mavi ve sıcak taş tonlarıyla hareketlendirir.", en: "Animates a gray base with blue and warm stone accents." }, harmony: "split", colors: ["#fafaf9", "#d6d3d1", "#78716c", "#0ea5e9", "#c2410c"] },
];

const singleColorFamilies = [
  { family: "Blue", label: { tr: "Mavi", en: "Blue" }, description: { tr: "Güven, netlik ve profesyonel görünüm için mavi tonları.", en: "Blue tones for trust, clarity, and professional visuals." }, colors: ["#eff6ff", "#dbeafe", "#bfdbfe", "#93c5fd", "#60a5fa", "#3b82f6", "#2563eb", "#1d4ed8", "#1e40af", "#1e3a8a", "#172554"] },
  { family: "Sky", label: { tr: "Gökyüzü", en: "Sky" }, description: { tr: "Açık ve ferah his veren gökyüzü tonları.", en: "Open and airy sky tones." }, colors: ["#f0f9ff", "#e0f2fe", "#bae6fd", "#7dd3fc", "#38bdf8", "#0ea5e9", "#0284c7", "#0369a1", "#075985", "#0c4a6e", "#082f49"] },
  { family: "Indigo", label: { tr: "Lacivert", en: "Indigo" }, description: { tr: "Derin mavi-mor arası güçlü tonlar.", en: "Deep blue-violet tones with strong contrast." }, colors: ["#eef2ff", "#e0e7ff", "#c7d2fe", "#a5b4fc", "#818cf8", "#6366f1", "#4f46e5", "#4338ca", "#3730a3", "#312e81", "#1e1b4b"] },
  { family: "Violet", label: { tr: "Mor", en: "Violet" }, description: { tr: "Yaratıcı ve dikkat çekici mor geçişleri.", en: "Creative and eye-catching violet transitions." }, colors: ["#f5f3ff", "#ede9fe", "#ddd6fe", "#c4b5fd", "#a78bfa", "#8b5cf6", "#7c3aed", "#6d28d9", "#5b21b6", "#4c1d95", "#2e1065"] },
  { family: "Purple", label: { tr: "Menekşe", en: "Purple" }, description: { tr: "Zengin ve etkileyici his veren mor tonlar.", en: "Rich purple tones with a striking feeling." }, colors: ["#faf5ff", "#f3e8ff", "#e9d5ff", "#d8b4fe", "#c084fc", "#a855f7", "#9333ea", "#7e22ce", "#6b21a8", "#581c87", "#3b0764"] },
  { family: "Cyan", label: { tr: "Turkuaz", en: "Cyan" }, description: { tr: "Canlı ve dijital hissi yüksek turkuaz tonları.", en: "Vivid cyan tones with a digital feel." }, colors: ["#ecfeff", "#cffafe", "#a5f3fc", "#67e8f9", "#22d3ee", "#06b6d4", "#0891b2", "#0e7490", "#155e75", "#164e63", "#083344"] },
  { family: "Teal", label: { tr: "Deniz Yeşili", en: "Teal" }, description: { tr: "Temiz ve sakin bir denge kuran deniz yeşili tonları.", en: "Teal tones that build a clean calm balance." }, colors: ["#f0fdfa", "#ccfbf1", "#99f6e4", "#5eead4", "#2dd4bf", "#14b8a6", "#0d9488", "#0f766e", "#115e59", "#134e4a", "#042f2e"] },
  { family: "Emerald", label: { tr: "Zümrüt", en: "Emerald" }, description: { tr: "Doğal ve güven verici yeşil tonları.", en: "Natural and trustworthy green tones." }, colors: ["#ecfdf5", "#d1fae5", "#a7f3d0", "#6ee7b7", "#34d399", "#10b981", "#059669", "#047857", "#065f46", "#064e3b", "#022c22"] },
  { family: "Lime", label: { tr: "Lime", en: "Lime" }, description: { tr: "Canlı ve taze enerji veren açık yeşiller.", en: "Bright and fresh light greens." }, colors: ["#f7fee7", "#ecfccb", "#d9f99d", "#bef264", "#a3e635", "#84cc16", "#65a30d", "#4d7c0f", "#3f6212", "#365314", "#1a2e05"] },
  { family: "Amber", label: { tr: "Amber", en: "Amber" }, description: { tr: "Sıcak, parlak ve enerjik sarı tonları.", en: "Warm, bright, energetic yellow tones." }, colors: ["#fffbeb", "#fef3c7", "#fde68a", "#fcd34d", "#fbbf24", "#f59e0b", "#d97706", "#b45309", "#92400e", "#78350f", "#451a03"] },
  { family: "Orange", label: { tr: "Turuncu", en: "Orange" }, description: { tr: "Canlı kampanya ve vurgu alanları için turuncu tonlar.", en: "Orange tones for lively campaigns and accents." }, colors: ["#fff7ed", "#ffedd5", "#fed7aa", "#fdba74", "#fb923c", "#f97316", "#ea580c", "#c2410c", "#9a3412", "#7c2d12", "#431407"] },
  { family: "Rose", label: { tr: "Gül", en: "Rose" }, description: { tr: "Yumuşaktan vurguluya giden pembe-kırmızı tonlar.", en: "Pink-red tones that move from soft to strong." }, colors: ["#fff1f2", "#ffe4e6", "#fecdd3", "#fda4af", "#fb7185", "#f43f5e", "#e11d48", "#be123c", "#9f1239", "#881337", "#4c0519"] },
  { family: "Slate", label: { tr: "Gri", en: "Slate" }, description: { tr: "Modern arayüzlerde düzen ve denge sağlayan gri tonlar.", en: "Slate grays that add order and balance to interfaces." }, colors: ["#f8fafc", "#f1f5f9", "#e2e8f0", "#cbd5e1", "#94a3b8", "#64748b", "#475569", "#334155", "#1e293b", "#0f172a", "#020617"] },
];

const familyLookup = Object.fromEntries(singleColorFamilies.map((family) => [family.family, family]));

const harmonyPlaybook = [
  { family: "Blue", partners: ["Sky", "Indigo", "Cyan", "Slate"], harmony: "analogous" },
  { family: "Sky", partners: ["Blue", "Cyan", "Teal", "Slate"], harmony: "analogous" },
  { family: "Indigo", partners: ["Blue", "Violet", "Purple", "Rose"], harmony: "triadic" },
  { family: "Violet", partners: ["Indigo", "Purple", "Rose", "Blue"], harmony: "triadic" },
  { family: "Purple", partners: ["Violet", "Rose", "Amber", "Orange"], harmony: "complementary" },
  { family: "Cyan", partners: ["Sky", "Teal", "Emerald", "Blue"], harmony: "analogous" },
  { family: "Teal", partners: ["Cyan", "Emerald", "Lime", "Sky"], harmony: "analogous" },
  { family: "Emerald", partners: ["Teal", "Lime", "Amber", "Cyan"], harmony: "split" },
  { family: "Lime", partners: ["Emerald", "Amber", "Orange", "Rose"], harmony: "split" },
  { family: "Amber", partners: ["Orange", "Rose", "Purple", "Lime"], harmony: "complementary" },
  { family: "Orange", partners: ["Amber", "Rose", "Purple", "Slate"], harmony: "complementary" },
  { family: "Rose", partners: ["Orange", "Purple", "Indigo", "Amber"], harmony: "triadic" },
  { family: "Slate", partners: ["Blue", "Sky", "Orange", "Amber"], harmony: "tetradic" },
];

function colorSlice(familyName, start, size = 5) {
  return familyLookup[familyName].colors.slice(start, start + size);
}

function buildGeneratedPalettes() {
  const generated = [];

  singleColorFamilies.forEach((family) => {
    for (let start = 0; start <= family.colors.length - 5; start += 1) {
      const step = start + 1;
      generated.push({
        key: `mono-${family.family.toLowerCase()}-${step}`,
        name: {
          tr: `${family.label.tr} Tonları ${step}`,
          en: `${family.label.en} Shades ${step}`,
        },
        description: {
          tr: `${family.label.tr} ailesinden tek rengin açık-koyu geçişleriyle oluşturuldu.`,
          en: `Built from light-to-dark transitions inside the ${family.label.en} family.`,
        },
        harmony: "analogous",
        colors: family.colors.slice(start, start + 5),
      });
    }
  });

  harmonyPlaybook.forEach((rule, ruleIndex) => {
    rule.partners.forEach((partner, partnerIndex) => {
      for (let variant = 0; variant < 3; variant += 1) {
        const baseFamily = familyLookup[rule.family];
        const partnerFamily = familyLookup[partner];
        const thirdFamily = familyLookup[rule.partners[(partnerIndex + 1) % rule.partners.length]];
        const start = variant;

        generated.push({
          key: `mix-${rule.family.toLowerCase()}-${partner.toLowerCase()}-${variant + 1}`,
          name: {
            tr: `${baseFamily.label.tr} x ${partnerFamily.label.tr} ${variant + 1}`,
            en: `${baseFamily.label.en} x ${partnerFamily.label.en} ${variant + 1}`,
          },
          description: {
            tr: `${baseFamily.label.tr}, ${partnerFamily.label.tr} ve ${thirdFamily.label.tr} arasında kurulan uyumlu bir geçiş seti.`,
            en: `A balanced blend across ${baseFamily.label.en}, ${partnerFamily.label.en}, and ${thirdFamily.label.en}.`,
          },
          harmony: rule.harmony,
          colors: [
            baseFamily.colors[start],
            baseFamily.colors[start + 3],
            partnerFamily.colors[start + 4],
            thirdFamily.colors[start + 6],
            partnerFamily.colors[start + 8],
          ],
        });
      }
    });

    if (ruleIndex < 10) {
      const neutral = familyLookup.Slate;
      const baseFamily = familyLookup[rule.family];

      generated.push({
        key: `studio-${rule.family.toLowerCase()}`,
        name: {
          tr: `${baseFamily.label.tr} Stüdyo`,
          en: `${baseFamily.label.en} Studio`,
        },
        description: {
          tr: `${baseFamily.label.tr} vurgusunu nötr gri tabanla birleştiren editoryal bir set.`,
          en: `An editorial set that combines ${baseFamily.label.en} accents with a neutral slate base.`,
        },
        harmony: "tetradic",
        colors: [
          neutral.colors[0],
          neutral.colors[2],
          baseFamily.colors[4],
          baseFamily.colors[7],
          neutral.colors[9],
        ],
      });
    }
  });

  return generated;
}

const curatedSets = [...curatedSetSeeds, ...buildGeneratedPalettes()];

const reactionIcons = {
  like: "👍",
  dislike: "👎",
  heart: "♥",
  clap: "👏",
  favorite: "★",
};

const avatarPresets = [
  "linear-gradient(135deg, #f97316, #fb7185)",
  "linear-gradient(135deg, #0ea5e9, #2563eb)",
  "linear-gradient(135deg, #14b8a6, #22c55e)",
  "linear-gradient(135deg, #a855f7, #6366f1)",
  "linear-gradient(135deg, #f59e0b, #ef4444)",
  "linear-gradient(135deg, #10b981, #84cc16)",
  "linear-gradient(135deg, #ec4899, #f43f5e)",
  "linear-gradient(135deg, #64748b, #1e293b)",
  "linear-gradient(135deg, #22d3ee, #06b6d4)",
  "linear-gradient(135deg, #facc15, #f97316)",
];

const storageKey = "colorArchiveSelections";
const profileStorageKey = "colorArchiveProfiles";
const paletteBatchSize = 6;
const singleBatchSize = 24;

const state = {
  language: "tr",
  activeTab: "palettes",
  visiblePalettes: 6,
  visibleSingles: 24,
  paletteSort: "default",
  singleSort: "default",
  selections: loadSelections(),
  auth: {
    isMember: false,
    displayName: "",
    avatarIndex: 0,
    userId: "",
  },
  profiles: loadProfiles(),
  pendingGoogleName: "",
  authMode: "login",
  generator: {
    lastHarmony: "analogous",
    baseColor: "#2563EB",
    colors: [],
  },
  extractor: {
    colors: [],
    hasPreview: false,
    manualHex: "",
  },
};

const paletteGrid = document.getElementById("paletteGrid");
const cardsGrid = document.getElementById("cardsGrid");
const paletteResultsLabel = document.getElementById("paletteResultsLabel");
const resultsLabel = document.getElementById("resultsLabel");
const favoriteSummary = document.getElementById("favoriteSummary");
const paletteSearchInput = document.getElementById("paletteSearchInput");
const searchInput = document.getElementById("searchInput");
const familySelect = document.getElementById("familySelect");
const paletteSortSelect = document.getElementById("paletteSortSelect");
const singleSortSelect = document.getElementById("singleSortSelect");
const emptyState = document.getElementById("emptyState");
const languageSelect = document.getElementById("languageSelect");
const tabPalettesButton = document.getElementById("tabPalettesButton");
const tabSinglesButton = document.getElementById("tabSinglesButton");
const tabCreateButton = document.getElementById("tabCreateButton");
const palettePanel = document.getElementById("palette-panel");
const singlesPanel = document.getElementById("catalog-panel");
const createPanel = document.getElementById("create-panel");
const paletteSentinel = document.getElementById("paletteSentinel");
const cardSentinel = document.getElementById("cardSentinel");
const setCount = document.getElementById("set-count");
const singleCount = document.getElementById("single-count");
const familyCount = document.getElementById("family-count");
const featuredPalettePreview = document.getElementById("featuredPalettePreview");
const featuredHarmony = document.getElementById("featuredHarmony");
const featuredPaletteText = document.getElementById("featuredPaletteText");
const liveUsers = document.getElementById("liveUsers");
const authActionButton = document.getElementById("authActionButton");
const memberBadge = document.getElementById("memberBadge");
const memberAvatar = document.getElementById("memberAvatar");
const memberName = document.getElementById("memberName");
const logoutButton = document.getElementById("logoutButton");
const authModal = document.getElementById("authModal");
const closeModalButton = document.getElementById("closeModalButton");
const googleAuthButton = document.getElementById("googleAuthButton");
const displayNameInput = document.getElementById("displayNameInput");
const avatarOptions = document.getElementById("avatarOptions");
const saveProfileButton = document.getElementById("saveProfileButton");
const authFields = document.getElementById("authFields");
const avatarPicker = document.getElementById("avatarPicker");
const modalActions = document.getElementById("modalActions");
const authTitle = document.getElementById("authTitle");
const authSwitchLead = document.getElementById("authSwitchLead");
const authSwitchButton = document.getElementById("authSwitchButton");
const authStatus = document.getElementById("authStatus");
const themeToggle = document.getElementById("themeToggle");
const themeStorageKey = "colorArchiveTheme";
const colorWheelCanvas = document.getElementById("colorWheelCanvas");
const colorWheelThumb = document.getElementById("colorWheelThumb");
const selectedColorDot = document.getElementById("selectedColorDot");
const selectedColorCode = document.getElementById("selectedColorCode");
const harmonyTypeSelect = document.getElementById("harmonyTypeSelect");
const generatePaletteButton = document.getElementById("generatePaletteButton");
const generatedPalettePreview = document.getElementById("generatedPalettePreview");
const generatedPaletteCodes = document.getElementById("generatedPaletteCodes");
const generatorHarmonyBadge = document.getElementById("generatorHarmonyBadge");
const imagePickerInput = document.getElementById("imagePickerInput");
const extractPaletteButton = document.getElementById("extractPaletteButton");
const imageSampleCanvas = document.getElementById("imageSampleCanvas");
const manualPickDot = document.getElementById("manualPickDot");
const manualPickCode = document.getElementById("manualPickCode");
const extractStatus = document.getElementById("extractStatus");
const extractedPalettePreview = document.getElementById("extractedPalettePreview");
const extractedPaletteCodes = document.getElementById("extractedPaletteCodes");

const colorCards = singleColorFamilies.flatMap((group) =>
  group.colors.map((hex, index) => ({
    id: `${group.family.toLowerCase()}-${index + 1}`,
    family: group.family,
    familyLabel: group.label,
    name: { tr: `${group.label.tr} ${index + 1}`, en: `${group.label.en} ${index + 1}` },
    description: group.description,
    hex,
    isPublic: colorCardsPublicIndex(group.family, index),
  }))
);

function colorCardsPublicIndex(_family, index) {
  return index < 5;
}

function loadProfiles() {
  try {
    return JSON.parse(window.localStorage.getItem(profileStorageKey) || "{}");
  } catch {
    return {};
  }
}

function saveProfiles() {
  window.localStorage.setItem(profileStorageKey, JSON.stringify(state.profiles));
}

function setAuthStatus(message = "") {
  if (!message) {
    authStatus.hidden = true;
    authStatus.textContent = "";
    return;
  }

  authStatus.hidden = false;
  authStatus.textContent = message;
}

function applyTheme(theme) {
  const isDark = theme === "dark";
  document.body.classList.toggle("theme-dark", isDark);
  themeToggle.checked = isDark;
  window.localStorage.setItem(themeStorageKey, theme);
}

function syncAuthFromUser(user) {
  if (!user) {
    state.auth = {
      isMember: false,
      displayName: "",
      avatarIndex: 0,
      userId: "",
    };
    renderAuthUI();
    renderPalettes();
    renderSingles();
    return;
  }

  const profile = state.profiles[user.uid] || {};
  state.auth = {
    isMember: true,
    displayName: profile.displayName || user.displayName || user.email || "Google User",
    avatarIndex: profile.avatarIndex ?? 0,
    userId: user.uid,
  };
  renderAuthUI();
  renderAvatarOptions();
  renderPalettes();
  renderSingles();
}

function ensureSelectionStore(itemId) {
  if (!state.selections[itemId]) {
    state.selections[itemId] = {
      users: {},
    };
  }

  if (!state.selections[itemId].users) {
    state.selections[itemId].users = {};
  }

  return state.selections[itemId];
}

function loadSelections() {
  try {
    const raw = JSON.parse(window.localStorage.getItem(storageKey) || "{}");
    const migrated = {};

    Object.entries(raw).forEach(([itemId, value]) => {
      const legacy = value || {};

      if (legacy.users) {
        migrated[itemId] = {
          users: Object.fromEntries(
            Object.entries(legacy.users).map(([userId, userValue]) => [
              userId,
              {
                selectedReaction: userValue?.selectedReaction || null,
                favorite: Boolean(userValue?.favorite),
                counts: {
                  like: userValue?.counts?.like || 0,
                  dislike: userValue?.counts?.dislike || 0,
                  heart: userValue?.counts?.heart || 0,
                  clap: userValue?.counts?.clap || 0,
                },
              },
            ])
          ),
        };
        return;
      }

      const counts = legacy.counts || {
        like: legacy.like ? 1 : 0,
        dislike: legacy.dislike ? 1 : 0,
        heart: legacy.heart ? 1 : 0,
        clap: legacy.clap ? 1 : 0,
      };

      const selectedReaction =
        legacy.selectedReaction ||
        (legacy.like && "like") ||
        (legacy.dislike && "dislike") ||
        (legacy.heart && "heart") ||
        (legacy.clap && "clap") ||
        null;

      migrated[itemId] = {
        selectedReaction,
        favorite: Boolean(legacy.favorite),
        counts: {
          like: counts.like || 0,
          dislike: counts.dislike || 0,
          heart: counts.heart || 0,
          clap: counts.clap || 0,
        },
      };
    });

    return migrated;
  } catch {
    return {};
  }
}

function saveSelections() {
  window.localStorage.setItem(storageKey, JSON.stringify(state.selections));
}

function t(key) {
  return translations[state.language][key];
}

function harmonyLabel(key) {
  return translations[state.language].harmony[key];
}

function generatorHarmonyText(mode) {
  if (mode === "random") {
    return t("generatorHarmonyRandom");
  }
  return harmonyLabel(mode);
}

function populateHarmonyOptions() {
  const current = harmonyTypeSelect.value || "random";
  const options = ["random", "analogous", "complementary", "triadic"];
  harmonyTypeSelect.innerHTML = "";

  options.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = generatorHarmonyText(value);
    harmonyTypeSelect.append(option);
  });

  harmonyTypeSelect.value = options.includes(current) ? current : "random";
}

function renderPaletteStrip(colors, previewNode, codesNode) {
  previewNode.innerHTML = colors
    .map(
      (hex) => `
        <div class="palette-swatch-shell">
          <div class="palette-swatch" style="background:${hex};"></div>
        </div>
      `
    )
    .join("");

  codesNode.innerHTML = colors
    .map((hex) => `<button class="palette-code" type="button" data-copy="${hex}">${hex}</button>`)
    .join("");
}

function normalizeHue(value) {
  return ((value % 360) + 360) % 360;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function hexToRgb(hex) {
  const value = hex.replace("#", "");
  const normalized = value.length === 3 ? value.split("").map((char) => `${char}${char}`).join("") : value;
  const int = Number.parseInt(normalized, 16);

  return {
    r: (int >> 16) & 255,
    g: (int >> 8) & 255,
    b: int & 255,
  };
}

function rgbToHex({ r, g, b }) {
  const toHex = (value) => value.toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

function hsvToRgb({ h, s, v }) {
  const hue = normalizeHue(h) / 60;
  const sat = clamp(s, 0, 100) / 100;
  const value = clamp(v, 0, 100) / 100;
  const chroma = value * sat;
  const x = chroma * (1 - Math.abs((hue % 2) - 1));
  const m = value - chroma;

  let red = 0;
  let green = 0;
  let blue = 0;

  if (hue >= 0 && hue < 1) {
    red = chroma;
    green = x;
  } else if (hue >= 1 && hue < 2) {
    red = x;
    green = chroma;
  } else if (hue >= 2 && hue < 3) {
    green = chroma;
    blue = x;
  } else if (hue >= 3 && hue < 4) {
    green = x;
    blue = chroma;
  } else if (hue >= 4 && hue < 5) {
    red = x;
    blue = chroma;
  } else {
    red = chroma;
    blue = x;
  }

  return {
    r: Math.round((red + m) * 255),
    g: Math.round((green + m) * 255),
    b: Math.round((blue + m) * 255),
  };
}

function rgbToHsv({ r, g, b }) {
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const delta = max - min;
  let hue = 0;

  if (delta) {
    if (max === red) {
      hue = ((green - blue) / delta) % 6;
    } else if (max === green) {
      hue = (blue - red) / delta + 2;
    } else {
      hue = (red - green) / delta + 4;
    }
  }

  return {
    h: Math.round(normalizeHue(hue * 60)),
    s: max === 0 ? 0 : Math.round((delta / max) * 100),
    v: Math.round(max * 100),
  };
}

function rgbToHsl({ r, g, b }) {
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const delta = max - min;

  let hue = 0;
  if (delta) {
    if (max === red) {
      hue = ((green - blue) / delta) % 6;
    } else if (max === green) {
      hue = (blue - red) / delta + 2;
    } else {
      hue = (red - green) / delta + 4;
    }
  }

  hue = Math.round(normalizeHue(hue * 60));
  const lightness = (max + min) / 2;
  const saturation = delta ? delta / (1 - Math.abs(2 * lightness - 1)) : 0;

  return {
    h: hue,
    s: Math.round(saturation * 100),
    l: Math.round(lightness * 100),
  };
}

function hslToRgb({ h, s, l }) {
  const hue = normalizeHue(h) / 60;
  const sat = clamp(s, 0, 100) / 100;
  const light = clamp(l, 0, 100) / 100;
  const chroma = (1 - Math.abs(2 * light - 1)) * sat;
  const x = chroma * (1 - Math.abs((hue % 2) - 1));
  const m = light - chroma / 2;

  let red = 0;
  let green = 0;
  let blue = 0;

  if (hue >= 0 && hue < 1) {
    red = chroma;
    green = x;
  } else if (hue >= 1 && hue < 2) {
    red = x;
    green = chroma;
  } else if (hue >= 2 && hue < 3) {
    green = chroma;
    blue = x;
  } else if (hue >= 3 && hue < 4) {
    green = x;
    blue = chroma;
  } else if (hue >= 4 && hue < 5) {
    red = x;
    blue = chroma;
  } else {
    red = chroma;
    blue = x;
  }

  return {
    r: Math.round((red + m) * 255),
    g: Math.round((green + m) * 255),
    b: Math.round((blue + m) * 255),
  };
}

function buildHarmonyPalette(baseHex, mode) {
  const availableModes = ["analogous", "complementary", "triadic"];
  const finalMode = mode === "random" ? availableModes[Math.floor(Math.random() * availableModes.length)] : mode;
  const base = rgbToHsl(hexToRgb(baseHex));
  let recipe = [];

  if (finalMode === "analogous") {
    recipe = [
      { h: -36, s: -8, l: 12 },
      { h: -18, s: -4, l: 6 },
      { h: 0, s: 0, l: 0 },
      { h: 18, s: 4, l: -6 },
      { h: 36, s: 6, l: -12 },
    ];
  } else if (finalMode === "complementary") {
    recipe = [
      { h: 0, s: 0, l: 8 },
      { h: 18, s: 8, l: 0 },
      { h: 180, s: 0, l: -2 },
      { h: 198, s: 6, l: -8 },
      { h: -14, s: -8, l: 12 },
    ];
  } else {
    recipe = [
      { h: 0, s: -8, l: 12 },
      { h: 0, s: 0, l: 0 },
      { h: 120, s: 8, l: -6 },
      { h: 240, s: 6, l: -10 },
      { h: 120, s: -6, l: 10 },
    ];
  }

  const colors = recipe.map((step) =>
    rgbToHex(
      hslToRgb({
        h: normalizeHue(base.h + step.h),
        s: clamp(base.s + step.s, 22, 94),
        l: clamp(base.l + step.l, 16, 88),
      })
    )
  );

  const unique = [...new Set(colors)];
  while (unique.length < 5) {
    const index = unique.length;
    unique.push(
      rgbToHex(
        hslToRgb({
          h: normalizeHue(base.h + index * 24),
          s: clamp(base.s - index * 2, 20, 95),
          l: clamp(base.l + (index % 2 ? -8 : 8), 14, 90),
        })
      )
    );
  }

  return {
    harmony: finalMode,
    colors: unique.slice(0, 5),
  };
}

function setGeneratorBaseColor(hex) {
  state.generator.baseColor = hex.toUpperCase();
  selectedColorDot.style.background = state.generator.baseColor;
  selectedColorCode.textContent = state.generator.baseColor;
}

function wheelPointerFromColor(hex) {
  const hsv = rgbToHsv(hexToRgb(hex));
  const radius = colorWheelCanvas.width / 2;
  const satRadius = (hsv.s / 100) * radius;
  const angle = (hsv.h * Math.PI) / 180;
  return {
    x: radius + Math.cos(angle) * satRadius,
    y: radius + Math.sin(angle) * satRadius,
  };
}

function placeWheelThumb(x, y) {
  const scaleX = colorWheelCanvas.clientWidth / colorWheelCanvas.width;
  const scaleY = colorWheelCanvas.clientHeight / colorWheelCanvas.height;
  colorWheelThumb.style.left = `${x * scaleX}px`;
  colorWheelThumb.style.top = `${y * scaleY}px`;
}

function drawColorWheel() {
  const canvas = colorWheelCanvas;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) {
    return;
  }

  const size = canvas.width;
  const radius = size / 2;
  const image = context.createImageData(size, size);

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const dx = x - radius;
      const dy = y - radius;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const pixel = (y * size + x) * 4;

      if (distance > radius) {
        image.data[pixel + 3] = 0;
        continue;
      }

      const hue = normalizeHue((Math.atan2(dy, dx) * 180) / Math.PI);
      const saturation = clamp((distance / radius) * 100, 0, 100);
      const rgb = hsvToRgb({ h: hue, s: saturation, v: 100 });

      image.data[pixel] = rgb.r;
      image.data[pixel + 1] = rgb.g;
      image.data[pixel + 2] = rgb.b;
      image.data[pixel + 3] = 255;
    }
  }

  context.putImageData(image, 0, 0);
}

function pickColorFromWheel(clientX, clientY) {
  const rect = colorWheelCanvas.getBoundingClientRect();
  const x = ((clientX - rect.left) / rect.width) * colorWheelCanvas.width;
  const y = ((clientY - rect.top) / rect.height) * colorWheelCanvas.height;
  const radius = colorWheelCanvas.width / 2;
  const dx = x - radius;
  const dy = y - radius;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance > radius) {
    const ratio = radius / distance;
    return {
      x: radius + dx * ratio,
      y: radius + dy * ratio,
    };
  }

  return { x, y };
}

function applyWheelPoint(point) {
  const radius = colorWheelCanvas.width / 2;
  const dx = point.x - radius;
  const dy = point.y - radius;
  const hue = normalizeHue((Math.atan2(dy, dx) * 180) / Math.PI);
  const saturation = clamp((Math.sqrt(dx * dx + dy * dy) / radius) * 100, 0, 100);
  const hex = rgbToHex(hsvToRgb({ h: hue, s: saturation, v: 100 }));
  setGeneratorBaseColor(hex);
  placeWheelThumb(point.x, point.y);
  generatePaletteFromControls();
}

function initColorWheel() {
  if (!colorWheelCanvas) {
    return;
  }

  drawColorWheel();
  const initialPoint = wheelPointerFromColor(state.generator.baseColor);
  placeWheelThumb(initialPoint.x, initialPoint.y);
  setGeneratorBaseColor(state.generator.baseColor);

  let dragging = false;

  const updateFromEvent = (event) => {
    const point = pickColorFromWheel(event.clientX, event.clientY);
    applyWheelPoint(point);
  };

  colorWheelCanvas.addEventListener("pointerdown", (event) => {
    dragging = true;
    colorWheelCanvas.setPointerCapture(event.pointerId);
    updateFromEvent(event);
  });

  colorWheelCanvas.addEventListener("pointermove", (event) => {
    if (!dragging) {
      return;
    }
    updateFromEvent(event);
  });

  colorWheelCanvas.addEventListener("pointerup", () => {
    dragging = false;
  });

  colorWheelCanvas.addEventListener("pointercancel", () => {
    dragging = false;
  });
}

function renderGeneratorResult() {
  if (!state.generator.colors.length) {
    return;
  }
  renderPaletteStrip(state.generator.colors, generatedPalettePreview, generatedPaletteCodes);
  generatorHarmonyBadge.textContent = harmonyLabel(state.generator.lastHarmony);
}

function generatePaletteFromControls() {
  const baseHex = state.generator.baseColor || "#2563EB";
  const chosenHarmony = harmonyTypeSelect.value || "random";
  const generated = buildHarmonyPalette(baseHex, chosenHarmony);
  state.generator.lastHarmony = generated.harmony;
  state.generator.colors = generated.colors;
  renderGeneratorResult();
}

function updateExtractStatus(messageKey, args = null) {
  const message = t(messageKey);
  extractStatus.textContent = typeof message === "function" ? message(args || {}) : message;
}

function setManualPick(hex = "") {
  state.extractor.manualHex = hex.toUpperCase();
  manualPickDot.style.background = state.extractor.manualHex || "transparent";
  manualPickCode.textContent = state.extractor.manualHex || "--";
}

function renderImagePreviewPlaceholder() {
  const context = imageSampleCanvas.getContext("2d");
  if (!context) {
    return;
  }
  imageSampleCanvas.width = 520;
  imageSampleCanvas.height = 280;
  context.clearRect(0, 0, imageSampleCanvas.width, imageSampleCanvas.height);
  context.fillStyle = "rgba(120, 110, 102, 0.26)";
  context.font = "600 16px Segoe UI";
  context.textAlign = "center";
  context.fillText("Image Preview", imageSampleCanvas.width / 2, imageSampleCanvas.height / 2);
}

function drawImagePreview(file) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const objectUrl = URL.createObjectURL(file);

    image.onload = () => {
      const maxWidth = 520;
      const maxHeight = 280;
      const ratio = Math.min(maxWidth / image.width, maxHeight / image.height, 1);
      const width = Math.max(1, Math.round(image.width * ratio));
      const height = Math.max(1, Math.round(image.height * ratio));
      const context = imageSampleCanvas.getContext("2d", { willReadFrequently: true });
      if (!context) {
        URL.revokeObjectURL(objectUrl);
        reject(new Error("Canvas context unavailable"));
        return;
      }

      imageSampleCanvas.width = width;
      imageSampleCanvas.height = height;
      context.clearRect(0, 0, width, height);
      context.drawImage(image, 0, 0, width, height);
      URL.revokeObjectURL(objectUrl);
      state.extractor.hasPreview = true;
      resolve();
    };

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Image preview decode failed"));
    };

    image.src = objectUrl;
  });
}

async function handleImageSelection() {
  const file = imagePickerInput.files?.[0];
  if (!file) {
    state.extractor.hasPreview = false;
    state.extractor.colors = [];
    state.extractor.manualHex = "";
    renderImagePreviewPlaceholder();
    setManualPick("");
    extractedPalettePreview.innerHTML = "";
    extractedPaletteCodes.innerHTML = "";
    updateExtractStatus("extractStatusIdle");
    return;
  }

  try {
    await drawImagePreview(file);
    state.extractor.colors = [];
    setManualPick("");
    extractedPalettePreview.innerHTML = "";
    extractedPaletteCodes.innerHTML = "";
    updateExtractStatus("extractStatusIdle");
  } catch (error) {
    console.error("Image preview failed", error);
    state.extractor.hasPreview = false;
    renderImagePreviewPlaceholder();
    updateExtractStatus("extractStatusError");
  }
}

function handleManualPixelPick(event) {
  if (!state.extractor.hasPreview) {
    return;
  }

  const rect = imageSampleCanvas.getBoundingClientRect();
  const x = Math.floor(((event.clientX - rect.left) / rect.width) * imageSampleCanvas.width);
  const y = Math.floor(((event.clientY - rect.top) / rect.height) * imageSampleCanvas.height);
  const context = imageSampleCanvas.getContext("2d", { willReadFrequently: true });
  if (!context) {
    return;
  }
  const pixel = context.getImageData(x, y, 1, 1).data;
  if (pixel[3] < 10) {
    return;
  }

  const hex = rgbToHex({ r: pixel[0], g: pixel[1], b: pixel[2] });
  setManualPick(hex);
  state.extractor.colors = [hex, ...state.extractor.colors.filter((color) => color !== hex)].slice(0, 5);
  renderPaletteStrip(state.extractor.colors, extractedPalettePreview, extractedPaletteCodes);
  updateExtractStatus("extractStatusPicked", { hex });
}

function colorDistance(a, b) {
  return Math.sqrt((a.r - b.r) ** 2 + (a.g - b.g) ** 2 + (a.b - b.b) ** 2);
}

function sampleDominantColors(imageData, limit = 5) {
  const buckets = new Map();
  const { data } = imageData;
  const step = 24;

  for (let index = 0; index < data.length; index += 16) {
    const alpha = data[index + 3];
    if (alpha < 140) {
      continue;
    }

    const red = Math.round(data[index] / step) * step;
    const green = Math.round(data[index + 1] / step) * step;
    const blue = Math.round(data[index + 2] / step) * step;
    const key = `${red},${green},${blue}`;
    buckets.set(key, (buckets.get(key) || 0) + 1);
  }

  const ranked = [...buckets.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([rgb]) => {
      const [r, g, b] = rgb.split(",").map(Number);
      return { r, g, b };
    });

  const chosen = [];
  ranked.forEach((candidate) => {
    if (chosen.length >= limit) {
      return;
    }

    const distinctEnough = chosen.every((picked) => colorDistance(candidate, picked) > 44);
    if (distinctEnough) {
      chosen.push(candidate);
    }
  });

  let fillIndex = 0;
  while (chosen.length < limit && fillIndex < ranked.length) {
    chosen.push(ranked[fillIndex]);
    fillIndex += 1;
  }

  return chosen.slice(0, limit).map(rgbToHex);
}

function extractPaletteFromFile(file) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const objectUrl = URL.createObjectURL(file);

    image.onload = () => {
      const maxSide = 160;
      const ratio = Math.min(1, maxSide / Math.max(image.width, image.height));
      const width = Math.max(1, Math.round(image.width * ratio));
      const height = Math.max(1, Math.round(image.height * ratio));
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d", { willReadFrequently: true });
      if (!context) {
        URL.revokeObjectURL(objectUrl);
        reject(new Error("Canvas context unavailable"));
        return;
      }

      canvas.width = width;
      canvas.height = height;
      context.drawImage(image, 0, 0, width, height);
      const imageData = context.getImageData(0, 0, width, height);
      URL.revokeObjectURL(objectUrl);
      resolve(sampleDominantColors(imageData, 5));
    };

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Image decode failed"));
    };

    image.src = objectUrl;
  });
}

async function handleImageExtract() {
  const file = imagePickerInput.files?.[0];
  if (!file) {
    updateExtractStatus("extractStatusNoFile");
    return;
  }

  extractPaletteButton.disabled = true;
  try {
    const colors = await extractPaletteFromFile(file);
    state.extractor.colors = colors;
    state.extractor.manualHex = "";
    renderPaletteStrip(colors, extractedPalettePreview, extractedPaletteCodes);
    setManualPick("");
    updateExtractStatus("extractStatusDone", { count: colors.length });
  } catch (error) {
    console.error("Image palette extraction failed", error);
    updateExtractStatus("extractStatusError");
  } finally {
    extractPaletteButton.disabled = false;
  }
}

function baseStats(id) {
  const hash = [...id].reduce((acc, char, index) => acc + char.charCodeAt(0) * (index + 7), 0);

  return {
    like: 18 + (hash % 41),
    dislike: 1 + (hash % 8),
    heart: 10 + (hash % 37),
    clap: 6 + (hash % 29),
    favorite: 3 + (hash % 17),
  };
}

function getSelection(itemId) {
  const entry = state.selections[itemId];
  const userId = state.auth.userId;
  const selection = userId && entry?.users ? entry.users[userId] : null;

  if (selection) {
    return {
      selectedReaction: selection.selectedReaction || null,
      favorite: Boolean(selection.favorite),
      counts: {
        like: selection.counts?.like || 0,
        dislike: selection.counts?.dislike || 0,
        heart: selection.counts?.heart || 0,
        clap: selection.counts?.clap || 0,
      },
    };
  }

  return {
    selectedReaction: null,
    favorite: false,
    counts: {
      like: 0,
      dislike: 0,
      heart: 0,
      clap: 0,
    },
  };
}

function getStats(itemId) {
  const entry = state.selections[itemId];
  const users = entry?.users ? Object.values(entry.users) : [];

  const totals = users.reduce(
    (acc, userSelection) => {
      acc.like += userSelection.counts?.like || 0;
      acc.dislike += userSelection.counts?.dislike || 0;
      acc.heart += userSelection.counts?.heart || 0;
      acc.clap += userSelection.counts?.clap || 0;
      acc.favorite += userSelection.favorite ? 1 : 0;
      return acc;
    },
    { like: 0, dislike: 0, heart: 0, clap: 0, favorite: 0 }
  );

  return {
    like: totals.like,
    dislike: totals.dislike,
    heart: totals.heart,
    clap: totals.clap,
    favorite: totals.favorite,
  };
}

function reactionRow(itemId) {
  const selection = getSelection(itemId);
  const stats = getStats(itemId);

  return `
    <div class="reaction-row">
      ${["like", "dislike", "heart", "clap", "favorite"]
        .map(
          (reaction) => `
            <button
              class="reaction-button ${reaction === "favorite" ? "is-icon-only" : ""} ${
            (reaction === "favorite" && selection.favorite) ||
            (reaction !== "favorite" && selection.selectedReaction === reaction)
              ? "is-active"
              : ""
          }"
              type="button"
              data-reaction-item="${itemId}"
              data-reaction="${reaction}"
              title="${t("reactions")[reaction]}"
              aria-label="${t("reactions")[reaction]}"
              ${!state.auth.isMember ? `data-requires-auth="true"` : ""}
            >
              <span class="reaction-icon">${reactionIcons[reaction]}</span>
              ${
                reaction === "favorite"
                  ? ""
                  : `<span class="reaction-count">${stats[reaction]}</span>`
              }
            </button>
          `
        )
        .join("")}
    </div>
  `;
}

function updateStaticText() {
  document.documentElement.lang = state.language;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    node.placeholder = t(node.dataset.i18nPlaceholder);
  });
  updateAuthModeUI();
}

function refreshToolPanels() {
  populateHarmonyOptions();
  setGeneratorBaseColor(state.generator.baseColor || "#2563EB");
  if (!state.generator.colors.length) {
    generatePaletteFromControls();
  } else {
    renderGeneratorResult();
  }

  if (state.extractor.colors.length) {
    renderPaletteStrip(state.extractor.colors, extractedPalettePreview, extractedPaletteCodes);
    if (state.extractor.manualHex) {
      updateExtractStatus("extractStatusPicked", { hex: state.extractor.manualHex });
    } else {
      updateExtractStatus("extractStatusDone", { count: state.extractor.colors.length });
    }
  } else {
    extractedPalettePreview.innerHTML = "";
    extractedPaletteCodes.innerHTML = "";
    updateExtractStatus("extractStatusIdle");
  }

  if (state.extractor.manualHex) {
    setManualPick(state.extractor.manualHex);
  } else {
    setManualPick("");
  }

  if (!state.extractor.hasPreview) {
    renderImagePreviewPlaceholder();
  }
}

function populateFamilyOptions() {
  const selected = familySelect.value || "all";
  familySelect.innerHTML = "";

  const allOption = document.createElement("option");
  allOption.value = "all";
  allOption.textContent = t("familyAll");
  familySelect.append(allOption);

  singleColorFamilies.forEach((family) => {
    const option = document.createElement("option");
    option.value = family.family;
    option.textContent = family.label[state.language];
    familySelect.append(option);
  });

  familySelect.value = [...familySelect.options].some((option) => option.value === selected) ? selected : "all";
}

function populateSortOptions() {
  const options = ["default", "likes", "hearts", "claps", "favorites", "dislikes", "favorites_only"];

  [paletteSortSelect, singleSortSelect].forEach((select, index) => {
    const current = index === 0 ? state.paletteSort : state.singleSort;
    select.innerHTML = "";

    options.forEach((value) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = t("sortOptions")[value];
      select.append(option);
    });

    select.value = current;
  });
}

function updateMetrics() {
  setCount.textContent = curatedSets.length;
  singleCount.textContent = colorCards.length;
  familyCount.textContent = singleColorFamilies.length;
}

function renderFeaturedPalette() {
  const featured = curatedSets[0];
  featuredPalettePreview.innerHTML = `
    <div class="swatch-stack">
      ${featured.colors.map((hex) => `<div class="preview-dot" style="background:${hex};"></div>`).join("")}
    </div>
  `;
  featuredHarmony.textContent = harmonyLabel(featured.harmony);
  featuredPaletteText.textContent = featured.description[state.language];
}

function isPalettePublic(palette) {
  return curatedSets.findIndex((item) => item.key === palette.key) < 5;
}

function isSinglePublic(card) {
  return colorCards.findIndex((item) => item.id === card.id) < 5;
}

function lockOverlay() {
  return `
    <div class="lock-layer">
      <div class="lock-box">
        <strong>${t("lockedTitle")}</strong>
        <span>${t("lockedText")}</span>
        <button class="auth-button" type="button" data-open-auth="true">${t("lockedButton")}</button>
      </div>
    </div>
  `;
}

function paletteTemplate(palette) {
  const locked = !state.auth.isMember && !isPalettePublic(palette);
  const colorBlocks = palette.colors
    .map(
      (hex) => `
        <div class="palette-swatch-shell">
          <div class="palette-swatch" style="background:${hex};"></div>
        </div>
      `
    )
    .join("");
  const codeButtons = palette.colors
    .map((hex) => `<button class="palette-code" type="button" data-copy="${hex}" ${locked ? "disabled" : ""}>${hex}</button>`)
    .join("");

  return `
    <article class="palette-card ${locked ? "is-locked" : ""}">
      <div class="palette-card-head">
        <div>
          <h3>${palette.name[state.language]}</h3>
          <p>${palette.description[state.language]}</p>
        </div>
        <span class="badge badge-accent">${harmonyLabel(palette.harmony)}</span>
      </div>
      <div class="palette-swatches">${colorBlocks}</div>
      <div class="palette-codes">${codeButtons}</div>
      ${reactionRow(`palette:${palette.key}`)}
      ${locked ? lockOverlay() : ""}
    </article>
  `;
}

function singleCardTemplate(card) {
  const locked = !state.auth.isMember && !isSinglePublic(card);
  return `
    <article class="card ${locked ? "is-locked" : ""}">
      <div class="card-top-shell">
        <div class="card-top" style="background:${card.hex};"></div>
      </div>
      <div class="card-body">
        <div class="card-meta">
          <div class="legend-item">
            <span class="color-dot" style="background:${card.hex};"></span>
            <h3>${card.name[state.language]}</h3>
          </div>
          <span class="badge badge-neutral">${card.familyLabel[state.language]}</span>
        </div>
        <div class="code-row">
          <code>${card.hex}</code>
          <button class="copy-button" type="button" data-copy="${card.hex}" ${locked ? "disabled" : ""}>${t("copy")}</button>
        </div>
        ${reactionRow(`single:${card.id}`)}
      </div>
      ${locked ? lockOverlay() : ""}
    </article>
  `;
}

function sortItems(items, mode, itemIdBuilder) {
  if (mode === "favorites_only") {
    return items.filter((item) => getSelection(itemIdBuilder(item)).favorite);
  }

  if (mode === "default") {
    return items;
  }

  const metricMap = {
    likes: "like",
    hearts: "heart",
    claps: "clap",
    favorites: "favorite",
    dislikes: "dislike",
  };

  const metric = metricMap[mode];

  return [...items].sort((a, b) => {
    const aStats = getStats(itemIdBuilder(a));
    const bStats = getStats(itemIdBuilder(b));
    const aValue = metric === "favorite" ? (aStats.favorite ? 1 : 0) : aStats[metric];
    const bValue = metric === "favorite" ? (bStats.favorite ? 1 : 0) : bStats[metric];
    return bValue - aValue;
  });
}

function getSortedPalettes() {
  const keyword = paletteSearchInput.value.trim().toLowerCase();

  const filtered = curatedSets.filter((palette) => {
    if (!keyword) {
      return true;
    }

    const families = palette.colors
      .map((hex) => {
        const match = singleColorFamilies.find((family) => family.colors.includes(hex));
        return match ? `${match.label.tr} ${match.label.en} ${match.family}` : "";
      })
      .join(" ");

    const text = [
      palette.name.tr,
      palette.name.en,
      palette.description.tr,
      palette.description.en,
      harmonyLabel(palette.harmony),
      families,
      palette.colors.join(" "),
    ]
      .join(" ")
      .toLowerCase();

    return text.includes(keyword);
  });

  return sortItems(filtered, state.paletteSort, (item) => `palette:${item.key}`);
}

function getFilteredSingles() {
  const keyword = searchInput.value.trim().toLowerCase();
  const selectedFamily = familySelect.value;

  const filtered = colorCards.filter((card) => {
    const familyMatch = selectedFamily === "all" || card.family === selectedFamily;
    const text = [
      card.name[state.language],
      card.name.tr,
      card.name.en,
      card.familyLabel.tr,
      card.familyLabel.en,
      card.description.tr,
      card.description.en,
      card.hex,
    ]
      .join(" ")
      .toLowerCase();

    return familyMatch && (!keyword || text.includes(keyword));
  });

  return sortItems(filtered, state.singleSort, (item) => `single:${item.id}`);
}

function renderPalettes(resetCount = false) {
  if (resetCount) {
    state.visiblePalettes = paletteBatchSize;
  }

  const sorted = getSortedPalettes();
  const visible = sorted.slice(0, state.visiblePalettes);

  paletteGrid.innerHTML = visible.map((palette) => paletteTemplate(palette)).join("");
  paletteResultsLabel.textContent = t("palettesCount")({ shown: visible.length, total: sorted.length });
}

function renderSingles(resetCount = false) {
  if (resetCount) {
    state.visibleSingles = singleBatchSize;
  }

  const sorted = getFilteredSingles();
  const visible = sorted.slice(0, state.visibleSingles);
  const favoriteCount = Object.values(state.selections).reduce((acc, entry) => {
    const userSelection = state.auth.userId && entry.users ? entry.users[state.auth.userId] : null;
    return acc + (userSelection?.favorite ? 1 : 0);
  }, 0);

  cardsGrid.innerHTML = visible.map((card) => singleCardTemplate(card)).join("");
  resultsLabel.textContent = t("singlesCount")({ shown: visible.length, total: sorted.length });
  favoriteSummary.textContent = favoriteCount ? t("favoritesSaved")({ count: favoriteCount }) : t("noFavorites");
  emptyState.classList.toggle("is-visible", sorted.length === 0);
}

function renderAuthUI() {
  if (state.auth.isMember) {
    authActionButton.hidden = true;
    memberBadge.hidden = false;
    memberName.textContent = state.auth.displayName || "Google User";
    memberAvatar.style.background = avatarPresets[state.auth.avatarIndex || 0];
  } else {
    authActionButton.hidden = false;
    memberBadge.hidden = true;
    memberName.textContent = "";
  }
}

function renderAvatarOptions() {
  avatarOptions.innerHTML = avatarPresets
    .map(
      (background, index) => `
        <button
          class="avatar-option ${state.auth.avatarIndex === index ? "is-selected" : ""}"
          type="button"
          data-avatar-index="${index}"
          style="background:${background};"
          aria-label="Avatar ${index + 1}"
        ></button>
      `
    )
    .join("");
}

function openAuthModal() {
  authModal.hidden = false;
  renderAvatarOptions();
  displayNameInput.value = state.auth.displayName || state.pendingGoogleName || "";
  setAuthStatus("");
  updateAuthModeUI();
}

function closeAuthModal() {
  authModal.hidden = true;
  setAuthStatus("");
}

function updateAuthModeUI() {
  if (!authTitle) {
    return;
  }

  const isRegister = state.authMode === "register";
  authTitle.textContent = isRegister ? t("registerTitle") : t("loginTitle");
  googleAuthButton.textContent = isRegister ? t("googleRegisterButton") : t("googleLoginButton");
  authFields.hidden = !isRegister;
  avatarPicker.hidden = !isRegister;
  modalActions.hidden = !isRegister;
  authSwitchLead.textContent = isRegister ? t("haveAccountLead") : t("noAccountLead");
  authSwitchButton.textContent = isRegister ? t("loginLink") : t("registerLink");
}

function saveProfile() {
  const currentUser = firebaseAuth.currentUser;
  if (!currentUser) {
    state.authMode = "login";
    openAuthModal();
    return;
  }

  state.profiles[currentUser.uid] = {
    displayName: displayNameInput.value.trim() || state.pendingGoogleName || currentUser.displayName || "Google User",
    avatarIndex: state.auth.avatarIndex || 0,
    email: currentUser.email || "",
  };
  saveProfiles();
  syncAuthFromUser(currentUser);
  closeAuthModal();
}

async function logout() {
  state.pendingGoogleName = "";
  closeAuthModal();
  await signOut(firebaseAuth);
}

function setActiveTab(tab) {
  state.activeTab = tab;
  const paletteActive = tab === "palettes";
  const singlesActive = tab === "singles";
  const createActive = tab === "create";
  palettePanel.classList.toggle("is-active", paletteActive);
  singlesPanel.classList.toggle("is-active", singlesActive);
  createPanel.classList.toggle("is-active", createActive);
  tabPalettesButton.classList.toggle("is-active", paletteActive);
  tabSinglesButton.classList.toggle("is-active", singlesActive);
  tabCreateButton.classList.toggle("is-active", createActive);
  tabPalettesButton.setAttribute("aria-selected", String(paletteActive));
  tabSinglesButton.setAttribute("aria-selected", String(singlesActive));
  tabCreateButton.setAttribute("aria-selected", String(createActive));
}

function handleCopy(button) {
  const code = button.getAttribute("data-copy");
  navigator.clipboard.writeText(code).then(() => {
    const previous = button.textContent;
    button.textContent = t("copied");
    window.setTimeout(() => {
      button.textContent = previous;
    }, 1200);
  });
}

function toggleReaction(itemId, reaction) {
  if (!state.auth.isMember || !state.auth.userId) {
    openAuthModal();
    return;
  }

  const current = getSelection(itemId);
  const store = ensureSelectionStore(itemId);
  const userId = state.auth.userId;

  if (reaction === "favorite") {
    store.users[userId] = {
      ...current,
      favorite: !current.favorite,
    };
  } else {
    const counts = { ...current.counts };
    let selectedReaction = current.selectedReaction;

    if (selectedReaction === reaction) {
      counts[reaction] = Math.max(0, (counts[reaction] || 0) - 1);
      selectedReaction = null;
    } else {
      if (selectedReaction) {
        counts[selectedReaction] = Math.max(0, (counts[selectedReaction] || 0) - 1);
      }
      counts[reaction] = (counts[reaction] || 0) + 1;
      selectedReaction = reaction;
    }

    store.users[userId] = {
      ...current,
      selectedReaction,
      counts,
    };
  }

  saveSelections();
  renderPalettes();
  renderSingles();
}

function loadMorePalettes() {
  const sorted = getSortedPalettes();
  if (state.visiblePalettes >= sorted.length) {
    return;
  }

  state.visiblePalettes = Math.min(state.visiblePalettes + paletteBatchSize, sorted.length);
  renderPalettes();
}

function loadMoreSingles() {
  const sorted = getFilteredSingles();
  if (state.visibleSingles >= sorted.length) {
    return;
  }

  state.visibleSingles = Math.min(state.visibleSingles + singleBatchSize, sorted.length);
  renderSingles();
}

function startLiveCounter() {
  function getTrafficProfile(hour) {
    if (hour >= 0 && hour < 6) {
      return { min: 150, max: 1000, delayMin: 1000, delayMax: 10000 };
    }
    if (hour >= 6 && hour < 12) {
      return { min: 450, max: 1800, delayMin: 1000, delayMax: 8000 };
    }
    if (hour >= 12 && hour < 17) {
      return { min: 800, max: 3000, delayMin: 1000, delayMax: 7000 };
    }
    if (hour >= 17 && hour < 22) {
      return { min: 900, max: 2600, delayMin: 1000, delayMax: 6000 };
    }
    return { min: 400, max: 1500, delayMin: 1000, delayMax: 9000 };
  }

  let profile = getTrafficProfile(new Date().getHours());
  let current = Math.round((profile.min + profile.max) / 2);

  liveUsers.textContent = current;

  function scheduleNextUpdate() {
    const now = new Date();
    profile = getTrafficProfile(now.getHours());
    if (current < profile.min || current > profile.max) {
      current = Math.min(profile.max, Math.max(profile.min, current));
    }

    const delay =
      Math.floor(Math.random() * (profile.delayMax - profile.delayMin + 1)) + profile.delayMin;

    window.setTimeout(() => {
      const step = Math.floor(Math.random() * 8) + 1;
      let direction = Math.random() > 0.5 ? 1 : -1;

      // Sinirlara yaklasinca ters yone donme ihtimalini artir.
      const lowerZone = profile.min + Math.round((profile.max - profile.min) * 0.08);
      const upperZone = profile.max - Math.round((profile.max - profile.min) * 0.08);

      if (current <= lowerZone) {
        direction = Math.random() > 0.2 ? 1 : -1;
      }

      if (current >= upperZone) {
        direction = Math.random() > 0.2 ? -1 : 1;
      }

      const next = current + step * direction;
      current = Math.min(profile.max, Math.max(profile.min, next));
      liveUsers.textContent = current;
      scheduleNextUpdate();
    }, delay);
  }

  scheduleNextUpdate();
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      if (entry.target.id === "paletteSentinel" && state.activeTab === "palettes") {
        loadMorePalettes();
      }

      if (entry.target.id === "cardSentinel" && state.activeTab === "singles") {
        loadMoreSingles();
      }
    });
  },
  { rootMargin: "240px 0px" }
);

observer.observe(paletteSentinel);
observer.observe(cardSentinel);

languageSelect.addEventListener("change", (event) => {
  state.language = event.target.value;
  updateStaticText();
  refreshToolPanels();
  populateFamilyOptions();
  populateSortOptions();
  renderFeaturedPalette();
  renderPalettes();
  renderSingles();
});

paletteSortSelect.addEventListener("change", (event) => {
  state.paletteSort = event.target.value;
  renderPalettes(true);
});

paletteSearchInput.addEventListener("input", () => {
  renderPalettes(true);
});

singleSortSelect.addEventListener("change", (event) => {
  state.singleSort = event.target.value;
  renderSingles(true);
});

tabPalettesButton.addEventListener("click", () => setActiveTab("palettes"));
tabSinglesButton.addEventListener("click", () => setActiveTab("singles"));
tabCreateButton.addEventListener("click", () => setActiveTab("create"));
searchInput.addEventListener("input", () => renderSingles(true));
familySelect.addEventListener("change", () => renderSingles(true));
generatePaletteButton.addEventListener("click", generatePaletteFromControls);
harmonyTypeSelect.addEventListener("change", generatePaletteFromControls);
extractPaletteButton.addEventListener("click", handleImageExtract);
imagePickerInput.addEventListener("change", handleImageSelection);
imageSampleCanvas.addEventListener("click", handleManualPixelPick);
authActionButton.addEventListener("click", () => {
  state.authMode = "login";
  openAuthModal();
});
closeModalButton.addEventListener("click", closeAuthModal);
googleAuthButton.addEventListener("click", async () => {
  try {
    const result = await signInWithPopup(firebaseAuth, googleProvider);
    const user = result.user;
    const additionalInfo = getAdditionalUserInfo(result);

    state.profiles[user.uid] = {
      ...(state.profiles[user.uid] || {}),
      email: user.email || "",
      displayName: state.profiles[user.uid]?.displayName || user.displayName || user.email || "Google User",
      avatarIndex: state.profiles[user.uid]?.avatarIndex ?? state.auth.avatarIndex ?? 0,
    };
    saveProfiles();

    if (state.authMode === "register") {
      if (!additionalInfo?.isNewUser) {
        syncAuthFromUser(user);
        closeAuthModal();
        window.alert(t("alreadyRegistered"));
        return;
      }

      state.pendingGoogleName = user.displayName || user.email || "Google User";
      displayNameInput.value = state.profiles[user.uid]?.displayName || state.pendingGoogleName;
      state.auth.avatarIndex = state.profiles[user.uid]?.avatarIndex ?? state.auth.avatarIndex ?? 0;
      renderAvatarOptions();
      setAuthStatus(t("signedInWithGoogle"));
      updateAuthModeUI();
      return;
    }

    state.pendingGoogleName = user.displayName || user.email || "Google User";
    syncAuthFromUser(user);
    closeAuthModal();
  } catch (error) {
    console.error("Google authentication failed", error);
  }
});
saveProfileButton.addEventListener("click", saveProfile);
logoutButton.addEventListener("click", async () => {
  await logout();
});
authSwitchButton.addEventListener("click", () => {
  state.authMode = state.authMode === "login" ? "register" : "login";
  updateAuthModeUI();
});

document.addEventListener("click", (event) => {
  const copyButton = event.target.closest("[data-copy]");
  if (copyButton) {
    handleCopy(copyButton);
    return;
  }

  const authTrigger = event.target.closest("[data-open-auth]");
  if (authTrigger) {
    state.authMode = "register";
    openAuthModal();
    return;
  }

  const reactionButton = event.target.closest("[data-reaction-item]");
  if (reactionButton) {
    toggleReaction(reactionButton.dataset.reactionItem, reactionButton.dataset.reaction);
    return;
  }

  const avatarButton = event.target.closest("[data-avatar-index]");
  if (avatarButton) {
    state.auth.avatarIndex = Number(avatarButton.dataset.avatarIndex);
    renderAvatarOptions();
  }
});

updateStaticText();
initColorWheel();
refreshToolPanels();
populateFamilyOptions();
populateSortOptions();
updateMetrics();
renderFeaturedPalette();
renderAuthUI();
renderAvatarOptions();
generatePaletteFromControls();
renderPalettes(true);
renderSingles(true);
setActiveTab("palettes");
startLiveCounter();

onAuthStateChanged(firebaseAuth, (user) => {
  syncAuthFromUser(user);
});

themeToggle.addEventListener("change", (event) => {
  applyTheme(event.target.checked ? "dark" : "light");
});

applyTheme(window.localStorage.getItem(themeStorageKey) || "light");
