export interface GetUserProfileResponse {
  email: string;
  firstname: string;
  lastname: string;
  phone_number: string;
}

export interface UpdateUserProfile {
  firstname: string;
  lastname: string;
  phone_number: string;
}

export interface CreateBookRoom {
  checkin_at: string | null;
  checkout_at: string | null;
  email: string;
  firstname: string;
  lastname: string;
  phone_number: string;
}

export interface GetBookedDate {
  id: number;
  checkin_at: string;
  checkout_at: string;
  email: string;
  firstname: string;
  lastname: string;
  phone_number: string;
  created_at: string;
  updated_at: string;
}
