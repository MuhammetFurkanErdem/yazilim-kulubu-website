-- Bu sorguyu Supabase SQL Editor'de çalıştırarak akademik takvim (milli bayramlar,
-- resmi tatiller, vize/final haftaları) tablosunu oluşturabilirsiniz.

CREATE TABLE IF NOT EXISTS public.calendar_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  start_date date NOT NULL,
  end_date date,
  type text NOT NULL DEFAULT 'diger' CHECK (type IN ('milli_bayram', 'resmi_tatil', 'vize', 'final', 'diger')),
  description text,
  created_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  UNIQUE (title, start_date)
);

ALTER TABLE public.calendar_entries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "calendar_entries_select_all" ON public.calendar_entries;
CREATE POLICY "calendar_entries_select_all" ON public.calendar_entries
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "calendar_entries_insert_auth" ON public.calendar_entries;
CREATE POLICY "calendar_entries_insert_auth" ON public.calendar_entries
  FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "calendar_entries_update_auth" ON public.calendar_entries;
CREATE POLICY "calendar_entries_update_auth" ON public.calendar_entries
  FOR UPDATE TO authenticated USING (true);

DROP POLICY IF EXISTS "calendar_entries_delete_auth" ON public.calendar_entries;
CREATE POLICY "calendar_entries_delete_auth" ON public.calendar_entries
  FOR DELETE TO authenticated USING (true);

