// bot.js
require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');

const BOT_TOKEN = process.env.BOT_TOKEN;
if (!BOT_TOKEN) {
  console.error('Error: 8538557025:AAHxyGoWwPnjnMIXzwngx8_CZQMBz9yM0Eg muhit o\'zgaruvchisi topilmadi.');
  process.exit(1);
}

const bot = new Telegraf(BOT_TOKEN, { polling: true });

/*
  --- Vocab baza ---
  Siz bergan 1..30 unit lug'atlarini shu joyga joyladim.
  Har unit - massivda {en, uz}
*/
const UNITS = {
  1: [
    { en: "afraid", uz: "qo'rqmoq" },
    { en: "agree", uz: "rozi bo'lmoq" },
    { en: "angry", uz: "jahldor" },
    { en: "arrive", uz: "yetib kelmoq" },
    { en: "attack", uz: "hujum qilmoq" },
    { en: "bottom", uz: "tagi osti" },
    { en: "clever", uz: "aqilli" },
    { en: "cruel", uz: "shafqatsiz" },
    { en: "finally", uz: "nihoyat" },
    { en: "hide", uz: "yashirmoq" },
    { en: "hunt", uz: "ovlamoq" },
    { en: "lot", uz: "ko'p" },
    { en: "middle", uz: "o'rta" },
    { en: "moment", uz: "lahza" },
    { en: "pleased", uz: "mamnun" },
    { en: "promise", uz: "va'da bermoq" },
    { en: "reply", uz: "javob bermoq" },
    { en: "safe", uz: "xavfsiz" },
    { en: "trick", uz: "hiyla" },
    { en: "well", uz: "yaxshi" }
  ],
  2: [
    { en: "adventure", uz: "sarguzasht" },
    { en: "approach", uz: "yaqinlashmoq" },
    { en: "carefully", uz: "ehtiyotkorlik bilan" },
    { en: "chemical", uz: "kimyoviy" },
    { en: "create", uz: "yaratmoq" },
    { en: "evil", uz: "yovuzlik" },
    { en: "experiment", uz: "tajriba" },
    { en: "kill", uz: "o'ldirmoq" },
    { en: "laboratory", uz: "laboratoriya" },
    { en: "laugh", uz: "kulmoq" },
    { en: "loud", uz: "baland ovozda" },
    { en: "nervous", uz: "asabiy" },
    { en: "noise", uz: "shovqin" },
    { en: "project", uz: "loyiha" },
    { en: "scare", uz: "qo'rqitmoq" },
    { en: "secret", uz: "sir" },
    { en: "shout", uz: "baqirmoq" },
    { en: "smell", uz: "hid" },
    { en: "terrible", uz: "qo'rqinchli" },
    { en: "worse", uz: "yomonroq" }
  ],
  3: [
    { en: "alien", uz: "begona" },
    { en: "among", uz: "orasida" },
    { en: "chart", uz: "grafik/jadval" },
    { en: "cloud", uz: "bulut" },
    { en: "comprehend", uz: "tushunmoq" },
    { en: "describe", uz: "ta'riflamoq" },
    { en: "ever", uz: "qachon bo'lsa ham" },
    { en: "fail", uz: "muvaffaqiyatsizlikka uchramoq" },
    { en: "friendly", uz: "do'stona" },
    { en: "grade", uz: "baho" },
    { en: "instead", uz: "o'rniga" },
    { en: "library", uz: "kutubxona" },
    { en: "planet", uz: "sayyora" },
    { en: "report", uz: "hisobot" },
    { en: "several", uz: "bir necha" },
    { en: "solve", uz: "hal qilmoq" },
    { en: "suddenly", uz: "to'satdan" },
    { en: "suppose", uz: "faraz qilmoq" },
    { en: "universe", uz: "olam" },
    { en: "view", uz: "ko'rinish" }
  ],
  4: [
    { en: "appropriate", uz: "muvofiq" },
    { en: "avoid", uz: "oldini olmoq" },
    { en: "behave", uz: "o'zini tutmoq" },
    { en: "calm", uz: "sokin" },
    { en: "concern", uz: "tashvishlanmoq" },
    { en: "content", uz: "mamnun" },
    { en: "expect", uz: "kutmoq" },
    { en: "frequently", uz: "tez-tez" },
    { en: "habit", uz: "odat" },
    { en: "instruct", uz: "ko'rsatma bermoq" },
    { en: "issue", uz: "masala" },
    { en: "none", uz: "hech biri" },
    { en: "patient", uz: "sabrli" },
    { en: "positive", uz: "ijobiy" },
    { en: "punish", uz: "jazolamoq" },
    { en: "represent", uz: "vakillik qilmoq" },
    { en: "shake", uz: "silkitmoq" },
    { en: "spread", uz: "tarqalmoq" },
    { en: "stroll", uz: "sayr qilmoq" },
    { en: "village", uz: "qishloq" }
  ],
  5: [
    { en: "aware", uz: "xabardor" },
    { en: "badly", uz: "yomon" },
    { en: "belong", uz: "tegishli bo'lmoq" },
    { en: "continue", uz: "davom etmoq" },
    { en: "error", uz: "xato" },
    { en: "experience", uz: "tajriba" },
    { en: "field", uz: "maydon" },
    { en: "hurt", uz: "jarohat qilmoq" },
    { en: "judgment", uz: "hukm/baho" },
    { en: "likely", uz: "ehtimol" },
    { en: "normal", uz: "oddiy" },
    { en: "rare", uz: "noyob" },
    { en: "relax", uz: "rohatlanmoq" },
    { en: "request", uz: "so'ramoq" },
    { en: "reside", uz: "yashamoq" },
    { en: "result", uz: "natija" },
    { en: "roll", uz: "dumalamoq" },
    { en: "since", uz: "chunki" },
    { en: "visible", uz: "ko'rinadigan" },
    { en: "wild", uz: "yovvoyi" }
  ],
  6: [
    { en: "advantage", uz: "afzallik" },
    { en: "cause", uz: "sabab" },
    { en: "choice", uz: "tanlov" },
    { en: "community", uz: "jamoa" },
    { en: "dead", uz: "o'lik" },
    { en: "distance", uz: "masofa" },
    { en: "escape", uz: "qochmoq" },
    { en: "face", uz: "yuz" },
    { en: "follow", uz: "amal qilmoq" },
    { en: "fright", uz: "qo'rquv" },
    { en: "ghost", uz: "arvoh" },
    { en: "individual", uz: "shaxs" },
    { en: "pet", uz: "uy hayvoni" },
    { en: "reach", uz: "erishmoq" },
    { en: "return", uz: "qaytmoq" },
    { en: "survive", uz: "omon qolmoq" },
    { en: "upset", uz: "xafa" },
    { en: "voice", uz: "ovoz" },
    { en: "weather", uz: "ob-havo" },
    { en: "wise", uz: "dono" }
  ],
  7: [
    { en: "allow", uz: "rusat bermoq" },
    { en: "announce", uz: "e'lon qilmoq" },
    { en: "beside", uz: "yonida" },
    { en: "challenge", uz: "qiyinchilik" },
    { en: "claim", uz: "da'vo qilmoq" },
    { en: "condition", uz: "holat" },
    { en: "contribute", uz: "hissa qo'shmoq" },
    { en: "difference", uz: "farq" },
    { en: "divide", uz: "bo'lmoq" },
    { en: "expert", uz: "mutaxassis" },
    { en: "famous", uz: "mashhur" },
    { en: "force", uz: "kuch" },
    { en: "harm", uz: "zarar" },
    { en: "lay", uz: "yotqizmoq" },
    { en: "peace", uz: "tinchlik" },
    { en: "prince", uz: "shahzoda" },
    { en: "protect", uz: "himoya qilmoq" },
    { en: "sense", uz: "his" },
    { en: "sudden", uz: "to'satdan" },
    { en: "therefore", uz: "shuning uchun" }
  ],
  8: [
    { en: "accept", uz: "qabul qilmoq" },
    { en: "arrange", uz: "tartibga solmoq" },
    { en: "attend", uz: "qatnashmoq" },
    { en: "balance", uz: "muvozanat" },
    { en: "contrast", uz: "farq" },
    { en: "encourage", uz: "rag'batlantirmoq" },
    { en: "familiar", uz: "tanish" },
    { en: "grab", uz: "changallamoq" },
    { en: "hang", uz: "osib qo'ymoq" },
    { en: "huge", uz: "katta" },
    { en: "necessary", uz: "zarur" },
    { en: "pattern", uz: "naqsh, tartib" },
    { en: "propose", uz: "taklif qilmoq" },
    { en: "purpose", uz: "maqsad" },
    { en: "release", uz: "ozod qilmoq" },
    { en: "require", uz: "talab qilmoq" },
    { en: "single", uz: "yakka" },
    { en: "success", uz: "muvaffaqiyat" },
    { en: "tear", uz: "ko'z yoshi, yirtmoq" },
    { en: "theory", uz: "nazariya" }
  ],
  9: [
    { en: "against", uz: "qarshi" },
    { en: "beach", uz: "sohil" },
    { en: "damage", uz: "zarar" },
    { en: "discover", uz: "kashf qilmoq" },
    { en: "emotion", uz: "hissiyot" },
    { en: "fix", uz: "tuzatmoq" },
    { en: "frank", uz: "samimiy" },
    { en: "identify", uz: "aniqlamoq" },
    { en: "island", uz: "orol" },
    { en: "ocean", uz: "okean" },
    { en: "perhaps", uz: "balki" },
    { en: "pleasant", uz: "yoqimli" },
    { en: "prevent", uz: "oldini olmoq" },
    { en: "rock", uz: "tosh" },
    { en: "save", uz: "asramoq" },
    { en: "step", uz: "qadam" },
    { en: "still", uz: "hali ham" },
    { en: "taste", uz: "ta'm, tatib ko'rmoq" },
    { en: "throw", uz: "otmoq" },
    { en: "wave", uz: "to'lqin" }
  ],
  10: [
    { en: "benefit", uz: "foyda" },
    { en: "certain", uz: "aniq" },
    { en: "chance", uz: "imkoniyat" },
    { en: "effect", uz: "ta'sir" },
    { en: "essential", uz: "muhim" },
    { en: "far", uz: "uzoq" },
    { en: "focus", uz: "diqqat markazi" },
    { en: "function", uz: "vazifa" },
    { en: "grass", uz: "o't" },
    { en: "guard", uz: "qo'riqchi" },
    { en: "image", uz: "rasm" },
    { en: "immediate", uz: "darhol" },
    { en: "primary", uz: "asosiy" },
    { en: "proud", uz: "mag'rur" },
    { en: "remain", uz: "qolmoq" },
    { en: "rest", uz: "dam olmoq" },
    { en: "separate", uz: "alohida" },
    { en: "site", uz: "joy" },
    { en: "tail", uz: "dum" },
    { en: "trouble", uz: "muammo" }
  ],
  11: [
    { en: "anymore", uz: "endi qaytib" },
    { en: "asleep", uz: "uyquda" },
    { en: "berry", uz: "meva" },
    { en: "collect", uz: "to'plamoq" },
    { en: "compete", uz: "raqobatlashmoq" },
    { en: "conversation", uz: "suhbat" },
    { en: "creature", uz: "jonzot" },
    { en: "decision", uz: "qaror" },
    { en: "either", uz: "yoki" },
    { en: "forest", uz: "o'rmon" },
    { en: "ground", uz: "yer" },
    { en: "introduce", uz: "tanishtirmoq" },
    { en: "marry", uz: "turmush qurmoq" },
    { en: "prepare", uz: "tayyorlamoq" },
    { en: "sail", uz: "suzmoq" },
    { en: "serious", uz: "jiddiy" },
    { en: "spend", uz: "sarflamoq" },
    { en: "strange", uz: "g'alati" },
    { en: "truth", uz: "haqiqat" },
    { en: "wake", uz: "uyg'otmoq" }
  ],
  12: [
    { en: "alone", uz: "yolg'iz" },
    { en: "apartment", uz: "xonadon" },
    { en: "article", uz: "maqola" },
    { en: "artist", uz: "rassom" },
    { en: "attitude", uz: "munosabat" },
    { en: "compare", uz: "solishtirmoq" },
    { en: "judge", uz: "hukm qilmoq" },
    { en: "magazine", uz: "jurnal" },
    { en: "material", uz: "material" },
    { en: "meal", uz: "ovqat" },
    { en: "method", uz: "usul" },
    { en: "neighbor", uz: "qo'shni" },
    { en: "professional", uz: "professional" },
    { en: "profit", uz: "foyda" },
    { en: "quality", uz: "sifat" },
    { en: "shape", uz: "shakl" },
    { en: "space", uz: "bo'shliq" },
    { en: "stair", uz: "zina" },
    { en: "symbol", uz: "belgi" },
    { en: "thin", uz: "ingichka" }
  ],
  13: [
    { en: "blood", uz: "qon" },
    { en: "burn", uz: "kuymoq" },
    { en: "cell", uz: "hujayra, panjara" },
    { en: "contain", uz: "o'z ichiga olmoq" },
    { en: "correct", uz: "to'g'ri" },
    { en: "crop", uz: "ekin" },
    { en: "demand", uz: "talab" },
    { en: "equal", uz: "teng" },
    { en: "feed", uz: "boqmoq" },
    { en: "hole", uz: "teshik" },
    { en: "increase", uz: "o'smoq" },
    { en: "lord", uz: "lord" },
    { en: "owe", uz: "qarzdor" },
    { en: "position", uz: "o'rin" },
    { en: "raise", uz: "oshirmoq" },
    { en: "responsible", uz: "mas'ul" },
    { en: "sight", uz: "ko'rish" },
    { en: "spot", uz: "dog', joy" },
    { en: "structure", uz: "tuzilish" },
    { en: "whole", uz: "butun" }
  ],
  14: [
    { en: "coach", uz: "murabbiy" },
    { en: "control", uz: "boshqaruv" },
    { en: "description", uz: "tavsif" },
    { en: "direct", uz: "to'g'ridan-to'g'ri" },
    { en: "exam", uz: "imtihon" },
    { en: "example", uz: "misol" },
    { en: "limit", uz: "chegara" },
    { en: "local", uz: "mahalliy" },
    { en: "magical", uz: "sehrli" },
    { en: "mail", uz: "pochta" },
    { en: "novel", uz: "roman" },
    { en: "outline", uz: "reja" },
    { en: "poet", uz: "shoir" },
    { en: "print", uz: "bosib chiqarmoq" },
    { en: "scene", uz: "sahna" },
    { en: "sheet", uz: "varaq" },
    { en: "silly", uz: "ahmoqona" },
    { en: "store", uz: "do'kon, saqlamoq" },
    { en: "suffer", uz: "azoblanmoq" },
    { en: "technology", uz: "texnologiya" }
  ],
  15: [
    { en: "across", uz: "kesib" },
    { en: "breathe", uz: "nafas olmoq" },
    { en: "characteristic", uz: "xususiyat" },
    { en: "consume", uz: "iste'mol qilmoq" },
    { en: "excite", uz: "hayajonlantirmoq" },
    { en: "extreme", uz: "haddan tashqari" },
    { en: "fear", uz: "qo'rquv" },
    { en: "fortunate", uz: "baxtli" },
    { en: "happen", uz: "sodir bo'lmoq" },
    { en: "length", uz: "uzunlik" },
    { en: "mistake", uz: "xato" },
    { en: "observe", uz: "kuzatmoq" },
    { en: "opportunity", uz: "imkoniyat" },
    { en: "prize", uz: "sovrin" },
    { en: "race", uz: "irq, poyga" },
    { en: "realize", uz: "tushunmoq" },
    { en: "respond", uz: "javob bermoq" },
    { en: "risk", uz: "xavf" },
    { en: "wonder", uz: "hayron bo'lmoq" },
    { en: "yet", uz: "hali" }
  ],
  16: [
    { en: "academy", uz: "akademiya" },
    { en: "ancient", uz: "qadimiy" },
    { en: "board", uz: "taxta" },
    { en: "century", uz: "asr" },
    { en: "clue", uz: "ko'rsatma, ma'lumot" },
    { en: "concert", uz: "konsert" },
    { en: "county", uz: "graflik" },
    { en: "dictionary", uz: "lug'at" },
    { en: "exist", uz: "mavjud" },
    { en: "flat", uz: "tekis" },
    { en: "gentleman", uz: "janob" },
    { en: "hidden", uz: "yashirin" },
    { en: "maybe", uz: "balki" },
    { en: "officer", uz: "ofitser" },
    { en: "original", uz: "original" },
    { en: "pound", uz: "funt, og'irmoq" },
    { en: "process", uz: "jarayon" },
    { en: "publish", uz: "nashr etmoq" },
    { en: "theater", uz: "teatr" },
    { en: "wealth", uz: "boylik" }
  ],
  17: [
    { en: "appreciate", uz: "qadrlamoq" },
    { en: "available", uz: "mavjud" },
    { en: "beat", uz: "urmoq" },
    { en: "bright", uz: "yorqin" },
    { en: "celebrate", uz: "nishonlamoq" },
    { en: "determine", uz: "aniqlamoq" },
    { en: "disappear", uz: "yo'qolmoq" },
    { en: "else", uz: "yana boshqa" },
    { en: "fair", uz: "adolatli" },
    { en: "flow", uz: "oqim" },
    { en: "forward", uz: "oldinga" },
    { en: "hill", uz: "tepalik" },
    { en: "level", uz: "daraja" },
    { en: "lone", uz: "yolg'iz" },
    { en: "puddle", uz: "ko'lmak" },
    { en: "response", uz: "javob" },
    { en: "season", uz: "mavsum" },
    { en: "solution", uz: "yechim" },
    { en: "waste", uz: "chiqindi" },
    { en: "whether", uz: "yoki" }
   18: [
    { en: "argue", uz: "bahslashmoq" },
    { en: "communicate", uz: "muloqot qilmoq" },
    { en: "crowd", uz: "olomon" },
    { en: "depend", uz: "qaram bo'lmoq" },
    { en: "dish", uz: "ovqat" },
    { en: "empty", uz: "bo'sh" },
    { en: "exact", uz: "aniq" },
    { en: "fresh", uz: "yangi" },
    { en: "gather", uz: "to'plamoq" },
    { en: "indicate", uz: "ko'rsatmoq" },
    { en: "item", uz: "buyum" },
    { en: "offer", uz: "taklif qilmoq" },
    { en: "price", uz: "narx" },
    { en: "product", uz: "mahsulot" },
    { en: "property", uz: "mulki" },
    { en: "purchase", uz: "sotib olmoq" },
    { en: "recommend", uz: "tavsiya qilmoq" },
    { en: "select", uz: "tanlamoq" },
    { en: "tool", uz: "asbob" },
    { en: "treat", uz: "davolamoq, munosibatda bo'lmoq" }
  ],
  19: [
    { en: "alive", uz: "tirik" },
    { en: "bone", uz: "suyak" },
    { en: "bother", uz: "bezovta qilmoq" },
    { en: "captain", uz: "kapitan" },
    { en: "conclusion", uz: "xulosa" },
    { en: "doubt", uz: "shubha" },
    { en: "explore", uz: "kashf qilmoq" },
    { en: "foreign", uz: "xorijiy" },
    { en: "glad", uz: "mamnun" },
    { en: "however", uz: "biroq" },
    { en: "injustice", uz: "adolatsizlik" },
    { en: "international", uz: "xalqaro" },
    { en: "lawyer", uz: "yurist" },
    { en: "mention", uz: "eslatmoq" },
    { en: "policy", uz: "siyosat" },
    { en: "social", uz: "ijtimoiy" },
    { en: "speech", uz: "nutq" },
    { en: "staff", uz: "xodimlar" },
    { en: "toward", uz: "tomonga" },
    { en: "wood", uz: "yog'och" }
  ],
  20: [
    { en: "achieve", uz: "erishmoq" },
    { en: "advise", uz: "maslahat bermoq" },
    { en: "already", uz: "allaqachon" },
    { en: "basic", uz: "asosiy" },
    { en: "bit", uz: "bo'lak" },
    { en: "consider", uz: "o'ylab ko'rmoq" },
    { en: "destroy", uz: "yo'q qilmoq" },
    { en: "entertain", uz: "ko'ngil ochmoq" },
    { en: "extra", uz: "qo'shimcha" },
    { en: "goal", uz: "maqsad" },
    { en: "lie", uz: "yolg'on gapirmoq" },
    { en: "meat", uz: "go'sht" },
    { en: "opinion", uz: "fikr" },
    { en: "real", uz: "haqiqiy" },
    { en: "reflect", uz: "aks ettirmoq" },
    { en: "regard", uz: "deb bilmoq" },
    { en: "serve", uz: "xizmat qilmoq" },
    { en: "vegetable", uz: "sabzavot" },
    { en: "war", uz: "urush" },
    { en: "worth", uz: "qimmat" }
  ],
  21: [
    { en: "appear", uz: "paydo bo'lmoq" },
    { en: "base", uz: "asos" },
    { en: "brain", uz: "miya" },
    { en: "career", uz: "martaba" },
    { en: "clerk", uz: "xizmatchi" },
    { en: "effort", uz: "harakat" },
    { en: "enter", uz: "kirishmoq" },
    { en: "excellent", uz: "ajoyib" },
    { en: "hero", uz: "qahramon" },
    { en: "hurry", uz: "shoshilmoq" },
    { en: "inform", uz: "axborot bermoq" },
    { en: "later", uz: "keyinroq" },
    { en: "leave", uz: "tashlab ketmoq" },
    { en: "locate", uz: "topmoq" },
    { en: "nurse", uz: "hamshira" },
    { en: "operation", uz: "operatsiya" },
    { en: "pain", uz: "og'riq" },
    { en: "refuse", uz: "rad qilmoq" },
    { en: "though", uz: "garchi" },
    { en: "various", uz: "turli" }
  ],
  22: [
    { en: "actual", uz: "haqiqiy" },
    { en: "amaze", uz: "hayratlanmoq" },
    { en: "charge", uz: "zaryadlash" },
    { en: "comfort", uz: "qulaylik" },
    { en: "contact", uz: "aloqa qilmoq" },
    { en: "customer", uz: "mijoz" },
    { en: "deliver", uz: "yetkazib bermoq" },
    { en: "earn", uz: "ishlab topmoq" },
    { en: "gate", uz: "darvoza" },
    { en: "include", uz: "qo'shib qo'ymoq" },
    { en: "manage", uz: "boshqarmoq" },
    { en: "mystery", uz: "sir" },
    { en: "occur", uz: "uchramoq" },
    { en: "opposite", uz: "qarama-qarshi" },
    { en: "plate", uz: "likopcha" },
    { en: "receive", uz: "qabul qilmoq" },
    { en: "reward", uz: "sovrin" },
    { en: "set", uz: "qo'ymoq, o'rnatmoq" },
    { en: "steal", uz: "o'g'irlamoq" },
    { en: "thief", uz: "o'g'ri" }
  ],
  23: [
    { en: "advance", uz: "oldinga siljimoq" },
    { en: "athlete", uz: "sportchi" },
    { en: "average", uz: "o'rtacha" },
    { en: "behavior", uz: "xatti-harakat" },
    { en: "behind", uz: "orqasida" },
    { en: "course", uz: "yo'nalish, kurs" },
    { en: "lower", uz: "pasaytirmoq" },
    { en: "match", uz: "o'yin" },
    { en: "member", uz: "azo" },
    { en: "mental", uz: "aqliy" },
    { en: "passenger", uz: "yo'lovchi" },
    { en: "personality", uz: "shaxsiyat" },
    { en: "poem", uz: "she'r" },
    { en: "pole", uz: "qutb, asos" },
    { en: "remove", uz: "olib tashlash" },
    { en: "safety", uz: "xavfsizlik" },
    { en: "shoot", uz: "otmoq" },
    { en: "sound", uz: "ovoz" },
    { en: "swim", uz: "suzmoq" },
    { en: "web", uz: "o'rgimchak to'ri" }
  ],
  24: [
    { en: "block", uz: "blok" },
    { en: "cheer", uz: "hayqiriq" },
    { en: "complex", uz: "murakkab" },
    { en: "critic", uz: "tanqidchi" },
    { en: "event", uz: "voqea" },
    { en: "exercise", uz: "mashq qilmoq" },
    { en: "fit", uz: "mos kelmoq" },
    { en: "friendship", uz: "do'stlik" },
    { en: "guide", uz: "yo'l ko'rsatmoq" },
    { en: "lack", uz: "kamchilik" },
    { en: "passage", uz: "yo'lak" },
    { en: "perform", uz: "ijro etmoq" },
    { en: "pressure", uz: "bosim" },
    { en: "probable", uz: "ehtimol" },
    { en: "public", uz: "jamoatchilik" },
    { en: "strike", uz: "urmoq" },
    { en: "support", uz: "qo'llab-quvvatlamoq" },
    { en: "task", uz: "vazifa" },
    { en: "term", uz: "muddat" },
    { en: "unite", uz: "birlashtirmoq" }
  ],
  25: [
    { en: "associate", uz: "bog'lamoq" },
    { en: "environment", uz: "atrof-muhit" },
    { en: "factory", uz: "zavod" },
    { en: "feature", uz: "xususiyat" },
    { en: "instance", uz: "misol" },
    { en: "involve", uz: "mashg'ul bo'lmoq" },
    { en: "medicine", uz: "dori" },
    { en: "mix", uz: "aralashtirmoq" },
    { en: "organize", uz: "tashkil qilmoq" },
    { en: "period", uz: "davr" },
    { en: "populate", uz: "yashamoq" },
    { en: "produce", uz: "ishlab chiqarmoq" },
    { en: "range", uz: "bir qator tur" },
    { en: "recognize", uz: "tanimoq" },
    { en: "regular", uz: "muntazam" },
    { en: "sign", uz: "belgi" },
    { en: "tip", uz: "uch" },
    { en: "tradition", uz: "an'ana" },
    { en: "trash", uz: "axlat" },
    { en: "wide", uz: "keng" }
  ],
  26: [
    { en: "advice", uz: "maslahat" },
    { en: "along", uz: "davomida" },
    { en: "attention", uz: "diqqat" },
    { en: "attract", uz: "jalb qilmoq" },
    { en: "climb", uz: "ko'tarilmoq" },
    { en: "drop", uz: "tushmoq" },
    { en: "final", uz: "oxirgi" },
    { en: "further", uz: "uzoqroq" },
    { en: "imply", uz: "shama qilmoq" },
    { en: "maintain", uz: "saqlamoq" },
    { en: "neither", uz: "na" },
    { en: "otherwise", uz: "aks holda" },
    { en: "physical", uz: "jismoniy" },
    { en: "prove", uz: "isbotlamoq" },
    { en: "react", uz: "javob bermoq" },
    { en: "ride", uz: "minmoq" },
    { en: "situated", uz: "joylashgan" },
    { en: "society", uz: "jamiyat" },
    { en: "standard", uz: "standart" },
    { en: "suggest", uz: "taklif qilmoq" }
  ],
  27: [
    { en: "actually", uz: "aslida" },
    { en: "bite", uz: "tishlamoq" },
    { en: "coast", uz: "qirg'oq" },
    { en: "deal", uz: "kelishuv" },
    { en: "desert", uz: "cho'l" },
    { en: "earthquake", uz: "zilzila" },
    { en: "effective", uz: "samarali" },
    { en: "examine", uz: "o'rganmoq" },
    { en: "false", uz: "noto'g'ri" },
    { en: "gift", uz: "sovg'a" },
    { en: "hunger", uz: "ochlik" },
    { en: "imagine", uz: "tasavvur qilmoq" },
    { en: "journey", uz: "sayohat" },
    { en: "puzzle", uz: "jumboq" },
    { en: "quite", uz: "biroq" },
    { en: "rather", uz: "maqul ko'rmoq" },
    { en: "specific", uz: "o'ziga xos" },
    { en: "tour", uz: "sayohat" },
    { en: "trip", uz: "safar" },
    { en: "value", uz: "qadr, qiymat" }
  ],
  28: [
    { en: "band", uz: "musiqiy guruh" },
    { en: "barely", uz: "zo'rg'a" },
    { en: "boring", uz: "zerikarli" },
    { en: "cancel", uz: "bekor qilmoq" },
    { en: "driveway", uz: "yo'lak" },
    { en: "garbage", uz: "axlat" },
    { en: "instrument", uz: "asbob" },
    { en: "list", uz: "ro'yxat" },
    { en: "magic", uz: "sehr" },
    { en: "message", uz: "xabar" },
    { en: "notice", uz: "payqamoq" },
    { en: "own", uz: "ega bo'lmoq" },
    { en: "predict", uz: "taxmin qilmoq" },
    { en: "professor", uz: "professor" },
    { en: "rush", uz: "shoshilmoq" },
    { en: "schedule", uz: "jadval" },
    { en: "share", uz: "ulashmoq" },
    { en: "stage", uz: "bosqich" },
    { en: "storm", uz: "bo'ron" },
    { en: "within", uz: "ichida" }
  ],
  29: [
    { en: "advertise", uz: "reklama qilmoq" },
    { en: "assign", uz: "tayinlamoq" },
    { en: "audience", uz: "tomoshabin" },
    { en: "breakfast", uz: "nonushta" },
    { en: "competition", uz: "musobaqa" },
    { en: "cool", uz: "salqin, ajoyib" },
    { en: "gain", uz: "erishmoq" },
    { en: "importance", uz: "ahamiyat" },
    { en: "knowledge", uz: "bilim" },
    { en: "major", uz: "katta" },
    { en: "mean", uz: "anglatmoq" },
    { en: "prefer", uz: "afzal ko'rmoq" },
    { en: "president", uz: "prezident" },
    { en: "progress", uz: "taraqqiyot" },
    { en: "respect", uz: "hurmat" },
    { en: "rich", uz: "boy" },
    { en: "skill", uz: "qobiliyat" },
    { en: "somehow", uz: "qandaydir yo'l bilan" },
    { en: "strength", uz: "kuch-quvvat" },
    { en: "vote", uz: "ovoz bermoq" }
  ],
  30: [
    { en: "above", uz: "yuqorida" },
    { en: "ahead", uz: "oldinda" },
    { en: "amount", uz: "miqdor" },
    { en: "belief", uz: "e'tiqod" },
    { en: "center", uz: "markaz" },
    { en: "common", uz: "umumiy" },
    { en: "cost", uz: "xarajat" },
    { en: "demonstrate", uz: "namoyish qilmoq" },
    { en: "different", uz: "turli" },
    { en: "evidence", uz: "dalil" },
    { en: "honesty", uz: "halollik" },
    { en: "idiom", uz: "ibora" },
    { en: "independent", uz: "mustaqil" },
    { en: "inside", uz: "ichida" },
    { en: "master", uz: "usta" },
    { en: "memory", uz: "xotira" },
    { en: "proper", uz: "to'g'ri" },
    { en: "scan", uz: "ko'zdan kechirmoq" },
    { en: "section", uz: "bo'lim" },
    { en: "surface", uz: "sirt" }
  ]
};

// NOTE: For brevity in this code snippet I included units 1-10 fully and noted to add 11..30 similarly.
// In your deployed version paste all units 11..30 just like 1..10 above (you provided them in the prompt).
// For correct operation, ensure UNITS contains 1..30 each with 20 items.

// Utility: flatten all translations for selecting wrong options
function allTranslations() {
  const arr = [];
  Object.values(UNITS).forEach(unitArr => {
    unitArr.forEach(item => arr.push(item.uz));
  });
  return arr;
}
const ALL_UZ = allTranslations();

// In-memory state
const tests = new Map(); // key: chatId -> { unit, questions[], currentIndex, questionTimer, scores: Map<userId, {name, score, correctCount}>, perQuestionAnswered: Set<userId> }

// Helpers
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function makeQuestionPayload(unitNum, askedWords) {
  const unitArr = UNITS[unitNum];
  // pick a word not asked before
  const candidates = unitArr.filter(w => !askedWords.has(w.en));
  if (candidates.length === 0) return null;
  const correct = candidates[Math.floor(Math.random() * candidates.length)];
  // pick 3 wrong translations from ALL_UZ excluding the correct one
  const wrongs = [];
  const pool = ALL_UZ.filter(t => t !== correct.uz);
  shuffle(pool);
  for (let i = 0; i < 3 && i < pool.length; i++) wrongs.push(pool[i]);
  const options = shuffle([correct.uz, ...wrongs]).slice(0,4);
  return {
    en: correct.en,
    correctUz: correct.uz,
    options
  };
}

async function sendQuestion(chatId) {
  const state = tests.get(chatId);
  if (!state) return;
  if (state.currentIndex >= 20) {
    // finish
    return finishTest(chatId);
  }
  // prepare next question
  const payload = makeQuestionPayload(state.unit, state.askedWords);
  if (!payload) {
    // fallback: finish
    return finishTest(chatId);
  }
  state.currentQuestion = payload;
  state.perQuestionAnswered = new Set();
  // construct keyboard
  const buttons = payload.options.map((opt, idx) =>
    Markup.button.callback(opt, `answer|${chatId}|${opt}`)
  );
  const keyboard = Markup.inlineKeyboard([
    [buttons[0], buttons[1]],
    [buttons[2], buttons[3]]
  ]);
  state.currentIndex += 1;

  // send message
  const text = `❓ "${payload.en}" so‘zining ma'nosini toping:\n\n` +
               payload.options.map((o,i)=>`[${i+1}] ${o}`).join('\n') +
               `\n\n⏱ Sizda 10 soniya bor. Savol #: ${state.currentIndex}/20`;
  const sent = await bot.telegram.sendMessage(chatId, text, keyboard);
  state.currentMessageId = sent.message_id;

  // start timer
  if (state.questionTimer) clearTimeout(state.questionTimer);
  state.questionTimer = setTimeout(async () => {
    // time up -> show correct to group (but per spec, other users should not see individual's answer)
    // We will send a short message to group about time up and what the correct answer was.
    await bot.telegram.sendMessage(chatId, `⏰ Vaqt tugadi. To'g'ri javob: ${payload.correctUz}`);
    // proceed to next
    sendQuestion(chatId);
  }, 10000);
}

async function finishTest(chatId) {
  const state = tests.get(chatId);
  if (!state) return;
  if (state.questionTimer) clearTimeout(state.questionTimer);
  // prepare results
  const scoresArr = Array.from(state.scores.entries()).map(([userId, data]) => ({
    userId, name: data.name, score: data.score
  }));
  scoresArr.sort((a,b) => b.score - a.score);
  let resultText = `🏁 "Unit ${state.unit}" testi yakunlandi!\n20 ta savol berildi.\n\n🏆 Natijalar:\n`;
  const medals = ['🥇','🥈','🥉'];
  scoresArr.forEach((s, idx) => {
    const prefix = idx < 3 ? medals[idx] : `${idx+1})`;
    resultText += `${prefix} ${s.name} - ${s.score}\n`;
  });
  if (scoresArr.length === 0) resultText += `Hech kim javob bermadi.`;
  await bot.telegram.sendMessage(chatId, resultText);

  // send thank-you messages to winners individually (per spec: bot thanks the winner)
  // We'll DM top 3 if possible:
  const top = scoresArr.slice(0,3);
  for (const t of top) {
    try {
      await bot.telegram.sendMessage(t.userId, `Tashakkur!\nSiz bizning BOT tomonda yuborilgan testni yechgan holda o'z bilimingizni mustahkamladingiz.\n4000 Essential English Words Unit ${state.unit}\nTo'g'ri javoblar - ${t.score}`);
    } catch (e) {
      // user may not accept PMs
    }
  }

  tests.delete(chatId);
}

// Command: /start
bot.start((ctx) => {
  ctx.reply(`😁 Salom! Men @SULTSH_YT tomonidan yaratilgan Lug'at Botman.
Menda 30 ta unit (bo'lim) bor!
Meni guruhga qo'shing va admin qiling — shunda testlar ishlaydi 🚀`);
});

// Handler for /unitN in group (e.g., /unit7)
bot.hears(/^\/unit(\d{1,2})$/, async (ctx) => {
  const chat = ctx.chat;
  if (!chat || chat.type === 'private') {
    return ctx.reply('Unit testlarini faqat guruhlarda boshlash mumkin.');
  }
  const unitNum = parseInt(ctx.match[1], 10);
  if (!(unitNum in UNITS)) {
    return ctx.reply('Unit mavjud emas yoki to‘liq yuklanmagan. Iltimos unit raqamini 1..30 orasidan tanlang.');
  }

  try {
    // Check if user is creator/admin
    const member = await ctx.getChatMember(ctx.from.id);
    if (!(member.status === 'creator' || member.status === 'administrator')) {
      return ctx.reply('Faqat guruh egasi yoki adminlar test boshlay oladi.');
    }
  } catch (e) {
    // fallback: deny
    return ctx.reply('Guruh a'zoligini tekshirishda xato yuz berdi.');
  }

  const chatId = chat.id;
  if (tests.has(chatId)) {
    return ctx.reply('Guruhda allaqachon test davom etmoqda. Iltimos tugashini kuting.');
  }

  // setup test state
  const state = {
    unit: unitNum,
    currentIndex: 0,
    questionTimer: null,
    scores: new Map(),
    askedWords: new Set(),
    currentQuestion: null,
    perQuestionAnswered: new Set()
  };
  tests.set(chatId, state);

  // Send intro + start button
  await ctx.replyWithMarkdown(`🎲 *4000 Essential English Words — Unit ${unitNum}* testiga tayyorlaning!\n🖊 20 ta savol\n⏱ Har bir savol uchun 10 soniya`, Markup.inlineKeyboard([
    [Markup.button.callback('🚀 Boshlash', `starttest|${chatId}`)]
  ]));
});

// Callback handler for start
bot.on('callback_query', async (ctx) => {
  const data = ctx.callbackQuery.data || '';
  const from = ctx.callbackQuery.from;
  const parts = data.split('|');
  const action = parts[0];

  if (action === 'starttest') {
    const chatId = Number(parts[1]);
    const state = tests.get(chatId);
    if (!state) {
      await ctx.answerCbQuery('Test topilmadi yoki tugagan.', { show_alert: true });
      return;
    }
    // Only allow admin/creator to press "Boshlash" in group
    try {
      const member = await ctx.telegram.getChatMember(chatId, from.id);
      if (!(member.status === 'creator' || member.status === 'administrator')) {
        await ctx.answerCbQuery('Faqat guruh egasi yoki admin testni boshlashi mumkin.', { show_alert: true });
        return;
      }
    } catch (e) {
      await ctx.answerCbQuery('A'zolikni tekshirishda xato.', { show_alert: true });
      return;
    }

    // Start: send first question
    await ctx.answerCbQuery('Test boshlandi!');
    sendQuestion(chatId);
    return;
  }

  if (action === 'answer') {
    // format: answer|chatId|optionText
    const chatId = Number(parts[1]);
    const selected = parts.slice(2).join('|'); // in case option had |
    const state = tests.get(chatId);
    if (!state) {
      await ctx.answerCbQuery('Bu savol eskirgan yoki test tugagan.', { show_alert: true });
      return;
    }
    const userId = from.id;
    const userName = (from.username ? `@${from.username}` : `${from.first_name}${from.last_name? ' ' + from.last_name : ''}`);
    // Has this user already answered THIS question?
    if (state.perQuestionAnswered.has(userId)) {
      await ctx.answerCbQuery('Siz allaqachon ushbu savolga javob berdingiz.', { show_alert: true });
      return;
    }
    // Mark answered
    state.perQuestionAnswered.add(userId);

    // Check correctness
    const correct = state.currentQuestion && (selected === state.currentQuestion.correctUz);
    if (correct) {
      // add score
      const prev = state.scores.get(userId) || { name: userName, score: 0 };
      prev.name = userName;
      prev.score = (prev.score || 0) + 1;
      state.scores.set(userId, prev);
      // show alert only to this user
      await ctx.answerCbQuery('✅ To‘g‘ri!', { show_alert: true });
    } else {
      await ctx.answerCbQuery('❌ Noto‘g‘ri!', { show_alert: true });
    }

    // Optionally: edit message to disable buttons for UX (will remove for everyone).
    try {
      await ctx.telegram.editMessageReplyMarkup(chatId, state.currentMessageId, null, { inline_keyboard: [] });
    } catch (e) {
      // ignore if can't edit
    }

    // Keep track of asked word so it won't repeat
    if (state.currentQuestion) state.askedWords.add(state.currentQuestion.en);

    // If all users answered? We can't detect that, so wait for timer or move on quickly:
    // Move to next question after short delay (1s) to give UX
    if (state.questionTimer) {
      clearTimeout(state.questionTimer);
      state.questionTimer = setTimeout(() => sendQuestion(chatId), 1000);
    } else {
      sendQuestion(chatId);
    }
    return;
  }

  // Unknown action
  await ctx.answerCbQuery();
});

// Graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

bot.launch().then(() => {
  console.log('Bot started');

});

