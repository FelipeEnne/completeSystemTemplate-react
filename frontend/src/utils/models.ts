export interface UserInterface {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface StatsInterface {
  categories: number;
  articles: number;
  users: number;
}

export interface StatsComponetInterface {
  icon: JSX.Element;
  color: string;
  title: string;
  value: number;
}

export interface HeaderProps {
  icon?: JSX.Element;
  title?: string;
  subtitle?: string;
}

export type CommunicationType = {
  id?: number;
  sender: string;
  receiver: string;
  communicationMessage: string;
  deliveryDate: string;
  communicationFormat: string[];
  communicationStatus?: string;
};
