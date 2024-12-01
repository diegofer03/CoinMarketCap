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
