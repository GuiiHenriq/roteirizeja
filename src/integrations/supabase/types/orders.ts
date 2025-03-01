export type OrdersTable = {
    Row: {
      id: string;
      user_id: string;
      status: string;
      amount: number;
      payment_method: string;
      payment_url: string;
    };
    Insert: {
        id?: string;
        user_id?: string;
        status?: string;
        amount?: number;
        payment_method?: string;
        payment_url?: string;
    };
    Update: {
        id?: string;
        user_id?: string;
        status?: string;
        amount?: number;
        payment_method?: string;
        payment_url?: string;
    };
    Relationships: [];
  };
  