export interface Experience {
  id: number;
  name: string;
  date: string;
  type: string;
  description: string;
}

export interface Club {
  id: number;
  user: {
    name: string;
  };
}

export interface ClubOption {
  id: number;
  name: string;
}
