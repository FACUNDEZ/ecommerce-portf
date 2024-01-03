export type LoginResponse =
    | {
        token: string;
        authorized: boolean;
        msg: string;
    }
    | {
        msg: string;
    };

export type registerResponse =
    | {
        msg: string;
        token: string;
    }
    | {
        msg: string;
    }

export type product =
    | {
        id: number;
        title: String;
        price: Number;
        description: String;
        image: string;
        category: string;
        rating: number;
    }