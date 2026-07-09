import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://ffexovxtgyiohpammgop.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmZXhvdnh0Z3lpb2hwYW1tZ29wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxMDAxOTksImV4cCI6MjA5NDY3NjE5OX0.irV8cQUpEdAaO4mG1a2waI_CBMvXBvuUSOEAHewlFD0'
);

async function run() {
  console.log("Trying login with ygk12345...");
  const { data: sessionData, error: authError } = await supabase.auth.signInWithPassword({
    email: 'yazilimgelistirmecomu@gmail.com',
    password: 'ygk12345'
  });

  if (authError) {
    console.error("Login failed:", authError.message);
    console.log("Proceeding with anonymous client...");
  } else {
    console.log("Login successful! Token acquired.");
  }

  // Update Projects
  const updatesProjects = [
    {
      id: "dee77aef-a822-4f82-82de-22169f9b9d6f",
      title: "Kampüs Etkinlik",
      description: "Üniversite genelindeki kulüp etkinliklerini, duyuruları ve öğrenci topluluklarını tek bir güvenli mobil merkezde birleştiren modern uygulama.",
      tech_stack: ["Flutter", "Firebase", "Dart"],
      image_url: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "d1b6767b-1b8f-4de5-bad3-6be06cd999ea",
      title: "CineLog",
      description: "Sinemaseverlerin izledikleri filmleri günlük gibi kaydedebileceği, arkadaşlarıyla paylaşabileceği ve yeni filmler keşfedebileceği sosyal film platformu.",
      tech_stack: ["React", "Node.js", "MongoDB"],
      image_url: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "f2702244-9534-45c3-bb3f-819dd494a698",
      title: "18 Mart Portal",
      description: "Üniversite öğrencilerinin ders notlarını paylaşabildiği, soru-cevap yapabildiği ve akademik takvimi takip edebildiği öğrenci odaklı bilgi portalı.",
      tech_stack: ["React", "TypeScript", "Tailwind CSS"],
      image_url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800"
    }
  ];

  for (const proj of updatesProjects) {
    const { error } = await supabase.from('projects').update({
      title: proj.title,
      description: proj.description,
      tech_stack: proj.tech_stack,
      image_url: proj.image_url
    }).eq('id', proj.id);

    if (error) {
      console.error(`Failed to update project ${proj.title}:`, error.message);
    } else {
      console.log(`Successfully updated project ${proj.title}`);
    }
  }

  // Update Events
  const updatesEvents = [
    {
      id: "781b8849-8333-4ec7-9be1-750c0e149ff9",
      title: "Yapay Zeka Günleri",
      description: "Yapay zeka alanındaki son gelişmeleri, makine öğrenimi modellerini ve doğal dil işleme tekniklerini konuştuğumuz heyecan verici sunumlar ve workshop serisi.",
      location: "ÇOMÜ Mühendislik Fakültesi Konferans Salonu",
      image_url: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "47cdda6b-21c6-4c49-aa06-264e68ad40b0",
      title: "Geliştirici Zirvesi",
      description: "Farklı disiplinlerden gelen geliştiricilerin bir araya gelerek güncel yazılım teknolojilerini, kariyer fırsatlarını ve yeni trendleri ele alacağı interaktif paneller zirvesi.",
      location: "Akçansa Kongre Merkezi",
      image_url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800"
    }
  ];

  for (const ev of updatesEvents) {
    const { error } = await supabase.from('events').update({
      title: ev.title,
      description: ev.description,
      location: ev.location,
      image_url: ev.image_url
    }).eq('id', ev.id);

    if (error) {
      console.error(`Failed to update event ${ev.title}:`, error.message);
    } else {
      console.log(`Successfully updated event ${ev.title}`);
    }
  }
}

run();
