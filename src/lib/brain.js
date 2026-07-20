// Brain v2 — RIASEC-based career matching
// Based on John Holland's vocational interests theory (1959, peer-reviewed)
// Cosine similarity matching is the gold standard for personality-to-major fit

import { MAJORS, RIASEC_LABELS } from '../data/majors.js';

// ===== TYPES =====
/**
 * @typedef {Object} RIASEC
 * @property {number} R - Realistic 0-10
 * @property {number} I - Investigative 0-10
 * @property {number} A - Artistic 0-10
 * @property {number} S - Social 0-10
 * @property {number} E - Enterprising 0-10
 * @property {number} C - Conventional 0-10
 */

// ===== User RIASEC computation =====
/**
 * Converts raw answers to a RIASEC vector (each axis 0-10)
 * Maps each question's answer to RIASEC dimension contributions.
 *
 * Question design (7-question wizard):
 *  1. passion (text) — I/A weighting based on keywords
 *  2. problem_style (choice) — analytical/research boost I, action boosts R/E, social boosts S/E
 *  3. values (choice) — income boosts E, balance boosts C, impact boosts S/I, freedom boosts A/E
 *  4. environment (choice) — lab/hands boost R/I, office boosts C, outdoors boosts R, hospital boosts S
 *  5. interaction (choice) — solo boosts I/R, team boosts E/S, client-facing boosts E/S, with-data boosts C
 *  6. grade (number) — used separately for admission calc, not for RIASEC
 *  7. city (choice) — used for university ranking adjustment, not RIASEC
 *
 * @param {Object} answers - { passion, problem_style, values, environment, interaction, grade, city }
 * @returns {RIASEC}
 */
export function computeUserRIASEC(answers = {}) {
  // Initialize base profile (everyone gets +3 base = average orientation)
  const r = { R: 3, I: 3, A: 3, S: 3, E: 3, C: 3 };

  const passion = (answers.passion || '').toLowerCase();
  if (/برمجة|كود|python|code|ماث|رياضيات|تحليل|بحث|دراسة|علم|investigation|research|analysis|math/.test(passion)) {
    r.I += 4;
    r.C += 1;
  }
  if (/رسم|تصميم|إبداع|فن|موسيقى|كتابة|ابداع|ابداع|design|art|music|creative|write/.test(passion)) {
    r.A += 4;
    r.E += 1;
  }
  if (/مساعدة|تعليم|ناس|خدمة|علاج|طب|تدريس|teach|help|people|nursing|medicine/.test(passion)) {
    r.S += 4;
    r.I += 1;
  }
  if (/بناء|هندسة|يدوي|آلات|أجهزة|قيادة|سيارات|قيادة|engineer|build|machines|tools/.test(passion)) {
    r.R += 4;
    r.I += 1;
  }
  if (/تجارة|بيع|قيادة|شروع|استثمار|تفاوض|رائد|business|lead|sell|negotiate|entrepreneur/.test(passion)) {
    r.E += 4;
    r.S += 1;
  }
  if (/تنظيم|بيانات|سجلات|دقة|admin|organize|records|accurate|data/.test(passion)) {
    r.C += 4;
  }

  // Problem-solving style
  const ps = answers.problem_style;
  if (ps === 'analytical' || ps === 'research') {
    r.I += 3;
    r.C += 1;
  } else if (ps === 'action') {
    r.R += 2;
    r.E += 2;
  } else if (ps === 'social') {
    r.S += 2;
    r.E += 2;
  } else if (ps === 'creative') {
    r.A += 3;
    r.E += 1;
  } else if (ps === 'structured') {
    r.C += 3;
    r.R += 1;
  }

  // Values
  const vals = answers.values;
  if (vals === 'income') {
    r.E += 2;
    r.C += 1;
  } else if (vals === 'balance') {
    r.C += 2;
    r.A += 1;
  } else if (vals === 'impact') {
    r.S += 3;
    r.I += 1;
  } else if (vals === 'freedom') {
    r.A += 2;
    r.E += 2;
  } else if (vals === 'security') {
    r.C += 3;
    r.R += 1;
  }

  // Work environment preference
  const env = answers.environment;
  if (env === 'lab' || env === 'hands') {
    r.R += 2;
    r.I += 2;
  } else if (env === 'office') {
    r.C += 2;
    r.E += 1;
  } else if (env === 'outdoors') {
    r.R += 3;
  } else if (env === 'hospital' || env === 'care') {
    r.S += 3;
    r.I += 1;
  } else if (env === 'creative_studio') {
    r.A += 3;
    r.I += 1;
  } else if (env === 'classroom') {
    r.S += 2;
    r.E += 1;
  }

  // Interaction style
  const interact = answers.interaction;
  if (interact === 'solo') {
    r.I += 2;
    r.R += 1;
  } else if (interact === 'team') {
    r.E += 2;
    r.S += 1;
  } else if (interact === 'clients') {
    r.E += 3;
    r.S += 2;
  } else if (interact === 'data') {
    r.C += 3;
    r.I += 2;
  }

  // Normalize to 0-10 scale
  Object.keys(r).forEach((k) => {
    r[k] = Math.max(0, Math.min(10, r[k]));
  });

  return r;
}

