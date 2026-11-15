# Still Good

Mobilioji programa, padedanti nuspręsti, ką pagaminti iš namuose turimų produktų. Pirmiausia ji siūlo receptus, sunaudojančius greičiausiai gendančius produktus. Kursinio darbo II dalis: veikiantis prototipas. Projektavimo dokumentas: [1-etapo-projektavimo-dokumentas.md](1-etapo-projektavimo-dokumentas.md).

## Reikalingi įrankiai

| Įrankis | Versija |
|---|---|
| Node.js | `^22.13` arba `^24.3` (to reikalauja Expo SDK 58); išbandyta su **24.15.0** |
| npm | išbandyta su **11.12.1** |
| Naršyklė (Chrome, Edge) arba telefonas su **Expo Go** (SDK 58) | – |

Pagrindinės bibliotekos (tikslios versijos – `package.json` ir `package-lock.json`): Expo SDK 58, React Native 0.88, React 19.3, expo-sqlite 58, Jest 30 su `jest-expo`, `sql.js` 1.15.1 (SQLite testuose), `tesseract.js` 7.0.0 (čekio OCR), `react-native-webview` 14 ir `expo-image-picker` 58 (čekio nuskaitymas telefone).

## Konfigūracija

Konfigūruoti nieko nereikia: nėra API raktų, aplinkos kintamųjų ar serverio. Visi duomenys saugomi įrenginyje, SQLite duomenų bazėje `still-good.db` (naršyklėje – svetainės saugykloje). Internetas reikalingas tik čekio nuskaitymui: OCR variklis ir lietuvių kalbos duomenys įkeliami iš CDN. Telefone čekio nuskaitymas paprašo leidimo naudoti kamerą.

## Paleidimas

Vieną kartą įdiekite priklausomybes:

```bash
npm install
```

