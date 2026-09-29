import { ServiceCategoryKey } from '../types';

export interface NLPClassificationResult {
  detectedCategory: ServiceCategoryKey;
  categoryName: string;
  identifiedProblem: string;
  priority: 'emergency' | 'high' | 'normal';
  isEmergency: boolean;
  confidence: number; // 0.0 to 1.0
  matchedKeywords: string[];
  detectedLanguage: 'English' | 'Telugu' | 'Hindi' | 'Multilingual';
  explanation: string;
}

interface CategoryRule {
  key: ServiceCategoryKey;
  name: string;
  defaultProblem: string;
  problemPatterns: {
    pattern: RegExp;
    problem: string;
    isEmergency?: boolean;
  }[];
  keywordsEn: string[];
  keywordsTe: string[];
  keywordsHi: string[];
  keywordsTranslit: string[]; // Romanized Telugu & Hindi keywords
}

const EMERGENCY_TERMS = [
  'urgent', 'emergency', 'leak ayindi', 'urgent ga', 'kavali', 'shock', 'spark',
  'sparks', 'fire', 'smoke', 'burst', 'flood', 'flooding', 'overflow', 'overflowing',
  'short circuit', 'mcb trip', 'tripping', 'current kottindi', 'turant', 'jaldi',
  'arjent', 'ventane', 'danger', 'chutki', 'immediately', 'right away', 'chahiye',
  'హදි', 'అత్యవసరం', 'అర్జెంట్', 'షాక్', 'మంటలు', 'వెంటనే', 'तुरंत', 'आपातकालीन', 'शॉर्ट सर्किट'
];

