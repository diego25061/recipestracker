import { RecipeCard } from './RecipeCard'
import { Grid } from 'antd';
import type { RecipeDetailsData } from '@/models/Recipe';
import { RecipeDetailsModal } from './modals/RecipeDetailsModal';
import { useState } from 'react';

const { useBreakpoint } = Grid;

interface RecipeGridProps {
    recipes: RecipeDetailsData[]
    renderMode: 'view' | 'editDelete'
    handleEdit?: (id: number) => void
    handleDelete?: (id: number) => void
}

export const RecipeGrid: React.FC<RecipeGridProps> = ({ recipes, renderMode, handleEdit, handleDelete }) => {

    const [selectedRecipeId, setSelectedRecipeId] = useState<number>(0)
    const screens = useBreakpoint()

    const lvls = [
        { name: 'xs', val: 1 },
        { name: 'sm', val: 2 },
        { name: 'md', val: 3 },
        { name: 'lg', val: 4 },
        { name: 'xl', val: 5 },
        { name: 'xxl', val: 6 },
    ]

    let viewportLevel = 1

    for (const l of lvls) {
        if (Object.entries(screens)
            .filter((screen) => !!screen[1])
            .some(x => x[0] === l.name)
        ) {
            viewportLevel = l.val
        }
    }

    const handleRecipeClick = (id: number) => {
        setSelectedRecipeId(id)
    }

    return <>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className='cards-grid'
                style={{
                    width: viewportLevel >= 5 ? '80%' : viewportLevel >= 3 ? '75%' : '95%',
                    //https://stackoverflow.com/questions/43311943/prevent-content-from-expanding-grid-items
                    gridTemplateColumns: Array(viewportLevel).fill(`minmax(0, 1fr)`).join(' ')
                }}>
                {recipes.map(r => (
                    <RecipeCard
                        key={r.id}
                        id={r.id}
                        title={r.title}
                        author={r.authorData.username}
                        image={r.imageUrl}
                        tags={r.tags}
                        onRecipeClick={handleRecipeClick}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        renderMode={renderMode}
                    />
                ))}
            </div>
        </div>

        <RecipeDetailsModal
            recipeId={selectedRecipeId}
            onClose={() => setSelectedRecipeId(0)}
        />
    </>
}