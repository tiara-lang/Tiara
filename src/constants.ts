import { Indicator, Student } from './types';

export const INDICATORS: Indicator[] = [
  // 1. Partisipasi Kegiatan Kelas
  { id: 'pkk_1', category: 'Partisipasi Kegiatan Kelas', text: 'Ananda mampu mengikuti instruksi 2-3 langkah di kelas ramai dengan pengingat visual minimal' },
  { id: 'pkk_2', category: 'Partisipasi Kegiatan Kelas', text: 'Ananda mampu berpartisipasi aktif dalam diskusi kelompok kecil dan memberikan 1 kontribusi verbal yang relevan' },
  { id: 'pkk_3', category: 'Partisipasi Kegiatan Kelas', text: 'Ananda mampu menyelesaikan tugas individu tanpa pengingat dari guru lebih dari 1 kali' },
  
  // 2. Penyelesaian Tugas Akademik
  { id: 'pta_1', category: 'Penyelesaian Tugas Akademik', text: 'Ananda mampu mempertahankan fokus 15 menit di kelas ramai dengan pengingat visual minimal' },
  { id: 'pta_2', category: 'Penyelesaian Tugas Akademik', text: 'Ananda mampu menyelesaikan tugas 3 langkah dengan bantuan visual /teman sebaya' },
  
  // 3. Kemandirian ADL & Spiritual
  { id: 'kas_1', category: 'Kemandirian ADL & Spiritual', text: 'Ananda mampu melipat pakaian dengan baik dan benar' },
  { id: 'kas_2', category: 'Kemandirian ADL & Spiritual', text: 'Ananda mampu melakukan wudu dengan urutan benar tanpa arahan langsung' },
  { id: 'kas_3', category: 'Kemandirian ADL & Spiritual', text: 'Ananda mampu melakukan salat mandiri dengan urutan benar tanpa arahan langsung' },
  
  // 4. Regulasi Emosi & Perilaku
  { id: 'rep_1', category: 'Regulasi Emosi & Perilaku', text: 'Ananda mampu mengenali tanda-tanda ketika mulai frustasi (wajah tegang, suara meninggi, dan tubuh gelisah)' },
  { id: 'rep_2', category: 'Regulasi Emosi & Perilaku', text: 'Ananda mampu menenangkan diri dengan pernafasan dalam ketika merasa frustasi' },
  
  // 8. Partisipasi Kelas & Education - Numerasi
  { id: 'num_1', category: 'Numerasi', text: 'Ananda mampu memecahkan soal pembagian' },
  { id: 'num_2', category: 'Numerasi', text: 'Ananda mampu memecahkan soal cerita (aplikasi) dalam matematika' },
  { id: 'num_3', category: 'Numerasi', text: 'Ananda mampu memilih strategi belajar matematika secara mandiri' },
];

export const MOCK_STUDENTS: Student[] = [
  { id: 's1', name: 'Attar Karan Daniswara', class: '4 Red Wolf', nisn: '0151790646' },
  { id: 's2', name: 'Zianka Azka', class: '4 Red Wolf', nisn: '0151790001' },
];

export const NARRATIVE_TEMPLATES: Record<number, string> = {
  1: 'Ananda menunjukkan kesulitan signifikan dan membutuhkan bantuan penuh dalam [program].',
  2: 'Ananda mampu melakukan [program] dengan bantuan maksimal dan bimbingan intensif.',
  3: 'Ananda mampu melakukan [program] dengan bantuan minimal atau sesekali diingatkan.',
  4: 'Ananda mampu melakukan [program] dengan baik dan konsisten dengan alat bantu minimal.',
  5: 'Ananda mampu melakukan [program] secara mandiri, penuh percaya diri, dan konsisten.',
};

export const GRADE_CATEGORY = (percentage: number) => {
  if (percentage >= 85) return { grade: 'A', category: 'Cakap' };
  if (percentage >= 70) return { grade: 'B', category: 'Berkembang' };
  if (percentage >= 50) return { grade: 'C', category: 'Berkembang' };
  if (percentage >= 25) return { grade: 'D', category: 'Pemula' };
  return { grade: 'E', category: 'Pemula' };
};
