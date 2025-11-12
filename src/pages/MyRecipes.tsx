import { Layout, Button, Row, Col, Card, Tag, Space, Popconfirm, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { recipes } from '../mock/recipes';

const { Content } = Layout;

export const MyRecipesPage: React.FC = () => {
    const navigate = useNavigate();

    const handleEdit = (id: number) => {
        message.info(`Edit recipe #${id}`);
        // navigate(`/recipes/edit/${id}`);
    };

    const handleDelete = (id: number) => {
        message.success(`Recipe #${id} deleted (mock)`);
    };

    const handleAddNew = () => {
        message.info('Redirecting to Create Recipe...');
    };

    return (
        <Layout>
            <Content style={{ padding: '2rem' }}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1.5rem',
                    }}
                >
                    <h1 style={{ margin: 0 }}>🍳 My Recipes</h1>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        size="large"
                        onClick={handleAddNew}
                    >
                        Add New Recipe
                    </Button>
                </div>

                <Row gutter={[16, 16]} justify="start">
                    {recipes.map((r) => (
                        <Col key={r.id} xs={24} sm={12} md={8} lg={6}>
                            <Card
                                hoverable
                                cover={
                                    <img
                                        alt={r.title}
                                        src={r.image}
                                        style={{ height: 180, objectFit: 'cover' }}
                                    />
                                }
                                actions={[
                                    <EditOutlined
                                        key="edit"
                                        onClick={() => handleEdit(r.id)}
                                    />,
                                    <Popconfirm
                                        key="delete"
                                        title="Delete this recipe?"
                                        okText="Yes"
                                        cancelText="No"
                                        onConfirm={() => handleDelete(r.id)}
                                    >
                                        <DeleteOutlined />
                                    </Popconfirm>,
                                ]}
                            >
                                <Card.Meta title={r.title} description={`by ${r.author}`} />
                                <Space wrap style={{ marginTop: '0.5rem' }}>
                                    {r.tags.map((tag) => (
                                        <Tag key={tag}>{tag}</Tag>
                                    ))}
                                </Space>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Content>
        </Layout>
    );
};
