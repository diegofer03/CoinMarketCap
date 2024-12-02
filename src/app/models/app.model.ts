export interface Transaction {
  id?: string
  date: string;
  time: string;
  from: string;
  amountFrom: number;
  to: string;
  amountTo: number;
}

export interface FethListTransaction {
  status: string
  data: Transaction[]
}

export interface StatusInvest {
  invested: string
  actualWorth: string
}

export interface FetchStatusInvest{
  status: string
  data: StatusInvest
}

export interface CalculateFetch {
  status: Status;
  data:   Datum[];
}

export interface Datum {
  id:           number;
  symbol:       string;
  name:         string;
  amount:       number;
  last_updated: Date;
  quote:        Quote;
}

export interface Quote {
  [key: string]: Price;
}

export interface Price {
  price:        number;
  last_updated: Date;
}

export interface Status {
  timestamp:     Date;
  error_code:    number;
  error_message: null;
  elapsed:       number;
  credit_count:  number;
  notice:        null;
}
