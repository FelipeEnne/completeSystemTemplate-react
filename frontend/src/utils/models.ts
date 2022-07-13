export interface User {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
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
