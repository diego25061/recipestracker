import type { Recipe } from '@/models/Recipe'

export const recipes: Recipe[] = [
    {
        id: 1,
        authorId: 1,
        title: 'Creamy Chicken Pasta',
        tags: ['Italian', 'Dinner', 'Quick'],
        imageUrl: 'https://picsum.photos/id/866/400/350',
        ingredients: [
            '250g pasta (penne or fettuccine)',
            '1 chicken breast, sliced',
            '1 cup heavy cream',
            '1/2 cup grated parmesan',
            '2 garlic cloves, minced',
            '1 tbsp butter',
            'Salt & pepper',
            'Fresh parsley'
        ],
        steps: [
            'Boil pasta until al dente.',
            'Cook sliced chicken in butter until golden.',
            'Add garlic and sauté lightly.',
            'Pour in heavy cream and simmer for 3 minutes.',
            'Stir in parmesan until creamy.',
            'Mix the pasta with the sauce.',
            'Season to taste and garnish with parsley.'
        ],
        comments: [
            {
                commentId: 1,
                userId: 6,
                text: 'Made this last night — super creamy and delicious!'
            },
            {
                commentId: 2,
                userId: 7,
                text: 'Fast and easy. I added mushrooms and it was perfect.'
            }
        ],
        favoritedBy: [2, 3]
    },

    {
        id: 2,
        authorId: 2,
        title: 'Vegan Buddha Bowl',
        tags: ['Vegan', 'Healthy'],
        imageUrl: 'https://picsum.photos/id/326/420/310',
        ingredients: [
            '1 cup quinoa',
            '1 sweet potato, roasted',
            '1 cup chickpeas, roasted',
            '1 cup spinach',
            '1 avocado, sliced',
            'Sesame seeds',
            'Tahini dressing'
        ],
        steps: [
            'Cook quinoa according to package instructions.',
            'Roast sweet potato cubes and chickpeas until crispy.',
            'Prepare the avocado and spinach.',
            'Assemble everything in a bowl.',
            'Drizzle generously with tahini dressing.'
        ],
        comments: [],
        favoritedBy: [1, 5]
    },

    {
        id: 3,
        authorId: 3,
        title: 'Spaghetti Bolognese',
        tags: ['Italian', 'Classic'],
        imageUrl: 'https://picsum.photos/id/327/420/410',
        ingredients: [
            '300g spaghetti',
            '200g ground beef',
            '1 onion, diced',
            '2 garlic cloves, minced',
            '1 cup tomato sauce',
            'Olive oil',
            'Salt & pepper',
            'Basil leaves'
        ],
        steps: [
            'Cook spaghetti until al dente.',
            'Sauté onion and garlic in olive oil.',
            'Add ground beef and brown it.',
            'Pour in tomato sauce and simmer 10 minutes.',
            'Season well and mix with spaghetti.',
            'Garnish with fresh basil.'
        ],
        comments: [
            {
                commentId: 3,
                userId: 8,
                text: 'Classic recipe, loved the flavor.'
            }
        ],
        favoritedBy: [1, 2]
    },

    {
        id: 4,
        authorId: 3,
        title: 'Chicken Teriyaki Bowl',
        tags: ['Asian', 'Dinner'],
        imageUrl: 'https://picsum.photos/id/322/640/390',
        ingredients: [
            '2 chicken thighs, sliced',
            '1 cup rice',
            '2 tbsp soy sauce',
            '1 tbsp honey',
            '1 tbsp mirin',
            'Sesame seeds',
            'Green onions'
        ],
        steps: [
            'Cook rice and keep warm.',
            'Pan-fry chicken until browned.',
            'Mix soy sauce, honey, and mirin into a glaze.',
            'Pour glaze over chicken until thickened.',
            'Serve over rice topped with sesame seeds and green onions.'
        ],
        comments: [],
        favoritedBy: []
    },

    {
        id: 5,
        authorId: 4,
        title: 'Avocado & Tomato Toast',
        tags: ['Breakfast', 'Healthy'],
        imageUrl: 'https://picsum.photos/id/126/420/370',
        ingredients: [
            '2 slices sourdough bread',
            '1 ripe avocado',
            'Cherry tomatoes',
            'Salt & pepper',
            'Olive oil',
            'Lemon juice'
        ],
        steps: [
            'Toast the bread slices.',
            'Mash avocado with salt, pepper, and lemon juice.',
            'Spread over toast.',
            'Top with cherry tomatoes and olive oil.'
        ],
        comments: [],
        favoritedBy: [1]
    },

    {
        id: 6,
        authorId: 5,
        title: 'Beef Stir Fry with Vegetables',
        tags: ['Asian', 'Quick'],
        imageUrl: 'https://picsum.photos/id/356/480/260',
        ingredients: [
            '200g beef strips',
            '1 bell pepper, sliced',
            '1 cup broccoli florets',
            '2 tbsp soy sauce',
            '1 tsp ginger',
            '1 garlic clove',
            'Vegetable oil'
        ],
        steps: [
            'Heat oil in a pan.',
            'Stir-fry beef until browned.',
            'Add vegetables and cook until tender.',
            'Add soy sauce, garlic, and ginger.',
            'Cook 1 more minute and serve hot.'
        ],
        comments: [
            {
                commentId: 4,
                userId: 9,
                text: 'Turned out great — added chili flakes for a kick!'
            },
            {
                commentId: 5,
                userId: 10,
                text: 'Perfect for meal prep.'
            }
        ],
        favoritedBy: [1, 4]
    }
]
