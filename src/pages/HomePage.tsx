import { useState } from 'react'
import { Input, Tag, Space, Typography } from 'antd'
import { recipes } from '../mock/recipes'
import { RecipeGrid } from '@/components/RecipeGrid'

const { CheckableTag } = Tag
const { Title } = Typography

export const HomePage: React.FC = () => {
    const [search, setSearch] = useState('')
    const [selectedTags, setSelectedTags] = useState<string[]>([])

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


    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: 'white', padding: 24 }}>
                <div className='responsive-width-larger'>
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
                </div>
            </div>


            <RecipeGrid
                recipes={filtered}
                renderMode='view'
            />
        </>
    )
}
