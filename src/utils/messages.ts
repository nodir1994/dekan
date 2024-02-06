export interface MessageInterface {
    id: string | number;
    username: string;
    fullname: string;
    view_count: number;
    theme: string;
    message: string;
    status: string;
    is_seen: boolean,
    seen_date: date;
    sender: Object;
    old_status: null
  }
  