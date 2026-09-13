import { supabase } from '../config';
import { Database } from '@/types/database.types';

type CalendarEntry = Database['public']['Tables']['calendar_entries']['Row'];
type CalendarEntryInsert = Database['public']['Tables']['calendar_entries']['Insert'];
type CalendarEntryUpdate = Database['public']['Tables']['calendar_entries']['Update'];

export const calendarEntryService = {
  // Tüm takvim kayıtlarını çek (milli bayram, resmi tatil, vize/final haftaları vb.)
  async getAllEntries() {
    const { data, error } = await supabase
      .from('calendar_entries')
      .select('*')
      .order('start_date', { ascending: true });

    if (error) throw error;
    return data;
  },

  // Yeni takvim kaydı ekle
  async createEntry(entry: CalendarEntryInsert) {
    const { data, error } = await supabase
      .from('calendar_entries')
      .insert(entry)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Takvim kaydını güncelle
  async updateEntry(id: string, updates: CalendarEntryUpdate) {
    const { data, error } = await supabase
      .from('calendar_entries')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Takvim kaydını sil
  async deleteEntry(id: string) {
    const { error } = await supabase
      .from('calendar_entries')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }
};
