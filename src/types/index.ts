export interface SchoolData {
  name: string;
  logo: string;
  horizontalImage: string;
  verticalImage: string;
}

export interface PromotionContent {
  slogan: string;
  description: string;
  features: string[];
  history: string;
  contact: {
    address: string;
    phone: string;
    email: string;
  };
}

export interface GeneratedPage {
  school: SchoolData;
  content: PromotionContent;
  html: string;
}