const CATEGORY_RULES: CategoryRule[] = [
  {
    key: 'plumbing',
    name: 'Plumbing',
    defaultProblem: 'Plumbing Repair & Inspection',
    problemPatterns: [
      { pattern: /(pipe leak|pipe.*leak|leak.*pipe|పైప్.*లీక్|పైప్ లీక్|पाइप.*लीक)/i, problem: 'Pipe Leak / Burst Line', isEmergency: true },
      { pattern: /(tap.*leak|tap.*dripping|నల్లా.*లీక్|नल.*टपक|ట్యాప్.*లీక్)/i, problem: 'Leaking Tap / Faucet Replacement' },
      { pattern: /(drain.*clog|toilet.*block|sink.*clog|సింక్.*బ్లాక్|డ్రైనేజ్)/i, problem: 'Drainage & Clog Clearance', isEmergency: true },
      { pattern: /(motor|tank.*overflow|బోర్.*మోటార్)/i, problem: 'Water Motor / Overhead Tank Issue' },
      { pattern: /(geyser pipe|valve|వాటర్ హీటర్)/i, problem: 'Geyser Water Line / Valve Repair' }
    ],
    keywordsEn: ['leak', 'leaking', 'tap', 'pipe', 'sink', 'drain', 'toilet', 'flush', 'water', 'basin', 'geyser pipe', 'valve', 'motor', 'tank', 'clog', 'blockage', 'plumber'],
    keywordsTe: ['పైప్', 'లీక్', 'నీరు', 'ట్యాప్', 'సింక్', 'డ్రైనేజ్', 'మోటార్', 'నీళ్ళు', 'నల్లా', 'లీకేజ్', 'బాత్ రూం', 'ప్లంబర్', 'కళాయి'],
    keywordsHi: ['नल', 'पानी', 'पाइप', 'लीक', 'टपक', 'सिंक', 'ड्रेन', 'टॉयलेट', 'मोटर', 'गीजर पाइप', 'वॉशबेसिन', 'प्लम्बर'],
    keywordsTranslit: ['pipe', 'leak', 'ayindi', 'kavali', 'plumber', 'tap', 'nalla', 'neellu', 'paani', 'tapak', 'chahiye', 'karab', 'drainage', 'bathroom', 'sink']
  },
  {
    key: 'electrical',
    name: 'Electrical',
    defaultProblem: 'Electrical Wiring & Power Diagnostic',
    problemPatterns: [
      { pattern: /(spark|shock|smoke|fire|షార్ట్ సర్క్యూట్|షాక్|స్పార్క్|चिंगारी)/i, problem: 'Sparks / Short Circuit Hazard', isEmergency: true },
      { pattern: /(mcb|fuse|tripping|ట్రిప్పింగ్|फ्यूज)/i, problem: 'MCB Tripping / Heavy Load Fault', isEmergency: true },
      { pattern: /(switch|switchboard|స్విచ్|बोर्ड)/i, problem: 'Switchboard / Socket Repair' },
      { pattern: /(fan|ceiling fan|ఫ్యాన్|पंखा)/i, problem: 'Ceiling Fan Regulator / Motor Repair' },
      { pattern: /(light|tube|bulb|లైట్|लाइट)/i, problem: 'Lighting / Fixture Installation' }
    ],
    keywordsEn: ['switch', 'switchboard', 'wire', 'wiring', 'mcb', 'fuse', 'fan', 'light', 'shock', 'short circuit', 'current', 'voltage', 'inverter', 'phase', 'tripping', 'plug', 'socket', 'electrician'],
    keywordsTe: ['స్విచ్', 'వైరింగ్', 'కరెంట్', 'ఫ్యాన్', 'లైట్', 'షాక్', 'ఎంసిబి', 'షార్ట్ సర్క్యూట్', 'ప్లగ్', 'విద్యుత్', 'ఎలక్ట్రీషియన్'],
    keywordsHi: ['बिजली', 'स्विच', 'वायरिंग', 'करंट', 'पंखा', 'लाइट', 'शॉर्ट सर्किट', 'एमसीबी', 'प्लग', 'सॉकेट', 'वोल्टेज', 'इलेक्ट्रीशियन'],
    keywordsTranslit: ['switch', 'current', 'shock', 'wiring', 'fuse', 'fan', 'light', 'electrician', 'kottindi', 'vastunnayi', 'chali gayi', 'spark']
  },
  {
    key: 'ac_servicing',
    name: 'AC Servicing (₹500/hr)',
    defaultProblem: 'Deep Foam Jet Wash & Servicing',
    problemPatterns: [
      { pattern: /(foam wash|jet wash|servicing|service|ఫిల్టర్|సర్వీసింగ్|धुलाई|सर्विस)/i, problem: 'Deep AC Foam Jet Wash (₹500/hr)' },
      { pattern: /(cooling.*stop|warm air|చల్లగా.*లేదు|ठंडा.*नहीं)/i, problem: 'AC Cooling Loss Diagnostic & Servicing' },
      { pattern: /(gas leak|gas refill|గ్యాస్ లీక్)/i, problem: 'Refrigerant Gas Leakage & Servicing', isEmergency: true }
    ],
    keywordsEn: ['ac service', 'ac servicing', 'servicing', 'foam wash', 'jet wash', 'filter clean', 'ac clean', 'chemical wash', 'gas refill', '500'],
    keywordsTe: ['ఏసీ సర్వీసింగ్', 'సర్వీస్', 'ఫోమ్ వాష్', 'ఫిల్టర్', 'కూలింగ్ సర్వీస్'],
    keywordsHi: ['एसी सर्विसिंग', 'सर्विस', 'जेट वॉश', 'फिल्टर सफाई', 'कूलिंग सर्विस'],
    keywordsTranslit: ['ac servicing', 'ac service', 'foam wash', 'jet wash', 'filter', 'servicing', '500']
  },
  {
    key: 'ac_installation',
    name: 'AC Installation (₹1,000)',
    defaultProblem: 'New AC Wall Mounting & Installation',
    problemPatterns: [
      { pattern: /(install|installation|fitting|wall mount|కొత్త ఏసీ|ఇన్‌స్టాలేషన్|लगाना|फिटिंग)/i, problem: 'New Split AC Wall Installation (₹1,000)' },
      { pattern: /(copper pipe|outdoor unit|bracket)/i, problem: 'Outdoor Bracket & Copper Piping Setup' }
    ],
    keywordsEn: ['ac installation', 'installation', 'install ac', 'new ac', 'wall mount', 'ac fitting', 'outdoor unit', 'bracket', 'copper pipe', '1000'],
    keywordsTe: ['ఏసీ ఇన్‌స్టాలేషన్', 'కొత్త ఏసీ', 'ఫిట్టింగ్', 'వాల్ మౌంట్'],
    keywordsHi: ['एसी इंस्टॉलेशन', 'नया एसी', 'फिटिंग', 'दीवार पर लगाना'],
    keywordsTranslit: ['ac installation', 'install', 'fitting', 'new ac', 'bracket', 'mount', '1000']
  },
  {
    key: 'civil_mesthri',
    name: 'Civil Work / Mesthri',
    defaultProblem: 'Masonry & Structural Civil Work',
    problemPatterns: [
      { pattern: /(brick|wall.*crack|wall construction|గోడ.*కట్టడం|ईंट.*दीवार)/i, problem: 'Brickwork & Masonry Wall Construction' },
      { pattern: /(plaster|plastering|ప్లాస్టరింగ్|प्लास्टर)/i, problem: 'Wall Plastering & Crack Patching' },
      { pattern: /(tile|marble|flooring|టైల్స్|मार्बल)/i, problem: 'Tile & Marble Floor Laying' },
      { pattern: /(waterproof|leakage|slab|పునాది|सीलन)/i, problem: 'Slab Waterproofing & Concrete Patch' }
    ],
    keywordsEn: ['mesthri', 'mestry', 'civil work', 'mason', 'masonry', 'brick', 'cement', 'plaster', 'plastering', 'tile', 'marble', 'flooring', 'concrete', 'slab', 'crack', 'tapi', 'taapi', 'foundation'],
    keywordsTe: ['మేస్త్రి', 'తాపీ మేస్త్రి', 'సివిల్ పని', 'గోడ', 'ఇటుక', 'సిమెంట్', 'ప్లాస్టరింగ్', 'టైల్స్', 'మార్బుల్', 'పునాది'],
    keywordsHi: ['मिस्त्री', 'राजमिस्त्री', 'सिविल वर्क', 'दीवार', 'ईंट', 'सीमेंट', 'प्लास्टर', 'टाइल', 'मार्बल', 'फर्श'],
    keywordsTranslit: ['mesthri', 'mestry', 'civil', 'mason', 'brick', 'plaster', 'cement', 'flooring', 'tiles', 'tapi']
  },
  {
    key: 'ac_service',
    name: 'AC Service',
    defaultProblem: 'AC Diagnostic & Servicing',
    problemPatterns: [
      { pattern: /(cooling.*stop|warm air|not cooling|చల్లగా.*లేదు|ठंडा.*नहीं)/i, problem: 'AC Cooling Failure / Gas Top-up' },
      { pattern: /(gas leak|gas refill|గ్యాస్ లీక్)/i, problem: 'Refrigerant Gas Leakage', isEmergency: true },
      { pattern: /(water leak|dripping indoor|నీరు కారుతోంది)/i, problem: 'Indoor Unit Water Dripping' },
      { pattern: /(noise|vibration|శబ్దం)/i, problem: 'Compressor Noise / Fan Motor Fault' }
    ],
    keywordsEn: ['ac', 'air conditioner', 'cooling', 'gas leak', 'compressor', 'split ac', 'filter', 'jet wash', 'freon', 'warm air', 'thermostat', 'servicing'],
    keywordsTe: ['ఏసీ', 'కూలింగ్', 'ఎయిర్ కండీషనర్', 'గ్యాస్', 'చల్లగా', 'ఫిల్టర్'],
    keywordsHi: ['एसी', 'कूलिंग', 'ठंडा', 'एयर कंडीशनर', 'गैस रिफिल', 'कंप्रेसर', 'सर्विस'],
    keywordsTranslit: ['ac', 'cooling', 'cooling ledu', 'gas', 'compressor', 'thanda nahi', 'chali', 'air conditioner']
  },
  {
    key: 'carpentry',
    name: 'Carpentry',
    defaultProblem: 'Woodwork & Furniture Repair',
    problemPatterns: [
      { pattern: /(lock|latch|jammed|కీ|లాక్|ताला)/i, problem: 'Door Lock Repair / Jammed Latch', isEmergency: true },
      { pattern: /(hinge|door hinge|కప్ బోర్డ్ హింజ్|कब्जा)/i, problem: 'Cabinet / Door Hinge Replacement' },
      { pattern: /(bed|wardrobe|table|chair|మంచం|ఫర్నిచర్|मेज)/i, problem: 'Furniture Assembly & Structural Repair' }
    ],
    keywordsEn: ['wood', 'door', 'cupboard', 'hinge', 'lock', 'latch', 'cabinet', 'table', 'chair', 'bed', 'wardrobe', 'drawer', 'furniture', 'plywood', 'carpenter'],
    keywordsTe: ['తలుపు', 'చెక్క', 'లాక్', 'కప్ బోర్డ్', 'మంచం', 'ఫర్నిచర్', 'మేజా', 'హింజ్', 'కార్పెంటర్'],
    keywordsHi: ['लकड़ी', 'दरवाजा', 'अलमारी', 'लॉक', 'कब्जा', 'फर्नीचर', 'मेज', 'कुर्सी', 'बेड', 'बढ़ई'],
    keywordsTranslit: ['carpenter', 'door', 'lock', 'hinge', 'cupboard', 'wood', 'furniture', 'talupu', 'darwaja']
  },
  {
    key: 'gardening',
    name: 'Gardening',
    defaultProblem: 'Lawn & Garden Care',
    problemPatterns: [
      { pattern: /(trim|pruning|lawn|grass|గడ్డి)/i, problem: 'Lawn Mowing & Hedge Trimming' },
      { pattern: /(pots|plants|soil|మట్టి|కుండీలు)/i, problem: 'Soil Enrichment & Pot Repotting' }
    ],
    keywordsEn: ['garden', 'plants', 'lawn', 'grass', 'trim', 'pruning', 'flowers', 'fertilizer', 'soil', 'terrace garden', 'pots', 'weeding', 'gardener'],
    keywordsTe: ['తోట', 'మొక్కలు', 'చెట్లు', 'గడ్డి', 'పువ్వులు', 'మట్టి', 'కుండీలు', 'తోటమాలి'],
    keywordsHi: ['बगीचा', 'पौधे', 'घास', 'फूल', 'कटाई', 'खाद', 'गमले', 'मिट्टी', 'माली'],
    keywordsTranslit: ['garden', 'lawn', 'plants', 'grass', 'thota', 'mokkalu', 'paudhe']
  },
  {
    key: 'painting',
    name: 'Painting',
    defaultProblem: 'Wall Painting & Waterproofing',
    problemPatterns: [
      { pattern: /(damp|leakage|seepage|తడి|सीलन)/i, problem: 'Wall Dampness & Waterproofing' },
      { pattern: /(whitewash|putty|color|పెయింటింగ్|रंग)/i, problem: 'Interior / Exterior Wall Repainting' }
    ],
    keywordsEn: ['paint', 'painting', 'wall', 'primer', 'color', 'dampness', 'ceiling', 'stain', 'whitewash', 'texture', 'putty', 'painter'],
    keywordsTe: ['రంగు', 'పెయింటింగ్', 'గోడ', 'సున్నం', 'తడి', 'పెయింటర్'],
    keywordsHi: ['पेंट', 'रंग', 'दीवार', 'पुट्टी', 'सफेदी', 'सीलन', 'पेंटर'],
    keywordsTranslit: ['paint', 'painting', 'wall', 'rangu', 'putty', 'seepage', 'dampness']
  },
  {
    key: 'cleaning',
    name: 'Cleaning',
    defaultProblem: 'Deep Home Sanitization',
    problemPatterns: [
      { pattern: /(bathroom|toilet|వాష్ రూం|బాత్రూమ్|शौचालय)/i, problem: 'Deep Bathroom Descaling & Sanitization' },
      { pattern: /(sofa|carpet|couch|సోఫా|सोफा)/i, problem: 'Sofa & Fabric Upholstery Shampooing' },
      { pattern: /(kitchen|chimney|చిమ్నీ|चिमनी)/i, problem: 'Kitchen Deep Clean & Degreasing' }
    ],
    keywordsEn: ['clean', 'cleaning', 'deep clean', 'sanitize', 'sofa shampoo', 'chimney', 'bathroom clean', 'dusting', 'scrubbing', 'stains', 'cleaner'],
    keywordsTe: ['శుభ్రం', 'క్లీనింగ్', 'సోఫా', 'చిమ్నీ', 'బాత్రూమ్ శుభ్రం', 'క్లీనర్'],
    keywordsHi: ['सफाई', 'क्लीनिंग', 'सोफा वॉश', 'चिमनी', 'धुलाई'],
    keywordsTranslit: ['cleaning', 'clean', 'deep clean', 'bathroom clean', 'sofa', 'shubram', 'safai']
  },
  {
    key: 'appliance_repair',
    name: 'Appliance Repair',
    defaultProblem: 'Major Appliance Diagnostic',
    problemPatterns: [
      { pattern: /(washing machine|వాషింగ్ మెషిన్|वॉशिंग मशीन)/i, problem: 'Washing Machine Drum / Motor Fault' },
      { pattern: /(fridge|refrigerator|ఫ్రిజ్|फ्रिज)/i, problem: 'Refrigerator Cooling & Compressor Check' },
      { pattern: /(geyser|water heater|గీజర్|गीजर)/i, problem: 'Geyser Coil / Thermostat Replacement' },
      { pattern: /(ro|water purifier|ఫిల్టర్|प्यूरिफायर)/i, problem: 'RO Water Purifier Membrane & Filter Service' }
    ],
    keywordsEn: ['washing machine', 'refrigerator', 'fridge', 'microwave', 'oven', 'geyser', 'water purifier', 'ro filter', 'chimney repair', 'mixer grinder'],
    keywordsTe: ['వాషింగ్ మెషిన్', 'ఫ్రిజ్', 'గీజర్', 'ఓవెన్', 'వాటర్ ప్యూరిఫైయర్', 'మిక్సీ'],
    keywordsHi: ['वॉशिंग मशीन', 'फ्रिज', 'गीजर', 'माइक्रोवेव', 'वाटर प्यूरीफायर', 'आरओ'],
    keywordsTranslit: ['washing machine', 'fridge', 'refrigerator', 'geyser', 'ro', 'purifier', 'microwave']
  }
];

