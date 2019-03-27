export class Product {
    img: string[];
    title: string;
    id: number;
    price: number;
    originalprice: number;
    brand: string;
    tag: string;
    badge: string;
    categoryId: number;
    make: string;
    quantity: number;
    confirm: boolean;
    option: [
        {
            title: string;
            selected: '';
            type:
            [
                {  value: string },
                {  value: string },
                {  value: string },
                {  value: string }
            ],
        },
        {
            title: string;
            selected: '';

            type:
            [
                { value: string  },
                { value: string  },
                { value: string },
                { value: string },
                { value: string },
                { value: string }
            ]
        }
    ];
    specs:
        [
            {
                type: string,
                value: string,
            },
            {
                type: string,
                value: string,
            },
            {
                type: string,
                value: string,
            },
            {
                type: string,
                value: string,
            },
            {
                type: string,
                value: string,

            },
            {
                type: string,
                value: string,
            },
            {
                type: string,
                value: string,
            },
            {
                type: string,
                value: string,
            },
            {
                type: string,
                value: string
            },
            {
                type: string,
                value: string
            },

            {
                type: string,
                value: string
            },

            {
                type: string,
                value: string
            },

            {
                type: string,
                value: string
            },

            {
                type: string,
                value: string
            },

            {
                type: string,
                value: string
            }


        ];
    description: string[];

}