// ===== Cosine similarity =====
// Measures how aligned two RIASEC vectors are (0 = no similarity, 100 = perfect match)
/**
 * @param {RIASEC} a
 * @param {RIASEC} b
 * @returns {number} 0-100
 */
export function cosineSimilarity(a, b) {
  let dot = 0;
  let normA = 0;
  let normB = 0;
  ['R', 'I', 'A', 'S', 'E', 'C'].forEach((k) => {
    dot += a[k] * b[k];
    normA += a[k] * a[k];
    normB += b[k] * b[k];
  });
  const denom = Math.sqrt(normA) * Math.sqrt(normB);
  if (denom === 0) return 0;
  return Math.round((dot / denom) * 100);
}

// ===== Acceptance score (real probability) =====
// Uses sigmoid of (grade - avg) / std — yields 0-100 acceptance probability
// Now also factors in القدرات (qudrat) and التحصيلي (tahsili) scores
/**
 * @param {Object|number} answers - { grade, qudrat, tahsili } OR a single number (legacy)
 * @param {Object} major - major with avgGrade, stdGrade, qudratWeight, tahsiliWeight, qudratMin, tahsiliMin
 * @returns {number} 8-98 acceptance probability (never 0/100 to stay honest)
 */
export function getAcceptanceScore(answers, major) {
  // Backwards compat: if first arg is a number, treat as grade
  let grade = null;
  let qudrat = null;
  let tahsili = null;

  if (typeof answers === 'number') {
    grade = answers;
  } else if (answers && typeof answers === 'object') {
    grade = typeof answers.grade === 'number' ? answers.grade : null;
    qudrat = typeof answers.qudrat === 'number' ? answers.qudrat : null;
    tahsili = typeof answers.tahsili === 'number' ? answers.tahsili : null;
  }

  const majorAvg = major.avgGrade ?? (major.minGrade != null ? major.minGrade - 5 : 85);
  const majorStd = major.stdGrade ?? 4;

  // No grade provided — return a reasonable midpoint, not NaN
  if (grade == null) {
    // Use sigmoid(0) = 50% as the baseline
    const z = (50 - majorAvg) / majorStd;
    const sig = 1 / (1 + Math.exp(-z));
    return Math.max(8, Math.min(98, Math.round(sig * 90 + 8)));
  }

  // Composite score = (grade * weightGrade) + (qudrat * wQ) + (tahsili * wT)
  const wGrade = (major.qudratWeight != null && major.tahsiliWeight != null)
    ? Math.max(0, 100 - major.qudratWeight - major.tahsiliWeight)
    : 50;
  const wQ = major.qudratWeight ?? 25;
  const wT = major.tahsiliWeight ?? 25;

  // If user provided normalized test scores (0-100), incorporate them
  let compositeStudent = grade;
  let compositeMajor = majorAvg;

  if (qudrat != null || tahsili != null) {
    const haveQ = qudrat != null;
    const haveT = tahsili != null;
    const wQeff = haveQ ? wQ : 0;
    const wTeff = haveT ? wT : 0;
    const wG = (haveQ || haveT) ? wGrade : 100;
    const total = (wG + wQeff + wTeff) || 1;

    compositeStudent = (
      grade * wG +
      (qudrat ?? 70) * wQeff +
      (tahsili ?? 70) * wTeff
    ) / total;
    compositeMajor = majorAvg;

    // Hard-fail: إذا قدرات أقل من الحد الأدنى المطلوب → قبول منخفض جداً
    if (qudrat != null && major.qudratMin != null && qudrat < major.qudratMin - 8) {
      return Math.max(5, Math.round((100 - (major.qudratMin - qudrat) * 4) * 0.3));
    }
    if (tahsili != null && major.tahsiliMin != null && tahsili < major.tahsiliMin - 8) {
      return Math.max(5, Math.round((100 - (major.tahsiliMin - tahsili) * 4) * 0.3));
    }
  }

  // Final safety: if anything is NaN, return a sensible default
  if (typeof compositeStudent !== 'number' || isNaN(compositeStudent)) {
    compositeStudent = 75;
  }
  if (typeof compositeMajor !== 'number' || isNaN(compositeMajor)) {
    compositeMajor = 85;
  }

  // Sigmoid on composite
  const z = (compositeStudent - compositeMajor) / majorStd;
  const sig = 1 / (1 + Math.exp(-z));
  return Math.max(8, Math.min(98, Math.round(sig * 90 + 8)));
}

