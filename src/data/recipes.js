export const RECIPES = [
  { name: 'Omletas su sūriu', minutes: 10, image: require('../../assets/recipes/omletas-su-suriu.jpg'), ingredients: [
    { name: 'kiaušiniai', qty: 3 }, { name: 'sūris', qty: 100 }, { name: 'pienas', qty: 50 },
    { name: 'sviestas', qty: 10, optional: true }, { name: 'druska', qty: 2, optional: true }],
    steps: [
      'Kiaušinius suplakite su pienu ir žiupsneliu druskos.',
      'Sūrį sutarkuokite.',
      'Keptuvėje ištirpinkite sviestą ir supilkite kiaušinių masę.',
      'Kai apačia sustings, užberkite sūrį, perlenkite omletą ir kepkite dar 1–2 min.',
    ] },
  { name: 'Kiaušinienė', minutes: 5, image: require('../../assets/recipes/kiausiniene.jpg'), ingredients: [
    { name: 'kiaušiniai', qty: 2 }, { name: 'sviestas', qty: 10 }, { name: 'druska', qty: 1, optional: true }],
    steps: [
      'Keptuvėje ištirpinkite sviestą.',
      'Įmuškite kiaušinius ir pabarstykite druska.',
      'Kepkite ant vidutinės ugnies 3–4 min., kol baltymas sustings.',
    ] },
  { name: 'Blynai', minutes: 25, image: require('../../assets/recipes/blynai.jpg'), ingredients: [
    { name: 'kiaušiniai', qty: 2 }, { name: 'pienas', qty: 500 }, { name: 'miltai', qty: 200 },
    { name: 'cukrus', qty: 20, optional: true }, { name: 'aliejus', qty: 20, optional: true }],
    steps: [
      'Kiaušinius išplakite su cukrumi.',
      'Supilkite pieną ir po truputį berkite miltus, maišydami, kad neliktų gumuliukų.',
      'Įpilkite aliejaus ir leiskite tešlai pastovėti 10 min.',
      'Kepkite plonus blynus įkaitintoje keptuvėje iš abiejų pusių.',
    ] },
  { name: 'Makaronai su sūrio padažu', minutes: 20, image: require('../../assets/recipes/makaronai-su-surio-padazu.jpg'), ingredients: [
    { name: 'makaronai', qty: 200 }, { name: 'sūris', qty: 100 }, { name: 'pienas', qty: 300 },
    { name: 'sviestas', qty: 30 }, { name: 'miltai', qty: 30 }],
    steps: [
      'Išvirkite makaronus pasūdytame vandenyje.',
      'Puode ištirpinkite sviestą, įberkite miltus ir pakepinkite 1 min.',
      'Po truputį pilkite pieną ir maišykite, kol padažas sutirštės.',
      'Įberkite tarkuotą sūrį, išmaišykite ir sumaišykite su makaronais.',
    ] },
  { name: 'Varškėčiai', minutes: 25, image: require('../../assets/recipes/varskeciai.jpg'), ingredients: [
    { name: 'varškė', qty: 400 }, { name: 'kiaušiniai', qty: 1 }, { name: 'miltai', qty: 60 },
    { name: 'cukrus', qty: 30, optional: true }, { name: 'aliejus', qty: 30, optional: true }],
    steps: [
      'Varškę sutrinkite šakute su kiaušiniu ir cukrumi.',
      'Įmaišykite miltus, kad tešla nebeliptų prie rankų.',
      'Suformuokite paplotėlius ir apvoliokite juos miltuose.',
      'Kepkite aliejuje po 3–4 min. iš abiejų pusių.',
    ] },
  { name: 'Vištiena su ryžiais', minutes: 35, image: require('../../assets/recipes/vistiena-su-ryziais.jpg'), ingredients: [
    { name: 'vištiena', qty: 400 }, { name: 'ryžiai', qty: 200 }, { name: 'svogūnai', qty: 1 },
    { name: 'morkos', qty: 1 }, { name: 'aliejus', qty: 20, optional: true }, { name: 'druska', qty: 3, optional: true }],
    steps: [
      'Vištieną supjaustykite gabaliukais, svogūną ir morką – smulkiai.',
      'Aliejuje apkepkite vištieną, sudėkite svogūną ir morką.',
      'Suberkite nuplautus ryžius, užpilkite 400 ml vandens ir pasūdykite.',
      'Troškinkite uždengę ant silpnos ugnies apie 20 min., kol ryžiai suminkštės.',
    ] },
  { name: 'Bulvių košė', minutes: 25, image: require('../../assets/recipes/bulviu-kose.jpg'), ingredients: [
    { name: 'bulvės', qty: 800 }, { name: 'pienas', qty: 150 }, { name: 'sviestas', qty: 30 },
    { name: 'druska', qty: 3, optional: true }],
    steps: [
      'Bulves nulupkite, supjaustykite ir išvirkite pasūdytame vandenyje (apie 20 min.).',
      'Nupilkite vandenį ir sudėkite sviestą.',
      'Supilkite šiltą pieną ir sugrūskite iki vientisos košės.',
    ] },
  { name: 'Keptos bulvės su dešrelėmis', minutes: 30, image: require('../../assets/recipes/keptos-bulves-su-desrelemis.jpg'), ingredients: [
    { name: 'bulvės', qty: 600 }, { name: 'dešrelės', qty: 300 }, { name: 'svogūnai', qty: 1 },
    { name: 'aliejus', qty: 30, optional: true }],
    steps: [
      'Bulves nulupkite ir supjaustykite griežinėliais.',
      'Kepkite aliejuje apie 15 min., retkarčiais pavartydami.',
      'Sudėkite supjaustytą svogūną ir dešreles, kepkite dar 10 min.',
    ] },
  { name: 'Bolonijos makaronai', minutes: 35, image: require('../../assets/recipes/bolonijos-makaronai.jpg'), ingredients: [
    { name: 'makaronai', qty: 300 }, { name: 'malta mėsa', qty: 400 }, { name: 'konservuoti pomidorai', qty: 400 },
    { name: 'svogūnai', qty: 1 }, { name: 'česnakai', qty: 2, optional: true }],
    steps: [
      'Svogūną ir česnakus smulkiai supjaustykite ir pakepinkite.',
      'Sudėkite maltą mėsą ir kepkite, kol paruduos.',
      'Supilkite pomidorus, pasūdykite ir troškinkite 15–20 min.',
      'Išvirkite makaronus ir patiekite su padažu.',
    ] },
  { name: 'Kotletai', minutes: 35, image: require('../../assets/recipes/kotletai.jpg'), ingredients: [
    { name: 'malta mėsa', qty: 500 }, { name: 'kiaušiniai', qty: 1 }, { name: 'svogūnai', qty: 1 },
    { name: 'duona', qty: 50 }, { name: 'pipirai', qty: 1, optional: true }],
    steps: [
      'Duoną pamirkykite vandenyje ir nuspauskite.',
      'Sumaišykite maltą mėsą, kiaušinį, smulkintą svogūną, duoną ir prieskonius.',
      'Suformuokite kotletus.',
      'Kepkite aliejuje po 5–6 min. iš abiejų pusių, kol iškeps viduje.',
    ] },
  { name: 'Pomidorų ir agurkų salotos', minutes: 10, image: require('../../assets/recipes/pomidoru-ir-agurku-salotos.jpg'), ingredients: [
    { name: 'pomidorai', qty: 3 }, { name: 'agurkai', qty: 2 }, { name: 'grietinė', qty: 100 },
    { name: 'svogūnai', qty: 1, optional: true }],
    steps: [
      'Pomidorus ir agurkus supjaustykite.',
      'Jei norite, įpjaustykite svogūną.',
      'Pasūdykite ir išmaišykite su grietine.',
    ] },
  { name: 'Karšti sumuštiniai', minutes: 10, image: require('../../assets/recipes/karsti-sumustiniai.jpg'), ingredients: [
    { name: 'duona', qty: 200 }, { name: 'sūris', qty: 100 }, { name: 'kumpis', qty: 100 },
    { name: 'pomidorai', qty: 1, optional: true }],
    steps: [
      'Ant duonos riekių dėkite kumpį ir pomidoro griežinėlius.',
      'Užberkite tarkuoto sūrio.',
      'Kepkite orkaitėje 200 °C temperatūroje apie 7 min., kol sūris išsilydys.',
    ] },
  { name: 'Avižinė košė su obuoliais', minutes: 10, image: require('../../assets/recipes/avizine-kose-su-obuoliais.jpg'), ingredients: [
    { name: 'avižiniai dribsniai', qty: 80 }, { name: 'pienas', qty: 250 }, { name: 'obuoliai', qty: 1 },
    { name: 'cukrus', qty: 10, optional: true }],
    steps: [
      'Pieną užvirinkite ir suberkite avižinius dribsnius.',
      'Virkite 5 min., maišydami.',
      'Įmaišykite smulkintą obuolį ir cukrų.',
    ] },
  { name: 'Bananų blynai', minutes: 15, image: require('../../assets/recipes/bananu-blynai.jpg'), ingredients: [
    { name: 'bananai', qty: 2 }, { name: 'kiaušiniai', qty: 2 }, { name: 'avižiniai dribsniai', qty: 40 }],
    steps: [
      'Bananus sutrinkite šakute.',
      'Įmuškite kiaušinius, suberkite dribsnius ir išmaišykite.',
      'Kepkite mažus blynelius neprilimpančioje keptuvėje po 2 min. iš abiejų pusių.',
    ] },
  { name: 'Obuolių pyragas', minutes: 60, image: require('../../assets/recipes/obuoliu-pyragas.jpg'), ingredients: [
    { name: 'obuoliai', qty: 4 }, { name: 'kiaušiniai', qty: 3 }, { name: 'miltai', qty: 200 },
    { name: 'cukrus', qty: 150 }, { name: 'sviestas', qty: 100 }],
    steps: [
      'Įkaitinkite orkaitę iki 180 °C.',
      'Ištirpintą sviestą išplakite su cukrumi ir kiaušiniais, įmaišykite miltus.',
      'Obuolius nulupkite, supjaustykite ir sudėkite į formą.',
      'Užpilkite tešla ir kepkite apie 40 min.',
    ] },
  { name: 'Kepta lašiša su ryžiais', minutes: 25, image: require('../../assets/recipes/kepta-lasisa-su-ryziais.jpg'), ingredients: [
    { name: 'lašiša', qty: 300 }, { name: 'ryžiai', qty: 200 }, { name: 'citrinos', qty: 1 },
    { name: 'sviestas', qty: 20, optional: true }],
    steps: [
      'Išvirkite ryžius.',
      'Lašišą pasūdykite ir apšlakstykite citrinos sultimis.',
      'Kepkite keptuvėje su sviestu po 4 min. iš abiejų pusių.',
      'Patiekite su ryžiais ir citrinos skiltelėmis.',
    ] },
  { name: 'Troškinti kopūstai', minutes: 45, image: require('../../assets/recipes/troskinti-kopustai.jpg'), ingredients: [
    { name: 'kopūstai', qty: 800 }, { name: 'morkos', qty: 1 }, { name: 'svogūnai', qty: 1 },
    { name: 'dešrelės', qty: 200 }, { name: 'konservuoti pomidorai', qty: 200, optional: true }],
    steps: [
      'Kopūstą supjaustykite šiaudeliais, morką sutarkuokite, svogūną susmulkinkite.',
      'Svogūną ir morką pakepinkite, sudėkite kopūstus ir įpilkite šiek tiek vandens.',
      'Troškinkite uždengę apie 30 min.',
      'Sudėkite supjaustytas dešreles ir pomidorus, troškinkite dar 10 min.',
    ] },
  { name: 'Cukinijų blynai', minutes: 25, image: require('../../assets/recipes/cukiniju-blynai.jpg'), ingredients: [
    { name: 'cukinijos', qty: 2 }, { name: 'kiaušiniai', qty: 2 }, { name: 'miltai', qty: 80 },
    { name: 'česnakai', qty: 1, optional: true }, { name: 'grietinė', qty: 100, optional: true }],
    steps: [
      'Cukinijas sutarkuokite, pasūdykite ir po 10 min. nuspauskite skystį.',
      'Įmuškite kiaušinius, įspauskite česnaką ir įmaišykite miltus.',
      'Kepkite aliejuje po 3 min. iš abiejų pusių.',
      'Patiekite su grietine.',
    ] },
  { name: 'Ryžiai su grybais', minutes: 30, image: require('../../assets/recipes/ryziai-su-grybais.jpg'), ingredients: [
    { name: 'ryžiai', qty: 250 }, { name: 'grybai', qty: 300 }, { name: 'svogūnai', qty: 1 },
    { name: 'sviestas', qty: 30 }, { name: 'sūris', qty: 50, optional: true }],
    steps: [
      'Svogūną ir grybus supjaustykite ir pakepinkite svieste.',
      'Suberkite ryžius, užpilkite 500 ml vandens ir pasūdykite.',
      'Troškinkite uždengę apie 20 min.',
      'Prieš patiekdami pabarstykite tarkuotu sūriu.',
    ] },
  { name: 'Tuno salotos', minutes: 10, image: require('../../assets/recipes/tuno-salotos.jpg'), ingredients: [
    { name: 'konservuotas tunas', qty: 150 }, { name: 'kiaušiniai', qty: 2 }, { name: 'agurkai', qty: 1 },
    { name: 'grietinė', qty: 50 }],
    steps: [
      'Kiaušinius išvirkite kietai (10 min.) ir supjaustykite.',
      'Agurką supjaustykite kubeliais, tuną nusausinkite.',
      'Viską sumaišykite su grietine ir pasūdykite.',
    ] },
  { name: 'Pupelių troškinys', minutes: 30, image: require('../../assets/recipes/pupeliu-troskinys.jpg'), ingredients: [
    { name: 'konservuotos pupelės', qty: 400 }, { name: 'konservuoti pomidorai', qty: 400 },
    { name: 'svogūnai', qty: 1 }, { name: 'paprikos', qty: 1 }, { name: 'česnakai', qty: 2, optional: true }],
    steps: [
      'Svogūną, papriką ir česnakus supjaustykite ir pakepinkite.',
      'Sudėkite nusausintas pupeles ir pomidorus.',
      'Pasūdykite ir troškinkite 15–20 min.',
    ] },
  { name: 'Kiaušiniai su špinatais', minutes: 10, image: require('../../assets/recipes/kiausiniai-su-spinatais.jpg'), ingredients: [
    { name: 'kiaušiniai', qty: 3 }, { name: 'špinatai', qty: 100 }, { name: 'sviestas', qty: 10 },
    { name: 'sūris', qty: 30, optional: true }],
    steps: [
      'Keptuvėje ištirpinkite sviestą ir suberkite špinatus.',
      'Kai špinatai suglebs, padarykite duobutes ir įmuškite kiaušinius.',
      'Pabarstykite sūriu ir kepkite uždengę 4–5 min.',
    ] },
  { name: 'Jogurtas su bananais', minutes: 5, image: require('../../assets/recipes/jogurtas-su-bananais.jpg'), ingredients: [
    { name: 'jogurtas', qty: 200 }, { name: 'bananai', qty: 1 },
    { name: 'avižiniai dribsniai', qty: 30, optional: true }],
    steps: [
      'Bananą supjaustykite griežinėliais.',
      'Sudėkite į dubenėlį su jogurtu.',
      'Jei norite, pabarstykite avižiniais dribsniais.',
    ] },
  { name: 'Vištienos salotos', minutes: 20, image: require('../../assets/recipes/vistienos-salotos.jpg'), ingredients: [
    { name: 'vištiena', qty: 300 }, { name: 'pomidorai', qty: 2 }, { name: 'agurkai', qty: 1 },
    { name: 'paprikos', qty: 1 }, { name: 'aliejus', qty: 20, optional: true }],
    steps: [
      'Vištieną pasūdykite, iškepkite ir supjaustykite juostelėmis.',
      'Pomidorus, agurką ir papriką supjaustykite.',
      'Viską sumaišykite ir apšlakstykite aliejumi.',
    ] },
  { name: 'Įdarytos paprikos', minutes: 50, image: require('../../assets/recipes/idarytos-paprikos.jpg'), ingredients: [
    { name: 'paprikos', qty: 4 }, { name: 'malta mėsa', qty: 300 }, { name: 'ryžiai', qty: 100 },
    { name: 'svogūnai', qty: 1 }, { name: 'konservuoti pomidorai', qty: 200 }],
    steps: [
      'Ryžius pusiau išvirkite (10 min.).',
      'Sumaišykite maltą mėsą, ryžius ir smulkintą svogūną, pasūdykite.',
      'Paprikoms išpjaukite sėklas ir prikimškite įdaro.',
      'Sudėkite į puodą, užpilkite pomidorais ir troškinkite uždengę apie 35 min.',
    ] },
  { name: 'Bulviniai blynai', minutes: 40, image: require('../../assets/recipes/bulviniai-blynai.jpg'), ingredients: [
    { name: 'bulvės', qty: 800 }, { name: 'kiaušiniai', qty: 1 }, { name: 'miltai', qty: 40 }, { name: 'svogūnai', qty: 1 },
    { name: 'aliejus', qty: 40, optional: true }, { name: 'druska', qty: 3, optional: true }],
    steps: [
      'Bulves ir svogūną nulupkite ir smulkiai sutarkuokite, nusunkite skystį.',
      'Įmuškite kiaušinį, įberkite miltų ir druskos, gerai išmaišykite.',
      'Įkaitintame aliejuje šaukštu dėkite masę ir kepkite po 3–4 min. iš abiejų pusių.',
    ] },
  { name: 'Grybų sriuba', minutes: 40, image: require('../../assets/recipes/grybu-sriuba.jpg'), ingredients: [
    { name: 'grybai', qty: 300 }, { name: 'bulvės', qty: 400 }, { name: 'morkos', qty: 1 }, { name: 'svogūnai', qty: 1 },
    { name: 'grietinė', qty: 50, optional: true }, { name: 'sviestas', qty: 10, optional: true }],
    steps: [
      'Svogūną ir grybus supjaustykite ir pakepinkite svieste.',
      'Bulves ir morką supjaustykite kubeliais, užpilkite 1,5 l vandens ir virkite 10 min.',
      'Sudėkite grybus su svogūnu ir virkite dar 15 min., pasūdykite.',
      'Patiekite su šaukštu grietinės.',
    ] },
  { name: 'Pomidorų sriuba', minutes: 25, image: require('../../assets/recipes/pomidoru-sriuba.jpg'), ingredients: [
    { name: 'konservuoti pomidorai', qty: 400 }, { name: 'svogūnai', qty: 1 }, { name: 'česnakai', qty: 1 },
    { name: 'grietinė', qty: 50 }, { name: 'aliejus', qty: 15, optional: true }, { name: 'pipirai', qty: 1, optional: true }],
    steps: [
      'Svogūną ir česnaką susmulkinkite ir pakepinkite aliejuje.',
      'Supilkite pomidorus ir 300 ml vandens, virkite 15 min.',
      'Sutrinkite trintuvu, įmaišykite grietinę, pagardinkite druska ir pipirais.',
    ] },
  { name: 'Agurkų salotos su grietine', minutes: 5, image: require('../../assets/recipes/agurku-salotos-su-grietine.jpg'), ingredients: [
    { name: 'agurkai', qty: 2 }, { name: 'grietinė', qty: 100 }, { name: 'druska', qty: 1, optional: true }],
    steps: [
      'Agurkus supjaustykite plonais griežinėliais.',
      'Sumaišykite su grietine ir žiupsneliu druskos.',
    ] },
  { name: 'Vištienos sriuba su makaronais', minutes: 45, image: require('../../assets/recipes/vistienos-sriuba-su-makaronais.jpg'), ingredients: [
    { name: 'vištiena', qty: 300 }, { name: 'bulvės', qty: 300 }, { name: 'morkos', qty: 1 }, { name: 'svogūnai', qty: 1 },
    { name: 'makaronai', qty: 50 }, { name: 'druska', qty: 3, optional: true }],
    steps: [
      'Vištieną užpilkite 2 l vandens ir virkite 20 min., nugriebkite putas.',
      'Sudėkite supjaustytas bulves, morką ir svogūną, virkite 10 min.',
      'Suberkite makaronus ir virkite dar 8 min., pasūdykite.',
    ] },
  { name: 'Makaronai su kumpiu ir grietine', minutes: 20, image: require('../../assets/recipes/makaronai-su-kumpiu-ir-grietine.jpg'), ingredients: [
    { name: 'makaronai', qty: 250 }, { name: 'kumpis', qty: 150 }, { name: 'grietinė', qty: 150 }, { name: 'sūris', qty: 50 },
    { name: 'pipirai', qty: 1, optional: true }],
    steps: [
      'Išvirkite makaronus pasūdytame vandenyje.',
      'Kumpį supjaustykite juostelėmis ir pakepinkite keptuvėje.',
      'Sudėkite grietinę ir makaronus, išmaišykite, pabarstykite tarkuotu sūriu ir pipirais.',
    ] },
  { name: 'Tuno makaronai', minutes: 20, image: require('../../assets/recipes/tuno-makaronai.jpg'), ingredients: [
    { name: 'makaronai', qty: 250 }, { name: 'konservuotas tunas', qty: 150 }, { name: 'konservuoti pomidorai', qty: 400 },
    { name: 'česnakai', qty: 1 }, { name: 'aliejus', qty: 15, optional: true }],
    steps: [
      'Išvirkite makaronus.',
      'Aliejuje pakepinkite susmulkintą česnaką, supilkite pomidorus ir troškinkite 10 min.',
      'Įmaišykite tuną ir makaronus, pašildykite.',
    ] },
  { name: 'Lašiša su bulvėmis ir citrina', minutes: 35, image: require('../../assets/recipes/lasisa-su-bulvemis-ir-citrina.jpg'), ingredients: [
    { name: 'lašiša', qty: 300 }, { name: 'bulvės', qty: 600 }, { name: 'citrinos', qty: 1 }, { name: 'sviestas', qty: 20 },
    { name: 'druska', qty: 2, optional: true }],
    steps: [
      'Bulves išvirkite pasūdytame vandenyje (20 min.).',
      'Lašišą pasūdykite, apšlakstykite citrinos sultimis ir kepkite svieste po 4 min. iš abiejų pusių.',
      'Patiekite su bulvėmis ir citrinos skiltelėmis.',
    ] },
  { name: 'Kopūstų salotos', minutes: 10, image: require('../../assets/recipes/kopustu-salotos.jpg'), ingredients: [
    { name: 'kopūstai', qty: 300 }, { name: 'morkos', qty: 1 }, { name: 'aliejus', qty: 20 },
    { name: 'citrinos', qty: 1, optional: true }, { name: 'druska', qty: 1, optional: true }],
    steps: [
      'Kopūstą smulkiai supjaustykite, pasūdykite ir paspaudykite rankomis.',
      'Įtarkuokite morką.',
      'Apšlakstykite aliejumi ir citrinos sultimis, išmaišykite.',
    ] },
  { name: 'Varškės apkepas', minutes: 50, image: require('../../assets/recipes/varskes-apkepas.jpg'), ingredients: [
    { name: 'varškė', qty: 400 }, { name: 'kiaušiniai', qty: 2 }, { name: 'cukrus', qty: 50 }, { name: 'grietinė', qty: 100 },
    { name: 'sviestas', qty: 10, optional: true }],
    steps: [
      'Varškę sutrinkite su kiaušiniais, cukrumi ir grietine.',
      'Supilkite į sviestu išteptą formą.',
      'Kepkite 180 °C orkaitėje apie 40 min., kol paviršius paruduos.',
    ] },
  { name: 'Prancūziški skrebučiai', minutes: 10, image: require('../../assets/recipes/prancuziski-skrebuciai.jpg'), ingredients: [
    { name: 'duona', qty: 200 }, { name: 'kiaušiniai', qty: 2 }, { name: 'pienas', qty: 100 }, { name: 'sviestas', qty: 20 },
    { name: 'cukrus', qty: 10, optional: true }],
    steps: [
      'Kiaušinius išplakite su pienu ir cukrumi.',
      'Duonos riekes pamirkykite kiaušinių masėje.',
      'Kepkite svieste po 2 min. iš abiejų pusių.',
    ] },
  { name: 'Česnakiniai skrebučiai', minutes: 15, image: require('../../assets/recipes/cesnakiniai-skrebuciai.jpg'), ingredients: [
    { name: 'duona', qty: 200 }, { name: 'česnakai', qty: 2 }, { name: 'aliejus', qty: 30 },
    { name: 'sūris', qty: 50, optional: true }, { name: 'druska', qty: 1, optional: true }],
    steps: [
      'Duoną supjaustykite juostelėmis.',
      'Apkepkite aliejuje iki traškumo.',
      'Dar karštas ištrinkite česnaku, pabarstykite druska ir, jei norite, tarkuotu sūriu.',
    ] },
  { name: 'Ryžių košė su pienu', minutes: 30, image: require('../../assets/recipes/ryziu-kose-su-pienu.jpg'), ingredients: [
    { name: 'ryžiai', qty: 150 }, { name: 'pienas', qty: 600 }, { name: 'cukrus', qty: 30 },
    { name: 'sviestas', qty: 10, optional: true }],
    steps: [
      'Ryžius užpilkite 200 ml vandens ir virkite, kol vanduo susigers.',
      'Supilkite pieną ir virkite ant silpnos ugnies apie 20 min., dažnai maišydami.',
      'Pasaldinkite cukrumi ir įdėkite sviesto.',
    ] },
  { name: 'Dešrelės su troškintais kopūstais', minutes: 40, image: require('../../assets/recipes/desreles-su-troskintais-kopustais.jpg'), ingredients: [
    { name: 'dešrelės', qty: 300 }, { name: 'kopūstai', qty: 500 }, { name: 'svogūnai', qty: 1 },
    { name: 'konservuoti pomidorai', qty: 200 }, { name: 'aliejus', qty: 15, optional: true }],
    steps: [
      'Svogūną pakepinkite aliejuje, sudėkite supjaustytus kopūstus.',
      'Supilkite pomidorus ir troškinkite uždengę 25 min.',
      'Sudėkite supjaustytas dešreles ir troškinkite dar 5 min.',
    ] },
  { name: 'Daržovių troškinys', minutes: 30, image: require('../../assets/recipes/darzoviu-troskinys.jpg'), ingredients: [
    { name: 'cukinijos', qty: 1 }, { name: 'paprikos', qty: 1 }, { name: 'pomidorai', qty: 2 }, { name: 'svogūnai', qty: 1 },
    { name: 'česnakai', qty: 1, optional: true }, { name: 'aliejus', qty: 20, optional: true }],
    steps: [
      'Visas daržoves supjaustykite kubeliais.',
      'Aliejuje pakepinkite svogūną ir česnaką, sudėkite papriką ir cukiniją.',
      'Sudėkite pomidorus ir troškinkite 15 min., pasūdykite.',
    ] },
  { name: 'Mėsos ir pupelių troškinys', minutes: 40, image: require('../../assets/recipes/mesos-ir-pupeliu-troskinys.jpg'), ingredients: [
    { name: 'malta mėsa', qty: 400 }, { name: 'konservuotos pupelės', qty: 400 }, { name: 'konservuoti pomidorai', qty: 400 },
    { name: 'svogūnai', qty: 1 }, { name: 'paprikos', qty: 1, optional: true }, { name: 'pipirai', qty: 1, optional: true }],
    steps: [
      'Svogūną pakepinkite, sudėkite maltą mėsą ir kepkite, kol paruduos.',
      'Supilkite pomidorus, sudėkite papriką ir troškinkite 15 min.',
      'Sudėkite nusunktas pupeles, pagardinkite ir troškinkite dar 10 min.',
    ] },
  { name: 'Kiaušinių salotos', minutes: 20, image: require('../../assets/recipes/kiausiniu-salotos.jpg'), ingredients: [
    { name: 'kiaušiniai', qty: 4 }, { name: 'grietinė', qty: 100 }, { name: 'agurkai', qty: 1 },
    { name: 'svogūnai', qty: 1, optional: true }, { name: 'druska', qty: 1, optional: true }],
    steps: [
      'Kiaušinius virkite 10 min., atvėsinkite ir nulupkite.',
      'Kiaušinius ir agurką supjaustykite kubeliais.',
      'Sumaišykite su grietine, pasūdykite.',
    ] },
  { name: 'Bananų ir avižų sausainiai', minutes: 25, image: require('../../assets/recipes/bananu-ir-avizu-sausainiai.jpg'), ingredients: [
    { name: 'bananai', qty: 2 }, { name: 'avižiniai dribsniai', qty: 150 },
    { name: 'cukrus', qty: 20, optional: true }],
    steps: [
      'Bananus sutrinkite šakute ir sumaišykite su dribsniais.',
      'Formuokite sausainius ir dėkite ant kepimo popieriaus.',
      'Kepkite 180 °C orkaitėje 15 min.',
    ] },
  { name: 'Cukinijos su česnaku ir grietine', minutes: 25, image: require('../../assets/recipes/cukinijos-su-cesnaku-ir-grietine.jpg'), ingredients: [
    { name: 'cukinijos', qty: 2 }, { name: 'česnakai', qty: 2 }, { name: 'grietinė', qty: 100 }, { name: 'miltai', qty: 30 },
    { name: 'aliejus', qty: 30, optional: true }],
    steps: [
      'Cukinijas supjaustykite griežinėliais, pasūdykite ir apvoliokite miltuose.',
      'Kepkite aliejuje po 2–3 min. iš abiejų pusių.',
      'Grietinę sumaišykite su spaustu česnaku ir patiekite kartu.',
    ] },
  { name: 'Vištiena su grybų padažu', minutes: 35, image: require('../../assets/recipes/vistiena-su-grybu-padazu.jpg'), ingredients: [
    { name: 'vištiena', qty: 400 }, { name: 'grybai', qty: 250 }, { name: 'grietinė', qty: 150 }, { name: 'svogūnai', qty: 1 },
    { name: 'aliejus', qty: 15, optional: true }],
    steps: [
      'Vištieną supjaustykite, pasūdykite ir apkepkite aliejuje.',
      'Toje pačioje keptuvėje pakepinkite svogūną ir grybus.',
      'Sudėkite vištieną ir grietinę, troškinkite 10 min.',
    ] },
  { name: 'Obuolių blynai', minutes: 30, image: require('../../assets/recipes/obuoliu-blynai.jpg'), ingredients: [
    { name: 'obuoliai', qty: 2 }, { name: 'kiaušiniai', qty: 2 }, { name: 'jogurtas', qty: 250 }, { name: 'miltai', qty: 200 },
    { name: 'cukrus', qty: 20, optional: true }, { name: 'aliejus', qty: 30, optional: true }],
    steps: [
      'Kiaušinius išplakite su jogurtu ir cukrumi, įmaišykite miltus.',
      'Įtarkuokite obuolius ir išmaišykite.',
      'Kepkite nedidelius blynelius aliejuje po 2 min. iš abiejų pusių.',
    ] },
  { name: 'Špinatų makaronai', minutes: 20, image: require('../../assets/recipes/spinatu-makaronai.jpg'), ingredients: [
    { name: 'makaronai', qty: 250 }, { name: 'špinatai', qty: 150 }, { name: 'grietinė', qty: 150 }, { name: 'česnakai', qty: 1 },
    { name: 'sūris', qty: 40, optional: true }],
    steps: [
      'Išvirkite makaronus.',
      'Keptuvėje pakepinkite česnaką, sudėkite špinatus ir palaikykite, kol suglebs.',
      'Įmaišykite grietinę ir makaronus, pabarstykite sūriu.',
    ] },
  { name: 'Bulvių ir kumpio apkepas', minutes: 60, image: require('../../assets/recipes/bulviu-ir-kumpio-apkepas.jpg'), ingredients: [
    { name: 'bulvės', qty: 800 }, { name: 'kumpis', qty: 200 }, { name: 'sūris', qty: 100 }, { name: 'grietinė', qty: 200 },
    { name: 'druska', qty: 3, optional: true }],
    steps: [
      'Bulves nulupkite ir supjaustykite plonais griežinėliais, kumpį – kubeliais.',
      'Sluoksniais sudėkite į formą, kiekvieną sluoksnį pasūdykite ir patepkite grietine.',
      'Pabarstykite tarkuotu sūriu ir kepkite 190 °C orkaitėje apie 45 min.',
    ] },
  { name: 'Ryžiai su daržovėmis ir kiaušiniu', minutes: 25, image: require('../../assets/recipes/ryziai-su-darzovemis-ir-kiausiniu.jpg'), ingredients: [
    { name: 'ryžiai', qty: 200 }, { name: 'kiaušiniai', qty: 2 }, { name: 'morkos', qty: 1 }, { name: 'paprikos', qty: 1 },
    { name: 'aliejus', qty: 20, optional: true }],
    steps: [
      'Išvirkite ryžius.',
      'Aliejuje pakepinkite smulkiai supjaustytą morką ir papriką.',
      'Pastumkite daržoves į šoną, įmuškite kiaušinius ir išmaišykite.',
      'Sudėkite ryžius, viską kartu pakepinkite 3 min.',
    ] },
  { name: 'Jogurto ir bananų kokteilis', minutes: 5, image: require('../../assets/recipes/jogurto-ir-bananu-kokteilis.jpg'), ingredients: [
    { name: 'jogurtas', qty: 300 }, { name: 'bananai', qty: 1 }, { name: 'pienas', qty: 200 },
    { name: 'avižiniai dribsniai', qty: 20, optional: true }],
    steps: [
      'Visus produktus sudėkite į trintuvą.',
      'Sutrinkite iki vientisos masės ir iškart patiekite.',
    ] },
];
