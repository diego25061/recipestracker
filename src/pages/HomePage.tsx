import { useEffect, useState } from 'react'
import { Input, Tag, Space, Typography, Alert } from 'antd'
//import { recipes } from '../mock/recipes'
import { RecipeGrid } from '@/components/RecipeGrid'
import type { RecipeDetailsData } from '@/models/Recipe'
import { getPublicRecipes } from '@/api/recipes'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { PaddingContainer } from '@/components/layout/PaddingContainer'

const { CheckableTag } = Tag
const { Title } = Typography

export const HomePage: React.FC = () => {
    const [recipes, setRecipes] = useState<RecipeDetailsData[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const [search, setSearch] = useState('')
    const [selectedTags, setSelectedTags] = useState<string[]>([])

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true)
                const data = await getPublicRecipes()
                setRecipes(data)
            } catch (err) {
                console.error(err)
                setError("Could not load recipes")
            } finally {
                setLoading(false)
            }
        }

        load()
    }, [])

    const allTags = Array.from(new Set(recipes.flatMap(r => r.tags)))

    const toggleTag = (tag: string, checked: boolean) => {
        setSelectedTags(prev =>
            checked ? [...prev, tag] : prev.filter(t => t !== tag)
        )
    }

    const filtered = recipes.filter(r => {
        const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase())
        const matchesTags =
            selectedTags.length === 0 || selectedTags.every(tag => r.tags.includes(tag))
        return matchesSearch && matchesTags
    })

    const loadedRecipes = loading ? <LoadingSpinner /> : (
        filtered && filtered.length > 0 ? <RecipeGrid
            recipes={filtered}
            renderMode='view'
        /> : <Title level={4} style={{ margin: '4rem' }}>
            No recipes found
        </Title>
    )

    return (
        <>
            <PaddingContainer >
                <Space direction='vertical' size='middle' style={{ width: '100%' }}>
                    <Title level={3} style={{ margin: 0 }}>
                        Public Recipes
                    </Title>

                    <Input.Search
                        placeholder='Search recipes...'
                        allowClear
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />

                    <div>
                        <Space wrap>
                            {allTags.map(tag => (
                                <CheckableTag
                                    key={tag}
                                    checked={selectedTags.includes(tag)}
                                    onChange={checked => toggleTag(tag, checked)}
                                >
                                    {tag}
                                </CheckableTag>
                            ))}
                        </Space>
                    </div>
                </Space>
            </PaddingContainer>

            {error ?
                <Alert
                    message="Error"
                    description={error}
                    type="error"
                    showIcon
                    style={{ margin: '4rem' }}
                /> :
                loadedRecipes
            }

        </>
    )
}