// ===== Single major fit scoring =====
/**
 * @param {RIASEC} userRIASEC
 * @param {Object} major
 * @returns {{ fit: number, acceptance: number, overall: number }}
 */
export function scoreMajor(userRIASEC, major, answers) {
  // Backwards compat: allow numeric grade for tests
  const ans = typeof answers === 'number' ? { grade: answers } : (answers || {});
  const fit = cosineSimilarity(userRIASEC, major.riasec || { R: 5, I: 5, A: 5, S: 5, E: 5, C: 5 });
  const acceptance = getAcceptanceScore(ans, major);
  const grade = ans.grade;
  const majorAvg = major.avgGrade;

  // Base weighted: fit 75% / admission 25%
  let overall = fit * 0.75 + acceptance * 0.25;

  // STRONG alignment bonus: when fit is very high AND major is realistic,
  // reward alignment heavily (this is the user's #1 priority)
  if (fit >= 90 && grade && majorAvg && grade >= majorAvg - 3) {
    overall += 8;
  } else if (fit >= 85 && grade && majorAvg && grade >= majorAvg - 3) {
    overall += 5;
  } else if (fit >= 80 && grade && majorAvg && grade >= majorAvg - 3) {
    overall += 3;
  }

  // Penalty: if major avgGrade is way above student's grade
  if (majorAvg && grade && majorAvg > grade + 5) {
    const overshoot = majorAvg - grade - 5;
    overall -= overshoot * 2.0;
  }

  // Penalty: if acceptance is very low (long shot)
  if (acceptance < 60) {
    overall -= (60 - acceptance) * 0.5;
  }

  overall = Math.max(0, Math.min(100, Math.round(overall)));
  return { fit, acceptance, overall };
}

// ===== Generate AI-style explanation =====
/**
 * Explains why this major fits the user's profile in plain language (AR/EN).
 *
 * @param {RIASEC} userRIASEC
 * @param {Object} major
 * @param {string} lang - 'ar' | 'en'
 * @returns {string}
 */
