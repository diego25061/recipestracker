import { RecipeCard } from './RecipeCard'
import { Grid } from 'antd';
import type { Recipe } from '@/models/Recipe';

const { useBreakpoint } = Grid;

interface RecipeGridProps {
    recipes: Recipe[]
    renderMode: 'view' | 'editDelete'
    handleEdit?: (id: number) => void
    handleDelete?: (id: number) => void
}

export const RecipeGrid: React.FC<RecipeGridProps> = ({ recipes, renderMode, handleEdit, handleDelete }) => {
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
                        author={r.author}
                        image={r.imageUrl}
                        tags={r.tags}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        renderMode={renderMode}
                    />
                ))}
            </div>
        </div>
    </>
}