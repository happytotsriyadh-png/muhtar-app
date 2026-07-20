// 29 Saudi Government Universities - Source: Ministry of Education (moe.gov.sa)
// Updated: 2026-07-18
// Official list of public universities

export const UNIVERSITIES = [
  { id: 1, name_ar: 'جامعة أم القرى', name_en: 'Umm Al-Qura University', city_ar: 'مكة المكرمة', city_en: 'Makkah', founded: '1369 هـ', website: 'uqu.edu.sa', specialties: ['شريعة', 'أدب', 'علوم', 'هندسة', 'طب', 'صيدلة', 'حاسبات'] },
  { id: 2, name_ar: 'الجامعة الإسلامية', name_en: 'Islamic University', city_ar: 'المدينة المنورة', city_en: 'Madinah', founded: '1381 هـ', website: 'iu.edu.sa', specialties: ['شريعة', 'فقه', 'هندسة', 'حاسبات'] },
  { id: 3, name_ar: 'جامعة الإمام محمد بن سعود الإسلامية', name_en: 'Imam Muhammad Ibn Saud University', city_ar: 'الرياض', city_en: 'Riyadh', founded: '1373 هـ', website: 'imamu.edu.sa', specialties: ['شريعة', 'قانون', 'سياسة', 'حاسبات', 'هندسة'] },
  { id: 4, name_ar: 'جامعة الملك سعود', name_en: 'King Saud University', city_ar: 'الرياض', city_en: 'Riyadh', founded: '1377 هـ', website: 'ksu.edu.sa', specialties: ['طب', 'صيدلة', 'أسنان', 'هندسة', 'حاسبات', 'علوم', 'تجارة'] },
  { id: 5, name_ar: 'جامعة الملك عبدالعزيز', name_en: 'King Abdulaziz University', city_ar: 'جدة', city_en: 'Jeddah', founded: '1387 هـ', website: 'kau.edu.sa', specialties: ['طب', 'صيدلة', 'هندسة', 'علوم', 'حاسبات', 'أرصاد'] },
  { id: 6, name_ar: 'جامعة الملك فهد للبترول والمعادن', name_en: 'KFUPM', city_ar: 'الظهران', city_en: 'Dhahran', founded: '1383 هـ', website: 'kfupm.edu.sa', specialties: ['هندسة بترول', 'هندسة كيميائية', 'هندسة كهربائية', 'علوم', 'حاسبات'] },
  { id: 7, name_ar: 'جامعة الملك فيصل', name_en: 'King Faisal University', city_ar: 'الأحساء', city_en: 'Al-Ahsa', founded: '1394 هـ', website: 'kfu.edu.sa', specialties: ['طب', 'صيدلة', 'طب بيطري', 'زراعة', 'هندسة', 'حاسبات'] },
  { id: 8, name_ar: 'جامعة الملك خالد', name_en: 'King Khalid University', city_ar: 'أبها', city_en: 'Abha', founded: '1419 هـ', website: 'kku.edu.sa', specialties: ['طب', 'صيدلة', 'هندسة', 'علوم', 'حاسبات', 'تعليم'] },
  { id: 9, name_ar: 'جامعة القصيم', name_en: 'Qassim University', city_ar: 'القصيم', city_en: 'Qassim', founded: '1423 هـ', website: 'qu.edu.sa', specialties: ['طب', 'صيدلة', 'أسنان', 'هندسة', 'علوم', 'حاسبات'] },
  { id: 10, name_ar: 'جامعة طيبة', name_en: 'Taibah University', city_ar: 'المدينة المنورة', city_en: 'Madinah', founded: '1424 هـ', website: 'taibahu.edu.sa', specialties: ['طب', 'صيدلة', 'هندسة', 'علوم', 'حاسبات'] },
  { id: 11, name_ar: 'جامعة الطائف', name_en: 'Taif University', city_ar: 'الطائف', city_en: 'Taif', founded: '1400 هـ', website: 'tu.edu.sa', specialties: ['طب', 'صيدلة', 'هندسة', 'علوم', 'حاسبات', 'تصميم'] },
  { id: 12, name_ar: 'جامعة حائل', name_en: 'University of Ha\'il', city_ar: 'حائل', city_en: 'Hail', founded: '2005 م', website: 'uoh.edu.sa', specialties: ['طب', 'صيدلة', 'هندسة', 'علوم', 'حاسبات'] },
  { id: 13, name_ar: 'جامعة جازان', name_en: 'Jazan University', city_ar: 'جازان', city_en: 'Jazan', founded: '1426 هـ', website: 'jazanu.edu.sa', specialties: ['طب', 'صيدلة', 'هندسة', 'علوم', 'حاسبات', 'زراعة'] },
  { id: 14, name_ar: 'جامعة الجوف', name_en: 'Al-Jouf University', city_ar: 'سكاكا', city_en: 'Sakaka', founded: '1426 هـ', website: 'ju.edu.sa', specialties: ['طب', 'صيدلة', 'هندسة', 'علوم', 'حاسبات'] },
  { id: 15, name_ar: 'جامعة الباحة', name_en: 'Al-Baha University', city_ar: 'الباحة', city_en: 'Al-Baha', founded: '1427 هـ', website: 'bu.edu.sa', specialties: ['طب', 'صيدلة', 'هندسة', 'علوم', 'حاسبات'] },
  { id: 16, name_ar: 'جامعة تبوك', name_en: 'University of Tabuk', city_ar: 'تبوك', city_en: 'Tabuk', founded: '1427 هـ', website: 'ut.edu.sa', specialties: ['طب', 'صيدلة', 'هندسة', 'علوم', 'حاسبات'] },
  { id: 17, name_ar: 'جامعة نجران', name_en: 'Najran University', city_ar: 'نجران', city_en: 'Najran', founded: '1427 هـ', website: 'nu.edu.sa', specialties: ['طب', 'صيدلة', 'هندسة', 'علوم', 'حاسبات'] },
  { id: 18, name_ar: 'جامعة الحدود الشمالية', name_en: 'Northern Borders University', city_ar: 'عرعر', city_en: 'Arar', founded: '1428 هـ', website: 'nbu.edu.sa', specialties: ['طب', 'صيدلة', 'هندسة', 'علوم', 'حاسبات'] },
  { id: 19, name_ar: 'جامعة الأميرة نورة بنت عبدالرحمن', name_en: 'Princess Nourah University', city_ar: 'الرياض', city_en: 'Riyadh', founded: '1425 هـ', website: 'pnu.edu.sa', specialties: ['طب', 'صيدلة', 'حاسبات', 'هندسة', 'تصميم', 'فنون'] },
  { id: 20, name_ar: 'جامعة الملك سعود بن عبدالعزيز للعلوم الصحية', name_en: 'KSAU-HS', city_ar: 'الرياض', city_en: 'Riyadh', founded: '1426 هـ', website: 'ksau-hs.edu.sa', specialties: ['طب', 'صيدلة', 'تمريض', 'علوم صحية'] },
  { id: 21, name_ar: 'جامعة الإمام عبدالرحمن بن فيصل', name_en: 'IAU', city_ar: 'الدمام', city_en: 'Dammam', founded: '1395 هـ', website: 'iau.edu.sa', specialties: ['طب', 'صيدلة', 'أسنان', 'هندسة', 'علوم', 'حاسبات'] },
  { id: 22, name_ar: 'جامعة الأمير سطام بن عبدالعزيز', name_en: 'Prince Sattam University', city_ar: 'الخرج', city_en: 'Al-Kharj', founded: '1430 هـ', website: 'psau.edu.sa', specialties: ['طب', 'صيدلة', 'هندسة', 'علوم', 'حاسبات'] },
  { id: 23, name_ar: 'جامعة شقراء', name_en: 'Shaqra University', city_ar: 'شقراء', city_en: 'Shaqra', founded: '1430 هـ', website: 'su.edu.sa', specialties: ['طب', 'صيدلة', 'هندسة', 'علوم', 'حاسبات'] },
  { id: 24, name_ar: 'جامعة المجمعة', name_en: 'AlMajmaah University', city_ar: 'المجمعة', city_en: 'Al-Majmaah', founded: '1426 هـ', website: 'mu.edu.sa', specialties: ['طب', 'صيدلة', 'هندسة', 'علوم', 'حاسبات'] },
  { id: 25, name_ar: 'الجامعة السعودية الإلكترونية', name_en: 'Saudi Electronic University', city_ar: 'الرياض', city_en: 'Riyadh', founded: '1432 هـ', website: 'seu.edu.sa', specialties: ['حاسبات', 'إدارة أعمال', 'محاسبة', 'تسويق'] },
  { id: 26, name_ar: 'جامعة جدة', name_en: 'University of Jeddah', city_ar: 'جدة', city_en: 'Jeddah', founded: '1434 هـ', website: 'uj.edu.sa', specialties: ['طب', 'صيدلة', 'هندسة', 'علوم', 'حاسبات'] },
  { id: 27, name_ar: 'جامعة بيشة', name_en: 'University of Bisha', city_ar: 'بيشة', city_en: 'Bisha', founded: '1434 هـ', website: 'ub.edu.sa', specialties: ['طب', 'صيدلة', 'هندسة', 'علوم', 'حاسبات'] },
  { id: 28, name_ar: 'جامعة الملك عبدالله للعلوم والتقنية', name_en: 'KAUST', city_ar: 'ثول', city_en: 'Thuwal', founded: '1426 هـ', website: 'kaust.edu.sa', specialties: ['علوم حاسوب', 'هندسة كهربائية', 'علوم بحار', 'رياضيات', 'فيزياء'] },
  { id: 29, name_ar: 'جامعة حفر الباطن', name_en: 'University of Hafr Al-Batin', city_ar: 'حفر الباطن', city_en: 'Hafr Al-Batin', founded: '1435 هـ', website: 'uhb.edu.sa', specialties: ['طب', 'صيدلة', 'هندسة', 'علوم', 'حاسبات'] },
];

export const TOTAL_UNIVERSITIES = UNIVERSITIES.length;