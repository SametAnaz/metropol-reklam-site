/**
 * Projede kullanılan kategorilerin merkezi bir tanımı
 */
export const ALL_CATEGORIES = [
  { id: 'all', name: 'Tümü' },
  { id: 'arac-giydirme', name: 'Araç Giydirme' },
  { id: 'ataturk-kosesi', name: 'Atatürk Köşesi' },
  { id: 'cephe-giydirme', name: 'Cephe Giydirme' },
  { id: 'dijital-baski', name: 'Dijital Baskı' },
  { id: 'isikli-krom', name: 'Işıklı Krom' },
  { id: 'isikli-kutu-harf', name: 'Işıklı Kutu Harf' },
  { id: 'isikli-tabela', name: 'Işıklı Tabela' },
  { id: 'isikli-vinil', name: 'Işıklı Vinil' },
  { id: 'isiksiz-krom', name: 'Işıksız Krom' },
  { id: 'isiksiz-vinil', name: 'Işıksız Vinil' },
  { id: 'isimlik', name: 'İsimlik' },
  { id: 'kurumsal', name: 'Kurumsal' },
  { id: 'kutu-harf', name: 'Kutu Harf' },
  { id: 'led-tabela', name: 'LED Tabela' },
  { id: 'neon', name: 'Neon' },
  { id: 'okul', name: 'Okul' },
  { id: 'promosyon', name: 'Promosyon' },
  { id: 'tabela', name: 'Tabela' },
  { id: 'tisort-baski', name: 'Tişört Baskı' },
  { id: 'totem', name: 'Totem' },
  { id: 'vinil-kabartma', name: 'Vinil Kabartma' },
  { id: 'yonlendirme', name: 'Yönlendirme' },
  { id: 'yurtdisi-tabela', name: 'Yurtdışı Tabela' },
  { id: 'diger', name: 'Diğer' }
];

/**
 * Kategori ID'sinden kategori adına dönüştüren yardımcı fonksiyon
 */
export const getCategoryNameById = (categoryId) => {
  const category = ALL_CATEGORIES.find(cat => cat.id === categoryId);
  return category ? category.name : 'Belirtilmemiş';
};

/**
 * Kategori adından kategori ID'sine dönüştüren yardımcı fonksiyon
 */
export const getCategoryIdByName = (categoryName) => {
  const category = ALL_CATEGORIES.find(cat => cat.name === categoryName);
  return category ? category.id : '';
};
