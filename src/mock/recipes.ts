import type { Recipe } from '@/models/Recipe'

export const recipes: Recipe[] = [
    {
        id: 1,
        authorId: 1,
        title: 'Lomo Saltado',
        tags: ['Peruvian', 'Dinner', 'Stir-Fry'],
        imageUrl: '/lomo.png',
        ingredients: [
            '300g beef strips',
            '1 red onion, thick slices',
            '2 tomatoes, sliced into wedges',
            '2 tbsp soy sauce',
            '1 tbsp vinegar',
            '1 tbsp oyster sauce (optional)',
            'Fresh cilantro',
            'French fries',
            'White rice',
            'Salt & pepper'
        ],
        steps: [
            'Season and sear the beef over high heat.',
            'Add onions and stir-fry until slightly softened.',
            'Add tomatoes, soy sauce, vinegar, and oyster sauce.',
            'Mix gently and cook 1 more minute.',
            'Serve with white rice and a portion of fries.',
            'Garnish with cilantro.'
        ],
        comments: [
            {
                commentId: 1,
                userId: 6,
                text: 'Tastes just like the restaurants in Lima!'
            },
            {
                commentId: 2,
                userId: 7,
                text: 'Great balance of flavors — added extra onions.'
            }
        ],
        favoritedBy: [2, 3]
    },

    {
        id: 2,
        authorId: 2,
        title: 'Quinoa & Vegetable Chaufa',
        tags: ['Peruvian', 'Fusion', 'Healthy'],
        imageUrl: '/chaufa-quinua.png',
        ingredients: [
            '1 cup cooked quinoa',
            '2 eggs, scrambled',
            '1 cup mixed vegetables (carrot, peas, bell pepper)',
            '2 tbsp soy sauce',
            '1 green onion, chopped',
            'Ginger (optional)',
            'Sesame oil'
        ],
        steps: [
            'Sauté vegetables in a little oil.',
            'Add quinoa and mix well.',
            'Add soy sauce and optional ginger.',
            'Stir in scrambled eggs.',
            'Finish with green onions and a few drops of sesame oil.'
        ],
        comments: [],
        favoritedBy: [1, 5]
    },

    {
        id: 3,
        authorId: 3,
        title: 'Aji de Gallina',
        tags: ['Peruvian', 'Classic'],
        imageUrl: '/ajidegallina.png',
        ingredients: [
            '1 chicken breast, cooked and shredded',
            '1 onion, finely chopped',
            '2 garlic cloves, minced',
            '2–3 tbsp ají amarillo paste',
            '4 slices of bread soaked in milk',
            '1/2 cup evaporated milk',
            'Parmesan cheese (optional)',
            'Olive oil',
            'Salt & pepper',
            'Boiled potatoes and white rice'
        ],
        steps: [
            'Sauté onion and garlic in olive oil.',
            'Add ají amarillo and cook 2 minutes.',
            'Blend bread with milk and add to the pan.',
            'Add shredded chicken and evaporated milk.',
            'Simmer until creamy and season to taste.',
            'Serve over boiled potatoes with rice on the side.'
        ],
        comments: [
            {
                commentId: 3,
                userId: 8,
                text: 'Creamy and authentic. My family loved it.'
            }
        ],
        favoritedBy: [1, 2]
    },

    {
        id: 4,
        authorId: 3,
        title: 'Pollo a la Brasa Bowl',
        tags: ['Peruvian', 'Dinner'],
        imageUrl: '/pollo.png',
        ingredients: [
            '2 chicken thighs',
            '1 tbsp soy sauce',
            '1 tsp garlic paste',
            '1 tsp cumin',
            '1 tsp paprika',
            'Salt & pepper',
            'French fries or roasted potatoes',
            'Green salad',
            'Sauces (ají, mayo, etc.)'
        ],
        steps: [
            'Marinate chicken with soy sauce, garlic, cumin, and paprika.',
            'Roast or air-fry until golden.',
            'Serve sliced over potatoes with salad.',
            'Add your preferred Peruvian sauces.'
        ],
        comments: [],
        favoritedBy: []
    },
    {
        id: 11,
        authorId: 6,
        title: 'Citrus Poached Salmon with Herb Oil',
        tags: ['Modern', 'Healthy'],
        imageUrl: '/citrus-salmon.png',
        ingredients: [
            '2 salmon fillets',
            '1 orange (sliced)',
            '1 lemon (sliced)',
            'Fresh dill',
            'Olive oil',
            'Salt & pepper'
        ],
        steps: [
            'Poach salmon gently with citrus slices and dill.',
            'Blend herbs with olive oil for topping.',
            'Drizzle herb oil over salmon and serve warm.'
        ],
        comments: [],
        favoritedBy: [6, 7]
    },

    {
        id: 5,
        authorId: 4,
        title: 'Pan con Chicharrón',
        tags: ['Breakfast', 'Peruvian', 'Sandwich'],
        imageUrl: '/chicharron.png',
        ingredients: [
            'Bread roll (pan francés)',
            '200g pork belly chunks',
            '1 sweet potato, sliced and fried',
            'Onion salad (lime, salt, cilantro)',
            'Salt & pepper'
        ],
        steps: [
            'Season pork and cook over medium heat until crispy.',
            'Fry sweet potato slices.',
            'Prepare quick onion salad with lime and cilantro.',
            'Assemble bread with chicharrón, sweet potato, and salad.'
        ],
        comments: [],
        favoritedBy: [1]
    },

    {
        id: 6,
        authorId: 5,
        title: 'Arroz Chaufa de Pollo',
        tags: ['Peruvian', 'Quick'],
        imageUrl: '/chaufa-pollo.png',
        ingredients: [
            '2 cups cooked rice',
            '150g chicken breast, diced',
            '1 egg, scrambled',
            '1 tbsp soy sauce',
            '1 tsp ginger',
            '1 garlic clove',
            'Green onions',
            'Vegetable oil'
        ],
        steps: [
            'Stir-fry chicken with garlic and ginger.',
            'Add rice and mix well.',
            'Add soy sauce and scrambled egg.',
            'Finish with green onions and serve hot.'
        ],
        comments: [
            {
                commentId: 4,
                userId: 9,
                text: 'Amazing! Added a little ají for extra flavor.'
            },
            {
                commentId: 5,
                userId: 10,
                text: 'Great quick lunch.'
            }
        ],
        favoritedBy: [1, 4]
    },
    {
        id: 7,
        authorId: 2,
        title: 'Anticuchos (Peruvian Beef Skewers)',
        tags: ['Peruvian', 'Grill', 'Street Food'],
        imageUrl: '/anticuchos.png',
        ingredients: [
            '400g beef heart or beef cubes',
            '2 tbsp ají panca',
            '2 tbsp vinegar',
            '1 tbsp garlic paste',
            'Salt & pepper',
            'Skewers',
            'Boiled potatoes (side)'
        ],
        steps: [
            'Marinate beef with ají panca, vinegar, garlic, salt, and pepper.',
            'Skewer and grill over high heat.',
            'Brush with extra marinade while grilling.',
            'Serve with potatoes.'
        ],
        comments: [
            {
                commentId: 11,
                userId: 9,
                text: 'Taste is super authentic. Grilled in my backyard!'
            }
        ],
        favoritedBy: [1, 5, 9]
    },
    {
        id: 8,
        authorId: 2,
        title: 'Classic Peruvian Ceviche',
        tags: ['Peruvian', 'Seafood', 'Fresh'],
        imageUrl: '/cebiche.png',
        ingredients: [
            '300g fresh white fish (sea bass or corvina), diced',
            '8 limes (juice only)',
            '1 red onion, thinly sliced',
            '1 tbsp ají limo, minced',
            'Fresh cilantro',
            'Salt',
            'Boiled sweet potato (side)',
            'Boiled corn (choclo)'
        ],
        steps: [
            'Season diced fish with salt.',
            'Add lime juice and let cure for 2–3 minutes.',
            'Mix in sliced onion, ají limo, and cilantro.',
            'Serve immediately with sweet potato and corn.'
        ],
        comments: [],
        favoritedBy: [1, 3, 8]
    },
    {
        id: 9,
        authorId: 11,
        title: 'Braised Short Rib with Creamy Polenta',
        tags: ['Modern American', 'Dinner', 'Comfort'],
        imageUrl: '/braised-ribs.png',
        ingredients: [
            '500g beef short ribs',
            '1 onion, chopped',
            '2 carrots, chopped',
            '2 cups beef stock',
            '1 cup red wine',
            '2 garlic cloves',
            '1 cup polenta',
            '1/2 cup parmesan',
            'Salt & pepper'
        ],
        steps: [
            'Sear the short ribs until browned.',
            'Add vegetables, garlic, wine, and stock.',
            'Cover and braise for 2.5 hours until tender.',
            'Cook polenta and finish with parmesan.',
            'Serve ribs over polenta with reduced sauce.'
        ],
        comments: [],
        favoritedBy: [4, 8, 11]
    },
    {
        id: 10,
        authorId: 7,
        title: 'Crispy Chicken Thigh with Pickled Shallots',
        tags: ['Contemporary', 'Dinner'],
        imageUrl: '/crispy-thighs.png',
        ingredients: [
            '2 chicken thighs, skin-on',
            '1 tbsp butter',
            'Salt & pepper',
            '2 shallots, thinly sliced',
            '1/4 cup vinegar',
            '1 tsp sugar'
        ],
        steps: [
            'Pickle shallots with vinegar, sugar, and salt.',
            'Pan-sear chicken skin-side down until crisp.',
            'Flip and cook with butter until done.',
            'Serve topped with pickled shallots.'
        ],
        comments: [],
        favoritedBy: [1, 3]
    },
    {
        id: 12,
        authorId: 1,
        title: "Carmy's Italian Beef Sandwich",
        tags: ['Sandwich', 'Comfort Food'],
        imageUrl: '/beef-sandwich.png',
        ingredients: [
            'Thin-sliced roast beef',
            'Soft French roll',
            'Giardiniera',
            'Beef jus',
            'Black pepper',
            'Garlic powder'
        ],
        steps: [
            'Warm sliced beef in seasoned jus.',
            'Dip the roll lightly in the jus.',
            'Layer beef generously.',
            'Top with giardiniera and serve immediately.'
        ],
        comments: [
            {
                commentId: 16,
                userId: 11,
                text: 'Tastes just like Chicago.'
            }
        ],
        favoritedBy: [3, 7]
    }

]
