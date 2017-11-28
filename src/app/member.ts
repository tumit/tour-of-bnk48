export interface I18n {
  th: string;
  en: string;
}

export interface Bio {
  food_allergies: I18n;
  favourite_foods: I18n;
  dislike_foods: I18n;
  favourite_games: I18n;
  likes: I18n;
  dislikes: I18n;
  hobbies: I18n;
  favourite_school_subjects: I18n;
  dislike_school_subjects: I18n;
}

export interface Member {
  id: number;
  slug: string;
  created: any;
  changed: any;
  first_name: I18n;
  last_name: I18n;
  nickname: I18n;
  position: number;
  team: number;
  birth_date: any;
  height: number;
  province: string;
  bio: Bio;
  blood_group: number;
  instagram: string;
  avatar_image: string;
  profile_image: string;
  profile_image_2x: string;
  status: number;
}