Paleiskite prototipą naršyklėje (atsidaro adresu http://localhost:8081):

```bash
npm run web
```

Arba telefone: paleiskite `npm start` ir nuskenuokite QR kodą (Android – Expo Go programėle, iPhone – kamera). Telefonas ir kompiuteris turi būti tame pačiame Wi-Fi tinkle; jei neprisijungia, naudokite `npx expo start --tunnel`.

## Testai

```bash
npm test
```

Laukiamas rezultatas: **4 testų rinkiniai, 35 testai, visi sėkmingi.**

| Failas | Ką tikrina | II užduoties reikalavimas |
|---|---|---|
| `src/core/rank.test.js` | Pagrindinis modulis (receptų parinkimas ir rikiavimas): visi 3 skyriaus scenarijai ir 7 taisyklės. Įprastas atvejis (`scenario: usual case`); ribiniai ir konfliktiniai – vienodas balas, galioja šiandien, pasibaigęs galiojimas, nepakankamas kiekis, keli įrašai, skubumo balo ribos; neįmanomas rezultatas – receptų nerasta | įprastas, ribinis / konfliktinis |
| `src/core/products.test.js` | Produkto įtraukimo taisyklės: **klaidos atvejai** – produkto nėra sąraše, kiekis neigiamas / 0 / ne skaičius, neegzistuojanti data; kiekvienam tikrinamas tikslus klaidos pranešimas | klaidos atvejis |
| `src/storage.test.js` | **Klientų duomenų izoliavimas**: vienas namų ūkis negali perskaityti (savi produktai, svetimas `id` ignoruojamas) ir pakeisti (išsaugojimas, tas pats `id` abiejuose, istorijos atšaukimas) kito duomenų; nežinomo namų ūkio atverti negalima. Leidžiamos tos pačios SQL užklausos per `sql.js` (tikras SQLite, sukompiliuotas į WebAssembly), nes `expo-sqlite` veikia tik įrenginyje | klientų izoliavimas |
| `src/core/receipt.test.js` | Čekio eilučių susiejimas su produktais: sutrumpinti pavadinimai, prarastos diakritikos, OCR painiojamos raidės (I, l, 1), švieži ir konservuoti pomidorai, sumų eilutės | – |

## Čekių atpažinimo bandymas

Kriterijus (projektavimo dokumento 7 skyrius): ne mažiau kaip 70 % čekio produktų turi būti atpažinta teisingai. Tekstą iš nuotraukos nuskaito atvirojo kodo OCR **Tesseract** (`tesseract.js`, lietuvių kalba), o eilutes su produktais susieja taisyklėmis grįstas modulis `src/core/receipt.js` – AI nenaudojamas.

1. Į aplanką `receipts/` įdėkite čekių nuotraukas: `01.jpg`, `02.jpg`, …
2. Šalia kiekvienos sukurkite failą tuo pačiu pavadinimu (`01.txt`), kuriame po vieną eilutėje surašyti produktai, tikrai esantys čekyje (produktų sąrašo pavadinimais, pvz., `kiaušiniai`). Prekių, kurių sąraše nėra, nerašykite.
3. Paleiskite:

```bash
npm run receipts
```

Kiekvienam čekiui parodoma, kiek produktų rasta ir kas rasta klaidingai, o pabaigoje – bendras procentas ir ar pasiektas 70 % kriterijus. Nuskaitytas tekstas išsaugomas `receipts/01.ocr.txt`, kad matytųsi, kodėl produktas nerastas. Pirmą kartą atsisiunčiami lietuvių kalbos duomenys (reikia interneto). Aplankas `receipts/` laikomas git'e (išskyrus atsisiųstus kalbos duomenis `*.traineddata`), todėl į jį nedėkite tikrų čekių su asmeniniais duomenimis.

### Pavyzdiniai čekiai (`receipts/`)

Repozitorijoje laikomi 10 pavyzdinių čekių, kad bandymą būtų galima pakartoti be asmeninių duomenų. Kiekvienam čekiui yra Word failas (`01.docx`), iš jo eksportuotas paveikslėlis (`01.jpg`), tikrasis produktų sąrašas (`01.txt`) ir OCR nuskaitytas tekstas (`01.ocr.txt`). Čekiai panašūs į tikrus: sutrumpinti pavadinimai, kainos, SUMA ir PVM eilutės, po vieną prekę, kurios nėra produktų sąraše. Kartu jie apima visus 38 produktų sąrašo produktus. Paleidus `npm run receipts`, rezultatas toks pat kaip `receipts/results.txt`: **41 iš 43 produktų (95 %)**, kriterijus (70 %) pasiektas. Nerasti „PIEVAGRYBIAI“ (grybai) ir „DEŠRELĖS PIEN.“ (eilutė tinka ir pienui, todėl paliekama naudotojui); klaidingai rasti 3 produktai, kuriuos naudotojas atžymėtų patvirtinimo ekrane. Šie čekiai sukurti Word programa, todėl jų nuotraukos idealiai aiškios.

## Klientai ir pavyzdiniai duomenys

Klientas yra **namų ūkis**. Kaip užtikrinamas atskyrimas:

1. **PIN** – sąsajos užraktas: kito namų ūkio duomenys rodomi tik įvedus jo PIN.
2. **Namų ūkio saugykla** – vienintelis kelias prie duomenų yra `openHousehold(id)` (`src/storage.js`). Ji patikrina, kad namų ūkis egzistuoja, ir grąžina objektą, kurio metodai (`loadProducts`, `saveProducts`, `loadHistory`, `addCooked`, `removeCooked`) jau pririšti prie to namų ūkio. Sąsaja niekur neperduoda namų ūkio `id` užklausoms, todėl kodas, turintis vieno namų ūkio saugyklą, negali pasiekti kito duomenų.
3. **Duomenų bazė** – kiekviena eilutė (`products`, `cooked`) turi `household_id`: jis yra pirminio rakto dalis (tas pats `id` skirtinguose namų ūkiuose nesusikerta) ir išorinis raktas (negalima įrašyti nežinomam namų ūkiui), o kiekviena užklausa filtruojama pagal jį.

Pirmą kartą paleidus sukuriami du namų ūkiai (`src/data/households.js`). Galiojimo datos skaičiuojamos nuo pirmo paleidimo dienos:

| Namų ūkis | PIN | Produktai |
|---|---|---|
| Dominyk | 1111 | kiaušiniai 3 vnt. (galioja 1 d.), sūris 200 g (3 d.), pienas 1000 ml, miltai 1000 g, sviestas 200 g, bulvės 1000 g |
| Ferdinando | 2222 | malta mėsa 500 g (2 d.), pomidorai (4 d.), makaronai 500 g, svogūnai |

Produktams be datos taikomas numatytasis terminas pagal tipą (`src/data/catalog.js`). Receptų rinkinys yra `src/data/recipes.js` (50 receptų su nuotraukomis).

Norėdami grįžti prie pradinių duomenų, naršyklėje išvalykite svetainės duomenis (localhost:8081), o telefone – Expo Go programėlės duomenis. Senesnės versijos duomenų bazė atnaujinama automatiškai: ji ištrinama ir sukuriama iš naujo su pavyzdiniais duomenimis.

## Demonstravimo žingsniai

**Prieš demonstraciją** atverkite naršyklę privačiame (incognito) lange arba išvalykite svetainės duomenis: pavyzdinių produktų galiojimo datos skaičiuojamos nuo pirmo paleidimo dienos, todėl žemiau aprašyta tvarka galioja švariems duomenims.

1. **Prisijungimas:** `npm run web`. Atsidaro naudotojo **Dominyk** PIN ekranas. Neteisingas PIN (pvz., 1234) rodo „Neteisingas PIN“; įveskite **1111**. Skirtuke „Produktai“ – 6 produktai, surikiuoti pagal likusias dienas (kiaušiniai – 1 d., sūris – 3 d.).
2. **Pagrindinis scenarijus:** skirtukas **„Receptai“**. Pirma kortelė – **Omletas su sūriu** (skubumas 6): jis sunaudoja greičiausiai gendančius kiaušinius ir sūrį. Kortelėje matosi gaminimo trukmė, skubumo balas, kiek ingredientų turite, o trūkstami pažymėti su priežastimi. Perbraukus kairėn receptas praleidžiamas, dešinėn – pasirenkamas (pele naršyklėje – nutempiant kortelę). „Rodyti sąrašą“ parodo visą sąrašą.
3. **Eiliškumas atsinaujina:** grįžkite į „Produktai“ ir paspauskite „+ duona“. Atvėrus „Receptai“, antra kortelė jau **Prancūziški skrebučiai** – be jokio papildomo mygtuko.
4. **Pagaminimas:** perbraukite „Omletas su sūriu“ dešinėn – atsidaro recepto puslapis su ingredientais ir žingsniais („‹ Atgal“ grąžina prie tos pačios kortelės). Paspauskite **„Pagaminau“**: nurašomi 3 kiaušiniai, 100 g sūrio ir 50 ml pieno. Pirma kortelė tampa **Bulvių košė**, o omletui dabar „Trūksta 1“ (kiaušiniai). Mygtukas „Atšaukti“ grąžina produktus. Pagamintas receptas įrašomas į skirtuką **„Istorija“** (su data) ir išlieka paleidus programą iš naujo.
5. **Klaidos atvejai:** įveskite kiekį „0“ (naršyklėje galima ir „-1“) arba datą „2026-13-40“ ir paspauskite produktą – rodomas klaidos pranešimas, produktas neįtraukiamas. Šias taisykles tikrina pagrindinis modulis (`createEntry` faile `src/core/products.js`), testai – `src/core/products.test.js`.
6. **Klientų atskyrimas:** paspauskite **Ferdinando** – programa paprašo jo PIN (**2222**), tada matomi tik jo 4 produktai (malta mėsa, pomidorai, makaronai, svogūnai) ir jo receptai (pirma kortelė – Bolonijos makaronai). Paspaudus Dominyk vėl prašoma PIN 1111; jo pakeitimai (duona, nurašyti produktai) išlikę ir pas Ferdinando nesimato. Kaip tai užtikrinama – skyriuje „Klientai ir pavyzdiniai duomenys“; „Užrakinti“ vėl užrakina naudotoją.
7. **Čekio nuskaitymas:** skirtuke „Produktai“ paspauskite **Nuskaityti čekį**. Kompiuteryje pasirinkite paveikslėlį, pvz., `receipts/04.jpg`; telefone atsidaro kamera. Po kelių sekundžių rodomas rastų produktų sąrašas su čekio eilutėmis; klaidingai rastus atžymėkite ir spauskite „Pridėti“. „Rodyti nuskaitytą tekstą“ parodo, ką perskaitė OCR. Be interneto rodoma „Nepavyko nuskaityti čekio“.
8. **Testų rezultatai:** terminale `npm test` – 4 rinkiniai, 35 testai, visi sėkmingi (žr. skyrių „Testai“). `npm run receipts` – 41 iš 43 (95 %).
9. **Receptų nerasta** (paskutinis, nes pašalina pavyzdinius duomenis): pašalinkite visus produktus (✕) ir atverkite „Receptai“ – rodomas pranešimas „Receptų nerasta“ su mygtuku „Pridėti produktų“, o ne tuščias ekranas.

## Struktūra

| Kelias | Atsakomybė |
|---|---|
| `src/core/rank.js` | Pagrindinis modulis: receptų atranka, skubumo balas, rikiavimas (taisyklės 1–7). Nepriklauso nuo sąsajos ir saugyklos |
| `src/core/products.js` | Produkto įtraukimo taisyklės ir klaidos (`createEntry`), likusios dienos, numatytieji terminai, produktų nurašymas pagaminus receptą |
| `src/core/receipt.js` | Čekio eilučių susiejimas su produktų sąrašu (taisyklės, be AI) |
| `scripts/receipt-test.mjs` | Čekių atpažinimo bandymas: Tesseract OCR + `receipt.js`, 70 % kriterijaus patikrinimas |
| `src/storage.js` | `openHousehold(id)` – vienam namų ūkiui pririšta SQLite saugykla (produktai ir pagamintų receptų istorija) |
| `src/data/` | Produktų katalogas, receptai, namų ūkiai (su PIN) ir jų pavyzdiniai duomenys |
| `src/theme.js` | Bendros spalvos, tarpai ir šriftai |
| `receipts/` | 10 pavyzdinių čekių ir čekių bandymo rezultatas (`results.txt`) |
| `metro.config.js` | Metro nustatymai, kad `expo-sqlite` veiktų naršyklėje (`.wasm` failai ir antraštės) |
| `App.js`, `src/ProductsScreen.js`, `src/RecipesScreen.js`, `src/HistoryScreen.js`, `src/PinScreen.js`, `src/ReceiptScreen.js` | Naudotojo sąsaja (`PinScreen.js` – namų ūkio PIN įvedimas, `ReceiptScreen.js` – čekio patvirtinimo ekranas) |
| `src/ocr.web.js`, `src/ocr.js`, `src/ocrPage.js` | Čekio fotografavimas ir Tesseract OCR: naršyklėje tiesiogiai, telefone (Expo Go) – paslėptame `WebView` |

Čekio nuskaitymas veikia ir naršyklėje (`npm run web`), ir telefone per **Expo Go** (`npm start`). Abiem atvejais mygtukas atveria kamerą (kompiuteryje – failo pasirinkimą). Expo Go pati negali paleisti Tesseract, todėl telefone OCR vykdomas paslėptame `WebView` (`src/ocr.js`, `src/ocrPage.js`) – tai ta pati Tesseract versija, įkeliama iš CDN. Pirmą kartą reikia interneto (atsisiunčiami OCR ir lietuvių kalbos duomenys). Naudojamas tas pats OCR ir `receipt.js`, kurie bandyme su pavyzdiniais čekiais pasiekė 95 %; atpažinti produktai niekada neįtraukiami automatiškai – naudotojas juos patvirtina (projektavimo dokumento 3 skyrius).

## Nukrypimai nuo projektavimo dokumento

| Planuota (I etapas) | Įgyvendinta | Kodėl |
|---|---|---|
| AsyncStorage | SQLite (`expo-sqlite`) | Klientų atskyrimui reikia, kad kiekviena eilutė priklausytų namų ūkiui ir užklausos būtų filtruojamos – tai natūraliai daroma SQL lentelėmis su raktais |
| `react-native-deck-swiper` | Savas perbraukimas (`PanResponder` + `Animated`, `src/RecipesScreen.js`) | Reikėjo, kad perbraukimas dešinėn iškart atvertų recepto puslapį ir veiktų pele naršyklėje; tai apie 70 eilučių be papildomos priklausomybės |
| React Navigation | Skirtukai ir recepto puslapis kaip perdanga | Trims ekranams navigacijos biblioteka nereikalinga |
| Receptų atranka pagal ingredientų indeksą | Visi receptai peržiūrimi iš eilės (`src/core/rank.js`) | Prie 50 receptų tai akimirksnis; rezultatas tas pats |
| Čekio nuskaitymas – pažymėtas kaip neaiškus | Įgyvendinta: Tesseract OCR + taisyklėmis grįstas susiejimas, patvirtinimo ekranas | Bandymas su 10 pavyzdinių čekių – 95 % (kriterijus 70 %) |
| Naudotojų paskyros – už apimties ribų | Du iš anksto paruošti namų ūkiai su PIN | II užduotis reikalauja bent dviejų klientų |