export function generateExplanation(userRIASEC, major, lang = 'ar') {
  if (!major.riasec) return '';

  // Find user's top 2 RIASEC dimensions
  const sorted = Object.entries(userRIASEC)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2);
  const topDims = sorted.map(([k]) => k);
  const topScores = sorted.map(([, v]) => v);

  const majorSorted = Object.entries(major.riasec)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2);
  const majorTopDims = majorSorted.map(([k]) => k);

  // Find which user strengths align with major requirements
  const shared = topDims.filter((d) => majorTopDims.includes(d));
  const isAr = lang === 'ar';

  // Emoji + dimension labels
  const dimEmoji = { R: '🔧', I: '🔬', A: '🎨', S: '🤝', E: '🚀', C: '📋' };
  const dimAr = {
    R: 'التفكير العملي',
    I: 'التفكير التحليلي',
    A: 'الإبداع',
    S: 'مساعدة الناس',
    E: 'القيادة',
    C: 'التنظيم',
  };
  const dimEn = {
    R: 'practical thinking',
    I: 'analytical thinking',
    A: 'creativity',
    S: 'helping people',
    E: 'leadership',
    C: 'organization',
  };

  const userTopAr = topDims.map((d, i) => `${dimEmoji[d]} ${dimAr[d]} (${topScores[i]}/10)`).join(' و ');
  const userTopEn = topDims.map((d, i) => `${dimEmoji[d]} ${dimEn[d]} (${topScores[i]}/10)`).join(' & ');

  const majorTopAr = majorTopDims.map((d) => `${dimEmoji[d]} ${dimAr[d]}`).join(' و ');
  const majorTopEn = majorTopDims.map((d) => `${dimEmoji[d]} ${dimEn[d]}`).join(' & ');

  if (isAr) {
    if (shared.length >= 2) {
      return `اخترنا لك ${major.title_ar} لأن نقاط قوتك (${userTopAr}) تتطابق بشكل ممتاز مع متطلبات التخصص (${majorTopAr}). شخصيتك العلمية + قدراتك التحليلية تؤهلك للتفوق فيه.`;
    } else if (shared.length === 1) {
      return `اخترنا لك ${major.title_ar} لأن نقطة قوتك الأساسية (${userTopAr}) تتوافق مع جوهر التخصص (${majorTopAr}). سيناريو مثير يستحق الاستكشاف.`;
    } else {
      return `${major.title_ar} تخصص يوسع مداركك: تبرز فيه ${userTopAr}، بينما يفتح لك أبعاداً جديدة (${majorTopAr}) لتنميتها.`;
    }
  } else {
    if (shared.length >= 2) {
      return `We picked ${major.title_en} because your strengths (${userTopEn}) match the major's core requirements (${majorTopEn}) very well. Your analytical + practical mindset makes you set up to excel here.`;
    } else if (shared.length === 1) {
      return `We picked ${major.title_en} because your top strength (${userTopEn}) aligns with the major's core (${majorTopEn}). An exciting match worth exploring.`;
    } else {
      return `${major.title_en} is a growth edge major: your strengths (${userTopEn}) already shine here, while you can develop new dimensions (${majorTopEn}) along the way.`;
    }
  }
}

// ===== Full analysis — the new brain =====
/**
 * Returns top 3 majors with fit, acceptance, explanation.
 *
 * @param {Object} answers
 * @returns {Array<{ major: Object, fit: number, acceptance: number, overall: number, explanation: string }>}
 */
export function analyzeAnswers(answers = {}, lang = 'ar') {
  const userRIASEC = computeUserRIASEC(answers);

  // Score all majors (passing full answers object now — includes grade/qudrat/tahsili)
  const scored = MAJORS.map((major) => {
    const { fit, acceptance, overall } = scoreMajor(userRIASEC, major, answers);
    return {
      major,
      fit,
      acceptance,
      overall,
      explanation: generateExplanation(userRIASEC, major, lang),
      riasec: major.riasec,
      hasQudrat: answers.qudrat != null,
      hasTahsili: answers.tahsili != null,
    };
  });

  // Sort by overall score (fit + acceptance weighted)
  scored.sort((a, b) => b.overall - a.overall);

  // Pick top 3 with smart diversity:
  const top3 = [];
  const usedCategories = new Set();

  if (scored.length > 0) {
    top3.push(scored[0]);
    usedCategories.add(scored[0].major.category);
  }

  const cutoff = scored[0].overall - 8;
  for (const candidate of scored) {
    if (top3.length >= 3) break;
    if (top3.find((c) => c.major.id === candidate.major.id)) continue;
    if (candidate.overall < cutoff) break;
    if (!usedCategories.has(candidate.major.category)) {
      top3.push(candidate);
      usedCategories.add(candidate.major.category);
    }
  }

  for (const candidate of scored) {
    if (top3.length >= 3) break;
    if (!top3.find((c) => c.major.id === candidate.major.id)) {
      top3.push(candidate);
    }
  }

  return {
    recommendations: top3,
    userRIASEC,
    riasecLabels: RIASEC_LABELS,
    riasecProfile: formatRIASECProfile(userRIASEC, lang),
  };
}

