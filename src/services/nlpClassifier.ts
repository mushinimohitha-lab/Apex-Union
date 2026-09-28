import { ServiceCategoryKey } from '../types';

export interface NLPClassificationResult {
  detectedCategory: ServiceCategoryKey;
  categoryName: string;
  confidence: number; // 0.0 to 1.0
  matchedKeywords: string[];
  detectedLanguage: 'English' | 'Telugu' | 'Hindi' | 'Multilingual';
  explanation: string;
}

interface CategoryRule {
  key: ServiceCategoryKey;
  name: string;
  keywordsEn: string[];
  keywordsTe: string[];
  keywordsHi: string[];
}

const CATEGORY_RULES: CategoryRule[] = [
  {
    key: 'plumbing',
    name: 'Plumbing',
    keywordsEn: ['leak', 'leaking', 'tap', 'pipe', 'sink', 'drain', 'toilet', 'flush', 'water', 'basin', 'geyser pipe', 'valve', 'motor', 'tank', 'clog', 'blockage'],
    keywordsTe: ['పైప్', 'లీక్', 'నీరు', 'ట్యాప్', 'సింక్', 'డ్రైనేజ్', 'మోటార్', 'నీళ్ళు', 'నల్లా', 'లీకేజ్', 'బాత్ రూం'],
    keywordsHi: ['नल', 'पानी', 'पाइप', 'लीक', 'टपक', 'सिंक', 'ड्रेन', 'टॉयलेट', 'मोटर', 'गीजर पाइप', 'वॉशबेसिन']
  },
  {
    key: 'electrical',
    name: 'Electrical',
    keywordsEn: ['switch', 'switchboard', 'wire', 'wiring', 'mcb', 'fuse', 'fan', 'light', 'shock', 'short circuit', 'current', 'voltage', 'inverter', 'phase', 'tripping', 'plug', 'socket'],
    keywordsTe: ['స్విచ్', 'వైరింగ్', 'కరెంట్', 'ఫ్యాన్', 'లైట్', 'షాక్', 'ఎంసిబి', 'షార్ట్ సర్క్యూట్', 'ప్లగ్', 'విద్యుత్'],
    keywordsHi: ['बिजली', 'स्विच', 'वायरिंग', 'करंट', 'पंखा', 'लाइट', 'शॉर्ट सर्किट', 'एमसीबी', 'प्लग', 'सॉकेट', 'वोल्टेज']
  },
  {
    key: 'ac_service',
    name: 'AC Service',
    keywordsEn: ['ac', 'air conditioner', 'cooling', 'gas leak', 'compressor', 'split ac', 'filter', 'jet wash', 'freon', 'warm air', 'thermostat', 'servicing'],
    keywordsTe: ['ఏసీ', 'కూలింగ్', 'ఎయిర్ కండీషనర్', 'గ్యాస్', 'చల్లగా'],
    keywordsHi: ['एसी', 'कूलिंग', 'ठंडा', 'एयर कंडीशनर', 'गैस रिफिल', 'कंप्रेसर']
  },
  {
    key: 'carpentry',
    name: 'Carpentry',
    keywordsEn: ['wood', 'door', 'cupboard', 'hinge', 'lock', 'latch', 'cabinet', 'table', 'chair', 'bed', 'wardrobe', 'drawer', 'furniture', 'plywood'],
    keywordsTe: ['తలుపు', 'చెక్క', 'లాక్', 'కప్ బోర్డ్', 'మంచం', 'ఫర్నిచర్', 'మేజా', 'హింజ్'],
    keywordsHi: ['लकड़ी', 'दरवाजा', 'अलमारी', 'लॉक', 'कब्जा', 'फर्नीचर', 'मेज', 'कुर्सी', 'बेड']
  },
  {
    key: 'gardening',
    name: 'Gardening',
    keywordsEn: ['garden', 'plants', 'lawn', 'grass', 'trim', 'pruning', 'flowers', 'fertilizer', 'soil', 'terrace garden', 'pots', 'weeding'],
    keywordsTe: ['తోట', 'మొక్కలు', 'చెట్లు', 'గడ్డి', 'పువ్వులు', 'మట్టి', 'కుండీలు'],
    keywordsHi: ['बगीचा', 'पौधे', 'घास', 'फूल', 'कटाई', 'खाद', 'गमले', 'मिट्टी']
  },
  {
    key: 'painting',
    name: 'Painting',
    keywordsEn: ['paint', 'painting', 'wall', 'primer', 'color', 'dampness', 'ceiling', 'stain', 'whitewash', 'texture', 'putty'],
    keywordsTe: ['రంగు', 'పెయింటింగ్', 'గోడ', 'సున్నం', 'తడి'],
    keywordsHi: ['पेंट', 'रंग', 'दीवार', 'पुट्टी', 'सफेदी', 'सीलन']
  },
  {
    key: 'cleaning',
    name: 'Cleaning',
    keywordsEn: ['clean', 'cleaning', 'deep clean', 'sanitize', 'sofa shampoo', 'chimney', 'bathroom clean', 'dusting', 'scrubbing', 'stains'],
    keywordsTe: ['శుభ్రం', 'క్లీనింగ్', 'సోఫా', 'చిమ్నీ', 'బాత్రూమ్ శుభ్రం'],
    keywordsHi: ['सफाई', 'क्लीनिंग', 'सोफा वॉश', 'चिमनी', 'धुलाई']
  },
  {
    key: 'appliance_repair',
    name: 'Appliance Repair',
    keywordsEn: ['washing machine', 'refrigerator', 'fridge', 'microwave', 'oven', 'geyser', 'water purifier', 'ro filter', 'chimney repair', 'mixer grinder'],
    keywordsTe: ['వాషింగ్ మెషిన్', 'ఫ్రిజ్', 'గీజర్', 'ఓవెన్', 'వాటర్ ప్యూరిఫైయర్', 'మిక్సీ'],
    keywordsHi: ['वॉशिंग मशीन', 'फ्रिज', 'गीजर', 'माइक्रोवेव', 'वाटर प्यूरीफायर', 'आरओ']
  }
];

export function classifyServiceRequest(query: string): NLPClassificationResult {
  const trimmed = query.trim().toLowerCase();

  if (!trimmed) {
    return {
      detectedCategory: 'plumbing',
      categoryName: 'Plumbing',
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

    // Check Telugu
    for (const kw of rule.keywordsTe) {
      if (query.includes(kw)) {
        matched.push(kw);
        score += 25; // Higher boost for language-specific match
      }
    }

    // Check Hindi
    for (const kw of rule.keywordsHi) {
      if (query.includes(kw)) {
        matched.push(kw);
        score += 25;
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestCategory = rule;
      bestMatches = matched;
    }
  }

  // If no match found, fallback to Plumbing with lower confidence
  const calculatedConfidence = highestScore > 0 ? Math.min(0.98, 0.70 + (highestScore * 0.03)) : 0.55;

  let explanation = '';
  if (bestMatches.length > 0) {
    explanation = `Detected ${bestCategory.name} based on identified terms: "${bestMatches.slice(0, 3).join('", "')}".`;
  } else {
    explanation = `Classified as general inquiry under ${bestCategory.name}. You may adjust the category below.`;
  }

  return {
    detectedCategory: bestCategory.key,
    categoryName: bestCategory.name,
    confidence: Number(calculatedConfidence.toFixed(2)),
    matchedKeywords: bestMatches,
    detectedLanguage,
    explanation
  };
}
