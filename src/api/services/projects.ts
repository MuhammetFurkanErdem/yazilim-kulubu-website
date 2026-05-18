import { supabase } from '../config';
import { Database } from '@/types/database.types';

type Project = Database['public']['Tables']['projects']['Row'];
type ProjectInsert = Database['public']['Tables']['projects']['Insert'];
type ProjectUpdate = Database['public']['Tables']['projects']['Update'];

export const projectService = {
  // Tüm projeleri çek (Admin için)
  async getAllProjects() {
    const { data, error } = await supabase
      .from('projects')
      .select('*, profiles(first_name, last_name, avatar_url)')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Sadece onaylanmış projeleri çek (Public ziyaretçiler için)
  async getApprovedProjects() {
    const { data, error } = await supabase
      .from('projects')
      .select('*, profiles(first_name, last_name, avatar_url)')
      .eq('status', 'approved')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Yeni proje ekle
  async createProject(project: ProjectInsert) {
    const { data, error } = await supabase
      .from('projects')
      .insert(project)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Proje durumunu güncelle (Onayla / Reddet)
  async updateProjectStatus(id: string, status: 'pending' | 'approved' | 'rejected') {
    const { data, error } = await supabase
      .from('projects')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Proje sil
  async deleteProject(id: string) {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }
};