// ===== Format RIASEC profile for display =====
/**
 * @param {RIASEC} riasec
 * @param {string} lang
 * @returns {Array<{ dim: string, label: string, score: number, top: boolean }>}
 */
export function formatRIASECProfile(riasec, lang = 'ar') {
  const sorted = Object.entries(riasec).sort((a, b) => b[1] - a[1]);
  const topScore = sorted[0][1];
  const isAr = lang === 'ar';

  const labels = isAr
    ? { R: 'واقعي', I: 'استكشافي', A: 'فني', S: 'اجتماعي', E: 'ريادي', C: 'تقليدي' }
    : { R: 'Realistic', I: 'Investigative', A: 'Artistic', S: 'Social', E: 'Enterprising', C: 'Conventional' };

  const dims = { R: '🔧', I: '🔬', A: '🎨', S: '🤝', E: '🚀', C: '📋' };

  return sorted.map(([k, score]) => ({
    dim: k,
    label: `${dims[k]} ${labels[k]}`,
    score: Math.round(score * 10), // convert 0-10 to 0-100 for display
    top: score === topScore,
  }));
}

// ===== RIASEC archetype name =====
/**
 * Returns a friendly archetype name based on dominant dimensions.
 * Examples: "Investigator", "Realistic Doer", "Social Helper"
 */
export function getArchetype(riasec, lang = 'ar') {
  const sorted = Object.entries(riasec).sort((a, b) => b[1] - a[1]);
  const top = sorted[0];
  const second = sorted[1];
  const combined = [top[0], second[0]].sort().join('');

  const isAr = lang === 'ar';
  const archetypes = isAr
    ? {
        I: 'المحقق العلمي',
        R: 'المنفّذ العملي',
        A: 'المبدع الفني',
        S: 'المساعد الاجتماعي',
        E: 'القائد الريادي',
        C: 'المنظّم الإداري',
        IR: 'الباحث التطبيقي',
        IA: 'المفكر المبدع',
        IS: 'الطبيب/الباحث الاجتماعي',
        IE: 'المحلل القيادي',
        IC: 'المحلل المنظّم',
        RE: 'المهندس القيادي',
        RA: 'المصمم الهندسي',
        RS: 'المعالج العملي',
        AS: 'المعلم المبدع',
        AE: 'الفنان الريادي',
        SE: 'القائد الاجتماعي',
        SC: 'المعلم المنظّم',
        EC: 'المدير المنظّم',
      }
    : {
        I: 'Investigator',
        R: 'Realistic Doer',
        A: 'Creative Artist',
        S: 'Social Helper',
        E: 'Enterprising Leader',
        C: 'Organized Administrator',
        IR: 'Applied Researcher',
        IA: 'Creative Thinker',
        IS: 'Medical Researcher',
        IE: 'Strategic Analyst',
        IC: 'Systematic Analyst',
        RE: 'Engineering Leader',
        RA: 'Design Engineer',
        RS: 'Practical Caregiver',
        AS: 'Creative Teacher',
        AE: 'Creative Entrepreneur',
        SE: 'Social Leader',
        SC: 'Organized Teacher',
        EC: 'Corporate Manager',
      };

  // Try combined key first, then top key
  return archetypes[combined] || archetypes[top[0]] || (isAr ? 'مميز' : 'Distinctive');
}
