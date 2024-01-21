export interface User {
  id: number;
  phone: string;
  full_name: string;
  is_active: boolean | null;
  is_teacher: boolean | null;
  is_staff: boolean | null;
  is_admin: boolean | null;
  is_student: boolean | null;
}
