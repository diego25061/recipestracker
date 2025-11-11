import { useState } from 'react';
import { Grid, Col, Flex, Layout, Row, Space, Tag, Card } from 'antd';
import { Header } from '../components/layout/Header';
import { SearchBar } from '../components/SearchBar';
import { TagFilter } from '../components/TagFilter';
import { RecipeGrid } from '../components/RecipeGrid';
import { recipes } from '../mock/recipes';
import { Footer } from 'antd/es/layout/layout';

const { useBreakpoint } = Grid;

const { Content } = Layout;

const contentStyle: React.CSSProperties = {
    //margin: 'auto',
};

const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#4096ff',
};

const layoutStyle = {
    minHeight: '100vh',
};

export const HomePage: React.FC = () => {
    const [search, setSearch] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const allTags = Array.from(new Set(recipes.flatMap(r => r.tags)));

    const filtered = recipes.filter(r => {
        const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase());
        const matchesTags = selectedTags.length === 0 || selectedTags.every(tag => r.tags.includes(tag));
        return matchesSearch && matchesTags;
    });

    const screens = useBreakpoint();

    //const maxScreen = screens
    console.log("screeens:", screens)


    const lvls = [
        { name: 'xs', val: 1 },
        { name: 'sm', val: 2 },
        { name: 'md', val: 3 },
        { name: 'lg', val: 4 },
        { name: 'xl', val: 5 },
        { name: 'xxl', val: 6 },
    ]

    let viewportLevel = 1;

    for (const l of lvls) {
        if (Object.entries(screens)
            .filter((screen) => !!screen[1])
            .some(x => x[0] === l.name)
        ) {
            viewportLevel = l.val
        }
    }

    return (
        <>
            <Flex gap="middle" wrap>
                <Layout style={layoutStyle}>
                    <Header />
                    <Content style={contentStyle} >

                        <Row>

                            <Col
                                xs={{ flex: '100%' }}
                                md={{ flex: '70%' }}
                                style={{
                                    backgroundColor: 'teal',
                                    margin: '0px auto'
                                }}>
                                search baar
                            </Col>
                        </Row>
                        <Row>
                            <Col
                                xs={{ flex: '100%' }}
                                md={{ flex: '80%' }}
                                xl={{ flex: '70%' }}
                                style={{
                                    backgroundColor: 'pink',
                                    margin: '0px auto'
                                }}>
                                contentt

                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                                    {recipes.map(recipe => (
                                        <>
                                            <div style={{
                                                flex: 1,
                                                backgroundColor: 'gray',
                                                border: ' 2px solid black'
                                            }} >
                                                {recipe.title}
                                            </div>
                                        </>
                                    ))}

                                </div>
                                <br />
                                aaaaa
                            </Col>
                        </Row>
                        {'========================================== aaaaaaaaa'}
                        <div style={{ display: 'flex', justifyContent: 'center' }}>

                            <div className='cards-grid'
                                style={{
                                    width: viewportLevel >= 5 ? '80%' : viewportLevel >= 3 ? '75%' : '95%',
                                    //https://stackoverflow.com/questions/43311943/prevent-content-from-expanding-grid-items
                                    gridTemplateColumns: Array(viewportLevel).fill(`minmax(0, 1fr)`).join(' ')
                                }}>
                                {recipes.map(r => (
                                    <Card
                                        hoverable
                                        cover={<img alt={r.title} src={r.image} />}
                                        style={{ margin: 4 }}
                                    >
                                        <Card.Meta title={r.title} description={`by ${r.author}`} />
                                        <div style={{ marginTop: '0.5rem' }}>
                                            {r.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>
                        
                    </Content>
                    <Footer style={footerStyle}>Footer</Footer>
                </Layout>
            </Flex>
            <Layout>
                <Header />
                <Content style={{ padding: '2rem' }}>
                    <Space direction="vertical" size="large" style={{ width: '100%' }}>
                        <Space wrap>
                            <SearchBar onSearch={setSearch} />
                            <TagFilter tags={allTags} selected={selectedTags} onChange={setSelectedTags} />
                        </Space>
                        <RecipeGrid recipes={filtered} />
                    </Space>
                </Content>
            </Layout>
        </>
    );
};