export function classifyServiceRequest(query: string): NLPClassificationResult {
  const trimmed = query.trim().toLowerCase();

  if (!trimmed) {
    return {
      detectedCategory: 'plumbing',
      categoryName: 'Plumbing',
      identifiedProblem: 'General Inspection & Maintenance',
      priority: 'normal',
      isEmergency: false,
      confidence: 0.5,
      matchedKeywords: [],
      detectedLanguage: 'English',
      explanation: 'Default initial recommendation.'
    };
  }

  // Detect script/language
  let detectedLanguage: 'English' | 'Telugu' | 'Hindi' | 'Multilingual' = 'English';
  const hasTelugu = /[\u0C00-\u0C7F]/.test(query);
  const hasHindi = /[\u0900-\u097F]/.test(query);

  if (hasTelugu && hasHindi) detectedLanguage = 'Multilingual';
  else if (hasTelugu) detectedLanguage = 'Telugu';
  else if (hasHindi) detectedLanguage = 'Hindi';
  else {
    // Check for transliterated Telugu / Hindi cues
    const isTeluguTranslit = /\b(kavali|ayindi|undi|ledu|karab|cheyadam|urgent ga|chudandi)\b/i.test(trimmed);
    const isHindiTranslit = /\b(chahiye|karo|raha hai|chali gayi|kharab|turant|jaldi|ho gaya)\b/i.test(trimmed);
    if (isTeluguTranslit) detectedLanguage = 'Telugu';
    else if (isHindiTranslit) detectedLanguage = 'Hindi';
  }

  let highestScore = 0;
  let bestCategory: CategoryRule = CATEGORY_RULES[0];
  let bestMatches: string[] = [];

  for (const rule of CATEGORY_RULES) {
    const matched: string[] = [];
    let score = 0;

    // Check English
    for (const kw of rule.keywordsEn) {
      if (trimmed.includes(kw)) {
        matched.push(kw);
        score += 15;
      }
    }

    // Check Telugu script
    for (const kw of rule.keywordsTe) {
      if (query.includes(kw)) {
        matched.push(kw);
        score += 30; // High boost for native script
      }
    }

    // Check Hindi script
    for (const kw of rule.keywordsHi) {
      if (query.includes(kw)) {
        matched.push(kw);
        score += 30;
      }
    }

    // Check Transliteration
    for (const kw of rule.keywordsTranslit) {
      const regex = new RegExp(`\\b${kw}\\b`, 'i');
      if (regex.test(trimmed)) {
        matched.push(kw);
        score += 18;
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestCategory = rule;
      bestMatches = matched;
    }
  }

  // Identify specific problem
  let identifiedProblem = bestCategory.defaultProblem;
  let isProblemEmergency = false;

  for (const pat of bestCategory.problemPatterns) {
    if (pat.pattern.test(query)) {
      identifiedProblem = pat.problem;
      if (pat.isEmergency) {
        isProblemEmergency = true;
      }
      break;
    }
  }

  // Detect priority & emergency status
  let isEmergency = isProblemEmergency;
  for (const term of EMERGENCY_TERMS) {
    if (trimmed.includes(term.toLowerCase())) {
      isEmergency = true;
      break;
    }
  }

  const priority: 'emergency' | 'high' | 'normal' = isEmergency
    ? 'emergency'
    : highestScore > 30
    ? 'high'
    : 'normal';

  // Calculated confidence
  const calculatedConfidence = highestScore > 0 ? Math.min(0.98, 0.72 + (highestScore * 0.02)) : 0.55;

  let explanation = '';
  if (bestMatches.length > 0) {
    explanation = `Classified as ${bestCategory.name} (${identifiedProblem}) with ${priority.toUpperCase()} priority based on identified terms: "${bestMatches.slice(0, 3).join('", "')}".`;
  } else {
    explanation = `Classified as general inquiry under ${bestCategory.name}. You may refine your requirement below.`;
  }

  return {
    detectedCategory: bestCategory.key,
    categoryName: bestCategory.name,
    identifiedProblem,
    priority,
    isEmergency,
    confidence: Number(calculatedConfidence.toFixed(2)),
    matchedKeywords: bestMatches,
    detectedLanguage,
    explanation
  };
}
