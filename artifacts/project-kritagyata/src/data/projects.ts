export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  year: number;
  imageUrl: string;
  beneficiaries: number;
  location: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Old Age Home Visits",
    description:
      "A heartfelt visit to elderly residents at an old age home in Paschim Vihar, New Delhi — bringing joy, companionship, and essential supplies to 35+ seniors in collaboration with Project Aqidat.",
    longDescription:
      "On 15th March 2026, Project Kritagyata joined hands with Project Aqidat for a deeply moving Old Age Home Visit drive at Paschim Vihar, New Delhi. Volunteers gathered to spend quality time with elderly residents who often go weeks without visitors — sharing conversations, distributing food and daily essentials, and offering the simple but powerful gift of human connection. The drive touched the lives of 35+ residents, many of whom expressed how much these visits mean to them.",
    category: "Elder Care",
    year: 2026,
    imageUrl: "/old-age-home-visit.png",
    beneficiaries: 35,
    location: "Paschim Vihar, New Delhi",
    tags: ["Elder Care", "Community Visit", "Community", "Collaboration", "Project Aqidat", "New Delhi"],
  },
  {
    id: 7,
    title: "Sharbat Distribution",
    description:
      "A refreshing act of care — distributing sharbat to passersby, workers, and the underprivileged at Connaught Place, Delhi, on a hot summer day in collaboration with Project Aqidat, Project Sukh, and Thrive Together.",
    longDescription:
      "On 17th May 2026, amid the sweltering summer heat of Delhi, Project Kritagyata united with three incredible partner organisations — Project Aqidat, Project Sukh, and Thrive Together — for a Sharbat Distribution drive at Connaught Place, Delhi. Volunteers lined the streets, offering cool, refreshing sharbat to daily wage workers, street vendors, auto-rickshaw drivers, and anyone who passed by. The drive was a celebration of solidarity — a simple, joyful reminder that caring for one another is the highest form of gratitude. Hundreds of glasses of sharbat were distributed, smiles were exchanged, and for a few hours, the bustling heart of Delhi felt a little cooler and a lot kinder.",
    category: "Distribution",
    year: 2026,
    imageUrl: "/sharbat-distribution.jpeg",
    beneficiaries: 200,
    location: "Connaught Place, Delhi",
    tags: ["Distribution", "Food & Beverage", "Collaboration", "Project Aqidat", "Project Sukh", "Thrive Together", "Delhi"],
  },
  {
    id: 9,
    title: "Visit at Bharte Kadam NGO",
    description:
      "A joyful and impactful visit to Bharte Kadam NGO, Sector 1, Rohini, New Delhi — spending meaningful time with underprivileged children, engaging them in activities and bringing warmth to 45+ young beneficiaries.",
    longDescription:
      "On 28th December 2025, Project Kritagyata volunteers visited Bharte Kadam NGO at Sector 1, Rohini, New Delhi — a centre dedicated to educating and supporting children from underprivileged communities. The visit was filled with laughter, learning, and connection as our team engaged the children in interactive activities, distributed supplies, and spent quality time with each of them. Over 45 beneficiaries were touched by the drive. The energy and excitement in the children's eyes was an unforgettable reminder of the difference that showing up can make. This was one of Kritagyata's earliest drives, carried out just weeks after our launch — and it set the spirit for everything that followed.",
    category: "Community Visit",
    year: 2025,
    imageUrl: "/bharte-kadam-visit.jpeg",
    beneficiaries: 45,
    location: "Bharte Kadam NGO, Sector 1, Rohini, New Delhi",
    tags: ["Community Visit", "Children", "Education", "Rohini", "New Delhi", "2025"],
  },
  {
    id: 8,
    title: "Clothes & Food Distribution",
    description:
      "Project Kritagyata distributed clothes and food to underprivileged children and families at Sector 5, Rohini, New Delhi — bringing warmth, nourishment, and dignity to 50+ beneficiaries.",
    longDescription:
      "On 9th May 2026, Project Kritagyata volunteers gathered at Sector 5, Rohini, New Delhi for a Clothes and Food Distribution drive. The team reached out to underprivileged children and families in the area, distributing essential clothing items and nutritious food packets. Over 50 beneficiaries — many of them young children — received support on the day. The smiles on the children's faces were a powerful reminder of why every act of giving matters. This drive reflected the core belief of Kritagyata: that gratitude is not a passive feeling, but an active commitment to the communities around us.",
    category: "Distribution",
    year: 2026,
    imageUrl: "/clothes-food-distribution.jpeg",
    beneficiaries: 50,
    location: "Sector 5, Rohini, New Delhi",
    tags: ["Distribution", "Children", "Food", "Clothing", "Rohini", "New Delhi"],
  },
];

export const stats = { totalProjects: 4 };
