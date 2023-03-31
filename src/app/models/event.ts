export interface IEvent {
  name: string;
  date: string;
  price: number;
  type: string;
  description: string;
  user: number;
  id: number;
}

export class EventData implements IEvent {
  name: string;
  date: string;
  price: number;
  type: string;
  description: string;
  user: number;
  id: number;
  constructor(data: any = {}) {
    this.name = data.name || "";
    this.date = data.date || "";
    this.price = data.price || 0;
    this.type = data.type || "normal";
    this.description = data.description || "";
    this.user = data.user || null;
    this.id = data.id || new Date().getTime();
  }
}

interface IError {
  name: boolean;
  date: boolean;
  price: boolean;
  type: boolean;
  description: boolean;
  termsAccepted: boolean;
}
export class EventError implements IError {
  name: boolean;
  date: boolean;
  price: boolean;
  type: boolean;
  description: boolean;
  termsAccepted: boolean;
  constructor(data: any = {}) {
    this.name = data.name || false;
    this.date = data.date || false;
    this.price = data.price || false;
    this.type = data.type || false;
    this.description = data.description || false;
    this.termsAccepted = data.termsAccepted || false;
  }
}