-- Tarihi sabit olan resmi tatil ve milli bayramlar (2025-2027), hicri takvime göre kayan
-- dini bayramlar (Diyanet İşleri Başkanlığı'nın açıkladığı tarihlere göre, arefe dahil) ve
-- ÇOMÜ Öğrenci İşleri 2026-2027 Genel Akademik Takvimi'ndeki kayıt/vize/final/bütünleme
-- tarihleri için başlangıç verisi.
-- Kaynak: https://ogrenciisleri.comu.edu.tr/20262027genelakademiktakvim-r198.html
INSERT INTO public.calendar_entries (title, start_date, end_date, type) VALUES
  -- ==================== SABİT TARİHLİ MİLLİ BAYRAM / RESMİ TATİLLER ====================
  ('Yılbaşı', '2025-01-01', NULL, 'resmi_tatil'),
  ('Ulusal Egemenlik ve Çocuk Bayramı', '2025-04-23', NULL, 'milli_bayram'),
  ('Emek ve Dayanışma Günü', '2025-05-01', NULL, 'resmi_tatil'),
  ('Atatürk''ü Anma, Gençlik ve Spor Bayramı', '2025-05-19', NULL, 'milli_bayram'),
  ('Demokrasi ve Milli Birlik Günü', '2025-07-15', NULL, 'resmi_tatil'),
  ('Zafer Bayramı', '2025-08-30', NULL, 'milli_bayram'),
  ('Cumhuriyet Bayramı', '2025-10-29', NULL, 'milli_bayram'),

  ('Yılbaşı', '2026-01-01', NULL, 'resmi_tatil'),
  ('Ulusal Egemenlik ve Çocuk Bayramı', '2026-04-23', NULL, 'milli_bayram'),
  ('Emek ve Dayanışma Günü', '2026-05-01', NULL, 'resmi_tatil'),
  ('Atatürk''ü Anma, Gençlik ve Spor Bayramı', '2026-05-19', NULL, 'milli_bayram'),
  ('Demokrasi ve Milli Birlik Günü', '2026-07-15', NULL, 'resmi_tatil'),
  ('Zafer Bayramı', '2026-08-30', NULL, 'milli_bayram'),
  ('Cumhuriyet Bayramı', '2026-10-29', NULL, 'milli_bayram'),

  ('Yılbaşı', '2027-01-01', NULL, 'resmi_tatil'),
  ('Ulusal Egemenlik ve Çocuk Bayramı', '2027-04-23', NULL, 'milli_bayram'),
  ('Emek ve Dayanışma Günü', '2027-05-01', NULL, 'resmi_tatil'),
  ('Atatürk''ü Anma, Gençlik ve Spor Bayramı', '2027-05-19', NULL, 'milli_bayram'),
  ('Demokrasi ve Milli Birlik Günü', '2027-07-15', NULL, 'resmi_tatil'),
  ('Zafer Bayramı', '2027-08-30', NULL, 'milli_bayram'),
  ('Cumhuriyet Bayramı', '2027-10-29', NULL, 'milli_bayram'),

  -- ==================== DİNİ BAYRAMLAR (RESMİ TATİL, arefe günü dahil) ====================
  ('Ramazan Bayramı', '2026-03-19', '2026-03-22', 'resmi_tatil'),
  ('Kurban Bayramı', '2026-05-26', '2026-05-30', 'resmi_tatil'),
  ('Ramazan Bayramı', '2027-03-08', '2027-03-11', 'resmi_tatil'),
  ('Kurban Bayramı', '2027-05-15', '2027-05-19', 'resmi_tatil'),

  -- ==================== ÇOMÜ 2026-2027 AKADEMİK TAKVİMİ: GÜZ YARIYILI ====================
  ('Güz Dönemi Kayıt Yenileme', '2026-09-07', '2026-09-11', 'diger'),
  ('Güz Dönemi Ders Ekleme-Bırakma, Geç Kayıtlar ve Danışman Onayları', '2026-09-14', '2026-09-18', 'diger'),
  ('Güz Dönemi Derslerin Başlaması', '2026-09-14', NULL, 'diger'),
  ('Güz Dönemi Ara (Vize) Sınavları', '2026-11-02', '2026-11-06', 'vize'),
  ('Güz Dönemi Derslerin Sonu', '2026-12-25', NULL, 'diger'),
  ('Güz Dönemi Yarıyıl Sonu (Final) Sınavları', '2026-12-28', '2027-01-08', 'final'),
  ('Güz Dönemi Bütünleme Sınavları', '2027-01-18', '2027-01-22', 'final'),
  ('Güz Dönemi Tek Ders Sınavı', '2027-02-04', NULL, 'diger'),

  -- ==================== ÇOMÜ 2026-2027 AKADEMİK TAKVİMİ: BAHAR YARIYILI ====================
  ('Bahar Dönemi Kayıt Yenileme', '2027-02-08', '2027-02-12', 'diger'),
  ('Bahar Dönemi Ders Ekleme-Bırakma, Geç Kayıtlar ve Danışman Onayları', '2027-02-15', '2027-02-19', 'diger'),
  ('Bahar Dönemi Derslerin Başlaması', '2027-02-15', NULL, 'diger'),
  ('Bahar Dönemi Ara (Vize) Sınavları', '2027-04-12', '2027-04-16', 'vize'),
  ('Bahar Dönemi Derslerin Sonu', '2027-06-04', NULL, 'diger'),
  ('Bahar Dönemi Yarıyıl Sonu (Final) Sınavları', '2027-06-07', '2027-06-18', 'final'),
  ('Bahar Dönemi Bütünleme Sınavları', '2027-06-28', '2027-07-02', 'final'),
  ('Bahar Dönemi Tek Ders Sınavı', '2027-07-07', NULL, 'diger'),

  -- ==================== ÇOMÜ 2026-2027 AKADEMİK TAKVİMİ: YAZ OKULU ====================
  ('Yaz Okulu Kayıtları', '2027-07-05', '2027-07-09', 'diger'),
  ('Yaz Okulu Derslerinin Başlaması', '2027-07-12', NULL, 'diger'),
  ('Yaz Okulu Derslerinin Sonu', '2027-08-27', NULL, 'diger'),
  ('Yaz Okulu Final Sınavları', '2027-08-31', '2027-09-03', 'final')
ON CONFLICT (title, start_date) DO NOTHING;
