export type CalendarEntryType = 'milli_bayram' | 'resmi_tatil' | 'vize' | 'final' | 'diger';

export const calendarEntryTypeConfig: Record<CalendarEntryType, { label: string; color: string }> = {
  milli_bayram: { label: 'Milli Bayram', color: '#D4183D' },
  resmi_tatil: { label: 'Resmi Tatil', color: '#E27756' },
  vize: { label: 'Vize Haftası', color: '#A855F7' },
  final: { label: 'Final Haftası', color: '#3D719F' },
  diger: { label: 'Diğer', color: '#6B7280' },
};

export const calendarEntryTypeOptions: { value: CalendarEntryType; label: string }[] = [
  { value: 'milli_bayram', label: 'Milli Bayram' },
  { value: 'resmi_tatil', label: 'Resmi Tatil' },
  { value: 'vize', label: 'Vize Haftası' },
  { value: 'final', label: 'Final Haftası' },
  { value: 'diger', label: 'Diğer' },
];
