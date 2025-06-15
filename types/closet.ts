import { ClosetItem } from "./closet-item";

export interface Closet {
  id: string;
  user_id: string;
  name: string;
  created_at: string;
  closet_items?: ClosetItem[];
}
