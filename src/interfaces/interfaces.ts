export interface ListMap  {
    [key: string]: string;
}

export interface MemberMap  {
    [key: string]: string;
}

export interface TrelloList {
    id: string;
    name: string;
    closed?: boolean;
    idBoard?: string;
    pos?: number;
}

export interface TrelloMember {
    id: string;
    fullName: string;
    username?: string;
}

export interface TrelloLabel {
    id: string;
    name: string;
    color?: string;
}

export interface TrelloCard {
    id: string;
    name: string;
    idList: string;
    idMembers: string[];
    desc?: string;
    closed?: boolean;
    labels: TrelloLabel[];
    due?: string;
}

export interface TrelloBoard {
    id: string;
    name: string;
    desc: string;
    closed: boolean;
    lists: TrelloList[];
    members: TrelloMember[];
    cards: TrelloCard[];
}

export interface EngineOptions {
    engine: string;
    name: string;
    views: string;
    path: string;
}
export interface ServerConfig {
    port: number;
    // apiPath: string;
    nodeEnv: string;
    corsOrigin: string;
    viewEngine: EngineOptions;
}
export type Middleware = any[];

export interface ServerInstance {
    port: number;
    router: any;
    middlewares: Middleware;
    engineOptions: EngineOptions;
    app: any;
    start: () => Promise<void>;
}